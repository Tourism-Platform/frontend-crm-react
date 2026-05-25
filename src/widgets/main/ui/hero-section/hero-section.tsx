import { ArrowRight, Check } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import type { TAudienceTabId } from "../../model";

import { HeroVisual } from "./hero-visual";

interface IHeroSectionProps {
	onAudienceCta: (audience: TAudienceTabId) => void;
}

export const HeroSection: FC<IHeroSectionProps> = ({ onAudienceCta }) => {
	const { t } = useTranslation("main");
	const metaItems = t("hero.meta", { returnObjects: true }) as string[];

	return (
		<section className="relative overflow-hidden bg-background px-6 pb-20 pt-10">
			<div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
				<div>
					<div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
						<span className="size-2 rounded-full bg-primary" />
						{t("hero.badge")}
					</div>

					<h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
						{t("hero.title.line1")}
						<span className="mt-2 block text-primary">
							{t("hero.title.line2")}
						</span>
					</h1>

					<p className="mt-5 max-w-xl text-lg text-muted-foreground">
						{t("hero.subtitle")}
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<Button
							size="lg"
							onClick={() => onAudienceCta("operator")}
						>
							{t("hero.cta.operator")}
							<ArrowRight className="size-4" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							onClick={() => onAudienceCta("agency")}
						>
							{t("hero.cta.agency")}
							<ArrowRight className="size-4" />
						</Button>
					</div>

					<ul className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
						{metaItems.map((item) => (
							<li key={item} className="flex items-center gap-2">
								<Check className="size-4 text-primary" />
								{item}
							</li>
						))}
					</ul>
				</div>

				<HeroVisual />
			</div>
		</section>
	);
};
