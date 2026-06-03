import { FinanceInfo } from "../../ui/finance-info";
import { GeneralInfo } from "../../ui/general-info";
import { ENUM_SETTINGS_TAB, type ISettingsTabs } from "../types";

export const SETTINGS_TABS_LIST: ISettingsTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_SETTINGS_TAB.GENERAL,
		slot: GeneralInfo
	},
	{
		label: "tabs.finance",
		type: ENUM_SETTINGS_TAB.FINANCE,
		slot: FinanceInfo
	}
];
