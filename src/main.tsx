import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import "./shared/config/i18n/i18n.init";
import "./shared/styles/global.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
