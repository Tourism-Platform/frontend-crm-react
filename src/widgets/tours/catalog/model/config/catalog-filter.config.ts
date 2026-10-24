import { Clock, Globe, MapPin, Tag } from "lucide-react";

import type { ICatalogFilterSectionConfig } from "../types";

export const CATALOG_FILTER_SECTIONS: ICatalogFilterSectionConfig[] = [
	{
		field: "country",
		titleKey: "filters.fields.country",
		icon: MapPin,
		isRemote: true
	},
	{
		field: "city",
		titleKey: "filters.fields.city",
		icon: MapPin,
		isRemote: true
	},
	{
		field: "duration",
		titleKey: "filters.fields.duration",
		icon: Clock
	},
	{
		field: "language",
		titleKey: "filters.fields.language",
		icon: Globe
	},
	{
		field: "category",
		titleKey: "filters.fields.category",
		icon: Tag
	}
];
