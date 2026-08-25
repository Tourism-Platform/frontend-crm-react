import {
	useClearRevisionEventOverrideMutation,
	useSetRevisionEventOverrideMutation
} from "@/entities/booking";
import type { TEventOverride } from "@/entities/tour";

interface IUseRevisionEventOverrideMutationsArgs {
	bookingId: string;
	eventId: string;
	optionIndex?: number | null;
}

export const useRevisionEventOverrideMutations = ({
	bookingId,
	eventId,
	optionIndex
}: IUseRevisionEventOverrideMutationsArgs) => {
	const [setOverride, setState] = useSetRevisionEventOverrideMutation();
	const [clearOverride, clearState] = useClearRevisionEventOverrideMutation();

	const set = (data: TEventOverride) =>
		setOverride({ bookingId, eventId, optionIndex, data }).unwrap();

	const clear = () =>
		clearOverride({ bookingId, eventId, optionIndex }).unwrap();

	return {
		set,
		clear,
		isSetting: setState.isLoading,
		isClearing: clearState.isLoading,
		isLoading: setState.isLoading || clearState.isLoading
	};
};
