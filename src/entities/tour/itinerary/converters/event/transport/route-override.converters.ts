import {
	type RouteOverrideInput,
	RouteOverrideInputTypEnum,
	type RouteOverrideOutput,
	RouteOverrideOutputTypEnum
} from "@/shared/api";

const ROUTE_OVERRIDE_TYP_TO_INPUT: Record<
	RouteOverrideOutputTypEnum,
	RouteOverrideInputTypEnum
> = {
	[RouteOverrideOutputTypEnum.Train]: RouteOverrideInputTypEnum.Train,
	[RouteOverrideOutputTypEnum.Flight]: RouteOverrideInputTypEnum.Flight
};

/**
 * Route (train/flight) override READ (contract 6): Output → Input.
 * Structures are identical modulo field optionality; the pick is explicit so
 * server-owned fields never leak into a PATCH body. Both arms map through:
 * `whole` charge and `per_fare` fare rows.
 */
export const mapRouteOverrideFromBackend = (
	override?: RouteOverrideOutput | null
): RouteOverrideInput | null => {
	if (!override) {
		return null;
	}

	return {
		typ: ROUTE_OVERRIDE_TYP_TO_INPUT[override.typ],
		rates: override.rates
	};
};
