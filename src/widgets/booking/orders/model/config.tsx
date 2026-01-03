import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Badge, Skeleton } from "@/shared/ui";

import {
	CLIENT_TYPE_LABELS,
	CLIENT_TYPE_VARIANTS,
	type ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	type ENUM_INVOICE_STATUS_TYPE,
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	type ENUM_ORDER_TYPE_OPTIONS_TYPE,
	INVOICE_STATUS_LABELS,
	INVOICE_STATUS_VARIANTS,
	type IOrder,
	ORDER_TYPE_LABELS,
	ORDER_TYPE_VARIANTS
} from "@/entities/booking";

import { OrderActions } from "../ui";

export const COLUMNS = (
	activeTab: ENUM_ORDER_STATUS_TYPE,
	onEdit?: (id: string, data: Partial<IOrder>) => void,
	onDelete?: (id: string) => void
): ColumnDef<IOrder>[] => {
	const { t } = useTranslation("orders_page");
	return [
		{
			id: "select",
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("table.orderId"),
			accessorKey: "orderId",
			meta: {
				headerTitle: t("table.orderId"),
				skeleton: <Skeleton className="h-4 w-[80px]" />
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
			size: 120
		},
		{
			header: t("table.tourName"),
			accessorKey: "tourName",
			meta: {
				headerTitle: t("table.tourName"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			cell: ({ row }) => (
				<div className="font-medium truncate">
					{row.getValue("tourName")}
				</div>
			),
			size: 120
		},
		{
			header: t("table.orderType"),
			accessorKey: "orderType",
			meta: {
				headerTitle: t("table.orderType"),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			cell: ({ row }) => {
				const orderType = row.getValue(
					"orderType"
				) as ENUM_ORDER_TYPE_OPTIONS_TYPE;

				return (
					<Badge variant={ORDER_TYPE_VARIANTS[orderType]}>
						{t(ORDER_TYPE_LABELS[orderType])}
					</Badge>
				);
			},
			size: 120
		},
		{
			header: t("table.dateCreated"),
			accessorKey: "dateCreated",
			meta: {
				headerTitle: t("table.dateCreated"),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			size: 120
		},
		{
			header: t("table.client"),
			accessorKey: "client",
			meta: {
				headerTitle: t("table.client"),
				skeleton: <Skeleton className="h-4 w-[100px]" />
			},
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("client")}</div>
			),
			size: 160
		},
		{
			header: t("table.clientType"),
			accessorKey: "clientType",
			meta: {
				headerTitle: t("table.clientType"),
				skeleton: <Skeleton className="h-4 w-[80px]" />
			},
			cell: ({ row }) => {
				const clientType = row.getValue(
					"clientType"
				) as ENUM_CLIENT_TYPE_OPTIONS_TYPE;

				return (
					<Badge variant={CLIENT_TYPE_VARIANTS[clientType]}>
						{t(CLIENT_TYPE_LABELS[clientType])}
					</Badge>
				);
			},
			size: 120
		},
		{
			header: t("table.pax"),
			accessorKey: "pax",
			meta: {
				headerTitle: t("table.pax"),
				skeleton: <Skeleton className="h-4 w-[30px]" />
			},
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("pax")}</div>
			),
			size: 80
		},

		{
			header: t("table.dates"),
			accessorKey: "dates",
			meta: {
				headerTitle: t("table.dates"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			cell: ({ row }) => {
				const dates = row.getValue("dates") as IOrder["dates"];
				return (
					<div className="font-medium">
						{dates.from} - {dates.to}
					</div>
				);
			},
			size: 200
		},
		...(activeTab !== ENUM_ORDER_STATUS.NEW
			? [
					{
						header: t("table.manager"),
						accessorKey: "manager",
						meta: {
							headerTitle: t("table.manager"),
							skeleton: <Skeleton className="h-4 w-[100px]" />
						},
						cell: ({ row }) => (
							<div className="font-medium">
								{row.getValue("manager") || "-"}
							</div>
						),
						size: 120
					} as ColumnDef<IOrder>
				]
			: []),
		...(activeTab === ENUM_ORDER_STATUS.IN_PROGRESS ||
		activeTab === ENUM_ORDER_STATUS.COMPLETED
			? [
					{
						header: t("table.invoiceStatusColumn"),
						accessorKey: "invoiceStatus",
						meta: {
							headerTitle: t("table.invoiceStatusColumn"),
							skeleton: <Skeleton className="h-4 w-[80px]" />
						},
						cell: ({ row }) => {
							const invoiceStatus = row.getValue(
								"invoiceStatus"
							) as ENUM_INVOICE_STATUS_TYPE;

							if (!invoiceStatus) return <div>-</div>;

							return (
								<Badge
									variant={
										INVOICE_STATUS_VARIANTS[invoiceStatus]
									}
								>
									{t(INVOICE_STATUS_LABELS[invoiceStatus])}
								</Badge>
							);
						},
						size: 150
					} as ColumnDef<IOrder>
				]
			: []),

		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => (
				<OrderActions
					order={row.original}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
			meta: {
				skeleton: <div className="size-9 rounded-md" />
			},
			size: 60,
			enableHiding: false
		}
	];
};
