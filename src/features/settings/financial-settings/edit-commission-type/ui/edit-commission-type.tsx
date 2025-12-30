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

import { useUpdateCommissionMutation } from "@/entities/commission";

import {
	EDIT_COMMISSION_TYPE_SCHEMA,
	FORM_EDIT_COMMISSION_TYPE_LIST,
	type TEditCommissionTypeSchema
} from "../model";

interface IEditCommissionTypeProps {
	id: string;
	trigger: ReactNode;
	className?: string;
	data: TEditCommissionTypeSchema;
}

export const EditCommissionType: FC<IEditCommissionTypeProps> = ({
	id,
	trigger,
	className,
	data
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("financial_settings_page");
	const [updateCommission, { isLoading }] = useUpdateCommissionMutation();
	const form = useForm<TEditCommissionTypeSchema>({
		resolver: zodResolver(EDIT_COMMISSION_TYPE_SCHEMA),
		defaultValues: data,
		mode: "onSubmit"
	});

	async function onSubmit(data: TEditCommissionTypeSchema) {
		try {
			await updateCommission({ id, data }).unwrap();
			toast.success(t("commission_type.menu.edit.form.toasts.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("commission_type.menu.edit.form.toasts.error"));
			console.error("Failed to update commission:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent onCloseBtn={() => setOpen(false)}>
				<DialogHeader>
					<DialogTitle>
						{t("commission_type.menu.edit.form.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("commission_type.menu.edit.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div>
							{FORM_EDIT_COMMISSION_TYPE_LIST.map(
								({ key, ...item }) => (
									<CustomField
										key={key}
										control={form?.control}
										name={key}
										t={t}
										{...item}
									/>
								)
							)}
						</div>
						<DialogFooter>
							<DialogClose asChild onClick={() => setOpen(false)}>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t(
										"commission_type.menu.edit.form.buttons.decline"
									)}
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t(
											"commission_type.menu.edit.form.buttons.saving"
										)
									: t(
											"commission_type.menu.edit.form.buttons.save"
										)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
