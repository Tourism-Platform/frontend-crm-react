import type { TFlightEditSchema } from "../../../types";

export const createStubPricing = (): TFlightEditSchema["pricing"] => ({
	total_price: 100,
	taxes: 0,
	currency: "USD"
});

export const mapEventMetaToForm = (event: {
	name?: string | null;
	day: number;
	position: number;
}): Pick<TFlightEditSchema, "name" | "day" | "position"> => ({
	name: event.name ?? "",
	day: event.day,
	position: event.position
});

export const buildPartialFlightEditForm = (
	payload: Omit<TFlightEditSchema, "pricing">
): TFlightEditSchema =>
	({
		...payload,
		pricing: createStubPricing()
	}) as unknown as TFlightEditSchema;
