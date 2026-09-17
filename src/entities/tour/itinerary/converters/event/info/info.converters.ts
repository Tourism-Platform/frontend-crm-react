import { getDeviceUtcOffset } from "@/shared/hooks";

import {
	ENUM_EVENT_BACKEND,
	ENUM_FORM_EVENT_PRODUCT,
	type TInfoEditSchema,
	type TInformationDetailsWriteBackend,
	type TInformationSingleEventBackend,
	type TTimesBackend,
	type TTourEventBackendResponce,
	type TTourEventUpdateBackend
} from "../../../types";
import { getPoolMember } from "../common/event-pool.helpers";
import { toTimezoneOffset } from "../common/timezone.helpers";

export const mapInfoEventToForm = (
	data: TTourEventBackendResponce,
	selectedSupplyId?: string
): TInfoEditSchema => {
	const event = data?.event as TInformationSingleEventBackend;
	// Contract 3.1: an information entry's hours are its `plan`.
	const plan = event?.details?.plan;
	const supplyId = getPoolMember(event?.details, selectedSupplyId)?.id;

	return {
		name: event?.name || "",
		day: event.day,
		position: event.position,
		[ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID]: supplyId,
		general: {
			description: event?.description || "",
			info_start_time: plan?.start_time?.time || "",
			info_start_timezone: String(
				plan?.start_time?.timezone ?? getDeviceUtcOffset()
			),
			info_end_time: plan?.end_time?.time || "",
			info_end_timezone: String(
				plan?.end_time?.timezone ?? getDeviceUtcOffset()
			)
		}
	};
};

export const mapInfoFormToUpdate = (
	frontend: Partial<TInfoEditSchema>
): TTourEventUpdateBackend => {
	const g = frontend?.general;

	const plan: TTimesBackend = {
		...(g?.info_start_time && {
			start_time: {
				time: g.info_start_time,
				timezone: toTimezoneOffset(g.info_start_timezone)
			}
		}),
		...(g?.info_end_time && {
			end_time: {
				time: g.info_end_time,
				timezone: toTimezoneOffset(g.info_end_timezone)
			}
		})
	};

	// Contract 3.1: an information entry states nothing but its hours — the
	// write details carry only `plan` (`supply` has no spec to state).
	const details: TInformationDetailsWriteBackend = { plan };

	return {
		...(frontend.name !== undefined &&
			frontend.name !== "" && { name: frontend.name }),
		typ: ENUM_EVENT_BACKEND.REF,
		...(g?.description && { description: g.description }),
		details
	};
};
