import { currencyConverter } from "@/entities/commission";

import {
	ENUM_EXTRA_COST_FIELD,
	ENUM_EXTRA_COST_MODE,
	type IExtraCostFormRow,
	type TExtraCostBackend,
	type TExtraCostInputBackend,
	type TFixedExpenseInputBackend,
	createEmptyExtraCostRow
} from "../../../types";

type TMoneyBackend = TFixedExpenseInputBackend["cost"];

const fromMoney = (
	money: TMoneyBackend
): Pick<
	IExtraCostFormRow,
	typeof ENUM_EXTRA_COST_FIELD.COST | typeof ENUM_EXTRA_COST_FIELD.CURRENCY
> => ({
	[ENUM_EXTRA_COST_FIELD.COST]: money.val,
	[ENUM_EXTRA_COST_FIELD.CURRENCY]:
		currencyConverter.from(money.currency) ?? null
});

export const mapExtraCostFromBackend = (
	line: TExtraCostBackend | TExtraCostInputBackend
): IExtraCostFormRow => {
	const row: IExtraCostFormRow = {
		...createEmptyExtraCostRow(),
		[ENUM_EXTRA_COST_FIELD.NAME]: line.name
	};
	const expense = line.expense;

	if (expense.typ === "fixed") {
		return {
			...row,
			[ENUM_EXTRA_COST_FIELD.MODE]: ENUM_EXTRA_COST_MODE.TRIP,
			...fromMoney(expense.cost)
		};
	}
	if (expense.typ === "per_person") {
		return {
			...row,
			[ENUM_EXTRA_COST_FIELD.MODE]: ENUM_EXTRA_COST_MODE.PER_PERSON,
			...fromMoney(expense.cost_per_person)
		};
	}
	if (expense.rate.typ === "fixed") {
		return {
			...row,
			[ENUM_EXTRA_COST_FIELD.MODE]: ENUM_EXTRA_COST_MODE.PER_DAY,
			...fromMoney(expense.rate.cost)
		};
	}
	if (expense.rate.typ === "per_person") {
		return {
			...row,
			[ENUM_EXTRA_COST_FIELD.MODE]: ENUM_EXTRA_COST_MODE.PER_PERSON_DAY,
			...fromMoney(expense.rate.cost_per_person)
		};
	}
	// Per-day group-size tiers: no editor, written back as read.
	return {
		...row,
		[ENUM_EXTRA_COST_FIELD.RAW]: line as TExtraCostInputBackend
	};
};

export const mapExtraCostToBackend = (
	row: IExtraCostFormRow
): TExtraCostInputBackend => {
	const raw = row[ENUM_EXTRA_COST_FIELD.RAW];
	if (raw) return raw;

	const currency = row[ENUM_EXTRA_COST_FIELD.CURRENCY];
	const money: TMoneyBackend = {
		val: row[ENUM_EXTRA_COST_FIELD.COST] ?? 0,
		...(currency && { currency: currencyConverter.to(currency)! })
	};
	const name = row[ENUM_EXTRA_COST_FIELD.NAME]?.trim() ?? "";

	switch (row[ENUM_EXTRA_COST_FIELD.MODE]) {
		case ENUM_EXTRA_COST_MODE.TRIP:
			return { name, expense: { typ: "fixed", cost: money } };
		case ENUM_EXTRA_COST_MODE.PER_PERSON:
			return {
				name,
				expense: { typ: "per_person", cost_per_person: money }
			};
		case ENUM_EXTRA_COST_MODE.PER_PERSON_DAY:
			return {
				name,
				expense: {
					typ: "per_duration",
					rate: { typ: "per_person", cost_per_person: money }
				}
			};
		default:
			return {
				name,
				expense: {
					typ: "per_duration",
					rate: { typ: "fixed", cost: money }
				}
			};
	}
};

export const mapExtraCostsFromBackend = (
	lines?: (TExtraCostBackend | TExtraCostInputBackend)[] | null
): IExtraCostFormRow[] => (lines ?? []).map(mapExtraCostFromBackend);

export const mapExtraCostsToBackend = (
	rows: IExtraCostFormRow[] | null | undefined
): TExtraCostInputBackend[] => (rows ?? []).map(mapExtraCostToBackend);
