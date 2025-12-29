import { Toaster } from "@/shared/ui/shadcn-ui/sonner";

export const withToast = (Component: React.FC) => {
	return () => (
		<>
			<Component />
			<Toaster />
		</>
	);
};
