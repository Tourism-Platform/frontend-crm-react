import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { useNavigateByType, useOptionalResourceQuery } from "@/shared/hooks";
import { validateFormWithSectionToast } from "@/shared/lib";

import {
	ENUM_EVENT,
	LIBRARY_EVENT_CREATE_ID,
	TRANSPORTATION_EDIT_SCHEMA,
	type TTransportationEditSchema,
	buildEventLibraryEditRoute,
	useCreateEventLibraryMutation,
	useGetEventLibraryQuery,
	useGetEventLibraryRawQuery,
	useGetEventLibraryTemplateQuery,
	useUpdateEventLibraryMutation
} from "@/entities/tour";

import { ENUM_EVENT_POOL_VARIANT } from "@/features/tours";

import { TransportationEdit } from "@/widgets/tours";
import { type ENUM_FORM_SECTION_TYPE } from "@/widgets/tours/events/transportation-edit/model";

export const LibraryTransferEditPage: FC = () => {
	const { t, i18n } = useTranslation("event_templates_page");
	const { libraryId = "" } = useParams<{ libraryId: string }>();
	const isCreate = libraryId === LIBRARY_EVENT_CREATE_ID;
	const [supplyId, setSupplyId] = useState<string | undefined>();

	const { data: libraryItem, isRealError: isLoadError } =
		useOptionalResourceQuery(
			useGetEventLibraryQuery(libraryId, {
				skip: !libraryId || isCreate
			})
		);

	const { navigateToType, isExpectedType } = useNavigateByType({
		expectedType: ENUM_EVENT.TRANSPORTATION,
		actualType: libraryItem?.eventType,
		params: { libraryId },
		resolvePath: buildEventLibraryEditRoute,
		enabled: !isCreate && Boolean(libraryItem)
	});

	const { data: libraryEvent } = useOptionalResourceQuery(
		useGetEventLibraryRawQuery(
			{ libraryId, supplyId },
			{
				skip: !libraryId || isCreate || !libraryItem || !isExpectedType
			}
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

	const form = useForm<TTransportationEditSchema>({
		resolver: zodResolver(TRANSPORTATION_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (!isCreate && libraryEvent) {
			form.reset(libraryEvent as TTransportationEditSchema);
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
					type: ENUM_EVENT.TRANSPORTATION,
					language,
					data
				}).unwrap();
				toast.success(t("toasts.create.success"));
				navigateToType(
					created.eventType,
					{ replace: true },
					{ libraryId: created.id }
				);
				return;
			}

			await updateEventLibrary({
				libraryId,
				type: ENUM_EVENT.TRANSPORTATION,
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

	if (!isCreate && libraryItem && !isExpectedType) {
		return null;
	}

	return (
		<TransportationEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isCreateLoading || isUpdateLoading}
			poolVariant={ENUM_EVENT_POOL_VARIANT.LIBRARY}
			onPoolSelect={setSupplyId}
		/>
	);
};
