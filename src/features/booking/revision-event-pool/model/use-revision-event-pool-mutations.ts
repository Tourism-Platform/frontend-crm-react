import {
	type TRevisionPoolMemberNewBackend,
	useAddRevisionPoolMemberMutation,
	useRemoveRevisionPoolMemberMutation
} from "@/entities/booking";

interface IUseRevisionEventPoolMutationsArgs {
	bookingId: string;
	eventId: string;
	optionIndex?: number | null;
}

export const useRevisionEventPoolMutations = ({
	bookingId,
	eventId,
	optionIndex
}: IUseRevisionEventPoolMutationsArgs) => {
	const [addMember, addState] = useAddRevisionPoolMemberMutation();
	const [removeMember, removeState] = useRemoveRevisionPoolMemberMutation();

	const add = (data: TRevisionPoolMemberNewBackend) =>
		addMember({ bookingId, eventId, optionIndex, data }).unwrap();

	const remove = (supplyId: string) =>
		removeMember({ bookingId, eventId, optionIndex, supplyId }).unwrap();

	return {
		add,
		remove,
		isAdding: addState.isLoading,
		isRemoving: removeState.isLoading,
		isLoading: addState.isLoading || removeState.isLoading
	};
};
