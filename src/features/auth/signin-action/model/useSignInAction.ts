import { useAppDispatch } from "@/shared/hooks";

import { type IAuthUser, useSignInMutation } from "@/entities/auth";
import { login } from "@/entities/user";

export const useSignInAction = () => {
	const [signIn, { isLoading, isError }] = useSignInMutation();
	const dispatch = useAppDispatch();

	const handleSignIn = async (data: IAuthUser) => {
		try {
			dispatch(login());
			await signIn(data);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		handleSignIn,
		isLoading,
		isError
	};
};
