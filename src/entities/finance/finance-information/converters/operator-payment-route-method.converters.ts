import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_PAYMENT_ROUTE_METHODS,
	type ENUM_PAYMENT_ROUTE_METHODS_TYPE
} from "../types";

const MAP_PAYMENT_ROUTE_METHOD: Record<
	ENUM_PAYMENT_ROUTE_METHODS_TYPE,
	"classic_swift" | "custom"
> = {
	[ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT]: "classic_swift",
	[ENUM_PAYMENT_ROUTE_METHODS.WISE]: "custom"
};

export const paymentRouteMethodConverter = createEnumMapper<
	ENUM_PAYMENT_ROUTE_METHODS_TYPE,
	"classic_swift" | "custom"
>(MAP_PAYMENT_ROUTE_METHOD);
