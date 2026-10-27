import type { PropsWithChildren } from "react";

import { HeaderOperator } from "../../../ui";

export const DefaultOperatorLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<HeaderOperator />
			<div className="container mx-auto px-5 mt-6 mb-30 h-full">
				{children}
			</div>
		</>
	);
};
