import { type IAuthUser, useSignInMutation } from "@/entities/auth";

export const useSignInAction = () => {
	const [signIn, { isLoading, isError, error }] = useSignInMutation();

	const handleSignIn = async (data: IAuthUser) => {
		try {
			await signIn(data).unwrap();
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
