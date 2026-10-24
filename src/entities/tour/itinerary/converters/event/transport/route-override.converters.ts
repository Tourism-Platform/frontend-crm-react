import {
	ENUM_ROUTE_OVERRIDE_INPUT_TYP_BACKEND,
	type ENUM_ROUTE_OVERRIDE_INPUT_TYP_BACKEND_TYPE,
	ENUM_ROUTE_OVERRIDE_OUTPUT_TYP_BACKEND,
	type ENUM_ROUTE_OVERRIDE_OUTPUT_TYP_BACKEND_TYPE,
	type TRouteOverrideInputBackend,
	type TRouteOverrideOutputBackend
} from "../../../types";

const ROUTE_OVERRIDE_TYP_TO_INPUT: Record<
	ENUM_ROUTE_OVERRIDE_OUTPUT_TYP_BACKEND_TYPE,
	ENUM_ROUTE_OVERRIDE_INPUT_TYP_BACKEND_TYPE
> = {
	[ENUM_ROUTE_OVERRIDE_OUTPUT_TYP_BACKEND.TRAIN]:
		ENUM_ROUTE_OVERRIDE_INPUT_TYP_BACKEND.TRAIN,
	[ENUM_ROUTE_OVERRIDE_OUTPUT_TYP_BACKEND.FLIGHT]:
		ENUM_ROUTE_OVERRIDE_INPUT_TYP_BACKEND.FLIGHT
};

/**
 * Route (train/flight) override READ (contract 6): Output → Input.
 * Structures are identical modulo field optionality; the pick is explicit so
 * server-owned fields never leak into a PATCH body. Both arms map through:
 * `whole` charge and `per_fare` fare rows.
 */
export const mapRouteOverrideFromBackend = (
	override?: TRouteOverrideOutputBackend | null
): TRouteOverrideInputBackend | null => {
	if (!override) {
		return null;
	}

	return {
		typ: ROUTE_OVERRIDE_TYP_TO_INPUT[override.typ],
		rates: override.rates
	};
};
