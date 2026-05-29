import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	withErrorBoundary
} from "@/shared/ui";

import { PRICING_TABS_LIST } from "./model";

interface IPricingProps {
	form: UseFormReturn<any>;
	onSubmit: (data: any) => void;
}

const PricingBase: FC<IPricingProps> = ({ form, onSubmit }) => {
	const { t } = useTranslation("flight_edit_page");

	return (
		<div>
			<div className="grid gap-6">
				<h2 className="text-xl">{t("pricing.title")}</h2>
				<div className="grid gap-1">
					<h3 className="text-lg">{t("pricing.invoicing.title")}</h3>
					<CustomOptionTabs
						defaultValue={PRICING_TABS_LIST[0]?.type}
						className="gap-4"
					>
						<CustomOptionTabsList className="grid-cols-2 w-70">
							{PRICING_TABS_LIST.map((item) => (
								<CustomOptionTabsTrigger
									key={item.type}
									value={item.type}
									variant={"outline"}
								>
									{t(item?.label)}
								</CustomOptionTabsTrigger>
							))}
						</CustomOptionTabsList>
						{PRICING_TABS_LIST.map((item) => (
							<CustomOptionTabsContent
								key={item.type}
								value={item.type}
							>
								<item.slot form={form} />
							</CustomOptionTabsContent>
						))}
					</CustomOptionTabs>

					<div className="flex justify-end mt-6">
						<Button
							type="button"
							onClick={form.handleSubmit(onSubmit)}
						>
							{t("pricing.buttons.save", "Save")}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Pricing = withErrorBoundary(PricingBase);
