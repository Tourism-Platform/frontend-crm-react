import compose from "compose-function";

import { withStore } from "./store";
import { withTheme } from "./theme";

export const withProviders = compose(withTheme, withStore);
