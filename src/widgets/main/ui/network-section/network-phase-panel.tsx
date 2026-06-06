import { Check } from "lucide-react";
import type { FC, ReactNode } from "react";

import { cn } from "@/shared/lib";

import type { TRoadmapPhase, TRoadmapStep } from "../../model";

interface INetworkPhasePanelProps {
	phase: TRoadmapPhase;
	visual: ReactNode;
}

const BADGE_VARIANT_CLASS: Record<TRoadmapPhase["badgeVariant"], string> = {
	now: "bg-emerald-500/10 text-emerald-600",
	soon: "bg-amber-500/10 text-amber-600",
	future: "bg-violet-500/10 text-violet-600"
};

export const BANNER_VARIANT_CLASS: Record<
	TRoadmapPhase["badgeVariant"],
	string
> = {
	now: "bg-amber-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)]",
	soon: "bg-amber-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.3)]",
	future: "bg-violet-600 text-white shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
};

export const NetworkPhasePanel: FC<INetworkPhasePanelProps> = ({
	phase,
	visual
}) => (
	<div className="grid gap-6 p-6 md:grid-cols-2 md:items-center md:p-8 lg:gap-8">
		<div className="flex flex-col justify-center self-start">
			<span
				className={cn(
					"mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
					BADGE_VARIANT_CLASS[phase.badgeVariant]
				)}
			>
				{phase.badgeVariant === "now" ? (
					<span
						className="size-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(22,163,74,0.2)]"
						aria-hidden="true"
					/>
				) : null}
				{phase.badge}
			</span>

			<h3 className="text-3xl font-bold tracking-tight">
				{phase.title.before}
				<span className="bg-gradient-to-br from-primary to-violet-600 bg-clip-text text-transparent">
					{phase.title.highlight}
				</span>
				{phase.title.after}
			</h3>

			<p className="mt-4 text-muted-foreground">{phase.description}</p>

			<ul className="mt-8 flex flex-col gap-4">
				{phase.bullets.map((bullet) => (
					<li
						key={bullet}
						className="flex items-start gap-3 text-sm text-muted-foreground"
					>
						<Check
							className="mt-0.5 size-4 shrink-0 text-primary"
							strokeWidth={2.5}
							aria-hidden="true"
						/>
						<span>{bullet}</span>
					</li>
				))}
			</ul>
		</div>

		<div className="flex w-full min-w-0 items-center justify-center">
			{visual}
		</div>
	</div>
);

interface INetworkPhaseMobileStepProps {
	steps: TRoadmapStep[];
	activePhase: number;
	onSelectPhase: (index: number) => void;
}

export const NetworkPhaseMobileSteps: FC<INetworkPhaseMobileStepProps> = ({
	steps,
	activePhase,
	onSelectPhase
}) => (
	<div className="mb-6 space-y-0 border-b md:hidden">
		{steps.map((step, index) => {
			const isActive = index === activePhase;

			return (
				<button
					key={step.title}
					type="button"
					className="flex w-full cursor-pointer items-center gap-4 border-b py-4 text-left last:border-b-0"
					onClick={() => onSelectPhase(index)}
				>
					<div
						className={cn(
							"flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold",
							isActive
								? "border-primary bg-primary text-primary-foreground"
								: "border-border text-muted-foreground"
						)}
					>
						{index + 1}
					</div>
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
							{step.period}
						</p>
						<p className="font-bold">{step.title}</p>
						<p className="text-xs text-muted-foreground">
							{step.tagline}
						</p>
					</div>
				</button>
			);
		})}
	</div>
);
