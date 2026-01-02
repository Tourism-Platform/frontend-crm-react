import { ENUM_CURRENCY_OPTIONS, type ICommissionBackend } from "../types";

export const COMMISSIONS_MOCK: ICommissionBackend[] = [
	{
		id: "1",
		name: ENUM_CURRENCY_OPTIONS.USD,
		rate: 20
	},
	{
		id: "2",
		name: ENUM_CURRENCY_OPTIONS.EUR,
		rate: 15
	},
	{
		id: "3",
		name: ENUM_CURRENCY_OPTIONS.GBP,
		rate: 10
	}
];
