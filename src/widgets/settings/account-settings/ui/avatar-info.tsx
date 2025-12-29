import { TrashIcon } from "lucide-react";
import { type FC } from "react";
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useFileUpload } from "@/shared/hooks/useFileUpload";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/shared/ui";

import type { TAccountSchema } from "@/entities/user";

interface IAvatarInfoProps {
	form: UseFormReturn<TAccountSchema>;
}

export const AvatarInfo: FC<IAvatarInfoProps> = ({ form }) => {
	const { t } = useTranslation("account_settings_page");
	const account = form.watch();

	const [{ files }, { removeFile, openFileDialog, getInputProps }] =
		useFileUpload({
			accept: "image/*",
			multiple: false,
			onFilesAdded: (addedFiles) => {
				const file = addedFiles[0];
				if (file?.preview) {
					form.setValue("avatar", file.preview, {
						shouldDirty: true
					});
				}
			}
		});

	// Синхронизация при удалении
	useEffect(() => {
		if (files.length === 0) {
			form.setValue("avatar", "", { shouldDirty: true });
		}
	}, [files, form]);

	const handleRemove = () => {
		if (files[0]?.id) removeFile(files[0].id);
		form.setValue("avatar", "", { shouldDirty: true });
	};

	const fallbackName = () => {
		if (account?.first_name && account?.last_name) {
			return `${account?.first_name?.[0] || ""}${account?.last_name?.[0] || ""}`.toUpperCase();
		}
		return "A";
	};

	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("avatar.title")}</h2>
			<FormField
				control={form.control}
				name="avatar"
				render={({ field }) => (
					<FormItem>
						<div className="flex gap-5 items-center">
							<FormControl>
								<Avatar className="size-32 border-accent border">
									<AvatarImage
										src={
											field.value ||
											files[0]?.preview ||
											""
										}
										alt="Profile image"
									/>
									<AvatarFallback className="text-3xl">
										{fallbackName()}
									</AvatarFallback>
								</Avatar>
							</FormControl>
							<div className="flex gap-2">
								<div className="relative inline-block">
									<Button
										type="button"
										onClick={openFileDialog}
										aria-haspopup="dialog"
									>
										{field.value || files[0]?.file.name
											? t("avatar.buttons.change")
											: t("avatar.buttons.add")}
									</Button>
									<input
										{...getInputProps()}
										className="sr-only"
										aria-label="Upload image file"
										tabIndex={-1}
									/>
								</div>
								{(field.value || files[0]?.file.name) && (
									<Button
										type="button"
										variant={"outline"}
										size={"icon"}
										onClick={handleRemove}
									>
										<TrashIcon />
									</Button>
								)}
							</div>
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};
