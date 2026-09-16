import {
	LIBRARY_EVENT_CREATE_ID,
	type TAddPoolMemberIntent,
	useGetEventLibraryTemplateQuery,
	usePatchEventLibraryPoolMutation
} from "@/entities/tour";

export const useLibraryEventPool = (libraryId: string) => {
	const skip = !libraryId || libraryId === LIBRARY_EVENT_CREATE_ID;
	const { data: template } = useGetEventLibraryTemplateQuery(libraryId, {
		skip
	});
	const [patch, patchState] = usePatchEventLibraryPoolMutation();

	const add = async (intent: TAddPoolMemberIntent) => {
		if (!template) {
			throw new Error("Library event is not loaded");
		}

		return patch({
			libraryId,
			action: "add",
			template,
			intent
		}).unwrap();
	};

	const remove = async (supplyId: string) => {
		if (!template) {
			throw new Error("Library event is not loaded");
		}

		return patch({
			libraryId,
			action: "remove",
			template,
			supplyId
		}).unwrap();
	};

	return {
		template,
		add,
		remove,
		isLoading: patchState.isLoading
	};
};
