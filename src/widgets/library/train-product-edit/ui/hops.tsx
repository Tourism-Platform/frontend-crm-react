import { Loader, PlusIcon, Trash2 } from "lucide-react";
import { type FC, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button, CustomField, Form, withErrorBoundary } from "@/shared/ui";

import {
	type ITrainHop,
	useUpdateTrainProductHopsMutation
} from "@/entities/supplier";

interface ITrainHopFormRow {
	departureTime: string;
	arrivalTime: string;
	departureLat: string;
	departureLong: string;
	arrivalLat: string;
	arrivalLong: string;
}

interface ITrainHopsForm {
	hops: ITrainHopFormRow[];
}

interface ITrainProductHopsProps {
	supplierId: string;
	productId: string;
	hops?: ITrainHop[];
}

const emptyHop = (): ITrainHopFormRow => ({
	departureTime: "",
	arrivalTime: "",
	departureLat: "",
	departureLong: "",
	arrivalLat: "",
	arrivalLong: ""
});

const parseOptionalNumber = (value: string): number | null => {
	const trimmed = value.trim();
	if (!trimmed) return null;
	const parsed = Number(trimmed);
	return Number.isFinite(parsed) ? parsed : null;
};

const hopToForm = (hop: ITrainHop): ITrainHopFormRow => ({
	departureTime: hop.departure?.time ?? "",
	arrivalTime: hop.arrival?.time ?? "",
	departureLat:
		hop.departure?.location?.lat != null
			? String(hop.departure.location.lat)
			: "",
	departureLong:
		hop.departure?.location?.long != null
			? String(hop.departure.location.long)
			: "",
	arrivalLat:
		hop.arrival?.location?.lat != null
			? String(hop.arrival.location.lat)
			: "",
	arrivalLong:
		hop.arrival?.location?.long != null
			? String(hop.arrival.location.long)
			: ""
});

const formToHop = (row: ITrainHopFormRow): ITrainHop => {
	const depLat = parseOptionalNumber(row.departureLat);
	const depLong = parseOptionalNumber(row.departureLong);
	const arrLat = parseOptionalNumber(row.arrivalLat);
	const arrLong = parseOptionalNumber(row.arrivalLong);

	return {
		departure: {
			time: row.departureTime.trim() || null,
			location:
				depLat != null && depLong != null
					? { lat: depLat, long: depLong }
					: null
		},
		arrival: {
			time: row.arrivalTime.trim() || null,
			location:
				arrLat != null && arrLong != null
					? { lat: arrLat, long: arrLong }
					: null
		}
	};
};

const TrainProductHopsBase: FC<ITrainProductHopsProps> = ({
	supplierId,
	productId,
	hops = []
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const [updateTrainProductHops, { isLoading }] =
		useUpdateTrainProductHopsMutation();

	const form = useForm<ITrainHopsForm>({
		mode: "onSubmit",
		defaultValues: {
			hops: hops.length ? hops.map(hopToForm) : [emptyHop()]
		}
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "hops"
	});

	useEffect(() => {
		form.reset({
			hops: hops.length ? hops.map(hopToForm) : [emptyHop()]
		});
	}, [hops, form]);

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			await updateTrainProductHops({
				supplierId,
				productId,
				hops: values.hops.map(formToHop)
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="grid gap-4">
				{fields.map((field, index) => (
					<div
						key={field.id}
						className="grid gap-3 rounded-md border p-4 md:grid-cols-2"
					>
						<CustomField
							control={form.control}
							name={`hops.${index}.departureTime`}
							t={t}
							label="form.hops.fields.departureTime.label"
							fieldType="time"
						/>
						<CustomField
							control={form.control}
							name={`hops.${index}.arrivalTime`}
							t={t}
							label="form.hops.fields.arrivalTime.label"
							fieldType="time"
						/>
						<CustomField
							control={form.control}
							name={`hops.${index}.departureLat`}
							t={t}
							label="form.hops.fields.departureLat.label"
							placeholder="form.hops.fields.departureLat.placeholder"
							fieldType="input"
							type="number"
							step="any"
						/>
						<CustomField
							control={form.control}
							name={`hops.${index}.departureLong`}
							t={t}
							label="form.hops.fields.departureLong.label"
							placeholder="form.hops.fields.departureLong.placeholder"
							fieldType="input"
							type="number"
							step="any"
						/>
						<CustomField
							control={form.control}
							name={`hops.${index}.arrivalLat`}
							t={t}
							label="form.hops.fields.arrivalLat.label"
							placeholder="form.hops.fields.arrivalLat.placeholder"
							fieldType="input"
							type="number"
							step="any"
						/>
						<CustomField
							control={form.control}
							name={`hops.${index}.arrivalLong`}
							t={t}
							label="form.hops.fields.arrivalLong.label"
							placeholder="form.hops.fields.arrivalLong.placeholder"
							fieldType="input"
							type="number"
							step="any"
						/>
						{fields.length > 1 ? (
							<div className="md:col-span-2 flex justify-end">
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => remove(index)}
								>
									<Trash2 className="mr-1 h-4 w-4" />
								</Button>
							</div>
						) : null}
					</div>
				))}

				<div className="flex flex-wrap justify-between gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={() => append(emptyHop())}
					>
						<PlusIcon className="mr-1 h-4 w-4" />
						{t("form.hops.add")}
					</Button>
					<Button type="submit" size="lg" disabled={isLoading}>
						{isLoading && (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading
							? t("form.hops.buttons.saving")
							: t("form.hops.buttons.save")}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export const TrainProductHops = withErrorBoundary(TrainProductHopsBase);
