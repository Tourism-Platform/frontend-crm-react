import type { Icon } from "@solar-icons/react/lib/types";
import {
	CalendarMarkIcon,
	HeartPulseIcon,
	UsersGroupTwoRoundedIcon
} from "@solar-icons/react/outline";
import type { TFunction } from "i18next";

import type { IPreviewTourGeneral } from "@/entities/tour/preview-tour";

export interface IHeroInfo {
	icon: Icon;
	label: string;
}

const isAgeValue = (value?: number | ""): value is number =>
	value !== undefined && value !== "";

const formatDuration = (
	duration: IPreviewTourGeneral["duration"],
	t: TFunction<"preview_tour_page">
): string => {
	const parts: string[] = [];

	if (duration.from) {
		parts.push(t("hero.duration.days", { count: duration.from }));
	}

	if (duration.to) {
		parts.push(t("hero.duration.nights", { count: duration.to }));
	}

	return parts.join(" ");
};

const formatAgeRequires = (
	ageRequires: IPreviewTourGeneral["ageRequires"],
	t: TFunction<"preview_tour_page">
): string => {
	const from = ageRequires.from;
	const to = ageRequires.to;
	const hasFrom = isAgeValue(from);
	const hasTo = isAgeValue(to);

	if (!hasFrom && !hasTo) {
		return t("hero.age_no_restrictions");
	}

	if (hasFrom && hasTo) {
		return t("hero.age_requires_range", { from, to });
	}

	if (hasFrom) {
		return t("hero.age_requires_from", { from });
	}

	return t("hero.age_requires_to", { to: to as number });
};

export const HERO_INFO = (
	tour: IPreviewTourGeneral | undefined,
	t: TFunction<"preview_tour_page">
): IHeroInfo[] => {
	const info: IHeroInfo[] = [];

	if (!tour) return info;

	if (tour.duration?.from || tour.duration?.to) {
		info.push({
			icon: CalendarMarkIcon,
			label: formatDuration(tour.duration, t)
		});
	}

	if (tour.groupSize) {
		const persons = t("hero.group_size.persons", {
			count: tour.groupSize
		});
		const hasMin =
			tour.groupSizeMin != null && tour.groupSizeMin !== tour.groupSize;

		info.push({
			icon: UsersGroupTwoRoundedIcon,
			label: hasMin ? `${tour.groupSizeMin}–${persons}` : persons
		});
	}

	info.push({
		icon: HeartPulseIcon,
		label: formatAgeRequires(tour.ageRequires, t)
	});

	return info;
};
