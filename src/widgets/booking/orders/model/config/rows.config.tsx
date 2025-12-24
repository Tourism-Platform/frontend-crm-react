import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { Badge, type BadgeVariant, Checkbox } from "@/shared/ui";

import {
	CLIENT_TYPE_LABELS,
	ENUM_CLIENT_TYPE_OPTIONS,
	type ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	ENUM_ORDER_TYPE_OPTIONS,
	type ENUM_ORDER_TYPE_OPTIONS_TYPE,
	type IOrder,
	ORDER_TYPE_LABELS
} from "@/entities/booking";

import { OrderActions } from "../../ui";

export const COLUMNS = (
	onEdit?: (id: string, data: Partial<IOrder>) => void,
	onDelete?: (id: string) => void
): ColumnDef<IOrder>[] => {
	const { t } = useTranslation("orders_page");
	return [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("table.orderId"),
			accessorKey: "orderId",
			cell: ({ row }) => (
				<Link
					to={ENUM_PATH.BOOKING.ORDER_ID.replace(
						":orderId",
						row.getValue("orderId")
					)}
					className="font-medium text-primary hover:underline"
				>
					{row.getValue("orderId")}
				</Link>
			),
			size: 120
		},
		{
			header: t("table.orderType"),
			accessorKey: "orderType",
			cell: ({ row }) => {
				const orderType = row.getValue(
					"orderType"
				) as ENUM_ORDER_TYPE_OPTIONS_TYPE;

				let variant: BadgeVariant = "default";
				switch (orderType) {
					case ENUM_ORDER_TYPE_OPTIONS.REGULAR:
						variant = "blue";
						break;
					case ENUM_ORDER_TYPE_OPTIONS.VIP:
						variant = "orange";
						break;
					case ENUM_ORDER_TYPE_OPTIONS.GROUP:
						variant = "green";
						break;
					default:
						variant = "default";
				}

				return (
					<Badge variant={variant}>
						{t(ORDER_TYPE_LABELS[orderType])}
					</Badge>
				);
			},
			size: 120
		},
		{
			header: t("table.dateCreated"),
			accessorKey: "dateCreated",
			size: 120
		},
		{
			header: t("table.client"),
			accessorKey: "client",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("client")}</div>
			),
			size: 160
		},
		{
			header: t("table.clientType"),
			accessorKey: "clientType",
			cell: ({ row }) => {
				const clientType = row.getValue(
					"clientType"
				) as ENUM_CLIENT_TYPE_OPTIONS_TYPE;

				let variant: BadgeVariant = "default";
				switch (clientType) {
					case ENUM_CLIENT_TYPE_OPTIONS.AGENCY:
						variant = "yellow";
						break;
					case ENUM_CLIENT_TYPE_OPTIONS.DIRECT:
						variant = "green";
						break;
					case ENUM_CLIENT_TYPE_OPTIONS.CORPORATE:
						variant = "blue";
						break;
					default:
						variant = "default";
				}

				return (
					<Badge variant={variant}>
						{t(CLIENT_TYPE_LABELS[clientType])}
					</Badge>
				);
			},
			size: 120
		},
		{
			header: t("table.pax"),
			accessorKey: "pax",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("pax")}</div>
			),
			size: 80
		},
		{
			header: t("table.dates"),
			accessorKey: "dates",
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
			size: 60,
			enableHiding: false
		}
	];
};
