import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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

import {
	type IPayment,
	usePaymentAttachments,
	useUpdatePaymentMutation
} from "@/entities/finance";

import {
	FORM_UPDATE_PAYMENT_LIST,
	type TUpdatePaymentSchema,
	UPDATE_PAYMENT_SCHEMA
} from "../model";

interface IUpdatePaymentProps {
	trigger?: ReactNode;
	className?: string;
	payment: IPayment;
}

export const UpdatePayment: FC<IUpdatePaymentProps> = ({
	trigger,
	className,
	payment
}) => {
	const { t } = useTranslation("client_payments_page");
	const [open, setOpen] = useState<boolean>(false);
	const [updatePayment, { isLoading }] = useUpdatePaymentMutation();

	const {
		initialFiles,
		isLoading: isAttachmentsLoading,
		loadingId,
		addFiles,
		removeFile
	} = usePaymentAttachments({
		paymentId: payment.id,
		enabled: open
	});

	const form = useForm<TUpdatePaymentSchema>({
		resolver: zodResolver(UPDATE_PAYMENT_SCHEMA),
		defaultValues: {
			orderId: payment.orderId,
			amount: payment.amount,
			note: payment.note || ""
		},
		mode: "onSubmit"
	});

	async function onSubmit(data: TUpdatePaymentSchema) {
		try {
			await updatePayment({
				id: payment.id,
				data: {
					amount: data.amount,
					note: data.note
				}
			}).unwrap();
			toast.success(t("menu.update.form.toasts.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("menu.update.form.toasts.error"));
			console.error("Failed to update payment:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="sm:max-w-[52rem]"
			>
				<DialogHeader>
					<DialogTitle>{t("menu.update.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("menu.update.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						className="space-y-6"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_UPDATE_PAYMENT_LIST.map(
								({ key, disabled, ...item }) => (
									<CustomField
										key={key}
										control={form.control}
										name={key}
										t={t}
										{...item}
										disabled={disabled}
									/>
								)
							)}
						</div>
						<div className="flex flex-col gap-2">
							<p className="ml-1 text-sm font-medium">
								{t("menu.update.form.fields.files.label")}:
							</p>
							<CustomUploadFiles
								initialFiles={initialFiles}
								maxFiles={1}
								onFilesAdded={addFiles}
								onFileRemove={removeFile}
								isLoading={isAttachmentsLoading}
								loadingId={loadingId}
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
									{t("menu.update.form.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t("menu.update.form.buttons.saving")
									: t("menu.update.form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
