"use client";

import { type ColumnDef } from "@tanstack/react-table";
import {
	ChevronDown,
	ChevronRight,
	Hotel,
	Plane,
	Utensils
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { CustomDataGrid } from "@/shared/ui/custom/data-grid";

interface ITourReviewItem {
	id: string;
	item: string;
	supplier?: string;
	plannedCost?: string;
	estimatedRevenue?: string;
	icon?: "plane" | "hotel" | "utensils";
	subRows?: ITourReviewItem[];
}

const TOUR_REVIEW_MOCK: ITourReviewItem[] = [
	{
		id: "1",
		item: "Flight from london to tashkent",
		supplier: 'Aviakassa "Hayot"',
		plannedCost: "$4,756.99",
		estimatedRevenue: "$456.99",
		icon: "plane"
	},
	{
		id: "2",
		item: "Hotels in Tashkent options",
		supplier: "-",
		plannedCost: "$4,243.99 - $4,444.99",
		estimatedRevenue: "$456.99 - $480.99",
		icon: "hotel",
		subRows: [
			{
				id: "2-1",
				item: "Hilton hotel",
				supplier: "Hilton LLC",
				plannedCost: "$4,444.99",
				estimatedRevenue: "$456.99",
				icon: "hotel"
			},
			{
				id: "2-2",
				item: "Uzbekistan hotel",
				supplier: '"MIR"',
				plannedCost: "$4,243.99",
				estimatedRevenue: "$456.99",
				icon: "hotel"
			}
		]
	},
	{
		id: "3",
		item: "Meals",
		supplier: "-",
		plannedCost: "$2,314.99",
		estimatedRevenue: "$456.99",
		icon: "utensils",
		subRows: [
			{
				id: "3-1",
				item: "Tashkent cafe",
				supplier: '"Davron Krus"',
				plannedCost: "-",
				estimatedRevenue: "-",
				icon: "hotel"
			},
			{
				id: "3-2",
				item: "Oshkand",
				supplier: '"Osh pakazz"',
				plannedCost: "-",
				estimatedRevenue: "-",
				icon: "hotel"
			}
		]
	}
];

export const TourReview = () => {
	const { t } = useTranslation("order_id_page");

	const columns: ColumnDef<ITourReviewItem>[] = [
		{
			accessorKey: "item",
			header: t("tour_review.table.item"),
			cell: ({ row, getValue }) => {
				const icon = row.original.icon;
				const isExpanded = row.getIsExpanded();
				const hasSubRows = !!row.original.subRows?.length;

				return (
					<div
						className="flex items-center gap-2"
						style={{ paddingLeft: `${row.depth * 2}rem` }}
					>
						{hasSubRows && (
							<button
								onClick={row.getToggleExpandedHandler()}
								className="p-1 hover:bg-muted rounded"
							>
								{isExpanded ? (
									<ChevronDown className="size-4 text-muted-foreground" />
								) : (
									<ChevronRight className="size-4 text-muted-foreground" />
								)}
							</button>
						)}
						{!hasSubRows && row.depth > 0 && (
							<div className="w-6" /> // spacer for consistency
						)}
						<div
							className={cn(
								"size-8 rounded-full flex items-center justify-center text-white",
								icon === "plane" && "bg-blue-500",
								icon === "hotel" &&
									row.depth === 0 &&
									"bg-slate-700",
								icon === "hotel" &&
									row.depth > 0 &&
									"bg-blue-900",
								icon === "utensils" && "bg-purple-600"
							)}
						>
							{icon === "plane" && <Plane className="size-4" />}
							{icon === "hotel" && <Hotel className="size-4" />}
							{icon === "utensils" && (
								<Utensils className="size-4" />
							)}
						</div>
						<span className="font-medium">
							{getValue() as string}
						</span>
					</div>
				);
			}
		},
		{
			accessorKey: "supplier",
			header: t("tour_review.table.supplier")
		},
		{
			accessorKey: "plannedCost",
			header: t("tour_review.table.planned_cost")
		},
		{
			accessorKey: "estimatedRevenue",
			header: t("tour_review.table.estimated_revenue")
		}
	];

	return (
		<div className="mt-8 bg-card border rounded-lg overflow-hidden">
			<div className="p-6 border-b">
				<h3 className="text-lg font-semibold mb-4">
					{t("tour_review.title")}
				</h3>
				<div className="flex gap-8">
					<div>
						<div className="text-xs text-muted-foreground uppercase mb-1">
							{t("tour_review.revenue")}
						</div>
						<div className="text-lg font-bold text-slate-800">
							$10,999.00 - $12,432.00
						</div>
					</div>
					<div className="border-l pl-8">
						<div className="text-xs text-muted-foreground uppercase mb-1">
							{t("tour_review.profit")}
						</div>
						<div className="text-lg font-bold text-slate-800">
							$2,458.00 - $2,999.00
						</div>
					</div>
				</div>
			</div>
			<div className="p-0">
				<CustomDataGrid
					data={TOUR_REVIEW_MOCK}
					columns={columns}
					getSubRows={(row) => row.subRows}
					pageSize={100} // show all
					paginationInfo=" " // hide pagination info
				/>
			</div>
		</div>
	);
};
