import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { HouseIcon } from "@/shared/assets";
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
	ACCOMMODATION_EDIT_SCHEMA,
	ENUM_EVENT,
	type TAccommodationEditSchema,
	useGetTourEventQuery,
	useUpdateTourEventMutation
} from "@/entities/tour";

import { EventTitleInput } from "../ui";

import {
	ACCOMMODATION_EDIT_TABS_LIST,
	ENUM_FORM_SECTION,
	type ENUM_FORM_SECTION_TYPE
} from "./model";

export const AccommodationEdit: FC = () => {
	const { t } = useTranslation("accommodation_edit_page");
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

	const form = useForm<TAccommodationEditSchema>({
		resolver: zodResolver(ACCOMMODATION_EDIT_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (isLoadError) {
			toast.error(t("form.toasts.load.error"));
		}
	}, [isLoadError, t]);

	useEffect(() => {
		if (eventData) {
			form.reset(eventData as TAccommodationEditSchema);
		}
	}, [eventData, form]);

	const createSectionSubmit =
		(section: ENUM_FORM_SECTION_TYPE) => async () => {
			if (!(await form.trigger(section))) {
				return;
			}

			const sectionData = {
				[section]: form.getValues(section),
				[ENUM_FORM_SECTION.NAME]: form.getValues(
					ENUM_FORM_SECTION.NAME
				),
				[ENUM_FORM_SECTION.DAY]: form.getValues(ENUM_FORM_SECTION.DAY),
				[ENUM_FORM_SECTION.POSITION]: form.getValues(
					ENUM_FORM_SECTION.POSITION
				),
				...((section === ENUM_FORM_SECTION.PRICING ||
					section === ENUM_FORM_SECTION.ROOMS) && {
					[ENUM_FORM_SECTION.ROOMS]: form.getValues(
						ENUM_FORM_SECTION.ROOMS
					),
					[ENUM_FORM_SECTION.PRICING]: form.getValues(
						ENUM_FORM_SECTION.PRICING
					)
				})
			};
			try {
				await updateTourEvent({
					tourId,
					optionId,
					eventId,
					type: ENUM_EVENT.ACCOMMODATION,
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
					icon={HouseIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-cyan-700"
				/>
				<Card>
					<CardContent>
						<CustomOptionTabs
							defaultValue={ACCOMMODATION_EDIT_TABS_LIST[0]?.type}
						>
							<CustomOptionTabsList className="grid-cols-4">
								{ACCOMMODATION_EDIT_TABS_LIST.map((item) => (
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
							{ACCOMMODATION_EDIT_TABS_LIST.map((item) => (
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
