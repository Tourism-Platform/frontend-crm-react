import { useAppDispatch } from "@/shared/hooks";

import { useSignOutMutation } from "@/entities/auth";
import { logout } from "@/entities/user";

export const useSignOutAction = () => {
	const [signOut, { isLoading, isError }] = useSignOutMutation();
	const dispatch = useAppDispatch();

	const handleSignOut = async () => {
		try {
			dispatch(logout());
			await signOut();
		} catch (error) {
			console.log(error);
		}
	};

	return {
		handleSignOut,
		isLoading,
		isError
	};
};
