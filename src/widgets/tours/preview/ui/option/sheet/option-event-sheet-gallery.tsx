import { type FC } from "react";

import { UploadImagesPreviewer } from "@/shared/ui";

import type { IEventImage } from "@/entities/tour";

interface IOptionEventSheetGalleryProps {
	images: IEventImage[];
}

export const OptionEventSheetGallery: FC<IOptionEventSheetGalleryProps> = ({
	images
}) => {
	if (!images.length) return null;

	return (
		<UploadImagesPreviewer
			images={images.slice(0, 5).map((image) => image.imagePath)}
			gridHeight={220}
			showPrimaryBadge={false}
		/>
	);
};
