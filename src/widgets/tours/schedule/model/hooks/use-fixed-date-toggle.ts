import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { IFixedDate } from "@/entities/tour";
import {
	useAddFixedDateMutation,
	useRemoveFixedDateMutation
} from "@/entities/tour";

import { dateToDayTimestamp } from "../lib/calendar-range";
import {
	isPendingId,
	mergeDatesWithPending,
	parsePendingTimestamp,
	prunePendingState
} from "../lib/pending-dates";

interface IUseFixedDateToggleProps {
	tourId: string;
	fixedDates: IFixedDate[];
}

export const useFixedDateToggle = ({
	tourId,
	fixedDates
}: IUseFixedDateToggleProps) => {
	const { t } = useTranslation("tour_schedule_page");
	const [addFixedDate] = useAddFixedDateMutation();
	const [removeFixedDate] = useRemoveFixedDateMutation();
	const abortedAddsRef = useRef(new Set<number>());

	const [pendingAdd, setPendingAdd] = useState<Map<number, Date>>(
		() => new Map()
	);
	const [pendingRemoveIds, setPendingRemoveIds] = useState<Set<string>>(
		() => new Set()
	);

	const displayFixedDates = useMemo(
		() => mergeDatesWithPending(fixedDates, pendingAdd, pendingRemoveIds),
		[fixedDates, pendingAdd, pendingRemoveIds]
	);

	useEffect(() => {
		const pruned = prunePendingState(
			fixedDates,
			pendingAdd,
			pendingRemoveIds
		);

		if (pruned.pendingAdd !== pendingAdd) {
			setPendingAdd(pruned.pendingAdd);
		}
		if (pruned.pendingRemoveIds !== pendingRemoveIds) {
			setPendingRemoveIds(pruned.pendingRemoveIds);
		}
	}, [fixedDates, pendingAdd, pendingRemoveIds]);

	const rollbackPendingAdd = useCallback((ts: number) => {
		setPendingAdd((prev) => {
			const next = new Map(prev);
			next.delete(ts);
			return next;
		});
		abortedAddsRef.current.delete(ts);
	}, []);

	const removeDate = useCallback(
		(dateId: string) => {
			if (isPendingId(dateId)) {
				const ts = parsePendingTimestamp(dateId);
				abortedAddsRef.current.add(ts);
				rollbackPendingAdd(ts);
				return;
			}

			setPendingRemoveIds((prev) => new Set(prev).add(dateId));

			const promise = removeFixedDate({ tourId, dateId }).unwrap();

			toast.promise(promise, {
				loading: t("fixed_dates.toasts.remove.loading"),
				success: t("fixed_dates.toasts.remove.success"),
				error: () => {
					setPendingRemoveIds((prev) => {
						const next = new Set(prev);
						next.delete(dateId);
						return next;
					});
					return t("fixed_dates.toasts.remove.error");
				}
			});
		},
		[removeFixedDate, rollbackPendingAdd, t, tourId]
	);

	const handleCalendarSelect = useCallback(
		(newDates: Date[] | undefined) => {
			if (!newDates) return;

			const prevTimestamps = displayFixedDates.map((d) =>
				dateToDayTimestamp(d.value)
			);
			const newTimestamps = newDates.map((d) => dateToDayTimestamp(d));

			const toAdd = newDates.filter(
				(d) => !prevTimestamps.includes(dateToDayTimestamp(d))
			);
			const toRemove = displayFixedDates.filter(
				(d) => !newTimestamps.includes(dateToDayTimestamp(d.value))
			);

			if (toAdd.length === 0 && toRemove.length === 0) return;

			toAdd.forEach((day) => {
				const ts = dateToDayTimestamp(day);
				if (
					pendingAdd.has(ts) ||
					fixedDates.some((d) => dateToDayTimestamp(d.value) === ts)
				) {
					return;
				}
				abortedAddsRef.current.delete(ts);
				setPendingAdd((prev) => new Map(prev).set(ts, day));
			});

			toRemove.forEach((item) => {
				if (isPendingId(item.id)) {
					const ts = parsePendingTimestamp(item.id);
					abortedAddsRef.current.add(ts);
					rollbackPendingAdd(ts);
					return;
				}
				setPendingRemoveIds((prev) => new Set(prev).add(item.id));
			});

			const addPromises = toAdd.map((day) =>
				addFixedDate({ tourId, data: { value: day } }).unwrap()
			);
			const removePromises = toRemove
				.filter((item) => !isPendingId(item.id))
				.map((item) =>
					removeFixedDate({ tourId, dateId: item.id }).unwrap()
				);

			const batchPromise = Promise.all([
				...addPromises,
				...removePromises
			]);

			void batchPromise.then((results) => {
				toAdd.forEach((day, index) => {
					const ts = dateToDayTimestamp(day);
					if (!abortedAddsRef.current.has(ts)) return;
					const created = results[index] as IFixedDate;
					abortedAddsRef.current.delete(ts);
					void removeFixedDate({ tourId, dateId: created.id });
				});
			});

			const hasAdds = toAdd.length > 0;

			toast.promise(batchPromise, {
				loading: hasAdds
					? t("fixed_dates.toasts.add.loading")
					: t("fixed_dates.toasts.remove.loading"),
				success: hasAdds
					? t("fixed_dates.toasts.add.success")
					: t("fixed_dates.toasts.remove.success"),
				error: () => {
					toAdd.forEach((day) =>
						rollbackPendingAdd(dateToDayTimestamp(day))
					);
					toRemove.forEach((item) => {
						if (isPendingId(item.id)) return;
						setPendingRemoveIds((prev) => {
							const next = new Set(prev);
							next.delete(item.id);
							return next;
						});
					});
					return hasAdds
						? t("fixed_dates.toasts.add.error")
						: t("fixed_dates.toasts.remove.error");
				}
			});
		},
		[
			addFixedDate,
			displayFixedDates,
			fixedDates,
			pendingAdd,
			removeFixedDate,
			rollbackPendingAdd,
			t,
			tourId
		]
	);

	return {
		displayFixedDates,
		handleCalendarSelect,
		removeFixedDate: removeDate
	};
};
