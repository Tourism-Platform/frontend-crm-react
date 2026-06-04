import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { Button, CustomField, Separator, withErrorBoundary } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import { ENUM_FORM_ACCOMMODATION } from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	type ISlotProps,
	PROPERTIES_LIST
} from "../../model";

import { AccommodationDetails } from "./accommodation-details";
import { Schedule } from "./schedule";

const GeneralInfoBase: FC<ISlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t, i18n } = useTranslation("accommodation_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const propertyFieldName =
		`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_ACCOMMODATION.PROPERTY}` as const;
	const geoProps = useGeoSearchFieldProps(language);
	useGeoFormFieldEnrichment({ form, name: propertyFieldName, language });

	return (
		<div className="grid gap-12">
			<div className="grid grid-cols-2">
				{PROPERTIES_LIST(geoProps).map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
						t={t}
						{...item}
					/>
				))}
			</div>
			<Separator />
			<AccommodationDetails form={form} />
			<Separator />
			<Schedule form={form} />

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
