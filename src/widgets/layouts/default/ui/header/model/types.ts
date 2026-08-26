import type { ReactNode } from "react";

import type { THeaderKeys } from "@/shared/config";

export type TPublicNavItem = {
	labelKey: THeaderKeys;
	descriptionKey: THeaderKeys;
	icon: ReactNode;
};

export type TPublicNavSection = {
	labelKey?: THeaderKeys;
	items: TPublicNavItem[];
};

export type TPublicNavGroup = {
	labelKey: THeaderKeys;
	sections: TPublicNavSection[];
};
