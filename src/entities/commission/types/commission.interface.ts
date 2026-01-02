import type { ENUM_CURRENCY_OPTIONS_TYPE } from "./currency.types";

export interface ICommission {
	id: string;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	rate: number;
}
