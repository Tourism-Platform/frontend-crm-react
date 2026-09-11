import type { TransferCarVariantInput } from "@/shared/api";

import {
	ENUM_FORM_CARS,
	type TCarsSchema,
	type TTransferCarCategoriesVariantBackend,
	type TTransferCarVariantBackend
} from "../../types";

import { vehicleBodyTypeConverter } from "./vehicle-body-type.converters";

type TCarsList = TCarsSchema[typeof ENUM_FORM_CARS.CARS_LIST];

const mapCarToBackendInput = (
	car: TCarsList[number]
): Pick<TransferCarVariantInput, "typ" | "pax" | "description"> => ({
	typ: vehicleBodyTypeConverter.to(car.car_name) ?? null,
	pax: car.pax,
	description: car.description || null
});

export const mapCarsFromBackend = (
	perCarCars?: TTransferCarVariantBackend[] | null,
	perCarCategoryCars?: TTransferCarCategoriesVariantBackend[] | null
): TCarsSchema => {
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
			car_name: vehicleBodyTypeConverter.from(car.typ)!,
			pax: car.pax ?? null,
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
