import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, PlusIcon } from "lucide-react";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_PATH, buildRoute } from "@/shared/config";
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
	ENUM_FORM_SUPPLIER as ENUM_FORM,
	SUPPLIER_CREATE_SCHEMA,
	type TSupplierCreateSchema,
	useCreateSupplierMutation
} from "@/entities/supplier";

import { FORM_CREATE_SUPPLIER_LIST } from "../model";

export const CreateSupplier: FC = () => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation("suppliers_page");
	const navigate = useNavigate();
	const [createSupplier, { isLoading }] = useCreateSupplierMutation();

	const form = useForm<TSupplierCreateSchema>({
		resolver: zodResolver(SUPPLIER_CREATE_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			[ENUM_FORM.BRAND_NAME]: "",
			[ENUM_FORM.LEGAL_NAME]: "",
			[ENUM_FORM.PHONE]: "",
			[ENUM_FORM.WEBSITE]: "",
			[ENUM_FORM.SUPPLIER_TYPES]: []
		}
	});

	async function onSubmit(data: TSupplierCreateSchema) {
		try {
			const supplier = await createSupplier({ data }).unwrap();
			toast.success(t("create.toasts.success"));
			setOpen(false);
			form.reset();
			navigate(
				buildRoute(ENUM_PATH.LIBRARY.SUPPLIER, {
					supplierId: supplier.id
				})
			);
		} catch (error) {
			toast.error(t("create.toasts.error"));
			console.error("Failed to create supplier:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<p>{t("new_supplier.button")}</p>
					<PlusIcon />
				</Button>
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="min-w-[560px]"
			>
				<DialogHeader>
					<DialogTitle>{t("create.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("create.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_CREATE_SUPPLIER_LIST().map(
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
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="outline">
									{t("create.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t("create.buttons.saving")
									: t("create.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
