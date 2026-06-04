import { PlusIcon } from "lucide-react";
import React, { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	type ENUM_FLIGHT_TRANSPORT_TYPE_TYPE,
	ENUM_FORM_FLIGHT,
	ENUM_FLIGHT_FORM_SECTION as ENUM_FORM_SECTION,
	type TFlightEditSchema
} from "@/entities/tour";

import { FLIGHT_TRANSPORT_TYPE_TABS_LIST } from "../../model";

import { FlightCard } from "./flight-card";

interface IFlightInfoProps {
	form: UseFormReturn<TFlightEditSchema>;
}

const FlightInfoBase: FC<IFlightInfoProps> = ({ form }) => {
	const { t } = useTranslation("flight_edit_page");

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_FLIGHT.ROUTE}`
	});

	const formState = form.watch();

	const createEmptySegment = React.useCallback(
		(
			transportType: ENUM_FLIGHT_TRANSPORT_TYPE_TYPE | undefined
		): TFlightEditSchema["general"]["route"][number] => {
			if (transportType === ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN) {
				return {
					transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN,
					carrier: "",
					train_number: "",
					departure_station: null,
					arrival_station: null,
					departure_date: null,
					arrival_date: null,
					departure_time: null,
					arrival_time: null,
					departure_timezone: "",
					arrival_timezone: ""
				};
			}

			if (transportType === ENUM_FLIGHT_TRANSPORT_TYPE.BUS) {
				return {
					transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.BUS,
					bus_company: "",
					bus_number: "",
					departure_point: null,
					arrival_point: null,
					departure_date: null,
					arrival_date: null,
					departure_time: null,
					arrival_time: null,
					departure_timezone: "",
					arrival_timezone: ""
				};
			}

			return {
				transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
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
			};
		},
		[]
	);

	const handleAddFlight = () => {
		append(createEmptySegment(formState?.general?.transport_type));
	};

	const handleTabChange = (value: ENUM_FLIGHT_TRANSPORT_TYPE_TYPE) => {
		form.setValue(
			`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_FLIGHT.TRANSPORT_TYPE}`,
			value
		);

		form.setValue(
			`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_FLIGHT.ROUTE}`,
			[createEmptySegment(value)]
		);
	};

	const handleRemoveFlight = React.useCallback(
		(index: number) => {
			remove(index);
		},
		[remove]
	);

	return (
		<div className="grid gap-6">
			<div className="flex flex-col gap-4">
				<h2 className="text-xl">{t("general.flights.title")}</h2>
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

export const FlightInfo = withErrorBoundary(FlightInfoBase);
