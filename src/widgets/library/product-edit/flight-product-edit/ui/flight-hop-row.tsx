import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import { Card, CardContent, CustomField } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import {
	ENUM_FORM_FLIGHT_PRODUCT as ENUM_FORM,
	ENUM_FORM_FLIGHT_SECTION,
	ENUM_FORM_FLIGHT_HOP as ENUM_HOP,
	type TFlightProductEditSchema
} from "@/entities/supplier";

import { FLIGHT_HOP_FIELDS_LIST } from "../model";

import { RowRemoveMenu } from "./row-remove-menu";

interface IFlightHopRowProps {
	form: UseFormReturn<TFlightProductEditSchema>;
	index: number;
	language: ENUM_LANGUAGES_TYPE;
	onRemove: () => void;
}

export const FlightHopRow: FC<IFlightHopRowProps> = ({
	form,
	index,
	language,
	onRemove
}) => {
	const { t } = useTranslation("flight_product_edit_page");
	const departureGeo = useGeoSearchFieldProps(language);
	const arrivalGeo = useGeoSearchFieldProps(language);
	const hopsPath =
		`${ENUM_FORM_FLIGHT_SECTION.GENERAL}.${ENUM_FORM.HOPS}.${index}` as const;

	useGeoFormFieldEnrichment({
		form,
		name: `${hopsPath}.${ENUM_HOP.DEPARTURE_LOCATION}` as const,
		language
	});
	useGeoFormFieldEnrichment({
		form,
		name: `${hopsPath}.${ENUM_HOP.ARRIVAL_LOCATION}` as const,
		language
	});

	return (
		<Card className="relative pb-2">
			<CardContent>
				<div className="absolute top-0 right-0">
					<RowRemoveMenu onRemove={onRemove} />
				</div>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{FLIGHT_HOP_FIELDS_LIST({
						departure: departureGeo,
						arrival: arrivalGeo
					}).map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form.control}
							name={`${hopsPath}.${key}`}
							t={t}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
