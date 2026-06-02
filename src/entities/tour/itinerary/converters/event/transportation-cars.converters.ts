import type {
	TransferCarCategoriesVariantOutput,
	TransferCarVariantInput,
	TransferCarVariantOutput
} from "@/shared/api";
import { VehicleBodyType } from "@/shared/api";

import { ENUM_FORM_CARS, type TCarsSchema } from "../../types";

type TCarsList = TCarsSchema[typeof ENUM_FORM_CARS.CARS_LIST];

const PAX_FORM_TO_BACKEND: Record<string, number> = {
	"1-3": 3,
	"4-7": 7,
	"8-15": 15,
	"16+": 16
};

export const mapPaxFromBackend = (pax?: number | null): string => {
	if (pax == null) return "1-3";
	if (pax <= 3) return "1-3";
	if (pax <= 7) return "4-7";
	if (pax <= 15) return "8-15";
	return "16+";
};

export const mapPaxToBackend = (pax: string): number | undefined => {
	if (pax in PAX_FORM_TO_BACKEND) return PAX_FORM_TO_BACKEND[pax];
	const num = Number(pax);
	return Number.isFinite(num) ? num : undefined;
};

export const mapCarNameToVehicleType = (
	carName: string
): VehicleBodyType | null => {
	const values = Object.values(VehicleBodyType) as string[];
	return values.includes(carName) ? (carName as VehicleBodyType) : null;
};

const mapCarToBackendInput = (
	car: TCarsList[number]
): Pick<TransferCarVariantInput, "typ" | "pax" | "description"> => ({
	typ: mapCarNameToVehicleType(car.car_name),
	pax: mapPaxToBackend(car.pax),
	description: car.description || null
});

export const mapCarsFromBackend = (
	perCarCars?: TransferCarVariantOutput[] | null,
	perCarCategoryCars?: TransferCarCategoriesVariantOutput[] | null
) => {
	const source = perCarCars?.length
		? perCarCars
		: perCarCategoryCars?.length
			? perCarCategoryCars
			: [];

	if (!source.length) {
		return { cars: [] };
	}

	return {
		cars: source.map((car) => ({
			car_name: car.typ ?? "",
			pax: mapPaxFromBackend(car.pax),
			description: car.description ?? ""
		}))
	};
};

export const mapCarsToBackend = (carsList: TCarsList = []) => ({
	details: {
		expenses: {
			typ: "per_car" as const,
			cars: carsList.map(mapCarToBackendInput)
		}
	}
});
