import type { ITravellerPaxInput } from "../types/traveller-pax.types";

export const getTravellerPassportFile = (
	traveller: ITravellerPaxInput
): File | null => {
	const entry = traveller.file?.find((f) => f.file instanceof File);
	return entry?.file instanceof File ? entry.file : null;
};

export const hasTravellerPassportFile = (traveller: ITravellerPaxInput) =>
	Boolean(getTravellerPassportFile(traveller));

const isTravellerFieldsComplete = (traveller: ITravellerPaxInput) =>
	Boolean(
		traveller.first_name?.trim() &&
			traveller.last_name?.trim() &&
			traveller.gender &&
			traveller.nationality?.trim() &&
			traveller.date_of_birth &&
			traveller.passport_number?.trim() &&
			traveller.passport_expiry
	);

const isTravellerPassportSatisfied = (traveller: ITravellerPaxInput) =>
	Boolean(traveller.pax_id) || hasTravellerPassportFile(traveller);

export const isTravellerComplete = (
	traveller: ITravellerPaxInput
): traveller is Required<
	Pick<
		ITravellerPaxInput,
		| "first_name"
		| "last_name"
		| "gender"
		| "nationality"
		| "date_of_birth"
		| "passport_number"
		| "passport_expiry"
	>
> &
	ITravellerPaxInput =>
	isTravellerFieldsComplete(traveller) &&
	isTravellerPassportSatisfied(traveller);
