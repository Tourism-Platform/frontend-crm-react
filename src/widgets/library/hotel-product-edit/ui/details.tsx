import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button, CustomField, Form, withErrorBoundary } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	type ENUM_HOTEL_AMENITY_TYPE,
	HOTEL_AMENITY_LABELS,
	type IHotelProductDetails,
	useUpdateHotelProductDetailsMutation
} from "@/entities/supplier";

interface IHotelProductDetailsForm {
	lat: string;
	long: string;
	stars: string;
	amenities: ENUM_HOTEL_AMENITY_TYPE[];
	checkInFrom: string;
	checkOutUntil: string;
}

interface IHotelProductDetailsTabProps {
	supplierId: string;
	productId: string;
	details?: IHotelProductDetails | null;
}

const emptyDetailsForm = (): IHotelProductDetailsForm => ({
	lat: "",
	long: "",
	stars: "",
	amenities: [],
	checkInFrom: "",
	checkOutUntil: ""
});

const toFormValues = (
	details?: IHotelProductDetails | null
): IHotelProductDetailsForm => {
	if (!details) return emptyDetailsForm();
	return {
		lat: details.location?.lat != null ? String(details.location.lat) : "",
		long:
			details.location?.long != null ? String(details.location.long) : "",
		stars: details.stars != null ? String(details.stars) : "",
		amenities: details.amenities ?? [],
		checkInFrom: details.policy?.checkInFrom ?? "",
		checkOutUntil: details.policy?.checkOutUntil ?? ""
	};
};

const parseOptionalNumber = (value: string): number | null => {
	const trimmed = value.trim();
	if (!trimmed) return null;
	const parsed = Number(trimmed);
	return Number.isFinite(parsed) ? parsed : null;
};

const HotelProductDetailsBase: FC<IHotelProductDetailsTabProps> = ({
	supplierId,
	productId,
	details
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const amenityOptions = useValueToTranslateLabel(HOTEL_AMENITY_LABELS);
	const [updateHotelProductDetails, { isLoading }] =
		useUpdateHotelProductDetailsMutation();

	const form = useForm<IHotelProductDetailsForm>({
		mode: "onSubmit",
		defaultValues: toFormValues(details)
	});

	useEffect(() => {
		form.reset(toFormValues(details));
	}, [details, form]);

	const onSubmit = form.handleSubmit(async (values) => {
		const lat = parseOptionalNumber(values.lat);
		const long = parseOptionalNumber(values.long);
		const stars = parseOptionalNumber(values.stars);

		const payload: IHotelProductDetails = {
			location:
				lat != null && long != null
					? {
							lat,
							long,
							city: details?.location?.city ?? null,
							address: details?.location?.address ?? null,
							id: details?.location?.id ?? null
						}
					: null,
			stars,
			amenities: values.amenities ?? [],
			policy: {
				checkInFrom: values.checkInFrom.trim() || null,
				checkOutUntil: values.checkOutUntil.trim() || null,
				earlyCheckIn: details?.policy?.earlyCheckIn ?? [],
				lateCheckOut: details?.policy?.lateCheckOut ?? []
			}
		};

		try {
			await updateHotelProductDetails({
				supplierId,
				productId,
				data: payload
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
				<CustomField
					control={form.control}
					name="lat"
					t={t}
					label="form.details.fields.lat.label"
					placeholder="form.details.fields.lat.placeholder"
					fieldType="input"
					type="number"
					step="any"
				/>
				<CustomField
					control={form.control}
					name="long"
					t={t}
					label="form.details.fields.long.label"
					placeholder="form.details.fields.long.placeholder"
					fieldType="input"
					type="number"
					step="any"
				/>
				<CustomField
					control={form.control}
					name="stars"
					t={t}
					label="form.details.fields.stars.label"
					placeholder="form.details.fields.stars.placeholder"
					fieldType="input"
					type="number"
					min={1}
					max={5}
				/>
				<CustomField
					control={form.control}
					name="amenities"
					t={t}
					label="form.details.fields.amenities.label"
					placeholder="form.details.fields.amenities.placeholder"
					fieldType="multiselect"
					options={amenityOptions}
					className="md:col-span-2"
					badgeVariant="secondary"
				/>
				<CustomField
					control={form.control}
					name="checkInFrom"
					t={t}
					label="form.details.fields.checkInFrom.label"
					fieldType="time"
				/>
				<CustomField
					control={form.control}
					name="checkOutUntil"
					t={t}
					label="form.details.fields.checkOutUntil.label"
					fieldType="time"
				/>
				<div className="md:col-span-2 flex justify-end mt-2">
					<Button type="submit" size="lg" disabled={isLoading}>
						{isLoading && (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading
							? t("form.details.buttons.saving")
							: t("form.details.buttons.save")}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export const HotelProductDetailsTab = withErrorBoundary(
	HotelProductDetailsBase
);
