import { FinanceSettings, General } from "../../ui";
import { ENUM_SETTINGS_TAB, type ISettingsTabs } from "../types";

export const SETTINGS_TABS_LIST: ISettingsTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_SETTINGS_TAB.GENERAL,
		slot: General
	},
	{
		label: "tabs.finance",
		type: ENUM_SETTINGS_TAB.FINANCE,
		slot: FinanceSettings
	}
];
