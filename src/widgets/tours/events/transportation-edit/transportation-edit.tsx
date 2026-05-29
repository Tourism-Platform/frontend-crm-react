import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { DrivingIcon } from "@/shared/assets";
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
	TRANSPORTATION_EDIT_SCHEMA,
	type TTransportationEditSchema,
	useGetTourEventQuery,
	useUpdateTourEventMutation
} from "@/entities/tour";

import { EventTitleInput } from "../ui";

import {
	ENUM_FORM_SECTION,
	type ENUM_FORM_SECTION_TYPE,
	TRANSPORTATION_EDIT_TABS_LIST
} from "./model";

export const TransportationEdit: FC = () => {
	const {
		tourId = "",
		optionId = "",
		eventId = ""
	} = useParams<{
		tourId: string;
		eventId: string;
		optionId: string;
	}>();
	const { t } = useTranslation("transportation_edit_page");
	const { data: eventData, isError: isLoadError } = useGetTourEventQuery(
		{ tourId, optionId, eventId },
		{ skip: !tourId || !optionId || !eventId }
	);

	const [updateTourEvent, { isLoading: isUpdateLoading }] =
		useUpdateTourEventMutation();

	const form = useForm<TTransportationEditSchema>({
		resolver: zodResolver(TRANSPORTATION_EDIT_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			name: ""
		}
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

			const sectionData = {
				[section]: form.getValues(section),
				[ENUM_FORM_SECTION.NAME]: form.getValues(ENUM_FORM_SECTION.NAME)
			};
			try {
				await updateTourEvent({
					tourId,
					optionId,
					eventId,
					type: ENUM_EVENT.TRANSPORTATION,
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
					icon={DrivingIcon}
					placeholder={t("input.title.placeholder")}
					className="bg-emerald-600"
				/>
				<Card>
					<CardContent>
						<CustomOptionTabs
							defaultValue={
								TRANSPORTATION_EDIT_TABS_LIST[0]?.type
							}
						>
							<CustomOptionTabsList className="grid-cols-4">
								{TRANSPORTATION_EDIT_TABS_LIST.map((item) => (
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
							{TRANSPORTATION_EDIT_TABS_LIST.map((item) => (
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
