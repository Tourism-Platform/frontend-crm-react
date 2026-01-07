import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

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
		isLoading,
		isError
	} = useGetLandingQuery(tourId || "", {
		skip: !tourId
	});
	const [updateLanding, { isLoading: isUpdating }] =
		useUpdateLandingMutation();

	const form = useForm<TLandingSchema>({
		resolver: zodResolver(LANDING_SCHEMA),
		mode: "onSubmit"
	});
	console.log("form", form.watch());
	useEffect(() => {
		if (landingData) {
			form.reset(landingData);
		}
	}, [landingData, form]);

	const onSubmit = async (data: TLandingSchema) => {
		if (tourId) {
			try {
				await updateLanding({ tourId, data }).unwrap();
				console.log("Landing Updated Successfully");
			} catch (error) {
				console.error("Failed to update landing:", error);
			}
		}
	};

	if ((!landingData || isError) && !isLoading) {
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
									disabled={isUpdating}
								>
									{t("buttons.save")}
								</Button>
							</div>
						</CardContent>
					</Card>
				</form>
			</Form>
		</section>
	);
};
