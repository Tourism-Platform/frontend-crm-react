import { createContext } from "react";

import type { IThemeContextType } from "../types";

export const ThemeContext = createContext<IThemeContextType | undefined>(
	undefined
);
