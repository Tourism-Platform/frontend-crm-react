import { Media } from "../../../ui";
import { GeneralInfo } from "../../ui";
import {
	ENUM_MULTIPLY_OPTION_EDIT_TAB,
	type IMultiplyOptionEditTabs
} from "../types";

export const MULTIPLY_OPTION_EDIT_TABS_LIST: IMultiplyOptionEditTabs[] = [
	{
		label: "tabs.general",
		type: ENUM_MULTIPLY_OPTION_EDIT_TAB.GENERAL,
		slot: GeneralInfo
	},
	{
		label: "tabs.media",
		type: ENUM_MULTIPLY_OPTION_EDIT_TAB.MEDIA,
		slot: Media
	}
];
