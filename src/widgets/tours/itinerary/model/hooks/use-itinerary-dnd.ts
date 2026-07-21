import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	type IEventLibraryItem,
	type ITemplateItem,
	mapLibraryTemplateToCreateEvent,
	useCreateEventMutation,
	useDeleteTourEventMutation,
	useLazyGetEventLibraryTemplateQuery,
	useListEventLibraryQuery,
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

const patchBackendId = (
	optionsData: TOptionsData,
	activeOption: string,
	day: number,
	tempBlockId: string,
	backendId: string
): IOptionData | null => {
	const optData = optionsData[activeOption];
	if (!optData) return null;

	const dayItems = optData.days[day];
	if (!dayItems) return null;

	const idx = dayItems.findIndex((item) => item.block_id === tempBlockId);
	if (idx === -1) return null;

	const newDayItems = [...dayItems];
	newDayItems[idx] = {
		...dayItems[idx],
		backendId
	};

	return {
		...optData,
		days: {
			...optData.days,
			[day]: newDayItems
		}
	};
};

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

	const { data: libraryList } = useListEventLibraryQuery({
		search: "",
		types: [],
		page: 1,
		limit: 100
	});

	const libraryItems = libraryList?.data ?? [];
	const libraryItemsById = useMemo(() => {
		const map: Record<string, IEventLibraryItem> = {};
		for (const item of libraryItems) {
			map[item.id] = item;
		}
		return map;
	}, [libraryItems]);

	const pendingLibraryCreatesRef = useRef(new Set<string>());

	// DND sensors
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8 }
		})
	);
	const [activeDayItem, setActiveDayItem] = useState<IDayItem | null>(null);
	const [activeTemplateItem, setActiveTemplateItem] =
		useState<ITemplateItem | null>(null);
	const [activeLibraryItem, setActiveLibraryItem] =
		useState<IEventLibraryItem | null>(null);
	const [activeColumn, setActiveColumn] = useState<number | null>(null);

	// Мутации
	const [createEvent] = useCreateEventMutation();
	const [getEventLibraryTemplate] = useLazyGetEventLibraryTemplateQuery();
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
					const current = watch("optionsData");
					const updated = patchBackendId(
						current,
						activeOption,
						action.day,
						action.tempBlockId,
						newEvent.id
					);
					if (updated) {
						setValue(
							`optionsData.${activeOption}` as `optionsData.${string}`,
							updated
						);
					}
					return t("toasts.event.create.success");
				},
				error: () => {
					setValue("optionsData", prevOptionsData);
					return t("toasts.event.create.error");
				}
			});
		} else if (action.type === "createFromLibrary") {
			if (pendingLibraryCreatesRef.current.has(action.templateId)) {
				setValue("optionsData", prevOptionsData);
				return;
			}

			pendingLibraryCreatesRef.current.add(action.templateId);

			const createFromLibraryPromise = (async () => {
				const template = await getEventLibraryTemplate(
					action.templateId
				).unwrap();
				const data = mapLibraryTemplateToCreateEvent(
					template,
					action.day,
					action.position
				);
				return createEvent({
					tourId,
					optionId: activeOption,
					data
				}).unwrap();
			})();

			toast.promise(createFromLibraryPromise, {
				loading: t("toasts.event.create.loading"),
				success: (newEvent) => {
					pendingLibraryCreatesRef.current.delete(action.templateId);
					const current = watch("optionsData");
					const updated = patchBackendId(
						current,
						activeOption,
						action.day,
						action.tempBlockId,
						newEvent.id
					);
					if (updated) {
						setValue(
							`optionsData.${activeOption}` as `optionsData.${string}`,
							updated
						);
					}
					return t("toasts.event.create.success");
				},
				error: () => {
					pendingLibraryCreatesRef.current.delete(action.templateId);
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

		const prevOptionsData = { ...optionsData };

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

	const onDragStart = (event: DragStartEvent) => {
		const state = handleDragStart(event, optionsData, libraryItemsById);
		setActiveDayItem(state.activeDayItem);
		setActiveTemplateItem(state.activeTemplateItem);
		setActiveLibraryItem(state.activeLibraryItem);
		setActiveColumn(state.activeColumn);
	};

	const onDragEnd = (event: DragEndEvent) => {
		const prevOptionsData = { ...optionsData };

		const result = handleDragEnd(
			event,
			optionsData,
			activeOption,
			libraryItemsById
		);

		if (result.shouldUpdate && result.newData) {
			setValue("optionsData", result.newData);
		}

		if (result.clearState) {
			setActiveDayItem(null);
			setActiveTemplateItem(null);
			setActiveLibraryItem(null);
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
		activeLibraryItem,
		activeColumn,
		libraryItems,
		onDragStart,
		onDragEnd,
		onDragOver,
		handleRemoveItem
	};
};
