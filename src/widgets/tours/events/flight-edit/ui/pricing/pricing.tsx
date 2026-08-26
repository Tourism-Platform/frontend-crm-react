import { type FC } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_EVENT_MODE,
	ENUM_FLIGHT_PRICING_FIELD,
	ENUM_FLIGHT_PRICING_INVOICING,
	useEventEditIds
} from "@/entities/tour";

import { useIsInheritedProduct } from "../../../model/use-is-inherited-product";
import { InheritedLockBanner } from "../../../ui/inherited-lock-banner";
import {
	ENUM_FORM_SECTION,
	PRICING_TABS_LIST,
	type TSlotProps
} from "../../model";

import { InvoicingIndividual } from "./invoicing-individual";
import { InvoicingPart } from "./invoicing-part";

const PricingBase: FC<TSlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("flight_edit_page");
	const { mode } = useEventEditIds();
	const isMultiplyChild = mode === ENUM_EVENT_MODE.MULTI;
	const isInherited = useIsInheritedProduct(form);
	const invoicing = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_FLIGHT_PRICING_FIELD.INVOICING}`
	});
	const isPartOfPackage =
		invoicing === ENUM_FLIGHT_PRICING_INVOICING.PART_OF_PACKAGE;

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.pricing.title")}</h2>
			<div className="grid gap-1">
				{isInherited && !isPartOfPackage ? (
					<InheritedLockBanner
						title={t("form.inherited.pricing_title")}
						description={t("form.inherited.pricing_description")}
					/>
				) : isMultiplyChild ? (
					<InvoicingIndividual
						form={form}
						onSubmit={onSubmit}
						isLoading={isLoading}
					/>
				) : isInherited && isPartOfPackage ? (
					<InvoicingPart
						form={form}
						onSubmit={onSubmit}
						isLoading={isLoading}
					/>
				) : (
					<>
						<h3 className="text-lg">
							{t("form.pricing.invoicing.title")}
						</h3>
						<CustomOptionTabs
							defaultValue={
								form.getValues(
									`${ENUM_FORM_SECTION.PRICING}.${ENUM_FLIGHT_PRICING_FIELD.INVOICING}`
								) ?? ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL
							}
							onValueChange={(val) =>
								form.setValue(
									`${ENUM_FORM_SECTION.PRICING}.${ENUM_FLIGHT_PRICING_FIELD.INVOICING}`,
									val as typeof ENUM_FLIGHT_PRICING_INVOICING.INDIVIDUAL
								)
							}
							className="gap-4"
						>
							<CustomOptionTabsList className="grid-cols-2 w-70">
								{PRICING_TABS_LIST.map((item) => (
									<CustomOptionTabsTrigger
										key={item.type}
										value={item.type}
										variant={"outline"}
									>
										{t(item.label)}
									</CustomOptionTabsTrigger>
								))}
							</CustomOptionTabsList>
							{PRICING_TABS_LIST.map((item) => (
								<CustomOptionTabsContent
									key={item.type}
									value={item.type}
								>
									<item.slot
										form={form}
										onSubmit={onSubmit}
										isLoading={isLoading}
									/>
								</CustomOptionTabsContent>
							))}
						</CustomOptionTabs>
					</>
				)}

				<div className="flex justify-end mt-6">
					<LoaderButton
						type="button"
						onClick={onSubmit}
						isLoading={isLoading}
						disabled={
							(isInherited && !isPartOfPackage) || undefined
						}
						label={t("form.pricing.buttons.save")}
						loadingLabel={t("form.pricing.buttons.saving")}
					/>
				</div>
			</div>
		</div>
	);
};

export const Pricing = withErrorBoundary(PricingBase);
