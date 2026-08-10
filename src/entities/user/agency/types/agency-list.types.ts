import type { IPaginationRequest } from "@/shared/types";

export type TAgencyListItem = {
	id: string;
	name: string;
	businessName: string | null;
	legalName: string | null;
	contactPerson: string | null;
	contactEmail: string | null;
	contactPhone: string | null;
	city: string | null;
	country: string | null;
	logoUrl: string | null;
};

export type TListAgenciesParams = Partial<IPaginationRequest>;

export type TAgencySelectOption = {
	label: string;
	value: string;
	name: string;
	contactPerson: string | null;
	contactEmail: string | null;
	contactPhone: string | null;
	logoUrl: string | null;
};
