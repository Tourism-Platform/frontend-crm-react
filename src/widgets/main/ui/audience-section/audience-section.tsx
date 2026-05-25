import { Building2, Users } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";

import type { TAudienceTab, TAudienceTabId } from "../../model";
import { SectionHeader } from "../section-header";

import { AgencyPanel } from "./agency-panel";
import { OperatorPanel } from "./operator-panel";

interface IAudienceSectionProps {
	activeTab: TAudienceTabId;
	onTabChange: (tab: TAudienceTabId) => void;
	sectionRef: React.RefObject<HTMLElement | null>;
}

const TAB_ICONS = {
	operator: Building2,
	agency: Users
} as const;

export const AudienceSection: FC<IAudienceSectionProps> = ({
	activeTab,
	onTabChange,
	sectionRef
}) => {
	const { t } = useTranslation("main");
	const tabs = t("audience.tabs", { returnObjects: true }) as TAudienceTab[];

	return (
		<section
			id="solutions"
			ref={sectionRef}
			className="bg-background px-4 py-16"
		>
			<SectionHeader
				eyebrow={t("audience.eyebrow")}
				title={t("audience.title")}
				subtitle={t("audience.subtitle")}
			/>

			<div className="mx-auto mb-10 flex justify-center">
				<div className="inline-flex rounded-full border bg-muted p-1">
					{tabs.map((tab) => {
						const Icon = TAB_ICONS[tab.id as TAudienceTabId];
						const isActive = activeTab === tab.id;

						return (
							<button
								key={tab.id}
								type="button"
								className={cn(
									"inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition",
									isActive
										? "bg-primary text-primary-foreground shadow-sm"
										: "text-muted-foreground hover:text-foreground"
								)}
								onClick={() =>
									onTabChange(tab.id as TAudienceTabId)
								}
							>
								<Icon className="size-4" />
								{tab.label}
							</button>
						);
					})}
				</div>
			</div>

			<div className="mx-auto max-w-6xl">
				{activeTab === "operator" ? <OperatorPanel /> : <AgencyPanel />}
			</div>
		</section>
	);
};
