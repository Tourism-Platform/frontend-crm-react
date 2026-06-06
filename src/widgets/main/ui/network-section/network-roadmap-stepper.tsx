import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";

import type { TRoadmapStep } from "../../model";

import { ROADMAP_PROGRESS_CIRCUMFERENCE } from "./lib/use-roadmap-autoplay";

interface INetworkRoadmapStepperProps {
	activePhase: number;
	progressOffset: number;
	onSelectPhase: (index: number) => void;
}

const getPeriodClass = (
	step: TRoadmapStep,
	isActive: boolean,
	isDone: boolean
) => {
	if (step.periodVariant === "soon") {
		return "bg-amber-500/10 text-amber-600";
	}

	if (isActive || isDone) {
		return "bg-primary/10 text-primary";
	}

	return "bg-muted text-muted-foreground";
};

const STEP_LINE_START = "calc(2rem + (100% - 4rem) / 8)";
const STEP_LINE_WIDTH = "calc((100% - 4rem) * 3 / 4)";

export const NetworkRoadmapStepper: FC<INetworkRoadmapStepperProps> = ({
	activePhase,
	progressOffset,
	onSelectPhase
}) => {
	const { t } = useTranslation("main");
	const steps = t("roadmap.steps", {
		returnObjects: true
	}) as TRoadmapStep[];

	return (
		<div className="relative mb-10 hidden px-8 md:grid md:grid-cols-4">
			<div
				className="absolute top-[30px] h-0.5 -translate-y-1/2 rounded-full bg-primary"
				style={{ left: STEP_LINE_START, width: STEP_LINE_WIDTH }}
			/>

			{steps.map((step, index) => {
				const isActive = index === activePhase;
				const isDone = index < activePhase;

				return (
					<button
						key={step.title}
						type="button"
						className="relative z-10 flex cursor-pointer flex-col items-center bg-transparent p-0 text-left"
						onClick={() => onSelectPhase(index)}
					>
						<div
							className={cn(
								"relative mb-3 flex size-[60px] items-center justify-center rounded-full border-2 text-xl font-bold transition-all duration-300",
								isActive &&
									"scale-[1.08] border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30",
								isDone &&
									"border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25",
								!isActive &&
									!isDone &&
									"border-border bg-background text-muted-foreground"
							)}
						>
							<span>{index + 1}</span>

							{isActive ? (
								<span className="pointer-events-none absolute -inset-1.5 animate-ping rounded-full border-2 border-primary/40" />
							) : null}

							{isActive ? (
								<svg
									className="pointer-events-none absolute -inset-2 -rotate-90 size-[76px]"
									viewBox="0 0 76 76"
									aria-hidden="true"
								>
									<circle
										cx="38"
										cy="38"
										r="36"
										fill="none"
										stroke="hsl(var(--primary) / 0.15)"
										strokeWidth="2"
									/>
									<circle
										cx="38"
										cy="38"
										r="36"
										fill="none"
										stroke="hsl(var(--primary))"
										strokeWidth="2"
										strokeLinecap="round"
										strokeDasharray={
											ROADMAP_PROGRESS_CIRCUMFERENCE
										}
										strokeDashoffset={progressOffset}
									/>
								</svg>
							) : null}
						</div>

						<span
							className={cn(
								"mb-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
								getPeriodClass(step, isActive, isDone)
							)}
						>
							{step.period}
						</span>
						<span
							className={cn(
								"mb-1 text-center text-[15px] font-bold tracking-tight",
								isActive || isDone
									? "text-foreground"
									: "text-muted-foreground"
							)}
						>
							{step.title}
						</span>
						<span className="min-h-12 max-w-[180px] px-2 text-center text-xs leading-snug text-muted-foreground line-clamp-3">
							{step.tagline}
						</span>
					</button>
				);
			})}
		</div>
	);
};
