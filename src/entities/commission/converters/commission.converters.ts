import type {
	ENUM_CURRENCY_OPTIONS_TYPE,
	ICommission,
	ICommissionBackend
} from "../types";

export const mapCommissionToFrontend = (
	data: ICommissionBackend
): ICommission => ({
	id: data.id,
	currency: data.name as ENUM_CURRENCY_OPTIONS_TYPE,
	rate: data.rate
});

export const mapCommissionToBackend = (
	data: Partial<ICommission>
): Partial<ICommissionBackend> => ({
	id: data.id,
	name: data.currency,
	rate: data.rate
});

export const mapCommissionListToFrontend = (
	data: ICommissionBackend[]
): ICommission[] => data.map(mapCommissionToFrontend);
