import compose from "compose-function";

import { withTheme } from "./theme";

export const withProviders = compose(withTheme);
