import type {
	ENUM_ACCOMMODATION_AMENITY_TYPE,
	ENUM_HOUSING_ROOM_TYPE_TYPE,
	ENUM_VEHICLE_BODY_TYPE_TYPE,
	IEventImage
} from "@/entities/tour/itinerary";

export interface IOptionEventSheetPoint {
	place: string;
	dateTime: string;
}

export interface IOptionEventSheetCar {
	typ: ENUM_VEHICLE_BODY_TYPE_TYPE | null;
	pax: number | null;
	description: string;
}

export interface IOptionEventSheetRoom {
	name: string;
	typ: ENUM_HOUSING_ROOM_TYPE_TYPE | null;
	pax: number | null;
	description: string;
}

export interface IOptionFlightSegment {
	airlineCode: string;
	flightNumber: string;
	route: string;
	dateRange: string;
	departureCode: string;
	departureTime: string;
	departurePlace: string;
	arrivalCode: string;
	arrivalTime: string;
	arrivalPlace: string;
}

export type TOptionEventSheetExtra =
	| {
			kind: "info";
			startTime: string;
			endTime: string;
	  }
	| {
			kind: "transfer";
			pickup: IOptionEventSheetPoint;
			dropoff: IOptionEventSheetPoint;
			cars: IOptionEventSheetCar[];
	  }
	| {
			kind: "accommodation";
			amenities: ENUM_ACCOMMODATION_AMENITY_TYPE[];
			nights: string;
			checkIn: string;
			checkOut: string;
			rooms: IOptionEventSheetRoom[];
	  }
	| {
			kind: "activity";
			location: string;
			startTime: string;
			endTime: string;
	  }
	| {
			kind: "flight";
			segments: IOptionFlightSegment[];
	  };

export interface IOptionEventSheet {
	images: IEventImage[];
	description: string;
	extra: TOptionEventSheetExtra;
}
