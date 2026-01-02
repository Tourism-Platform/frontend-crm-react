import { ENUM_CURRENCY_OPTIONS, type ICommissionBackend } from "../types";

export const COMMISSIONS_MOCK: ICommissionBackend[] = [
	{
		id: "1",
		name: ENUM_CURRENCY_OPTIONS.USD,
		rate: 12000
	},
	{
		id: "2",
		name: ENUM_CURRENCY_OPTIONS.EUR,
		rate: 15000
	},
	{
		id: "3",
		name: ENUM_CURRENCY_OPTIONS.GBP,
		rate: 10000
	}
];
