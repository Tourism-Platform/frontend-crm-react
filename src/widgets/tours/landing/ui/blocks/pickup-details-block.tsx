import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField } from "@/shared/ui";

import { ENUM_FORM_LANDING } from "../../model";

export const PickupDetailsBlock: FC = () => {
	const { t } = useTranslation("landing_page");
	const { control, watch, setValue } = useFormContext();
	const pickupType = watch(ENUM_FORM_LANDING.PICKUP_TYPE);

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg ">{t("blocks.pickup.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("blocks.pickup.description")}
			</p>

			<div className="flex gap-2">
				<Button
					type="button"
					variant={pickupType === "airport" ? "default" : "outline"}
					className={
						pickupType === "airport"
							? "bg-sky-100 text-sky-600 hover:bg-sky-200 border-sky-200"
							: ""
					}
					onClick={() =>
						setValue(ENUM_FORM_LANDING.PICKUP_TYPE, "airport")
					}
				>
					{t("blocks.pickup.fields.pickup_type.options.airport")}
				</Button>
				<Button
					type="button"
					variant={pickupType === "hotel" ? "default" : "outline"}
					className={
						pickupType === "hotel"
							? "bg-sky-100 text-sky-600 hover:bg-sky-200 border-sky-200"
							: ""
					}
					onClick={() =>
						setValue(ENUM_FORM_LANDING.PICKUP_TYPE, "hotel")
					}
				>
					{t("blocks.pickup.fields.pickup_type.options.hotel")}
				</Button>
			</div>

			<CustomField
				name={ENUM_FORM_LANDING.PICKUP_DESCRIPTION}
				control={control}
				label={t("blocks.pickup.fields.pickup_description.label")}
				fieldType="editor"
				t={t}
			/>
		</div>
	);
};
