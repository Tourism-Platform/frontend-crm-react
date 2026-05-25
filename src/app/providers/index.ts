import compose from "compose-function";

import { withErrorBoundary } from "@/shared/ui";

import { withStore } from "./store";
import { withTheme } from "./theme";
import { withToast } from "./toast";

export const withProviders = compose(
	withErrorBoundary,
	withTheme,
	withStore,
	withToast
);
