import { type FC, Fragment } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { CustomField, withErrorBoundary } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import { ENUM_SUPPLIER_TYPE } from "@/entities/supplier";
import {
	ENUM_EVENT_BACKEND,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_TRANSPORTATION,
	type TTransportationEditSchema
} from "@/entities/tour";

import {
	EventOverrideControls,
	EventPoolControls,
	EventProductLinkControls,
	type TEventPoolUiProps
} from "@/features/tours";

import { useIsInheritedProduct } from "../../../model/use-is-inherited-product";
import { InheritedLockBanner } from "../../../ui/inherited-lock-banner";
import { ENUM_FORM_SECTION, TRANSPORTATION_DATA_LIST } from "../../model";

interface ITransportationInfoProps extends TEventPoolUiProps {
	form: UseFormReturn<TTransportationEditSchema>;
}

const TransportationInfoBase: FC<ITransportationInfoProps> = ({
	form,
	poolVariant,
	onPoolSelect
}) => {
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
				eventTyp={ENUM_EVENT_BACKEND.TRANSFER}
				supplierTyp={ENUM_SUPPLIER_TYPE.TRANSFER}
			/>
			<EventProductLinkControls
				typ={ENUM_SUPPLIER_TYPE.TRANSFER}
				productId={productId}
				variantId={variantId}
				hasOverride={Boolean(hasOverride)}
				supplyId={supplyId}
			/>
			<EventOverrideControls
				eventTyp={ENUM_EVENT_BACKEND.TRANSFER}
				isInherited={isInherited}
				hasOverride={Boolean(hasOverride)}
				supplyId={supplyId}
				onAfterChange={handleOverrideChange}
			/>

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
							disabled={isInherited}
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
