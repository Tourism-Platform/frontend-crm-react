import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import { useGetTourGeneralQuery } from "@/entities/tour";
import {
	type TPreviewBookingSchema,
	useSubmitPreviewBookingMutation
} from "@/entities/tour/preview-booking";

export const usePreviewBooking = () => {
	const { tourId = "" } = useParams<{ tourId: string }>();
	const [currentStep, setCurrentStep] = useState(1);

	const { data: tourData, isLoading: isTourLoading } = useGetTourGeneralQuery(
		tourId,
		{
			skip: !tourId
		}
	);

	const [submitBooking, { isLoading, isSuccess, data }] =
		useSubmitPreviewBookingMutation();

	const form = useForm<TPreviewBookingSchema>({
		// resolver: zodResolver(PREVIEW_BOOKING_SCHEMA),
		defaultValues: {
			travellers_count: 1,
			travellers: [{}]
		},
		mode: "onChange"
	});

	const handleNextStep = async () => {
		let isValid = false;
		if (currentStep === 1) {
			isValid = await form.trigger([
				"date",
				"travellers_count",
				"option_id"
			]);
		} else if (currentStep === 2) {
			isValid = await form.trigger("travellers");
		}

		if (isValid) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handlePrevStep = () => {
		setCurrentStep((prev) => Math.max(1, prev - 1));
	};

	const onSubmit = async (formData: TPreviewBookingSchema) => {
		try {
			await submitBooking({ tourId, data: formData }).unwrap();
			setCurrentStep(3); // Успешно, переходим на 3 шаг
		} catch (error) {
			console.error("Booking error", error);
		}
	};

	return {
		form,
		currentStep,
		setCurrentStep,
		handleNextStep,
		handlePrevStep,
		onSubmit,
		isLoading,
		isSuccess,
		bookingData: data,
		tourData,
		isTourLoading
	};
};
