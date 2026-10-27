import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Button,
	CustomField,
	CustomScroll,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	LoaderButton,
	Separator
} from "@/shared/ui";

import {
	ENUM_PAYMENT_ROUTE_METHODS,
	OPERATOR_PAYMENT_SETTINGS_SCHEMA,
	type TOperatorPayoutDetailsSchema,
	useCreatePaymentRouteMutation
} from "@/entities/finance";

import {
	FORM_NEW_PAYMENT_ROUTE_COMMON_LIST,
	FORM_NEW_PAYMENT_ROUTE_SWIFT_LIST,
	FORM_NEW_PAYMENT_ROUTE_WISE_LIST
} from "../model";

export const NewPaymentRoute: FC = () => {
	const swiftFields = FORM_NEW_PAYMENT_ROUTE_SWIFT_LIST();
	const wiseFields = FORM_NEW_PAYMENT_ROUTE_WISE_LIST();
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("financial_settings_page_operator");
	const [createPaymentRoute, { isLoading }] = useCreatePaymentRouteMutation();

	const form = useForm<TOperatorPayoutDetailsSchema>({
		resolver: zodResolver(OPERATOR_PAYMENT_SETTINGS_SCHEMA),
		defaultValues: {
			method_type: ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT
		},
		mode: "onSubmit"
	});

	const methodType = form.watch("method_type");

	async function onSubmit(data: TOperatorPayoutDetailsSchema) {
		try {
			await createPaymentRoute(data).unwrap();
			toast.success(t("payment_settings.form.modal.toasts.save.success"));
			setOpen(false);
			form.reset();
		} catch (error) {
			toast.error(t("payment_settings.form.modal.toasts.save.error"));
			console.error("Failed to create payment route:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>{t("payment_settings.form.button")}</Button>
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="flex max-h-[90vh] flex-col gap-0 p-0 sm:max-w-[52rem]"
			>
				<DialogHeader className="border-b px-6 py-4">
					<DialogTitle>
						{t("payment_settings.form.modal.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("payment_settings.form.modal.title")}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex min-h-0 flex-1 flex-col"
					>
						<CustomScroll className="space-y-6 px-6 py-4">
							<div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
								{FORM_NEW_PAYMENT_ROUTE_COMMON_LIST().map(
									({ key, ...item }) => (
										<CustomField
											key={key}
											control={form.control}
											name={key}
											t={t}
											{...item}
										/>
									)
								)}

								<Separator className="sm:col-span-2 mb-4" />

								{methodType ===
									ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT &&
									swiftFields.map(({ key, ...item }) => (
										<CustomField
											key={key}
											control={form.control}
											name={key}
											t={t}
											{...item}
										/>
									))}

								{methodType ===
									ENUM_PAYMENT_ROUTE_METHODS.WISE &&
									wiseFields.map(({ key, ...item }) => (
										<CustomField
											key={key}
											control={form.control}
											name={key}
											t={t}
											{...item}
										/>
									))}

								<CustomField
									control={form.control}
									name="note"
									label="payment_settings.form.modal.fields.note.label"
									placeholder="payment_settings.form.modal.fields.note.placeholder"
									fieldType="textarea"
									className="sm:col-span-2"
									t={t}
								/>
							</div>
						</CustomScroll>
						<DialogFooter className="border-t px-6 py-4">
							<DialogClose asChild onClick={() => setOpen(false)}>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t(
										"payment_settings.form.modal.buttons.decline"
									)}
								</Button>
							</DialogClose>
							<LoaderButton
								isLoading={isLoading}
								label={t(
									"payment_settings.form.modal.buttons.save"
								)}
								loadingLabel={t(
									"payment_settings.form.modal.buttons.saving"
								)}
							/>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
