import type { TFlightEditSchema } from "../../../types";

export const mapEventMetaToForm = (event: {
	name?: string | null;
	day: number;
	position: number;
}): Pick<TFlightEditSchema, "name" | "day" | "position"> => ({
	name: event.name ?? "",
	day: event.day,
	position: event.position
});
