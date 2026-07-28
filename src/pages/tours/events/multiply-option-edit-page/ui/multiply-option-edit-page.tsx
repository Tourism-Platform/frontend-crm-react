import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	ENUM_EVENT,
	type ITourEventOption,
	MULTIPLY_OPTION_EDIT_SCHEMA,
	type TMultiplyOptionEditSchema,
	getRemovedMultiplyOptions,
	hasMultiplyOptionsOrderChanged,
	mapMultiplyOptionReorderToBackend,
	useDeleteEventOptionMutation,
	useEventEditIds,
	useReorderEventOptionsMutation,
	useTourEventEdit,
	useUpdateEventOptionContentMutation
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
	const [deleteEventOption, { isLoading: isDeleteLoading }] =
		useDeleteEventOptionMutation();
	const [updateEventOptionContent, { isLoading: isUpdateLoading }] =
		useUpdateEventOptionContentMutation();

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
		const currentOptions = (form.getValues("options") ??
			[]) as ITourEventOption[];
		const originalOptions = (data?.options ?? []) as ITourEventOption[];

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
				await deleteEventOption({
					tourId,
					optionId,
					eventId,
					eventOptionId: option.id
				}).unwrap();
			}

			for (const option of currentOptions) {
				await updateEventOptionContent({
					tourId,
					optionId,
					eventId,
					eventOptionId: option.id,
					data: {
						name: option.name,
						description: option.description,
						day: data?.day ?? 0,
						position: data?.position ?? 0,
						eventType: option.eventType,
						details: option.details,
						isOptional: option.isOptional
					}
				}).unwrap();
			}

			if (orderChanged) {
				const orderPayload = mapMultiplyOptionReorderToBackend(
					originalRemaining,
					currentOptions
				);

				if (orderPayload.order.some((index) => index < 0)) {
					toast.error(t("form.toasts.save.error"));
					return;
				}

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
