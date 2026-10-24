import { formatDate, formatDateToISO } from "@/shared/utils";

import {
	ENUM_GENDER_OPTIONS,
	type IBookingPax,
	type IPaxReviewDetail,
	type IPaxReviewItem,
	type ITravellerPaxInput,
	type TBookingPaxBackend,
	type TBookingPaxListBackendResponce,
	type TPaxCreateBackend,
	type TPaxUpdateBackend
} from "../types";

import { genderMapper } from "./gender.converters";

const splitFullName = (fullName: string) => {
	const parts = fullName.trim().split(/\s+/);
	const firstName = parts[0] ?? "";
	const lastName = parts.slice(1).join(" ");

	return { firstName, lastName };
};

export const mapBookingPaxToFrontend = (
	data: TBookingPaxBackend
): IBookingPax => ({
	id: data.id,
	bookingId: data.booking_id,
	name: data.full_name,
	surname: data.full_name,
	gender: genderMapper.from(data.gender) ?? ENUM_GENDER_OPTIONS.MALE,
	nationality: data.nationality,
	dateOfBirth: formatDate(data.date_of_birth),
	passportNum: data.passport_number,
	passportExpiryDate: formatDate(data.expired_date),
	comment: data.comment,
	files: (data.files ?? []).map((file) => ({
		id: file.id,
		fileName: file.file_name
	}))
});

export const mapBookingPaxToTravellerForm = (
	pax: IBookingPax
): ITravellerPaxInput => {
	const { firstName, lastName } = splitFullName(pax.name);

	return {
		pax_id: pax.id,
		first_name: firstName,
		last_name: lastName,
		gender: pax.gender,
		nationality: pax.nationality,
		date_of_birth: new Date(pax.dateOfBirth),
		passport_number: pax.passportNum,
		passport_expiry: new Date(pax.passportExpiryDate),
		note: pax.comment ?? undefined
	};
};

export const mapBookingPaxListToFrontend = (
	response: TBookingPaxListBackendResponce
): IBookingPax[] => response.data.map(mapBookingPaxToFrontend);

export const mapBookingPaxToPaxReviewItem = (
	pax: IBookingPax
): IPaxReviewItem => {
	const items: IPaxReviewDetail[] = [];

	if (pax.comment) {
		items.push({
			id: `${pax.id}-comment`,
			type: "comment",
			value: pax.comment
		});
	}

	for (const file of pax.files) {
		items.push({
			id: file.id,
			type: "file",
			value: file.fileName,
			file: { id: file.id, url: "", fileName: file.fileName }
		});
	}

	return {
		id: pax.id,
		fullName: pax.name,
		gender: pax.gender,
		nationality: pax.nationality,
		dateOfBirth: pax.dateOfBirth,
		passportNumber: pax.passportNum,
		expiredDate: pax.passportExpiryDate,
		items
	};
};

export const mapBookingPaxListToPaxReview = (
	data: IBookingPax[]
): IPaxReviewItem[] => data.map(mapBookingPaxToPaxReviewItem);

export const mapTravellerToPaxCreate = (
	traveller: Required<
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
		Pick<ITravellerPaxInput, "note">
): TPaxCreateBackend => ({
	full_name: `${traveller.first_name} ${traveller.last_name}`.trim(),
	gender: genderMapper.to(traveller.gender)!,
	nationality: traveller.nationality,
	date_of_birth: formatDateToISO(traveller.date_of_birth),
	passport_number: traveller.passport_number,
	expired_date: formatDateToISO(traveller.passport_expiry),
	comment: traveller.note?.trim() || null
});

export const mapTravellerToPaxUpdate = (
	traveller: Required<
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
		Pick<ITravellerPaxInput, "note">
): TPaxUpdateBackend => ({
	full_name: `${traveller.first_name} ${traveller.last_name}`.trim(),
	gender: genderMapper.to(traveller.gender)!,
	nationality: traveller.nationality,
	date_of_birth: formatDateToISO(traveller.date_of_birth),
	passport_number: traveller.passport_number,
	expired_date: formatDateToISO(traveller.passport_expiry),
	comment: traveller.note?.trim() || null
});
