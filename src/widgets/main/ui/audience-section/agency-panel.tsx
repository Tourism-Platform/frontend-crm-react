import { ArrowRight } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, CometCardTilt, Safari } from "@/shared/ui";

import {
	AGENCY_FEATURE_ITEMS_LIST,
	MAIN_AGENCY_TOUR_ITEMS_LIST
} from "../../model";
import type { TCatalogTour, TFeatureItem } from "../../model";

import { FeatureItemCard } from "./feature-item-card";

export const AgencyPanel: FC = () => {
	const { t } = useTranslation("main");
	const features = t("agency.features", {
		returnObjects: true
	}) as TFeatureItem[];
	const tours = t("agency.mockup.tours", {
		returnObjects: true
	}) as TCatalogTour[];

	return (
		<div className="grid items-center gap-10 lg:grid-cols-2">
			<CometCardTilt
				className="w-full"
				initialRotateX={-2.5}
				initialRotateY={5}
			>
				<Safari
					url={t("agency.mockup.url")}
					className="order-2 lg:order-1"
				>
					<div className="p-4">
						<div className="mb-3 flex gap-2">
							<div className="flex-1 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
								{t("agency.mockup.search_placeholder")}
							</div>
							<div className="rounded-md bg-muted px-3 py-2 text-xs">
								{t("agency.mockup.filter")}
							</div>
						</div>
						<div className="grid grid-cols-2 gap-3">
							{tours.map((tour, index) => (
								<div
									key={tour.name}
									className="overflow-hidden rounded-lg bg-card shadow-sm transition hover:bg-muted/50"
								>
									<div
										className="h-16 bg-cover bg-center"
										style={{
											backgroundImage: `url('${MAIN_AGENCY_TOUR_ITEMS_LIST[index].image}')`
										}}
									/>
									<div className="p-2">
										<p className="text-xs font-semibold">
											{tour.name}
										</p>
										<p className="text-[10px] text-muted-foreground">
											{tour.operator}
										</p>
										<p className="mt-1 text-xs font-bold text-primary">
											{tour.price}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</Safari>
			</CometCardTilt>

			<div className="order-1 lg:order-2">
				<h3 className="text-3xl font-bold tracking-tight">
					{t("agency.title")}
				</h3>
				<p className="mt-4 text-muted-foreground">
					{t("agency.subtitle")}
				</p>

				<div className="mt-8 grid gap-4 sm:grid-cols-2">
					{features.map((feature, index) => (
						<FeatureItemCard
							key={feature.name}
							icon={AGENCY_FEATURE_ITEMS_LIST[index].icon}
							name={feature.name}
							desc={feature.desc}
						/>
					))}
				</div>

				<Button size="lg" className="mt-8">
					{t("agency.cta")}
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</div>
	);
};
