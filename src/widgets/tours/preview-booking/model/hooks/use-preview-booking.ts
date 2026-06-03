import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { generatePath, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { ENUM_PATH } from "@/shared/config/routes/routes.config";

import {
	useCreateBookingOrderMutation,
	useSubmitBookingOrderMutation,
	useUpdateBookingOrderMutation
} from "@/entities/booking/order/api/booking-order.service";
import {
	useAddPassengerInfoMutation,
	useDeletePassengerInfoMutation,
	useListPassengerInfoQuery,
	useUpdatePassengerInfoMutation,
	useUploadPassengerPassportMutation
} from "@/entities/booking/order/api/booking-pax.service";
import {
	type ITravellerPaxInput,
	getTravellerPassportFile,
	isTravellerComplete,
	mapBookingPaxToTravellerForm,
	mapTravellerToPaxCreate,
	mapTravellerToPaxUpdate
} from "@/entities/booking/order/converters/booking-pax.converters";
import type { TSubmittedBooking } from "@/entities/booking/order/types/create-booking.types";
import { useGetTourGeneralQuery } from "@/entities/tour";
import {
	ENUM_FORM_PREVIEW_BOOKING,
	PREVIEW_BOOKING_SCHEMA,
	type TPreviewBookingSchema
} from "@/entities/tour/preview-booking";
import { useGetPreviewTourOptionsQuery } from "@/entities/tour/preview-tour";

const getStorageKey = (bookingId: string) => `preview-booking-${bookingId}`;

interface IBookingDraft {
	date: string;
	travellers_count: number;
	option_id: string;
	tourId: string;
}

const saveBookingDraft = (bookingId: string, draft: IBookingDraft) => {
	sessionStorage.setItem(getStorageKey(bookingId), JSON.stringify(draft));
};

const loadBookingDraft = (bookingId: string): IBookingDraft | null => {
	const raw = sessionStorage.getItem(getStorageKey(bookingId));
	if (!raw) return null;

	try {
		return JSON.parse(raw) as IBookingDraft;
	} catch {
		return null;
	}
};

export const usePreviewBooking = () => {
	const navigate = useNavigate();
	const { tourId = "", bookingId: bookingIdParam } = useParams<{
		tourId: string;
		bookingId?: string;
	}>();

	const [currentStep, setCurrentStep] = useState(() =>
		bookingIdParam ? 2 : 1
	);
	const [submittedBooking, setSubmittedBooking] =
		useState<TSubmittedBooking | null>(null);
	const hasSyncedPax = useRef(false);

	const { data: tourData, isLoading: isTourLoading } = useGetTourGeneralQuery(
		tourId,
		{ skip: !tourId }
	);

	const {
		data: options = [],
		isLoading: isOptionsLoading,
		isError: isOptionsError
	} = useGetPreviewTourOptionsQuery(tourId, { skip: !tourId });

	const { data: paxList, isLoading: isPaxLoading } =
		useListPassengerInfoQuery(bookingIdParam ?? "", {
			skip: !bookingIdParam || currentStep !== 2
		});

	const [createBookingOrder, { isLoading: isCreating }] =
		useCreateBookingOrderMutation();
	const [updateBookingOrder, { isLoading: isUpdating }] =
		useUpdateBookingOrderMutation();
	const [addPassengerInfo, { isLoading: isAddingPax }] =
		useAddPassengerInfoMutation();
	const [updatePassengerInfo, { isLoading: isUpdatingPax }] =
		useUpdatePassengerInfoMutation();
	const [deletePassengerInfo, { isLoading: isDeletingPax }] =
		useDeletePassengerInfoMutation();
	const [uploadPassengerPassport, { isLoading: isUploadingPassport }] =
		useUploadPassengerPassportMutation();
	const [submitBookingOrder, { isLoading: isSubmitting }] =
		useSubmitBookingOrderMutation();

	const form = useForm<TPreviewBookingSchema>({
		resolver: zodResolver(
			PREVIEW_BOOKING_SCHEMA
		) as Resolver<TPreviewBookingSchema>,
		mode: "onChange"
	});

	const travellersCount = form.watch(
		ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT
	);
	const travellers = form.watch(ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS);
	const canAddTraveller = (travellers?.length ?? 0) < (travellersCount ?? 0);

	const restoreDraft = useCallback(
		(bookingId: string) => {
			const draft = loadBookingDraft(bookingId);
			if (!draft || draft.tourId !== tourId) return;

			form.reset({
				date: new Date(draft.date),
				travellers_count: draft.travellers_count,
				option_id: draft.option_id,
				travellers: Array.from(
					{ length: draft.travellers_count },
					() => ({})
				)
			});
		},
		[form, tourId]
	);

	useEffect(() => {
		if (bookingIdParam) {
			restoreDraft(bookingIdParam);
		}
	}, [bookingIdParam, restoreDraft]);

	useEffect(() => {
		hasSyncedPax.current = false;
	}, [bookingIdParam, currentStep]);

	useEffect(() => {
		if (currentStep !== 2 || !paxList || hasSyncedPax.current) return;

		const count = form.getValues(
			ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT
		);
		const mapped = paxList.map(mapBookingPaxToTravellerForm);
		const emptySlots = Math.max(0, count - mapped.length);

		form.setValue(ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS, [
			...mapped,
			...Array.from({ length: emptySlots }, () => ({}))
		]);
		hasSyncedPax.current = true;
	}, [currentStep, form, paxList]);

	const handleNextStep = async () => {
		const isValid = await form.trigger([
			"date",
			"travellers_count",
			"option_id"
		]);

		if (!isValid) return;

		const formData = form.getValues();

		try {
			if (bookingIdParam) {
				await updateBookingOrder({
					id: bookingIdParam,
					date: formData.date,
					pax: formData.travellers_count
				}).unwrap();

				saveBookingDraft(bookingIdParam, {
					date: new Date(formData.date).toISOString(),
					travellers_count: formData.travellers_count,
					option_id: formData.option_id,
					tourId
				});

				hasSyncedPax.current = false;
				setCurrentStep(2);
				return;
			}

			const created = await createBookingOrder({
				tourOptionId: formData.option_id,
				date: formData.date,
				pax: formData.travellers_count
			}).unwrap();

			saveBookingDraft(created.id, {
				date: new Date(formData.date).toISOString(),
				travellers_count: formData.travellers_count,
				option_id: formData.option_id,
				tourId
			});

			navigate(
				generatePath(ENUM_PATH.TOURS.CATALOG.BOOKING, {
					tourId,
					bookingId: created.id
				}),
				{ replace: true }
			);
			hasSyncedPax.current = false;
			setCurrentStep(2);
		} catch {
			toast.error(
				bookingIdParam
					? "Failed to update booking"
					: "Failed to create booking"
			);
		}
	};

	const handlePrevStep = () => {
		setCurrentStep((prev) => Math.max(1, prev - 1));
	};

	const handleAddTraveller = () => {
		const current =
			form.getValues(ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS) ?? [];
		const count = form.getValues(
			ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS_COUNT
		);

		if (current.length >= count) return;

		form.setValue(ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS, [...current, {}]);
	};

	const handleRemoveTraveller = async (index: number) => {
		if (!bookingIdParam) return;

		const current =
			form.getValues(ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS) ?? [];
		const traveller = current[index] as ITravellerPaxInput | undefined;
		const paxId = traveller?.pax_id;

		try {
			if (paxId) {
				await deletePassengerInfo({
					bookingId: bookingIdParam,
					paxId
				}).unwrap();
			}

			form.setValue(
				ENUM_FORM_PREVIEW_BOOKING.TRAVELLERS,
				current.filter((_, i) => i !== index)
			);
		} catch {
			toast.error("Failed to remove traveller");
		}
	};

	const onSubmit = async (formData: TPreviewBookingSchema) => {
		if (!bookingIdParam) return;

		try {
			for (const rawTraveller of formData.travellers) {
				const traveller = rawTraveller as ITravellerPaxInput;
				if (!isTravellerComplete(traveller)) continue;

				const file = getTravellerPassportFile(traveller);

				if (traveller.pax_id) {
					await updatePassengerInfo({
						bookingId: bookingIdParam,
						paxId: traveller.pax_id,
						data: mapTravellerToPaxUpdate(traveller)
					}).unwrap();

					if (file) {
						await uploadPassengerPassport({
							bookingId: bookingIdParam,
							paxId: traveller.pax_id,
							file
						}).unwrap();
					}
					continue;
				}

				const pax = await addPassengerInfo({
					id: bookingIdParam,
					data: mapTravellerToPaxCreate(traveller)
				}).unwrap();

				if (file) {
					await uploadPassengerPassport({
						bookingId: bookingIdParam,
						paxId: pax.id,
						file
					}).unwrap();
				}
			}

			const submitted = await submitBookingOrder(bookingIdParam).unwrap();
			setSubmittedBooking(submitted);
			setCurrentStep(3);
		} catch {
			toast.error("Failed to submit booking");
		}
	};

	const isLoading =
		isCreating ||
		isUpdating ||
		isAddingPax ||
		isUpdatingPax ||
		isDeletingPax ||
		isUploadingPassport ||
		isSubmitting;

	return {
		form,
		currentStep,
		handleNextStep,
		handlePrevStep,
		handleAddTraveller,
		handleRemoveTraveller,
		canAddTraveller,
		onSubmit,
		isLoading,
		isPaxLoading,
		isCreating,
		isUpdating,
		bookingId: bookingIdParam,
		submittedBooking,
		tourData,
		options,
		isTourLoading,
		isOptionsLoading,
		isOptionsError
	};
};
