import type { Icon } from "@solar-icons/react/lib/types";
import {
	LetterIcon,
	MapPointIcon,
	PhoneIcon
} from "@solar-icons/react/outline";

import type { IPreviewOperator } from "@/entities/tour";

export interface IProviderContact {
	value: string;
	icon: Icon;
}

export const PROVIDER_CONTACTS = (
	providerData?: IPreviewOperator
): IProviderContact[] => [
	{
		icon: PhoneIcon,
		value: providerData?.phone ?? "--//--"
	},
	{
		icon: LetterIcon,
		value: providerData?.email ?? "--//--"
	},
	{
		icon: MapPointIcon,
		value: providerData?.address ?? "--//--"
	}
	// {
	// 	icon: Info,
	// 	value: "providerData.additionalInfo"
	// }
];
