import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
	Separator,
	Skeleton
} from "@/shared/ui";

import { useGetSupplierPaymentByIdQuery } from "@/entities/finance";

import {
	ENUM_FORM_OPEN_RECONCILIATION,
	FORM_OPEN_RECONCILIATION_LIST
} from "../model";

interface IOpenReconciliationProps {
	paymentId: string | null;
}

export const OpenReconciliation: FC<IOpenReconciliationProps> = ({
	paymentId
}) => {
	const { t } = useTranslation("reconciliation_id_page");
	const [open, setOpen] = useState<boolean>(false);
	const canOpen = Boolean(paymentId);

	const {
		data: payment,
		isLoading,
		isFetching
	} = useGetSupplierPaymentByIdQuery(paymentId ?? "", {
		skip: !open || !paymentId
	});

	const form = useForm({
		defaultValues: {
			[ENUM_FORM_OPEN_RECONCILIATION.ORDER_ID]: "",
			[ENUM_FORM_OPEN_RECONCILIATION.AMOUNT]: 0,
			[ENUM_FORM_OPEN_RECONCILIATION.NOTE]: "",
			[ENUM_FORM_OPEN_RECONCILIATION.FILES]: [] as NonNullable<
				typeof payment
			>["files"]
		}
	});

	useEffect(() => {
		if (!payment) {
			return;
		}

		form.reset({
			[ENUM_FORM_OPEN_RECONCILIATION.ORDER_ID]: payment.orderId,
			[ENUM_FORM_OPEN_RECONCILIATION.AMOUNT]: payment.amount,
			[ENUM_FORM_OPEN_RECONCILIATION.NOTE]: payment.note || "",
			[ENUM_FORM_OPEN_RECONCILIATION.FILES]: payment.files || []
		});
	}, [payment, form]);

	const isFormLoading = open && (isLoading || isFetching);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="w-full"
					disabled={!canOpen}
				>
					{t("table.menu.open")}
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
				{isFormLoading ? (
					<div className="space-y-4 py-4">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-24 w-full" />
					</div>
				) : (
					<Form {...form}>
						<form className="space-y-6">
							<div className="grid grid-cols-2 gap-x-4 gap-y-1">
								{FORM_OPEN_RECONCILIATION_LIST.map(
									({ key, ...item }) => (
										<CustomField
											key={key}
											control={form?.control}
											name={key}
											t={t}
											disabled
											{...item}
										/>
									)
								)}
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button
										variant="outline"
										onClick={() => setOpen(false)}
									>
										{t("form.buttons.close")}
									</Button>
								</DialogClose>
							</DialogFooter>
						</form>
					</Form>
				)}
			</DialogContent>
		</Dialog>
	);
};
