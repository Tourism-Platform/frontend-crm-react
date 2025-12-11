import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, type ReactNode } from "react";
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
	Separator
} from "@/shared/ui";

import {
	EDIT_COMMISSION_TYPE_SCHEMA,
	FORM_EDIT_COMMISSION_TYPE_LIST,
	type TEditCommissionTypeSchema
} from "../model";

interface IEditCommissionTypeProps {
	trigger: ReactNode;
	className?: string;
}

export const EditCommissionType: FC<IEditCommissionTypeProps> = ({
	trigger,
	className
}) => {
	const { t } = useTranslation("financial_settings_page");
	const form = useForm<TEditCommissionTypeSchema>({
		resolver: zodResolver(EDIT_COMMISSION_TYPE_SCHEMA),
		// defaultValues: {
		// name: CURRENCY_OPTIONS?.[0]?.value || "",
		// rate: 0
		// },
		mode: "onSubmit"
	});
	function onSubmit(data: TEditCommissionTypeSchema) {
		console.log("Form submitted:", data);
	}
	return (
		<Dialog>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent>
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
							<DialogClose asChild>
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
							<Button type="submit">
								{t(
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
