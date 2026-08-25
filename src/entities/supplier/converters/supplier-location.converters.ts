import type { ISupplierLocation, TSupplierLocationBackend } from "../types";

export const mapSupplierLocationToBackend = (
	location: ISupplierLocation | null | undefined
): TSupplierLocationBackend => {
	if (!location) {
		return null;
	}

	if (location.id) {
		return { id: location.id };
	}

	return {
		lat: location.lat,
		long: location.long
	};
};

export const mapSupplierLocationFromBackend = (
	location: TSupplierLocationBackend
): ISupplierLocation | null => {
	if (!location || !("lat" in location) || location.lat == null) {
		return null;
	}

	return {
		...("id" in location && location.id ? { id: location.id } : {}),
		lat: location.lat,
		long: location.long,
		...("city" in location && location.city ? { city: location.city } : {}),
		...("address" in location && location.address
			? { address: location.address }
			: {})
	};
};
