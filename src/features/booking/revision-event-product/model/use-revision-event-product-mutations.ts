import {
	useClearRevisionEventProductMutation,
	useSetRevisionEventProductMutation
} from "@/entities/booking";
import type { IEventProductLink } from "@/entities/tour";

interface IUseRevisionEventProductMutationsArgs {
	bookingId: string;
	eventId: string;
	optionIndex?: number | null;
}

export const useRevisionEventProductMutations = ({
	bookingId,
	eventId,
	optionIndex
}: IUseRevisionEventProductMutationsArgs) => {
	const [setProduct, setState] = useSetRevisionEventProductMutation();
	const [clearProduct, clearState] = useClearRevisionEventProductMutation();

	const attach = (data: IEventProductLink) =>
		setProduct({ bookingId, eventId, optionIndex, data }).unwrap();

	const detach = () =>
		clearProduct({ bookingId, eventId, optionIndex }).unwrap();

	return {
		attach,
		detach,
		isAttaching: setState.isLoading,
		isDetaching: clearState.isLoading,
		isLoading: setState.isLoading || clearState.isLoading
	};
};
