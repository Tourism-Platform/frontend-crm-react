import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Badge, Skeleton } from "@/shared/ui";

import {
	type ENUM_TOUR_ORDER_STATUS_TYPE,
	type ITourOrder,
	TOUR_ORDER_STATUS_LABELS,
	TOUR_ORDER_STATUS_VARIANTS
} from "@/entities/tour";

export const ORDER_HISTORY_COLUMNS = (): ColumnDef<ITourOrder>[] => {
	const { t } = useTranslation(["tour_order_history_page", "options"]);

	return [
		{
			id: "select",
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("table.order_id", { ns: "tour_order_history_page" }),
			accessorKey: "orderId",
			meta: {
				headerTitle: t("table.order_id", {
					ns: "tour_order_history_page"
				}),
				skeleton: <Skeleton className="h-4 w-[140px]" />
			},
			cell: ({ row }) => (
				<Link
					to={buildRoute(ENUM_PATH.BOOKING.ORDER_ID, {
						orderId: row.getValue("orderId")
					})}
					className="font-medium text-primary hover:underline"
				>
					{row.getValue("orderId")}
				</Link>
			),
			size: 140
		},
		{
			header: t("table.client", { ns: "tour_order_history_page" }),
			accessorKey: "client",
			meta: {
				headerTitle: t("table.client", {
					ns: "tour_order_history_page"
				}),
				skeleton: <Skeleton className="h-4 w-[180px]" />
			},
			size: 180
		},
		{
			header: t("table.type", { ns: "tour_order_history_page" }),
			accessorKey: "type",
			meta: {
				headerTitle: t("table.type", { ns: "tour_order_history_page" }),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			size: 120
		},
		{
			header: t("table.pax", { ns: "tour_order_history_page" }),
			accessorKey: "pax",
			meta: {
				headerTitle: t("table.pax", { ns: "tour_order_history_page" }),
				skeleton: <Skeleton className="h-4 w-[40px]" />
			},
			cell: ({ row }) => (
				<div className="text-center">{row.getValue("pax")}</div>
			),
			size: 80
		},
		{
			header: t("table.dates", { ns: "tour_order_history_page" }),
			accessorKey: "dates",
			meta: {
				headerTitle: t("table.dates", {
					ns: "tour_order_history_page"
				}),
				skeleton: <Skeleton className="h-4 w-[200px]" />
			},
			cell: ({ row }) => {
				const order = row.original;
				return (
					<div className="whitespace-nowrap">
						{order.dates.from} - {order.dates.to}
					</div>
				);
			},
			size: 200
		},
		{
			header: t("table.status", { ns: "tour_order_history_page" }),
			accessorKey: "status",
			meta: {
				headerTitle: t("table.status", {
					ns: "tour_order_history_page"
				}),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_TOUR_ORDER_STATUS_TYPE;
				return (
					<Badge variant={TOUR_ORDER_STATUS_VARIANTS[status]}>
						{t(TOUR_ORDER_STATUS_LABELS[status], { ns: "options" })}
					</Badge>
				);
			},
			size: 120
		}
	];
};
