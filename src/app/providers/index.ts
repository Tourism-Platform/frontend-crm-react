import compose from "compose-function";

import { withStore } from "./store";
import { withSuspense } from "./suspense";
import { withTheme } from "./theme";
import { withToast } from "./toast";

export const withProviders = compose(
	withTheme,
	withStore,
	withToast,
	withSuspense
);
