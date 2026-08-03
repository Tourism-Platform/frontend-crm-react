import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { DownloadIcon, FileText, Loader2Icon } from "lucide-react";
import type { FC } from "react";
import { toast } from "sonner";

import { useDownloadFile } from "@/shared/hooks";
import { Button } from "@/shared/ui";

import {
	type IPaxReviewDetail,
	useLazyGetFileBinaryQuery
} from "@/entities/booking";

type TPaxPassportDownloadButtonProps = {
	fileId: string;
	fileName: string;
};

const PaxPassportDownloadButton: FC<TPaxPassportDownloadButtonProps> = ({
	fileId,
	fileName
}) => {
	const [{ isDownloading }, { downloadBlob }] = useDownloadFile();
	const [fetchFile, { isFetching }] = useLazyGetFileBinaryQuery();

	const handleDownload = async () => {
		try {
			const blob = await fetchFile(fileId).unwrap();
			await downloadBlob({ blob, fileName });
		} catch {
			toast.error("Failed to download passport file");
		}
	};

	const isBusy = isDownloading || isFetching;

	return (
		<Button
			size="icon"
			type="button"
			variant="ghost"
			className="size-8 shrink-0 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full"
			onClick={handleDownload}
			disabled={isBusy || !fileId}
			aria-label="Download passport"
		>
			{isBusy ? (
				<Loader2Icon className="size-4 animate-spin" aria-hidden />
			) : (
				<DownloadIcon className="size-4" aria-hidden />
			)}
		</Button>
	);
};

export const PAX_DETAILS_COLUMNS = (
	t: TFunction<["order_id_page"], undefined>
): ColumnDef<IPaxReviewDetail>[] => {
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
					const fileName = file?.fileName || value;

					return (
						<div className="flex items-center gap-4 bg-muted/20 border border-border/40 rounded-xl p-3 max-w-md text-foreground">
							<div className="size-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary">
								<FileText className="size-5" />
							</div>
							<div className="flex-1 min-w-0">
								<div className="text-sm font-semibold truncate">
									{fileName}
								</div>
							</div>
							{file?.id ? (
								<PaxPassportDownloadButton
									fileId={file.id}
									fileName={fileName}
								/>
							) : null}
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
