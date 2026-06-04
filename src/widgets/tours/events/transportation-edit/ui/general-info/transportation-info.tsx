import { type FC, Fragment } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { CustomField, withErrorBoundary } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import {
	ENUM_FORM_TRANSPORTATION,
	type TTransportationEditSchema
} from "@/entities/tour";

import { ENUM_FORM_SECTION, TRANSPORTATION_DATA_LIST } from "../../model";

interface ITransportationInfoProps {
	form: UseFormReturn<TTransportationEditSchema>;
}

const TransportationInfoBase: FC<ITransportationInfoProps> = ({ form }) => {
	const { t, i18n } = useTranslation("transportation_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const meetPointFieldName =
		`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_TRANSPORTATION.MEET_POINT}` as const;
	const endPointFieldName =
		`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_TRANSPORTATION.END_POINT}` as const;
	const meetPointGeo = useGeoSearchFieldProps(language);
	const endPointGeo = useGeoSearchFieldProps(language);
	useGeoFormFieldEnrichment({ form, name: meetPointFieldName, language });
	useGeoFormFieldEnrichment({ form, name: endPointFieldName, language });

	return (
		<div className="grid gap-8">
			<h2 className="text-xl">{t("form.general.details.title")}</h2>

			<div className="grid grid-cols-4 gap-x-4 gap-y-1">
				{TRANSPORTATION_DATA_LIST({
					meetPoint: meetPointGeo,
					endPoint: endPointGeo
				}).map(({ key, ...item }, index) => (
					<Fragment key={key}>
						<CustomField
							control={form?.control}
							name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
							t={t}
							{...item}
						/>
						{index === 0 && <div className="col-span-2" />}
					</Fragment>
				))}
			</div>
		</div>
	);
};

export const TransportationInfo = withErrorBoundary(TransportationInfoBase);
