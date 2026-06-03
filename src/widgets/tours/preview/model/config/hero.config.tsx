import type { TFunction } from "i18next";
import { Calendar, Globe, type LucideIcon, Users } from "lucide-react";

import type { ITourGeneral } from "@/entities/tour";

export interface IHeroInfo {
	icon: LucideIcon;
	label: string;
}

export const HERO_INFO = (
	tour: ITourGeneral | undefined,
	t: TFunction<"preview_tour_page">
): IHeroInfo[] => {
	const info: IHeroInfo[] = [];

	if (!tour) return info;

	if (tour.duration) {
		const label =
			tour.duration.from === tour.duration.to
				? t("hero.duration.days", { count: tour.duration.from })
				: t("hero.duration_range", {
						from: tour.duration.from,
						to: tour.duration.to
					});

		info.push({
			icon: Calendar,
			label
		});
	}

	if (tour.groupSize) {
		info.push({
			icon: Users,
			label: t("hero.group_size.persons", { count: tour.groupSize })
		});
	}

	if (tour.ageRequires) {
		info.push({
			icon: Globe,
			label: t("hero.age_requires", {
				from: tour.ageRequires.from,
				to: tour.ageRequires.to
			})
		});
	}

	return info;
};
