import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus } from "lucide-react";
import { type FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Button,
	CustomField,
	CustomUploadImages,
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
	type TUploadImageItem
} from "@/shared/ui";

import {
	ENUM_FORM_TOUR_OPTION,
	TOUR_OPTION_FORM_SCHEMA,
	type TTourOptionFormSchema,
	useCreateTourOptionMutation,
	useUploadOptionCoverMutation
} from "@/entities/tour";

import { FORM_NEW_OPTION_LIST } from "../model";

interface ICreateOptionProps {
	tourId: string;
}

export const CreateOption: FC<ICreateOptionProps> = ({ tourId }) => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("tour_itinerary_page");
	const [createOption, { isLoading: isCreating }] =
		useCreateTourOptionMutation();
	const [uploadCover, { isLoading: isUploading }] =
		useUploadOptionCoverMutation();

	const coverFileRef = useRef<File | null>(null);
	const [coverItems, setCoverItems] = useState<TUploadImageItem[]>([]);

	const form = useForm<TTourOptionFormSchema>({
		resolver: zodResolver(TOUR_OPTION_FORM_SCHEMA),
		defaultValues: {
			[ENUM_FORM_TOUR_OPTION.NAME]: "",
			[ENUM_FORM_TOUR_OPTION.DESCRIPTION]: ""
		},
		mode: "onSubmit"
	});

	const isLoading = isCreating || isUploading;

	async function onSubmit(data: TTourOptionFormSchema) {
		if (!tourId) return;

		try {
			const saved = await createOption({
				tourId,
				data: {
					name: data.name,
					description: data.description ?? ""
				}
			}).unwrap();

			if (coverFileRef.current) {
				await uploadCover({
					tourId,
					optionId: saved.id,
					file: coverFileRef.current
				}).unwrap();
			}

			toast.success(t("option.form.modal.toasts.save.success"));
			setOpen(false);
			form.reset();
			coverFileRef.current = null;
			setCoverItems([]);
		} catch (error) {
			toast.error(t("option.form.modal.toasts.save.error"));
			console.error("Failed to create option:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					type="button"
					size="icon"
					variant="ghost"
					aria-label={t("option.form.button")}
				>
					<Plus className="w-5 h-5 text-muted-foreground" />
				</Button>
			</DialogTrigger>
			<DialogContent
				onCloseBtn={() => setOpen(false)}
				className="min-w-[700px]"
			>
				<DialogHeader>
					<DialogTitle>{t("option.form.modal.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("option.form.modal.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1">
							{FORM_NEW_OPTION_LIST.map(({ key, ...item }) => (
								<CustomField
									key={key}
									control={form.control}
									name={key}
									t={t}
									{...item}
								/>
							))}

							<div className="col-span-2 flex flex-col gap-2">
								<p className="text-sm font-medium">
									{t("option.form.modal.fields.cover.label")}
								</p>
								<CustomUploadImages
									items={coverItems}
									maxFiles={1}
									onAdd={(files) => {
										const file = files[0];
										if (!file) return;
										coverFileRef.current = file;
										setCoverItems([
											{
												kind: "pending",
												tempId: `pending-${Date.now()}`,
												file,
												preview:
													URL.createObjectURL(file)
											}
										]);
									}}
									onRemove={(id) => {
										setCoverItems((prev) => {
											const item = prev.find(
												(i) =>
													i.kind === "pending" &&
													i.tempId === id
											);
											if (item?.kind === "pending") {
												URL.revokeObjectURL(
													item.preview
												);
											}
											coverFileRef.current = null;
											return [];
										});
									}}
									onReorder={setCoverItems}
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild onClick={() => setOpen(false)}>
								<Button
									type="reset"
									variant="outline"
									onClick={() => {
										form.reset();
										coverFileRef.current = null;
										setCoverItems([]);
									}}
								>
									{t("option.form.modal.buttons.decline")}
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isLoading}>
								{isLoading && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isLoading
									? t("option.form.modal.buttons.saving")
									: t("option.form.modal.buttons.save")}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
