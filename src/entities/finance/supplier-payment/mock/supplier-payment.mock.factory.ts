import {
	type SupplierPaymentResponse,
	SupplierPaymentStatus
} from "@/shared/api";

import { bookingOrderListItems } from "@/entities/booking/order/mock/booking-order.store";

import { registerSupplierPaymentMockDisplay } from "./supplier-payment.mock-display";
import {
	MOCK_RECEIPT_URL,
	MOCK_SUPPLIER_PAYMENT_DEFAULTS,
	buildEventUuid,
	buildSupplierPaymentUuid
} from "./supplier-payment.mock.constants";

export interface ISupplierPaymentMockDisplay {
	component: string;
	type: string;
	supplier: string;
	manager: string;
}

const SEED_ROWS: {
	amount: number;
	status: SupplierPaymentStatus;
	component: string;
	type: string;
	supplier: string;
	manager: string;
	note?: string;
	file?: string | null;
	paid_at?: string | null;
}[] = [
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
];

export interface ISupplierPaymentMockBundle {
	payments: SupplierPaymentResponse[];
	displayById: Map<string, ISupplierPaymentMockDisplay>;
}

export const createSupplierPaymentMocks = (): ISupplierPaymentMockBundle => {
	const payments: SupplierPaymentResponse[] = [];
	const displayById = new Map<string, ISupplierPaymentMockDisplay>();

	SEED_ROWS.forEach((row, index) => {
		const booking =
			bookingOrderListItems[index % bookingOrderListItems.length];
		const id = buildSupplierPaymentUuid(index + 1);
		const amount = String(row.amount);
		const rate = MOCK_SUPPLIER_PAYMENT_DEFAULTS.rate;

		payments.push({
			id,
			operator_id: MOCK_SUPPLIER_PAYMENT_DEFAULTS.operator_id,
			booking_id: booking.id,
			event_id: buildEventUuid(index + 1),
			supplier_id: `sup-${String(index + 1).padStart(4, "0")}`,
			amount,
			currency: MOCK_SUPPLIER_PAYMENT_DEFAULTS.currency,
			rate,
			base_amount: amount,
			file: row.file ?? null,
			note: row.note ?? null,
			status: row.status,
			paid_at: row.paid_at ?? null
		});

		const display = {
			component: row.component,
			type: row.type,
			supplier: row.supplier,
			manager: row.manager
		};
		displayById.set(id, display);
		registerSupplierPaymentMockDisplay(id, display);
	});

	return { payments, displayById };
};
