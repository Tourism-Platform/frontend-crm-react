import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
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
	LoaderButton
} from "@/shared/ui";

import {
	BookingOrderOptionCard,
	BookingOrderOptionCardSkeleton,
	type TBookingOrderSelectOption,
	useBookingOrderSearchOptions
} from "@/entities/booking";
import {
	ENUM_FORM_NEW_PAYMENT,
	type TNewPaymentSchema,
	useCreatePaymentMutation
} from "@/entities/finance";

import { FORM_NEW_PAYMENT_LIST, NEW_PAYMENT_SCHEMA } from "../model";

export const NewPayment: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("client_payments_page");
	const [createPayment, { isLoading }] = useCreatePaymentMutation();
	const orders = useBookingOrderSearchOptions({ enabled: open });

	const form = useForm<TNewPaymentSchema>({
		resolver: zodResolver(NEW_PAYMENT_SCHEMA),
		mode: "onSubmit"
	});

	async function onSubmit(data: TNewPaymentSchema) {
		try {
			await createPayment(data).unwrap();
			toast.success(t("new_payment.form.toasts.success"));
			setOpen(false);
			form.reset();
		} catch (error) {
			toast.error(t("new_payment.form.toasts.error"));
			console.error("Failed to create payment:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className="mr-1 h-4 w-4" />
					{t("new_payment.button")}
				</Button>
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="flex max-h-[90vh] flex-col gap-0 p-0 sm:max-w-[52rem]"
			>
				<DialogHeader className="border-b px-6 py-4">
					<DialogTitle>{t("new_payment.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("new_payment.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex min-h-0 flex-1 flex-col"
					>
						<CustomScroll className="space-y-6 px-6 py-4">
							<div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
								<CustomField
									fieldType="asyncSelect"
									control={form.control}
									name={ENUM_FORM_NEW_PAYMENT.ORDER_ID}
									t={t}
									label="new_payment.form.fields.orderId.label"
									placeholder="new_payment.form.fields.orderId.placeholder"
									emptyText="new_payment.form.fields.orderId.empty"
									className="sm:col-span-2"
									options={orders.options}
									onQueryChange={orders.setQuery}
									onLoadMore={orders.loadMore}
									hasMore={orders.hasMore}
									isLoading={orders.isLoading}
									isLoadingMore={orders.isLoadingMore}
									renderOption={(option) => (
										<BookingOrderOptionCard
											option={
												option as TBookingOrderSelectOption
											}
										/>
									)}
									renderSkeleton={() => (
										<BookingOrderOptionCardSkeleton />
									)}
								/>
								{FORM_NEW_PAYMENT_LIST().map(
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
							</div>
						</CustomScroll>
						<DialogFooter className="border-t px-6 py-4">
							<DialogClose asChild>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t("new_payment.form.buttons.decline")}
								</Button>
							</DialogClose>
							<LoaderButton
								isLoading={isLoading}
								label={t("new_payment.form.buttons.save")}
								loadingLabel={t(
									"new_payment.form.buttons.saving"
								)}
							/>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
