import { createMockId, mockImageUrl } from "@/shared/api";

import { MOCK_TOUR_OPTION_ID } from "@/entities/booking/order/mock/booking-order.mock.constants";
import { buildSupplierProductId } from "@/entities/supplier/mock/supplier.mock";
import { ENUM_LANGUAGES_BACKEND } from "@/entities/tour/landing/types/languages.types";
import { TOURS_MOCK } from "@/entities/tour/tour/mock/tour.mock";

import {
	ENUM_TRANSLATION_STATE_BACKEND,
	type TTourEventBackendResponce,
	type TTourOptionBackend,
	type TTourPackageBackend
} from "../types";

import {
	type TEventOptionMock,
	type TEventOptionTyp,
	type TPoolMemberMock,
	createInlineMember,
	createProductMember
} from "./event-details.mock";
import { createPackageMock } from "./package.mock";

export interface IEventMockRecord {
	tourId: string;
	optionId: string;
	event: TTourEventBackendResponce;
}

/** Продукты поставщиков из supplier.mock (индексы buildSupplierProductId) */
const PRODUCT = {
	hyatt: buildSupplierProductId(1),
	silkSamarkand: buildSupplierProductId(2),
	silkBukhara: buildSupplierProductId(3),
	flightUrgench: buildSupplierProductId(4),
	flightLondon: buildSupplierProductId(5),
	trainSamarkand: buildSupplierProductId(6),
	trainBukhara: buildSupplierProductId(7),
	airportTransfer: buildSupplierProductId(8),
	registan: buildSupplierProductId(10),
	plov: buildSupplierProductId(11)
};

export const buildTourOptionId = (index: number) =>
	index === 0 ? MOCK_TOUR_OPTION_ID : createMockId("b300", index);

let seedIndex = 0;
const nextSeedId = (namespace: string) => createMockId(namespace, ++seedIndex);

const option = (
	typ: TEventOptionTyp,
	name: string,
	pool: TPoolMemberMock[]
): TEventOptionMock =>
	({
		id: nextSeedId("b410"),
		typ,
		name,
		description: `${name}: details for travellers`,
		package_id: null,
		details: {
			plan:
				typ === "transfer"
					? { typ: null, departure: null, arrival: null }
					: typ === "bus"
						? { legs: [] }
						: {},
			pool
		}
	}) as unknown as TEventOptionMock;

const product = (productId: string) =>
	createProductMember(productId, true, nextSeedId("b420"));
const inline = (typ: TEventOptionTyp, name: string) =>
	createInlineMember(typ, name, true, undefined, null, nextSeedId("b420"));

const singleEvent = (
	optionId: string,
	day: number,
	position: number,
	eventOption: TEventOptionMock,
	isOptional = false
): TTourEventBackendResponce => ({
	id: nextSeedId("b430"),
	tour_option_id: optionId,
	event: {
		...eventOption,
		day,
		position,
		is_optional: isOptional,
		images: []
	} as TTourEventBackendResponce["event"],
	translation: ENUM_TRANSLATION_STATE_BACKEND.SOURCE
});

const multiEvent = (
	optionId: string,
	day: number,
	position: number,
	options: TEventOptionMock[]
): TTourEventBackendResponce => ({
	id: nextSeedId("b430"),
	tour_option_id: optionId,
	event: {
		typ: "options",
		day,
		position,
		is_optional: false,
		images: [],
		details: options
	},
	translation: ENUM_TRANSLATION_STATE_BACKEND.SOURCE
});

/** Маршрут опции: прилёт, отели на выбор, экскурсии, поезд, вылет */
const buildItinerary = (
	optionId: string,
	days: number
): TTourEventBackendResponce[] => {
	const lastDay = Math.max(days, 1);
	const events = [
		singleEvent(
			optionId,
			1,
			1,
			option("flight", "London — Tashkent", [
				product(PRODUCT.flightLondon)
			])
		),
		singleEvent(
			optionId,
			1,
			2,
			option("transfer", "Airport transfer", [
				product(PRODUCT.airportTransfer)
			])
		),
		multiEvent(optionId, 1, 3, [
			option("housing", "Hyatt Regency Tashkent", [
				product(PRODUCT.hyatt)
			]),
			option("housing", "Silk Road Samarkand", [
				product(PRODUCT.silkSamarkand)
			])
		])
	];

	if (lastDay >= 2) {
		events.push(
			singleEvent(
				optionId,
				2,
				1,
				option("train", "Afrosiyob to Samarkand", [
					product(PRODUCT.trainSamarkand)
				])
			),
			singleEvent(
				optionId,
				2,
				2,
				option("activity", "Registan ensemble", [
					product(PRODUCT.registan)
				])
			),
			singleEvent(
				optionId,
				2,
				3,
				option("guide", "English-speaking guide", [
					inline("guide", "Guide")
				])
			),
			singleEvent(
				optionId,
				2,
				4,
				option("activity", "Plov master class", [
					product(PRODUCT.plov)
				]),
				true
			)
		);
	}
	if (lastDay >= 3) {
		events.push(
			singleEvent(
				optionId,
				3,
				1,
				option("train", "Afrosiyob to Bukhara", [
					product(PRODUCT.trainBukhara)
				])
			),
			singleEvent(
				optionId,
				3,
				2,
				option("housing", "Silk Road Bukhara", [
					product(PRODUCT.silkBukhara)
				])
			),
			singleEvent(
				optionId,
				3,
				3,
				option("ref", "Free time in the old city", [inline("ref", "")])
			)
		);
	}
	events.push(
		singleEvent(
			optionId,
			lastDay,
			10,
			option("flight", "Tashkent — Urgench", [
				product(PRODUCT.flightUrgench)
			])
		),
		singleEvent(
			optionId,
			lastDay,
			11,
			option("supplementary", "Travel insurance", [
				inline("supplementary", "")
			])
		)
	);
	return events;
};

const OPTION_NAMES = ["Standard", "Comfort", "Premium"];

export const TOUR_OPTIONS_MOCK: TTourOptionBackend[] = [];
export const TOUR_PACKAGES_MOCK: TTourPackageBackend[] = [];
export const TOUR_EVENTS_MOCK: IEventMockRecord[] = [];

let optionIndex = 0;
TOURS_MOCK.forEach((tour, tourIndex) => {
	const optionCount = tourIndex % 3 === 0 ? 2 : 1;

	for (let index = 0; index < optionCount; index++) {
		const optionId = buildTourOptionId(optionIndex++);
		TOUR_OPTIONS_MOCK.push({
			id: optionId,
			tour_meta_id: tour.id,
			name: OPTION_NAMES[index],
			description: `${OPTION_NAMES[index]} option of ${tour.title}`,
			cover_image_path: mockImageUrl(`option-${optionId}`),
			deleted_at: null,
			markup: { typ: "percentage", percentage: 10 + index * 5 },
			languages: [
				ENUM_LANGUAGES_BACKEND.ENGLISH,
				ENUM_LANGUAGES_BACKEND.RUSSIAN
			]
		});
		TOUR_PACKAGES_MOCK.push(
			createPackageMock({
				id: createMockId("b310", optionIndex),
				tour_option_id: optionId,
				name: "Meals"
			})
		);
		TOUR_EVENTS_MOCK.push(
			...buildItinerary(optionId, Math.min(tour.days, 5)).map(
				(event) => ({
					tourId: tour.id,
					optionId,
					event
				})
			)
		);
	}
});
