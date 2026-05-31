import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_CARS,
	type TTransportationEditSchema
} from "@/entities/tour";

import { ENUM_FORM_SECTION } from "../../model";

import { CarsCard } from "./cars-card";

interface ICarsDetailsProps {
	form: UseFormReturn<TTransportationEditSchema>;
}

const CarsDetailsBase: FC<ICarsDetailsProps> = ({ form }) => {
	const { t } = useTranslation("transportation_edit_page");

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}`
	});

	const handleAddCar = () => {
		append({
			[ENUM_FORM_CARS.CAR_NAME]: "",
			[ENUM_FORM_CARS.PAX]: "",
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
						onRemove={() => remove(index)}
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
