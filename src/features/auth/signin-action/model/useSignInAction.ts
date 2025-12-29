import { useAppDispatch } from "@/shared/hooks";

import { type IAuthUser, useSignInMutation } from "@/entities/auth";
import { login } from "@/entities/user";

export const useSignInAction = () => {
	const [signIn, { isLoading, isError, error }] = useSignInMutation();
	const dispatch = useAppDispatch();

	const handleSignIn = async (data: IAuthUser) => {
		try {
			await signIn(data).unwrap();
			dispatch(login());
		} catch (error) {
			console.error("Sign in error:", error);
		}
	};

	return {
		handleSignIn,
		isLoading,
		isError,
		error
	};
};
