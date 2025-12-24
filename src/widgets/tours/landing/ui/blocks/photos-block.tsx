import { type FC } from "react";
import { useTranslation } from "react-i18next";

export const PhotosBlock: FC = () => {
	const { t } = useTranslation("landing_page");
	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg font-medium">{t("blocks.photos.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("blocks.photos.description")}
			</p>
			<div className="flex items-center justify-center border-2 border-dashed border-muted rounded-lg h-40 bg-muted/20">
				<div className="text-center">
					<p className="text-primary font-medium">
						{t("blocks.photos.upload_text")}
					</p>
					<p className="text-xs text-muted-foreground">
						{t("blocks.photos.upload_hint")}
					</p>
				</div>
			</div>
		</div>
	);
};
