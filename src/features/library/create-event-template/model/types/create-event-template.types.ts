import type { ComponentType, SVGProps } from "react";

import type { TEventTemplatesPageKeys, TLibraryPath } from "@/shared/config";

import type { ENUM_EVENT_TYPE } from "@/entities/tour";

export interface ICreateEventTemplateOption {
	type: ENUM_EVENT_TYPE;
	title: TEventTemplatesPageKeys;
	description: TEventTemplatesPageKeys;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	iconBgClassName: string;
	path: TLibraryPath;
}
