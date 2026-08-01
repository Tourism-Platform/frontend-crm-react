import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Badge, Skeleton } from "@/shared/ui";

import {
	BOOKING_CLIENT_TYPE_LABELS,
	BOOKING_CLIENT_TYPE_VARIANTS,
	BOOKING_ORDER_STATUS_LABELS,
	BOOKING_ORDER_STATUS_VARIANTS,
	type ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	type ENUM_ORDER_STATUS_TYPE,
	type IOrder
} from "@/entities/booking";

export const ORDER_HISTORY_COLUMNS = (
	t: TFunction<["tour_order_history_page", "options"], undefined>
): ColumnDef<IOrder>[] => {
	return [
		{
			header: t("table.order_id", { ns: "tour_order_history_page" }),
			accessorKey: "orderNumber",
			meta: {
				headerTitle: t("table.order_id", {
					ns: "tour_order_history_page"
				}),
				skeleton: <Skeleton className="h-4 w-[140px]" />
			},
			cell: ({ row }) => (
				<Link
					to={buildRoute(ENUM_PATH.BOOKING.ORDER_ID, {
						orderId: row.original.orderId
					})}
					className="font-medium text-primary hover:underline"
				>
					{row.getValue("orderNumber") ?? row.original.orderId}
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
			accessorKey: "clientType",
			meta: {
				headerTitle: t("table.type", { ns: "tour_order_history_page" }),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			cell: ({ row }) => {
				const clientType = row.getValue(
					"clientType"
				) as ENUM_CLIENT_TYPE_OPTIONS_TYPE;

				return (
					<Badge variant={BOOKING_CLIENT_TYPE_VARIANTS[clientType]}>
						{t(BOOKING_CLIENT_TYPE_LABELS[clientType], {
							ns: "options"
						})}
					</Badge>
				);
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
				const status = row.getValue("status") as ENUM_ORDER_STATUS_TYPE;
				return (
					<Badge variant={BOOKING_ORDER_STATUS_VARIANTS[status]}>
						{t(BOOKING_ORDER_STATUS_LABELS[status], {
							ns: "options"
						})}
					</Badge>
				);
			},
			size: 120
		}
	];
};
