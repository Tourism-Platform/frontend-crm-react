import React from "react";

import { ThemeProvider } from "./theme.provider";

export const withTheme = <P extends object>(
	Component: React.ComponentType<P>
): React.FC<P> => {
	const WithTheme: React.FC<P> = (props) => {
		return (
			<ThemeProvider>
				<Component {...props} />
			</ThemeProvider>
		);
	};

	WithTheme.displayName = `withTheme(${Component.displayName || Component.name || "Component"})`;

	return WithTheme;
};
