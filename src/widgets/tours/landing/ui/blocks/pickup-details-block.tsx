import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CustomField,
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger
} from "@/shared/ui";

import { ENUM_FORM_LANDING, PICKUP_TYPE_OPTIONS } from "../../model";

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

			<CustomOptionTabs
				defaultValue={PICKUP_TYPE_OPTIONS[0].value}
				value={pickupType}
				onValueChange={(val) =>
					setValue(ENUM_FORM_LANDING.PICKUP_TYPE, val)
				}
			>
				<CustomOptionTabsList className="grid grid-cols-2 gap-2">
					{PICKUP_TYPE_OPTIONS.map((tab) => (
						<CustomOptionTabsTrigger
							key={tab.value}
							value={tab.value}
							variant={"bigOutline"}
						>
							{t(tab.label)}
						</CustomOptionTabsTrigger>
					))}
				</CustomOptionTabsList>
			</CustomOptionTabs>

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
