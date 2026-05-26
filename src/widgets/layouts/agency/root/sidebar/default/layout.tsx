import type { PropsWithChildren } from "react";

export const DefaultAgencyLayout = ({ children }: PropsWithChildren) => {
	return <div className="container mx-auto pt-12 pb-30">{children}</div>;
};
