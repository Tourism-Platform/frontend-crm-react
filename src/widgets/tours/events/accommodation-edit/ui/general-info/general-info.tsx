import { Loader } from "lucide-react";
import { type FC } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { Button, CustomField, Separator, withErrorBoundary } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import { ENUM_SUPPLIER_TYPE } from "@/entities/supplier";
import {
	ENUM_FORM_ACCOMMODATION,
	ENUM_FORM_EVENT_PRODUCT
} from "@/entities/tour";

import {
	EventOverrideControls,
	EventPolicyWarnings,
	EventProductLinkControls,
	InheritedProductSeasonRates
} from "@/features/tours";

import { useIsInheritedProduct } from "../../../model/use-is-inherited-product";
import { InheritedLockBanner } from "../../../ui/inherited-lock-banner";
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
				<EventProductLinkControls
					typ={ENUM_SUPPLIER_TYPE.HOTEL}
					productId={productId}
					variantId={variantId}
					hasOverride={Boolean(hasOverride)}
				/>
				<EventOverrideControls
					kind="housing"
					isInherited={isInherited}
					hasOverride={Boolean(hasOverride)}
					onAfterChange={(next) =>
						form.setValue(
							ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE,
							next
						)
					}
				/>
				{isInherited ? <InheritedProductSeasonRates /> : null}
			</div>
			<div className="grid grid-cols-2">
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
