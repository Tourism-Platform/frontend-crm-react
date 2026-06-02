import React, { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CustomField } from "@/shared/ui";

import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	ENUM_FORM_FLIGHT,
	ENUM_FLIGHT_FORM_SECTION as ENUM_FORM_SECTION,
	type TFlightEditSchema
} from "@/entities/tour";

import { BUS_DATA_LIST, FLY_DATA_LIST, TRAIN_DATA_LIST } from "../../model";

import { FlightMenu } from "./flight-menu";

interface IFlightCardProps {
	form: UseFormReturn<TFlightEditSchema>;
	onRemove: (index: number) => void;
	index: number;
}

export const FlightCard: FC<IFlightCardProps> = React.memo(
	({ form, onRemove, index }) => {
		const { t } = useTranslation("flight_edit_page");

		const data = form.watch();

		const dataList =
			data?.general?.transport_type === ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN
				? TRAIN_DATA_LIST
				: data?.general?.transport_type ===
					  ENUM_FLIGHT_TRANSPORT_TYPE.BUS
					? BUS_DATA_LIST
					: FLY_DATA_LIST;

		return (
			<Card className="relative">
				<CardContent>
					<div className="absolute top-0 right-0">
						<FlightMenu onRemove={() => onRemove(index)} />
					</div>
					<div className="grid grid-cols-4 gap-x-4 gap-y-1">
						{dataList.map(({ key, ...item }) => (
							<CustomField
								key={key}
								control={form?.control}
								name={`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_FLIGHT.ROUTE}.${index}.${key}`}
								t={t}
								{...item}
							/>
						))}
					</div>
				</CardContent>
			</Card>
		);
	}
);
