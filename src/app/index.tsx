import { ThemeToggle } from "@/shared/ui";

import { withProviders } from "./providers";

function App() {
	return (
		<div className="min-h-screen min-w-screen bg-background text-foreground">
			<div className="flex gap-5 items-center">
				<div>
					<h1 className="text-9xl bg-accent">ТЕСТ ДЕПЛОЙ на ДЕВ</h1>
					<p className="text-xs">Мелкий текст</p>
				</div>
				<ThemeToggle />
			</div>
		</div>
	);
}

export default withProviders(App);
