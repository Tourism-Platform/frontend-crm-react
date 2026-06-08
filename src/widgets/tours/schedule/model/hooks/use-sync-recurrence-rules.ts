import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "react-redux";
import { toast } from "sonner";

import { type TRootState, useAppDispatch } from "@/shared/hooks";

import {
	type IRecurrenceRule,
	refetchAllScheduleQueries,
	useBulkAddRecurrenceRulesMutation,
	useRemoveRecurrenceRuleMutation
} from "@/entities/tour";

import { areCalendarDatesEqual } from "../lib/calendar-range";

interface IUseSyncRecurrenceRulesProps {
	tourId: string;
	recurrenceRules: IRecurrenceRule[];
}

export type TRecurrencePatternDraft = {
	days: number[];
	from?: Date;
	to?: Date;
};

export type TRecurrenceFormValues = {
	days: string[];
	period?: { from?: Date; to?: Date };
};

const sortDays = (days: number[]): number[] => [...days].sort((a, b) => a - b);

const areDaysEqual = (a: number[], b: number[]): boolean => {
	const sa = sortDays(a);
	const sb = sortDays(b);
	return sa.length === sb.length && sa.every((day, i) => day === sb[i]);
};

const getServerSnapshot = (recurrenceRules: IRecurrenceRule[]) => {
	const days = recurrenceRules
		.map((rule) => rule.day)
		.filter((day): day is number => day !== null && day !== undefined);

	const first = recurrenceRules[0];

	return {
		days: sortDays([...new Set(days)]),
		from: first?.validFrom ?? undefined,
		to: first?.validUntil ?? undefined
	};
};

export const isRecurrenceFormDirty = (
	days: number[],
	from: Date | undefined,
	to: Date | undefined,
	recurrenceRules: IRecurrenceRule[]
): boolean => {
	const server = getServerSnapshot(recurrenceRules);
	return (
		!areDaysEqual(days, server.days) ||
		!areCalendarDatesEqual(from, server.from) ||
		!areCalendarDatesEqual(to, server.to)
	);
};

export const isRecurrencePatternReady = (
	days: number[],
	from: Date | undefined,
	to: Date | undefined
): boolean => days.length > 0 && Boolean(from) && Boolean(to);

const isDirty = (
	days: number[],
	from: Date | undefined,
	to: Date | undefined,
	server: ReturnType<typeof getServerSnapshot>
): boolean =>
	!areDaysEqual(days, server.days) ||
	!areCalendarDatesEqual(from, server.from) ||
	!areCalendarDatesEqual(to, server.to);

const isReadyToSave = (
	days: number[],
	from: Date | undefined,
	to: Date | undefined
): boolean => days.length === 0 || isRecurrencePatternReady(days, from, to);

export const mapRecurrenceRulesToForm = (
	recurrenceRules: IRecurrenceRule[]
): TRecurrenceFormValues => {
	const days = recurrenceRules
		.map((rule) => rule.day)
		.filter((day): day is number => day !== null && day !== undefined)
		.map(String);

	return {
		days: [...new Set(days)],
		period: {
			from: recurrenceRules[0]?.validFrom ?? undefined,
			to: recurrenceRules[0]?.validUntil ?? undefined
		}
	};
};

export const useSyncRecurrenceRules = ({
	tourId,
	recurrenceRules
}: IUseSyncRecurrenceRulesProps) => {
	const { t } = useTranslation("tour_schedule_page");
	const dispatch = useAppDispatch();
	const store = useStore<TRootState>();
	const [bulkAddRules] = useBulkAddRecurrenceRulesMutation();
	const [removeRule] = useRemoveRecurrenceRuleMutation();
	const [isSyncing, setIsSyncing] = useState(false);
	const isSyncingRef = useRef(false);
	const recurrenceRulesRef = useRef(recurrenceRules);
	recurrenceRulesRef.current = recurrenceRules;

	const serverSnapshot = useMemo(
		() => getServerSnapshot(recurrenceRules),
		[recurrenceRules]
	);

	const syncRules = useCallback(
		async (
			days: number[],
			validFrom?: Date,
			validUntil?: Date
		): Promise<void> => {
			if (!isDirty(days, validFrom, validUntil, serverSnapshot)) {
				return;
			}

			if (!isReadyToSave(days, validFrom, validUntil)) {
				return;
			}

			if (isSyncingRef.current) return;

			isSyncingRef.current = true;
			setIsSyncing(true);

			const ruleIds = recurrenceRulesRef.current.map((rule) => rule.id);

			const promise = (async () => {
				for (const ruleId of ruleIds) {
					await removeRule({ tourId, ruleId }).unwrap();
				}

				if (days.length > 0 && validFrom && validUntil) {
					await bulkAddRules({
						tourId,
						rules: days.map((day) => ({
							day,
							validFrom,
							validUntil
						}))
					}).unwrap();
				}

				refetchAllScheduleQueries(dispatch, store.getState, tourId);
			})();

			toast.promise(promise, {
				loading: t("recurring.toasts.loading"),
				success: t("recurring.toasts.success"),
				error: t("recurring.toasts.error")
			});

			promise
				.catch((error) => {
					console.error(error);
				})
				.finally(() => {
					isSyncingRef.current = false;
					setIsSyncing(false);
				});
		},
		[bulkAddRules, dispatch, removeRule, serverSnapshot, store, t, tourId]
	);

	return { syncRules, isSyncing };
};
