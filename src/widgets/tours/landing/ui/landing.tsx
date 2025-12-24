import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Card, CardContent, Form, Separator } from "@/shared/ui";

import { TourHeader } from "@/entities/tour";

import { PreviewTourButton, PublishTourButton } from "@/features/tours";

import { LANDING_SCHEMA, type TLandingSchema } from "../model";

import {
	AdditionalInfoBlock,
	AmenitiesBlock,
	CancellationPolicyBlock,
	LanguagesBlock,
	OverviewBlock,
	PhotosBlock,
	PickupDetailsBlock
} from "./blocks";

export const Landing: FC = () => {
	const { t } = useTranslation("landing_page" as const);

	const form = useForm<TLandingSchema>({
		resolver: zodResolver(LANDING_SCHEMA),
		defaultValues: {
			photos: [],
			description: "",
			languages: [],
			included: [],
			not_included: [],
			pickup_type: "airport",
			pickup_description: "",
			cancellation_policy: "",
			additional_info: ""
		},
		mode: "onSubmit"
	});

	const onSubmit = (data: TLandingSchema) => {
		console.log("Landing Data:", data);
	};

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
							<PhotosBlock />
							<Separator />
							<OverviewBlock />
							<Separator />
							<LanguagesBlock />
							<Separator />
							<AmenitiesBlock />
							<Separator />
							<PickupDetailsBlock />
							<Separator />
							<CancellationPolicyBlock />
							<Separator />
							<AdditionalInfoBlock />
							<div className="flex justify-end mt-6">
								<Button size="lg" type="submit">
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
