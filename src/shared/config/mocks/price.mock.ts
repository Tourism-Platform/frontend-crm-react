import { ENUM_EVENT, type IPricingReviewOption } from "@/entities/tour";

export const MOCK_PRICING_DATA: IPricingReviewOption[] = [
	{
		id: 1,
		name: "Option 1",
		summary: {
			revenue: { from: 10999, to: 12432 },
			cost: { from: 8999, to: 9499 },
			profit: { from: 2458, to: 2999 }
		},
		items: [
			{
				id: "1",
				item: "Flight from london to tashkent",
				supplier: 'Aviakassa "Hayot"',
				plannedCost: "$4,766.99",
				estimatedRevenue: "$456.99",
				type: ENUM_EVENT.FLIGHT
			},
			{
				id: "2",
				item: "Hotels in Tashkent options",
				supplier: "-",
				plannedCost: "$4,444.99 - $4,966.00",
				estimatedRevenue: "$456.99 - $480.99",
				type: ENUM_EVENT.ACCOMMODATION,
				subRows: [
					{
						id: "2-1",
						item: "Hilton hotel",
						supplier: "Hilton LLC",
						plannedCost: "$4,444.99 - $4,766.99",
						estimatedRevenue: "$456.99",
						type: ENUM_EVENT.ACCOMMODATION
					},
					{
						id: "2-2",
						item: "Uzbekistan hotel",
						supplier: '"MIR"',
						plannedCost: "$4,243.99 - $4,966.99",
						estimatedRevenue: "$456.99",
						type: ENUM_EVENT.ACCOMMODATION
					}
				]
			},
			{
				id: "3",
				item: "Meals",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: ENUM_EVENT.ACTIVITY,
				subRows: [
					{
						id: "3-1",
						item: "Tashkent cafe",
						supplier: '"Darwin Krus"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: ENUM_EVENT.ACTIVITY
					},
					{
						id: "3-2",
						item: "Oshkand",
						supplier: '"Osh pakazz"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: ENUM_EVENT.ACTIVITY
					}
				]
			}
		]
	},
	{
		id: 2,
		name: "Option 2",
		summary: {
			revenue: { from: 11500, to: 13000 },
			cost: { from: 9000, to: 10000 },
			profit: { from: 2500, to: 3000 }
		},
		items: [
			{
				id: "1",
				item: "Flight from london to tashkent",
				supplier: 'Aviakassa "Hayot"',
				plannedCost: "$4,766.99",
				estimatedRevenue: "$456.99",
				type: ENUM_EVENT.FLIGHT
			},
			{
				id: "2",
				item: "Hotels in Tashkent options",
				supplier: "-",
				plannedCost: "$4,444.99 - $4,966.00",
				estimatedRevenue: "$456.99 - $480.99",
				type: ENUM_EVENT.ACCOMMODATION,
				subRows: [
					{
						id: "2-1",
						item: "Hilton hotel",
						supplier: "Hilton LLC",
						plannedCost: "$4,444.99 - $4,766.99",
						estimatedRevenue: "$456.99",
						type: ENUM_EVENT.ACCOMMODATION
					},
					{
						id: "2-2",
						item: "Uzbekistan hotel",
						supplier: '"MIR"',
						plannedCost: "$4,243.99 - $4,966.99",
						estimatedRevenue: "$456.99",
						type: ENUM_EVENT.ACCOMMODATION
					}
				]
			},
			{
				id: "3",
				item: "Meals",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: ENUM_EVENT.ACTIVITY,
				subRows: [
					{
						id: "3-1",
						item: "Tashkent cafe",
						supplier: '"Darwin Krus"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: ENUM_EVENT.ACTIVITY
					},
					{
						id: "3-2",
						item: "Oshkand",
						supplier: '"Osh pakazz"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: ENUM_EVENT.ACTIVITY
					}
				]
			}
		]
	}
];
