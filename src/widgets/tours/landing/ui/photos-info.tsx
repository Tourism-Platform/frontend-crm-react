import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormControl, FormField, FormItem, FormMessage } from "@/shared/ui";
import { CustomUploadMainImage } from "@/shared/ui";

import { ENUM_FORM_LANDING, type TLandingSchema } from "@/entities/tour";

interface IPhotosInfoProps {
	form: UseFormReturn<TLandingSchema>;
}

export const PhotosInfo: FC<IPhotosInfoProps> = ({ form }) => {
	const { t } = useTranslation("landing_page");
	const { control } = form;

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg ">{t("blocks.photos.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("blocks.photos.description")}
			</p>

			<FormField
				control={control}
				name={ENUM_FORM_LANDING.PHOTOS}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<CustomUploadMainImage
								initialValue={field.value}
								onFilesChange={(files) => {
									const urls = files.map(
										(f) => f.preview || ""
									);
									field.onChange(urls?.[0] || "");
								}}
							/>
						</FormControl>
						<FormMessage t={t} />
					</FormItem>
				)}
			/>
		</div>
	);
};
