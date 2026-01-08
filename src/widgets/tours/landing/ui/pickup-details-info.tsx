import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomField,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_FORM_LANDING,
	ENUM_PICKUP_TYPE,
	PICKUP_TYPE_LABELS,
	type TLandingSchema
} from "@/entities/tour";

interface IPickupDetailsInfoProps {
	form: UseFormReturn<TLandingSchema>;
}

export const PickupDetailsInfo: FC<IPickupDetailsInfoProps> = ({ form }) => {
	const { t } = useTranslation("landing_page");
	const { control, watch, setValue } = form;
	const pickupType =
		(watch(
			ENUM_FORM_LANDING.PICKUP_TYPE
		) as (typeof ENUM_PICKUP_TYPE)[keyof typeof ENUM_PICKUP_TYPE][]) || [];

	const handleSelect = (
		value: (typeof ENUM_PICKUP_TYPE)[keyof typeof ENUM_PICKUP_TYPE]
	) => {
		const newSelected = pickupType.includes(value)
			? pickupType.filter((l) => l !== value)
			: [...pickupType, value];
		setValue(ENUM_FORM_LANDING.PICKUP_TYPE, newSelected, {
			shouldValidate: true
		});
	};

	const pickupTypeOptions = useValueToTranslateLabel(PICKUP_TYPE_LABELS);

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg ">{t("form.pickup.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("form.pickup.description")}
			</p>

			<FormField
				control={control}
				name={ENUM_FORM_LANDING.PICKUP_TYPE}
				render={() => (
					<FormItem className="flex flex-col gap-2">
						<FormLabel className="hidden">
							{t("form.pickup.title")}
						</FormLabel>
						<div className="flex flex-wrap gap-2">
							{pickupTypeOptions.map((item) => (
								<Button
									key={item.value}
									type="button"
									variant={
										pickupType.includes(
											item.value as (typeof ENUM_PICKUP_TYPE)[keyof typeof ENUM_PICKUP_TYPE]
										)
											? "outlineActive"
											: "outline"
									}
									onClick={() =>
										handleSelect(
											item.value as (typeof ENUM_PICKUP_TYPE)[keyof typeof ENUM_PICKUP_TYPE]
										)
									}
								>
									{item.label}
								</Button>
							))}
						</div>
						<FormMessage t={t} />
					</FormItem>
				)}
			/>

			<CustomField
				name={ENUM_FORM_LANDING.PICKUP_DESCRIPTION}
				control={control}
				label={t("form.pickup.fields.pickup_description.label")}
				fieldType="editor"
				t={t}
			/>
		</div>
	);
};
