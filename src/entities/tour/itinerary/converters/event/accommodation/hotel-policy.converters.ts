import {
	DEFAULT_EVENT_CURRENCY,
	currencyConverter
} from "@/entities/commission";

import {
	ENUM_HOTEL_POLICY_SURCHARGE,
	type IHotelPolicy,
	type IHotelPolicyBand,
	type IHotelPolicyMonetary,
	type THotelPolicyBandInputBackend,
	type THotelPolicyInputBackend,
	type THotelPolicyMonetaryBackend,
	type THotelPolicyOutputBackend,
	type THotelPolicySurcharge
} from "../../../types";

const mapMonetaryToBackend = (
	data: IHotelPolicyMonetary
): THotelPolicyMonetaryBackend => ({
	val: data.val,
	currency: currencyConverter.to(data.currency)!
});

const mapMonetaryFromBackend = (
	value?: THotelPolicyMonetaryBackend | null
): IHotelPolicyMonetary => ({
	val: value?.val ?? 0,
	currency: currencyConverter.from(value?.currency) ?? DEFAULT_EVENT_CURRENCY
});

const mapSurchargeToBackend = (
	surcharge: THotelPolicySurcharge
): NonNullable<THotelPolicyBandInputBackend["surcharge"]> => {
	switch (surcharge.typ) {
		case ENUM_HOTEL_POLICY_SURCHARGE.PERCENTAGE:
			return {
				typ: "percentage",
				percentage: surcharge.percentage
			};
		case ENUM_HOTEL_POLICY_SURCHARGE.FIXED:
			return {
				typ: "fixed",
				cost: mapMonetaryToBackend(surcharge.cost)
			};
	}
};

export const mapHotelPolicySurchargeFromBackend = (
	surcharge?: THotelPolicyBandInputBackend["surcharge"] | null
): THotelPolicySurcharge | null => {
	if (!surcharge) {
		return null;
	}

	switch (surcharge.typ) {
		case "percentage":
			return {
				typ: ENUM_HOTEL_POLICY_SURCHARGE.PERCENTAGE,
				percentage: surcharge.percentage ?? 0
			};
		case "fixed":
			return {
				typ: ENUM_HOTEL_POLICY_SURCHARGE.FIXED,
				cost: mapMonetaryFromBackend(surcharge.cost)
			};
		default:
			return null;
	}
};

export const mapHotelPolicyBandToBackend = (
	band: IHotelPolicyBand
): THotelPolicyBandInputBackend => ({
	from_time: band.fromTime,
	to_time: band.toTime,
	surcharge: band.surcharge ? mapSurchargeToBackend(band.surcharge) : null,
	note: band.note
});

export const mapHotelPolicyBandFromBackend = (band: {
	from_time?: string | null;
	to_time?: string | null;
	surcharge?: THotelPolicyBandInputBackend["surcharge"];
	note?: string | null;
}): IHotelPolicyBand => ({
	fromTime: band.from_time ?? null,
	toTime: band.to_time ?? null,
	surcharge: mapHotelPolicySurchargeFromBackend(band.surcharge),
	note: band.note ?? null
});

/** null-in → null-out */
export const mapHotelPolicyToBackend = (
	policy?: IHotelPolicy | null
): THotelPolicyInputBackend | null => {
	if (!policy) {
		return null;
	}

	return {
		check_in_from: policy.checkInFrom,
		check_out_until: policy.checkOutUntil,
		early_check_in: policy.earlyCheckIn.map(mapHotelPolicyBandToBackend),
		late_check_out: policy.lateCheckOut.map(mapHotelPolicyBandToBackend)
	};
};

/** null-in → null-out */
export const mapHotelPolicyFromBackend = (
	policy?: THotelPolicyOutputBackend | null
): IHotelPolicy | null => {
	if (!policy) {
		return null;
	}

	return {
		checkInFrom: policy.check_in_from ?? null,
		checkOutUntil: policy.check_out_until ?? null,
		earlyCheckIn: (policy.early_check_in ?? []).map(
			mapHotelPolicyBandFromBackend
		),
		lateCheckOut: (policy.late_check_out ?? []).map(
			mapHotelPolicyBandFromBackend
		)
	};
};
