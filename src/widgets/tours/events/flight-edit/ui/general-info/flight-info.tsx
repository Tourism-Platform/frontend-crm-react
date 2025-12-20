import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger
} from "@/shared/ui";

import {
	type ENUM_FLIGHT_TRANSPORT_TYPE_TYPE,
	FLIGHT_TRANSPORT_TYPE_TABS_LIST,
	type TGeneralInfoSchema
} from "../../model";

import { FlightCard } from "./flight-card";

interface IFlightInfoProps {
	form: UseFormReturn<TGeneralInfoSchema>;
}

export const FlightInfo: FC<IFlightInfoProps> = ({ form }) => {
	const { t } = useTranslation("flight_edit_page");

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "route"
	});

	const transportType = form.watch("transport_type");

	const handleAddFlight = () => {
		append({
			transport_type: transportType as ENUM_FLIGHT_TRANSPORT_TYPE_TYPE,
			airline_code: "",
			flight_number: "",
			departure_airport_code: "",
			arrival_airport_code: "",
			departure_date: null,
			arrival_date: null,
			departure_time: null,
			arrival_time: null,
			departure_timezone: "",
			arrival_timezone: "",
			departure_terminal: "",
			departure_gate: "",
			arrival_terminal: "",
			arrival_gate: ""
		});
	};

	const handleTabChange = (value: string) => {
		const type = value as ENUM_FLIGHT_TRANSPORT_TYPE_TYPE;
		form.setValue("transport_type", value);

		// При смене табы старый роут удаляется и создается один новый соответствующего типа
		form.setValue("route", [
			{
				transport_type: type,
				airline_code: "",
				flight_number: "",
				departure_airport_code: "",
				arrival_airport_code: "",
				departure_date: null,
				arrival_date: null,
				departure_time: null,
				arrival_time: null,
				departure_timezone: "",
				arrival_timezone: "",
				departure_terminal: "",
				departure_gate: "",
				arrival_terminal: "",
				arrival_gate: ""
			}
		]);
	};

	return (
		<div className="grid gap-6">
			<div className="flex flex-col gap-4">
				<h2 className="text-xl">{t("general.flights.title")}</h2>
				<CustomOptionTabs
					value={transportType}
					onValueChange={handleTabChange}
				>
					<CustomOptionTabsList className="grid-cols-3 gap-5">
						{FLIGHT_TRANSPORT_TYPE_TABS_LIST.map((item) => (
							<CustomOptionTabsTrigger
								key={item.type}
								value={item.type}
								variant={"bigOutline"}
								className="grid gap-2 p-5 items-center justify-center w-50"
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
				{/* {!!fields.length && <FlightPreview />} */}
				{fields.map((field, index) => (
					<FlightCard
						key={field.id}
						form={form}
						index={index}
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
