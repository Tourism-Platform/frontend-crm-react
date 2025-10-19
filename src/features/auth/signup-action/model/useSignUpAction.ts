import { useAppDispatch } from "@/shared/hooks";

import { type IAuthUser, useSignUpMutation } from "@/entities/auth";
import { login } from "@/entities/user";

export const useSignUpAction = () => {
	const [signUp, { isLoading, isError }] = useSignUpMutation();
	const dispatch = useAppDispatch();

	const handleSignUp = async (data: IAuthUser) => {
		try {
			dispatch(login());
			await signUp(data);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		handleSignUp,
		isLoading,
		isError
	};
};
