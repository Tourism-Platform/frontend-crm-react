import type { FieldValues } from "react-hook-form";

import type { IAutosavePart } from "@/shared/lib";

import type {
	TTourEventMemberUpdateBackend,
	TTourEventOptionUpdateBackend
} from "./event-backend.types";

/**
 * Event autosave parts: `option` (`PATCH O`: texts, package, plan) and
 * `member` (`PATCH M`: the selected inline supplier spec). Bodies are built
 * inside the entity, so `useAutosave` compares exactly what is sent.
 */
export interface IEventAutosaveParts<T extends FieldValues> {
	option: IAutosavePart<T, TTourEventOptionUpdateBackend>;
	member: IAutosavePart<
		T,
		{ supplyId: string; body: TTourEventMemberUpdateBackend }
	>;
}
