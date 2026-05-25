import { ENUM_PATH } from "@/shared/config";
import type { INavItemBase } from "@/shared/ui";

export const NAV_ITEMS_LIST: INavItemBase[] = [
	{
		label: "public.solutions",
		href: `${ENUM_PATH.MAIN}#solutions`
	},
	{
		label: "public.pricing",
		href: `${ENUM_PATH.MAIN}#pricing`
	}
];
