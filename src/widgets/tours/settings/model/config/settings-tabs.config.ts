import { type IQueryTab } from "@/shared/ui";

import { FinanceInfo } from "../../ui/finance-info";
import { GeneralInfo } from "../../ui/general-info";
import { TranslationsInfo } from "../../ui/translations-info";
import { ENUM_SETTINGS_TAB, type ENUM_SETTINGS_TAB_TYPE } from "../types";

export const SETTINGS_TABS_LIST: IQueryTab<
	ENUM_SETTINGS_TAB_TYPE,
	"tour_settings_page"
>[] = [
	{
		label: "tabs.general",
		type: ENUM_SETTINGS_TAB.GENERAL,
		slot: GeneralInfo
	},
	{
		label: "tabs.finance",
		type: ENUM_SETTINGS_TAB.FINANCE,
		slot: FinanceInfo
	},
	{
		label: "tabs.translations",
		type: ENUM_SETTINGS_TAB.TRANSLATIONS,
		slot: TranslationsInfo
	}
];
