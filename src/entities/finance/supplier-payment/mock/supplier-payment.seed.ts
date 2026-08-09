import { SupplierPaymentStatus } from "../../../../shared/api/generated/Api";

import { MOCK_RECEIPT_URL } from "./supplier-payment.mock.constants";

export type TSupplierPaymentSeedItem = {
	amount: number;
	status: SupplierPaymentStatus;
	component: string;
	type: string;
	supplier: string;
	manager: string;
	note?: string;
	file?: string | null;
	paid_at?: string | null;
};

export const SUPPLIER_PAYMENT_SEED: readonly TSupplierPaymentSeedItem[] = [
	{
		amount: 2100,
		status: SupplierPaymentStatus.Paid,
		component: "Flight from London to Ta...",
		type: "Transportation (flight)",
		supplier: "Aviakassa",
		manager: "Madina T.",
		file: MOCK_RECEIPT_URL,
		paid_at: "2024-10-10T10:00:00Z"
	},
	{
		amount: 5600,
		status: SupplierPaymentStatus.NotPaid,
		component: "Hilton Hotel",
		type: "Accommodation",
		supplier: '"LLC" Hilton',
		manager: "Madina T."
	},
	{
		amount: 2100,
		status: SupplierPaymentStatus.Paid,
		component: "Meals",
		type: "Package",
		supplier: "Aviakassa",
		manager: "Madina T.",
		paid_at: "2024-10-10T10:00:00Z"
	},
	{
		amount: 2100,
		status: SupplierPaymentStatus.Paid,
		component: "Hotel Uzbekistan",
		type: "Accommodation",
		supplier: "-",
		manager: "Madina T.",
		paid_at: "2024-10-11T10:00:00Z"
	},
	{
		amount: 1100,
		status: SupplierPaymentStatus.Paid,
		component: 'Cafe "OSHKAND"',
		type: "Activity",
		supplier: "-",
		manager: "Madina T.",
		paid_at: "2024-10-12T10:00:00Z"
	},
	{
		amount: 1100,
		status: SupplierPaymentStatus.NotPaid,
		component: "Disneyland",
		type: "Activity",
		supplier: "-",
		manager: "Madina T."
	},
	{
		amount: 2000,
		status: SupplierPaymentStatus.Paid,
		component: "Transfer Tour Day 1 + Din...",
		type: "Transfer",
		supplier: '"LLC" DARAUZ',
		manager: "Madina T.",
		paid_at: "2024-10-13T10:00:00Z"
	},
	{
		amount: 3200,
		status: SupplierPaymentStatus.NotPaid,
		component: "Grand Hotel Tashkent",
		type: "Accommodation",
		supplier: "Grand Hotel",
		manager: "Alex R."
	},
	{
		amount: 450,
		status: SupplierPaymentStatus.Paid,
		component: "Fast Train To Samarkand",
		type: "Transportation (train)",
		supplier: "UzRailways",
		manager: "Alex R.",
		paid_at: "2024-10-16T14:30:00Z"
	},
	{
		amount: 150,
		status: SupplierPaymentStatus.NotPaid,
		component: "Local Guide Samarkand",
		type: "Service",
		supplier: "Guide Services LLC",
		manager: "Madina T."
	},
	{
		amount: 300,
		status: SupplierPaymentStatus.Paid,
		component: "Registan Entrance Fees",
		type: "Activity",
		supplier: "Ministry of Culture",
		manager: "Madina T.",
		paid_at: "2024-10-18T12:00:00Z"
	},
	{
		amount: 2800,
		status: SupplierPaymentStatus.NotPaid,
		component: "Bukhara Boutique Hotel",
		type: "Accommodation",
		supplier: "Old City Hotels",
		manager: "Ivan S."
	},
	{
		amount: 1200,
		status: SupplierPaymentStatus.NotPaid,
		component: "Desert Safari",
		type: "Activity",
		supplier: "Adventure Uzbekistan",
		manager: "Ivan S."
	},
	{
		amount: 4500,
		status: SupplierPaymentStatus.Paid,
		component: "Flight Samarkand to Moscow",
		type: "Transportation (flight)",
		supplier: "Uzbekistan Airways",
		manager: "Madina T.",
		file: MOCK_RECEIPT_URL,
		paid_at: "2024-10-25T08:00:00Z"
	},
	{
		amount: 200,
		status: SupplierPaymentStatus.Paid,
		component: "Vip Lounge Access",
		type: "Service",
		supplier: "Airport Services",
		manager: "Ivan S.",
		paid_at: "2024-10-26T10:00:00Z"
	},
	{
		amount: 500,
		status: SupplierPaymentStatus.NotPaid,
		component: "Limousine Transfer",
		type: "Transfer",
		supplier: "Vip Cars",
		manager: "Ivan S."
	},
	{
		amount: 350,
		status: SupplierPaymentStatus.NotPaid,
		component: "Wine Tasting Tour",
		type: "Activity",
		supplier: "Vineyards LLC",
		manager: "Alex R."
	},
	{
		amount: 6000,
		status: SupplierPaymentStatus.Paid,
		component: "Lotte Hotel",
		type: "Accommodation",
		supplier: "Lotte Central",
		manager: "Madina T.",
		paid_at: "2024-10-30T10:00:00Z"
	},
	{
		amount: 1800,
		status: SupplierPaymentStatus.NotPaid,
		component: "Catering Services Samarkand",
		type: "Package",
		supplier: "Samarkand Catering",
		manager: "Alex R."
	},
	{
		amount: 400,
		status: SupplierPaymentStatus.Paid,
		component: "Folklore Show Samarkand",
		type: "Activity",
		supplier: "Art Center",
		manager: "Alex R.",
		paid_at: "2024-11-02T19:00:00Z"
	}
] as const;

export function buildSupplierReceiptFile(label: string): File {
	const name = `Supplier receipt ${label}`;
	const content = `%PDF-1.4
1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj
2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj
3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] >>endobj
trailer<< /Root 1 0 R >>
%%EOF
${name}
`;
	return new File([content], `${name}.pdf`, { type: "application/pdf" });
}
