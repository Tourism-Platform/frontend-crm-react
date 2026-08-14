import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { TFileMetadata, TFileWithPreview } from "@/shared/hooks";
import {
	Button,
	CustomField,
	CustomUploadFiles,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	Separator
} from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ISupplierPayment,
	SUPPLIER_PAYMENT_STATUS_LABELS,
	useGetSupplierPaymentByIdQuery,
	useRemoveSupplierPaymentReceiptMutation,
	useUpdateSupplierPaymentMutation,
	useUploadSupplierPaymentReceiptMutation
} from "@/entities/finance";

import {
	CONFIRM_PAYMENT_SCHEMA,
	ENUM_FORM_CONFIRM_PAYMENT,
	FORM_CONFIRM_PAYMENT_LIST,
	type TConfirmPaymentSchema
} from "../model";

interface IConfirmPaymentProps {
	payment: ISupplierPayment;
}

export const ConfirmPayment: FC<IConfirmPaymentProps> = ({ payment }) => {
	const { t } = useTranslation("supplier_payments_page", {
		useSuspense: false
	});
	const statusOptions = useValueToTranslateLabel(
		SUPPLIER_PAYMENT_STATUS_LABELS
	);
	const fields = FORM_CONFIRM_PAYMENT_LIST.map((item) =>
		item.key === ENUM_FORM_CONFIRM_PAYMENT.STATUS &&
		item.fieldType === "select"
			? { ...item, options: statusOptions }
			: item
	);
	const [open, setOpen] = useState<boolean>(false);
	const [initialFiles, setInitialFiles] = useState<TFileMetadata[]>([]);
	const [loadingId, setLoadingId] = useState<string | undefined>();

	const [updatePayment, { isLoading: isUpdating }] =
		useUpdateSupplierPaymentMutation();
	const [uploadReceipt, { isLoading: isUploading }] =
		useUploadSupplierPaymentReceiptMutation();
	const [removeReceipt, { isLoading: isRemoving }] =
		useRemoveSupplierPaymentReceiptMutation();

	const { data: paymentDetail } = useGetSupplierPaymentByIdQuery(payment.id, {
		skip: !open
	});

	const isLoading = isUpdating || isUploading || isRemoving;

	const isConfirmed =
		(paymentDetail?.status ?? payment.status) ===
		ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED;

	const detailFiles = paymentDetail?.files ?? [];

	useEffect(() => {
		if (paymentDetail?.files) {
			setInitialFiles(paymentDetail.files);
		}
	}, [paymentDetail?.files]);

	const form = useForm<TConfirmPaymentSchema>({
		resolver: zodResolver(CONFIRM_PAYMENT_SCHEMA),
		defaultValues: {
			[ENUM_FORM_CONFIRM_PAYMENT.ORDER_ID]: payment.bookingId,
			[ENUM_FORM_CONFIRM_PAYMENT.AMOUNT]: payment.amount,
			[ENUM_FORM_CONFIRM_PAYMENT.STATUS]: payment.status,
			[ENUM_FORM_CONFIRM_PAYMENT.NOTE]: payment.note || ""
		},
		mode: "onSubmit"
	});

	useEffect(() => {
		if (!paymentDetail || !open) return;

		form.reset({
			[ENUM_FORM_CONFIRM_PAYMENT.ORDER_ID]: paymentDetail.bookingId,
			[ENUM_FORM_CONFIRM_PAYMENT.AMOUNT]: paymentDetail.amount,
			[ENUM_FORM_CONFIRM_PAYMENT.STATUS]: paymentDetail.status,
			[ENUM_FORM_CONFIRM_PAYMENT.NOTE]: paymentDetail.note || ""
		});
	}, [form, open, paymentDetail]);

	const handleFilesAdded = useCallback(
		async (addedFiles: TFileWithPreview[]) => {
			for (const item of addedFiles) {
				if (!(item.file instanceof File)) continue;

				try {
					await uploadReceipt({
						id: payment.id,
						file: item.file
					}).unwrap();
				} catch {
					toast.error(t("form.toasts.error"));
				}
			}
		},
		[payment.id, t, uploadReceipt]
	);

	const handleFileRemove = useCallback(
		async (fileId: string) => {
			const isExisting = detailFiles.some((file) => file.id === fileId);
			if (!isExisting) return;

			setLoadingId(fileId);
			try {
				await removeReceipt({
					paymentId: payment.id,
					fileId
				}).unwrap();
			} catch {
				toast.error(t("form.toasts.error"));
			} finally {
				setLoadingId(undefined);
			}
		},
		[detailFiles, payment.id, removeReceipt, t]
	);

	async function onSubmit(data: TConfirmPaymentSchema) {
		try {
			if (
				data.status === ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED &&
				detailFiles.length === 0
			) {
				toast.error(t("form.errors.files.required"));
				return;
			}

			const amountChanged = data.amount !== paymentDetail?.amount;
			const noteChanged =
				(data.note ?? "") !== (paymentDetail?.note ?? "");
			const statusChanged = data.status !== paymentDetail?.status;

			if (amountChanged || noteChanged || statusChanged) {
				await updatePayment({
					id: payment.id,
					data: {
						amount: data.amount,
						note: data.note,
						status: data.status
					}
				}).unwrap();
			}

			toast.success(t("form.toasts.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("form.toasts.error"));
			console.error("Failed to confirm supplier payment:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant={isConfirmed ? "outline" : "default"}
					size="sm"
					className="w-full"
				>
					{isConfirmed
						? t("table.menu.open")
						: t("table.menu.confirm")}
				</Button>
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="sm:max-w-[52rem]"
			>
				<DialogHeader>
					<DialogTitle>{t("form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						className="space-y-6"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{fields.map(({ key, ...item }) => (
								<CustomField
									key={key}
									control={form.control}
									name={key}
									t={t}
									disabled={isConfirmed}
									{...item}
								/>
							))}
						</div>
						<div className="flex flex-col gap-2">
							<p className="ml-1 text-sm font-medium">
								{t("form.fields.files.label")}:
							</p>
							<CustomUploadFiles
								initialFiles={initialFiles}
								maxFiles={2}
								onFilesAdded={
									isConfirmed ? undefined : handleFilesAdded
								}
								onFileRemove={
									isConfirmed ? undefined : handleFileRemove
								}
								isLoading={isUploading || isRemoving}
								loadingId={loadingId}
								readOnly={isConfirmed}
								showAllRemoveButton={false}
								showTopTitle={false}
							/>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									variant="outline"
									type="reset"
									onClick={() => form.reset()}
								>
									{t("form.buttons.close")}
								</Button>
							</DialogClose>
							{!isConfirmed && (
								<Button type="submit" disabled={isLoading}>
									{isLoading && (
										<Loader className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isLoading
										? t("form.buttons.saving")
										: t("form.buttons.save")}
								</Button>
							)}
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
