import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormControl, FormField, FormItem, FormMessage } from "@/shared/ui";
import { CustomUploadMainImage } from "@/shared/ui/custom";

import { ENUM_FORM_LANDING } from "../../model";

export const PhotosBlock: FC = () => {
	const { t } = useTranslation("landing_page");
	const { control } = useFormContext();

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
								initialValue={field.value?.[0]}
								onFilesChange={(files) => {
									const urls = files.map(
										(f) => f.preview || ""
									);
									field.onChange(urls);
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
