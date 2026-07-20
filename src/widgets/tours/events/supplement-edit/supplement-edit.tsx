import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { BoxOutlineIcon } from "@/shared/assets";
import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Form,
	Separator
} from "@/shared/ui";

import {
	ENUM_EVENT,
	SUPPLEMENT_EDIT_SCHEMA,
	type TSupplementEditSchema,
	useGetTourEventQuery,
	useUpdateTourEventMutation
} from "@/entities/tour";

import { EventTitleInput } from "../ui";

import {
	type ENUM_FORM_SECTION_TYPE,
	SUPPLEMENT_EDIT_TABS_LIST
} from "./model";

export const SupplementEdit: FC = () => {
	const { t, i18n } = useTranslation("supplement_edit_page");
	const {
		tourId = "",
		optionId = "",
		eventId = ""
	} = useParams<{
		tourId: string;
		eventId: string;
		optionId: string;
	}>();
	const { data: eventData, isError: isLoadError } = useGetTourEventQuery(
		{ tourId, optionId, eventId },
		{ skip: !tourId || !optionId || !eventId }
	);

	const [updateTourEvent, { isLoading: isUpdateLoading }] =
		useUpdateTourEventMutation();

	const form = useForm<TSupplementEditSchema>({
		resolver: zodResolver(SUPPLEMENT_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (eventData) {
			form.reset(eventData as TSupplementEditSchema);
		}
	}, [eventData, form]);

	const createSectionSubmit =
		(section: ENUM_FORM_SECTION_TYPE) => async () => {
			if (!(await form.trigger(section))) {
				return;
			}

			try {
				await updateTourEvent({
					tourId,
					optionId,
					eventId,
					type: ENUM_EVENT.SUPPLEMENT,
					language:
						i18nLanguageMapper.to(i18n.language) ??
						ENUM_LANGUAGES.EN,
					data: form.getValues()
				}).unwrap();
				toast.success(t("form.toasts.save.success"));
			} catch (error) {
				toast.error(t("form.toasts.save.error"));
				console.log(error);
			}
		};

	return (
		<Form {...form}>
			<section className="flex flex-col gap-6">
				<EventTitleInput
					control={form.control}
					icon={BoxOutlineIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-violet-600"
				/>
				<Card>
					<CardContent>
						<CustomOptionTabs
							defaultValue={SUPPLEMENT_EDIT_TABS_LIST[0]?.type}
						>
							<CustomOptionTabsList className="grid-cols-3">
								{SUPPLEMENT_EDIT_TABS_LIST.map((item) => (
									<CustomOptionTabsTrigger
										key={item.type}
										value={item.type}
										variant={"tongue"}
									>
										{t(item?.label)}
									</CustomOptionTabsTrigger>
								))}
							</CustomOptionTabsList>
							<Separator className="mb-6" />
							{SUPPLEMENT_EDIT_TABS_LIST.map((item) => (
								<CustomOptionTabsContent
									key={item.type}
									value={item.type}
								>
									<item.slot
										form={form}
										{...(item?.section && {
											onSubmit: createSectionSubmit(
												item.section
											)
										})}
										{...(item?.ns && { ns: item.ns })}
										isLoading={isUpdateLoading}
									/>
								</CustomOptionTabsContent>
							))}
						</CustomOptionTabs>
					</CardContent>
				</Card>
			</section>
		</Form>
	);
};
