import type { FlightLegInput, FlightLegOutput } from "src/shared/api/generated";

/**
 * Backend flight leg (hop) shapes (contract 3.1).
 *
 * Legs live on the route spec (`details.spec.legs`) — read as
 * `FlightLegOutput`, written as `FlightLegInput`. Legs carry no times;
 * departure/arrival times are event-level (`details.plan` = `Schedule`).
 */

/** Read-side flight leg (`details.spec.legs[]`). */
export type TFlightHopBackend = FlightLegOutput;

/** Write-side flight leg (`supply.inline.spec.legs[]`). */
export type TFlightHopInputBackend = FlightLegInput;
