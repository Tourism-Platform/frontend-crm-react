import { MapPin } from "lucide-react";

import type { TGeoFieldProps } from "@/entities/geo";
import { ENUM_FORM_ACCOMMODATION } from "@/entities/tour";

import { type TForm } from "../types";

export const PROPERTIES_LIST = (geo: TGeoFieldProps): TForm[] => [
	{
		label: "form.general.properties.form.fields.property.label",
		placeholder: "form.general.properties.form.fields.property.placeholder",
		emptyText: "form.general.properties.form.fields.property.empty",
		key: ENUM_FORM_ACCOMMODATION.PROPERTY,
		fieldType: "geo",
		icon: MapPin,
		className: "col-span-2",
		...geo
	}
];
