/** Translation state of an event slot's content into the tour languages. */
export const ENUM_EVENT_TRANSLATION = {
	SOURCE: "source",
	READY: "ready",
	PENDING: "pending"
} as const;

export type ENUM_EVENT_TRANSLATION_TYPE =
	(typeof ENUM_EVENT_TRANSLATION)[keyof typeof ENUM_EVENT_TRANSLATION];
