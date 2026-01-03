import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Badge, Button } from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type IOrderSupplierPaymentItem,
	SUPPLIER_PAYMENT_STATUS_LABELS,
	SUPPLIER_PAYMENT_STATUS_VARIANTS
} from "@/entities/finance";
import { EVENT_METADATA } from "@/entities/tour";

export const SUPPLIER_PAYMENTS_COLUMNS =
	(): ColumnDef<IOrderSupplierPaymentItem>[] => {
		const { t } = useTranslation(["order_id_page", "options"]);

		return [
			{
				accessorKey: "item",
				header: t("supplier_payments.table.item"),
				cell: ({
					row: {
						original: { type, subRows },
						depth,
						getIsExpanded,
						getToggleExpandedHandler
					},
					getValue
				}) => {
					const hasSubRows = !!subRows?.length;
					const metadata = type ? EVENT_METADATA[type] : null;
					const Icon = metadata?.icon;

					return (
						<div
							className="flex items-center gap-2"
							style={{ paddingLeft: `${depth * 2}rem` }}
						>
							{hasSubRows ? (
								<Button
									onClick={getToggleExpandedHandler()}
									variant="ghost"
									size="icon"
								>
									{getIsExpanded() ? (
										<ChevronDown className="size-4 text-muted-foreground" />
									) : (
										<ChevronRight className="size-4 text-muted-foreground" />
									)}
								</Button>
							) : (
								<div className="w-9" />
							)}
							<div
								className={cn(
									"size-8 rounded-full flex items-center justify-center text-white shrink-0",
									metadata?.color_bg
								)}
							>
								{Icon && <Icon className="size-4" />}
							</div>
							<span className="font-medium">
								{getValue() as string}
							</span>
						</div>
					);
				},
				size: 300
			},
			{
				accessorKey: "confirmation",
				header: t("supplier_payments.table.confirmation"),
				cell: ({ row }) => {
					const confirmation = row.original.confirmation;

					if (!confirmation) {
						return <div>-</div>;
					}

					return (
						<a
							href={confirmation.fileUrl}
							target="_blank"
							rel="noreferrer"
							className="flex items-center gap-2 text-primary hover:underline"
						>
							{confirmation.fileName}
						</a>
					);
				}
			},
			{
				accessorKey: "supplierPayment",
				header: t("supplier_payments.table.supplier_payment"),
				cell: ({ row }) => (
					<div className="font-medium">
						{formatToDollars(row.original.supplierPayment)}
					</div>
				)
			},
			{
				accessorKey: "status",
				header: t("supplier_payments.table.status"),
				cell: ({ row }) => {
					const status = row.original.status;
					return (
						<Badge
							variant={SUPPLIER_PAYMENT_STATUS_VARIANTS[status]}
						>
							{t(SUPPLIER_PAYMENT_STATUS_LABELS[status], {
								ns: "options"
							})}
						</Badge>
					);
				}
			},
			{
				id: "actions",
				header: t("supplier_payments.table.actions"),
				cell: ({ row }) => {
					const status = row.original.status;

					// if (status === ENUM_SUPPLIER_PAYMENT_STATUS.BOOKED) {
					// 	return null;
					// }

					if (status === ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED) {
						return (
							<Button variant="outline" size="sm">
								{t("buttons.edit")}
							</Button>
						);
					}

					// Not booked
					return <Button size="sm">{t("buttons.book")}</Button>;
				}
			}
		];
	};
