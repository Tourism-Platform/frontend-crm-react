import { Check } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Safari } from "@/shared/ui";

import { ProblemChaosPanel } from "./problem-chaos-panel";

export const ProblemTourlinkVisual: FC = () => {
	const { t } = useTranslation("main");
	const sidebarItems = t("problem.visual.sidebar_items", {
		returnObjects: true
	}) as string[];
	const benefits = t("problem.visual.benefits", {
		returnObjects: true
	}) as string[];

	return (
		<div className="flex min-h-[420px] flex-col bg-card p-5 lg:border-l lg:border-border">
			<div className="mb-4 space-y-1">
				<span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm">
					<span
						className="size-1.5 rounded-full bg-primary-foreground"
						aria-hidden
					/>
					{t("problem.visual.afterBadge")}
				</span>
				<p className="text-sm font-semibold leading-snug text-foreground">
					{t("problem.visual.solutionHeadline")}
				</p>
				<p className="text-xs text-muted-foreground">
					{t("problem.visual.solutionSubtitle")}
				</p>
			</div>

			<Safari url={t("problem.visual.tourlinkUrl")}>
				<div className="grid gap-4 p-4 sm:grid-cols-[120px_1fr]">
					<div className="space-y-1 rounded-md bg-muted/50 p-2">
						<p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
							{t("problem.visual.sidebar_title")}
						</p>
						{sidebarItems.map((item, index) => (
							<div
								key={item}
								className={cn(
									"rounded-md px-2 py-1 text-xs",
									index === 0
										? "bg-accent font-medium text-accent-foreground"
										: "text-muted-foreground"
								)}
							>
								{item}
							</div>
						))}
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-2 rounded-md bg-muted/50 px-2 py-1.5 text-xs">
							<div className="flex size-6 items-center justify-center rounded-md bg-muted">
								<Check className="size-3.5" />
							</div>
							<span className="font-medium">
								{t("problem.visual.tour_row")}
							</span>
						</div>
						<div className="flex items-center gap-2 rounded-md bg-muted/50 px-2 py-1.5 text-xs text-muted-foreground">
							<div className="size-6 rounded-md bg-muted" />
							<span>
								{t("problem.visual.tour_row_secondary")}
							</span>
						</div>
					</div>
				</div>
			</Safari>

			<ul className="mt-4 space-y-2">
				{benefits.map((benefit) => (
					<li
						key={benefit}
						className="flex items-start gap-2 text-xs text-muted-foreground"
					>
						<Check className="mt-0.5 size-3.5 shrink-0 text-foreground" />
						<span>{benefit}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export const ProblemVisual: FC = () => {
	const { t } = useTranslation("main");

	return (
		<div className="overflow-hidden">
			<div className="lg:grid lg:grid-cols-2">
				<ProblemChaosPanel />
				<ProblemTourlinkVisual />
			</div>

			<div className="border-t border-border bg-muted/30 px-5 py-3.5 text-center">
				<p className="text-sm font-medium text-foreground">
					{t("problem.visual.resolution")}
				</p>
			</div>
		</div>
	);
};
