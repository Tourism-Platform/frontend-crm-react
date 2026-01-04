import { type ColumnDef } from "@tanstack/react-table";
import { FileText, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

import { type IPaxReviewDetail } from "@/entities/booking";

export const PAX_DETAILS_COLUMNS = (): ColumnDef<IPaxReviewDetail>[] => {
	const { t } = useTranslation("order_id_page");
	return [
		{
			accessorKey: "type",
			size: 200,
			cell: ({ getValue }) => {
				const type = getValue() as string;
				const label =
					type === "comment"
						? t("pax_information.table.comment")
						: type === "file"
							? t("pax_information.table.file")
							: type;
				return (
					<span className="font-medium text-muted-foreground pl-12">
						{label}
					</span>
				);
			}
		},
		{
			accessorKey: "value",
			cell: ({ row: { original } }) => {
				const { type, value, file } = original;

				if (type === "file") {
					return (
						<div className="flex items-center gap-4 bg-muted/20 border border-border/40 rounded-xl p-3 max-w-md text-foreground">
							<div className="size-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary">
								<FileText className="size-5" />
							</div>
							<div className="flex-1 min-w-0">
								<div className="text-sm font-semibold truncate">
									{file?.fileName || value}
								</div>
								{/* <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
									{file?.fileSize || "-"}
								</div> */}
							</div>
							<div className="p-2 hover:bg-muted rounded-full cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
								<Lock className="size-4" />
							</div>
						</div>
					);
				}

				if (type === "comment") {
					return (
						<div className="text-foreground italic leading-relaxed">
							{value}
						</div>
					);
				}

				return <div className="text-foreground">{value}</div>;
			}
		}
	];
};
