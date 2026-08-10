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

export type TListAgenciesParams = {
	q?: string | null;
	skip?: number;
	limit?: number;
};

export type TAgencySelectOption = {
	label: string;
	value: string;
	name: string;
	contactPerson: string | null;
	contactEmail: string | null;
	contactPhone: string | null;
	logoUrl: string | null;
};
