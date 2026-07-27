import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect, useMemo } from "react";
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
import { validateFormWithSectionToast } from "@/shared/lib";

import {
	ACTIVITY_EDIT_SCHEMA,
	ENUM_ACTIVITY_EDIT_TAB,
	ENUM_EVENT,
	LIBRARY_EVENT_CREATE_ID,
	type TActivityEditSchema,
	useCreateEventLibraryMutation,
	useGetEventLibraryRawQuery,
	useUpdateEventLibraryMutation
} from "@/entities/tour";

import { ActivityEdit } from "@/widgets/tours";
import {
	type ENUM_FORM_SECTION_TYPE,
	EVENT_EDIT_TABS_LIST
} from "@/widgets/tours/events/activity-edit/model";

export const LibraryActivityEditPage: FC = () => {
	const { t, i18n } = useTranslation("event_templates_page");
	const navigate = useNavigate();
	const { libraryId = "" } = useParams<{ libraryId: string }>();
	const isCreate = libraryId === LIBRARY_EVENT_CREATE_ID;

	const { data: libraryEvent, isError: isLoadError } =
		useGetEventLibraryRawQuery(libraryId, {
			skip: !libraryId || isCreate
		});

	const [createEventLibrary, { isLoading: isCreateLoading }] =
		useCreateEventLibraryMutation();
	const [updateEventLibrary, { isLoading: isUpdateLoading }] =
		useUpdateEventLibraryMutation();

	const form = useForm<TActivityEditSchema>({
		resolver: zodResolver(ACTIVITY_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	const tabs = useMemo(
		() =>
			EVENT_EDIT_TABS_LIST.filter(
				(tab) => tab.type !== ENUM_ACTIVITY_EDIT_TAB.MEDIA
			),
		[]
	);

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (!isCreate && libraryEvent) {
			form.reset(libraryEvent as TActivityEditSchema);
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
					type: ENUM_EVENT.ACTIVITY,
					language,
					data
				}).unwrap();
				toast.success(t("toasts.create.success"));
				navigate(
					buildRoute(ENUM_PATH.LIBRARY.EVENT_ACTIVITY, {
						libraryId: created.id
					}),
					{ replace: true }
				);
				return;
			}

			await updateEventLibrary({
				libraryId,
				type: ENUM_EVENT.ACTIVITY,
				language,
				data
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
		<ActivityEdit
			form={form}
			createSectionSubmit={createSectionSubmit}
			isLoading={isCreateLoading || isUpdateLoading}
			tabs={tabs}
		/>
	);
};
