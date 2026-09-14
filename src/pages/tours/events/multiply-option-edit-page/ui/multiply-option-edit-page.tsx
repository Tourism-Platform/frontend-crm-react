import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	ENUM_EVENT,
	MULTIPLY_OPTION_EDIT_SCHEMA,
	type TMultiplyOptionEditSchema,
	getRemovedMultiplyOptions,
	hasMultiplyOptionsOrderChanged,
	mapMultiplyOptionReorderToBackend,
	useDeleteTourEventOptionMutation,
	useEventEditIds,
	useReorderEventOptionsMutation,
	useTourEventEdit,
	useUpdateOptionContentMutation
} from "@/entities/tour";

import { MultiplyOptionEdit } from "@/widgets/tours";

export const MultiplyOptionEditPage: FC = () => {
	const { t } = useTranslation("multiply_option_edit_page");
	const { tourId, optionId, eventId } = useEventEditIds();
	const { data, isError } = useTourEventEdit<TMultiplyOptionEditSchema>(
		ENUM_EVENT.MULTIPLY_OPTION
	);
	const [reorderEventOptions, { isLoading: isReorderLoading }] =
		useReorderEventOptionsMutation();
	const [deleteOption, { isLoading: isDeleteLoading }] =
		useDeleteTourEventOptionMutation();
	const [updateOptionContent, { isLoading: isUpdateLoading }] =
		useUpdateOptionContentMutation();

	const form = useForm<TMultiplyOptionEditSchema>({
		resolver: zodResolver(MULTIPLY_OPTION_EDIT_SCHEMA),
		defaultValues: {
			name: "",
			description: "",
			options: []
		},
		mode: "onSubmit"
	});
	const { reset } = form;

	useEffect(() => {
		if (isError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isError, t]);

	useEffect(() => {
		if (data) {
			reset(data);
		}
	}, [data, reset]);

	const createSectionSubmit = async () => {
		const currentOptions = form.getValues("options") ?? [];
		const originalOptions = data?.options ?? [];

		if (currentOptions.length < 2) {
			toast.error(t("form.toasts.save.error"));
			return;
		}

		const removedOptions = getRemovedMultiplyOptions(
			originalOptions,
			currentOptions
		);
		const originalRemaining = originalOptions.filter((option) =>
			currentOptions.some((current) => current.id === option.id)
		);
		const orderChanged = hasMultiplyOptionsOrderChanged(
			originalRemaining,
			currentOptions
		);

		try {
			for (const option of removedOptions) {
				await deleteOption({
					tourId,
					optionId,
					eventId,
					eventOptionId: option.id
				}).unwrap();
			}

			for (const option of currentOptions) {
				await updateOptionContent({
					tourId,
					optionId,
					eventId,
					eventOptionId: option.id,
					option
				}).unwrap();
			}

			if (orderChanged) {
				// Contract 3.1: reorder payload is option row IDs, not indices.
				const orderPayload =
					mapMultiplyOptionReorderToBackend(currentOptions);

				await reorderEventOptions({
					tourId,
					optionId,
					eventId,
					data: orderPayload
				}).unwrap();
			}

			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.log(error);
		}
	};

	return (
		<MultiplyOptionEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isReorderLoading || isDeleteLoading || isUpdateLoading}
		/>
	);
};
