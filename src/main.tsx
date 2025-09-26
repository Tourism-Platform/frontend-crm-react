import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import "./shared/styles/global.css";
import "./shared/ui/language-toggle/model/helpers/i18n";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
