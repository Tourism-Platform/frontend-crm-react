import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { PlaneIcon } from "@/shared/assets";
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
	ENUM_FORM_FLIGHT,
	ENUM_FLIGHT_FORM_SECTION as ENUM_FORM_SECTION,
	FLIGHT_EDIT_SCHEMA,
	type TFlightEditSchema,
	useGetTourEventQuery,
	useUpdateTourEventMutation
} from "@/entities/tour";

import { EventTitleInput } from "../ui";

import { type ENUM_FORM_SECTION_TYPE, FLIGHT_EDIT_TABS_LIST } from "./model";

export const FlightEdit: FC = () => {
	const { t } = useTranslation("flight_edit_page");
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

	const form = useForm<TFlightEditSchema>({
		resolver: zodResolver(FLIGHT_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (eventData) {
			form.reset(eventData);
		}
	}, [eventData, form]);

	const createSectionSubmit =
		(section: ENUM_FORM_SECTION_TYPE) => async () => {
			const isValid = await form.trigger(section);
			if (!isValid) return;

			const transportType = form.getValues(
				`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_FLIGHT.TRANSPORT_TYPE}`
			);

			const sectionData = {
				[section]: form.getValues(section),
				...(transportType &&
					section !== ENUM_FORM_SECTION.GENERAL && {
						general: { transport_type: transportType }
					}),
				[ENUM_FORM_SECTION.NAME]: form.getValues(
					ENUM_FORM_SECTION.NAME
				),
				[ENUM_FORM_SECTION.DAY]: form.getValues(ENUM_FORM_SECTION.DAY),
				[ENUM_FORM_SECTION.POSITION]: form.getValues(
					ENUM_FORM_SECTION.POSITION
				)
			} as Partial<TFlightEditSchema>;

			try {
				await updateTourEvent({
					tourId,
					optionId,
					eventId,
					type: ENUM_EVENT.FLIGHT,
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
					icon={PlaneIcon}
					placeholder={t("input.title.placeholder")}
				/>
				<Card>
					<CardContent>
						<CustomOptionTabs
							defaultValue={FLIGHT_EDIT_TABS_LIST[0]?.type}
						>
							<CustomOptionTabsList className="grid-cols-3">
								{FLIGHT_EDIT_TABS_LIST.map((item) => (
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
							{FLIGHT_EDIT_TABS_LIST.map((item) => (
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
