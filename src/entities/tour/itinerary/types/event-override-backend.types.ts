import type { TOUR_EVENTS_PATHS } from "@/shared/api";

/** PATCH body union — all six override types the backend accepts. */
export type TEventOverrideInputBackend = ReturnType<
	typeof TOUR_EVENTS_PATHS.setPoolMemberOverride
>["_types"]["body"];
