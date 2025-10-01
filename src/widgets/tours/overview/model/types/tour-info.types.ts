import type { TTourPageKeys } from "@/shared/config";

import type { ITourInfo } from "@/entities/tour";

export interface ITourInfoOverview {
	label: TTourPageKeys;
	key: keyof ITourInfo;
	value: string | number;
	func: (value: string | number) => string | number;
}
