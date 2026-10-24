import {
	ENUM_BOOKING_CLIENT_TYPE_BACKEND,
	ENUM_BOOKING_STATUS_LABEL_BACKEND,
	type ENUM_BOOKING_STATUS_LABEL_BACKEND_TYPE
} from "@/entities/booking/order/types/order-backend-enum.types";
import {
	ENUM_ORDER_STATUS_BACKEND,
	type ENUM_ORDER_STATUS_BACKEND_TYPE
} from "@/entities/booking/order/types/order-status.types";
import {
	ENUM_CURRENCY_BACKEND,
	type ENUM_CURRENCY_BACKEND_TYPE
} from "@/entities/commission/types/currency.types";
import { ENUM_TOUR_TYPE_BACKEND } from "@/entities/tour/tour/types/tour-backend-enum.types";

import { type TBookingReconciliationRowOutputBackend } from "../types";

import { buildReconciliationBookingUuid } from "./reconciliation.mock.constants";

interface IReconciliationSeedRow {
	orderNumber: string;
	clientName: string;
	plannedRevenue: number;
	revenueAccrued: number;
	plannedCost: number;
	costAccrued: number;
	status: ENUM_ORDER_STATUS_BACKEND_TYPE;
	currency: ENUM_CURRENCY_BACKEND_TYPE;
}

const STATUS_LABEL: Record<
	ENUM_ORDER_STATUS_BACKEND_TYPE,
	ENUM_BOOKING_STATUS_LABEL_BACKEND_TYPE
> = {
	[ENUM_ORDER_STATUS_BACKEND.DRAFT]: ENUM_BOOKING_STATUS_LABEL_BACKEND.DRAFT,
	[ENUM_ORDER_STATUS_BACKEND.NEW]: ENUM_BOOKING_STATUS_LABEL_BACKEND.NEW,
	[ENUM_ORDER_STATUS_BACKEND.IN_PROCESSING]:
		ENUM_BOOKING_STATUS_LABEL_BACKEND.IN_PROCESSING,
	[ENUM_ORDER_STATUS_BACKEND.BOOKING]:
		ENUM_BOOKING_STATUS_LABEL_BACKEND.BOOKED,
	[ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS]:
		ENUM_BOOKING_STATUS_LABEL_BACKEND.IN_PROGRESS,
	[ENUM_ORDER_STATUS_BACKEND.COMPLETED]:
		ENUM_BOOKING_STATUS_LABEL_BACKEND.COMPLETE,
	[ENUM_ORDER_STATUS_BACKEND.CANCELLED]:
		ENUM_BOOKING_STATUS_LABEL_BACKEND.CANCELLED,
	[ENUM_ORDER_STATUS_BACKEND.DECLINED]:
		ENUM_BOOKING_STATUS_LABEL_BACKEND.DECLINED
};

const SEED: IReconciliationSeedRow[] = [
	{
		orderNumber: "ORD-12345",
		clientName: "Travel Expert Pro",
		plannedRevenue: 1500,
		revenueAccrued: 1500,
		plannedCost: 1000,
		costAccrued: 1100,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.USD
	},
	{
		orderNumber: "ORD-12346",
		clientName: "Skyline Journeys",
		plannedRevenue: 2000,
		revenueAccrued: 1800,
		plannedCost: 1500,
		costAccrued: 1500,
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS,
		currency: ENUM_CURRENCY_BACKEND.USD
	},
	{
		orderNumber: "ORD-12347",
		clientName: "Azure Waves Agency",
		plannedRevenue: 3000,
		revenueAccrued: 3200,
		plannedCost: 2500,
		costAccrued: 2400,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.EUR
	},
	{
		orderNumber: "ORD-12348",
		clientName: "Silver Peak Travels",
		plannedRevenue: 5000,
		revenueAccrued: 5000,
		plannedCost: 4000,
		costAccrued: 4000,
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS,
		currency: ENUM_CURRENCY_BACKEND.RUB
	},
	{
		orderNumber: "ORD-12349",
		clientName: "Detailed Explorer Ltd",
		plannedRevenue: 10000,
		revenueAccrued: 9500,
		plannedCost: 8000,
		costAccrued: 8500,
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS,
		currency: ENUM_CURRENCY_BACKEND.USD
	},
	{
		orderNumber: "ORD-12350",
		clientName: "Emerald Forest Agency",
		plannedRevenue: 1200,
		revenueAccrued: 1200,
		plannedCost: 800,
		costAccrued: 750,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.USD
	},
	{
		orderNumber: "ORD-12351",
		clientName: "Global Travels LLC",
		plannedRevenue: 25000,
		revenueAccrued: 24500,
		plannedCost: 20000,
		costAccrued: 20500,
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS,
		currency: ENUM_CURRENCY_BACKEND.EUR
	},
	{
		orderNumber: "ORD-12352",
		clientName: "Midnight Star Tours",
		plannedRevenue: 800,
		revenueAccrued: 850,
		plannedCost: 600,
		costAccrued: 600,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.USD
	},
	{
		orderNumber: "ORD-12353",
		clientName: "Velvet Sky Agency",
		plannedRevenue: 3500,
		revenueAccrued: 3500,
		plannedCost: 2800,
		costAccrued: 3000,
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS,
		currency: ENUM_CURRENCY_BACKEND.RUB
	},
	{
		orderNumber: "ORD-12354",
		clientName: "Sky High Agency",
		plannedRevenue: 15000,
		revenueAccrued: 15200,
		plannedCost: 12000,
		costAccrued: 11500,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.USD
	},
	{
		orderNumber: "ORD-12355",
		clientName: "Golden Gate Travels",
		plannedRevenue: 4200,
		revenueAccrued: 4000,
		plannedCost: 3500,
		costAccrued: 3500,
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS,
		currency: ENUM_CURRENCY_BACKEND.EUR
	},
	{
		orderNumber: "ORD-12356",
		clientName: "Crystal Clear Tours",
		plannedRevenue: 1800,
		revenueAccrued: 1800,
		plannedCost: 1400,
		costAccrued: 1450,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.USD
	},
	{
		orderNumber: "ORD-12357",
		clientName: "Oceanic Tours",
		plannedRevenue: 7500,
		revenueAccrued: 7700,
		plannedCost: 6000,
		costAccrued: 5800,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.USD
	},
	{
		orderNumber: "ORD-12358",
		clientName: "Mountain View Inc",
		plannedRevenue: 12000,
		revenueAccrued: 11000,
		plannedCost: 9000,
		costAccrued: 9200,
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS,
		currency: ENUM_CURRENCY_BACKEND.EUR
	},
	{
		orderNumber: "ORD-12359",
		clientName: "Falcon Wings Agency",
		plannedRevenue: 950,
		revenueAccrued: 950,
		plannedCost: 700,
		costAccrued: 700,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.RUB
	},
	{
		orderNumber: "ORD-12360",
		clientName: "City Breaks Agency",
		plannedRevenue: 6000,
		revenueAccrued: 6100,
		plannedCost: 4500,
		costAccrued: 4600,
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS,
		currency: ENUM_CURRENCY_BACKEND.USD
	},
	{
		orderNumber: "ORD-12361",
		clientName: "Pearl Harbor Travels",
		plannedRevenue: 2200,
		revenueAccrued: 2200,
		plannedCost: 1800,
		costAccrued: 1750,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.EUR
	},
	{
		orderNumber: "ORD-12362",
		clientName: "Adventure Seekers",
		plannedRevenue: 8500,
		revenueAccrued: 8200,
		plannedCost: 7000,
		costAccrued: 7200,
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS,
		currency: ENUM_CURRENCY_BACKEND.USD
	},
	{
		orderNumber: "ORD-12363",
		clientName: "Titanium Tours",
		plannedRevenue: 1300,
		revenueAccrued: 1300,
		plannedCost: 900,
		costAccrued: 950,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.RUB
	},
	{
		orderNumber: "ORD-12364",
		clientName: "Luxury Nomads",
		plannedRevenue: 30000,
		revenueAccrued: 30500,
		plannedCost: 24000,
		costAccrued: 23500,
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		currency: ENUM_CURRENCY_BACKEND.USD
	}
];

const toAmount = (value: number): string => value.toFixed(2);

export const createReconciliationMocks =
	(): TBookingReconciliationRowOutputBackend[] =>
		SEED.map((row, index) => {
			const plannedProfit = row.plannedRevenue - row.plannedCost;
			const revenueSettled = Math.round(row.revenueAccrued * 0.7);
			const costSettled = Math.round(row.costAccrued * 0.6);
			const receivable = Math.max(row.revenueAccrued - revenueSettled, 0);
			const payable = Math.max(row.costAccrued - costSettled, 0);
			const accrualProfit = row.revenueAccrued - row.costAccrued;
			const settledProfit = revenueSettled - costSettled;
			const variance = row.plannedCost - row.costAccrued;

			return {
				booking_id: buildReconciliationBookingUuid(index + 1),
				order_number: row.orderNumber,
				status: row.status,
				status_label: STATUS_LABEL[row.status],
				date: "2025-06-01",
				end_date: "2025-06-07",
				created_at: "2025-05-20T10:00:00Z",
				pax: 2,
				tour_name: "Sample Tour",
				tour_type: ENUM_TOUR_TYPE_BACKEND.REGULAR,
				client_name: row.clientName,
				client_type: ENUM_BOOKING_CLIENT_TYPE_BACKEND.AGENCY,
				currency: row.currency,
				planned_revenue: toAmount(row.plannedRevenue),
				planned_cost: toAmount(row.plannedCost),
				planned_profit: toAmount(plannedProfit),
				revenue_accrued: toAmount(row.revenueAccrued),
				revenue_settled: toAmount(revenueSettled),
				receivable: toAmount(receivable),
				cost_accrued: toAmount(row.costAccrued),
				cost_settled: toAmount(costSettled),
				payable: toAmount(payable),
				accrual_profit: toAmount(accrualProfit),
				settled_profit: toAmount(settledProfit),
				variance: toAmount(variance),
				invoice_id: null,
				invoice_number: null,
				files: {
					voucher: false,
					invoice_pdf: false,
					supplier_receipts: 0,
					client_payment_proofs: 0
				},
				supplier_lines: {
					total: 2,
					paid: 1,
					unpaid: 1,
					unassigned_supplier: 0,
					unpriced: 0
				},
				client_payments: {
					recorded: 1,
					confirmed: 1,
					unconfirmed: 0
				}
			};
		});
