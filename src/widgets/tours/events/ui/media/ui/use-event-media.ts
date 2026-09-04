import { useCallback } from "react";
import { useParams } from "react-router";

import { useOptionalResourceQuery } from "@/shared/hooks";

import {
	type IEventImage,
	LIBRARY_EVENT_CREATE_ID,
	useDeleteEventImageMutation,
	useDeleteLibraryImageMutation,
	useListEventImagesQuery,
	useListLibraryImagesQuery,
	useUpdateEventImageMutation,
	useUpdateLibraryImageMutation,
	useUploadEventImagesMutation,
	useUploadLibraryImagesMutation
} from "@/entities/tour";

const EMPTY_IMAGES: IEventImage[] = [];

const rejectUnsavedLibrary = (): Promise<never> =>
	Promise.reject(new Error("Library event is not created"));

export const useEventMedia = () => {
	const {
		tourId = "",
		eventId = "",
		eventOptionId,
		libraryId = ""
	} = useParams<{
		tourId: string;
		eventId: string;
		eventOptionId?: string;
		libraryId?: string;
	}>();

	const mediaEventId = eventOptionId || eventId;
	const isLibrary = Boolean(libraryId) && !tourId;
	const skipLibrary =
		!isLibrary || !libraryId || libraryId === LIBRARY_EVENT_CREATE_ID;
	const skipTour = isLibrary || !tourId || !mediaEventId;

	const tourQuery = useOptionalResourceQuery(
		useListEventImagesQuery(
			{ tourId, eventId: mediaEventId },
			{ skip: skipTour }
		)
	);
	const libraryQuery = useOptionalResourceQuery(
		useListLibraryImagesQuery(libraryId, { skip: skipLibrary })
	);

	const [uploadTour, { isLoading: isTourUploading }] =
		useUploadEventImagesMutation();
	const [deleteTour, { isLoading: isTourDeleting }] =
		useDeleteEventImageMutation();
	const [updateTour, { isLoading: isTourUpdating }] =
		useUpdateEventImageMutation();
	const [uploadLibrary, { isLoading: isLibraryUploading }] =
		useUploadLibraryImagesMutation();
	const [deleteLibrary, { isLoading: isLibraryDeleting }] =
		useDeleteLibraryImageMutation();
	const [updateLibrary, { isLoading: isLibraryUpdating }] =
		useUpdateLibraryImageMutation();

	const activeQuery = isLibrary ? libraryQuery : tourQuery;

	const addImages = useCallback(
		(files: File[]) => {
			if (isLibrary) {
				if (skipLibrary) return rejectUnsavedLibrary();
				return uploadLibrary({ libraryId, files }).unwrap();
			}
			return uploadTour({
				tourId,
				eventId: mediaEventId,
				files
			}).unwrap();
		},
		[
			isLibrary,
			libraryId,
			mediaEventId,
			skipLibrary,
			tourId,
			uploadLibrary,
			uploadTour
		]
	);

	const removeImage = useCallback(
		(imageId: string) => {
			if (isLibrary) {
				if (skipLibrary) return rejectUnsavedLibrary();
				return deleteLibrary({ libraryId, imageId }).unwrap();
			}
			return deleteTour({
				tourId,
				eventId: mediaEventId,
				imageId
			}).unwrap();
		},
		[
			deleteLibrary,
			deleteTour,
			isLibrary,
			libraryId,
			mediaEventId,
			skipLibrary,
			tourId
		]
	);

	const setPrimaryImage = useCallback(
		(imageId: string) => {
			if (isLibrary) {
				if (skipLibrary) return rejectUnsavedLibrary();
				return updateLibrary({ libraryId, imageId }).unwrap();
			}
			return updateTour({
				tourId,
				eventId: mediaEventId,
				imageId
			}).unwrap();
		},
		[
			isLibrary,
			libraryId,
			mediaEventId,
			skipLibrary,
			tourId,
			updateLibrary,
			updateTour
		]
	);

	return {
		serverImages: activeQuery.data ?? EMPTY_IMAGES,
		isListLoading: activeQuery.isLoading,
		isError: activeQuery.isRealError,
		isMutating:
			isTourUploading ||
			isTourDeleting ||
			isTourUpdating ||
			isLibraryUploading ||
			isLibraryDeleting ||
			isLibraryUpdating,
		addImages,
		removeImage,
		setPrimaryImage
	};
};
