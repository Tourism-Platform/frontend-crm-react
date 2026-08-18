import type { TTourPackageEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	ENUM_PACKAGE_FIELD,
	type ENUM_PACKAGE_FIELD_TYPE,
	ENUM_PACKAGE_PRICING_TYPE,
	type ENUM_PACKAGE_PRICING_TYPE_TYPE
} from "@/entities/tour";

export { ENUM_PACKAGE_PRICING_TYPE };

export type TPackageFormField = TFormField<
	TTourPackageEditPageKeys,
	ENUM_PACKAGE_FIELD_TYPE
>;

export interface IPackagePricingTab {
	label: TTourPackageEditPageKeys;
	type: ENUM_PACKAGE_PRICING_TYPE_TYPE;
	priceDetailsList: TPackageFormField[];
}

export { ENUM_PACKAGE_FIELD };
