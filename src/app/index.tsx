// import { ThemeToggle } from "@/shared/ui";
import { HeaderOwner } from "@/widgets/layouts";

import { withProviders } from "./providers";

function App() {
	return (
		<div className="min-h-screen min-w-screen bg-background text-foreground">
			<HeaderOwner />
			<div className="flex gap-5 items-center">
				<div>
					<h1 className="text-9xl bg-accent">ТЕСТ ДЕПЛОЙ на ДЕВ</h1>
					<p className="text-xs">Мелкий текст</p>
				</div>
			</div>
		</div>
	);
}

export default withProviders(App);
