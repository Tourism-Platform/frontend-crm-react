import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { TicketStarIcon } from "@/shared/assets";
import {
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Form,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import {
	ACTIVITY_EDIT_SCHEMA,
	ENUM_EVENT,
	type TActivityEditSchema,
	useGetTourEventQuery,
	useUpdateTourEventMutation
} from "@/entities/tour";

import { EventTitleInput } from "../ui";

import {
	ENUM_FORM_SECTION,
	type ENUM_FORM_SECTION_TYPE,
	EVENT_EDIT_TABS_LIST
} from "./model";

const ActivityEditBase: FC = () => {
	const { t } = useTranslation("activity_edit_page");
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

	const form = useForm<TActivityEditSchema>({
		resolver: zodResolver(ACTIVITY_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (eventData) {
			form.reset(eventData as TActivityEditSchema);
		}
	}, [eventData, form]);

	const createSectionSubmit =
		(section: ENUM_FORM_SECTION_TYPE) => async () => {
			const isValid = await form.trigger(section);
			if (!isValid) return;

			const sectionData = {
				[section]: form.getValues(section),
				[ENUM_FORM_SECTION.NAME]: form.getValues(
					ENUM_FORM_SECTION.NAME
				),
				[ENUM_FORM_SECTION.DAY]: form.getValues(ENUM_FORM_SECTION.DAY),
				[ENUM_FORM_SECTION.POSITION]: form.getValues(
					ENUM_FORM_SECTION.POSITION
				)
			};
			try {
				await updateTourEvent({
					tourId,
					optionId,
					eventId,
					type: ENUM_EVENT.ACTIVITY,
					data: sectionData
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
					icon={TicketStarIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-sky-500"
				/>
				<Card>
					<CardContent>
						<CustomOptionTabs
							defaultValue={EVENT_EDIT_TABS_LIST[0]?.type}
						>
							<CustomOptionTabsList className="grid-cols-3">
								{EVENT_EDIT_TABS_LIST.map((item) => (
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
							{EVENT_EDIT_TABS_LIST.map((item) => (
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

export const ActivityEdit = withErrorBoundary(ActivityEditBase);
