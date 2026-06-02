import type { PackageCreate, PackageUpdate, TourPackageModel } from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_PACKAGES_PATHS = {
	listPackages: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/package`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: TourPackageModel[];
			}
		}) as const,
	createPackage: (tourId: string, optionId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/package`,
			method: "POST",
			_types: {} as {
				body: PackageCreate;
				query: void;
				response: TourPackageModel;
			}
		}) as const,
	getPackage: (tourId: string, optionId: string, packageId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/package/${packageId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: TourPackageModel;
			}
		}) as const,
	updatePackage: (tourId: string, optionId: string, packageId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/package/${packageId}`,
			method: "PATCH",
			_types: {} as {
				body: PackageUpdate;
				query: void;
				response: TourPackageModel;
			}
		}) as const,
	deletePackage: (tourId: string, optionId: string, packageId: string) =>
		({
			url: `/tour/${tourId}/${optionId}/package/${packageId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
