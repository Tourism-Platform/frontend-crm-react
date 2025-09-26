import React, { useEffect, useState } from "react";

import { storage } from "@/shared/lib";
import { type IThemeContextType, type TTheme, ThemeContext } from "@/shared/ui";

interface IThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<TTheme>(() => {
		return storage.get<TTheme>("theme", "light");
	});

	const toggleTheme = (): void => {
		const newTheme: TTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		storage.set("theme", newTheme);
	};

	useEffect(() => {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
		storage.set("theme", theme);
	}, [theme]);

	const value: IThemeContextType = {
		theme,
		toggleTheme
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
