import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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

import {
	CREATE_TOUR_SCHEMA,
	ENUM_FORM_CREATE_TOUR,
	FORM_CREATE_TOUR_LIST,
	type TCreateTourSchema
} from "../model";

interface ICreateTourProps {
	onAdd?: (tour: TCreateTourSchema) => void;
}

export const CreateTour: FC<ICreateTourProps> = ({ onAdd }) => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("tours_page");
	const form = useForm<TCreateTourSchema>({
		resolver: zodResolver(CREATE_TOUR_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			tourTitle: "",
			tourType: undefined,
			groupSize: undefined,
			duration: { from: undefined, to: undefined },
			ageRequires: { from: undefined, to: undefined }
		}
	});

	function onSubmit(data: TCreateTourSchema) {
		console.log("Form submitted:", data);
		setOpen(false);
		form.reset();
		if (onAdd) {
			onAdd(data);
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
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_CREATE_TOUR_LIST.map(
								({ key, ...item }, index) => (
									<CustomField
										className={
											index === 0 ? "col-span-2" : ""
										}
										key={key}
										control={form?.control}
										name={key}
										t={t}
										{...item}
									/>
								)
							)}
							<CustomRangeField
								control={form?.control}
								name={ENUM_FORM_CREATE_TOUR.DURATION}
								label="create.form.fields.duration.label"
								placeholder_left="create.form.fields.duration.placeholder_left"
								placeholder_right="create.form.fields.duration.placeholder_right"
								t={t}
							/>
							<CustomRangeField
								control={form?.control}
								name={ENUM_FORM_CREATE_TOUR.AGE_REQUIRES}
								label="create.form.fields.ageRequires.label"
								placeholder_left="create.form.fields.ageRequires.placeholder_left"
								placeholder_right="create.form.fields.ageRequires.placeholder_right"
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
									{t("create.form.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit">
								{t("create.form.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
