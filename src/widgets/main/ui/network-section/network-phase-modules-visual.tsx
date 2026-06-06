import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";

import { ROADMAP_MODULE_ITEMS_LIST } from "../../model";
import type { TRoadmapModuleItem } from "../../model";

import { NetworkPhaseVisualCard } from "./network-phase-visual-card";

interface INetworkPhaseModulesVisualProps {
	visualLabel: string;
}

export const NetworkPhaseModulesVisual: FC<INetworkPhaseModulesVisualProps> = ({
	visualLabel
}) => {
	const { t } = useTranslation("main");

	return (
		<NetworkPhaseVisualCard label={visualLabel}>
			<div className="grid grid-cols-2 gap-3">
				{ROADMAP_MODULE_ITEMS_LIST.map(
					({ id, icon: Icon, iconClassName }) => {
						const { name } = t(`roadmap.modules.${id}`, {
							returnObjects: true
						}) as TRoadmapModuleItem;

						return (
							<div
								key={id}
								className="flex items-center gap-3 rounded-xl border bg-card px-3.5 py-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
							>
								<div
									className={cn(
										"flex size-9 shrink-0 items-center justify-center rounded-[9px]",
										iconClassName
									)}
								>
									<Icon className="size-4" />
								</div>
								<div>
									<p className="text-sm font-semibold leading-tight">
										{name}
									</p>
									<p className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
										<span className="size-1 rounded-full bg-emerald-600" />
										{t("roadmap.controls.live")}
									</p>
								</div>
							</div>
						);
					}
				)}
			</div>
		</NetworkPhaseVisualCard>
	);
};
