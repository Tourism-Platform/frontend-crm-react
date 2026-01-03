import {
	ENUM_RECONCILIATION_STATUS,
	type IReconciliationBackend,
	type IReconciliationDetailBackend
} from "../types";

export const RECONCILIATIONS_MOCK: IReconciliationBackend[] = [
	{
		id: "REC-001",
		order_id: "ORD-12345",
		client: "Иван Иванов",
		planned_revenue: 1500,
		actual_revenue: 1500,
		planned_cost: 1000,
		actual_cost: 1100,
		variance: -100,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "USD"
	},
	{
		id: "REC-002",
		order_id: "ORD-12346",
		client: "Петр Петров",
		planned_revenue: 2000,
		actual_revenue: 1800,
		planned_cost: 1500,
		actual_cost: 1500,
		variance: -200,
		status: ENUM_RECONCILIATION_STATUS.IN_PROGRESS,
		currency: "USD"
	},
	{
		id: "REC-003",
		order_id: "ORD-12347",
		client: "Алексей Сидоров",
		planned_revenue: 3000,
		actual_revenue: 3200,
		planned_cost: 2500,
		actual_cost: 2400,
		variance: 300,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "EUR"
	},
	{
		id: "REC-004",
		order_id: "ORD-12348",
		client: "Мария Козлова",
		planned_revenue: 5000,
		actual_revenue: 5000,
		planned_cost: 4000,
		actual_cost: 4000,
		variance: 0,
		status: ENUM_RECONCILIATION_STATUS.IN_PROGRESS,
		currency: "RUB"
	},
	{
		id: "REC-005",
		order_id: "ORD-12349",
		client: "Detailed Explorer Ltd",
		planned_revenue: 10000,
		actual_revenue: 9500,
		planned_cost: 8000,
		actual_cost: 8500,
		variance: -1000,
		status: ENUM_RECONCILIATION_STATUS.IN_PROGRESS,
		currency: "USD"
	},
	{
		id: "REC-006",
		order_id: "ORD-12350",
		client: "Елена Смирнова",
		planned_revenue: 1200,
		actual_revenue: 1200,
		planned_cost: 800,
		actual_cost: 750,
		variance: 50,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "USD"
	},
	{
		id: "REC-007",
		order_id: "ORD-12351",
		client: "Global Travels LLC",
		planned_revenue: 25000,
		actual_revenue: 24500,
		planned_cost: 20000,
		actual_cost: 20500,
		variance: -1000,
		status: ENUM_RECONCILIATION_STATUS.IN_PROGRESS,
		currency: "EUR"
	},
	{
		id: "REC-008",
		order_id: "ORD-12352",
		client: "Дмитрий Волков",
		planned_revenue: 800,
		actual_revenue: 850,
		planned_cost: 600,
		actual_cost: 600,
		variance: 50,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "USD"
	},
	{
		id: "REC-009",
		order_id: "ORD-12353",
		client: "Ольга Морозова",
		planned_revenue: 3500,
		actual_revenue: 3500,
		planned_cost: 2800,
		actual_cost: 3000,
		variance: -200,
		status: ENUM_RECONCILIATION_STATUS.IN_PROGRESS,
		currency: "RUB"
	},
	{
		id: "REC-010",
		order_id: "ORD-12354",
		client: "Sky High Agency",
		planned_revenue: 15000,
		actual_revenue: 15200,
		planned_cost: 12000,
		actual_cost: 11500,
		variance: 700,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "USD"
	},
	{
		id: "REC-011",
		order_id: "ORD-12355",
		client: "Сергей Кузнецов",
		planned_revenue: 4200,
		actual_revenue: 4000,
		planned_cost: 3500,
		actual_cost: 3500,
		variance: -200,
		status: ENUM_RECONCILIATION_STATUS.IN_PROGRESS,
		currency: "EUR"
	},
	{
		id: "REC-012",
		order_id: "ORD-12356",
		client: "Анна Павлова",
		planned_revenue: 1800,
		actual_revenue: 1800,
		planned_cost: 1400,
		actual_cost: 1450,
		variance: -50,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "USD"
	},
	{
		id: "REC-013",
		order_id: "ORD-12357",
		client: "Oceanic Tours",
		planned_revenue: 7500,
		actual_revenue: 7700,
		planned_cost: 6000,
		actual_cost: 5800,
		variance: 400,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "USD"
	},
	{
		id: "REC-014",
		order_id: "ORD-12358",
		client: "Mountain View Inc",
		planned_revenue: 12000,
		actual_revenue: 11000,
		planned_cost: 9000,
		actual_cost: 9200,
		variance: -1200,
		status: ENUM_RECONCILIATION_STATUS.IN_PROGRESS,
		currency: "EUR"
	},
	{
		id: "REC-015",
		order_id: "ORD-12359",
		client: "Виктор Соколов",
		planned_revenue: 950,
		actual_revenue: 950,
		planned_cost: 700,
		actual_cost: 700,
		variance: 0,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "RUB"
	},
	{
		id: "REC-016",
		order_id: "ORD-12360",
		client: "City Breaks Agency",
		planned_revenue: 6000,
		actual_revenue: 6100,
		planned_cost: 4500,
		actual_cost: 4600,
		variance: 0,
		status: ENUM_RECONCILIATION_STATUS.IN_PROGRESS,
		currency: "USD"
	},
	{
		id: "REC-017",
		order_id: "ORD-12361",
		client: "Наталья Белова",
		planned_revenue: 2200,
		actual_revenue: 2200,
		planned_cost: 1800,
		actual_cost: 1750,
		variance: 50,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "EUR"
	},
	{
		id: "REC-018",
		order_id: "ORD-12362",
		client: "Adventure Seekers",
		planned_revenue: 8500,
		actual_revenue: 8200,
		planned_cost: 7000,
		actual_cost: 7200,
		variance: -500,
		status: ENUM_RECONCILIATION_STATUS.IN_PROGRESS,
		currency: "USD"
	},
	{
		id: "REC-019",
		order_id: "ORD-12363",
		client: "Игорь Тарасов",
		planned_revenue: 1300,
		actual_revenue: 1300,
		planned_cost: 900,
		actual_cost: 950,
		variance: -50,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "RUB"
	},
	{
		id: "REC-020",
		order_id: "ORD-12364",
		client: "Luxury Nomads",
		planned_revenue: 30000,
		actual_revenue: 30500,
		planned_cost: 24000,
		actual_cost: 23500,
		variance: 1000,
		status: ENUM_RECONCILIATION_STATUS.COMPLETED,
		currency: "USD"
	}
];

export const RECONCILIATION_DETAILS_MAP: Record<
	string,
	IReconciliationDetailBackend
> = RECONCILIATIONS_MOCK.reduce(
	(acc, item) => {
		acc[item.id] = {
			...item,
			planned_margin: item.planned_revenue - item.planned_cost,
			actual_margin: item.actual_revenue - item.actual_cost,
			supplier_payments: [
				{
					id: `PAY-${item.id}-01`,
					component: "Hotel Accommodation",
					planned_amount: item.planned_cost * 0.6,
					actual_amount: item.actual_cost * 0.6,
					variance: (item.planned_cost - item.actual_cost) * 0.6
				},
				{
					id: `PAY-${item.id}-02`,
					component: "Transportation",
					planned_amount: item.planned_cost * 0.4,
					actual_amount: item.actual_cost * 0.4,
					variance: (item.planned_cost - item.actual_cost) * 0.4
				}
			]
		};
		return acc;
	},
	{} as Record<string, IReconciliationDetailBackend>
);
