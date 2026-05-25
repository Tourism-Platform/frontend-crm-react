"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { toast } from "sonner";

import {
	Button,
	Card,
	CardContent,
	Form,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import {
	LANDING_SCHEMA,
	type TLandingSchema,
	useCreateLandingMutation,
	useDeleteLandingImageMutation,
	useGetLandingQuery,
	useSetPrimaryImageMutation,
	useUpdateLandingMutation,
	useUploadLandingImagesMutation
} from "@/entities/tour";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

import { AdditionalInfo } from "./additional-info";
import { AmenitiesInfo } from "./amenities-info";
import { CancellationPolicyInfo } from "./cancellation-policy-info";
import { LanguagesInfo } from "./languages-info";
import { OverviewInfo } from "./overview-info";
import { type IPhotosChanges, PhotosInfo } from "./photos-info";
import { PickupDetailsInfo } from "./pickup-details-info";

const LandingBase: FC = () => {
	const { t } = useTranslation("landing_page" as const);
	const { tourId = "" } = useParams<{ tourId: string }>();

	const {
		data: landingData,
		isLoading: isLandingLoading,
		isError: isLandingError
	} = useGetLandingQuery(tourId, { skip: !tourId });

	const [updateLanding, { isLoading: isUpdating }] =
		useUpdateLandingMutation();
	const [createLanding, { isLoading: isCreating }] =
		useCreateLandingMutation();
	const [uploadImages, { isLoading: isUploading }] =
		useUploadLandingImagesMutation();
	const [deleteImage, { isLoading: isDeleting }] =
		useDeleteLandingImageMutation();
	const [setPrimaryImage, { isLoading: isSettingPrimary }] =
		useSetPrimaryImageMutation();

	const isLoading =
		isUpdating ||
		isCreating ||
		isLandingLoading ||
		isUploading ||
		isDeleting ||
		isSettingPrimary;

	// Accumulate photos changes from PhotosInfo without re-renders
	const photosChangesRef = useRef<IPhotosChanges | null>(null);

	const form = useForm<TLandingSchema>({
		resolver: zodResolver(LANDING_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLandingError) toast.error(t("form.toasts.load.error"));
	}, [isLandingError, t]);

	useEffect(() => {
		if (landingData) form.reset(landingData);
	}, [landingData, form]);

	// ── Submit ────────────────────────────────────────────────────────────────

	async function onSubmit(data: TLandingSchema) {
		if (!tourId) return;

		try {
			// 1. Create or update landing first
			if (landingData) {
				await updateLanding({ tourId, data }).unwrap();
			} else {
				await createLanding({ tourId, data }).unwrap();
			}

			// 2. Handle photos if there are any changes
			const photos = photosChangesRef.current;
			if (photos) {
				await handlePhotosSubmit(photos);
			}

			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	}

	const handlePhotosSubmit = async (photos: IPhotosChanges) => {
		const { toDelete, toUpload, orderedItems, primaryId } = photos;

		const hasDeletes = toDelete.length > 0;
		const hasPending = toUpload.length > 0;

		// Check if order of uploaded images changed vs server
		// const serverIds = landingData
		// 	? [] // server images are managed separately via listLandingImages
		// 	: [];

		// ── Case 1: only deletions ─────────────────────────────────────────

		if (hasDeletes && !hasPending) {
			await Promise.all(
				toDelete.map((imageId) =>
					deleteImage({ tourId, imageId }).unwrap()
				)
			);

			// If primary was deleted → first remaining uploaded becomes primary
			if (!primaryId) return;
			const wasPrimaryDeleted = toDelete.some((id) => id === primaryId);
			if (!wasPrimaryDeleted && primaryId) {
				await setPrimaryImage({ tourId, imageId: primaryId }).unwrap();
			}
			return;
		}

		// ── Case 2: new files added (with or without deletions/reorder) ───
		// Strategy: delete all → re-upload everything in final order

		if (hasPending) {
			// Delete all existing server images
			const allServerImages = orderedItems
				.filter(
					(i): i is Extract<typeof i, { kind: "uploaded" }> =>
						i.kind === "uploaded"
				)
				.map((i) => i.id);

			const idsToDeleteAll = [
				...new Set([...toDelete, ...allServerImages])
			];

			await Promise.all(
				idsToDeleteAll.map((imageId) =>
					deleteImage({ tourId, imageId }).unwrap()
				)
			);

			// Build files in final order: uploaded → fetch as blob, pending → File
			const filesToUpload = await Promise.all(
				orderedItems.map(async (item) => {
					if (item.kind === "pending") return item.file;
					const res = await fetch(item.src);
					const blob = await res.blob();
					const name = item.src.split("/").pop() ?? "image";
					return new File([blob], name, { type: blob.type });
				})
			);

			const newImages = await uploadImages({
				tourId,
				files: filesToUpload
			}).unwrap();

			// Primary = first in the new list
			const firstId = newImages[0]?.id;
			if (firstId) {
				await setPrimaryImage({ tourId, imageId: firstId }).unwrap();
			}
			return;
		}

		// ── Case 3: only reorder / primary change (no add, no delete) ────

		if (primaryId) {
			await setPrimaryImage({ tourId, imageId: primaryId }).unwrap();
		}
	};

	// ─────────────────────────────────────────────────────────────────────────

	const actionsJsx = useMemo(
		() => (
			<>
				<PreviewTourButton />
				<PublishTourButton />
			</>
		),
		[]
	);
	console.log(form.watch());
	return (
		<section className="flex flex-col gap-6 container">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Card>
						<CardContent className="grid gap-6">
							<PhotosInfo
								tourId={tourId}
								onChanges={(changes) => {
									photosChangesRef.current = changes;
								}}
							/>
							<Separator />
							<OverviewInfo form={form} />
							<Separator />
							<LanguagesInfo form={form} />
							<Separator />
							<AmenitiesInfo form={form} />
							<Separator />
							<PickupDetailsInfo form={form} />
							<Separator />
							<CancellationPolicyInfo form={form} />
							<Separator />
							<AdditionalInfo form={form} />
							<div className="flex justify-end mt-6">
								<Button
									size="lg"
									type="submit"
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<Loader className="mr-2 h-4 w-4 animate-spin" />
											{isLandingLoading
												? t("form.buttons.loading")
												: t("form.buttons.saving")}
										</>
									) : (
										t("form.buttons.save")
									)}
								</Button>
							</div>
						</CardContent>
					</Card>
				</form>
			</Form>
		</section>
	);
};

export const Landing = withErrorBoundary(LandingBase);
