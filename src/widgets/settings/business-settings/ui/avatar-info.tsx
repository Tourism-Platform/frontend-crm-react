import { TrashIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { useFileUpload } from "@/shared/hooks";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/shared/ui";

export const AvatarInfo: FC = () => {
	const { t } = useTranslation("business_settings_page");

	const [{ files }, { removeFile, openFileDialog, getInputProps }] =
		useFileUpload({
			accept: "image/*"
		});

	const previewUrl = files[0]?.preview || null;
	const fileName = files[0]?.file.name || null;

	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("avatar.title")}</h2>
			<div className="flex gap-5 items-center">
				<Avatar className="size-32 border-accent border">
					<AvatarImage src={previewUrl || ""} alt="Profile image" />
					<AvatarFallback className="text-3xl">KK</AvatarFallback>
				</Avatar>
				<div className="flex gap-2">
					<div className="relative inline-block">
						<Button onClick={openFileDialog} aria-haspopup="dialog">
							{fileName
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
					{fileName && (
						<Button
							variant={"outline"}
							size={"icon"}
							onClick={() => removeFile(files[0]?.id)}
						>
							<TrashIcon />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
