import {
	ENUM_SUPPLIER_SURCHARGE,
	type IHotelPolicy,
	type ISupplierPolicyBand,
	type THotelPolicyInputBackend,
	type THotelPolicyReadBackend,
	type TSupplierPolicyBandInputBackend,
	type TSupplierSurcharge
} from "../../types";
import {
	mapMonetaryFromBackend,
	mapMonetaryToBackend
} from "../supplier-money.converters";

const mapSurchargeToBackend = (
	surcharge: TSupplierSurcharge | null | undefined
): TSupplierPolicyBandInputBackend["surcharge"] | null => {
	if (!surcharge) return null;

	switch (surcharge.typ) {
		case ENUM_SUPPLIER_SURCHARGE.PERCENTAGE:
			return {
				typ: "percentage",
				percentage: surcharge.percentage
			};
		case ENUM_SUPPLIER_SURCHARGE.FIXED:
		default:
			return {
				typ: "fixed",
				cost: mapMonetaryToBackend(surcharge.cost)
			};
	}
};

const mapSurchargeFromBackend = (
	surcharge: TSupplierPolicyBandInputBackend["surcharge"]
): TSupplierSurcharge | null => {
	if (!surcharge) {
		return null;
	}

	if (surcharge.typ === "percentage" || "percentage" in surcharge) {
		const percentage =
			"percentage" in surcharge &&
			typeof surcharge.percentage === "number"
				? surcharge.percentage
				: 0;

		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage
		};
	}

	return {
		typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
		cost: mapMonetaryFromBackend(
			"cost" in surcharge ? surcharge.cost : undefined
		)
	};
};

export const mapSupplierPolicyBandToBackend = (
	band: ISupplierPolicyBand
): TSupplierPolicyBandInputBackend => ({
	from_time: band.fromTime,
	to_time: band.toTime,
	surcharge: mapSurchargeToBackend(band.surcharge),
	note: band.note
});

export const mapSupplierPolicyBandFromBackend = (band: {
	from_time?: string | null;
	to_time?: string | null;
	surcharge?: TSupplierPolicyBandInputBackend["surcharge"];
	note?: string | null;
}): ISupplierPolicyBand => ({
	fromTime: band.from_time ?? null,
	toTime: band.to_time ?? null,
	surcharge: mapSurchargeFromBackend(band.surcharge),
	note: band.note ?? null
});

export const mapHotelPolicyToBackend = (
	policy: IHotelPolicy | null | undefined
): THotelPolicyInputBackend | null => {
	if (!policy) return null;

	return {
		check_in_from: policy.checkInFrom,
		check_out_until: policy.checkOutUntil,
		early_check_in: policy.earlyCheckIn.map(mapSupplierPolicyBandToBackend),
		late_check_out: policy.lateCheckOut.map(mapSupplierPolicyBandToBackend)
	};
};

export const mapHotelPolicyFromBackend = (
	policy: THotelPolicyReadBackend
): IHotelPolicy | null => {
	if (!policy) {
		return null;
	}

	return {
		checkInFrom: policy.check_in_from ?? null,
		checkOutUntil: policy.check_out_until ?? null,
		earlyCheckIn: (policy.early_check_in ?? []).map(
			mapSupplierPolicyBandFromBackend
		),
		lateCheckOut: (policy.late_check_out ?? []).map(
			mapSupplierPolicyBandFromBackend
		)
	};
};
