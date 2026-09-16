import { type FC } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { CustomField, LoaderButton, withErrorBoundary } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import { ENUM_SUPPLIER_TYPE } from "@/entities/supplier";
import {
	ENUM_EVENT_BACKEND,
	ENUM_FORM_ACTIVITY,
	ENUM_FORM_EVENT_PRODUCT
} from "@/entities/tour";

import {
	EventOverrideControls,
	EventPoolControls,
	EventProductLinkControls,
	type TEventPoolUiProps
} from "@/features/tours";

import { useIsInheritedProduct } from "../../../model/use-is-inherited-product";
import { InheritedLockBanner } from "../../../ui/inherited-lock-banner";
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
	const isInherited = useIsInheritedProduct(form);
	const productId = useWatch({
		control: form.control,
		name: ENUM_FORM_EVENT_PRODUCT.PRODUCT_ID
	});
	const variantId = useWatch({
		control: form.control,
		name: ENUM_FORM_EVENT_PRODUCT.VARIANT_ID
	});
	const hasOverride = useWatch({
		control: form.control,
		name: ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE
	});
	const supplyId = useWatch({
		control: form.control,
		name: ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID
	});

	const handleOverrideChange = (next: boolean) => {
		form.setValue(ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE, next);
	};

	return (
		<div className="grid gap-12">
			<div className="grid gap-8">
				<h2 className="text-xl">{t("form.general.details.title")}</h2>
				{isInherited ? (
					<InheritedLockBanner
						title={t("form.inherited.lock_title")}
						description={t("form.inherited.lock_description")}
					/>
				) : null}
				<EventPoolControls
					form={form}
					variant={poolVariant}
					onSelect={onPoolSelect}
					eventTyp={ENUM_EVENT_BACKEND.ACTIVITY}
					supplierTyp={ENUM_SUPPLIER_TYPE.ACTIVITY}
				/>
				<EventProductLinkControls
					typ={ENUM_SUPPLIER_TYPE.ACTIVITY}
					productId={productId}
					variantId={variantId}
					hasOverride={Boolean(hasOverride)}
					supplyId={supplyId}
				/>
				<EventOverrideControls
					eventTyp={ENUM_EVENT_BACKEND.ACTIVITY}
					isInherited={isInherited}
					hasOverride={Boolean(hasOverride)}
					supplyId={supplyId}
					onAfterChange={handleOverrideChange}
				/>
				<div className="grid grid-cols-4 gap-x-4 gap-y-1">
					{EVENT_DATA_LIST(geoProps).map(({ key, ...item }) => (
						<CustomField
							key={key}
							name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
							control={form?.control}
							t={t}
							disabled={isInherited}
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
