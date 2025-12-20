import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CustomField } from "@/shared/ui";

import {
	BUS_DATA_LIST,
	ENUM_FLIGHT_TRANSPORT_TYPE,
	FLY_DATA_LIST,
	type TGeneralInfoSchema,
	TRAIN_DATA_LIST
} from "../../model";

import { FlightMenu } from "./flight-menu";

interface IFlightCardProps {
	form: UseFormReturn<TGeneralInfoSchema>;
	onRemove: () => void;
	index: number;
}

export const FlightCard: FC<IFlightCardProps> = ({ form, onRemove, index }) => {
	const { t } = useTranslation("flight_edit_page");

	const transportType = form.watch(`transport_type`);

	const dataList =
		transportType === ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN
			? TRAIN_DATA_LIST
			: transportType === ENUM_FLIGHT_TRANSPORT_TYPE.BUS
				? BUS_DATA_LIST
				: FLY_DATA_LIST;

	return (
		<Card className="relative">
			<CardContent className="grid gap-1">
				<div className="absolute top-0 right-0">
					<FlightMenu onRemove={onRemove} />
				</div>
				<div className="grid grid-cols-4 gap-x-4 gap-y-1">
					{dataList.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={`route.${index}.${key}`}
							t={t}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
