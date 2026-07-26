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
	useAddEventOptionMutation,
	useCreateEventMutation,
	useDeleteEventOptionMutation,
	useDeleteTourEventMutation,
	useLazyGetEventLibraryTemplateQuery,
	useListEventLibraryQuery,
	useMoveEventOptionToSingleMutation,
	useMoveEventToMultiMutation,
	useReorderEventMutation,
	useReorderEventOptionsMutation
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

const patchItemBackendId = (
	item: IDayItem,
	tempBlockId: string,
	backendId: string
): IDayItem | null => {
	if (item.block_id === tempBlockId) {
		return { ...item, backendId, id: backendId };
	}
	if (!item.items?.length) return null;

	let changed = false;
	const items = item.items.map((child) => {
		if (child.block_id !== tempBlockId) return child;
		changed = true;
		return { ...child, backendId, id: backendId };
	});
	return changed ? { ...item, items } : null;
};

const patchBackendId = (
	optionsData: TOptionsData,
	activeOption: string,
	tempBlockId: string,
	backendId: string
): IOptionData | null => {
	const optData = optionsData[activeOption];
	if (!optData) return null;

	let found = false;

	const days: Record<number, IDayItem[]> = {};
	for (const [dayKey, dayItems] of Object.entries(optData.days)) {
		const day = Number(dayKey);
		days[day] = dayItems.map((item) => {
			const patched = patchItemBackendId(item, tempBlockId, backendId);
			if (patched) {
				found = true;
				return patched;
			}
			return item;
		});
	}

	const tripDetails = optData.tripDetails.map((item) => {
		const patched = patchItemBackendId(item, tempBlockId, backendId);
		if (patched) {
			found = true;
			return patched;
		}
		return item;
	});

	if (!found) return null;

	return {
		...optData,
		days,
		tripDetails
	};
};

const findNewestOptionId = (
	prevIds: Set<string>,
	options: { id: string }[] | undefined
): string | undefined => {
	if (!options?.length) return undefined;
	return options.find((opt) => !prevIds.has(opt.id))?.id;
};

export const useItineraryDnd = ({
	tourId,
	activeOption,
	eventsAsOptionData,
	emptyOptionData
}: IUseItineraryDndParams) => {
	const { t } = useTranslation("tour_itinerary_page");

	const { watch, setValue } = useForm<{ optionsData: TOptionsData }>({
		defaultValues: { optionsData: {} }
	});

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

	const libraryItems = useMemo(
		() => libraryList?.data ?? [],
		[libraryList?.data]
	);
	const libraryItemsById = useMemo(() => {
		const map: Record<string, IEventLibraryItem> = {};
		for (const item of libraryItems) {
			map[item.id] = item;
		}
		return map;
	}, [libraryItems]);

	const pendingLibraryCreatesRef = useRef(new Set<string>());

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

	const [createEvent] = useCreateEventMutation();
	const [getEventLibraryTemplate] = useLazyGetEventLibraryTemplateQuery();
	const [reorderEvent] = useReorderEventMutation();
	const [deleteEvent] = useDeleteTourEventMutation();
	const [addEventOption] = useAddEventOptionMutation();
	const [deleteEventOption] = useDeleteEventOptionMutation();
	const [reorderEventOptions] = useReorderEventOptionsMutation();
	const [moveEventToMulti] = useMoveEventToMultiMutation();
	const [moveEventOptionToSingle] = useMoveEventOptionToSingleMutation();

	const applyBackendIdPatch = (tempBlockId: string, backendId: string) => {
		const current = watch("optionsData");
		const updated = patchBackendId(
			current,
			activeOption,
			tempBlockId,
			backendId
		);
		if (updated) {
			setValue(
				`optionsData.${activeOption}` as `optionsData.${string}`,
				updated
			);
		}
	};

	const executeDragAction = (
		action: TDragAction,
		prevOptionsData: TOptionsData
	) => {
		const rollback = () => setValue("optionsData", prevOptionsData);

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
					applyBackendIdPatch(action.tempBlockId, newEvent.id);
					return t("toasts.event.create.success");
				},
				error: () => {
					rollback();
					return t("toasts.event.create.error");
				}
			});
		} else if (action.type === "createFromLibrary") {
			if (pendingLibraryCreatesRef.current.has(action.templateId)) {
				rollback();
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
					applyBackendIdPatch(action.tempBlockId, newEvent.id);
					return t("toasts.event.create.success");
				},
				error: () => {
					pendingLibraryCreatesRef.current.delete(action.templateId);
					rollback();
					return t("toasts.event.create.error");
				}
			});
		} else if (action.type === "addOption") {
			const prevIds = new Set(
				Object.values(prevOptionsData[activeOption]?.days || {})
					.flat()
					.concat(prevOptionsData[activeOption]?.tripDetails || [])
					.find((item) => item.backendId === action.parentBackendId)
					?.items?.map((i) => i.backendId!)
					.filter(Boolean) || []
			);

			const addPromise = addEventOption({
				tourId,
				optionId: activeOption,
				eventId: action.parentBackendId,
				type: action.eventType,
				data: {
					name: action.title,
					description: "",
					day: action.day,
					position: action.position,
					eventType: action.eventType,
					details: action.details
				}
			}).unwrap();

			toast.promise(addPromise, {
				loading: t("toasts.event.create.loading"),
				success: (parentEvent) => {
					const newId = findNewestOptionId(
						prevIds,
						parentEvent.options
					);
					if (newId) {
						applyBackendIdPatch(action.tempBlockId, newId);
					}
					return t("toasts.event.create.success");
				},
				error: () => {
					rollback();
					return t("toasts.event.create.error");
				}
			});
		} else if (action.type === "addOptionFromLibrary") {
			if (pendingLibraryCreatesRef.current.has(action.templateId)) {
				rollback();
				return;
			}

			pendingLibraryCreatesRef.current.add(action.templateId);

			const prevIds = new Set(
				Object.values(prevOptionsData[activeOption]?.days || {})
					.flat()
					.concat(prevOptionsData[activeOption]?.tripDetails || [])
					.find((item) => item.backendId === action.parentBackendId)
					?.items?.map((i) => i.backendId!)
					.filter(Boolean) || []
			);

			const addFromLibraryPromise = (async () => {
				const template = await getEventLibraryTemplate(
					action.templateId
				).unwrap();
				const data = mapLibraryTemplateToCreateEvent(
					template,
					action.day,
					action.position
				);
				return addEventOption({
					tourId,
					optionId: activeOption,
					eventId: action.parentBackendId,
					type: data.eventType,
					data
				}).unwrap();
			})();

			toast.promise(addFromLibraryPromise, {
				loading: t("toasts.event.create.loading"),
				success: (parentEvent) => {
					pendingLibraryCreatesRef.current.delete(action.templateId);
					const newId = findNewestOptionId(
						prevIds,
						parentEvent.options
					);
					if (newId) {
						applyBackendIdPatch(action.tempBlockId, newId);
					}
					return t("toasts.event.create.success");
				},
				error: () => {
					pendingLibraryCreatesRef.current.delete(action.templateId);
					rollback();
					return t("toasts.event.create.error");
				}
			});
		} else if (action.type === "move" || action.type === "reorder") {
			const movePromise = reorderEvent({
				tourId,
				optionId: activeOption,
				eventId: action.backendId,
				data: { day: action.day, position: action.position }
			}).unwrap();

			toast.promise(movePromise, {
				loading:
					action.type === "move"
						? t("toasts.event.move.loading")
						: t("toasts.event.reorder.loading"),
				success:
					action.type === "move"
						? t("toasts.event.move.success")
						: t("toasts.event.reorder.success"),
				error: () => {
					rollback();
					return action.type === "move"
						? t("toasts.event.move.error")
						: t("toasts.event.reorder.error");
				}
			});
		} else if (action.type === "reorderOptions") {
			const reorderPromise = reorderEventOptions({
				tourId,
				optionId: activeOption,
				eventId: action.parentBackendId,
				data: { order: action.order }
			}).unwrap();

			toast.promise(reorderPromise, {
				loading: t("toasts.event.reorder.loading"),
				success: t("toasts.event.reorder.success"),
				error: () => {
					rollback();
					return t("toasts.event.reorder.error");
				}
			});
		} else if (action.type === "moveToMulti") {
			const movePromise = moveEventToMulti({
				tourId,
				optionId: activeOption,
				eventId: action.eventId,
				targetEventId: action.targetEventId
			}).unwrap();

			toast.promise(movePromise, {
				loading: t("toasts.event.move.loading"),
				success: t("toasts.event.move.success"),
				error: () => {
					rollback();
					return t("toasts.event.move.error");
				}
			});
		} else if (action.type === "moveToSingle") {
			const movePromise = (async () => {
				const result = await moveEventOptionToSingle({
					tourId,
					optionId: activeOption,
					eventId: action.parentEventId,
					eventOptionId: action.eventOptionId
				}).unwrap();

				await reorderEvent({
					tourId,
					optionId: activeOption,
					eventId: result.newEvent.id,
					data: { day: action.day, position: action.position }
				}).unwrap();

				return result;
			})();

			toast.promise(movePromise, {
				loading: t("toasts.event.move.loading"),
				success: t("toasts.event.move.success"),
				error: () => {
					rollback();
					return t("toasts.event.move.error");
				}
			});
		}
		// reorderDays — UI only
	};

	const handleRemoveItem = (loc: IItemLocation) => {
		const optData = optionsData[loc.optionId];
		if (!optData) return;

		let parent: IDayItem | undefined;
		if (loc.location === "day" && loc.day !== undefined) {
			parent = optData.days[loc.day]?.[loc.index];
		} else if (loc.location === "tripDetails") {
			parent = optData.tripDetails[loc.index];
		}

		if (!parent) return;

		const item: IDayItem | undefined =
			loc.nestedIndex !== undefined
				? parent.items?.[loc.nestedIndex]
				: parent;

		const prevOptionsData = { ...optionsData };

		const resultData = removeItemFromData(optionsData, loc);
		setValue("optionsData", resultData);

		if (loc.nestedIndex !== undefined) {
			if (!parent.backendId || !item?.backendId) return;

			const deletePromise = deleteEventOption({
				tourId,
				optionId: activeOption,
				eventId: parent.backendId,
				eventOptionId: item.backendId
			}).unwrap();

			toast.promise(deletePromise, {
				loading: t("toasts.event.delete.loading"),
				success: t("toasts.event.delete.success"),
				error: () => {
					setValue("optionsData", prevOptionsData);
					return t("toasts.event.delete.error");
				}
			});
			return;
		}

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
