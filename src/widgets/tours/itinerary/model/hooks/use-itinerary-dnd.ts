import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";

import {
	type IEventLibraryItem,
	type ITemplateItem,
	mapLibraryTemplateToCreateEvent,
	useAddOptionMutation,
	useCopyEventLibraryMutation,
	useCopyTourEventMutation,
	useCreateEventMutation,
	useDeleteTourEventMutation,
	useDeleteTourEventOptionMutation,
	useLazyGetEventLibraryTemplateQuery,
	useListEventLibraryQuery,
	useMoveEventToMultiMutation,
	useMoveOptionToSingleMutation,
	useReorderEventMutation,
	useReorderEventOptionsMutation
} from "@/entities/tour";

import { resolveCopyEventErrorCode } from "@/features/tours";

import {
	type TDragAction,
	handleDragEnd,
	handleDragOver,
	handleDragStart
} from "../handlers";
import {
	enqueueByKey,
	findItemLocation,
	findNewestOptionId,
	removeItemFromData
} from "../helpers";
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
	backendId: string,
	id: string = backendId
): IDayItem | null => {
	if (item.block_id === tempBlockId) {
		return { ...item, backendId, id };
	}
	if (!item.items?.length) return null;

	let changed = false;
	const items = item.items.map((child) => {
		if (child.block_id !== tempBlockId) return child;
		changed = true;
		return { ...child, backendId, id };
	});
	return changed ? { ...item, items } : null;
};

const patchBackendId = (
	optionsData: TOptionsData,
	activeOption: string,
	tempBlockId: string,
	backendId: string,
	id?: string
): IOptionData | null => {
	const optData = optionsData[activeOption];
	if (!optData) return null;

	let found = false;

	const days: Record<number, IDayItem[]> = {};
	for (const [dayKey, dayItems] of Object.entries(optData.days)) {
		const day = Number(dayKey);
		days[day] = dayItems.map((item) => {
			const patched = patchItemBackendId(
				item,
				tempBlockId,
				backendId,
				id
			);
			if (patched) {
				found = true;
				return patched;
			}
			return item;
		});
	}

	const tripDetails = optData.tripDetails.map((item) => {
		const patched = patchItemBackendId(item, tempBlockId, backendId, id);
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

const collectParentOptionBackendIds = (
	optionsData: TOptionsData,
	activeOption: string,
	parentBackendId: string
): Set<string> => {
	const parent = Object.values(optionsData[activeOption]?.days || {})
		.flat()
		.concat(optionsData[activeOption]?.tripDetails || [])
		.find((item) => item.backendId === parentBackendId);

	return new Set(
		parent?.items?.map((i) => i.backendId!).filter(Boolean) || []
	);
};

export const useItineraryDnd = ({
	tourId,
	activeOption,
	eventsAsOptionData,
	emptyOptionData
}: IUseItineraryDndParams) => {
	const { t, i18n } = useTranslation("tour_itinerary_page");
	const { t: tEvents } = useTranslation("common_events");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

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
		status: [],
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

	const addOptionQueuesRef = useRef(new Map<string, Promise<void>>());

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
	const [copyTourEvent] = useCopyTourEventMutation();
	const [copyEventLibrary] = useCopyEventLibraryMutation();
	const [getEventLibraryTemplate] = useLazyGetEventLibraryTemplateQuery();
	const [reorderEvent] = useReorderEventMutation();
	const [deleteEvent] = useDeleteTourEventMutation();
	const [addEventOption] = useAddOptionMutation();
	const [deleteEventOption] = useDeleteTourEventOptionMutation();
	const [reorderEventOptions] = useReorderEventOptionsMutation();
	const [moveEventToMulti] = useMoveEventToMultiMutation();
	const [moveOptionToSingle] = useMoveOptionToSingleMutation();

	/** `id` — option row id (`event.id`); defaults to `backendId` for alternatives. */
	const applyBackendIdPatch = (
		tempBlockId: string,
		backendId: string,
		id?: string
	) => {
		const current = watch("optionsData");
		const updated = patchBackendId(
			current,
			activeOption,
			tempBlockId,
			backendId,
			id
		);
		if (updated) {
			setValue(
				`optionsData.${activeOption}` as `optionsData.${string}`,
				updated
			);
		}
	};

	const rollbackTempItem = (tempBlockId: string) => {
		const current = watch("optionsData");
		const loc = findItemLocation(current, tempBlockId);
		if (!loc) return;
		setValue("optionsData", removeItemFromData(current, loc));
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
					applyBackendIdPatch(
						action.tempBlockId,
						newEvent.id,
						newEvent.eventOptionId
					);
					return t("toasts.event.create.success");
				},
				error: () => {
					rollbackTempItem(action.tempBlockId);
					return t("toasts.event.create.error");
				}
			});
		} else if (action.type === "createFromLibrary") {
			// Server-side copy: pool with pins/overrides and pictures (new files).
			const createFromLibraryPromise = copyTourEvent({
				tourId,
				optionId: activeOption,
				source: {
					kind: "library",
					libraryId: action.templateId,
					day: action.day,
					position: action.position
				}
			}).unwrap();

			toast.promise(createFromLibraryPromise, {
				loading: t("toasts.event.create.loading"),
				success: (newEvent) => {
					applyBackendIdPatch(
						action.tempBlockId,
						newEvent.id,
						newEvent.eventOptionId
					);
					return t("toasts.event.create.success");
				},
				error: (error: unknown) => {
					rollbackTempItem(action.tempBlockId);
					const code = resolveCopyEventErrorCode(error);
					return code
						? tEvents(`copy.errors.${code}`)
						: t("toasts.event.create.error");
				}
			});
		} else if (action.type === "addOption") {
			const addPromise = enqueueByKey(
				addOptionQueuesRef.current,
				action.parentBackendId,
				async () => {
					const prevIds = collectParentOptionBackendIds(
						watch("optionsData"),
						activeOption,
						action.parentBackendId
					);

					try {
						const parentEvent = await addEventOption({
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

						const newId = findNewestOptionId(
							prevIds,
							parentEvent.options
						);
						if (newId) {
							applyBackendIdPatch(action.tempBlockId, newId);
						}
					} catch (error) {
						rollbackTempItem(action.tempBlockId);
						throw error;
					}
				}
			);

			toast.promise(addPromise, {
				loading: t("toasts.event.create.loading"),
				success: t("toasts.event.create.success"),
				error: t("toasts.event.create.error")
			});
		} else if (action.type === "addOptionFromLibrary") {
			const addFromLibraryPromise = enqueueByKey(
				addOptionQueuesRef.current,
				action.parentBackendId,
				async () => {
					const prevIds = collectParentOptionBackendIds(
						watch("optionsData"),
						activeOption,
						action.parentBackendId
					);

					try {
						const template = await getEventLibraryTemplate(
							action.templateId
						).unwrap();
						const data = mapLibraryTemplateToCreateEvent(
							template,
							action.day,
							action.position
						);
						const parentEvent = await addEventOption({
							tourId,
							optionId: activeOption,
							eventId: action.parentBackendId,
							type: data.eventType,
							data
						}).unwrap();

						const newId = findNewestOptionId(
							prevIds,
							parentEvent.options
						);
						if (newId) {
							applyBackendIdPatch(action.tempBlockId, newId);
						}
					} catch (error) {
						rollbackTempItem(action.tempBlockId);
						throw error;
					}
				}
			);

			toast.promise(addFromLibraryPromise, {
				loading: t("toasts.event.create.loading"),
				success: t("toasts.event.create.success"),
				error: t("toasts.event.create.error")
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
				targetEventId: action.targetEventId,
				optionPosition: action.optionPosition
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
			// Contract 3.1: the final slot placement travels in the SAME request —
			// no follow-up reorderEvent, no intermediate inconsistent state.
			const movePromise = (async () => {
				const result = await moveOptionToSingle({
					tourId,
					optionId: activeOption,
					eventId: action.parentEventId,
					eventOptionId: action.eventOptionId,
					target: { day: action.day, position: action.position }
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

	const getItemAt = (loc: IItemLocation): IDayItem | undefined => {
		const optData = optionsData[loc.optionId];
		const parent =
			loc.location === "day" && loc.day !== undefined
				? optData?.days[loc.day]?.[loc.index]
				: optData?.tripDetails[loc.index];

		return loc.nestedIndex !== undefined
			? parent?.items?.[loc.nestedIndex]
			: parent;
	};

	const copyErrorMessage = (
		error: unknown,
		fallback:
			| "toasts.event.duplicate.error"
			| "toasts.event.save_to_library.error"
	) => {
		const code = resolveCopyEventErrorCode(error);
		return code ? tEvents(`copy.errors.${code}`) : t(fallback);
	};

	const handleDuplicateItem = (loc: IItemLocation) => {
		const item = getItemAt(loc);
		if (!item?.backendId) return;

		// The copy lands right after its source; the list refetches by tag.
		const duplicatePromise = copyTourEvent({
			tourId,
			optionId: activeOption,
			source: { kind: "event", eventId: item.backendId },
			language
		}).unwrap();

		toast.promise(duplicatePromise, {
			loading: t("toasts.event.duplicate.loading"),
			success: t("toasts.event.duplicate.success"),
			error: (error: unknown) =>
				copyErrorMessage(error, "toasts.event.duplicate.error")
		});
	};

	const handleSaveItemToLibrary = (loc: IItemLocation) => {
		const item = getItemAt(loc);
		if (!item?.backendId) return;

		// `item.id` is the option row: `event.id` on a single, `details[].id` on an alternative.
		const savePromise = copyEventLibrary({
			source: {
				kind: "event",
				tourId,
				optionId: activeOption,
				eventOptionId: item.id
			},
			language
		}).unwrap();

		toast.promise(savePromise, {
			loading: t("toasts.event.save_to_library.loading"),
			success: t("toasts.event.save_to_library.success"),
			error: (error: unknown) =>
				copyErrorMessage(error, "toasts.event.save_to_library.error")
		});
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

		// The library sheet closes on drag start, unmounting the draggable —
		// dnd-kit then drops `active.data`, and `libraryItemsById` only holds
		// the first page. Keep the item captured at drag start resolvable.
		const libraryLookup = activeLibraryItem
			? { ...libraryItemsById, [activeLibraryItem.id]: activeLibraryItem }
			: libraryItemsById;

		const result = handleDragEnd(
			event,
			optionsData,
			activeOption,
			libraryLookup
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
		handleRemoveItem,
		handleDuplicateItem,
		handleSaveItemToLibrary
	};
};
