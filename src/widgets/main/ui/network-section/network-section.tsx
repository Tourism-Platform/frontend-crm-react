"use client";

import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Card } from "@/shared/ui";

import type { TRoadmapPhase, TRoadmapStep } from "../../model";
import { SectionHeader } from "../section-header";

import { useRoadmapAutoplay } from "./lib/use-roadmap-autoplay";
import { NetworkBeamVisual } from "./network-beam-visual";
import { NetworkPhaseAiVisual } from "./network-phase-ai-visual";
import { NetworkPhaseModulesVisual } from "./network-phase-modules-visual";
import {
	BANNER_VARIANT_CLASS,
	NetworkPhaseMobileSteps,
	NetworkPhasePanel
} from "./network-phase-panel";
import { NetworkPhaseRegionVisual } from "./network-phase-region-visual";
import { NetworkPhaseVisualCard } from "./network-phase-visual-card";
import { NetworkRoadmapStepper } from "./network-roadmap-stepper";

const renderPhaseVisual = (phaseIndex: number, visualLabel: string) => {
	switch (phaseIndex) {
		case 0:
			return <NetworkPhaseModulesVisual visualLabel={visualLabel} />;
		case 1:
			return <NetworkPhaseAiVisual visualLabel={visualLabel} />;
		case 2:
			return (
				<NetworkPhaseVisualCard
					label={visualLabel}
					className="overflow-visible"
				>
					<NetworkBeamVisual compact />
				</NetworkPhaseVisualCard>
			);
		case 3:
			return <NetworkPhaseRegionVisual visualLabel={visualLabel} />;
		default:
			return null;
	}
};

export const NetworkSection: FC = () => {
	const { t } = useTranslation("main");
	const { activePhase, progressOffset, selectPhase } = useRoadmapAutoplay();

	const steps = t("roadmap.steps", { returnObjects: true }) as TRoadmapStep[];
	const phases = t("roadmap.phases", {
		returnObjects: true
	}) as TRoadmapPhase[];
	const activePhaseData = phases[activePhase];

	return (
		<section className="bg-muted/30 px-4 py-16">
			<SectionHeader
				eyebrow={t("roadmap.eyebrow")}
				eyebrowClassName="text-primary"
				title={t("roadmap.title")}
				subtitle={t("roadmap.subtitle")}
			/>

			<div className="mx-auto max-w-5xl">
				<NetworkPhaseMobileSteps
					steps={steps}
					activePhase={activePhase}
					onSelectPhase={selectPhase}
				/>

				<NetworkRoadmapStepper
					activePhase={activePhase}
					progressOffset={progressOffset}
					onSelectPhase={selectPhase}
				/>

				<Card className="relative overflow-hidden rounded-2xl shadow-md">
					{activePhaseData.banner ? (
						<span
							className={cn(
								"absolute top-6 right-6 z-10 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-opacity duration-300",
								BANNER_VARIANT_CLASS[
									activePhaseData.badgeVariant
								]
							)}
						>
							{activePhaseData.banner}
						</span>
					) : null}

					<div className="transition-opacity duration-300">
						<NetworkPhasePanel
							phase={activePhaseData}
							visual={renderPhaseVisual(
								activePhase,
								activePhaseData.visualLabel
							)}
						/>
					</div>
				</Card>
			</div>
		</section>
	);
};
