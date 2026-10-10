import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_CARS,
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

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`
	});

	// The last node going away deletes its photos too: ask first (fe6.4 §6).
	const handleRemove = async (index: number) => {
		if (fields.length === 1 && !(await confirmRemoveLastNode())) return;
		removeWithPriceRow(form, remove, CAR_PRICE_ROWS_PATH, index);
	};

	const handleAddCar = () => {
		append({
			[ENUM_FORM_CARS.CAR_NAME]: ENUM_VEHICLE_BODY_TYPE.SEDAN,
			[ENUM_FORM_CARS.PAX]: null,
			[ENUM_FORM_CARS.DESCRIPTION]: ""
		});
	};

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.cars.details.title")}</h2>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<CarsCard
						key={field.id}
						form={form}
						index={index}
						onRemove={() => handleRemove(index)}
					/>
				))}

				<div>
					<Button
						variant="outline"
						type="button"
						onClick={handleAddCar}
						className="gap-2"
					>
						<p>{t("form.cars.details.form.buttons.add")}</p>
						<PlusIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export const CarsDetails = withErrorBoundary(CarsDetailsBase);
