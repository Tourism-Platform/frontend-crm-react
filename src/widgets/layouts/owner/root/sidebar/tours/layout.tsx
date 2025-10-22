import { type PropsWithChildren } from "react";

export const ToursOwnerLayout = ({ children }: PropsWithChildren) => {
	return <div className="container mx-auto pt-12 pb-30">{children}</div>;
};
