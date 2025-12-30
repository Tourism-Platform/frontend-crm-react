import { type FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { TFileMetadata, TFileWithPreview } from "@/shared/hooks";
import { CustomUploadFiles } from "@/shared/ui";

import {
	useDeleteBusinessDocumentMutation,
	useGetBusinessDocumentsQuery,
	useUploadBusinessDocumentMutation
} from "@/entities/user";

export const DocumentsInfo: FC = () => {
	const { t } = useTranslation("business_settings_page");

	const { data: documents, isError: isDocumentsError } =
		useGetBusinessDocumentsQuery();

	const [uploadDocument, { isLoading: isUploading }] =
		useUploadBusinessDocumentMutation();
	const [deleteDocument, { isLoading: isDeleting }] =
		useDeleteBusinessDocumentMutation();

	const [initialFiles, setInitialFiles] = useState<TFileMetadata[]>([]);
	const [loadingId, setLoadingId] = useState<string | undefined>();

	useEffect(() => {
		if (documents) {
			setInitialFiles(
				documents.map((doc) => ({
					id: doc.id,
					name: doc.name,
					size: doc.size,
					type: doc.type,
					url: doc.url
				}))
			);
		}
	}, [documents]);

	useEffect(() => {
		if (isDocumentsError) {
			toast.error(t("form.documents.toasts.load.error"));
		}
	}, [isDocumentsError, t]);

	const handleFilesChange = useCallback(
		async (files: TFileWithPreview[]) => {
			// Находим новые файлы (те, что являются File объектами, а не TFileMetadata)
			const newFiles = files.filter(
				(f) => f.file instanceof File
			) as TFileWithPreview[];

			for (const fileWrapper of newFiles) {
				if (fileWrapper.file instanceof File) {
					try {
						await uploadDocument({
							file: fileWrapper.file
						}).unwrap();
						toast.success(
							t("form.documents.toasts.upload.success")
						);
					} catch (error) {
						toast.error(t("form.documents.toasts.upload.error"));
						console.error(error);
					}
				}
			}
		},
		[uploadDocument, t]
	);

	const handleFileRemove = useCallback(
		async (fileId: string) => {
			// Проверяем, что это существующий документ (не новый файл)
			const isExistingDocument = documents?.some(
				(doc) => doc.id === fileId
			);

			if (isExistingDocument) {
				setLoadingId(fileId);
				try {
					await deleteDocument(fileId).unwrap();
					toast.success(t("form.documents.toasts.delete.success"));
				} catch (error) {
					toast.error(t("form.documents.toasts.delete.error"));
					console.error(error);
				} finally {
					setLoadingId(undefined);
				}
			}
		},
		[deleteDocument, documents, t]
	);

	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("form.documents.title")}</h2>
			<CustomUploadFiles
				initialFiles={initialFiles}
				onFilesChange={handleFilesChange}
				onFileRemove={handleFileRemove}
				isLoading={isUploading || isDeleting}
				loadingId={loadingId}
			/>
		</div>
	);
};
