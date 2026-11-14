import {
	Buildings2Icon,
	UsersGroupRoundedIcon
} from "@solar-icons/react/outline";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import type { TAudienceTabId } from "../../model";

interface IFinalCtaSectionProps {
	onAudienceCta: (audience: TAudienceTabId) => void;
	onNavigateCta: () => void;
}

export const FinalCtaSection: FC<IFinalCtaSectionProps> = ({
	onAudienceCta,
	onNavigateCta
}) => {
	const { t } = useTranslation("main");

	return (
		<section id="pricing" className="bg-background px-4 py-16">
			<div className="mx-auto max-w-5xl rounded-3xl bg-card px-6 py-14 text-center shadow-sm">
				<div className="mx-auto max-w-2xl space-y-6">
					<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
						{t("cta.title")}
					</h2>
					<p className="text-lg text-muted-foreground">
						{t("cta.subtitle")}
					</p>

					<div className="flex flex-wrap justify-center gap-3">
						<Button
							size="lg"
							onClick={() => onAudienceCta("operator")}
						>
							<Buildings2Icon className="size-4" />
							{t("cta.buttons.operator")}
						</Button>
						<Button
							size="lg"
							variant="glass"
							onClick={onNavigateCta}
						>
							<UsersGroupRoundedIcon className="size-4" />
							{t("cta.buttons.agency")}
						</Button>
					</div>

					<p className="text-sm text-muted-foreground">
						{t("cta.footnote")}
					</p>
				</div>
			</div>
		</section>
	);
};
