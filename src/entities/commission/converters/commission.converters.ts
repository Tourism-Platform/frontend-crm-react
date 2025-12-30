import type { ICommission, ICommissionBackend } from "../types";

export const mapCommissionToFrontend = (
	data: ICommissionBackend
): ICommission => ({
	id: data.id,
	name: data.name,
	rate: data.rate
});

export const mapCommissionToBackend = (
	data: Partial<ICommission>
): Partial<ICommissionBackend> => ({
	id: data.id,
	name: data.name,
	rate: data.rate
});

export const mapCommissionListToFrontend = (
	data: ICommissionBackend[]
): ICommission[] => data.map(mapCommissionToFrontend);
