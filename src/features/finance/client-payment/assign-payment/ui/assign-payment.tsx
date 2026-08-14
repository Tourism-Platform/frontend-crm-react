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
	ENUM_PAYMENT_STATUS,
	type IPayment,
	useConfirmPaymentMutation,
	usePaymentAttachments
} from "@/entities/finance";

import {
	ASSIGN_PAYMENT_SCHEMA,
	ENUM_FORM_ASSIGN_PAYMENT,
	FORM_ASSIGN_PAYMENT_LIST,
	type TAssignPaymentSchema
} from "../model";

interface IAssignPaymentProps {
	trigger?: ReactNode;
	className?: string;
	payment: IPayment;
}

export const AssignPayment: FC<IAssignPaymentProps> = ({
	trigger,
	className,
	payment
}) => {
	const { t } = useTranslation("client_payments_page");
	const [open, setOpen] = useState<boolean>(false);
	const [confirmPayment, { isLoading }] = useConfirmPaymentMutation();

	const isAssigned = payment.status === ENUM_PAYMENT_STATUS.ASSIGNED;

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

	const form = useForm<TAssignPaymentSchema>({
		resolver: zodResolver(ASSIGN_PAYMENT_SCHEMA),
		defaultValues: {
			[ENUM_FORM_ASSIGN_PAYMENT.ORDER_ID]: payment.orderId,
			[ENUM_FORM_ASSIGN_PAYMENT.AMOUNT]: payment.amount,
			[ENUM_FORM_ASSIGN_PAYMENT.NOTE]: payment.note || ""
		},
		mode: "onSubmit"
	});

	async function onSubmit() {
		try {
			await confirmPayment(payment.id).unwrap();
			toast.success(t("menu.assign.form.toasts.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("menu.assign.form.toasts.error"));
			console.error("Failed to confirm payment:", error);
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
					<DialogTitle>{t("menu.assign.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("menu.assign.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						className="space-y-6"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_ASSIGN_PAYMENT_LIST.map(
								({ key, disabled, ...item }) => (
									<CustomField
										key={key}
										control={form.control}
										name={key}
										t={t}
										{...item}
										disabled={isAssigned || disabled}
									/>
								)
							)}
						</div>
						<div className="flex flex-col gap-2">
							<p className="ml-1 text-sm font-medium">
								{t("menu.assign.form.fields.files.label")}:
							</p>
							<CustomUploadFiles
								initialFiles={initialFiles}
								maxFiles={1}
								onFilesAdded={isAssigned ? undefined : addFiles}
								onFileRemove={
									isAssigned ? undefined : removeFile
								}
								isLoading={isAttachmentsLoading}
								loadingId={loadingId}
								readOnly={isAssigned}
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
									{t("menu.assign.form.buttons.decline")}
								</Button>
							</DialogClose>
							{!isAssigned && (
								<Button type="submit" disabled={isLoading}>
									{isLoading && (
										<Loader className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isLoading
										? t("menu.assign.form.buttons.saving")
										: t("menu.assign.form.buttons.save")}
								</Button>
							)}
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
