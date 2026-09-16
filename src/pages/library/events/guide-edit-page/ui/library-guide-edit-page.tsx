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
	GUIDE_EDIT_SCHEMA,
	LIBRARY_EVENT_CREATE_ID,
	type TGuideEditSchema,
	useCreateEventLibraryMutation,
	useGetEventLibraryRawQuery,
	useGetEventLibraryTemplateQuery,
	useUpdateEventLibraryMutation
} from "@/entities/tour";

import { ENUM_EVENT_POOL_VARIANT } from "@/features/tours";

import { GuideEdit } from "@/widgets/tours";

export const LibraryGuideEditPage: FC = () => {
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

	const form = useForm<TGuideEditSchema>({
		resolver: zodResolver(GUIDE_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (!isCreate && libraryEvent) {
			form.reset(libraryEvent as TGuideEditSchema);
		}
	}, [libraryEvent, form, isCreate]);

	const createSectionSubmit = async () => {
		if (
			!(await validateFormWithSectionToast(form, t, {
				keyPrefix: "toasts.validation.error"
			}))
		) {
			return;
		}

		const language =
			i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

		try {
			if (isCreate) {
				const created = await createEventLibrary({
					type: ENUM_EVENT.GUIDE,
					language,
					data: form.getValues()
				}).unwrap();
				toast.success(t("toasts.create.success"));
				navigate(
					buildRoute(ENUM_PATH.LIBRARY.EVENT_GUIDE, {
						libraryId: created.id
					})
				);
				return;
			}

			await updateEventLibrary({
				libraryId,
				type: ENUM_EVENT.GUIDE,
				language,
				data: form.getValues(),
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
		<GuideEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isCreateLoading || isUpdateLoading}
			poolVariant={ENUM_EVENT_POOL_VARIANT.LIBRARY}
			onPoolSelect={setSupplyId}
		/>
	);
};
