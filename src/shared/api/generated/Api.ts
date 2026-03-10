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

/** TransportTypes */
export enum TransportTypes {
	Value1 = "1",
	Value2 = "2",
	Value3 = "3",
	Value4 = "4"
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
	Value7 = "7"
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
	/** Event location */
	location: LocationSchema;
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
	/** Event location */
	location: LocationSchema;
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
	 * @default "5"
	 */
	typ?: "5";
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
	 * @default "5"
	 */
	typ?: "5";
	details: ActivityDetailsSchemaOutput;
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
				  } & TransportEventSchemaInput)
				| ({
						typ: "3";
				  } & TransferEventSchemaInput)
				| ({
						typ: "4";
				  } & HousingEventSchemaInput)
				| ({
						typ: "5";
				  } & ActivityEventSchemaInput)
				| ({
						typ: "6";
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
				  } & TransportEventSchemaOutput)
				| ({
						typ: "3";
				  } & TransferEventSchemaOutput)
				| ({
						typ: "4";
				  } & HousingEventSchemaOutput)
				| ({
						typ: "5";
				  } & ActivityEventSchemaOutput)
				| ({
						typ: "6";
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

/** AuthUserModel */
export interface AuthUserModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Email */
	email: string;
	/** Picture */
	picture: string | null;
	/** Password */
	password: string | null;
	/** Operator Id */
	operator_id: string | null;
	/** Agency Id */
	agency_id: string | null;
	role: UserRoles;
}

/** BaseUser */
export interface BaseUser {
	/**
	 * Email
	 * @format email
	 */
	email: string;
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

/** Body_invite_staff_operator_staff_invite_post */
export interface BodyInviteStaffOperatorStaffInvitePost {
	user: AuthUserIn;
	payload: StaffInvite;
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
	/** Invoice Id */
	invoice_id: string | null;
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

/** CreateAgencySchema */
export interface CreateAgencySchema {
	/** Name */
	name: string;
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
	departure_location: LocationSchema;
	arrival_location: LocationSchema;
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

/** FlightDetailsSchema */
export interface FlightDetailsSchemaOutput {
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
	departure_location: LocationSchema;
	arrival_location: LocationSchema;
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

/** FullScheduleSchema */
export interface FullScheduleSchema {
	schedule: TourScheduleModel;
	/** Fixed Dates */
	fixed_dates: FixedDateModel[];
	/** Recurrence Rules */
	recurrence_rules: RecurrenceDateModel[];
}

/** HTTPValidationError */
export interface HTTPValidationError {
	/** Detail */
	detail?: ValidationError[];
}

/** HousingDetailsSchema */
export interface HousingDetailsSchemaInput {
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
	 * @default "4"
	 */
	typ?: "4";
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
	 * @default "4"
	 */
	typ?: "4";
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
	 * @default "6"
	 */
	typ?: "6";
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

/** LocationSchema */
export interface LocationSchema {
	/**
	 * Name
	 * The city or station name.
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
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
	typ: "7";
	/** Details */
	details: (
		| ({
				typ: "1";
		  } & FlightEventSchemaInput)
		| ({
				typ: "2";
		  } & TransportEventSchemaInput)
		| ({
				typ: "3";
		  } & TransferEventSchemaInput)
		| ({
				typ: "4";
		  } & HousingEventSchemaInput)
		| ({
				typ: "5";
		  } & ActivityEventSchemaInput)
		| ({
				typ: "6";
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
	typ: "7";
	/** Details */
	details: (
		| ({
				typ: "1";
		  } & FlightEventSchemaOutput)
		| ({
				typ: "2";
		  } & TransportEventSchemaOutput)
		| ({
				typ: "3";
		  } & TransferEventSchemaOutput)
		| ({
				typ: "4";
		  } & HousingEventSchemaOutput)
		| ({
				typ: "5";
		  } & ActivityEventSchemaOutput)
		| ({
				typ: "6";
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
	/** Logo Url */
	logo_url?: string | null;
	/** Description */
	description?: string | null;
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
	/** Comission */
	comission: number;
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
	/**
	 * Employment Status
	 * @default "active"
	 */
	employment_status?: string;
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
	role?: UserRoles | null;
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

/** TourEventModel */
export interface TourEventModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Tour Option Id */
	tour_option_id: string | null;
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/** Typ */
	typ: string;
	/** Details */
	details: Record<string, any>;
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
}

/** TourMetaUpdateSchema */
export interface TourMetaUpdateSchema {
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
	status?: TourStatus | null;
	typ?: TourType | null;
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
	/**
	 * Is Seasonal
	 * @default false
	 */
	is_seasonal?: boolean;
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
	departure: TransferJourneyPointSchema;
	/** Details of the arrival. */
	arrival: TransferJourneyPointSchema;
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
	departure: TransferJourneyPointSchema;
	/** Details of the arrival. */
	arrival: TransferJourneyPointSchema;
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
	 * @default "3"
	 */
	typ?: "3";
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
	 * @default "3"
	 */
	typ?: "3";
	/** Represents a transfer journey with departure and arrival details. */
	details: TransferDetailsSchemaOutput;
}

/**
 * TransferJourneyPointSchema
 * Represents either a departure or arrival point for the journey.
 */
export interface TransferJourneyPointSchema {
	/**
	 * Date
	 * The date of departure or arrival.
	 * @format date
	 */
	date: string;
	/** The time of an event */
	time: TimeSchema;
	location: LocationSchema;
}

/**
 * TransportDepartureArrivalSchema
 * Represents a train journey with departure and arrival details.
 */
export interface TransportDepartureArrivalSchemaInput {
	typ: TransportTypes;
	/** Details of the departure. */
	departure: TransportJourneyPointSchema;
	/** Details of the arrival. */
	arrival: TransportJourneyPointSchema;
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
 * TransportDepartureArrivalSchema
 * Represents a train journey with departure and arrival details.
 */
export interface TransportDepartureArrivalSchemaOutput {
	typ: TransportTypes;
	/** Details of the departure. */
	departure: TransportJourneyPointSchema;
	/** Details of the arrival. */
	arrival: TransportJourneyPointSchema;
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

/** TransportEventSchema */
export interface TransportEventSchemaInput {
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
	/** Represents a train journey with departure and arrival details. */
	details: TransportDepartureArrivalSchemaInput;
}

/** TransportEventSchema */
export interface TransportEventSchemaOutput {
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
	/** Represents a train journey with departure and arrival details. */
	details: TransportDepartureArrivalSchemaOutput;
}

/**
 * TransportJourneyPointSchema
 * Represents either a departure or arrival point for the train journey.
 */
export interface TransportJourneyPointSchema {
	/**
	 * Date
	 * The date of departure or arrival.
	 * @format date
	 */
	date: string;
	/** The time of an event */
	time: TimeSchema;
	location: LocationSchema;
}

/** UpdateUserSchema */
export interface UpdateUserSchema {
	role?: UserRoles | null;
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

export interface ChangePasswordAuthPasswordChangePatchParams {
	/** New Password */
	new_password: string;
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

/** Event */
export type CreateEventTourTourIdOptionIdEventPostPayload =
	| (
			| ({
					typ: "1";
			  } & FlightEventSchemaInput)
			| ({
					typ: "2";
			  } & TransportEventSchemaInput)
			| ({
					typ: "3";
			  } & TransferEventSchemaInput)
			| ({
					typ: "4";
			  } & HousingEventSchemaInput)
			| ({
					typ: "5";
			  } & ActivityEventSchemaInput)
			| ({
					typ: "6";
			  } & InformationEventSchema)
	  )
	| MultipleOptionEventInput;

export interface CreateEventTourTourIdOptionIdEventPostParams {
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

export interface GetTourComissionsTourTourIdSeasonalityGetParams {
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

export interface UpdateTourComissionsTourTourIdSeasonalityUpdateCommissionIdPatchParams {
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

export interface GetFileBinaryOperatorMeFilesFileIdGetParams {
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

export interface UdpateSupplierSupplierSupplierIdPatchParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
}

export interface GetSupplierSupplierSupplierIdGetParams {
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
