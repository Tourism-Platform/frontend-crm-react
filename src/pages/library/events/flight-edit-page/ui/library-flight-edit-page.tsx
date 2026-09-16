import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
	ENUM_LANGUAGES,
	ENUM_PATH,
	buildRoute,
	i18nLanguageMapper
} from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import { validateFormWithSectionToast } from "@/shared/lib";

import {
	ENUM_EVENT,
	FLIGHT_EDIT_SCHEMA,
	LIBRARY_EVENT_CREATE_ID,
	type TFlightEditSchema,
	useCreateEventLibraryMutation,
	useGetEventLibraryRawQuery,
	useGetEventLibraryTemplateQuery,
	useUpdateEventLibraryMutation
} from "@/entities/tour";

import { ENUM_EVENT_POOL_VARIANT } from "@/features/tours";

import { FlightEdit } from "@/widgets/tours";
import { type ENUM_FORM_SECTION_TYPE } from "@/widgets/tours/events/flight-edit/model";

export const LibraryFlightEditPage: FC = () => {
	const { t, i18n } = useTranslation("event_templates_page");
	const navigate = useNavigate();
	const { libraryId = "" } = useParams<{ libraryId: string }>();
	const isCreate = libraryId === LIBRARY_EVENT_CREATE_ID;
	const [supplyId, setSupplyId] = useState<string | undefined>();

	const { data: libraryEvent, isRealError: isLoadError } =
		useOptionalResourceQuery(
			useGetEventLibraryRawQuery(
				{ libraryId, supplyId },
				{ skip: !libraryId || isCreate }
			)
		);
	const { data: libraryTemplate } = useGetEventLibraryTemplateQuery(
		libraryId,
		{ skip: !libraryId || isCreate }
	);

	const [createEventLibrary, { isLoading: isCreateLoading }] =
		useCreateEventLibraryMutation();
	const [updateEventLibrary, { isLoading: isUpdateLoading }] =
		useUpdateEventLibraryMutation();

	const form = useForm<TFlightEditSchema>({
		resolver: zodResolver(FLIGHT_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (!isCreate && libraryEvent) {
			form.reset(libraryEvent as TFlightEditSchema);
		}
	}, [libraryEvent, form, isCreate]);

	const createSectionSubmit = async (section?: ENUM_FORM_SECTION_TYPE) => {
		if (
			!(await validateFormWithSectionToast(form, t, {
				keyPrefix: "toasts.validation.error",
				...(section && { fields: section })
			}))
		) {
			return;
		}

		const language =
			i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
		const data = form.getValues();

		try {
			if (isCreate) {
				const created = await createEventLibrary({
					type: ENUM_EVENT.FLIGHT,
					language,
					data
				}).unwrap();
				toast.success(t("toasts.create.success"));
				navigate(
					buildRoute(ENUM_PATH.LIBRARY.EVENT_FLIGHT, {
						libraryId: created.id
					}),
					{ replace: true }
				);
				return;
			}

			await updateEventLibrary({
				libraryId,
				type: ENUM_EVENT.FLIGHT,
				language,
				data,
				currentDetails: libraryTemplate?.event.details
			}).unwrap();
			toast.success(t("toasts.update.success"));
		} catch (error) {
			toast.error(
				isCreate ? t("toasts.create.error") : t("toasts.update.error")
			);
			console.log(error);
		}
	};

	return (
		<FlightEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isCreateLoading || isUpdateLoading}
			poolVariant={ENUM_EVENT_POOL_VARIANT.LIBRARY}
			onPoolSelect={setSupplyId}
		/>
	);
};
