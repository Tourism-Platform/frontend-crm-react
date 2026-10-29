import { Trash2 } from "lucide-react";
import { type FC, useMemo } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField } from "@/shared/ui";

import {
	ENUM_GUIDE_PRICE_ROW_FIELD,
	ENUM_GUIDE_PRICING_FIELD,
	type TGuideEditSchema
} from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	GUIDE_PRICE_COST_FIELD,
	GUIDE_PRICE_LANG_FIELD
} from "../../model";

interface IGuidePriceMatrixRowProps {
	form: UseFormReturn<TGuideEditSchema>;
	rowIndex: number;
	columns: number;
	/** Language of every row, this one included. */
	takenLangs: string[];
	onRemove: () => void;
}

/** One language: watches only its own language, its prices stay local. */
export const GuidePriceMatrixRow: FC<IGuidePriceMatrixRowProps> = ({
	form,
	rowIndex,
	columns,
	takenLangs,
	onRemove
}) => {
	const { t } = useTranslation("guide_edit_page");
	const { key: langKey, ...langField } = GUIDE_PRICE_LANG_FIELD();
	const { key: costsKey, ...costField } = GUIDE_PRICE_COST_FIELD;
	const rowPath =
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_GUIDE_PRICING_FIELD.ROWS}.${rowIndex}` as const;

	const ownLang = useWatch({
		control: form.control,
		name: `${rowPath}.${ENUM_GUIDE_PRICE_ROW_FIELD.LANG}`
	});

	// Other rows' languages are hidden; the own one stays so its label shows.
	const langOptions = useMemo(
		() =>
			langField.options.filter(
				({ value }) => value === ownLang || !takenLangs.includes(value)
			),
		[langField.options, ownLang, takenLangs]
	);

	return (
		<div className="contents">
			<CustomField
				control={form.control}
				name={`${rowPath}.${langKey}`}
				t={t}
				hideLabel
				className="min-w-0"
				{...langField}
				options={langOptions}
			/>
			{Array.from({ length: columns }, (_, column) => (
				<CustomField
					key={column}
					control={form.control}
					name={`${rowPath}.${costsKey}.${column}`}
					t={t}
					hideLabel
					className="min-w-0"
					{...costField}
				/>
			))}
			<Button
				type="button"
				variant="destructive"
				size="icon"
				onClick={onRemove}
			>
				<Trash2 className="h-4 w-4" />
			</Button>
		</div>
	);
};
