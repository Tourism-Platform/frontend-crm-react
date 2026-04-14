import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import { initMsw } from "./app/mws/init";
import "./shared/config/i18n/i18n.init";
import "./shared/styles/global.css";

const container = document.getElementById("root");

if (container) {
	const root = createRoot(container);

	initMsw().then(() => {
		root.render(
			<StrictMode>
				<App />
			</StrictMode>
		);
	});
}
