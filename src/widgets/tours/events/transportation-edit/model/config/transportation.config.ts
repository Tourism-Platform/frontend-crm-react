import { MapPin } from "lucide-react";

import { UTC_OPTIONS } from "@/shared/config";
import { useValueToTranslateLabel } from "@/shared/utils";

import type { TGeoFieldProps } from "@/entities/geo";
import {
	ENUM_FORM_TRANSPORTATION,
	TRANSFER_TYPE_LABELS
} from "@/entities/tour";

import { type TForm } from "../types";

type TTransportationGeoProps = {
	meetPoint: TGeoFieldProps;
	endPoint: TGeoFieldProps;
};

export const TRANSPORTATION_DATA_LIST = ({
	meetPoint,
	endPoint
}: TTransportationGeoProps): TForm[] => [
	{
		label: "form.general.details.form.fields.transfer_type.label",
		placeholder:
			"form.general.details.form.fields.transfer_type.placeholder",
		key: ENUM_FORM_TRANSPORTATION.TRANSFER_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(TRANSFER_TYPE_LABELS),
		className: "col-span-2"
	},
	{
		label: "form.general.details.form.fields.meet_point.label",
		placeholder: "form.general.details.form.fields.meet_point.placeholder",
		emptyText: "form.general.details.form.fields.meet_point.empty",
		key: ENUM_FORM_TRANSPORTATION.MEET_POINT,
		fieldType: "geo",
		className: "col-span-2",
		icon: MapPin,
		...meetPoint
	},
	{
		label: "form.general.details.form.fields.end_point.label",
		placeholder: "form.general.details.form.fields.end_point.placeholder",
		emptyText: "form.general.details.form.fields.end_point.empty",
		key: ENUM_FORM_TRANSPORTATION.END_POINT,
		fieldType: "geo",
		className: "col-span-2",
		icon: MapPin,
		...endPoint
	},
	{
		label: "form.general.details.form.fields.departure_date.label",
		placeholder:
			"form.general.details.form.fields.departure_date.placeholder",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "form.general.details.form.fields.arrival_date.label",
		placeholder:
			"form.general.details.form.fields.arrival_date.placeholder",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_DATE,
		fieldType: "date",
		className: "col-span-2"
	},
	{
		label: "form.general.details.form.fields.arrival_time.label",
		placeholder:
			"form.general.details.form.fields.arrival_time.placeholder",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_TIME,
		fieldType: "time"
	},
	{
		label: "form.general.details.form.fields.arrival_timezone.label",
		placeholder:
			"form.general.details.form.fields.arrival_timezone.placeholder",
		key: ENUM_FORM_TRANSPORTATION.ARRIVAL_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	},
	{
		label: "form.general.details.form.fields.departure_time.label",
		placeholder:
			"form.general.details.form.fields.departure_time.placeholder",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_TIME,
		fieldType: "time"
	},
	{
		label: "form.general.details.form.fields.departure_timezone.label",
		placeholder:
			"form.general.details.form.fields.departure_timezone.placeholder",
		key: ENUM_FORM_TRANSPORTATION.DEPARTURE_TIMEZONE,
		fieldType: "select",
		options: UTC_OPTIONS
	}
];
