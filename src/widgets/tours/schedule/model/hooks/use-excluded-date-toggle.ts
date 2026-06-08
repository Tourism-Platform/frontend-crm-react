import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { IExcludedDate } from "@/entities/tour";
import {
	useAddExcludedDateMutation,
	useRemoveExcludedDateMutation
} from "@/entities/tour";

import { dateToDayTimestamp } from "../lib/calendar-range";
import {
	isPendingId,
	mergeDatesWithPending,
	parsePendingTimestamp,
	prunePendingState
} from "../lib/pending-dates";

interface IUseExcludedDateToggleProps {
	tourId: string;
	excludedDates: IExcludedDate[];
}

export const useExcludedDateToggle = ({
	tourId,
	excludedDates
}: IUseExcludedDateToggleProps) => {
	const { t } = useTranslation("tour_schedule_page");
	const [addExcludedDate] = useAddExcludedDateMutation();
	const [removeExcludedDate] = useRemoveExcludedDateMutation();
	const abortedAddsRef = useRef(new Set<number>());

	const [pendingAdd, setPendingAdd] = useState<Map<number, Date>>(
		() => new Map()
	);
	const [pendingRemoveIds, setPendingRemoveIds] = useState<Set<string>>(
		() => new Set()
	);

	const displayExcludedDates = useMemo(
		() =>
			mergeDatesWithPending(excludedDates, pendingAdd, pendingRemoveIds),
		[excludedDates, pendingAdd, pendingRemoveIds]
	);

	useEffect(() => {
		const pruned = prunePendingState(
			excludedDates,
			pendingAdd,
			pendingRemoveIds
		);

		if (pruned.pendingAdd !== pendingAdd) {
			setPendingAdd(pruned.pendingAdd);
		}
		if (pruned.pendingRemoveIds !== pendingRemoveIds) {
			setPendingRemoveIds(pruned.pendingRemoveIds);
		}
	}, [excludedDates, pendingAdd, pendingRemoveIds]);

	const excludeDate = useCallback(
		(day: Date) => {
			const ts = dateToDayTimestamp(day);
			if (
				pendingAdd.has(ts) ||
				excludedDates.some((d) => dateToDayTimestamp(d.value) === ts)
			) {
				return;
			}

			abortedAddsRef.current.delete(ts);
			setPendingAdd((prev) => new Map(prev).set(ts, day));

			const promise = addExcludedDate({
				tourId,
				data: { value: day }
			}).unwrap();

			void promise.then((created) => {
				if (abortedAddsRef.current.has(ts)) {
					abortedAddsRef.current.delete(ts);
					void removeExcludedDate({
						tourId,
						dateId: created.id
					});
				}
			});

			toast.promise(promise, {
				loading: t("excluded_dates.toasts.add.loading"),
				success: t("excluded_dates.toasts.add.success"),
				error: () => {
					setPendingAdd((current) => {
						const map = new Map(current);
						map.delete(ts);
						return map;
					});
					abortedAddsRef.current.delete(ts);
					return t("excluded_dates.toasts.add.error");
				}
			});
		},
		[
			addExcludedDate,
			excludedDates,
			pendingAdd,
			removeExcludedDate,
			t,
			tourId
		]
	);

	const restoreDate = useCallback(
		(dateId: string) => {
			if (isPendingId(dateId)) {
				const ts = parsePendingTimestamp(dateId);
				abortedAddsRef.current.add(ts);
				setPendingAdd((prev) => {
					const next = new Map(prev);
					next.delete(ts);
					return next;
				});
				return;
			}

			setPendingRemoveIds((prev) => new Set(prev).add(dateId));

			const promise = removeExcludedDate({ tourId, dateId }).unwrap();

			toast.promise(promise, {
				loading: t("excluded_dates.toasts.remove.loading"),
				success: t("excluded_dates.toasts.remove.success"),
				error: () => {
					setPendingRemoveIds((prev) => {
						const next = new Set(prev);
						next.delete(dateId);
						return next;
					});
					return t("excluded_dates.toasts.remove.error");
				}
			});
		},
		[removeExcludedDate, t, tourId]
	);

	return { displayExcludedDates, excludeDate, restoreDate };
};
