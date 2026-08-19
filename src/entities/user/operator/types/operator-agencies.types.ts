import type { TPartneredAgencyDiscountBackend } from "./operator-agencies-backend.interface";

export interface IOperatorAgencyListItem {
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
}

export interface IOperatorAgencyInfo {
	id: string;
	agencyId: string;
	logoPath: string | null;
	description: string | null;
	businessName: string | null;
	websiteUrl: string | null;
	legalName: string | null;
	directorName: string | null;
	taxId: string | null;
	contactPerson: string | null;
	contactPosition: string | null;
	contactEmail: string | null;
	contactPhone: string | null;
	addressLine: string | null;
	city: string | null;
	country: string | null;
}

export interface IPartneredAgency {
	agencyId: string;
	name: string;
	invitedEmail: string;
	invitedUserId: string | null;
	partneredAt: string;
	discount: TPartneredAgencyDiscountBackend | null;
	businessName: string | null;
	contactPerson: string | null;
	contactEmail: string | null;
	contactPhone: string | null;
	city: string | null;
	country: string | null;
	websiteUrl: string | null;
	logoUrl: string | null;
}
