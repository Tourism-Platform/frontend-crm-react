import { ENUM_EVENT } from "@/entities/tour/tour/types/event.types";
import type {
	IPricingReviewOption,
	ITourReviewItem
} from "@/entities/tour/tour/types/tour-review.interface";

const mockReviewItem = (
	item: Omit<ITourReviewItem, "day" | "position" | "optionIndex"> & {
		day: number;
		position: number;
		optionIndex?: number;
	}
): ITourReviewItem => ({
	...item,
	optionIndex: item.optionIndex ?? 0
});

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
			mockReviewItem({
				id: "1",
				day: 1,
				position: 0,
				item: "Flight from london to tashkent",
				supplier: 'Aviakassa "Hayot"',
				plannedCost: "$4,766.99",
				estimatedRevenue: "$456.99",
				type: ENUM_EVENT.FLIGHT
			}),
			mockReviewItem({
				id: "2",
				day: 1,
				position: 1,
				item: "Hotels in Tashkent options",
				supplier: "-",
				plannedCost: "$4,444.99 - $4,966.00",
				estimatedRevenue: "$456.99 - $480.99",
				type: ENUM_EVENT.ACCOMMODATION,
				subRows: [
					mockReviewItem({
						id: "2-1",
						day: 1,
						position: 1,
						optionIndex: 0,
						item: "Hilton hotel",
						supplier: "Hilton LLC",
						plannedCost: "$4,444.99 - $4,766.99",
						estimatedRevenue: "$456.99",
						type: ENUM_EVENT.ACCOMMODATION
					}),
					mockReviewItem({
						id: "2-2",
						day: 1,
						position: 1,
						optionIndex: 1,
						item: "Uzbekistan hotel",
						supplier: '"MIR"',
						plannedCost: "$4,243.99 - $4,966.99",
						estimatedRevenue: "$456.99",
						type: ENUM_EVENT.ACCOMMODATION
					})
				]
			}),
			mockReviewItem({
				id: "3",
				day: 1,
				position: 2,
				item: "Meals",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: ENUM_EVENT.ACTIVITY,
				subRows: [
					mockReviewItem({
						id: "3-1",
						day: 1,
						position: 2,
						optionIndex: 0,
						item: "Tashkent cafe",
						supplier: '"Darwin Krus"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: ENUM_EVENT.ACTIVITY
					}),
					mockReviewItem({
						id: "3-2",
						day: 1,
						position: 2,
						optionIndex: 1,
						item: "Oshkand",
						supplier: '"Osh pakazz"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: ENUM_EVENT.ACTIVITY
					})
				]
			})
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
			mockReviewItem({
				id: "1",
				day: 1,
				position: 0,
				item: "Flight from london to tashkent",
				supplier: 'Aviakassa "Hayot"',
				plannedCost: "$4,766.99",
				estimatedRevenue: "$456.99",
				type: ENUM_EVENT.FLIGHT
			}),
			mockReviewItem({
				id: "2",
				day: 1,
				position: 1,
				item: "Hotels in Tashkent options",
				supplier: "-",
				plannedCost: "$4,444.99 - $4,966.00",
				estimatedRevenue: "$456.99 - $480.99",
				type: ENUM_EVENT.ACCOMMODATION,
				subRows: [
					mockReviewItem({
						id: "2-1",
						day: 1,
						position: 1,
						optionIndex: 0,
						item: "Hilton hotel",
						supplier: "Hilton LLC",
						plannedCost: "$4,444.99 - $4,766.99",
						estimatedRevenue: "$456.99",
						type: ENUM_EVENT.ACCOMMODATION
					}),
					mockReviewItem({
						id: "2-2",
						day: 1,
						position: 1,
						optionIndex: 1,
						item: "Uzbekistan hotel",
						supplier: '"MIR"',
						plannedCost: "$4,243.99 - $4,966.99",
						estimatedRevenue: "$456.99",
						type: ENUM_EVENT.ACCOMMODATION
					})
				]
			}),
			mockReviewItem({
				id: "3",
				day: 1,
				position: 2,
				item: "Meals",
				supplier: "-",
				plannedCost: "$2,314.99",
				estimatedRevenue: "$456.99",
				type: ENUM_EVENT.ACTIVITY,
				subRows: [
					mockReviewItem({
						id: "3-1",
						day: 1,
						position: 2,
						optionIndex: 0,
						item: "Tashkent cafe",
						supplier: '"Darwin Krus"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: ENUM_EVENT.ACTIVITY
					}),
					mockReviewItem({
						id: "3-2",
						day: 1,
						position: 2,
						optionIndex: 1,
						item: "Oshkand",
						supplier: '"Osh pakazz"',
						plannedCost: "-",
						estimatedRevenue: "-",
						type: ENUM_EVENT.ACTIVITY
					})
				]
			})
		]
	}
];
