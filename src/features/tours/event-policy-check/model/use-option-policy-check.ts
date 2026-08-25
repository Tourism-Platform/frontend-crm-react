import { usePolicyCheckOptionQuery } from "@/entities/tour";

interface IUseOptionPolicyCheckArgs {
	tourId: string;
	optionId: string;
}

export const useOptionPolicyCheck = ({
	tourId,
	optionId
}: IUseOptionPolicyCheckArgs) =>
	usePolicyCheckOptionQuery(
		{ tourId, optionId },
		{ skip: !tourId || !optionId }
	);
