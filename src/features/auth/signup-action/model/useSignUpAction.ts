import { useAppDispatch } from "@/shared/hooks";

import { type IAuthUser, useSignUpMutation } from "@/entities/auth";
import { login } from "@/entities/user";

export const useSignUpAction = () => {
	const [signUp, { isLoading, isError, error }] = useSignUpMutation();
	const dispatch = useAppDispatch();

	const handleSignUp = async (data: IAuthUser) => {
		try {
			await signUp(data).unwrap();
			dispatch(login());
		} catch (error) {
			console.error("Sign up error:", error);
		}
	};

	return {
		handleSignUp,
		isLoading,
		isError,
		error
	};
};
