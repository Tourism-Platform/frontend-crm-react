import { Trash } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FOC_TIER_FIELD,
	ENUM_SETTINGS_FINANCE_FORM,
	type TSettingsFinanceFormSchema
} from "@/entities/tour";

import { FOC_TIER_FORM_LIST } from "../../model/config/finance.config";
import { appendFocTier, removeFocTierAt } from "../../model/lib";

interface IFocTiersDetailsProps {
	form: UseFormReturn<TSettingsFinanceFormSchema>;
}

const FocTiersDetailsBase: FC<IFocTiersDetailsProps> = ({ form }) => {
	const { t } = useTranslation("tour_settings_page");
	const tierFields = FOC_TIER_FORM_LIST();

	const { fields, replace } = useFieldArray({
		control: form.control,
		name: ENUM_SETTINGS_FINANCE_FORM.FOC_TIERS
	});

	const handleAddTier = () => {
		replace(
			appendFocTier(form.getValues(ENUM_SETTINGS_FINANCE_FORM.FOC_TIERS))
		);
	};

	const handleRemoveTier = (index: number) => {
		replace(
			removeFocTierAt(
				form.getValues(ENUM_SETTINGS_FINANCE_FORM.FOC_TIERS),
				index
			)
		);
	};

	return (
		<div className="col-span-2 grid gap-4">
			<h2 className="text-xl col-span-2">
				{t("finance.form.fields.foc.title")}
			</h2>

			<div className="flex items-center col-span-2 justify-between">
				<div className="grid grid-cols-2 font-medium gap-5">
					<p className="w-[350px]">
						{t("finance.form.fields.foc.minPax.label")}
					</p>
					<p>{t("finance.form.fields.foc.free.label")}</p>
				</div>
				<Button type="button" variant="outline" onClick={handleAddTier}>
					{t("finance.form.buttons.addFocTier")}
				</Button>
			</div>

			<div className="col-span-2 flex flex-col gap-4">
				{fields.map((field, index) => (
					<div key={field.id} className="flex items-center gap-3">
						<div className="grid grid-cols-2 gap-5">
							{tierFields.map(({ key, ...item }) => (
								<CustomField
									key={key}
									control={form.control}
									name={`${ENUM_SETTINGS_FINANCE_FORM.FOC_TIERS}.${index}.${key}`}
									hideLabel
									className={
										key === ENUM_FOC_TIER_FIELD.MIN_PAX
											? "mb-0 w-[350px]"
											: "mb-0"
									}
									t={t}
									{...item}
								/>
							))}
						</div>
						<Button
							type="button"
							variant="destructive"
							size="icon"
							aria-label={t("finance.form.buttons.removeFocTier")}
							onClick={() => handleRemoveTier(index)}
						>
							<Trash />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export const FocTiersDetails = withErrorBoundary(FocTiersDetailsBase);
