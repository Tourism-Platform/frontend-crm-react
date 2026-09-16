import type {
	BusDetailsOutput,
	FlightDetailsOutput,
	PerFareFlightRouteInput,
	PerFareFlightRouteOutput,
	TrainDetailsOutput,
	WholeFlightRouteInput,
	WholeFlightRouteOutput
} from "src/shared/api/generated";

/**
 * Backend pricing shapes for flight/train event specs (contract 3.1).
 *
 * Read: `pool[].spec` = `{ pricing: "per_fare" } & PerFare*RouteOutput`
 *   | `{ pricing: "whole" } & Whole*RouteOutput`
 * Write (inside `supply.inline.spec`): the matching `*Input` members.
 */

/** Read-side flight route spec union. */
export type TFlightPricingBackend =
	| PerFareFlightRouteOutput
	| WholeFlightRouteOutput;

/** Write-side flight route spec union (goes into `supply.inline.spec`). */
export type TFlightPricingInputBackend =
	| PerFareFlightRouteInput
	| WholeFlightRouteInput;

/** Read-side details of a priced route/fleet event (flight, train or bus). */
export type TTransportDetailsWithPricingBackend =
	| FlightDetailsOutput
	| TrainDetailsOutput
	| BusDetailsOutput;
