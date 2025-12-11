import { ENUM_CURRENCY_OPTIONS, type ICommission } from "@/entities/commission";

export const COMMISSION_MOCKS: ICommission[] = [
	{
		id: "1",
		name: ENUM_CURRENCY_OPTIONS.USD,
		rate: 20
	}
];
