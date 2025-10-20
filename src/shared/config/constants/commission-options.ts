import type { SelectPickerOption } from "@/shared/ui";

export const COMMISSION_OPTIONS: SelectPickerOption[] = [
	{
		label: "Fixed amount",
		value: "fixed"
	},
	{
		label: "Percentage of total price",
		value: "percentage"
	},
	{
		label: "Partner commission",
		value: "partner"
	},
	{
		label: "Platform commission",
		value: "platform"
	},
	{
		label: "Service fee",
		value: "service_fee"
	},
	{
		label: "No commission",
		value: "none"
	}
];
