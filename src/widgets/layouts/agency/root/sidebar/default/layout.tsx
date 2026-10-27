import type { PropsWithChildren } from "react";

import { HeaderAgency } from "../../../ui";

export const DefaultAgencyLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<HeaderAgency />
			<div className="container mx-auto px-5 mt-6 mb-30 h-full">
				{children}
			</div>
		</>
	);
};
