import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { toast } from "sonner";

import { Button, Card, CardContent, Form, Separator } from "@/shared/ui";

import {
	LANDING_SCHEMA,
	type TLandingSchema,
	TourHeader,
	useGetLandingQuery,
	useUpdateLandingMutation
} from "@/entities/tour";

import { PreviewTourButton, PublishTourButton } from "@/features/tours";

import { TourNotFound } from "../../tour-not-found";

import { AdditionalInfo } from "./additional-info";
import { AmenitiesInfo } from "./amenities-info";
import { CancellationPolicyInfo } from "./cancellation-policy-info";
import { LanguagesInfo } from "./languages-info";
import { OverviewInfo } from "./overview-info";
import { PhotosInfo } from "./photos-info";
import { PickupDetailsInfo } from "./pickup-details-info";

export const Landing: FC = () => {
	const { t } = useTranslation("landing_page" as const);
	const { tourId } = useParams<{ tourId: string }>();

	const {
		data: landingData,
		isLoading: isLandingLoading,
		isError: isLandingError
	} = useGetLandingQuery(tourId || "", {
		skip: !tourId
	});
	const [updateLanding, { isLoading: isUpdating }] =
		useUpdateLandingMutation();

	const form = useForm<TLandingSchema>({
		resolver: zodResolver(LANDING_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (landingData) {
			form.reset(landingData);
		}
	}, [landingData, form]);

	useEffect(() => {
		if (isLandingError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isLandingError, t]);

	async function onSubmit(data: TLandingSchema) {
		if (tourId) {
			try {
				await updateLanding({ tourId, data }).unwrap();
				toast.success(t("form.toasts.save.success"));
			} catch (error) {
				toast.error(t("form.toasts.save.error"));
				console.error(error);
			}
		}
	}

	if ((!landingData || isLandingError) && !isLandingLoading) {
		return <TourNotFound />;
	}

	return (
		<section className="flex flex-col gap-6 container">
			<TourHeader
				title={`${t("page_name")}: Embark on an Unforgettable Archaeological Journey`}
				badgeText="Planning"
				duration="6 days / 5 nights"
				type="Group"
				actions={
					<>
						<PreviewTourButton />
						<PublishTourButton />
					</>
				}
			/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Card>
						<CardContent className="grid gap-6">
							<PhotosInfo form={form} />
							<Separator />
							<OverviewInfo form={form} />
							<Separator />
							<LanguagesInfo form={form} />
							<Separator />
							<AmenitiesInfo form={form} />
							<Separator />
							<PickupDetailsInfo form={form} />
							<Separator />
							<CancellationPolicyInfo form={form} />
							<Separator />
							<AdditionalInfo form={form} />
							<div className="flex justify-end mt-6">
								<Button
									size="lg"
									type="submit"
									disabled={isUpdating || isLandingLoading}
								>
									{isUpdating || isLandingLoading ? (
										<>
											<Loader className="mr-2 h-4 w-4 animate-spin" />
											{isLandingLoading
												? t("form.buttons.loading")
												: t("form.buttons.saving")}
										</>
									) : (
										t("form.buttons.save")
									)}
								</Button>
							</div>
						</CardContent>
					</Card>
				</form>
			</Form>
		</section>
	);
};
