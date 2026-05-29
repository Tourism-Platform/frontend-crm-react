import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Button,
	CustomField,
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
	ENUM_FORM_OPERATOR_PAYMENT_SETTINGS,
	ENUM_PAYMENT_ROUTE_METHODS,
	OPERATOR_PAYMENT_SETTINGS_SCHEMA,
	type TOperatorPaymentRoute,
	type TOperatorPayoutDetailsSchema,
	useUpdatePaymentRouteMutation
} from "@/entities/finance";

import {
	FORM_EDIT_PAYMENT_ROUTE_COMMON_LIST,
	FORM_EDIT_PAYMENT_ROUTE_SWIFT_LIST,
	FORM_EDIT_PAYMENT_ROUTE_WISE_LIST
} from "../model/config";

interface IEditPaymentRouteProps {
	trigger: ReactNode;
	className?: string;
	route: TOperatorPaymentRoute;
}

export const EditPaymentRoute: FC<IEditPaymentRouteProps> = ({
	trigger,
	className,
	route
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("financial_settings_page_operator");
	const [updatePaymentRoute, { isLoading }] = useUpdatePaymentRouteMutation();

	const buildDefaultValues = (route: TOperatorPaymentRoute) => {
		const base = {
			[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.METHOD_TYPE]: route.methodType,
			[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.INTERNAL_LABEL]:
				route.internalLabel,
			[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.CURRENCY]: route.currency,
			[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.NOTE]: route.note || ""
		};

		switch (route.details.typ) {
			case ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT:
				return {
					...base,
					[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.ACCOUNT_NAME_IBAN]:
						route.details.accountNameIban,
					[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.SWIFT_BIC]:
						route.details.swiftBic,
					[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.BANK_NAME]:
						route.details.bankName,
					[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.BANK_ADDRESS]:
						route.details.bankAddress
				};

			case ENUM_PAYMENT_ROUTE_METHODS.WISE:
				return {
					...base,
					[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.ACCOUNT_ID_EMAIL]:
						route.details.accountIdEmail,
					[ENUM_FORM_OPERATOR_PAYMENT_SETTINGS.PAYMENT_LINK]:
						route.details.paymentLink
				};

			default:
				return base;
		}
	};

	const form = useForm<TOperatorPayoutDetailsSchema>({
		resolver: zodResolver(OPERATOR_PAYMENT_SETTINGS_SCHEMA),
		defaultValues: buildDefaultValues(route),
		mode: "onSubmit"
	});

	const methodType = form.watch("method_type");

	async function onSubmit(data: TOperatorPayoutDetailsSchema) {
		try {
			await updatePaymentRoute({ id: route.id, data }).unwrap();
			toast.success(
				t("payment_settings.form.modal.toasts.save.success") // Use save key since operator pages usually unify this
			);
			setOpen(false);
		} catch (error) {
			toast.error(t("payment_settings.form.modal.toasts.save.error"));
			console.error("Failed to update payment route:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="min-w-[700px]"
			>
				<DialogHeader>
					<DialogTitle>
						{t("payment_settings.form.modal.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("payment_settings.form.modal.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_EDIT_PAYMENT_ROUTE_COMMON_LIST().map(
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

							<Separator className="col-span-2 mb-4" />

							{methodType ===
								ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT &&
								FORM_EDIT_PAYMENT_ROUTE_SWIFT_LIST.map(
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

							{methodType === ENUM_PAYMENT_ROUTE_METHODS.WISE &&
								FORM_EDIT_PAYMENT_ROUTE_WISE_LIST.map(
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

							<CustomField
								control={form.control}
								name="note"
								label="payment_settings.form.modal.fields.note.label"
								placeholder="payment_settings.form.modal.fields.note.placeholder"
								fieldType="textarea"
								className="col-span-2"
								t={t}
							/>
						</div>
						<DialogFooter>
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
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t(
											"payment_settings.form.modal.buttons.saving"
										)
									: t(
											"payment_settings.form.modal.buttons.save"
										)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
