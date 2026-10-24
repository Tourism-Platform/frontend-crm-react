import { ENUM_PATH, buildRoute } from "@/shared/config";

import { TOUR_PACKAGE_CREATE_ID, getEventPath } from "@/entities/tour";

interface IPackageCreateRouteParams {
	tourId: string;
	optionId: string;
	fromEventId?: string;
	fromEventType?: string;
	fromEventOptionId?: string;
}

interface IEventPricingReturnRouteParams {
	tourId: string;
	optionId: string;
	fromEventId: string;
	fromEventType: string;
	fromEventOptionId?: string | null;
}

export const buildPackageCreateRoute = ({
	tourId,
	optionId,
	fromEventId,
	fromEventType,
	fromEventOptionId
}: IPackageCreateRouteParams) =>
	buildRoute(
		ENUM_PATH.TOURS.PACKAGE,
		{
			tourId,
			optionId,
			packageId: TOUR_PACKAGE_CREATE_ID
		},
		{
			fromEventId,
			fromEventType,
			fromEventOptionId
		}
	);

export const buildEventPricingReturnRoute = ({
	tourId,
	optionId,
	fromEventId,
	fromEventType,
	fromEventOptionId
}: IEventPricingReturnRouteParams) => {
	const pathTemplate = getEventPath(fromEventType, !!fromEventOptionId);

	if (!pathTemplate) {
		return buildRoute(ENUM_PATH.TOURS.PRICING_REVIEW, { tourId });
	}

	return buildRoute(
		pathTemplate,
		{
			tourId,
			optionId,
			eventId: fromEventId,
			...(fromEventOptionId ? { eventOptionId: fromEventOptionId } : {})
		},
		{ tab: "pricing" }
	);
};
