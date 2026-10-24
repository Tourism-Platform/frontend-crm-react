import { ENUM_API_TAGS } from "@/shared/api";

export const eventsTag = (tourId: string, optionId: string) => ({
	type: ENUM_API_TAGS.TOURS_EVENTS,
	id: `${tourId}-${optionId}`
});

export const eventDetailTag = (
	tourId: string,
	optionId: string,
	eventId: string,
	eventOptionId?: string
) => ({
	type: ENUM_API_TAGS.TOURS_EVENTS,
	id: `${tourId}-${optionId}-${eventId}-${eventOptionId || ""}`
});

export const pricingTag = (tourId: string, optionId: string) => ({
	type: ENUM_API_TAGS.TOURS_PRICING_SUMMARY,
	id: `${tourId}:${optionId}`
});

export const policyEventTag = (
	tourId: string,
	optionId: string,
	eventId: string
) => ({
	type: ENUM_API_TAGS.TOUR_POLICY_CHECK,
	id: `${tourId}-${optionId}-${eventId}`
});

export const policyOptionTag = (tourId: string, optionId: string) => ({
	type: ENUM_API_TAGS.TOUR_POLICY_CHECK,
	id: `${tourId}-${optionId}`
});

export const policyInvalidation = (
	tourId: string,
	optionId: string,
	eventId: string
) => [
	policyEventTag(tourId, optionId, eventId),
	policyOptionTag(tourId, optionId)
];
