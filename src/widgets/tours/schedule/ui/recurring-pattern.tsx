import { type FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useDebounce } from "@/shared/hooks";
import { CustomField, Form, withErrorBoundary } from "@/shared/ui";
import type { Option } from "@/shared/ui/shadcn-ui/multiselect";

import type { IRecurrenceRule } from "@/entities/tour";

import { WEEKDAY_OPTIONS } from "../model/config/weekdays.config";
import {
	type TRecurrenceFormValues,
	type TRecurrencePatternDraft,
	isRecurrenceFormDirty,
	mapRecurrenceRulesToForm,
	useSyncRecurrenceRules
} from "../model/hooks/use-sync-recurrence-rules";

interface IRecurringPatternProps {
	tourId: string;
	recurrenceRules: IRecurrenceRule[];
	onDraftChange: (draft: TRecurrencePatternDraft) => void;
}

const RecurringPatternBase: FC<IRecurringPatternProps> = ({
	tourId,
	recurrenceRules,
	onDraftChange
}) => {
	const { t } = useTranslation("tour_schedule_page");
	const { syncRules, isSyncing } = useSyncRecurrenceRules({
		tourId,
		recurrenceRules
	});

	const form = useForm<TRecurrenceFormValues>({
		defaultValues: mapRecurrenceRulesToForm(recurrenceRules)
	});

	const weekdayOptions = useMemo<Option[]>(
		() =>
			WEEKDAY_OPTIONS.map((item) => ({
				value: item.value,
				label: t(item.label)
			})),
		[t]
	);

	useEffect(() => {
		if (isSyncing) return;

		const current = form.getValues();
		const currentDays = (current.days ?? []).map(Number);

		if (
			isRecurrenceFormDirty(
				currentDays,
				current.period?.from,
				current.period?.to,
				recurrenceRules
			)
		) {
			return;
		}

		form.reset(mapRecurrenceRulesToForm(recurrenceRules));
	}, [form, isSyncing, recurrenceRules]);

	const days = form.watch("days");
	const period = form.watch("period");
	const from = period?.from;
	const to = period?.to;

	const draft = useMemo<TRecurrencePatternDraft>(
		() => ({
			days: (days ?? []).map(Number),
			from,
			to
		}),
		[days, from, to]
	);

	useEffect(() => {
		onDraftChange(draft);
	}, [draft, onDraftChange]);

	const debouncedDraft = useDebounce(draft, 500);

	useEffect(() => {
		if (isSyncing) return;

		void syncRules(
			debouncedDraft.days,
			debouncedDraft.from,
			debouncedDraft.to
		);
	}, [debouncedDraft, isSyncing, syncRules]);

	return (
		<Form {...form}>
			<div className="grid w-full gap-6 sm:grid-cols-2 sm:items-start">
				<CustomField
					control={form.control}
					name="days"
					label="recurring.repeat_on.label"
					fieldType="multiselect"
					options={weekdayOptions}
					placeholder="recurring.repeat_on.placeholder"
					className="mb-0"
					badgeSize={"sm"}
					t={t}
				/>
				<CustomField
					control={form.control}
					name="period"
					label="recurring.period.label"
					fieldType="datePicker"
					className="mb-0"
					t={t}
				/>
			</div>
		</Form>
	);
};

export const RecurringPattern = withErrorBoundary(RecurringPatternBase);
