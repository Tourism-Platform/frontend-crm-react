import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { CustomField, LoaderButton, withErrorBoundary } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import { ENUM_SUPPLIER_TYPE } from "@/entities/supplier";
import { ENUM_EVENT_BACKEND, ENUM_FORM_ACTIVITY } from "@/entities/tour";

import { EventPoolControls, type TEventPoolUiProps } from "@/features/tours";

import {
	ENUM_FORM_SECTION,
	EVENT_DATA_LIST,
	type TSlotProps
} from "../../model";

import { ActivityMenu } from "./activity-menu";

const GeneralInfoBase: FC<TSlotProps & TEventPoolUiProps> = ({
	form,
	onSubmit,
	isLoading,
	poolVariant,
	onPoolSelect
}) => {
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
				<EventPoolControls
					form={form}
					variant={poolVariant}
					onSelect={onPoolSelect}
					eventTyp={ENUM_EVENT_BACKEND.ACTIVITY}
					supplierTyp={ENUM_SUPPLIER_TYPE.ACTIVITY}
				/>
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
					<ActivityMenu form={form} />
				</div>
			</div>
			<div className="flex justify-end mt-6">
				<LoaderButton
					type="button"
					onClick={onSubmit}
					isLoading={isLoading}
					label={t("form.general.buttons.save")}
					loadingLabel={t("form.general.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);
