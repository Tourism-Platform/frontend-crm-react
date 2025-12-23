"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight, FileText, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

import { CustomDataGrid } from "@/shared/ui/custom/data-grid";

interface IPaxItem {
	id: string;
	fullName: string;
	gender: "Male" | "Female";
	nationality: string;
	dateOfBirth: string;
	passportNumber: string;
	expiredDate: string;
	comment?: string;
	file?: {
		name: string;
		size: string;
	};
}

const PAX_MOCK: IPaxItem[] = [
	{
		id: "1",
		fullName: "Saimon Bill",
		gender: "Male",
		nationality: "USA",
		dateOfBirth: "13/05/1988",
		passportNumber: "13213467",
		expiredDate: "13/05/2029"
	},
	{
		id: "2",
		fullName: "Amanda Jally",
		gender: "Female",
		nationality: "USA",
		dateOfBirth: "17/01/1999",
		passportNumber: "13289067",
		expiredDate: "17/01/2029",
		comment: "Nut allergy",
		file: {
			name: "Passport Amanda Jally.pdf",
			size: "94 KB"
		}
	},
	{
		id: "3",
		fullName: "Amad Diallo",
		gender: "Male",
		nationality: "USA",
		dateOfBirth: "20/09/1992",
		passportNumber: "89213467",
		expiredDate: "20/09/2029"
	}
];

export const PaxInformation = () => {
	const { t } = useTranslation("order_id_page");

	const columns: ColumnDef<IPaxItem>[] = [
		{
			accessorKey: "fullName",
			header: t("pax_information.table.full_name"),
			cell: ({ row, getValue }) => {
				const isExpanded = row.getIsExpanded();
				const canExpand = !!(row.original.comment || row.original.file);

				return (
					<div className="flex items-center gap-2">
						{canExpand && (
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
						{!canExpand && <div className="w-6" />}
						<span className="font-medium text-slate-700">
							{getValue() as string}
						</span>
					</div>
				);
			},
			meta: {
				expandedContent: (data: IPaxItem) => (
					<div className="bg-slate-50/50 p-6 flex gap-12 border-t border-b">
						<div className="flex flex-col gap-2 max-w-[300px]">
							<div className="text-sm font-semibold text-slate-900">
								{t("pax_information.table.comment")}:
							</div>
							<div className="text-sm text-slate-600">
								{data.comment || "-"}
							</div>
						</div>
						{data.file && (
							<div className="flex flex-col gap-2">
								<div className="text-sm font-semibold text-slate-900">
									{t("pax_information.table.file")}:
								</div>
								<div className="flex items-center gap-4 bg-white border rounded-xl p-3 shadow-sm min-w-[280px]">
									<div className="size-10 bg-indigo-100 flex items-center justify-center rounded-lg text-indigo-600">
										<FileText className="size-6" />
									</div>
									<div className="flex-1 min-w-0">
										<div className="text-sm font-medium text-slate-900 truncate">
											{data.file.name}
										</div>
										<div className="text-xs text-slate-500 uppercase">
											{data.file.size}
										</div>
									</div>
									<div className="p-2 hover:bg-slate-50 rounded-full cursor-pointer text-slate-400">
										<Lock className="size-4" />
									</div>
								</div>
							</div>
						)}
					</div>
				)
			}
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
		<div className="mt-8 bg-card border rounded-lg overflow-hidden">
			<div className="p-6 border-b">
				<h3 className="text-lg font-semibold">
					{t("pax_information.title")}
				</h3>
			</div>
			<div className="p-0">
				<CustomDataGrid
					data={PAX_MOCK}
					columns={columns}
					pageSize={100}
					paginationInfo=" "
				/>
			</div>
		</div>
	);
};
