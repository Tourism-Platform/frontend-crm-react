import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";

import { ROADMAP_REGION_CITIES_LIST } from "../../model";
import type { TRoadmapRegionStat } from "../../model";

import { NetworkPhaseVisualCard } from "./network-phase-visual-card";

interface INetworkPhaseRegionVisualProps {
	visualLabel: string;
}

export const NetworkPhaseRegionVisual: FC<INetworkPhaseRegionVisualProps> = ({
	visualLabel
}) => {
	const { t } = useTranslation("main");
	const stats = t("roadmap.region.stats", {
		returnObjects: true
	}) as TRoadmapRegionStat[];

	return (
		<NetworkPhaseVisualCard label={visualLabel}>
			<div className="relative h-[320px] overflow-hidden rounded-xl bg-background">
				<svg
					className="pointer-events-none absolute inset-0 size-full"
					viewBox="0 0 400 320"
					preserveAspectRatio="none"
					aria-hidden="true"
				>
					<defs>
						<linearGradient
							id="regionLineGrad"
							x1="0%"
							y1="0%"
							x2="100%"
							y2="100%"
						>
							<stop
								offset="0%"
								stopColor="#1EA7FD"
								stopOpacity="0.5"
							/>
							<stop
								offset="100%"
								stopColor="#7C3AED"
								stopOpacity="0.5"
							/>
						</linearGradient>
					</defs>
					<path
						d="M 60 80 Q 120 50 200 60 Q 280 70 340 100 Q 360 160 320 220 Q 250 270 180 260 Q 100 250 70 200 Q 40 140 60 80 Z"
						fill="none"
						stroke="#D1D5DB"
						strokeWidth="1"
						strokeDasharray="3 4"
					/>
					<path
						d="M 200 130 L 165 150 L 205 175 L 250 145 L 200 130"
						stroke="url(#regionLineGrad)"
						strokeWidth="1.5"
						fill="none"
					/>
					<line
						x1="200"
						y1="130"
						x2="100"
						y2="100"
						stroke="#D1D5DB"
						strokeWidth="1"
						strokeDasharray="2 3"
					/>
					<line
						x1="205"
						y1="175"
						x2="290"
						y2="220"
						stroke="#D1D5DB"
						strokeWidth="1"
						strokeDasharray="2 3"
					/>
					<line
						x1="250"
						y1="145"
						x2="310"
						y2="100"
						stroke="#D1D5DB"
						strokeWidth="1"
						strokeDasharray="2 3"
					/>
				</svg>

				{ROADMAP_REGION_CITIES_LIST.map(
					({ id, left, top, isFuture }) => (
						<div
							key={id}
							className="absolute z-[2] -translate-x-1/2 -translate-y-1/2"
							style={{ left, top }}
						>
							<div
								className={cn(
									"relative size-3.5 rounded-full border-2 shadow-[0_2px_6px_rgba(0,0,0,0.2)]",
									isFuture
										? "border-muted-foreground bg-card"
										: "border-white bg-primary before:absolute before:-inset-1.5 before:animate-region-pin-pulse before:rounded-full before:border before:border-primary before:opacity-50 before:content-[''] motion-reduce:before:animate-none"
								)}
							/>
							<div
								className={cn(
									"absolute top-[18px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-[3px] text-[10px] font-semibold text-foreground shadow-sm",
									isFuture && "opacity-60"
								)}
							>
								{t(`roadmap.region.cities.${id}`)}
							</div>
						</div>
					)
				)}
			</div>

			<div className="mt-4 grid grid-cols-3 gap-2.5">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="rounded-lg bg-background p-2.5 text-center"
					>
						<p className="bg-gradient-to-br from-primary to-violet-600 bg-clip-text text-lg font-bold tracking-tight text-transparent">
							{stat.value}
						</p>
						<p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
							{stat.label}
						</p>
					</div>
				))}
			</div>
		</NetworkPhaseVisualCard>
	);
};
