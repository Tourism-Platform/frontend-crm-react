import { ShieldWarningIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InfoCircleIcon } from "@/shared/assets";
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	Checkbox,
	CustomField,
	CustomInputSelect,
	Label,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_CHARGE,
	ENUM_GUIDE_PRICING_FIELD
} from "@/entities/tour";

import { ExtraCostsField, FeeLinesField } from "@/features/pricing";

import {
	ENUM_FORM_SECTION,
	GUIDE_MARKUP_FIELD,
	GUIDE_PRICING_HEADER_FIELDS_LIST,
	type TSlotProps
} from "../../model";

import { GuidePriceMatrix } from "./guide-price-matrix";

const pricingPath = <K extends string>(key: K) =>
	`${ENUM_FORM_SECTION.PRICING}.${key}` as const;

const InvoicingIndividualBase: FC<TSlotProps> = ({ form }) => {
	const { t } = useTranslation("guide_edit_page");
	const headerFields = GUIDE_PRICING_HEADER_FIELDS_LIST();

	const [addMarginSeparately, chargeTyp, isLegacyShape, durationDays] =
		useWatch({
			control: form.control,
			name: [
				pricingPath(ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY),
				pricingPath(ENUM_GUIDE_PRICING_FIELD.CHARGE_TYP),
				pricingPath(ENUM_GUIDE_PRICING_FIELD.IS_LEGACY_SHAPE),
				`${ENUM_FORM_SECTION.GUIDES}.${ENUM_FORM_GUIDES.DURATION_DAYS}`
			]
		});

	// The backend warns about this only outside a choice (fe6.6 §10).
	const isFlatOnMultiDay =
		chargeTyp === ENUM_GUIDE_CHARGE.FIXED && (durationDays ?? 0) > 1;

	return (
		<div className="grid gap-6 mb-8">
			<div className="grid gap-4">
				<h3 className="text-lg">
					{t("form.pricing.form.matrix.title")}
				</h3>
				<div className="grid grid-cols-1 items-end gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
					{headerFields.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form.control}
							name={pricingPath(key)}
							t={t}
							className="min-w-0"
							{...item}
						/>
					))}
					{addMarginSeparately ? (
						<CustomInputSelect
							control={form.control}
							name={pricingPath(GUIDE_MARKUP_FIELD.key)}
							label={GUIDE_MARKUP_FIELD.label}
							placeholder={GUIDE_MARKUP_FIELD.placeholder}
							selectOptions={[
								...GUIDE_MARKUP_FIELD.selectOptions
							]}
							t={t}
						/>
					) : null}
				</div>
				<div className="flex items-center gap-2">
					<Checkbox
						id="add-margin-separately"
						checked={Boolean(addMarginSeparately)}
						onCheckedChange={(checked) =>
							form.setValue(
								pricingPath(
									ENUM_GUIDE_PRICING_FIELD.ADD_MARGIN_SEPARATELY
								),
								Boolean(checked)
							)
						}
					/>
					<Label htmlFor="add-margin-separately">
						{t(
							"form.pricing.form.matrix.checkboxes.add_margin_separately"
						)}
					</Label>
				</div>
			</div>

			{isLegacyShape ? (
				<Alert
					variant="warning"
					appearance="light"
					size="sm"
					role="status"
				>
					<AlertIcon>
						<ShieldWarningIcon />
					</AlertIcon>
					<AlertContent>
						<AlertDescription>
							{t("form.pricing.form.matrix.legacy_banner")}
						</AlertDescription>
					</AlertContent>
				</Alert>
			) : null}

			<GuidePriceMatrix form={form} />

			{isFlatOnMultiDay ? (
				<Alert
					variant="info"
					appearance="light"
					size="sm"
					role="status"
				>
					<AlertIcon>
						<InfoCircleIcon />
					</AlertIcon>
					<AlertContent>
						<AlertDescription>
							{t(
								"form.pricing.form.matrix.fixed_multi_day_hint",
								{
									count: durationDays ?? 0
								}
							)}
						</AlertDescription>
					</AlertContent>
				</Alert>
			) : null}

			<FeeLinesField
				control={form.control}
				name={pricingPath(ENUM_GUIDE_PRICING_FIELD.FEES)}
			/>
			<ExtraCostsField
				control={form.control}
				name={pricingPath(ENUM_GUIDE_PRICING_FIELD.EXTRA_COSTS)}
			/>
		</div>
	);
};

export const InvoicingIndividual = withErrorBoundary(InvoicingIndividualBase);
