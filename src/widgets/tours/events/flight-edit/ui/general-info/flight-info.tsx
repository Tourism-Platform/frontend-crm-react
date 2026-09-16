import { PlusIcon } from "lucide-react";
import React, { type FC } from "react";
import { type UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_SUPPLIER_TYPE,
	type ENUM_SUPPLIER_TYPE_TYPE
} from "@/entities/supplier";
import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_FLIGHT_TRANSPORT_TYPE,
	type ENUM_FLIGHT_TRANSPORT_TYPE_TYPE,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_FLIGHT,
	ENUM_FLIGHT_FORM_SECTION as ENUM_FORM_SECTION,
	type TFlightEditSchema,
	createEmptyTransportSegment
} from "@/entities/tour";

import {
	EventOverrideControls,
	EventPoolControls,
	EventProductLinkControls,
	type TEventPoolUiProps
} from "@/features/tours";

import { useIsInheritedProduct } from "../../../model/use-is-inherited-product";
import { InheritedLockBanner } from "../../../ui/inherited-lock-banner";
import { FLIGHT_TRANSPORT_TYPE_TABS_LIST } from "../../model";

import { FlightCard } from "./flight-card";

interface IFlightInfoProps extends TEventPoolUiProps {
	form: UseFormReturn<TFlightEditSchema>;
}

const FlightInfoBase: FC<IFlightInfoProps> = ({
	form,
	poolVariant,
	onPoolSelect
}) => {
	const { t } = useTranslation("flight_edit_page");
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

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_FLIGHT.ROUTE}`
	});

	const formState = form.watch();

	const handleAddFlight = () => {
		append(createEmptyTransportSegment(formState?.general?.transport_type));
	};

	const handleTabChange = (value: ENUM_FLIGHT_TRANSPORT_TYPE_TYPE) => {
		if (isInherited) {
			return;
		}

		form.setValue(
			`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_FLIGHT.TRANSPORT_TYPE}`,
			value
		);

		form.setValue(
			`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_FLIGHT.ROUTE}`,
			[createEmptyTransportSegment(value)]
		);
	};

	const handleRemoveFlight = React.useCallback(
		(index: number) => {
			remove(index);
		},
		[remove]
	);

	const handleOverrideChange = (next: boolean) => {
		form.setValue(ENUM_FORM_EVENT_PRODUCT.HAS_OVERRIDE, next);
	};

	const showProductLink =
		formState?.general?.transport_type === ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN;
	const eventTyp = ((): ENUM_EVENT_BACKEND_TYPE => {
		switch (formState?.general?.transport_type) {
			case ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN:
				return ENUM_EVENT_BACKEND.TRAIN;
			case ENUM_FLIGHT_TRANSPORT_TYPE.BUS:
				return ENUM_EVENT_BACKEND.BUS;
			default:
				return ENUM_EVENT_BACKEND.FLIGHT;
		}
	})();
	const supplierTyp = ((): ENUM_SUPPLIER_TYPE_TYPE => {
		switch (formState?.general?.transport_type) {
			case ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN:
				return ENUM_SUPPLIER_TYPE.TRAIN;
			case ENUM_FLIGHT_TRANSPORT_TYPE.BUS:
				return ENUM_SUPPLIER_TYPE.BUS;
			default:
				return ENUM_SUPPLIER_TYPE.FLIGHT;
		}
	})();

	return (
		<div className="grid gap-6">
			<div className="flex flex-col gap-4">
				<h2 className="text-xl">{t("form.general.flights.title")}</h2>
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
					eventTyp={eventTyp}
					supplierTyp={supplierTyp}
				/>
				{showProductLink ? (
					<>
						<EventProductLinkControls
							typ={ENUM_SUPPLIER_TYPE.TRAIN}
							productId={productId}
							variantId={variantId}
							hasOverride={Boolean(hasOverride)}
							supplyId={supplyId}
						/>
						<EventOverrideControls
							eventTyp={eventTyp}
							isInherited={isInherited}
							hasOverride={Boolean(hasOverride)}
							supplyId={supplyId}
							onAfterChange={handleOverrideChange}
						/>
					</>
				) : null}
				<CustomOptionTabs
					value={formState?.general?.transport_type}
					onValueChange={(value) =>
						handleTabChange(
							value as ENUM_FLIGHT_TRANSPORT_TYPE_TYPE
						)
					}
				>
					<CustomOptionTabsList className="grid-cols-3 gap-5">
						{FLIGHT_TRANSPORT_TYPE_TABS_LIST.map((item) => (
							<CustomOptionTabsTrigger
								key={item.type}
								value={item.type}
								variant={"bigOutline"}
								className="grid gap-2 p-5 items-center justify-center w-50"
								disabled={isInherited}
							>
								<div className="flex items-center justify-center">
									<item.icon className="h-5" />
								</div>
								<p>{t(item?.label)}</p>
							</CustomOptionTabsTrigger>
						))}
					</CustomOptionTabsList>
				</CustomOptionTabs>
			</div>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<FlightCard
						key={field.id}
						form={form}
						index={index}
						onRemove={handleRemoveFlight}
						readOnly={isInherited}
					/>
				))}

				{!isInherited ? (
					<div>
						<Button
							variant="outline"
							type="button"
							onClick={handleAddFlight}
						>
							<p>{t("form.general.flights.buttons.add")}</p>
							<PlusIcon />
						</Button>
					</div>
				) : null}
			</div>
		</div>
	);
};

export const FlightInfo = withErrorBoundary(FlightInfoBase);
