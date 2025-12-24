import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Badge, CustomField } from "@/shared/ui";

import { ENUM_FORM_LANDING } from "../../model";

export const AmenitiesBlock: FC = () => {
	const { t } = useTranslation("landing_page");
	const { control, watch } = useFormContext();

	const included = watch(ENUM_FORM_LANDING.INCLUDED) || [];
	const notIncluded = watch(ENUM_FORM_LANDING.NOT_INCLUDED) || [];

	return (
		<div className="flex flex-col gap-6">
			<h3 className="text-lg font-medium">
				{t("blocks.amenities.title")}
			</h3>
			<p className="text-sm text-muted-foreground">
				{t("blocks.amenities.description")}
			</p>

			<div className="flex flex-col gap-4">
				<CustomField
					name={ENUM_FORM_LANDING.INCLUDED}
					control={control}
					label={t("blocks.amenities.fields.included.label")}
					placeholder={t(
						"blocks.amenities.fields.included.placeholder"
					)}
					fieldType="input"
					t={t}
				/>
				<div className="flex flex-wrap gap-2">
					{included.map((item: string, index: number) => (
						<Badge
							key={index}
							variant="cyan"
							className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
						>
							{item}
						</Badge>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<CustomField
					name={ENUM_FORM_LANDING.NOT_INCLUDED}
					control={control}
					label={t("blocks.amenities.fields.not_included.label")}
					placeholder={t(
						"blocks.amenities.fields.not_included.placeholder"
					)}
					fieldType="input"
					t={t}
				/>
				<div className="flex flex-wrap gap-2">
					{notIncluded.map((item: string, index: number) => (
						<Badge
							key={index}
							variant="destructive"
							className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200"
						>
							{item}
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
};
