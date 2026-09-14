import { GeneralVenueInputSubTypEnum } from "@/shared/api";

import {
	ENUM_EVENT_BACKEND,
	type ENUM_EVENT_BACKEND_TYPE,
	type TEventDetailsWriteBackend
} from "../../types";

/**
 * Minimal WRITE `details` for a palette / empty create (contract 3.1).
 *
 * A new option must state where its supply comes from. Product linking is
 * a later attach — the shell is always inline with the smallest valid spec
 * for that `typ`. Multi slots (`options`) use `details: []` on create, not
 * this helper.
 */
export const mapEmptyEventDetailsToWrite = (
	typ: ENUM_EVENT_BACKEND_TYPE
): TEventDetailsWriteBackend => {
	switch (typ) {
		case ENUM_EVENT_BACKEND.HOUSING:
			return {
				supply: { source: "inline", spec: { pricing: "per_room" } }
			};
		case ENUM_EVENT_BACKEND.ACTIVITY:
			return {
				supply: {
					source: "inline",
					spec: {
						sub_typ:
							GeneralVenueInputSubTypEnum.Sightseeing as never
					}
				}
			};
		case ENUM_EVENT_BACKEND.FLIGHT:
			return {
				supply: { source: "inline", spec: { pricing: "per_fare" } }
			};
		case ENUM_EVENT_BACKEND.TRAIN:
			return {
				supply: { source: "inline", spec: { pricing: "per_fare" } }
			};
		case ENUM_EVENT_BACKEND.BUS:
			return {
				supply: { source: "inline", spec: { pricing: "per_vehicle" } }
			};
		case ENUM_EVENT_BACKEND.TRANSFER:
			return {
				supply: { source: "inline", spec: { pricing: "per_car" } }
			};
		case ENUM_EVENT_BACKEND.GUIDE:
			return { supply: { source: "inline", spec: {} } };
		case ENUM_EVENT_BACKEND.SUPPLEMENTARY:
			return { supply: { source: "inline", spec: {} } };
		case ENUM_EVENT_BACKEND.REF:
			return { supply: { source: "inline" } };
		case ENUM_EVENT_BACKEND.OPTIONS:
			return {};
	}
};

/** Keep an existing WRITE supply; otherwise fill the inline shell. */
export const mapEventDetailsWriteOrEmpty = (
	typ: ENUM_EVENT_BACKEND_TYPE,
	details?: TEventDetailsWriteBackend
): TEventDetailsWriteBackend => {
	if (details?.supply) return details;
	return {
		...details,
		...mapEmptyEventDetailsToWrite(typ)
	} as TEventDetailsWriteBackend;
};
