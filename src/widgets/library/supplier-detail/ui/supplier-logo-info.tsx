import { Loader, TrashIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useFileUpload } from "@/shared/hooks";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	withErrorBoundary
} from "@/shared/ui";

import {
	useDeleteSupplierLogoMutation,
	useUploadSupplierLogoMutation
} from "@/entities/supplier";

interface ISupplierLogoInfoProps {
	supplierId: string;
	brandName: string;
	logoPath: string | null;
}

const SupplierLogoInfoBase: FC<ISupplierLogoInfoProps> = ({
	supplierId,
	brandName,
	logoPath
}) => {
	const { t } = useTranslation("supplier_id_page");
	const [uploadLogo, { isLoading: isUploading }] =
		useUploadSupplierLogoMutation();
	const [deleteLogo, { isLoading: isDeleting }] =
		useDeleteSupplierLogoMutation();

	const [{ files }, { removeFile, openFileDialog, getInputProps }] =
		useFileUpload({
			accept: "image/*",
			multiple: false,
			onFilesAdded: async (addedFiles) => {
				const file = addedFiles[0];
				if (file?.file) {
					try {
						await uploadLogo({
							supplierId,
							file: file.file as File
						}).unwrap();
						toast.success(t("logo.toasts.upload.success"));
					} catch (error) {
						toast.error(t("logo.toasts.upload.error"));
						if (file.id) removeFile(file.id);
						console.error(error);
					}
				}
			}
		});

	const handleRemove = async () => {
		try {
			await deleteLogo({ supplierId }).unwrap();
			toast.success(t("logo.toasts.delete.success"));
			if (files[0]?.id) removeFile(files[0].id);
		} catch (error) {
			toast.error(t("logo.toasts.delete.error"));
			console.error(error);
		}
	};

	const fallback =
		brandName
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2) || "S";

	const src = logoPath || files[0]?.preview;
	const hasLogo = Boolean(logoPath || files[0]?.file?.name);

	return (
		<div className="flex flex-col gap-5">
			<h2 className="text-xl">{t("logo.title")}</h2>
			<div className="flex items-center gap-5">
				<Avatar
					key={src ?? "fallback"}
					className="size-32 border border-accent"
				>
					{src ? <AvatarImage src={src} alt={brandName} /> : null}
					<AvatarFallback className="text-3xl">
						{fallback}
					</AvatarFallback>
				</Avatar>
				<div className="flex gap-2">
					<div className="relative inline-block">
						<Button
							type="button"
							onClick={openFileDialog}
							aria-haspopup="dialog"
							disabled={isUploading || isDeleting}
						>
							{isUploading && (
								<Loader className="mr-2 h-4 w-4 animate-spin" />
							)}
							{hasLogo
								? t("logo.buttons.change")
								: t("logo.buttons.add")}
						</Button>
						<input
							{...getInputProps()}
							className="sr-only"
							aria-label="Upload logo file"
							tabIndex={-1}
						/>
					</div>
					{hasLogo ? (
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={handleRemove}
							disabled={isUploading || isDeleting}
						>
							{isDeleting ? (
								<Loader className="h-4 w-4 animate-spin" />
							) : (
								<TrashIcon className="h-4 w-4" />
							)}
						</Button>
					) : null}
				</div>
			</div>
		</div>
	);
};

export const SupplierLogoInfo = withErrorBoundary(SupplierLogoInfoBase);
