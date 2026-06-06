import type { LucideIcon } from "lucide-react";

import type { THeaderKeys } from "@/shared/config";

export type TPublicNavItem = {
	labelKey: THeaderKeys;
	descriptionKey: THeaderKeys;
	icon: LucideIcon;
};

export type TPublicNavSection = {
	labelKey?: THeaderKeys;
	items: TPublicNavItem[];
};

export type TPublicNavGroup = {
	labelKey: THeaderKeys;
	sections: TPublicNavSection[];
};
