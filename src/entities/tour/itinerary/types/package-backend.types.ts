import type {
	PackageCreate,
	PackageUpdate,
	TOUR_PACKAGES_PATHS,
	TourPackageModel
} from "@/shared/api";

export type TTourPackageBackend = TourPackageModel;
export type TPackageCreateBackend = PackageCreate;
export type TPackageUpdateBackend = PackageUpdate;

export type TListPackagesBackendResponse = ReturnType<
	typeof TOUR_PACKAGES_PATHS.listPackages
>["_types"]["response"];

export type TGetPackageBackendResponse = ReturnType<
	typeof TOUR_PACKAGES_PATHS.getPackage
>["_types"]["response"];

export type TCreatePackageBackendResponse = ReturnType<
	typeof TOUR_PACKAGES_PATHS.createPackage
>["_types"]["response"];

export type TUpdatePackageBackendResponse = ReturnType<
	typeof TOUR_PACKAGES_PATHS.updatePackage
>["_types"]["response"];
