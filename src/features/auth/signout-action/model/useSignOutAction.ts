import { useAppDispatch } from "@/shared/hooks";

import { useSignOutMutation } from "@/entities/auth";
import { logout } from "@/entities/user";

export const useSignOutAction = () => {
	const [signOut, { isLoading, isError }] = useSignOutMutation();
	const dispatch = useAppDispatch();

	const handleSignOut = async () => {
		try {
			await signOut().unwrap();
			dispatch(logout());
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	return {
		handleSignOut,
		isLoading,
		isError
	};
};
