import type { DragEndEvent } from "@dnd-kit/core";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	type ITemplateItem,
	useCreateEventMutation,
	useDeleteTourEventMutation,
	useReorderEventMutation
} from "@/entities/tour";

import {
	type TDragAction,
	handleDragEnd,
	handleDragOver,
	handleDragStart
} from "../handlers";
import { removeItemFromData } from "../helpers";
import type {
	IDayItem,
	IItemLocation,
	IOptionData,
	TOptionsData
} from "../types";

interface IUseItineraryDndParams {
	tourId: string;
	activeOption: string;
	eventsAsOptionData: IOptionData;
	emptyOptionData: IOptionData;
}

export const useItineraryDnd = ({
	tourId,
	activeOption,
	eventsAsOptionData,
	emptyOptionData
}: IUseItineraryDndParams) => {
	const { t } = useTranslation("tour_itinerary_page");

	// react-hook-form — локальный стейт DND
	const { watch, setValue } = useForm<{ optionsData: TOptionsData }>({
		defaultValues: { optionsData: {} }
	});

	// Синхронизация данных с бэкенда в форму
	useEffect(() => {
		if (activeOption) {
			setValue(
				`optionsData.${activeOption}` as `optionsData.${string}`,
				eventsAsOptionData
			);
		}
	}, [eventsAsOptionData, activeOption, setValue]);

	const optionsData = watch("optionsData");
	const currentData = optionsData[activeOption] ?? emptyOptionData;

	// DND sensors
	const sensors = useSensors(useSensor(PointerSensor));
	const [activeDayItem, setActiveDayItem] = useState<IDayItem | null>(null);
	const [activeTemplateItem, setActiveTemplateItem] =
		useState<ITemplateItem | null>(null);
	const [activeColumn, setActiveColumn] = useState<number | null>(null);

	// Мутации
	const [createEvent] = useCreateEventMutation();
	// const [updateEvent] = useUpdateTourEventMutation();
	const [reorderEvent] = useReorderEventMutation();
	const [deleteEvent] = useDeleteTourEventMutation();

	// --- API actions по результату DND ---
	const executeDragAction = (
		action: TDragAction,
		prevOptionsData: TOptionsData
	) => {
		if (action.type === "create") {
			const createPromise = createEvent({
				tourId,
				optionId: activeOption,
				data: {
					name: action.title,
					description: "",
					day: action.day,
					position: action.position,
					eventType: action.eventType,
					details: action.details
				}
			}).unwrap();

			toast.promise(createPromise, {
				loading: t("toasts.event.create.loading"),
				success: (newEvent) => {
					// Сохраняем backendId в карточку
					const current = watch("optionsData");
					const optData = current[activeOption];
					if (optData) {
						const dayItems = optData.days[action.day];
						if (dayItems) {
							const idx = dayItems.findIndex(
								(item) => item.block_id === action.tempBlockId
							);
							if (idx !== -1) {
								const newDayItems = [...dayItems];
								newDayItems[idx] = {
									...dayItems[idx],
									backendId: newEvent.id
								};
								const updatedOptData: IOptionData = {
									...optData,
									days: {
										...optData.days,
										[action.day]: newDayItems
									}
								};
								setValue(
									`optionsData.${activeOption}` as `optionsData.${string}`,
									updatedOptData
								);
							}
						}
					}
					return t("toasts.event.create.success");
				},
				error: () => {
					// Rollback
					setValue("optionsData", prevOptionsData);
					return t("toasts.event.create.error");
				}
			});
		} else if (action.type === "move") {
			const movePromise = reorderEvent({
				tourId,
				optionId: activeOption,
				eventId: action.backendId,
				data: { day: action.day, position: action.position }
			}).unwrap();

			toast.promise(movePromise, {
				loading: t("toasts.event.move.loading"),
				success: t("toasts.event.move.success"),
				error: () => {
					setValue("optionsData", prevOptionsData);
					return t("toasts.event.move.error");
				}
			});
		} else if (action.type === "reorder") {
			const reorderPromise = reorderEvent({
				tourId,
				optionId: activeOption,
				eventId: action.backendId,
				data: { day: action.day, position: action.position }
			}).unwrap();

			toast.promise(reorderPromise, {
				loading: t("toasts.event.reorder.loading"),
				success: t("toasts.event.reorder.success"),
				error: () => {
					setValue("optionsData", prevOptionsData);
					return t("toasts.event.reorder.error");
				}
			});
		}
		// reorderDays — чисто UI, не отправляем
	};

	// --- DND handlers ---
	const handleRemoveItem = (loc: IItemLocation) => {
		const optData = optionsData[loc.optionId];
		if (!optData) return;

		let item: IDayItem | undefined;
		if (loc.location === "day" && loc.day !== undefined) {
			item = optData.days[loc.day]?.[loc.index];
		} else if (loc.location === "tripDetails") {
			item = optData.tripDetails[loc.index];
		}

		// Сохраняем предыдущее состояние для rollback
		const prevOptionsData = { ...optionsData };

		// Оптимистичное удаление
		const resultData = removeItemFromData(optionsData, loc);
		setValue("optionsData", resultData);

		if (item?.backendId) {
			const deletePromise = deleteEvent({
				tourId,
				optionId: activeOption,
				eventId: item.backendId
			}).unwrap();

			toast.promise(deletePromise, {
				loading: t("toasts.event.delete.loading"),
				success: t("toasts.event.delete.success"),
				error: () => {
					setValue("optionsData", prevOptionsData);
					return t("toasts.event.delete.error");
				}
			});
		}
	};

	const onDragStart = (event: DragEndEvent) => {
		const state = handleDragStart(event, optionsData);
		setActiveDayItem(state.activeDayItem);
		setActiveTemplateItem(state.activeTemplateItem);
		setActiveColumn(state.activeColumn);
	};

	const onDragEnd = (event: DragEndEvent) => {
		// Сохраняем предыдущее состояние для rollback
		const prevOptionsData = { ...optionsData };

		const result = handleDragEnd(event, optionsData, activeOption);

		if (result.shouldUpdate && result.newData) {
			setValue("optionsData", result.newData);
		}

		if (result.clearState) {
			setActiveDayItem(null);
			setActiveTemplateItem(null);
			setActiveColumn(null);
		}

		if (result.action) {
			executeDragAction(result.action, prevOptionsData);
		}
	};

	const onDragOver = (event: DragEndEvent) => {
		const newData = handleDragOver(event, optionsData, activeOption);
		if (newData) {
			setValue("optionsData", newData, { shouldValidate: false });
		}
	};

	return {
		sensors,
		currentData,
		activeDayItem,
		activeTemplateItem,
		activeColumn,
		onDragStart,
		onDragEnd,
		onDragOver,
		handleRemoveItem
	};
};
