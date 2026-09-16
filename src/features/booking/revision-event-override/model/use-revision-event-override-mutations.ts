import {
	useClearRevisionEventOverrideMutation,
	useSetRevisionEventOverrideMutation
} from "@/entities/booking";
import type { TEventOverride } from "@/entities/tour";

interface IUseRevisionEventOverrideMutationsArgs {
	bookingId: string;
	eventId: string;
	optionIndex?: number | null;
	supplyId?: string;
}

export const useRevisionEventOverrideMutations = ({
	bookingId,
	eventId,
	optionIndex,
	supplyId
}: IUseRevisionEventOverrideMutationsArgs) => {
	const [setOverride, setState] = useSetRevisionEventOverrideMutation();
	const [clearOverride, clearState] = useClearRevisionEventOverrideMutation();

	const set = (data: TEventOverride) =>
		setOverride({
			bookingId,
			eventId,
			supplyId: supplyId ?? "",
			optionIndex,
			data
		}).unwrap();

	const clear = () =>
		clearOverride({
			bookingId,
			eventId,
			supplyId: supplyId ?? "",
			optionIndex
		}).unwrap();

	return {
		set,
		clear,
		isSetting: setState.isLoading,
		isClearing: clearState.isLoading,
		isLoading: setState.isLoading || clearState.isLoading
	};
};
