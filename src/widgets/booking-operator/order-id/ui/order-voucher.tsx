import { type FC, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	type TFileMetadata,
	type TFileWithPreview,
	useOptionalResourceQuery
} from "@/shared/hooks";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CustomUploadFiles,
	withErrorBoundary
} from "@/shared/ui";

import {
	useDeleteVoucherMutation,
	useGetVoucherQuery,
	useUploadVoucherMutation
} from "@/entities/booking";

interface IOrderVoucherProps {
	bookingId: string;
}

const OrderVoucherBase: FC<IOrderVoucherProps> = ({ bookingId }) => {
	const { t } = useTranslation("order_id_page");

	// 404 — ваучер ещё не загружен, это не ошибка
	const {
		data: voucher,
		exists,
		isRealError
	} = useOptionalResourceQuery(
		useGetVoucherQuery(bookingId, { skip: !bookingId })
	);

	const [uploadVoucher, { isLoading: isUploading }] =
		useUploadVoucherMutation();
	const [deleteVoucher, { isLoading: isDeleting }] =
		useDeleteVoucherMutation();

	useEffect(() => {
		if (isRealError) {
			toast.error(t("voucher.toasts.load.error"));
		}
	}, [isRealError, t]);

	const initialFiles = useMemo<TFileMetadata[]>(
		() =>
			exists && voucher
				? [
						{
							id: voucher.bookingId,
							name: voucher.fileName ?? voucher.orderNumber,
							size: 0,
							type: "application/pdf",
							url: voucher.url
						}
					]
				: [],
		[exists, voucher]
	);

	const handleFilesAdded = useCallback(
		async (addedFiles: TFileWithPreview[]) => {
			const [fileWrapper] = addedFiles;
			if (!(fileWrapper?.file instanceof File)) return;

			try {
				await uploadVoucher({
					bookingId,
					file: fileWrapper.file
				}).unwrap();
				toast.success(t("voucher.toasts.upload.success"));
			} catch {
				toast.error(t("voucher.toasts.upload.error"));
			}
		},
		[bookingId, uploadVoucher, t]
	);

	const handleFileRemove = useCallback(
		async (fileId: string) => {
			if (!exists || fileId !== bookingId) return;

			try {
				await deleteVoucher(bookingId).unwrap();
				toast.success(t("voucher.toasts.delete.success"));
			} catch {
				toast.error(t("voucher.toasts.delete.error"));
			}
		},
		[bookingId, deleteVoucher, exists, t]
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					{t("voucher.title")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CustomUploadFiles
					initialFiles={initialFiles}
					maxFiles={1}
					onFilesAdded={handleFilesAdded}
					onFileRemove={handleFileRemove}
					isLoading={isUploading || isDeleting}
					loadingId={isDeleting ? bookingId : undefined}
					showAllRemoveButton={false}
					showTopTitle={false}
				/>
			</CardContent>
		</Card>
	);
};

export const OrderVoucher = withErrorBoundary(OrderVoucherBase);
