import {
	useAddRevisionPoolMemberMutation,
	useRemoveRevisionPoolMemberMutation
} from "@/entities/booking";
import type { TAddPoolMemberIntent } from "@/entities/tour";

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

	const add = (intent: TAddPoolMemberIntent) =>
		addMember({ bookingId, eventId, optionIndex, intent }).unwrap();

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
