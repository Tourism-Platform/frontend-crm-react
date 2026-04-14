import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { CustomUploadMainImage, withErrorBoundary } from "@/shared/ui";

import {
	useDeleteLandingImageMutation,
	useListLandingImagesQuery,
	useUploadLandingImagesMutation
} from "@/entities/tour";

interface IPhotosInfoProps {
	tourId: string;
}

const PhotosInfoBase: FC<IPhotosInfoProps> = ({ tourId }) => {
	const { t } = useTranslation("landing_page");

	const { data: images = [] } = useListLandingImagesQuery(tourId, {
		skip: !tourId
	});

	const [uploadImages] = useUploadLandingImagesMutation();
	const [deleteImage] = useDeleteLandingImageMutation();

	// Локальное состояние для мгновенной реакции UI (избегаем race condition хука useFileUpload)
	const [localImage, setLocalImage] = useState<string>("");

	useEffect(() => {
		setLocalImage(images.length > 0 ? images[0].imagePath : "");
	}, [images]);

	const handleFilesChange = async (files: (File | { url: string })[]) => {
		if (!tourId) return;

		if (files.length === 0) {
			setLocalImage(""); // Мгновенная реакция UI
			if (images.length > 0) {
				await deleteImage({ tourId, imageId: images[0].id }).unwrap();
			}
			return;
		}

		// Выбираем только новые загруженные файлы
		const newFiles = files.filter((f): f is File => f instanceof File);

		if (newFiles.length > 0) {
			// Если уже есть картинка, удаляем её перед загрузкой новой
			if (images.length > 0) {
				await deleteImage({ tourId, imageId: images[0].id }).unwrap();
			}
			await uploadImages({ tourId, files: newFiles });
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg">{t("form.photos.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("form.photos.description")}
			</p>

			<CustomUploadMainImage
				initialValue={localImage}
				onFilesChange={(files) => {
					const mappedFiles = files.map((f) => f.file);
					handleFilesChange(mappedFiles);
				}}
			/>
		</div>
	);
};

export const PhotosInfo = withErrorBoundary(PhotosInfoBase);
