import { type ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Badge, type BadgeVariant, Button, Checkbox } from "@/shared/ui";

import {
	ENUM_PAYMENT_STATUS,
	type ENUM_PAYMENT_STATUS_TYPE,
	type IPayment,
	PAYMENT_STATUS_LABELS
} from "@/entities/finance";

import { AssignClientPayment, OpenClientPayment } from "@/features/finance";

export const COLUMNS = (): ColumnDef<IPayment>[] => {
	const { t } = useTranslation("client_payments_page");
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
			header: t("table.paymentId"),
			accessorKey: "paymentId",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("paymentId")}</div>
			),
			size: 160
		},
		{
			header: t("table.orderId"),
			accessorKey: "orderId",
			size: 160
		},
		{
			header: t("table.dateCreated"),
			accessorKey: "dateCreated",
			size: 160
		},
		{
			header: t("table.amount"),
			accessorKey: "amount",
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("amount"));
				const currency = row.original.currency;
				return (
					<div className="font-medium">
						{amount.toLocaleString()} {currency}
					</div>
				);
			},
			size: 140
		},
		{
			header: t("table.status"),
			accessorKey: "status",
			cell: ({ row }) => {
				const status = row.getValue(
					"status"
				) as ENUM_PAYMENT_STATUS_TYPE;

				let variant: BadgeVariant = "default";
				switch (status) {
					case ENUM_PAYMENT_STATUS.ASSIGNED:
						variant = "green";
						break;
					case ENUM_PAYMENT_STATUS.NOT_ASSIGNED:
						variant = "red";
						break;
					default:
						variant = "default";
				}

				return (
					<Badge variant={variant}>
						{t(PAYMENT_STATUS_LABELS[status])}
					</Badge>
				);
			},
			size: 160
		},
		{
			id: "actions",
			header: () => <div className="text-right">Actions</div>,
			cell: ({ row }) => {
				const payment = row.original;
				const status = payment.status;

				const handleAssign = (data: { orderId: string }) => {
					console.log("Assigning payment to order:", data.orderId);
					// TODO: Implement actual assignment logic
				};

				return (
					<div className="text-right">
						{status === ENUM_PAYMENT_STATUS.ASSIGNED ? (
							<OpenClientPayment
								trigger={
									<Button
										variant="outline"
										size="sm"
										className="h-8 py-0 rounded px-4 text-xs font-medium border-gray-200"
									>
										Open
									</Button>
								}
								data={{
									paymentId: payment.paymentId,
									orderId: payment.orderId,
									dateCreated: payment.dateCreated,
									amount: payment.amount,
									currency: payment.currency,
									status: payment.status
								}}
							/>
						) : (
							<AssignClientPayment
								trigger={
									<Button
										variant="outline"
										size="sm"
										className="h-8 py-0 rounded px-4 text-xs font-medium border-gray-200"
									>
										Assign
									</Button>
								}
								onAssign={handleAssign}
							/>
						)}
					</div>
				);
			},
			size: 120,
			enableHiding: false
		}
	];
};
