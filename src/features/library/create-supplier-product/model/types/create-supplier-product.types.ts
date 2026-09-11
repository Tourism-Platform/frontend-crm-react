import type { ComponentType, SVGProps } from "react";

import type { TLibraryPath, TSupplierIdPageKeys } from "@/shared/config";

import type { ENUM_SUPPLIER_TYPE_TYPE } from "@/entities/supplier";

export interface ICreateSupplierProductOption {
	type: ENUM_SUPPLIER_TYPE_TYPE;
	title: TSupplierIdPageKeys;
	description: TSupplierIdPageKeys;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	iconBgClassName: string;
	path: TLibraryPath;
}
