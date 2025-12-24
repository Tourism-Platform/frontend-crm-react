"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight, FileText, Lock } from "lucide-react";
import { type ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";
import { Button } from "@/shared/ui/shadcn-ui/button";

interface IPaxDetail {
	id: string;
	type: string;
	detail: ReactNode;
}

interface IPaxItem {
	id: string;
	fullName: string;
	gender: "Male" | "Female";
	nationality: string;
	dateOfBirth: string;
	passportNumber: string;
	expiredDate: string;
	items: IPaxDetail[];
}

const PaxDetailsSubTable = ({ items }: { items: IPaxDetail[] }) => {
	const { t } = useTranslation("order_id_page");

	const columns = useMemo<ColumnDef<IPaxDetail>[]>(
		() => [
			{
				accessorKey: "type",
				size: 200,
				cell: ({ getValue }) => (
					<span className="font-medium text-muted-foreground">
						{getValue() as string}
					</span>
				)
			},
			{
				accessorKey: "detail",
				cell: ({ getValue }) => (
					<div className="text-foreground">
						{getValue() as ReactNode}
					</div>
				)
			}
		],
		[t]
	);

	return (
		<SmartTable
			data={items}
			columns={columns}
			showTopFilters={false}
			showPagination={false}
			tableLayout={{
				rowBorder: true,
				headerBackground: true,
				showHeader: false
			}}
		/>
	);
};

export const PaxInformation = () => {
	const { t } = useTranslation("order_id_page");

	const PAX_MOCK: IPaxItem[] = useMemo(
		() => [
			{
				id: "1",
				fullName: "Saimon Bill",
				gender: "Male",
				nationality: "USA",
				dateOfBirth: "13/05/1988",
				passportNumber: "13213467",
				expiredDate: "13/05/2029",
				items: []
			},
			{
				id: "2",
				fullName: "Amanda Jally",
				gender: "Female",
				nationality: "USA",
				dateOfBirth: "17/01/1999",
				passportNumber: "13289067",
				expiredDate: "17/01/2029",
				items: [
					{
						id: "2-1",
						type: t("pax_information.table.comment"),
						detail: (
							<span className="italic leading-relaxed">
								The passenger has a strong allergy to peanuts
								and nuts. Please ensure that all meals provided
								are completely nut-free and that no
								cross-contamination occurs during preparation.
							</span>
						)
					},
					{
						id: "2-2",
						type: t("pax_information.table.file"),
						detail: (
							<div className="flex items-center gap-4 bg-muted/20 border border-border/40 rounded-xl p-3 max-w-md">
								<div className="size-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary">
									<FileText className="size-5" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="text-sm font-semibold truncate">
										Passport Amanda Jally.pdf
									</div>
									<div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
										94 KB
									</div>
								</div>
								<div className="p-2 hover:bg-muted rounded-full cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
									<Lock className="size-4" />
								</div>
							</div>
						)
					}
				]
			},
			{
				id: "3",
				fullName: "Amad Diallo",
				gender: "Male",
				nationality: "USA",
				dateOfBirth: "20/09/1992",
				passportNumber: "89213467",
				expiredDate: "20/09/2029",
				items: []
			}
		],
		[t]
	);

	const columns: ColumnDef<IPaxItem>[] = [
		{
			id: "expand",
			header: () => null,
			size: 40,
			cell: ({ row }) => {
				return row.getCanExpand() ? (
					<Button
						onClick={row.getToggleExpandedHandler()}
						variant="ghost"
						size="sm"
						className="p-1 h-8 w-8 text-muted-foreground hover:text-foreground"
					>
						{row.getIsExpanded() ? (
							<ChevronDown className="size-4" />
						) : (
							<ChevronRight className="size-4" />
						)}
					</Button>
				) : null;
			},
			meta: {
				expandedContent: (row: IPaxItem) => (
					<PaxDetailsSubTable items={row.items} />
				)
			}
		},
		{
			accessorKey: "fullName",
			header: t("pax_information.table.full_name"),
			cell: ({ getValue }) => (
				<span className="font-medium">{getValue() as string}</span>
			)
		},
		{
			accessorKey: "gender",
			header: t("pax_information.table.gender")
		},
		{
			accessorKey: "nationality",
			header: t("pax_information.table.nationality")
		},
		{
			accessorKey: "dateOfBirth",
			header: t("pax_information.table.date_of_birth")
		},
		{
			accessorKey: "passportNumber",
			header: t("pax_information.table.passport_number")
		},
		{
			accessorKey: "expiredDate",
			header: t("pax_information.table.expired_date")
		}
	];

	return (
		<Card>
			<CardHeader className="text-lg font-semibold">
				<CardTitle>{t("pax_information.title")}</CardTitle>
			</CardHeader>
			<CardContent>
				<SmartTable
					data={PAX_MOCK}
					columns={columns}
					getRowCanExpand={(row: { original: IPaxItem }) =>
						row.original.items.length > 0
					}
					tableLayout={{
						rowBorder: true,
						headerBackground: false
					}}
				/>
			</CardContent>
		</Card>
	);
};
