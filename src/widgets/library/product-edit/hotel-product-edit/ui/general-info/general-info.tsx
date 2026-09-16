import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { CustomField, LoaderButton, withErrorBoundary } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import { ENUM_FORM_HOTEL_PRODUCT as ENUM_FORM } from "@/entities/supplier";

import {
	ENUM_FORM_SECTION,
	FORM_HOTEL_PRODUCT_GENERAL_LIST,
	type TSlotProps
} from "../../model";

const GeneralInfoBase: FC<TSlotProps> = ({
	form,
	onSubmit,
	isLoading,
	isCreate
}) => {
	const { t, i18n } = useTranslation("hotel_product_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const geoProps = useGeoSearchFieldProps(language);

	useGeoFormFieldEnrichment({
		form,
		name: `${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM.LOCATION}`,
		language
	});

	return (
		<div className="grid gap-4">
			<div className="grid gap-x-4 gap-y-1 grid-cols-2">
				{FORM_HOTEL_PRODUCT_GENERAL_LIST(geoProps).map(
					({ key, ...item }) => (
						<CustomField
							key={key}
							control={form.control}
							name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
							t={t}
							{...item}
						/>
					)
				)}
			</div>
			<div className="flex justify-end">
				<LoaderButton
					type="button"
					onClick={onSubmit}
					disabled={isLoading}
					isLoading={isLoading}
					label={
						isCreate
							? t("form.general.buttons.create")
							: t("form.general.buttons.save")
					}
					loadingLabel={t("form.general.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);
