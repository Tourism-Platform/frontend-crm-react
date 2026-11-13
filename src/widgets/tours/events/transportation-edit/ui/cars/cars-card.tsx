import { type FC } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomCollapsibleListItem, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_CARS,
	type TTransportationEditSchema,
	VEHICLE_BODY_TYPE_LABELS
} from "@/entities/tour";

import { CARS_DATA_LIST, ENUM_FORM_SECTION } from "../../model";

import { CarsMenu } from "./cars-menu";

interface ICarsCardProps {
	form: UseFormReturn<TTransportationEditSchema>;
	index: number;
	onRemove: () => void;
}

export const CarsCard: FC<ICarsCardProps> = ({ form, index, onRemove }) => {
	const { t } = useTranslation(["transportation_edit_page", "options"]);
	const carPath =
		`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}.${index}` as const;
	const [carName, pax] = useWatch({
		control: form.control,
		name: [
			`${carPath}.${ENUM_FORM_CARS.CAR_NAME}`,
			`${carPath}.${ENUM_FORM_CARS.PAX}`
		]
	});

	const description = [
		carName
			? t(VEHICLE_BODY_TYPE_LABELS[carName], { ns: "options" })
			: null,
		pax ? t("form.cars.details.pax_summary", { pax }) : null
	]
		.filter(Boolean)
		.join(" · ");

	return (
		<CustomCollapsibleListItem
			value={String(index)}
			control={form.control}
			name={carPath}
			title={t("form.cars.details.car_item", { index: index + 1 })}
			description={description}
			actions={<CarsMenu onRemove={onRemove} />}
		>
			<div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
				{CARS_DATA_LIST().map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={`${carPath}.${key}`}
						t={t}
						{...item}
					/>
				))}
			</div>
		</CustomCollapsibleListItem>
	);
};
