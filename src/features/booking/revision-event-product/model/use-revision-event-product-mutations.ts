import {
	useClearRevisionEventProductMutation,
	useSetRevisionEventProductMutation
} from "@/entities/booking";
import type { IEventProductLink } from "@/entities/tour";

interface IUseRevisionEventProductMutationsArgs {
	bookingId: string;
	eventId: string;
	optionIndex?: number | null;
	supplyId?: string;
}

export const useRevisionEventProductMutations = ({
	bookingId,
	eventId,
	optionIndex,
	supplyId
}: IUseRevisionEventProductMutationsArgs) => {
	const [setProduct, setState] = useSetRevisionEventProductMutation();
	const [clearProduct, clearState] = useClearRevisionEventProductMutation();

	const attach = (data: IEventProductLink) =>
		setProduct({
			bookingId,
			eventId,
			supplyId: supplyId ?? "",
			optionIndex,
			data
		}).unwrap();

	const detach = () =>
		clearProduct({
			bookingId,
			eventId,
			supplyId: supplyId ?? "",
			optionIndex
		}).unwrap();

	return {
		attach,
		detach,
		isAttaching: setState.isLoading,
		isDetaching: clearState.isLoading,
		isLoading: setState.isLoading || clearState.isLoading
	};
};
