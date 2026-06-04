import React, { type FC, useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	ENUM_LANGUAGES,
	type ENUM_LANGUAGES_TYPE,
	i18nLanguageMapper
} from "@/shared/config";
import { Card, CardContent, CustomField } from "@/shared/ui";

import {
	useGeoFormFieldEnrichment,
	useGeoSearchFieldProps
} from "@/entities/geo";
import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	type ENUM_FLIGHT_TRANSPORT_TYPE_TYPE,
	ENUM_FORM_BUS,
	ENUM_FORM_FLIGHT,
	ENUM_FLIGHT_FORM_SECTION as ENUM_FORM_SECTION,
	ENUM_FORM_TRAIN,
	type TFlightEditSchema
} from "@/entities/tour";

import { BUS_DATA_LIST, FLY_DATA_LIST, TRAIN_DATA_LIST } from "../../model";

import { FlightMenu } from "./flight-menu";

interface IFlightCardProps {
	form: UseFormReturn<TFlightEditSchema>;
	onRemove: (index: number) => void;
	index: number;
}

type TTrainBusGeoEnrichmentProps = {
	form: UseFormReturn<TFlightEditSchema>;
	index: number;
	transportType: ENUM_FLIGHT_TRANSPORT_TYPE_TYPE;
	language: ENUM_LANGUAGES_TYPE;
};

const TrainBusGeoEnrichment: FC<TTrainBusGeoEnrichmentProps> = ({
	form,
	index,
	transportType,
	language
}) => {
	const isTrain = transportType === ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN;
	const departureFieldName =
		`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_FLIGHT.ROUTE}.${index}.${
			isTrain
				? ENUM_FORM_TRAIN.DEPARTURE_STATION
				: ENUM_FORM_BUS.DEPARTURE_POINT
		}` as const;
	const arrivalFieldName =
		`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_FLIGHT.ROUTE}.${index}.${
			isTrain
				? ENUM_FORM_TRAIN.ARRIVAL_STATION
				: ENUM_FORM_BUS.ARRIVAL_POINT
		}` as const;

	useGeoFormFieldEnrichment({ form, name: departureFieldName, language });
	useGeoFormFieldEnrichment({ form, name: arrivalFieldName, language });

	return null;
};

export const FlightCard: FC<IFlightCardProps> = React.memo(
	({ form, onRemove, index }) => {
		const { t, i18n } = useTranslation("flight_edit_page");
		const language =
			i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
		const departureGeo = useGeoSearchFieldProps(language);
		const arrivalGeo = useGeoSearchFieldProps(language);

		const data = form.watch();
		const transportType = data?.general?.transport_type;
		const isGeoTransport =
			transportType === ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN ||
			transportType === ENUM_FLIGHT_TRANSPORT_TYPE.BUS;

		const segmentGeo = useMemo(
			() => ({ departure: departureGeo, arrival: arrivalGeo }),
			[departureGeo, arrivalGeo]
		);

		const dataList = useMemo(() => {
			if (transportType === ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN) {
				return TRAIN_DATA_LIST(segmentGeo);
			}
			if (transportType === ENUM_FLIGHT_TRANSPORT_TYPE.BUS) {
				return BUS_DATA_LIST(segmentGeo);
			}
			return FLY_DATA_LIST;
		}, [transportType, segmentGeo]);

		return (
			<Card className="relative">
				<CardContent>
					<div className="absolute top-0 right-0">
						<FlightMenu onRemove={() => onRemove(index)} />
					</div>
					{isGeoTransport && transportType && (
						<TrainBusGeoEnrichment
							form={form}
							index={index}
							transportType={transportType}
							language={language}
						/>
					)}
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
