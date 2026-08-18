export const EVENT_PRICING_INVOICING_PART_OF_PACKAGE =
	"part_of_package" as const;

export const applyEventPackageIdToPricing = <
	T extends { invoicing: string; package_id?: string }
>(
	pricing: T,
	packageId?: string | null
): T => {
	if (!packageId) {
		return { ...pricing, package_id: "" };
	}

	return {
		...pricing,
		invoicing: EVENT_PRICING_INVOICING_PART_OF_PACKAGE as T["invoicing"],
		package_id: packageId
	};
};

export const mapEventPackageIdToBackend = (pricing?: {
	invoicing?: string;
	package_id?: string;
}): string | null => {
	if (pricing?.invoicing !== EVENT_PRICING_INVOICING_PART_OF_PACKAGE) {
		return null;
	}

	return pricing.package_id || null;
};
