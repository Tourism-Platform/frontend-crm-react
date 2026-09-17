import { SupplierPolicyWarning } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_SUPPLIER_POLICY_WARNING,
	type ENUM_SUPPLIER_POLICY_WARNING_TYPE,
	type ISupplierPolicyWarning,
	type TSupplierPolicyWarningBackend,
	type TSupplierPolicyWarningListBackend
} from "../../../types";
import { mapHotelPolicySurchargeFromBackend } from "../accommodation/hotel-policy.converters";

const MAP_SUPPLIER_POLICY_WARNING: Partial<
	Record<ENUM_SUPPLIER_POLICY_WARNING_TYPE, SupplierPolicyWarning>
> = {
	[ENUM_SUPPLIER_POLICY_WARNING.EARLY_CHECK_IN]:
		SupplierPolicyWarning.EarlyCheckIn,
	[ENUM_SUPPLIER_POLICY_WARNING.LATE_CHECK_OUT]:
		SupplierPolicyWarning.LateCheckOut,
	[ENUM_SUPPLIER_POLICY_WARNING.SUPPLIER_TYPE_MISMATCH]:
		SupplierPolicyWarning.SupplierTypeMismatch
};

export const supplierPolicyWarningCodeMapper = createEnumMapper<
	ENUM_SUPPLIER_POLICY_WARNING_TYPE,
	SupplierPolicyWarning
>(MAP_SUPPLIER_POLICY_WARNING);

export const mapSupplierPolicyWarningToFrontend = (
	data: TSupplierPolicyWarningBackend
): ISupplierPolicyWarning => ({
	tourOptionId: data.tour_option_id,
	eventId: data.event_id,
	optionId: data.option_id ?? null,
	supplierId: data.supplier_id,
	supplierName: data.supplier_name,
	code:
		supplierPolicyWarningCodeMapper.from(data.code) ??
		ENUM_SUPPLIER_POLICY_WARNING.SUPPLIER_TYPE_MISMATCH,
	path: data.path,
	detail: data.detail,
	expectedSurcharge: mapHotelPolicySurchargeFromBackend(
		data.expected_surcharge
	)
});

export const mapSupplierPolicyWarningListToFrontend = (
	data: TSupplierPolicyWarningListBackend
): ISupplierPolicyWarning[] => data.map(mapSupplierPolicyWarningToFrontend);
