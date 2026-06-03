import { type LucideIcon, Mail, MapPin, Phone } from "lucide-react";

import type { IPreviewOperator } from "@/entities/tour";

export interface IProviderContact {
	value: string;
	icon: LucideIcon;
}

export const PROVIDER_CONTACTS = (
	providerData?: IPreviewOperator
): IProviderContact[] => [
	{
		icon: Phone,
		value: providerData?.phone ?? "--//--"
	},
	{
		icon: Mail,
		value: providerData?.email ?? "--//--"
	},
	{
		icon: MapPin,
		value: providerData?.address ?? "--//--"
	}
	// {
	// 	icon: Info,
	// 	value: "providerData.additionalInfo"
	// }
];
