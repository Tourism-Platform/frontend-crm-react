import compose from "compose-function";

import { withStore } from "./store";
import { withTheme } from "./theme";
import { withToast } from "./toast";

export const withProviders = compose(withTheme, withStore, withToast);
