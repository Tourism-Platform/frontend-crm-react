import type {
	BOOKING_PASSENGER_PATHS,
	OperatorFilesModel,
	PaxCreate,
	PaxFileRef,
	PaxUpdate,
	PaxWithFiles
} from "@/shared/api";

export type TBookingPaxBackend = PaxWithFiles;

export type TPaxCreateBackend = PaxCreate;

export type TPaxUpdateBackend = PaxUpdate;

export type TBookingPaxListBackendResponce = ReturnType<
	typeof BOOKING_PASSENGER_PATHS.listPassengerInfo
>["_types"]["response"];

export type TAddPassengerResponseBackend = ReturnType<
	typeof BOOKING_PASSENGER_PATHS.addPassengerInfo
>["_types"]["response"];

export interface IUploadPassengerPassportRequest {
	bookingId: string;
	paxId: string;
	file: File;
}

export type TUploadPassengerPassportResponse = ReturnType<
	typeof BOOKING_PASSENGER_PATHS.uploadPassengerPassport
>["_types"]["response"];

export type TBookingPaxFile = {
	id: PaxFileRef["id"];
	fileName: PaxFileRef["file_name"];
};

export interface IBookingPax {
	id: string;
	bookingId: string;
	name: string;
	surname: string;
	gender: TBookingPaxBackend["gender"];
	nationality: string;
	dateOfBirth: string;
	passportNum: string;
	passportExpiryDate: string;
	comment: string | null;
	files: TBookingPaxFile[];
}

export type TOperatorFile = OperatorFilesModel;
