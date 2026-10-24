import { getGoogleLoginUrl } from "@/entities/auth";

export function useGoogleLogin() {
	const handleGoogleLogin = () => {
		window.location.assign(getGoogleLoginUrl());
	};

	return { handleGoogleLogin };
}
