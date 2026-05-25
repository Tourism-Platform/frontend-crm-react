import { ArrowRight } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, CometCardTilt, Safari } from "@/shared/ui";

import { OPERATOR_FEATURE_ITEMS_LIST } from "../../model";
import type { TFeatureItem, TMockupDay } from "../../model";

import { FeatureItemCard } from "./feature-item-card";

export const OperatorPanel: FC = () => {
	const { t } = useTranslation("main");
	const features = t("operator.features", {
		returnObjects: true
	}) as TFeatureItem[];
	const sidebarItems = t("operator.mockup.sidebar_items", {
		returnObjects: true
	}) as string[];
	const days = t("operator.mockup.days", {
		returnObjects: true
	}) as TMockupDay[];

	return (
		<div className="grid items-center gap-10 lg:grid-cols-2">
			<div>
				<h3 className="text-3xl font-bold tracking-tight">
					{t("operator.title")}
				</h3>
				<p className="mt-4 text-muted-foreground">
					{t("operator.subtitle")}
				</p>

				<div className="mt-8 grid gap-4 sm:grid-cols-2">
					{features.map((feature, index) => (
						<FeatureItemCard
							key={feature.name}
							icon={OPERATOR_FEATURE_ITEMS_LIST[index].icon}
							name={feature.name}
							desc={feature.desc}
						/>
					))}
				</div>

				<Button size="lg" className="mt-8">
					{t("operator.cta")}
					<ArrowRight className="size-4" />
				</Button>
			</div>

			<CometCardTilt
				className="w-full"
				initialRotateX={2.5}
				initialRotateY={-5}
			>
				<Safari url={t("operator.mockup.url")}>
					<div className="grid min-h-0 gap-4 p-4 sm:grid-cols-[160px_1fr]">
						<div className="space-y-2 rounded-md bg-muted/40 pr-3 sm:p-2">
							<p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
								{t("operator.mockup.sidebar_title")}
							</p>
							{sidebarItems.map((item, index) => (
								<div
									key={item}
									className={
										index === 0
											? "rounded-md bg-accent px-2 py-1.5 text-sm font-medium text-accent-foreground"
											: "px-2 py-1.5 text-sm text-muted-foreground"
									}
								>
									{item}
								</div>
							))}
						</div>
						<div className="space-y-4">
							{days.map((day) => (
								<div key={day.label}>
									<p className="text-sm font-semibold">
										{day.label} · {day.city}
									</p>
									<div className="mt-2 space-y-1">
										{day.blocks.map((block) => (
											<div
												key={block.name}
												className="flex items-center justify-between rounded-md bg-muted px-2 py-1.5 text-xs"
											>
												<span>{block.name}</span>
												<span className="text-muted-foreground">
													{block.time}
												</span>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</Safari>
			</CometCardTilt>
		</div>
	);
};
