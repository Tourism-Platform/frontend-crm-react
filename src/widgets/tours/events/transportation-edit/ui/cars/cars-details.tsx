import { AddIcon } from "@solar-icons/react/bold/add";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Accordion,
	CustomCollapsibleListToolbar,
	LoaderButton,
	useCollapsibleList,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_FORM_CARS,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSPORTATION_PRICING_FIELD,
	ENUM_VEHICLE_BODY_TYPE,
	type TTransportationEditSchema
} from "@/entities/tour";

import { removeWithPriceRow, useConfirmRemoveLastNode } from "../../../model";
import { ENUM_FORM_SECTION } from "../../model";

import { CarsCard } from "./cars-card";

/** Per-car price rows, index-aligned to the cars list. */
const CAR_PRICE_ROWS_PATH = `${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}.${ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS}`;

interface ICarsDetailsProps {
	form: UseFormReturn<TTransportationEditSchema>;
}

const CarsDetailsBase: FC<ICarsDetailsProps> = ({ form }) => {
	const { t } = useTranslation("transportation_edit_page");
	const confirmRemoveLastNode = useConfirmRemoveLastNode();
	const supplyId = useWatch({
		control: form.control,
		name: ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`
	});
	const list = useCollapsibleList(fields.length, supplyId);

	// The last node going away deletes its photos too: ask first (fe6.4 §6).
	const handleRemove = async (index: number) => {
		if (fields.length === 1 && !(await confirmRemoveLastNode())) return;
		removeWithPriceRow(form, remove, CAR_PRICE_ROWS_PATH, index);
		list.removeItem(index);
	};

	const handleAddCar = () => {
		append({
			[ENUM_FORM_CARS.CAR_NAME]: ENUM_VEHICLE_BODY_TYPE.SEDAN,
			[ENUM_FORM_CARS.PAX]: null,
			[ENUM_FORM_CARS.DESCRIPTION]: ""
		});
		list.openItem(fields.length);
	};

	return (
		<div className="grid gap-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h2 className="text-xl">{t("form.cars.details.title")}</h2>
				{fields.length > 0 ? (
					<CustomCollapsibleListToolbar
						onExpandAll={list.expandAll}
						onCollapseAll={list.collapseAll}
					/>
				) : null}
			</div>

			<div className="grid gap-4">
				{fields.length > 0 ? (
					<Accordion
						type="multiple"
						value={list.value}
						onValueChange={list.onValueChange}
						className="grid gap-4"
					>
						{fields.map((field, index) => (
							<CarsCard
								key={field.id}
								form={form}
								index={index}
								onRemove={() => handleRemove(index)}
							/>
						))}
					</Accordion>
				) : null}

				<div>
					<LoaderButton
						type="button"
						onClick={handleAddCar}
						className="gap-2"
						icon={<AddIcon />}
						label={t("form.cars.details.form.buttons.add")}
					/>
				</div>
			</div>
		</div>
	);
};

export const CarsDetails = withErrorBoundary(CarsDetailsBase);
