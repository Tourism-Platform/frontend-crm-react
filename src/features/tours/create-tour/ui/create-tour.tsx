import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, PlusIcon } from "lucide-react";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Button,
	CustomField,
	CustomRangeField,
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

import { useCreateTourMutation } from "@/entities/tour";

import {
	CREATE_TOUR_SCHEMA,
	ENUM_FORM_CREATE_TOUR as ENUM_FORM,
	FORM_CREATE_TOUR_LIST,
	type TCreateTourSchema
} from "../model";

interface ICreateTourProps {
	onAdd?: (tour: TCreateTourSchema) => void;
}

export const CreateTour: FC<ICreateTourProps> = ({ onAdd }) => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("tours_page");
	const [createTour, { isLoading }] = useCreateTourMutation();

	const form = useForm<TCreateTourSchema>({
		resolver: zodResolver(CREATE_TOUR_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			[ENUM_FORM.TITLE]: "",
			[ENUM_FORM.TYPE]: undefined,
			[ENUM_FORM.GROUP_SIZE]: undefined,
			[ENUM_FORM.DURATION]: { from: undefined, to: undefined },
			[ENUM_FORM.AGE_REQUIRES]: { from: undefined, to: undefined },
			[ENUM_FORM.TOUR_CATEGORIES]: []
		}
	});

	async function onSubmit(data: TCreateTourSchema) {
		try {
			await createTour(data).unwrap();
			toast.success(t("create.form.toasts.success"));
			setOpen(false);
			form.reset();
			if (onAdd) {
				onAdd(data);
			}
		} catch (error) {
			toast.error(t("create.form.toasts.error"));
			console.error("Failed to create tour:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<p>{t("create.button")}</p>
					<PlusIcon />
				</Button>
			</DialogTrigger>
			<DialogContent onCloseBtn={() => setOpen(false)}>
				<DialogHeader>
					<DialogTitle>{t("create.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("create.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_CREATE_TOUR_LIST().map(({ key, ...item }) => {
								if (
									key === ENUM_FORM.DURATION ||
									key === ENUM_FORM.AGE_REQUIRES
								) {
									return (
										<CustomRangeField
											key={key}
											control={form?.control}
											name={key}
											label={`create.form.fields.${key}.label`}
											placeholder_left={`create.form.fields.${key}.placeholder_left`}
											placeholder_right={`create.form.fields.${key}.placeholder_right`}
											t={t}
										/>
									);
								}
								return (
									<CustomField
										key={key}
										control={form?.control}
										name={key}
										t={t}
										{...item}
									/>
								);
							})}
						</div>
						<DialogFooter>
							<DialogClose asChild onClick={() => setOpen(false)}>
								<Button
									type="reset"
									variant="outline"
									onClick={() => form.reset()}
								>
									{t("create.form.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t("create.form.buttons.saving")
									: t("create.form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
