import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CustomField } from "@/shared/ui";

import {
	type TGeneralInfoSchema,
	TRANSPORTATION_DATA_LIST,
	TRANSPORTATION_TIME_LIST
} from "../../model";

import { FlightMenu } from "./flight-menu";

interface ITransportationFormProps {
	form: UseFormReturn<TGeneralInfoSchema>;
	onRemove: () => void;
}

export const TransportationForm: FC<ITransportationFormProps> = ({
	form,
	onRemove
}) => {
	const { t } = useTranslation("transportation_edit_page");
	return (
		<Card className="relative">
			<CardContent className="grid gap-1">
				<div className="absolute top-0 right-0">
					<FlightMenu onRemove={onRemove} />
				</div>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{TRANSPORTATION_DATA_LIST.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={key}
							t={t}
							{...item}
						/>
					))}
				</div>
				<div className="grid grid-cols-4 gap-x-4">
					{TRANSPORTATION_TIME_LIST.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={key}
							t={t}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
