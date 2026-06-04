import { type FC, Fragment } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Card,
	CardContent,
	CardHeader,
	CustomField,
	CustomInputSelect
} from "@/shared/ui";

import {
	ENUM_FORM_CARS,
	ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD,
	ENUM_TRANSPORTATION_PRICING_FIELD,
	type ENUM_VEHICLE_BODY_TYPE_TYPE,
	type TTransportationEditSchema,
	VEHICLE_BODY_TYPE_LABELS
} from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	PER_CAR_MARKUP_FIELD,
	PER_CAR_ROW_FIELDS_LIST
} from "../../model";

interface IPerCarCardProps {
	form: UseFormReturn<TTransportationEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerCarCard: FC<IPerCarCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation("transportation_edit_page");
	const carName = form.watch(
		`${ENUM_FORM_SECTION.CARS}.${ENUM_FORM_CARS.CARS_LIST}.${index}.${ENUM_FORM_CARS.CAR_NAME}`
	) as ENUM_VEHICLE_BODY_TYPE_TYPE | undefined;

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">
					{carName
						? t(VEHICLE_BODY_TYPE_LABELS[carName], {
								ns: "options"
							})
						: null}
				</h4>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div
					className={cn(
						"grid grid-cols-[1fr_1fr_1fr] gap-5",
						addMarginSeparately && "grid-cols-[1fr_1fr_1.5fr_0.5fr]"
					)}
				>
					{PER_CAR_ROW_FIELDS_LIST.map(
						({ key, ...item }, fieldIndex) => (
							<Fragment key={key}>
								{addMarginSeparately &&
								fieldIndex ===
									PER_CAR_ROW_FIELDS_LIST.length - 1 ? (
									<CustomInputSelect
										control={form.control}
										name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}.${ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS}.${index}.${PER_CAR_MARKUP_FIELD.key}`}
										label={PER_CAR_MARKUP_FIELD.label}
										placeholder={
											PER_CAR_MARKUP_FIELD.placeholder
										}
										selectOptions={[
											...PER_CAR_MARKUP_FIELD.selectOptions
										]}
										t={t}
									/>
								) : null}
								<CustomField
									control={form.control}
									name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_TRANSPORTATION_PRICING_FIELD.EXPENSES}.${ENUM_TRANSPORTATION_PER_CAR_EXPENSES_FIELD.CARS}.${index}.${key}`}
									t={t}
									{...item}
								/>
							</Fragment>
						)
					)}
				</div>
			</CardContent>
		</Card>
	);
};
