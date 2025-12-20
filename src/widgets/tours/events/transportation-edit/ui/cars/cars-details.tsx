import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import { type TCarsSchema } from "../../model";

import { CarsCard } from "./cars-card";

interface ICarsDetailsProps {
	form: UseFormReturn<TCarsSchema>;
}

export const CarsDetails: FC<ICarsDetailsProps> = ({ form }) => {
	const { t } = useTranslation("transportation_edit_page");

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "cars"
	});

	const handleAddCar = () => {
		append({
			car_name: "",
			pax: ""
		});
	};

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("cars.details.title")}</h2>

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
						<p>{t("cars.details.form.buttons.add")}</p>
						<PlusIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};
