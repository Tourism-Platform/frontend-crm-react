import type { TSupplierSurcharge } from "../supplier-money.types";

export interface ISupplierPolicyBand {
	fromTime: string | null;
	toTime: string | null;
	surcharge: TSupplierSurcharge | null;
	note: string | null;
}

export interface IHotelPolicy {
	checkInFrom: string | null;
	checkOutUntil: string | null;
	earlyCheckIn: ISupplierPolicyBand[];
	lateCheckOut: ISupplierPolicyBand[];
}
