import { useContext } from "react";

import { ThemeContext } from "../context";
import type { IThemeContextType } from "../types";

export const useTheme = (): IThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
