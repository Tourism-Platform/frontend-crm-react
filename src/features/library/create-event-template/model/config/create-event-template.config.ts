import { DrivingIcon } from "@/shared/assets";
import { ENUM_PATH } from "@/shared/config";

import { ENUM_EVENT } from "@/entities/tour";

import type { ICreateEventTemplateOption } from "../types";

export const CREATE_EVENT_TEMPLATE_OPTIONS: ICreateEventTemplateOption[] = [
	{
		type: ENUM_EVENT.TRANSPORTATION,
		title: "create.transfer.title",
		description: "create.transfer.description",
		icon: DrivingIcon,
		iconBgClassName: "bg-emerald-600",
		path: ENUM_PATH.LIBRARY.EVENT_TRANSFER
	}
];
