import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { TFileMetadata, TFileWithPreview } from "@/shared/hooks";

import {
	useAddAttachmentMutation,
	useListAttachmentsQuery,
	useRemoveAttachmentMutation
} from "../api";
import { mapAttachmentToFileMetadata } from "../converters";

type TUsePaymentAttachmentsParams = {
	paymentId: string;
	enabled?: boolean;
};

type TUsePaymentAttachmentsResult = {
	initialFiles: TFileMetadata[];
	isLoading: boolean;
	loadingId?: string;
	addFiles: (addedFiles: TFileWithPreview[]) => Promise<void>;
	removeFile: (fileId: string) => Promise<void>;
};

export const usePaymentAttachments = ({
	paymentId,
	enabled = true
}: TUsePaymentAttachmentsParams): TUsePaymentAttachmentsResult => {
	const { t } = useTranslation("common");
	const [initialFiles, setInitialFiles] = useState<TFileMetadata[]>([]);
	const [loadingId, setLoadingId] = useState<string | undefined>();

	const { data: attachments } = useListAttachmentsQuery(paymentId, {
		skip: !enabled || !paymentId
	});

	const [addAttachment, { isLoading: isAdding }] = useAddAttachmentMutation();
	const [removeAttachment, { isLoading: isRemoving }] =
		useRemoveAttachmentMutation();

	useEffect(() => {
		if (attachments) {
			setInitialFiles(attachments.map(mapAttachmentToFileMetadata));
		}
	}, [attachments]);

	const addFiles = useCallback(
		async (addedFiles: TFileWithPreview[]) => {
			for (const item of addedFiles) {
				if (!(item.file instanceof File)) continue;

				try {
					await addAttachment({
						paymentId,
						file: item.file
					}).unwrap();
				} catch {
					toast.error(t("upload_files.errors.upload"));
				}
			}
		},
		[addAttachment, paymentId, t]
	);

	const removeFile = useCallback(
		async (fileId: string) => {
			const isExisting = attachments?.some(
				(file) => file.file_id === fileId
			);
			if (!isExisting) return;

			setLoadingId(fileId);
			try {
				await removeAttachment({ paymentId, fileId }).unwrap();
			} catch {
				toast.error(t("upload_files.errors.remove"));
			} finally {
				setLoadingId(undefined);
			}
		},
		[attachments, paymentId, removeAttachment, t]
	);

	return {
		initialFiles,
		isLoading: isAdding || isRemoving,
		loadingId,
		addFiles,
		removeFile
	};
};
