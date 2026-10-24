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

	const add = (intent: TAddPoolMemberIntent) =>
		patch({ libraryId, action: "add", intent }).unwrap();

	const remove = (supplyId: string) =>
		patch({ libraryId, action: "remove", supplyId }).unwrap();

	return {
		members: template?.pool ?? [],
		add,
		remove,
		isLoading: patchState.isLoading
	};
};
