import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, type ReactNode, useRef, useState } from "react";
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
	type IOption,
	TOUR_OPTION_FORM_SCHEMA,
	type TTourOptionFormSchema,
	useDeleteOptionCoverMutation,
	useUpdateTourOptionMutation,
	useUploadOptionCoverMutation
} from "@/entities/tour";

import { FORM_EDIT_OPTION_LIST } from "../model/config";

interface IEditOptionProps {
	tourId: string;
	option: IOption;
	trigger: ReactNode;
	className?: string;
}

const buildCoverItems = (imageUrl: string): TUploadImageItem[] =>
	imageUrl ? [{ kind: "uploaded", id: "cover", src: imageUrl }] : [];

const buildDefaultValues = (option: IOption): TTourOptionFormSchema => ({
	[ENUM_FORM_TOUR_OPTION.NAME]: option.name,
	[ENUM_FORM_TOUR_OPTION.DESCRIPTION]: option.description
});

export const EditOption: FC<IEditOptionProps> = ({
	tourId,
	option,
	trigger,
	className
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const { t } = useTranslation("tour_itinerary_page");
	const [updateOption, { isLoading: isUpdating }] =
		useUpdateTourOptionMutation();
	const [uploadCover, { isLoading: isUploading }] =
		useUploadOptionCoverMutation();
	const [deleteCover, { isLoading: isDeletingCover }] =
		useDeleteOptionCoverMutation();

	const coverFileRef = useRef<File | null>(null);
	const [coverItems, setCoverItems] = useState<TUploadImageItem[]>(() =>
		buildCoverItems(option.imageUrl)
	);
	const [coverRemoved, setCoverRemoved] = useState(false);

	const form = useForm<TTourOptionFormSchema>({
		resolver: zodResolver(TOUR_OPTION_FORM_SCHEMA),
		defaultValues: buildDefaultValues(option),
		mode: "onSubmit"
	});

	const isLoading = isUpdating || isUploading || isDeletingCover;

	const hadServerCover = Boolean(option.imageUrl);

	async function onSubmit(data: TTourOptionFormSchema) {
		if (!tourId) return;

		try {
			await updateOption({
				tourId,
				optionId: option.id,
				data: {
					name: data.name,
					description: data.description ?? ""
				}
			}).unwrap();

			if (coverFileRef.current) {
				await uploadCover({
					tourId,
					optionId: option.id,
					file: coverFileRef.current
				}).unwrap();
			} else if (hadServerCover && coverRemoved) {
				await deleteCover({ tourId, optionId: option.id }).unwrap();
			}

			toast.success(t("option.form.modal.toasts.save.success"));
			setOpen(false);
		} catch (error) {
			toast.error(t("option.form.modal.toasts.save.error"));
			console.error("Failed to update option:", error);
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
							{FORM_EDIT_OPTION_LIST.map(({ key, ...item }) => (
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
										setCoverItems((prev) => {
											prev.forEach((i) => {
												if (i.kind === "pending") {
													URL.revokeObjectURL(
														i.preview
													);
												}
											});
											coverFileRef.current = file;
											setCoverRemoved(false);
											return [
												{
													kind: "pending",
													tempId: `pending-${Date.now()}`,
													file,
													preview:
														URL.createObjectURL(
															file
														)
												}
											];
										});
									}}
									onRemove={() => {
										setCoverItems((prev) => {
											prev.forEach((i) => {
												if (i.kind === "pending") {
													URL.revokeObjectURL(
														i.preview
													);
												}
											});
											coverFileRef.current = null;
											setCoverRemoved(true);
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
										setCoverRemoved(false);
										setCoverItems(
											buildCoverItems(option.imageUrl)
										);
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
