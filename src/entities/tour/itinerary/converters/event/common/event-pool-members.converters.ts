import type { IEventPoolMember, TEventDetailsBackend } from "../../../types";
import { eventKindMapper } from "../../event-kind.converters";
import { isEventBackendTyp } from "../../event-type.converters";

import { mapEventOverrideDetailsToForm } from "./event-override-form.converters";
import { getOverridePerUnitPricing } from "./event-override-units.helpers";
import { mapEventPoolToSummary } from "./event-pool.helpers";

/**
 * READ pool of an option row → members with what their override dialog opens
 * with. A typ without a pool (e.g. `options`) has no members.
 */
export const mapEventPoolMembersToFrontend = (
	typ: string,
	details: TEventDetailsBackend | undefined
): IEventPoolMember[] => {
	const eventKind = isEventBackendTyp(typ)
		? eventKindMapper.from(typ)
		: undefined;
	if (!eventKind) return [];

	return mapEventPoolToSummary(details).map((member) => ({
		...member,
		override: {
			initialValues: mapEventOverrideDetailsToForm(
				eventKind,
				details,
				member.id
			),
			perUnitPricing: getOverridePerUnitPricing(details, member.id)
		}
	}));
};
