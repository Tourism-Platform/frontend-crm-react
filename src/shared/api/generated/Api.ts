/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** UserRoles */
export enum UserRoles {
	Admin = "admin",
	OperatorAdmin = "operator_admin",
	OperatorSalesManager = "operator_sales_manager",
	OperatorAccountant = "operator_accountant",
	AgencyAdmin = "agency_admin",
	AgencySalesManager = "agency_sales_manager",
	AgencyAccountant = "agency_accountant",
	AuthenticatedUser = "authenticated_user"
}

/** TransferTypes */
export enum TransferTypes {
	Value1 = "1"
}

/** TransferCarTypes */
export enum TransferCarTypes {
	Sedan = "Sedan",
	Bus = "Bus"
}

/** TourType */
export enum TourType {
	Private = "private",
	Group = "group",
	PrivateGroup = "private/group"
}

/** TourStatus */
export enum TourStatus {
	Active = "active",
	Moderation = "moderation",
	Planning = "planning",
	Cancelled = "cancelled",
	Archived = "archived",
	Draft = "draft"
}

/** TourPricingVisibility */
export enum TourPricingVisibility {
	To = "to",
	From = "from",
	Range = "range"
}

/** TourListSortField */
export enum TourListSortField {
	Name = "name",
	Status = "status",
	GroupSize = "group_size",
	CreatedAt = "created_at"
}

/** TourCategory */
export enum TourCategory {
	HistoryCulture = "history_culture",
	ClassicalExcursions = "classical_excursions",
	AdventureOutdoor = "adventure_outdoor",
	WellnessSpiritual = "wellness_spiritual",
	PhotographyCreative = "photography_creative",
	GastronomicExperiences = "gastronomic_experiences"
}

/** PickupType */
export enum PickupType {
	Airport = "airport",
	Hotel = "hotel"
}

/** Nationality */
export enum Nationality {
	Usa = "usa",
	Fra = "fra",
	Ind = "ind",
	Chn = "chn"
}

/** Languages */
export enum Languages {
	En = "en",
	Ru = "ru"
}

/** LanguageCode */
export enum LanguageCode {
	En = "en",
	Ru = "ru",
	Uz = "uz"
}

/** HousingRoomTypes */
export enum HousingRoomTypes {
	Single = "Single",
	Double = "Double",
	Triple = "Triple"
}

/** Gender */
export enum Gender {
	M = "M",
	F = "F"
}

/** EventTypes */
export enum EventTypes {
	Value1 = "1",
	Value2 = "2",
	Value3 = "3",
	Value4 = "4",
	Value5 = "5",
	Value6 = "6",
	Value7 = "7",
	Value8 = "8"
}

/** EmploymentStatus */
export enum EmploymentStatus {
	Active = "active"
}

/**
 * CurrencyType
 * Enumeration for supported currencies based on ISO 4217 codes.
 */
export enum CurrencyType {
	UZS = "UZS",
	USD = "USD",
	EUR = "EUR",
	GBP = "GBP",
	JPY = "JPY"
}

/** CurrencyCode */
export enum CurrencyCode {
	USD = "USD",
	EUR = "EUR",
	UZS = "UZS",
	RUB = "RUB",
	KZT = "KZT"
}

/** ClientPaymentStatus */
export enum ClientPaymentStatus {
	NotConfirmed = "not_confirmed",
	Confirmed = "confirmed"
}

/** BookingStatus */
export enum BookingStatus {
	New = "new",
	Pending = "pending",
	InProcessing = "in_processing",
	InProgress = "in_progress",
	Confirmed = "confirmed",
	Cancelled = "cancelled",
	Completed = "completed"
}

/** AmenitiesTypes */
export enum AmenitiesTypes {
	Conditioner = "conditioner",
	Wifi = "wifi"
}

/** ActivityType */
export enum ActivityType {
	Value1 = "1",
	Value2 = "2",
	Value3 = "3"
}

/** ActivityDetailsSchema */
export interface ActivityDetailsSchemaInput {
	/** Sub-type of an activity */
	typ: ActivityType;
	/**
	 * Location
	 * Event location
	 */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
	/** Event start time */
	start_time: TimeSchema;
	/** Event start time */
	end_time: TimeSchema;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseInput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseInput);
}

/** ActivityDetailsSchema */
export interface ActivityDetailsSchemaOutput {
	/** Sub-type of an activity */
	typ: ActivityType;
	/**
	 * Location
	 * Event location
	 */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
	/** Event start time */
	start_time: TimeSchema;
	/** Event start time */
	end_time: TimeSchema;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseOutput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseOutput);
}

/** ActivityEventSchema */
export interface ActivityEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "6"
	 */
	typ?: "6";
	details: ActivityDetailsSchemaInput;
}

/** ActivityEventSchema */
export interface ActivityEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "6"
	 */
	typ?: "6";
	details: ActivityDetailsSchemaOutput;
}

/** AdminUserView */
export interface AdminUserView {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Email */
	email: string;
	/** Role */
	role: string;
	/** Picture */
	picture?: string | null;
	/** Operator Id */
	operator_id?: string | null;
	/** Agency Id */
	agency_id?: string | null;
}

/** AgencyModel */
export interface AgencyModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string;
}

/** AnyEventWithCost */
export interface AnyEventWithCostInput {
	/** Event */
	event:
		| (
				| ({
						typ: "1";
				  } & FlightEventSchemaInput)
				| ({
						typ: "2";
				  } & TrainEventSchemaInput)
				| ({
						typ: "3";
				  } & BusEventSchemaInput)
				| ({
						typ: "4";
				  } & TransferEventSchemaInput)
				| ({
						typ: "5";
				  } & HousingEventSchemaInput)
				| ({
						typ: "6";
				  } & ActivityEventSchemaInput)
				| ({
						typ: "7";
				  } & InformationEventSchema)
		  )
		| MultipleOptionEventInput;
	cost: MonetaryValueSchema;
}

/** AnyEventWithCost */
export interface AnyEventWithCostOutput {
	/** Event */
	event:
		| (
				| ({
						typ: "1";
				  } & FlightEventSchemaOutput)
				| ({
						typ: "2";
				  } & TrainEventSchemaOutput)
				| ({
						typ: "3";
				  } & BusEventSchemaOutput)
				| ({
						typ: "4";
				  } & TransferEventSchemaOutput)
				| ({
						typ: "5";
				  } & HousingEventSchemaOutput)
				| ({
						typ: "6";
				  } & ActivityEventSchemaOutput)
				| ({
						typ: "7";
				  } & InformationEventSchema)
		  )
		| MultipleOptionEventOutput;
	cost: MonetaryValueSchema;
}

/** AuthUserIn */
export interface AuthUserIn {
	/**
	 * Email
	 * @format email
	 */
	email: string;
	/**
	 * Password
	 * @minLength 6
	 * @maxLength 128
	 */
	password: string;
}

/** AuthUserProfileModel */
export interface AuthUserProfileModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string;
	/** First Name */
	first_name: string | null;
	/** Last Name */
	last_name: string | null;
	/** Title */
	title: string | null;
	/** Phone Number */
	phone_number: string | null;
	/** Location */
	location: string | null;
	/** Profile Picture Url */
	profile_picture_url: string | null;
	/** Preferred Currency */
	preferred_currency: string | null;
}

/** Body_add_files_operator_me_files_post */
export interface BodyAddFilesOperatorMeFilesPost {
	/** Files */
	files: File[];
}

/** Body_add_logo_operator_me_logo_post */
export interface BodyAddLogoOperatorMeLogoPost {
	/**
	 * File
	 * @format binary
	 */
	file: File;
}

/** Body_add_logo_supplier__supplier_id__logo_post */
export interface BodyAddLogoSupplierSupplierIdLogoPost {
	/**
	 * File
	 * @format binary
	 */
	file: File;
}

/** Body_add_passenger_info_booking_pax__booking_id__post */
export interface BodyAddPassengerInfoBookingPaxBookingIdPost {
	info: PassengerCreateInfo;
	/** Files */
	files: File[];
}

/** Body_create_payment_booking_payment_post */
export interface BodyCreatePaymentBookingPaymentPost {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/**
	 * Amount Uzs
	 * @exclusiveMin 0
	 */
	amount_uzs: number;
	/**
	 * Exchange Rate
	 * @exclusiveMin 0
	 */
	exchange_rate: number;
	/**
	 * File
	 * @format binary
	 */
	file: File;
	/** Note */
	note?: string | null;
}

/** Body_invite_staff_operator_staff_invite_post */
export interface BodyInviteStaffOperatorStaffInvitePost {
	user: AuthUserIn;
	payload: StaffInvite;
}

/** Body_upload_avatar_profile_me_photo_post */
export interface BodyUploadAvatarProfileMePhotoPost {
	/**
	 * File
	 * @format binary
	 */
	file: File;
}

/** Body_upload_event_images_tour__tour_id__event__event_id__images_post */
export interface BodyUploadEventImagesTourTourIdEventEventIdImagesPost {
	/** Images */
	images: File[];
}

/** Body_upload_landing_images_tour__tour_id__landing_images_post */
export interface BodyUploadLandingImagesTourTourIdLandingImagesPost {
	/** Images */
	images: File[];
}

/** Body_upload_tour_cover_tour__tour_id__cover_post */
export interface BodyUploadTourCoverTourTourIdCoverPost {
	/**
	 * Image
	 * @format binary
	 */
	image: File;
}

/** BookingCancel */
export interface BookingCancel {
	/** Reason */
	reason?: string | null;
}

/** BookingCreate */
export interface BookingCreate {
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
	/**
	 * Departure Date
	 * @format date
	 */
	departure_date: string;
	/** Pax */
	pax: number;
	status: BookingStatus;
	/** Notes */
	notes: string | null;
}

/** BookingModel */
export interface BookingModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Agency Id
	 * @format uuid
	 */
	agency_id: string;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
	/**
	 * Departure Date
	 * @format date
	 */
	departure_date: string;
	/** Pax */
	pax: number;
	status: BookingStatus;
	/** Agreed Price */
	agreed_price: number | null;
	/** Agreed Currency */
	agreed_currency: string | null;
	/** Confirmed At */
	confirmed_at: string | null;
	/** Cancelled At */
	cancelled_at: string | null;
	/** Cancellation Reason */
	cancellation_reason: string | null;
	/** Notes */
	notes: string | null;
}

/** BookingPaxModel */
export interface BookingPaxModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Name */
	name: string;
	/** Surname */
	surname: string;
	gender: Gender;
	nationality: Nationality;
	/**
	 * Date Of Birth
	 * @format date-time
	 */
	date_of_birth: string;
	/** Passport Num */
	passport_num: string;
	/**
	 * Passport Expiry Date
	 * @format date-time
	 */
	passport_expiry_date: string;
	/** Comment */
	comment: string | null;
}

/** BusDetailSchema */
export interface BusDetailSchemaInput {
	/** Hop */
	hop: BusHopSchemaInput[];
}

/** BusDetailSchema */
export interface BusDetailSchemaOutput {
	/** Hop */
	hop: BusHopSchemaOutput[];
}

/** BusEventSchema */
export interface BusEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "3"
	 */
	typ?: "3";
	details: BusDetailSchemaInput;
}

/** BusEventSchema */
export interface BusEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "3"
	 */
	typ?: "3";
	details: BusDetailSchemaOutput;
}

/**
 * BusHopSchema
 * Represents a single leg of a bus journey.
 */
export interface BusHopSchemaInput {
	/** Details of the departure. */
	departure: BusJourneyPointSchemaInput;
	/** Details of the arrival. */
	arrival: BusJourneyPointSchemaInput;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseInput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseInput);
}

/**
 * BusHopSchema
 * Represents a single leg of a bus journey.
 */
export interface BusHopSchemaOutput {
	/** Details of the departure. */
	departure: BusJourneyPointSchemaOutput;
	/** Details of the arrival. */
	arrival: BusJourneyPointSchemaOutput;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseOutput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseOutput);
}

/**
 * BusJourneyPointSchema
 * Represents either a departure or arrival point for the bus journey.
 */
export interface BusJourneyPointSchemaInput {
	/**
	 * Date
	 * The date of departure or arrival.
	 * @format date
	 */
	date: string;
	/** The time of an event */
	time: TimeSchema;
	/** Location */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
}

/**
 * BusJourneyPointSchema
 * Represents either a departure or arrival point for the bus journey.
 */
export interface BusJourneyPointSchemaOutput {
	/**
	 * Date
	 * The date of departure or arrival.
	 * @format date
	 */
	date: string;
	/** The time of an event */
	time: TimeSchema;
	/** Location */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
}

/** ClientPaymentListResponse */
export interface ClientPaymentListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: ClientPaymentResponse[];
}

/** ClientPaymentResponse */
export interface ClientPaymentResponse {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Amount */
	amount: number;
	currency: CurrencyCode;
	status: ClientPaymentStatus;
	/** Note */
	note?: string | null;
	/** Has Attachment */
	has_attachment: boolean;
	/** Created At */
	created_at?: string | null;
	/** Updated At */
	updated_at?: string | null;
}

/** ClientPaymentUpdate */
export interface ClientPaymentUpdate {
	/** Amount */
	amount?: number | null;
	/** Note */
	note?: string | null;
}

/** CreateAgencySchema */
export interface CreateAgencySchema {
	/** Name */
	name: string;
}

/** CreateFinancialSchema */
export interface CreateFinancialSchema {
	pricing_visibility: TourPricingVisibility;
	/** Markup */
	markup: number;
	/** Enumeration for supported currencies based on ISO 4217 codes. */
	currency: CurrencyType;
	/** Currency Rate To Uzs */
	currency_rate_to_uzs: number;
}

/** EmptyDetails */
export type EmptyDetails = object;

/** EventImageModel */
export interface EventImageModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Image Path */
	image_path: string;
	/** Is Primary */
	is_primary: boolean;
}

/** EventReorderSchema */
export interface EventReorderSchema {
	/**
	 * Day
	 * New day number
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * New position number
	 * @min 0
	 */
	position: number;
}

/** FixedDateCreate */
export interface FixedDateCreate {
	/**
	 * Value
	 * @format date
	 */
	value: string;
}

/** FixedDateModel */
export interface FixedDateModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Schedule Id
	 * @format uuid
	 */
	schedule_id: string;
	/**
	 * Value
	 * @format date
	 */
	value: string;
}

/** FixedDatesBulkCreate */
export interface FixedDatesBulkCreate {
	/**
	 * Dates
	 * @minItems 1
	 */
	dates: string[];
}

/** FixedDatesBulkDelete */
export interface FixedDatesBulkDelete {
	/**
	 * Date Ids
	 * @minItems 1
	 */
	date_ids: string[];
}

/**
 * FixedExpense
 * A simple fixed cost, ignores all context.
 */
export interface FixedExpenseInput {
	/**
	 * Typ
	 * @default "fixed"
	 */
	typ?: "fixed";
	cost: MonetaryValueSchema;
}

/**
 * FixedExpense
 * A simple fixed cost, ignores all context.
 */
export interface FixedExpenseOutput {
	/**
	 * Typ
	 * @default "fixed"
	 */
	typ?: "fixed";
	cost: MonetaryValueSchema;
}

/** FlightDetailsSchema */
export interface FlightDetailsSchemaInput {
	/** Hop */
	hop: FlightHopDetailsSchemaInput[];
}

/** FlightDetailsSchema */
export interface FlightDetailsSchemaOutput {
	/** Hop */
	hop: FlightHopDetailsSchemaOutput[];
}

/** FlightEventSchema */
export interface FlightEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "1"
	 */
	typ?: "1";
	details: FlightDetailsSchemaInput;
}

/** FlightEventSchema */
export interface FlightEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "1"
	 */
	typ?: "1";
	details: FlightDetailsSchemaOutput;
}

/** FlightHopDetailsSchema */
export interface FlightHopDetailsSchemaInput {
	/**
	 * Airline Code
	 * IATA or ICAO airline code (2–3 letters/numbers, uppercase)
	 * @minLength 2
	 * @maxLength 3
	 * @pattern ^[A-Z0-9]{2,3}$
	 */
	airline_code: string;
	/**
	 * Flight Number
	 * Flight number (1–4 digits)
	 * @min 1
	 * @max 9999
	 */
	flight_number: number;
	/**
	 * Departure Airport Code
	 * Departure airport IATA code (3 uppercase letters)
	 * @minLength 3
	 * @maxLength 3
	 * @pattern ^[A-Z]{3}$
	 */
	departure_airport_code: string;
	/**
	 * Arrival Airport Code
	 * Arrival airport IATA code (3 uppercase letters)
	 * @minLength 3
	 * @maxLength 3
	 * @pattern ^[A-Z]{3}$
	 */
	arrival_airport_code: string;
	/** Departure Location */
	departure_location:
		| LocationInSchema
		| LocationRefSchema
		| LocationOutSchema;
	/** Arrival Location */
	arrival_location: LocationInSchema | LocationRefSchema | LocationOutSchema;
	/**
	 * Departure Date
	 * Scheduled departure date (YYYY-MM-DD)
	 * @format date
	 */
	departure_date: string;
	/**
	 * Arrival Date
	 * Scheduled arrival date (YYYY-MM-DD)
	 * @format date
	 */
	arrival_date: string;
	departure_time: TimeSchema;
	arrival_time: TimeSchema;
	/**
	 * Departure Terminal
	 * Departure terminal (e.g., '1', 'T2', 'A')
	 * @minLength 1
	 * @maxLength 5
	 */
	departure_terminal: string;
	/**
	 * Departure Gate
	 * Departure gate (e.g., 'A12', 'B3')
	 * @minLength 1
	 * @maxLength 5
	 */
	departure_gate: string;
	/**
	 * Amenities
	 * List of amenities available on this flight.
	 */
	amenities?: AmenitiesTypes[];
	/**
	 * Expenses
	 * Expenses strategy for this event
	 */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseInput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseInput);
}

/** FlightHopDetailsSchema */
export interface FlightHopDetailsSchemaOutput {
	/**
	 * Airline Code
	 * IATA or ICAO airline code (2–3 letters/numbers, uppercase)
	 * @minLength 2
	 * @maxLength 3
	 * @pattern ^[A-Z0-9]{2,3}$
	 */
	airline_code: string;
	/**
	 * Flight Number
	 * Flight number (1–4 digits)
	 * @min 1
	 * @max 9999
	 */
	flight_number: number;
	/**
	 * Departure Airport Code
	 * Departure airport IATA code (3 uppercase letters)
	 * @minLength 3
	 * @maxLength 3
	 * @pattern ^[A-Z]{3}$
	 */
	departure_airport_code: string;
	/**
	 * Arrival Airport Code
	 * Arrival airport IATA code (3 uppercase letters)
	 * @minLength 3
	 * @maxLength 3
	 * @pattern ^[A-Z]{3}$
	 */
	arrival_airport_code: string;
	/** Departure Location */
	departure_location:
		| LocationInSchema
		| LocationRefSchema
		| LocationOutSchema;
	/** Arrival Location */
	arrival_location: LocationInSchema | LocationRefSchema | LocationOutSchema;
	/**
	 * Departure Date
	 * Scheduled departure date (YYYY-MM-DD)
	 * @format date
	 */
	departure_date: string;
	/**
	 * Arrival Date
	 * Scheduled arrival date (YYYY-MM-DD)
	 * @format date
	 */
	arrival_date: string;
	departure_time: TimeSchema;
	arrival_time: TimeSchema;
	/**
	 * Departure Terminal
	 * Departure terminal (e.g., '1', 'T2', 'A')
	 * @minLength 1
	 * @maxLength 5
	 */
	departure_terminal: string;
	/**
	 * Departure Gate
	 * Departure gate (e.g., 'A12', 'B3')
	 * @minLength 1
	 * @maxLength 5
	 */
	departure_gate: string;
	/**
	 * Amenities
	 * List of amenities available on this flight.
	 */
	amenities?: AmenitiesTypes[];
	/**
	 * Expenses
	 * Expenses strategy for this event
	 */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseOutput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseOutput);
}

/** FullScheduleSchema */
export interface FullScheduleSchema {
	schedule: TourScheduleModel;
	/** Fixed Dates */
	fixed_dates: FixedDateModel[];
	/** Recurrence Rules */
	recurrence_rules: RecurrenceDateModel[];
}

/**
 * GeoFeature
 * Provider-neutral geocoded place.
 */
export interface GeoFeature {
	/** Lat */
	lat: number;
	/** Long */
	long: number;
	/** Name */
	name?: string | null;
	/** City */
	city?: string | null;
	/** Street */
	street?: string | null;
	/** Housenumber */
	housenumber?: string | null;
	/** Postcode */
	postcode?: string | null;
	/** State */
	state?: string | null;
	/** Country */
	country?: string | null;
}

/** HTTPValidationError */
export interface HTTPValidationError {
	/** Detail */
	detail?: ValidationError[];
}

/** HousingDetailsSchema */
export interface HousingDetailsSchemaInput {
	/**
	 * Location
	 * Housing location
	 */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
	/** Amenities */
	amenities: AmenitiesTypes[];
	/**
	 * Duration
	 * Length of stay
	 */
	duration: number;
	check_in: TimeSchema;
	check_out: TimeSchema;
	/**
	 * Expenses
	 * Expenses strategy for this event
	 */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseInput)
		| ({
				typ: "per_car";
		  } & PerRoomExpensesInput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseInput)
		| ({
				typ: "per_room_category";
		  } & PerRoomCategoryExpensesInput);
}

/** HousingDetailsSchema */
export interface HousingDetailsSchemaOutput {
	/**
	 * Location
	 * Housing location
	 */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
	/** Amenities */
	amenities: AmenitiesTypes[];
	/**
	 * Duration
	 * Length of stay
	 */
	duration: number;
	check_in: TimeSchema;
	check_out: TimeSchema;
	/**
	 * Expenses
	 * Expenses strategy for this event
	 */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseOutput)
		| ({
				typ: "per_car";
		  } & PerRoomExpensesOutput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseOutput)
		| ({
				typ: "per_room_category";
		  } & PerRoomCategoryExpensesOutput);
}

/** HousingEventSchema */
export interface HousingEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "5"
	 */
	typ?: "5";
	details: HousingDetailsSchemaInput;
}

/** HousingEventSchema */
export interface HousingEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "5"
	 */
	typ?: "5";
	details: HousingDetailsSchemaOutput;
}

/** HousingRoomCategoryExpensesSchema */
export interface HousingRoomCategoryExpensesSchemaInput {
	typ: HousingRoomTypes;
	/** Pax */
	pax: number;
	/**
	 * Description
	 * Room description
	 */
	description: string;
	/** Categories */
	categories: HousingRoomCategorySchemaInput[];
}

/** HousingRoomCategoryExpensesSchema */
export interface HousingRoomCategoryExpensesSchemaOutput {
	typ: HousingRoomTypes;
	/** Pax */
	pax: number;
	/**
	 * Description
	 * Room description
	 */
	description: string;
	/** Categories */
	categories: HousingRoomCategorySchemaOutput[];
}

/** HousingRoomCategorySchema */
export interface HousingRoomCategorySchemaInput {
	/**
	 * Name
	 * Room category, i.e. single, double e.t.c.
	 */
	name: string;
	/** Expenses for this car of this category. */
	expenses: FixedExpenseInput;
}

/** HousingRoomCategorySchema */
export interface HousingRoomCategorySchemaOutput {
	/**
	 * Name
	 * Room category, i.e. single, double e.t.c.
	 */
	name: string;
	/** Expenses for this car of this category. */
	expenses: FixedExpenseOutput;
}

/** HousingRoomExpensesSchema */
export interface HousingRoomExpensesSchemaInput {
	typ: HousingRoomTypes;
	/** Pax */
	pax: number;
	/**
	 * Description
	 * Room description
	 */
	description: string;
	/** A simple fixed cost, ignores all context. */
	expenses: FixedExpenseInput;
}

/** HousingRoomExpensesSchema */
export interface HousingRoomExpensesSchemaOutput {
	typ: HousingRoomTypes;
	/** Pax */
	pax: number;
	/**
	 * Description
	 * Room description
	 */
	description: string;
	/** A simple fixed cost, ignores all context. */
	expenses: FixedExpenseOutput;
}

/** InformationEventSchema */
export interface InformationEventSchema {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "7"
	 */
	typ?: "7";
	/** @default {} */
	details?: EmptyDetails;
}

/** LandingPageCreate */
export interface LandingPageCreate {
	/** Title */
	title: string;
	/** Overview */
	overview: string;
	/**
	 * Languages
	 * @default []
	 */
	languages?: string[];
	/**
	 * Amenities Included
	 * @default []
	 */
	amenities_included?: AmenitiesTypes[];
	/**
	 * Amenities Not Included
	 * @default []
	 */
	amenities_not_included?: AmenitiesTypes[];
	pickup_details?: PickupType | null;
	/**
	 * Cancellation Policy
	 * @default ""
	 */
	cancellation_policy?: string | null;
	/**
	 * Additional Info
	 * @default ""
	 */
	additional_info?: string | null;
}

/** LandingPageImageModel */
export interface LandingPageImageModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Landing Page Id
	 * @format uuid
	 */
	landing_page_id: string;
	/** Image Path */
	image_path: string;
	/** Is Primary */
	is_primary: boolean;
}

/** LandingPageModel */
export interface LandingPageModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tour_id: string;
	/** Title */
	title: string;
	/** Overview */
	overview: string;
	/** Languages */
	languages: Languages[];
	/** Amenities Included */
	amenities_included: AmenitiesTypes[];
	/** Amenities Not Included */
	amenities_not_included: AmenitiesTypes[];
	pickup_details: PickupType | null;
	/** Cancellation Policy */
	cancellation_policy: string;
	/** Additional Info */
	additional_info: string;
}

/** LandingPageUpdate */
export interface LandingPageUpdate {
	/** Title */
	title?: string | null;
	/** Overview */
	overview?: string | null;
	/** Languages */
	languages?: string[] | null;
	/**
	 * Amenities Included
	 * @default []
	 */
	amenities_included?: AmenitiesTypes[];
	/**
	 * Amenities Not Included
	 * @default []
	 */
	amenities_not_included?: AmenitiesTypes[];
	pickup_details?: PickupType | null;
	/**
	 * Cancellation Policy
	 * @default ""
	 */
	cancellation_policy?: string | null;
	/**
	 * Additional Info
	 * @default ""
	 */
	additional_info?: string | null;
}

/** LocationInSchema */
export interface LocationInSchema {
	/**
	 * Lat
	 * The latitude of the location in decimal degrees (-90 to 90).
	 * @min -90
	 * @max 90
	 */
	lat: number;
	/**
	 * Long
	 * The longitude of the location in decimal degrees (-180 to 180).
	 * @min -180
	 * @max 180
	 */
	long: number;
}

/** LocationOutSchema */
export interface LocationOutSchema {
	lang: LanguageCode;
	/** City */
	city?: string | null;
	/** Address */
	address?: string | null;
	/**
	 * Lat
	 * The latitude of the location in decimal degrees (-90 to 90).
	 * @min -90
	 * @max 90
	 */
	lat: number;
	/**
	 * Long
	 * The longitude of the location in decimal degrees (-180 to 180).
	 * @min -180
	 * @max 180
	 */
	long: number;
}

/** LocationRefSchema */
export interface LocationRefSchema {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
}

/** MeSchema */
export interface MeSchema {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Email */
	email: string;
	/** Role */
	role: string;
	/** Picture */
	picture?: string | null;
	/** Agency Id */
	agency_id?: string | null;
	/** Operator Id */
	operator_id?: string | null;
}

/** MonetaryValueSchema */
export interface MonetaryValueSchema {
	/**
	 * Val
	 * The total monetary value.
	 * @min 0
	 */
	val: number;
	/**
	 * Enumeration for supported currencies based on ISO 4217 codes.
	 * @default "USD"
	 */
	currency?: CurrencyType;
}

/** MultipleOptionEvent */
export interface MultipleOptionEventInput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/** Typ */
	typ: "8";
	/** Details */
	details: (
		| ({
				typ: "1";
		  } & FlightEventSchemaInput)
		| ({
				typ: "2";
		  } & TrainEventSchemaInput)
		| ({
				typ: "3";
		  } & BusEventSchemaInput)
		| ({
				typ: "4";
		  } & TransferEventSchemaInput)
		| ({
				typ: "5";
		  } & HousingEventSchemaInput)
		| ({
				typ: "6";
		  } & ActivityEventSchemaInput)
		| ({
				typ: "7";
		  } & InformationEventSchema)
	)[];
}

/** MultipleOptionEvent */
export interface MultipleOptionEventOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/** Typ */
	typ: "8";
	/** Details */
	details: (
		| ({
				typ: "1";
		  } & FlightEventSchemaOutput)
		| ({
				typ: "2";
		  } & TrainEventSchemaOutput)
		| ({
				typ: "3";
		  } & BusEventSchemaOutput)
		| ({
				typ: "4";
		  } & TransferEventSchemaOutput)
		| ({
				typ: "5";
		  } & HousingEventSchemaOutput)
		| ({
				typ: "6";
		  } & ActivityEventSchemaOutput)
		| ({
				typ: "7";
		  } & InformationEventSchema)
	)[];
}

/** OperatorCreateSchema */
export interface OperatorCreateSchema {
	/** Name */
	name: string;
}

/** OperatorFilesModel */
export interface OperatorFilesModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Url */
	url: string;
}

/** OperatorFinancialSettingsModel */
export interface OperatorFinancialSettingsModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Default Currency */
	default_currency: string | null;
	/** Default Commission Rate */
	default_commission_rate: number | null;
	/** Default Tour Markup */
	default_tour_markup: number | null;
}

/** OperatorFinancialSettingsUpdate */
export interface OperatorFinancialSettingsUpdate {
	/** Default Currency */
	default_currency?: string | null;
	/** Default Commission Rate */
	default_commission_rate?: number | null;
	/** Default Tour Markup */
	default_tour_markup?: number | null;
}

/** OperatorInfoModel */
export interface OperatorInfoModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Logo Url */
	logo_url: string | null;
	/** Description */
	description: string | null;
	/** Business Name */
	business_name: string | null;
	/** Website Url */
	website_url: string | null;
	/** Legal Name */
	legal_name: string | null;
	/** Director Name */
	director_name: string | null;
	/** Tax Id */
	tax_id: string | null;
	/** Business Type */
	business_type: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Position */
	contact_position: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Address Line */
	address_line: string | null;
	/** City */
	city: string | null;
	/** Country */
	country: string | null;
}

/** OperatorInfoUpdate */
export interface OperatorInfoUpdate {
	/** Description */
	description?: string | null;
	/** Business Name */
	business_name?: string | null;
	/** Website Url */
	website_url?: string | null;
	/** Legal Name */
	legal_name?: string | null;
	/** Director Name */
	director_name?: string | null;
	/** Tax Id */
	tax_id?: string | null;
	/** Business Type */
	business_type?: string | null;
	/** Contact Person */
	contact_person?: string | null;
	/** Contact Position */
	contact_position?: string | null;
	/** Contact Email */
	contact_email?: string | null;
	/** Contact Phone */
	contact_phone?: string | null;
	/** Address Line */
	address_line?: string | null;
	/** City */
	city?: string | null;
	/** Country */
	country?: string | null;
}

/** OperatorModel */
export interface OperatorModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string;
}

/** PassengerCreateInfo */
export interface PassengerCreateInfo {
	/** Name */
	name: string;
	/** Surname */
	surname: string;
	gender: Gender;
	nationality: Nationality;
	/**
	 * Date Of Birth
	 * @format date-time
	 */
	date_of_birth: string;
	/** Passport Num */
	passport_num: string;
	/**
	 * Passport Expiry Date
	 * @format date-time
	 */
	passport_expiry_date: string;
	/** Comment */
	comment: string;
}

/** PasswordChangeIn */
export interface PasswordChangeIn {
	/**
	 * Current Password
	 * @minLength 1
	 * @maxLength 128
	 */
	current_password: string;
	/**
	 * New Password
	 * @minLength 6
	 * @maxLength 128
	 */
	new_password: string;
}

/**
 * PerCarCategoryExpense
 * Represents a transfer journey with departure and arrival details.
 */
export interface PerCarCategoryExpenseInput {
	/** Typ */
	typ: "per_car_category";
	/**
	 * Cars
	 * All types of cars and their categories
	 */
	cars: TransferCarCategoriesVariantInput[];
}

/**
 * PerCarCategoryExpense
 * Represents a transfer journey with departure and arrival details.
 */
export interface PerCarCategoryExpenseOutput {
	/** Typ */
	typ: "per_car_category";
	/**
	 * Cars
	 * All types of cars and their categories
	 */
	cars: TransferCarCategoriesVariantOutput[];
}

/**
 * PerCarExpense
 * Represents a transfer journey with departure and arrival details.
 */
export interface PerCarExpenseInput {
	/** Typ */
	typ: "per_car";
	/**
	 * Cars
	 * All types of cars and their categories
	 */
	cars: TransferCarVariantInput[];
}

/**
 * PerCarExpense
 * Represents a transfer journey with departure and arrival details.
 */
export interface PerCarExpenseOutput {
	/** Typ */
	typ: "per_car";
	/**
	 * Cars
	 * All types of cars and their categories
	 */
	cars: TransferCarVariantOutput[];
}

/**
 * PerPersonExpense
 * A cost calculated per person.
 */
export interface PerPersonExpenseInput {
	/**
	 * Typ
	 * @default "per_person"
	 */
	typ?: "per_person";
	cost_per_person: MonetaryValueSchema;
}

/**
 * PerPersonExpense
 * A cost calculated per person.
 */
export interface PerPersonExpenseOutput {
	/**
	 * Typ
	 * @default "per_person"
	 */
	typ?: "per_person";
	cost_per_person: MonetaryValueSchema;
}

/**
 * PerRoomCategoryExpenses
 * Represents a expenses associated with a room within a category
 */
export interface PerRoomCategoryExpensesInput {
	/** Typ */
	typ: "per_room_category";
	/**
	 * Rooms
	 * All rooms with categories
	 */
	rooms: HousingRoomCategoryExpensesSchemaInput[];
}

/**
 * PerRoomCategoryExpenses
 * Represents a expenses associated with a room within a category
 */
export interface PerRoomCategoryExpensesOutput {
	/** Typ */
	typ: "per_room_category";
	/**
	 * Rooms
	 * All rooms with categories
	 */
	rooms: HousingRoomCategoryExpensesSchemaOutput[];
}

/**
 * PerRoomExpenses
 * Represents a expenses associated with a room
 */
export interface PerRoomExpensesInput {
	/** Typ */
	typ: "per_car";
	/**
	 * Rooms
	 * All rooms
	 */
	rooms: HousingRoomExpensesSchemaInput[];
}

/**
 * PerRoomExpenses
 * Represents a expenses associated with a room
 */
export interface PerRoomExpensesOutput {
	/** Typ */
	typ: "per_car";
	/**
	 * Rooms
	 * All rooms
	 */
	rooms: HousingRoomExpensesSchemaOutput[];
}

/** RecurrenceDateModel */
export interface RecurrenceDateModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Schedule Id
	 * @format uuid
	 */
	schedule_id: string;
	/** Day */
	day: number | null;
	/** Valid From */
	valid_from: string | null;
	/** Valid Until */
	valid_until: string | null;
}

/** RecurrenceRuleCreate */
export interface RecurrenceRuleCreate {
	/**
	 * Day
	 * Day of the week (0=Monday, 6=Sunday)
	 */
	day?: number | null;
	/** Valid From */
	valid_from?: string | null;
	/** Valid Until */
	valid_until?: string | null;
}

/** RecurrenceRulesBulkCreate */
export interface RecurrenceRulesBulkCreate {
	/**
	 * Rules
	 * @minItems 1
	 */
	rules: RecurrenceRuleCreate[];
}

/** SeasonalityCommissionCreate */
export interface SeasonalityCommissionCreate {
	/**
	 * Commission
	 * Commission percentage/value
	 */
	commission: number;
	/**
	 * Valid From
	 * @format date
	 */
	valid_from: string;
	/**
	 * Valid Until
	 * @format date
	 */
	valid_until: string;
}

/** SeasonalityCommissionModel */
export interface SeasonalityCommissionModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Schedule Id
	 * @format uuid
	 */
	schedule_id: string;
	/** Commission */
	commission: number;
	/**
	 * Valid From
	 * @format date
	 */
	valid_from: string;
	/**
	 * Valid Until
	 * @format date
	 */
	valid_until: string;
}

/** StaffInvite */
export interface StaffInvite {
	/**
	 * Email
	 * @format email
	 */
	email: string;
	/** First Name */
	first_name: string;
	/** Last Name */
	last_name: string;
	/** Role */
	role: StaffInviteRoleEnum;
	/** Commission Split */
	commission_split?: number | null;
	/** @default "active" */
	employment_status?: EmploymentStatus;
}

/** StaffRead */
export interface StaffRead {
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string;
	/** First Name */
	first_name: string | null;
	/** Last Name */
	last_name: string | null;
	/** Email */
	email: string;
	/** Role */
	role: StaffReadRoleEnum;
	status: EmploymentStatus | null;
	/** Commission Split */
	commission_split: number | null;
}

/** StaffUpdate */
export interface StaffUpdate {
	/** Role */
	role?: StaffUpdateRoleEnum | null;
	/** Commission Split */
	commission_split?: number | null;
	employment_status?: EmploymentStatus | null;
}

/** SupplierCreateSchema */
export interface SupplierCreateSchema {
	/** Name */
	name: string;
	/** Description */
	description: string;
	typ: EventTypes;
	/** Website Url */
	website_url: string;
	/** Logo Url */
	logo_url?: string | null;
	/** Contact Email */
	contact_email?: string | null;
	/** Contact Phone */
	contact_phone?: string | null;
}

/** SupplierListResponse */
export interface SupplierListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: SupplierModel[];
}

/** SupplierModel */
export interface SupplierModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	typ: EventTypes;
	/** Name */
	name: string;
	/** Description */
	description: string | null;
	/** Legal Name */
	legal_name: string | null;
	/** Website Url */
	website_url: string | null;
	/** Logo Url */
	logo_url: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Phone */
	contact_phone: string | null;
}

/** SupplierUpdateSchema */
export interface SupplierUpdateSchema {
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
	typ?: EventTypes | null;
	/** Website Url */
	website_url?: string | null;
	/** Logo Url */
	logo_url?: string | null;
	/** Contact Email */
	contact_email?: string | null;
	/** Contact Phone */
	contact_phone?: string | null;
}

/** TimeSchema */
export interface TimeSchema {
	/**
	 * Time
	 * The local date and time of the event in ISO 8601 format.
	 * @format time
	 */
	time: string;
	/**
	 * Timezone
	 * The UTC timezone offset (e.g., 5 for UTC+5).
	 * @min -12
	 * @max 14
	 * @default 5
	 */
	timezone?: number;
}

/** TourEventResponse */
export interface TourEventResponse {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Tour Option Id */
	tour_option_id: string | null;
	/** Event */
	event:
		| (
				| ({
						typ: "1";
				  } & FlightEventSchemaOutput)
				| ({
						typ: "2";
				  } & TrainEventSchemaOutput)
				| ({
						typ: "3";
				  } & BusEventSchemaOutput)
				| ({
						typ: "4";
				  } & TransferEventSchemaOutput)
				| ({
						typ: "5";
				  } & HousingEventSchemaOutput)
				| ({
						typ: "6";
				  } & ActivityEventSchemaOutput)
				| ({
						typ: "7";
				  } & InformationEventSchema)
		  )
		| MultipleOptionEventOutput;
}

/**
 * TourEventUpdateSchema
 * Schema for updating any event field.
 */
export interface TourEventUpdateSchema {
	/** Name */
	name?: string | null;
	/** Day */
	day?: number | null;
	/** Position */
	position?: number | null;
	/** Details */
	details?: Record<string, any> | null;
}

/** TourFinSettingsModel */
export interface TourFinSettingsModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Tour Meta Id */
	tour_meta_id: string | null;
	pricing_visibility: TourPricingVisibility;
	/** Markup */
	markup: number;
	/** Enumeration for supported currencies based on ISO 4217 codes. */
	currency: CurrencyType;
	/** Currency Rate To Uzs */
	currency_rate_to_uzs: number;
}

/** TourListResponse */
export interface TourListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: TourMetaModel[];
}

/** TourMetaCreateSchema */
export interface TourMetaCreateSchema {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/**
	 * Days
	 * @default 1
	 */
	days?: number;
	/**
	 * Nights
	 * @default 0
	 */
	nights?: number;
	/**
	 * Age From
	 * @default 18
	 */
	age_from?: number;
	/**
	 * Group Size
	 * @default 1
	 */
	group_size?: number;
	/** @default "group" */
	typ?: TourType;
	/** Categories */
	categories?: TourCategory[];
}

/** TourMetaModel */
export interface TourMetaModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Schedule Id */
	schedule_id: string | null;
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Cover Image Url */
	cover_image_url: string | null;
	/** Group Size */
	group_size: number;
	/** Days */
	days: number;
	/** Nights */
	nights: number;
	/** Age From */
	age_from: number;
	typ: TourType;
	status: TourStatus;
	/** Categories */
	categories: TourCategory[];
}

/** TourMetaUpdateSchema */
export interface TourMetaUpdateSchema {
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
	status?: TourStatus | null;
	typ?: TourType | null;
	/** Days */
	days?: number | null;
	/** Nights */
	nights?: number | null;
	/** Age From */
	age_from?: number | null;
	/** Group Size */
	group_size?: number | null;
	/** Categories */
	categories?: TourCategory[] | null;
}

/** TourMinMaxCostSchema */
export interface TourMinMaxCostSchemaInput {
	min: MonetaryValueSchema;
	max: MonetaryValueSchema;
}

/** TourMinMaxCostSchema */
export interface TourMinMaxCostSchemaOutput {
	min: MonetaryValueSchema;
	max: MonetaryValueSchema;
}

/** TourOptionModel */
export interface TourOptionModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Tour Meta Id */
	tour_meta_id: string | null;
}

/** TourScheduleModel */
export interface TourScheduleModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Is Seasonal */
	is_seasonal: boolean;
}

/** TourScheduleUpdate */
export interface TourScheduleUpdate {
	/** Is Seasonal */
	is_seasonal?: boolean | null;
}

/** TourSummaryResponse */
export interface TourSummaryResponse {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Events */
	events: AnyEventWithCostOutput[];
	tour_cost: TourMinMaxCostSchemaOutput;
}

/** TrainDetailSchema */
export interface TrainDetailSchemaInput {
	/** Hop */
	hop: TrainHopSchemaInput[];
}

/** TrainDetailSchema */
export interface TrainDetailSchemaOutput {
	/** Hop */
	hop: TrainHopSchemaOutput[];
}

/** TrainEventSchema */
export interface TrainEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "2"
	 */
	typ?: "2";
	details: TrainDetailSchemaInput;
}

/** TrainEventSchema */
export interface TrainEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "2"
	 */
	typ?: "2";
	details: TrainDetailSchemaOutput;
}

/**
 * TrainHopSchema
 * Represents a single leg of a train journey.
 */
export interface TrainHopSchemaInput {
	/** Details of the departure. */
	departure: TrainJourneyPointSchemaInput;
	/** Details of the arrival. */
	arrival: TrainJourneyPointSchemaInput;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseInput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseInput);
}

/**
 * TrainHopSchema
 * Represents a single leg of a train journey.
 */
export interface TrainHopSchemaOutput {
	/** Details of the departure. */
	departure: TrainJourneyPointSchemaOutput;
	/** Details of the arrival. */
	arrival: TrainJourneyPointSchemaOutput;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseOutput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseOutput);
}

/**
 * TrainJourneyPointSchema
 * Represents either a departure or arrival point for the train journey.
 */
export interface TrainJourneyPointSchemaInput {
	/**
	 * Date
	 * The date of departure or arrival.
	 * @format date
	 */
	date: string;
	/** The time of an event */
	time: TimeSchema;
	/** Location */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
}

/**
 * TrainJourneyPointSchema
 * Represents either a departure or arrival point for the train journey.
 */
export interface TrainJourneyPointSchemaOutput {
	/**
	 * Date
	 * The date of departure or arrival.
	 * @format date
	 */
	date: string;
	/** The time of an event */
	time: TimeSchema;
	/** Location */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
}

/** TransferCarCategoriesVariant */
export interface TransferCarCategoriesVariantInput {
	typ: TransferCarTypes;
	/** Pax */
	pax: number;
	/**
	 * Description
	 * Car description
	 */
	description: string;
	/** Categories */
	categories: TransferCarPackageCategorySchemaInput[];
}

/** TransferCarCategoriesVariant */
export interface TransferCarCategoriesVariantOutput {
	typ: TransferCarTypes;
	/** Pax */
	pax: number;
	/**
	 * Description
	 * Car description
	 */
	description: string;
	/** Categories */
	categories: TransferCarPackageCategorySchemaOutput[];
}

/**
 * TransferCarPackageCategorySchema
 * Represents a car variant.
 */
export interface TransferCarPackageCategorySchemaInput {
	/**
	 * Name
	 * Car category, i.e. standard, premium e.t.c.
	 */
	name: string;
	/** Expenses for this car of this category. */
	expenses: FixedExpenseInput;
}

/**
 * TransferCarPackageCategorySchema
 * Represents a car variant.
 */
export interface TransferCarPackageCategorySchemaOutput {
	/**
	 * Name
	 * Car category, i.e. standard, premium e.t.c.
	 */
	name: string;
	/** Expenses for this car of this category. */
	expenses: FixedExpenseOutput;
}

/** TransferCarVariant */
export interface TransferCarVariantInput {
	typ: TransferCarTypes;
	/** Pax */
	pax: number;
	/**
	 * Description
	 * Car description
	 */
	description: string;
	/** A simple fixed cost, ignores all context. */
	expenses: FixedExpenseInput;
}

/** TransferCarVariant */
export interface TransferCarVariantOutput {
	typ: TransferCarTypes;
	/** Pax */
	pax: number;
	/**
	 * Description
	 * Car description
	 */
	description: string;
	/** A simple fixed cost, ignores all context. */
	expenses: FixedExpenseOutput;
}

/**
 * TransferDetailsSchema
 * Represents a transfer journey with departure and arrival details.
 */
export interface TransferDetailsSchemaInput {
	typ: TransferTypes;
	/** Details of the departure. */
	departure: TransferJourneyPointSchemaInput;
	/** Details of the arrival. */
	arrival: TransferJourneyPointSchemaInput;
	/** Expenses */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseInput)
		| ({
				typ: "per_car";
		  } & PerCarExpenseInput)
		| ({
				typ: "per_car_category";
		  } & PerCarCategoryExpenseInput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseInput);
}

/**
 * TransferDetailsSchema
 * Represents a transfer journey with departure and arrival details.
 */
export interface TransferDetailsSchemaOutput {
	typ: TransferTypes;
	/** Details of the departure. */
	departure: TransferJourneyPointSchemaOutput;
	/** Details of the arrival. */
	arrival: TransferJourneyPointSchemaOutput;
	/** Expenses */
	expenses:
		| ({
				typ: "fixed";
		  } & FixedExpenseOutput)
		| ({
				typ: "per_car";
		  } & PerCarExpenseOutput)
		| ({
				typ: "per_car_category";
		  } & PerCarCategoryExpenseOutput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseOutput);
}

/** TransferEventSchema */
export interface TransferEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "4"
	 */
	typ?: "4";
	/** Represents a transfer journey with departure and arrival details. */
	details: TransferDetailsSchemaInput;
}

/** TransferEventSchema */
export interface TransferEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string;
	/**
	 * Description
	 * Event's description
	 */
	description: string;
	/**
	 * Day
	 * Event's day number in a tour
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 */
	position: number;
	/**
	 * Typ
	 * @default "4"
	 */
	typ?: "4";
	/** Represents a transfer journey with departure and arrival details. */
	details: TransferDetailsSchemaOutput;
}

/**
 * TransferJourneyPointSchema
 * Represents either a departure or arrival point for the journey.
 */
export interface TransferJourneyPointSchemaInput {
	/**
	 * Date
	 * The date of departure or arrival.
	 * @format date
	 */
	date: string;
	/** The time of an event */
	time: TimeSchema;
	/** Location */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
}

/**
 * TransferJourneyPointSchema
 * Represents either a departure or arrival point for the journey.
 */
export interface TransferJourneyPointSchemaOutput {
	/**
	 * Date
	 * The date of departure or arrival.
	 * @format date
	 */
	date: string;
	/** The time of an event */
	time: TimeSchema;
	/** Location */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
}

/** UpdateFinancialSchema */
export interface UpdateFinancialSchema {
	pricing_visibility?: TourPricingVisibility | null;
	/** Markup */
	markup?: number | null;
	currency?: CurrencyType | null;
	/** Currency Rate To Uzs */
	currency_rate_to_uzs?: number | null;
}

/** UpdateUserSchema */
export interface UpdateUserSchema {
	role?: UserRoles | null;
}

/** UserProfileUpdate */
export interface UserProfileUpdate {
	/** First Name */
	first_name?: string | null;
	/** Last Name */
	last_name?: string | null;
	/** Title */
	title?: string | null;
	/** Phone Number */
	phone_number?: string | null;
	/** Location */
	location?: string | null;
	preferred_currency?: CurrencyCode | null;
}

/** ValidationError */
export interface ValidationError {
	/** Location */
	loc: (string | number)[];
	/** Message */
	msg: string;
	/** Error Type */
	type: string;
}

/** Role */
export enum StaffInviteRoleEnum {
	OperatorSalesManager = "operator_sales_manager",
	OperatorAccountant = "operator_accountant"
}

/** Role */
export enum StaffReadRoleEnum {
	OperatorSalesManager = "operator_sales_manager",
	OperatorAccountant = "operator_accountant"
}

export enum StaffUpdateRoleEnum {
	OperatorSalesManager = "operator_sales_manager",
	OperatorAccountant = "operator_accountant"
}

export interface GetUserAdminUserIdGetParams {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
}

export interface UpdateUserAdminUserIdPatchParams {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
}

export interface DeleteUserAdminUserIdDeleteParams {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
}

export interface CreateUserAdminUserPostParams {
	/** @default "authenticated_user" */
	role?: UserRoles;
}

export interface ListToursTourGetParams {
	/**
	 * Skip
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @default 100
	 */
	limit?: number;
	/**
	 * Desc
	 * @default true
	 */
	desc?: boolean;
	/** Status */
	status?: TourStatus | null;
	/** Q */
	q?: string | null;
	/** @default "created_at" */
	sort_by?: TourListSortField;
}

export interface GetTourTourTourIdGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface UpdateTourTourTourIdPatchParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface DeleteTourTourTourIdDeleteParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface UploadTourCoverTourTourIdCoverPostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface DeleteTourCoverTourTourIdCoverDeleteParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface ListAllTourOptionsTourTourIdOptionAllGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface CreateTourOptionTourTourIdOptionCreatePostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface DeleteOptionTourTourIdOptionOptionIdDeleteParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
}

export interface GetTourSummaryTourTourIdOptionOptionIdSummaryGetParams {
	/**
	 * Enumeration for supported currencies based on ISO 4217 codes.
	 * @default "USD"
	 */
	currency?: CurrencyType;
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface GetTourFinancialsTourTourIdFinanceGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface CreateTourFinancialsTourTourIdFinancePostParams {
	tourId: string;
}

export interface UpdateTourFinancialsTourTourIdFinancePatchParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

/** Event */
export type CreateEventTourTourIdOptionIdEventPostPayload =
	| (
			| ({
					typ: "1";
			  } & FlightEventSchemaInput)
			| ({
					typ: "2";
			  } & TrainEventSchemaInput)
			| ({
					typ: "3";
			  } & BusEventSchemaInput)
			| ({
					typ: "4";
			  } & TransferEventSchemaInput)
			| ({
					typ: "5";
			  } & HousingEventSchemaInput)
			| ({
					typ: "6";
			  } & ActivityEventSchemaInput)
			| ({
					typ: "7";
			  } & InformationEventSchema)
	  )
	| MultipleOptionEventInput;

export interface CreateEventTourTourIdOptionIdEventPostParams {
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface ListTourEventsTourTourIdOptionIdEventGetParams {
	/** Day */
	day?: number | null;
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface GetTourEventTourTourIdOptionIdEventEventIdGetParams {
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface UpdateTourEventTourTourIdOptionIdEventEventIdPatchParams {
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface DeleteTourEventTourTourIdOptionIdEventEventIdDeleteParams {
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface ReorderEventTourTourIdOptionIdEventEventIdReorderPostParams {
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface UploadEventImagesTourTourIdEventEventIdImagesPostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
}

export interface ListEventImagesTourTourIdEventEventIdImagesAllGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
}

export interface DeleteEventImageTourTourIdEventEventIdImagesImageIdDeleteParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
}

export interface UpdateEventImageTourTourIdEventEventIdImagesImageIdSetPrimaryPatchParams {
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface GetTourCommissionsTourTourIdSeasonalityGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface CreateTourSeasonCommissionTourTourIdSeasonalityCreatePostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface UpdateTourCommissionsTourTourIdSeasonalityUpdateCommissionIdPatchParams {
	/**
	 * Commission Id
	 * @format uuid
	 */
	commissionId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface RemoveCommissionTourTourIdSeasonalityRemoveCommissionIdDeleteParams {
	/**
	 * Commission Id
	 * @format uuid
	 */
	commissionId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface GetTourScheduleTourTourIdScheduleGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface UpdateTourScheduleTourTourIdSchedulePatchParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface AddFixedDateTourTourIdScheduleDatePostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface BulkAddFixedDatesTourTourIdScheduleDateBulkPostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface BulkRemoveFixedDatesTourTourIdScheduleDateBulkDeleteParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface RemoveFixedDateTourTourIdScheduleDateDateIdDeleteParams {
	/**
	 * Date Id
	 * @format uuid
	 */
	dateId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface AddRecurrenceRuleTourTourIdScheduleRulePostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface BulkAddRecurrenceRulesTourTourIdScheduleRuleBulkPostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface RemoveRecurrenceRuleTourTourIdScheduleRuleRuleIdDeleteParams {
	/**
	 * Rule Id
	 * @format uuid
	 */
	ruleId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface GetScheduleOccurrencesTourTourIdScheduleOccurrencesGetParams {
	/**
	 * From
	 * @format date
	 */
	from: string;
	/**
	 * To
	 * @format date
	 */
	to: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface CreateLandingPageTourTourIdLandingPostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface GetLandingPageTourTourIdLandingGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface UpdateLandingPageTourTourIdLandingPatchParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface UploadLandingImagesTourTourIdLandingImagesPostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface ListLandingImagesTourTourIdLandingImagesGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface DeleteLandingImageTourTourIdLandingImagesImageIdDeleteParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
}

export interface UdpateOperatorOperatorIdPatchParams {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
}

export interface GetOperatorOperatorIdGetParams {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
}

export interface DeleteOperatorOperatorIdDeleteParams {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
}

export interface GetFileUrlOperatorMeFilesFileIdGetParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface RemoveFileOperatorMeFilesFileIdDeleteParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface UpdateStaffMemberOperatorStaffUserIdPatchParams {
	/**
	 * User Id
	 * @format uuid
	 */
	userId: string;
}

export interface ListSuppliersSupplierGetParams {
	/**
	 * Skip
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @default 100
	 */
	limit?: number;
	/** Typ */
	typ?: EventTypes | null;
}

export interface GetSupplierSupplierSupplierIdGetParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
}

export interface UpdateSupplierSupplierSupplierIdPatchParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
}

export interface DeleteSupplierSupplierSupplierIdDeleteParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
}

export interface GetLogoSupplierSupplierIdLogoGetParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
}

export interface AddLogoSupplierSupplierIdLogoPostParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
}

export interface DeleteLogoSupplierSupplierIdLogoDeleteParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
}

export interface ListMyBookingsBookingOrderMyGetParams {
	/** Booking Status */
	booking_status: BookingStatus | null;
}

export interface GetBookingOrderBookingOrderBookingIdGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface UpdateBookingStatusBookingOrderBookingIdStatusUpdatePatchParams {
	status: BookingStatus;
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface CancelBookingBookingOrderBookingIdCancelPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface AddPassengerInfoBookingPaxBookingIdPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface ListPassengerInfoBookingPaxBookingIdGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface GetFileBinaryBookingPaxFileFileIdGetParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface RemoveFileBookingPaxFileFileIdDeleteParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface ListPaymentsBookingPaymentGetParams {
	/**
	 * Skip
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @default 100
	 */
	limit?: number;
	/** Status */
	status?: ClientPaymentStatus | null;
	/** Booking Id */
	booking_id?: string | null;
	/** Created From */
	created_from?: string | null;
	/** Created To */
	created_to?: string | null;
}

export interface GetPaymentBookingPaymentPaymentIdGetParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
}

export interface UpdatePaymentBookingPaymentPaymentIdPatchParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
}

export interface DeletePaymentBookingPaymentPaymentIdDeleteParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
}

export interface ConfirmPaymentBookingPaymentPaymentIdConfirmPostParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
}

export interface DownloadAttachmentBookingPaymentPaymentIdAttachmentGetParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
}

export interface SearchGeoSearchGetParams {
	/**
	 * Q
	 * @minLength 1
	 * @maxLength 200
	 */
	q: string;
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Limit
	 * @min 1
	 * @max 50
	 * @default 10
	 */
	limit?: number;
}

export interface ReverseGeoReverseGetParams {
	/**
	 * Lat
	 * @min -90
	 * @max 90
	 */
	lat: number;
	/**
	 * Long
	 * @min -180
	 * @max 180
	 */
	long: number;
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Limit
	 * @min 1
	 * @max 10
	 * @default 1
	 */
	limit?: number;
}
