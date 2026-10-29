import { Plus, X } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField } from "@/shared/ui";

import {
	ENUM_GUIDE_CHARGE,
	ENUM_GUIDE_PRICE_BOUND_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	GUIDE_MAX_PRICE_COLUMNS,
	type TGuideEditSchema,
	createEmptyGuidePriceRow
} from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	GUIDE_PRICE_BOUND_FIELD,
	GUIDE_PRICE_LANG_FIELD
} from "../../model";

import { GuidePriceMatrixRow } from "./guide-price-matrix-row";

const BOUNDS_PATH =
	`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.BOUNDS}` as const;
const ROWS_PATH =
	`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.ROWS}` as const;
const CHARGE_TYP_PATH =
	`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP}` as const;

interface IGuidePriceMatrixProps {
	form: UseFormReturn<TGuideEditSchema>;
}

/** Rows are languages, columns are group-size steps shared by every language. */
export const GuidePriceMatrix: FC<IGuidePriceMatrixProps> = ({ form }) => {
	const { t } = useTranslation("guide_edit_page");
	const langOptionsCount = GUIDE_PRICE_LANG_FIELD().options.length;
	const { key: boundKey, ...boundField } = GUIDE_PRICE_BOUND_FIELD;

	const bounds = useFieldArray({ control: form.control, name: BOUNDS_PATH });
	const rows = useFieldArray({ control: form.control, name: ROWS_PATH });
	const [chargeTyp, boundValues] = useWatch({
		control: form.control,
		name: [CHARGE_TYP_PATH, BOUNDS_PATH]
	});
	// Only the languages: typing a price must not re-render the whole matrix.
	const takenLangs: string[] =
		useWatch({
			control: form.control,
			name: rows.fields.map(
				(_, index) =>
					`${ROWS_PATH}.${index}.${ENUM_GUIDE_PRICE_ROW_FIELD.LANG}` as const
			)
		}) ?? [];
	const isEveryLangTaken =
		takenLangs.filter(Boolean).length >= langOptionsCount;

	const isPerDuration = chargeTyp === ENUM_GUIDE_CHARGE.PER_DURATION;
	const columns = isPerDuration ? bounds.fields.length + 1 : 1;
	const lastBound =
		boundValues?.at(-1)?.[ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX];

	// Costs are positional: every column change reshapes each row alike.
	const spliceRowsCosts = (
		column: number,
		deleteCount: number,
		...insert: null[]
	) => {
		form.getValues(ROWS_PATH).forEach((row, index) => {
			const costs = Array.from(
				{ length: columns },
				(_, item) => row[ENUM_GUIDE_PRICE_ROW_FIELD.COSTS][item] ?? null
			);
			costs.splice(column, deleteCount, ...insert);
			form.setValue(
				`${ROWS_PATH}.${index}.${ENUM_GUIDE_PRICE_ROW_FIELD.COSTS}`,
				costs,
				{ shouldDirty: true }
			);
		});
	};

	// The new bound splits the open last column.
	const addColumn = () => {
		bounds.append({ [ENUM_GUIDE_PRICE_BOUND_FIELD.UP_TO_PAX]: null });
		spliceRowsCosts(columns - 1, 0, null);
	};

	// A column merges into the next one; the last one hands its bound back.
	const removeColumn = (column: number) => {
		bounds.remove(Math.min(column, bounds.fields.length - 1));
		spliceRowsCosts(column, 1);
	};

	// Only the last column has no bound input: it is open-ended.
	const getOpenColumnTitle = () => {
		if (!isPerDuration) return t("form.pricing.form.matrix.columns.trip");
		if (!bounds.fields.length) {
			return t("form.pricing.form.matrix.columns.any_size");
		}
		return t("form.pricing.form.matrix.columns.above", {
			pax: lastBound ?? "…"
		});
	};

	const gridTemplateColumns = `minmax(10rem, 14rem) repeat(${columns}, minmax(9rem, 10rem)) 2.25rem`;

	return (
		<div className="grid gap-3">
			<p className="text-sm text-muted-foreground">
				{t(
					isPerDuration
						? "form.pricing.form.matrix.hint.per_duration"
						: "form.pricing.form.matrix.hint.fixed"
				)}
			</p>

			{/* Room for the absolute error under the last row: overflow-x
			    turns overflow-y into auto, which would scroll it. */}
			<div className="overflow-x-auto pb-6">
				<div
					className="grid w-max items-start gap-x-3 gap-y-6"
					style={{ gridTemplateColumns }}
				>
					<span className="self-center text-xs font-medium text-muted-foreground">
						{t("form.pricing.form.matrix.columns.lang")}
					</span>
					{Array.from({ length: columns }, (_, column) => (
						<div key={column} className="flex items-start gap-1">
							{column < bounds.fields.length && isPerDuration ? (
								<CustomField
									control={form.control}
									name={`${BOUNDS_PATH}.${column}.${boundKey}`}
									t={t}
									hideLabel
									className="min-w-0 flex-1"
									{...boundField}
								/>
							) : (
								<span className="flex h-9 flex-1 items-center text-xs font-medium text-muted-foreground">
									{getOpenColumnTitle()}
								</span>
							)}
							{columns > 1 ? (
								<Button
									type="button"
									variant="ghost"
									size="icon"
									aria-label={t(
										"form.pricing.form.matrix.buttons.remove_column"
									)}
									onClick={() => removeColumn(column)}
								>
									<X className="h-4 w-4" />
								</Button>
							) : null}
						</div>
					))}
					<span aria-hidden />

					{rows.fields.map((field, rowIndex) => (
						<GuidePriceMatrixRow
							key={field.id}
							form={form}
							rowIndex={rowIndex}
							columns={columns}
							takenLangs={takenLangs}
							onRemove={() => rows.remove(rowIndex)}
						/>
					))}
				</div>
			</div>

			{!rows.fields.length ? (
				<p className="text-sm text-muted-foreground">
					{t("form.pricing.form.matrix.empty")}
				</p>
			) : null}

			<div className="flex flex-wrap gap-3">
				<Button
					type="button"
					variant="outline"
					disabled={isEveryLangTaken}
					onClick={() =>
						rows.append(createEmptyGuidePriceRow(columns))
					}
				>
					<Plus className="mr-2 h-4 w-4" />
					{t("form.pricing.form.matrix.buttons.add_language")}
				</Button>
				{isPerDuration ? (
					<Button
						type="button"
						variant="outline"
						disabled={columns >= GUIDE_MAX_PRICE_COLUMNS}
						onClick={addColumn}
					>
						<Plus className="mr-2 h-4 w-4" />
						{t("form.pricing.form.matrix.buttons.add_column")}
					</Button>
				) : null}
			</div>
		</div>
	);
};
