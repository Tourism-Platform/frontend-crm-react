import { type FC } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import {
	CustomField,
	LoaderButton,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import { ENUM_SUPPLIER_TYPE } from "@/entities/supplier";
import {
	ENUM_EVENT_BACKEND,
	ENUM_FORM_ACCOMMODATION,
	ENUM_FORM_EVENT_PRODUCT
} from "@/entities/tour";

import {
	EventOverrideControls,
	EventPolicyWarnings,
	EventPoolControls,
	EventProductLinkControls,
	InheritedProductSeasonRates,
	type TEventPoolUiProps
} from "@/features/tours";

import { useIsInheritedProduct } from "../../../model/use-is-inherited-product";
import { InheritedLockBanner } from "../../../ui/inherited-lock-banner";
import {
	ENUM_FORM_SECTION,
	PROPERTIES_LIST,
	type TSlotProps
} from "../../model";

import { AccommodationDetails } from "./accommodation-details";
import { Schedule } from "./schedule";

const GeneralInfoBase: FC<TSlotProps & TEventPoolUiProps> = ({
	form,
	onSubmit,
	isLoading,
	poolVariant,
	onPoolSelect
}) => {
	const { t, i18n } = useTranslation("accommodation_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const propertyFieldName =
		`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_ACCOMMODATION.PROPERTY}` as const;
	const geoProps = useGeoSearchFieldProps(language);
	useGeoFormFieldEnrichment({ form, name: propertyFieldName, language });
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
			<div className="grid gap-3">
				{isInherited ? (
					<InheritedLockBanner
						title={t("form.inherited.lock_title")}
						description={t("form.inherited.lock_description")}
					/>
				) : null}
				<EventPolicyWarnings />
				<EventPoolControls
					form={form}
					variant={poolVariant}
					onSelect={onPoolSelect}
					eventTyp={ENUM_EVENT_BACKEND.HOUSING}
					supplierTyp={ENUM_SUPPLIER_TYPE.HOTEL}
				/>
				<EventProductLinkControls
					typ={ENUM_SUPPLIER_TYPE.HOTEL}
					productId={productId}
					variantId={variantId}
					hasOverride={Boolean(hasOverride)}
					supplyId={supplyId}
				/>
				<EventOverrideControls
					eventTyp={ENUM_EVENT_BACKEND.HOUSING}
					isInherited={isInherited}
					hasOverride={Boolean(hasOverride)}
					supplyId={supplyId}
					onAfterChange={handleOverrideChange}
				/>
				{isInherited ? <InheritedProductSeasonRates /> : null}
			</div>
			<div className="grid grid-cols-2 gap-4">
				{PROPERTIES_LIST(geoProps).map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
						t={t}
						disabled={isInherited}
						{...item}
					/>
				))}
			</div>
			<Separator />
			<AccommodationDetails form={form} />
			<Separator />
			<Schedule form={form} />

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
