import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/shared/ui";

import { SectionHeader } from "../section-header";

import { NetworkBeamVisual } from "./network-beam-visual";

export const NetworkSection: FC = () => {
	const { t } = useTranslation("main");

	return (
		<section className="bg-muted/30 px-4 py-16">
			<SectionHeader
				eyebrow={t("network.eyebrow")}
				title={t("network.title")}
				subtitle={t("network.subtitle")}
			/>

			<Card className="mx-auto max-w-5xl overflow-hidden">
				<CardContent>
					<NetworkBeamVisual />
				</CardContent>
			</Card>
		</section>
	);
};
