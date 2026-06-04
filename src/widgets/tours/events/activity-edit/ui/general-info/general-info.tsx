import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { Button, CustomField, withErrorBoundary } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import { ENUM_FORM_ACTIVITY } from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	EVENT_DATA_LIST,
	type ISlotProps
} from "../../model";

const GeneralInfoBase: FC<ISlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t, i18n } = useTranslation("activity_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const locationFieldName =
		`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_ACTIVITY.LOCATION}` as const;
	const geoProps = useGeoSearchFieldProps(language);
	useGeoFormFieldEnrichment({ form, name: locationFieldName, language });

	return (
		<div className="grid gap-12">
			<div className="grid gap-8">
				<h2 className="text-xl">{t("form.general.details.title")}</h2>
				<div className="grid grid-cols-4 gap-x-4 gap-y-1">
					{EVENT_DATA_LIST(geoProps).map(({ key, ...item }) => (
						<CustomField
							key={key}
							name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
							control={form?.control}
							t={t}
							{...item}
						/>
					))}
				</div>
			</div>
			<div className="flex justify-end mt-6">
				<Button type="button" onClick={onSubmit} disabled={isLoading}>
					{isLoading && (
						<Loader className="mr-2 h-4 w-4 animate-spin" />
					)}
					{isLoading
						? t("form.general.buttons.saving")
						: t("form.general.buttons.save")}
				</Button>
			</div>
		</div>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);
