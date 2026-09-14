import type { TransferDetailsOutput } from "@/shared/api";

import type { TCarsSchema } from "../../types";

import { vehicleBodyTypeConverter } from "./vehicle-body-type.converters";

/** Read-side transfer spec (`details.spec`, contract 3.1). */
type TTransferSpecOutput = TransferDetailsOutput["spec"];

/**
 * Cars section of the form, read from `details.spec` (3.1). Every spec
 * arm lists its cars (`per_car` priced, `per_car_category` categorised,
 * `whole` descriptive); all of them carry `body_type` / `pax` /
 * `description`.
 */
export const mapCarsFromBackend = (
	spec?: TTransferSpecOutput | null
): TCarsSchema => {
	const source = spec?.cars ?? [];

	if (!source.length) {
		return { cars: [] };
	}

	return {
		cars: source.map((car) => ({
			// The enum map is total over the generated VehicleBodyType.
			car_name: vehicleBodyTypeConverter.from(car.body_type)!,
			pax: car.pax ?? null,
			description: car.description ?? ""
		}))
	};
};
