import { Moon, Sun } from "lucide-react";
import React from "react";

import { Button } from "@/shared/ui";

import { useTheme } from "../model";

export const ThemeToggle: React.FC = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={toggleTheme}
			className="hover:bg-primary/10 cursor-pointer"
			aria-label="Toggle theme"
		>
			{theme === "light" ? (
				<Moon className="h-4 w-4" />
			) : (
				<Sun className="h-4 w-4" />
			)}
		</Button>
	);
};
