import { type IAuthUser, useSignInMutation } from "@/entities/auth";

export const useSignUpAction = () => {
	const [signUp, { isLoading, isError, error }] = useSignInMutation();

	const handleSignUp = async (data: IAuthUser) => {
		try {
			await signUp(data).unwrap();
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
