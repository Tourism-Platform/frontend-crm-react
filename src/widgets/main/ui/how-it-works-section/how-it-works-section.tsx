import type { FC } from "react";
import { useTranslation } from "react-i18next";

import type { THowStep } from "../../model";
import { SectionHeader } from "../section-header";

import { StepCard } from "./step-card";

export const HowItWorksSection: FC = () => {
	const { t } = useTranslation("main");
	const steps = t("how_it_works.steps", {
		returnObjects: true
	}) as THowStep[];

	return (
		<section className="bg-background px-4 py-16">
			<SectionHeader
				eyebrow={t("how_it_works.eyebrow")}
				title={t("how_it_works.title")}
				subtitle={t("how_it_works.subtitle")}
			/>

			<div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
				{steps.map((step, index) => (
					<StepCard
						key={step.title}
						step={index + 1}
						title={step.title}
						desc={step.desc}
					/>
				))}
			</div>
		</section>
	);
};
