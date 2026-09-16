import { useParams } from "react-router-dom";

import {
	ENUM_EVENT_MODE,
	LIBRARY_EVENT_CREATE_ID,
	canRemovePoolMember,
	getEventPool,
	useEventEditIds,
	useGetTourEventQuery
} from "@/entities/tour";

import {
	ENUM_EVENT_POOL_VARIANT,
	type ENUM_EVENT_POOL_VARIANT_TYPE
} from "./types";
import { useEventPoolMutations } from "./use-event-pool-mutations";
import { useLibraryEventPool } from "./use-library-event-pool";

export const useEventPoolMembers = (variant: ENUM_EVENT_POOL_VARIANT_TYPE) => {
	const { tourId, optionId, eventId, eventOptionId, mode } =
		useEventEditIds();
	const { libraryId = "" } = useParams<{ libraryId?: string }>();
	const tourQuery = useGetTourEventQuery(
		{
			tourId,
			optionId,
			eventId,
			...(mode === ENUM_EVENT_MODE.MULTI && { eventOptionId })
		},
		{
			skip:
				variant !== ENUM_EVENT_POOL_VARIANT.TOUR ||
				!tourId ||
				!optionId ||
				!eventId
		}
	);
	const libraryPool = useLibraryEventPool(
		variant === ENUM_EVENT_POOL_VARIANT.LIBRARY ? libraryId : ""
	);
	const tourMutations = useEventPoolMutations();

	const details =
		variant === ENUM_EVENT_POOL_VARIANT.LIBRARY
			? libraryPool.template?.event.details
			: tourQuery.data?.details;
	const members = getEventPool(details);

	return {
		members,
		canRemove: canRemovePoolMember(details),
		isBusy:
			variant === ENUM_EVENT_POOL_VARIANT.LIBRARY
				? libraryPool.isLoading
				: tourMutations.isLoading,
		isAdding:
			variant === ENUM_EVENT_POOL_VARIANT.LIBRARY
				? libraryPool.isLoading
				: tourMutations.isAdding,
		isRemoving:
			variant === ENUM_EVENT_POOL_VARIANT.LIBRARY
				? libraryPool.isLoading
				: tourMutations.isRemoving,
		isSettingMain: tourMutations.isSettingMain,
		add:
			variant === ENUM_EVENT_POOL_VARIANT.LIBRARY
				? libraryPool.add
				: tourMutations.add,
		remove:
			variant === ENUM_EVENT_POOL_VARIANT.LIBRARY
				? libraryPool.remove
				: tourMutations.remove,
		setMain:
			variant === ENUM_EVENT_POOL_VARIANT.TOUR
				? tourMutations.setMain
				: undefined,
		hideForCreate:
			variant === ENUM_EVENT_POOL_VARIANT.LIBRARY &&
			libraryId === LIBRARY_EVENT_CREATE_ID
	};
};
