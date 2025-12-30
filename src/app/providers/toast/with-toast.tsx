import { Toaster } from "@/shared/ui";

export const withToast = (Component: React.FC) => {
	return () => (
		<>
			<Component />
			<Toaster />
		</>
	);
};
