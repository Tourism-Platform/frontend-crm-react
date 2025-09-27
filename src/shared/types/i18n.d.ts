import "i18next";

import type { TResources } from "../config";

declare module "i18next" {
	interface CustomTypeOptions {
		resources: TResources;
	}
}
