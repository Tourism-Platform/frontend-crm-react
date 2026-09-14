import type {
	HousingInlineSupplyNew,
	PerRoomHotelInput,
	PerRoomHotelOutput,
	PricedRoomOutput,
	StayRateInput,
	StayRateOutput,
	WholeHotelInput,
	WholeHotelOutput
} from "src/shared/api/generated";

/**
 * Backend pricing shapes for a housing event spec (contract 3.1).
 *
 * Read: `details.spec` = `{ pricing: "per_room" } & PerRoomHotelOutput`
 *   | `{ pricing: "whole" } & WholeHotelOutput`
 * Write (inside `supply.inline.spec`): the matching `*Input` members.
 */

/** Read-side housing spec union. */
export type THousingPricingBackend = PerRoomHotelOutput | WholeHotelOutput;

/** Write-side housing spec union (goes into `supply.inline.spec`). */
export type THousingPricingInputBackend = PerRoomHotelInput | WholeHotelInput;

/** Read-side priced-room row (`PerRoomHotelOutput.categories[].rooms[]`). */
export type THousingRoomPricingBackend =
	PerRoomHotelOutput["categories"][number]["rooms"][number];

/** Write-side priced-room row (`PerRoomHotelInput.categories[].rooms[]`). */
export type THousingRoomPricingInputBackend = NonNullable<
	NonNullable<PerRoomHotelInput["categories"]>[number]["rooms"]
>[number];

/** Read-side whole-hotel price (`WholeHotelOutput.price`). */
export type THousingStayRateBackend = StayRateOutput;

/** Write-side whole-hotel price (`WholeHotelInput.price`). */
export type THousingStayRateInputBackend = StayRateInput;

/** Write-side housing spec — goes into `supply.inline.spec`. */
export type THousingSpecInputBackend = HousingInlineSupplyNew["spec"];

/** Read-side per-room base charge (`PricedRoomOutput.rate.base`). */
export type THousingRoomBaseChargeBackend = PricedRoomOutput["rate"]["base"];
