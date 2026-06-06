import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { ROADMAP_INTEGRATION_ITEMS_LIST } from "../../model";

import { NetworkPhaseVisualCard } from "./network-phase-visual-card";

interface INetworkPhaseAiVisualProps {
	visualLabel: string;
}

export const NetworkPhaseAiVisual: FC<INetworkPhaseAiVisualProps> = ({
	visualLabel
}) => {
	const { t } = useTranslation("main");

	return (
		<NetworkPhaseVisualCard label={visualLabel}>
			<div className="flex flex-col gap-2.5">
				<p className="ml-auto max-w-[88%] rounded-xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground">
					{t("roadmap.ai.userMessage")}
				</p>

				<div className="max-w-[88%]">
					<div className="mb-1.5 flex items-center gap-2">
						<div className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-600 text-[9px] font-bold text-white">
							T
						</div>
						<span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
							{t("roadmap.ai.botName")}
						</span>
					</div>
					<p className="rounded-xl rounded-bl-sm bg-background px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
						{t("roadmap.ai.botMessage")}
					</p>
				</div>

				<div className="inline-flex w-fit items-center gap-[3px] rounded-xl rounded-bl-sm bg-background px-3 py-2">
					{[0, 1, 2].map((dot) => (
						<span
							key={dot}
							className="size-[5px] animate-pulse rounded-full bg-muted-foreground/50"
							style={{ animationDelay: `${dot * 200}ms` }}
						/>
					))}
				</div>
			</div>

			<div className="mt-4 flex flex-wrap items-center gap-2 border-t border-dashed pt-4">
				<span className="mr-1 text-[11px] font-medium text-muted-foreground">
					{t("roadmap.ai.integrationsLabel")}
				</span>
				{ROADMAP_INTEGRATION_ITEMS_LIST.map(({ id }) => (
					<span
						key={id}
						className="inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-[11px] font-medium"
					>
						<span className="size-1.5 rounded-full bg-emerald-500" />
						{t(`roadmap.integrations.${id}`)}
					</span>
				))}
				<span className="text-[11px] text-muted-foreground">
					{t("roadmap.ai.integrationsMore")}
				</span>
			</div>
		</NetworkPhaseVisualCard>
	);
};
