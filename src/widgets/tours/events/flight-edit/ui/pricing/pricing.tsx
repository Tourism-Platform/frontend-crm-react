import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Form
} from "@/shared/ui";

import {
	PRICING_SCHEMA,
	PRICING_TABS_LIST,
	type TPricingSchema
} from "./model";

export const Pricing: FC = () => {
	const { t } = useTranslation("flight_edit_page");
	const form = useForm<TPricingSchema>({
		resolver: zodResolver(PRICING_SCHEMA),
		defaultValues: {},
		mode: "onSubmit"
	});
	function onSubmit(data: TPricingSchema) {
		console.log("Form submitted:", data);
	}

	return (
		<div>
			<div className="grid gap-6">
				<h2 className="text-xl">{t("pricing.title")}</h2>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-1"
					>
						<h3 className="text-lg">
							{t("pricing.invoicing.title")}
						</h3>
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
					</form>
				</Form>
			</div>
		</div>
	);
};
