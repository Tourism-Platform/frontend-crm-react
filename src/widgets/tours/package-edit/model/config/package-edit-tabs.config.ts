import { type IQueryTab } from "@/shared/ui";

import type { TPackageEditSchema } from "@/entities/tour";

import { PackagePricing } from "../../ui";
import {
	ENUM_FORM_SECTION,
	type ENUM_FORM_SECTION_TYPE,
	ENUM_PACKAGE_EDIT_TAB,
	type ENUM_PACKAGE_EDIT_TAB_TYPE,
	type IPackageEditSlotContext
} from "../types";

export const PACKAGE_EDIT_TABS_LIST: IQueryTab<
	ENUM_PACKAGE_EDIT_TAB_TYPE,
	"tour_package_edit_page",
	ENUM_FORM_SECTION_TYPE,
	TPackageEditSchema,
	IPackageEditSlotContext
>[] = [
	{
		label: "tabs.pricing",
		type: ENUM_PACKAGE_EDIT_TAB.PRICING,
		slot: PackagePricing,
		section: ENUM_FORM_SECTION.PRICING,
		getSlotProps: ({ backToEventHref }) => ({ backToEventHref })
	}
];
