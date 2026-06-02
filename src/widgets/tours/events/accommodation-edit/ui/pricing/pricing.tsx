import { Loader } from "lucide-react";
import { type FC } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_INVOICING
} from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	type ISlotProps,
	PRICING_TABS_LIST
} from "../../model";

const PricingBase: FC<ISlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("accommodation_edit_page");
	const invoicing = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING}`
	});

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.pricing.title")}</h2>
			<div className="grid gap-1">
				<h3 className="text-lg">{t("form.pricing.invoicing.title")}</h3>
				<CustomOptionTabs
					value={
						invoicing ??
						ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL
					}
					onValueChange={(val) =>
						form.setValue(
							`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.INVOICING}`,
							val as typeof ENUM_ACCOMMODATION_PRICING_INVOICING.INDIVIDUAL
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

				<div className="flex justify-end mt-6">
					<Button
						type="button"
						onClick={onSubmit}
						disabled={isLoading}
					>
						{isLoading && (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading
							? t("form.general.buttons.saving")
							: t("form.pricing.buttons.save")}
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Pricing = withErrorBoundary(PricingBase);
