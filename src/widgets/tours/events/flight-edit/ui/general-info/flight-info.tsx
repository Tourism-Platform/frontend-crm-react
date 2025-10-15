import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import type { TGeneralInfoSchema } from "../../model";

import { FlightForm } from "./flight-form";
import { FlightPreview } from "./flight-preview";

interface IFlightInfoProps {
	form: UseFormReturn<TGeneralInfoSchema>;
}

export const FlightInfo: FC<IFlightInfoProps> = ({ form }) => {
	const { t } = useTranslation("flight_edit_page");

	// 👇 Подключаем useFieldArray для массива flights
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "flights" // имя массива в твоей схеме
	});

	const handleAddFlight = () => {
		append({
			airline_code: "",
			flight_number: "",
			departure_airport_code: "",
			arrival_airport_code: "",
			departure_date: "",
			arrival_date: "",
			departure_time: "",
			arrival_time: "",
			departure_timezone: "",
			arrival_timezone: "",
			departure_terminal: "",
			departure_gate: "",
			arrival_terminal: "",
			arrival_gate: ""
		});
	};

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("general.flights.title")}</h2>

			<div className="grid gap-4">
				{!!fields.length && <FlightPreview />}
				{fields.map((field, index) => (
					<FlightForm
						key={field.id}
						form={form}
						onRemove={() => remove(index)} // если нужно убирать сегмент
					/>
				))}

				<div>
					<Button
						variant="outline"
						type="button"
						onClick={handleAddFlight}
					>
						<p>{t("general.flights.buttons.add")}</p>
						<PlusIcon />
					</Button>
				</div>
			</div>
		</div>
	);
};
