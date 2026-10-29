import { Plus, Trash2 } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, withErrorBoundary } from "@/shared/ui";

import { ENUM_FORM_GUIDES, type TGuideEditSchema } from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	GUIDE_DURATION_FIELD,
	GUIDE_TYP_TIER_FIELDS_LIST,
	createEmptyGuideTypTier
} from "../../model";

const TYP_TIER_ROW_GRID =
	"grid grid-cols-[minmax(0,14rem)_minmax(0,10rem)_auto] items-start gap-3";

interface IGuidesDetailsProps {
	form: UseFormReturn<TGuideEditSchema>;
}

const GuidesDetailsBase: FC<IGuidesDetailsProps> = ({ form }) => {
	const { t } = useTranslation("guide_edit_page");
	const tierFields = GUIDE_TYP_TIER_FIELDS_LIST();
	const tiersPath =
		`${ENUM_FORM_SECTION.GUIDES}.${ENUM_FORM_GUIDES.TYP_TIERS}` as const;

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: tiersPath
	});

	const { key: durationKey, ...durationField } = GUIDE_DURATION_FIELD;

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.guides.details.title")}</h2>

			<div className="max-w-xs">
				<CustomField
					control={form.control}
					name={`${ENUM_FORM_SECTION.GUIDES}.${durationKey}`}
					t={t}
					{...durationField}
				/>
			</div>

			<div className="grid gap-3">
				<div className="grid gap-1">
					<h3 className="text-lg">
						{t("form.guides.details.typ_tiers.title")}
					</h3>
					<p className="text-sm text-muted-foreground">
						{t("form.guides.details.typ_tiers.hint")}
					</p>
				</div>

				{fields.length > 0 ? (
					<div className={TYP_TIER_ROW_GRID}>
						{tierFields.map(({ key, label }) => (
							<span
								key={key}
								className="text-xs font-medium text-muted-foreground"
							>
								{label ? t(label) : null}
							</span>
						))}
						<span aria-hidden />
					</div>
				) : (
					<p className="text-sm text-muted-foreground">
						{t("form.guides.details.typ_tiers.empty")}
					</p>
				)}

				{fields.map((field, index) => (
					<div key={field.id} className={TYP_TIER_ROW_GRID}>
						{tierFields.map(({ key, ...item }) => (
							<CustomField
								key={key}
								control={form.control}
								name={`${tiersPath}.${index}.${key}`}
								t={t}
								hideLabel
								className="min-w-0"
								{...item}
							/>
						))}
						<Button
							type="button"
							variant="destructive"
							size="icon"
							onClick={() => remove(index)}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				))}

				<Button
					type="button"
					variant="outline"
					className="w-fit"
					onClick={() => append(createEmptyGuideTypTier())}
				>
					<Plus className="mr-2 h-4 w-4" />
					{t("form.guides.details.typ_tiers.buttons.add")}
				</Button>
			</div>
		</div>
	);
};

export const GuidesDetails = withErrorBoundary(GuidesDetailsBase);
