import React, { useCallback, useEffect, useMemo, useState } from "react";

import { storage } from "@/shared/lib";
import { type IThemeContextType, type TTheme, ThemeContext } from "@/shared/ui";

interface IThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<TTheme>(() => {
		return storage.get<TTheme>("theme", "light");
	});

	const toggleTheme = useCallback((): void => {
		setTheme((prev) => {
			const newTheme: TTheme = prev === "light" ? "dark" : "light";
			storage.set("theme", newTheme);
			return newTheme;
		});
	}, []);

	useEffect(() => {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
		storage.set("theme", theme);
	}, [theme]);

	const value: IThemeContextType = useMemo(
		() => ({ theme, toggleTheme }),
		[theme, toggleTheme]
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};
