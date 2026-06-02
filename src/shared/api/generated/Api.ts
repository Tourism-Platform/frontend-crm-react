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

/** VehicleBodyType */
export enum VehicleBodyType {
	Sedan = "sedan",
	Minivan = "minivan",
	Minibus = "minibus",
	MinibusPlus = "minibus_plus",
	Bus = "bus",
	Suv = "suv",
	Coach = "coach"
}

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
	CityTour = "city_tour",
	CityTransfer = "city_transfer",
	IntercityTransfer = "intercity_transfer",
	AirportTransfer = "airport_transfer",
	StationTransfer = "station_transfer",
	Custom = "custom"
}

/** TourType */
export enum TourType {
	Regular = "regular",
	Custom = "custom"
}

/** TourStatus */
export enum TourStatus {
	Draft = "draft",
	Published = "published",
	Archived = "archived"
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
	CulturalHistorical = "cultural_historical",
	ReligiousSpiritual = "religious_spiritual",
	Archaeological = "archaeological",
	AdventureOutdoor = "adventure_outdoor",
	EcoNature = "eco_nature",
	HikingTrekking = "hiking_trekking",
	CityTour = "city_tour",
	GastronomyCulinary = "gastronomy_culinary",
	PhotographyCreative = "photography_creative",
	Educational = "educational",
	MasterClassWorkshop = "master_class_workshop",
	WellnessSpa = "wellness_spa",
	YogaMeditation = "yoga_meditation",
	BusinessMice = "business_mice",
	FamilyKids = "family_kids",
	MultiDestination = "multi_destination"
}

/** TourCatalogSort */
export enum TourCatalogSort {
	PriceAsc = "price_asc",
	PriceDesc = "price_desc",
	DurationAsc = "duration_asc",
	DurationDesc = "duration_desc"
}

/** SupplierType */
export enum SupplierType {
	Flight = "flight",
	Transfer = "transfer",
	Hotel = "hotel",
	Museum = "museum",
	Activity = "activity"
}

/** SupplierPaymentStatus */
export enum SupplierPaymentStatus {
	Paid = "paid",
	NotPaid = "not_paid"
}

/** StaffStatus */
export enum StaffStatus {
	Pending = "pending",
	Active = "active",
	Inactive = "inactive"
}

/** PickupType */
export enum PickupType {
	AirportPickup = "airport_pickup",
	HotelPickup = "hotel_pickup"
}

/** PaymentMethod */
export enum PaymentMethod {
	Bank = "bank",
	Wire = "wire",
	Check = "check",
	Cash = "cash",
	Other = "other",
	CreditCard = "credit_card"
}

/** LanguageCode */
export enum LanguageCode {
	En = "en",
	Ru = "ru",
	Uz = "uz"
}

/** Language */
export enum Language {
	Uzbek = "uzbek",
	Russian = "russian",
	English = "english",
	Italian = "italian",
	German = "german",
	Spanish = "spanish",
	Portuguese = "portuguese"
}

/** InvoiceType */
export enum InvoiceType {
	OperatorToAgency = "operator_to_agency",
	SupplierToOperator = "supplier_to_operator"
}

/** InvoiceStatus */
export enum InvoiceStatus {
	Draft = "draft",
	Sent = "sent",
	Partial = "partial",
	Paid = "paid",
	Overdue = "overdue",
	Cancelled = "cancelled"
}

/** HousingRoomTypes */
export enum HousingRoomTypes {
	Single = "single",
	Double = "double",
	Twin = "twin",
	Triple = "triple",
	Quadruple = "quadruple",
	Suite = "suite",
	Family = "family"
}

/** Gender */
export enum Gender {
	M = "M",
	F = "F"
}

/** Currency */
export enum Currency {
	UZS = "UZS",
	USD = "USD",
	EUR = "EUR",
	RUB = "RUB",
	GBP = "GBP"
}

/** ClientPaymentStatus */
export enum ClientPaymentStatus {
	NotConfirmed = "not_confirmed",
	Confirmed = "confirmed"
}

/** BookingTransition */
export enum BookingTransition {
	Submit = "submit",
	MoveToPending = "move-to-pending",
	MoveToConfirmed = "move-to-confirmed"
}

/** BookingStatus */
export enum BookingStatus {
	Draft = "draft",
	New = "new",
	Pending = "pending",
	Confirmed = "confirmed",
	InProgress = "in_progress",
	Completed = "completed",
	Cancelled = "cancelled",
	Declined = "declined"
}

/** BookingClientType */
export enum BookingClientType {
	Agency = "agency",
	Tourist = "tourist"
}

/** AvailabilityStatus */
export enum AvailabilityStatus {
	Pending = "pending",
	Available = "available",
	Unavailable = "unavailable"
}

/** AmenitiesTypes */
export enum AmenitiesTypes {
	Wifi = "wifi",
	Pool = "pool",
	Breakfast = "breakfast",
	Parking = "parking",
	Gym = "gym",
	Spa = "spa",
	Restaurant = "restaurant",
	Bar = "bar",
	AirportShuttle = "airport_shuttle",
	AirConditioning = "air_conditioning",
	RoomService = "room_service",
	Laundry = "laundry",
	Concierge = "concierge",
	BusinessCenter = "business_center",
	KidsClub = "kids_club",
	BeachAccess = "beach_access",
	Sauna = "sauna",
	Jacuzzi = "jacuzzi",
	PetFriendly = "pet_friendly",
	WheelchairAccessible = "wheelchair_accessible"
}

/** ActivityType */
export enum ActivityType {
	Food = "food",
	MasterClass = "master_class",
	Sightseeing = "sightseeing",
	Outdoor = "outdoor",
	Riding = "riding",
	Extreme = "extreme",
	Wellness = "wellness",
	Entertainment = "entertainment",
	WaterActivities = "water_activities",
	Photography = "photography",
	Spiritual = "spiritual"
}

/** AccountType */
export enum AccountType {
	TourOperator = "tour_operator",
	TourAgency = "tour_agency"
}

/** AccountTypeRead */
export interface AccountTypeRead {
	account_type: AccountType;
}

/** ActivityDetailsPubSchema */
export interface ActivityDetailsPubSchemaInput {
	typ: ActivityType;
	/** Location */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
	start_time: TimeSchema;
	end_time: TimeSchema;
}

/** ActivityDetailsPubSchema */
export interface ActivityDetailsPubSchemaOutput {
	typ: ActivityType;
	/** Location */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
	start_time: TimeSchema;
	end_time: TimeSchema;
}

/** ActivityDetailsSchema */
export interface ActivityDetailsSchemaInput {
	/** Sub-type of an activity */
	typ?: ActivityType | null;
	/**
	 * Location
	 * Event location
	 */
	location?: LocationInSchema | LocationRefSchema | LocationOutSchema | null;
	/** Event start time */
	start_time?: TimeSchema | null;
	/** Event start time */
	end_time?: TimeSchema | null;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseInput)
		  )
		| null;
	fees?: FixedExpenseInput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** ActivityDetailsSchema */
export interface ActivityDetailsSchemaOutput {
	/** Sub-type of an activity */
	typ?: ActivityType | null;
	/**
	 * Location
	 * Event location
	 */
	location?: LocationInSchema | LocationRefSchema | LocationOutSchema | null;
	/** Event start time */
	start_time?: TimeSchema | null;
	/** Event start time */
	end_time?: TimeSchema | null;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseOutput)
		  )
		| null;
	fees?: FixedExpenseOutput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** ActivityEventPubRead */
export interface ActivityEventPubReadInput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "6"
	 */
	typ?: "6";
	details: ActivityDetailsPubSchemaInput;
}

/** ActivityEventPubRead */
export interface ActivityEventPubReadOutput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "6"
	 */
	typ?: "6";
	details: ActivityDetailsPubSchemaOutput;
}

/** ActivityEventSchema */
export interface ActivityEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: ActivityDetailsSchemaInput | null;
}

/** ActivityEventSchema */
export interface ActivityEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: ActivityDetailsSchemaOutput | null;
}

/** ActivityEventUpdate */
export interface ActivityEventUpdate {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "6"
	 */
	typ?: "6";
	details?: ActivityDetailsSchemaInput | null;
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

/** AgencyFilesModel */
export interface AgencyFilesModel {
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
	/** Url */
	url: string;
}

/** AgencyInfoModel */
export interface AgencyInfoModel {
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
	/** Logo Path */
	logo_path: string | null;
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

/** AgencyInfoUpdate */
export interface AgencyInfoUpdate {
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
	cost: TourMinMaxCostSchemaInput;
	markup: TourMinMaxCostSchemaInput;
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
	cost: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
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
	/** Profile Picture Path */
	profile_picture_path: string | null;
	default_currency: Currency;
}

/** AvailabilityApply */
export interface AvailabilityApply {
	status: AvailabilityStatus;
}

/** Body_add_agency_documents_agency_me_documents_post */
export interface BodyAddAgencyDocumentsAgencyMeDocumentsPost {
	/** Files */
	files: File[];
}

/** Body_add_agency_logo_agency_me_logo_post */
export interface BodyAddAgencyLogoAgencyMeLogoPost {
	/**
	 * File
	 * @format binary
	 */
	file: File;
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

/** Body_upload_passenger_passport_booking_order__booking_id__pax__pax_id__passport_post */
export interface BodyUploadPassengerPassportBookingOrderBookingIdPaxPaxIdPassportPost {
	/**
	 * File
	 * @format binary
	 */
	file: File;
}

/** Body_upload_receipt_operator_supplier_payment__payment_id__receipt_post */
export interface BodyUploadReceiptOperatorSupplierPaymentPaymentIdReceiptPost {
	/**
	 * File
	 * @format binary
	 */
	file: File;
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
	 * Date
	 * @format date
	 */
	date: string;
	/**
	 * Pax
	 * @exclusiveMin 0
	 */
	pax: number;
	/** Comment */
	comment?: string | null;
}

/**
 * BookingEventAvailabilityModel
 * Per-booking, per-event availability assessed by the operator while the
 * booking is being processed (``BookingStatus.PENDING``). All rows AVAILABLE
 * gates the transition to CONFIRMED; any UNAVAILABLE auto-declines the
 * booking.
 */
export interface BookingEventAvailabilityModel {
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
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	status: AvailabilityStatus;
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
	/** Snapshot Id */
	snapshot_id: string | null;
	/**
	 * Date
	 * @format date
	 */
	date: string;
	/**
	 * End Date
	 * @format date
	 */
	end_date: string;
	/** Pax */
	pax: number;
	status: BookingStatus;
	/**
	 * Paid Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	paid_amount: string;
	paid_currency: Currency;
	/**
	 * Tour Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	tour_amount: string;
	tour_currency: Currency;
	/** Fx Rate Id */
	fx_rate_id: string | null;
	/** Fx Rate Applied */
	fx_rate_applied: string | null;
	/** Agreed Price */
	agreed_price: string | null;
	/** Cancelled At */
	cancelled_at: string | null;
	/** Cancellation Reason */
	cancellation_reason: string | null;
	/** Comment */
	comment: string | null;
}

/** BookingOrderListItem */
export interface BookingOrderListItem {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Client Name */
	client_name: string;
	/** Tour Name */
	tour_name: string;
	tour_type: TourType;
	status: BookingStatus;
	/**
	 * Date
	 * @format date
	 */
	date: string;
	/**
	 * End Date
	 * @format date
	 */
	end_date: string;
	/**
	 * Created At
	 * @format date-time
	 */
	created_at: string;
	/** Pax */
	pax: number;
	/** Order Number */
	order_number: string;
	client_type: BookingClientType;
}

/** BookingOrderListResponse */
export interface BookingOrderListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: BookingOrderListItem[];
}

/** BookingPaxFilesModel */
export interface BookingPaxFilesModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Booking Pax Id
	 * @format uuid
	 */
	booking_pax_id: string;
	/** Url */
	url: string;
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
	/** Full Name */
	full_name: string;
	gender: Gender;
	/** Nationality */
	nationality: string;
	/**
	 * Date Of Birth
	 * @format date
	 */
	date_of_birth: string;
	/** Passport Number */
	passport_number: string;
	/**
	 * Expired Date
	 * @format date
	 */
	expired_date: string;
	/** Comment */
	comment: string | null;
}

/** BookingUpdate */
export interface BookingUpdate {
	/** Date */
	date?: string | null;
	/** Pax */
	pax?: number | null;
	/** Comment */
	comment?: string | null;
}

/** BusDetailPubSchema */
export interface BusDetailPubSchemaInput {
	/** Hop */
	hop: BusHopPubSchemaInput[];
}

/** BusDetailPubSchema */
export interface BusDetailPubSchemaOutput {
	/** Hop */
	hop: BusHopPubSchemaOutput[];
}

/** BusDetailSchema */
export interface BusDetailSchemaInput {
	/** Hop */
	hop?: BusHopSchemaInput[] | null;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseInput)
		  )
		| null;
	fees?: FixedExpenseInput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** BusDetailSchema */
export interface BusDetailSchemaOutput {
	/** Hop */
	hop?: BusHopSchemaOutput[] | null;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseOutput)
		  )
		| null;
	fees?: FixedExpenseOutput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** BusEventPubRead */
export interface BusEventPubReadInput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "3"
	 */
	typ?: "3";
	details: BusDetailPubSchemaInput;
}

/** BusEventPubRead */
export interface BusEventPubReadOutput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "3"
	 */
	typ?: "3";
	details: BusDetailPubSchemaOutput;
}

/** BusEventSchema */
export interface BusEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: BusDetailSchemaInput | null;
}

/** BusEventSchema */
export interface BusEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: BusDetailSchemaOutput | null;
}

/** BusEventUpdate */
export interface BusEventUpdate {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "3"
	 */
	typ?: "3";
	details?: BusDetailSchemaInput | null;
}

/** BusHopPubSchema */
export interface BusHopPubSchemaInput {
	/** Represents either a departure or arrival point for the bus journey. */
	departure: BusJourneyPointSchemaInput;
	/** Represents either a departure or arrival point for the bus journey. */
	arrival: BusJourneyPointSchemaInput;
}

/** BusHopPubSchema */
export interface BusHopPubSchemaOutput {
	/** Represents either a departure or arrival point for the bus journey. */
	departure: BusJourneyPointSchemaOutput;
	/** Represents either a departure or arrival point for the bus journey. */
	arrival: BusJourneyPointSchemaOutput;
}

/**
 * BusHopSchema
 * Represents a single leg of a bus journey.
 */
export interface BusHopSchemaInput {
	/** Details of the departure. */
	departure?: BusJourneyPointSchemaInput | null;
	/** Details of the arrival. */
	arrival?: BusJourneyPointSchemaInput | null;
}

/**
 * BusHopSchema
 * Represents a single leg of a bus journey.
 */
export interface BusHopSchemaOutput {
	/** Details of the departure. */
	departure?: BusJourneyPointSchemaOutput | null;
	/** Details of the arrival. */
	arrival?: BusJourneyPointSchemaOutput | null;
}

/**
 * BusJourneyPointSchema
 * Represents either a departure or arrival point for the bus journey.
 */
export interface BusJourneyPointSchemaInput {
	/**
	 * Date
	 * The date of departure or arrival.
	 */
	date?: string | null;
	/** The time of an event */
	time?: TimeSchema | null;
	/** Location */
	location?: LocationInSchema | LocationRefSchema | LocationOutSchema | null;
}

/**
 * BusJourneyPointSchema
 * Represents either a departure or arrival point for the bus journey.
 */
export interface BusJourneyPointSchemaOutput {
	/**
	 * Date
	 * The date of departure or arrival.
	 */
	date?: string | null;
	/** The time of an event */
	time?: TimeSchema | null;
	/** Location */
	location?: LocationInSchema | LocationRefSchema | LocationOutSchema | null;
}

/** ClassicSwiftDetails */
export interface ClassicSwiftDetails {
	/**
	 * Typ
	 * @default "classic_swift"
	 */
	typ?: "classic_swift";
	/**
	 * Account Name Iban
	 * @maxLength 64
	 */
	account_name_iban: string;
	/**
	 * Swift Bic
	 * @minLength 8
	 * @maxLength 11
	 */
	swift_bic: string;
	/**
	 * Bank Name
	 * @maxLength 255
	 */
	bank_name: string;
	/**
	 * Bank Address
	 * @maxLength 512
	 */
	bank_address: string;
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
	currency: Currency;
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
	currency_type: Currency;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** EmptyDetails */
export type EmptyDetails = object;

/** EmptyDetailsPub */
export type EmptyDetailsPub = object;

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
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
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
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	cost: MonetaryValueSchema;
}

/** FlightDetailsPubSchema */
export interface FlightDetailsPubSchemaInput {
	/** Hop */
	hop: FlightHopPubSchemaInput[];
}

/** FlightDetailsPubSchema */
export interface FlightDetailsPubSchemaOutput {
	/** Hop */
	hop: FlightHopPubSchemaOutput[];
}

/** FlightDetailsSchema */
export interface FlightDetailsSchemaInput {
	/** Hop */
	hop?: FlightHopDetailsSchemaInput[] | null;
	/**
	 * Expenses
	 * Expenses strategy for this event
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseInput)
		  )
		| null;
	fees?: FixedExpenseInput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** FlightDetailsSchema */
export interface FlightDetailsSchemaOutput {
	/** Hop */
	hop?: FlightHopDetailsSchemaOutput[] | null;
	/**
	 * Expenses
	 * Expenses strategy for this event
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseOutput)
		  )
		| null;
	fees?: FixedExpenseOutput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** FlightEventPubRead */
export interface FlightEventPubReadInput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "1"
	 */
	typ?: "1";
	details: FlightDetailsPubSchemaInput;
}

/** FlightEventPubRead */
export interface FlightEventPubReadOutput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "1"
	 */
	typ?: "1";
	details: FlightDetailsPubSchemaOutput;
}

/** FlightEventSchema */
export interface FlightEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: FlightDetailsSchemaInput | null;
}

/** FlightEventSchema */
export interface FlightEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: FlightDetailsSchemaOutput | null;
}

/** FlightEventUpdate */
export interface FlightEventUpdate {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "1"
	 */
	typ?: "1";
	details?: FlightDetailsSchemaInput | null;
}

/** FlightHopDetailsSchema */
export interface FlightHopDetailsSchemaInput {
	/**
	 * Airline Code
	 * IATA or ICAO airline code (2–3 letters/numbers, uppercase)
	 */
	airline_code?: string | null;
	/**
	 * Flight Number
	 * Flight number (1–4 digits)
	 */
	flight_number?: number | null;
	/**
	 * Departure Airport Code
	 * Departure airport IATA code (3 uppercase letters)
	 */
	departure_airport_code?: string | null;
	/**
	 * Arrival Airport Code
	 * Arrival airport IATA code (3 uppercase letters)
	 */
	arrival_airport_code?: string | null;
	/** Departure Location */
	departure_location?:
		| LocationInSchema
		| LocationRefSchema
		| LocationOutSchema
		| null;
	/** Arrival Location */
	arrival_location?:
		| LocationInSchema
		| LocationRefSchema
		| LocationOutSchema
		| null;
	/**
	 * Departure Date
	 * Scheduled departure date (YYYY-MM-DD)
	 */
	departure_date?: string | null;
	/**
	 * Arrival Date
	 * Scheduled arrival date (YYYY-MM-DD)
	 */
	arrival_date?: string | null;
	departure_time?: TimeSchema | null;
	arrival_time?: TimeSchema | null;
	/**
	 * Departure Terminal
	 * Departure terminal (e.g., '1', 'T2', 'A')
	 */
	departure_terminal?: string | null;
	/**
	 * Departure Gate
	 * Departure gate (e.g., 'A12', 'B3')
	 */
	departure_gate?: string | null;
	/**
	 * Amenities
	 * List of amenities available on this flight.
	 */
	amenities?: AmenitiesTypes[] | null;
}

/** FlightHopDetailsSchema */
export interface FlightHopDetailsSchemaOutput {
	/**
	 * Airline Code
	 * IATA or ICAO airline code (2–3 letters/numbers, uppercase)
	 */
	airline_code?: string | null;
	/**
	 * Flight Number
	 * Flight number (1–4 digits)
	 */
	flight_number?: number | null;
	/**
	 * Departure Airport Code
	 * Departure airport IATA code (3 uppercase letters)
	 */
	departure_airport_code?: string | null;
	/**
	 * Arrival Airport Code
	 * Arrival airport IATA code (3 uppercase letters)
	 */
	arrival_airport_code?: string | null;
	/** Departure Location */
	departure_location?:
		| LocationInSchema
		| LocationRefSchema
		| LocationOutSchema
		| null;
	/** Arrival Location */
	arrival_location?:
		| LocationInSchema
		| LocationRefSchema
		| LocationOutSchema
		| null;
	/**
	 * Departure Date
	 * Scheduled departure date (YYYY-MM-DD)
	 */
	departure_date?: string | null;
	/**
	 * Arrival Date
	 * Scheduled arrival date (YYYY-MM-DD)
	 */
	arrival_date?: string | null;
	departure_time?: TimeSchema | null;
	arrival_time?: TimeSchema | null;
	/**
	 * Departure Terminal
	 * Departure terminal (e.g., '1', 'T2', 'A')
	 */
	departure_terminal?: string | null;
	/**
	 * Departure Gate
	 * Departure gate (e.g., 'A12', 'B3')
	 */
	departure_gate?: string | null;
	/**
	 * Amenities
	 * List of amenities available on this flight.
	 */
	amenities?: AmenitiesTypes[] | null;
}

/** FlightHopPubSchema */
export interface FlightHopPubSchemaInput {
	/**
	 * Airline Code
	 * @minLength 2
	 * @maxLength 3
	 * @pattern ^[A-Z0-9]{2,3}$
	 */
	airline_code: string;
	/**
	 * Flight Number
	 * @min 1
	 * @max 9999
	 */
	flight_number: number;
	/**
	 * Departure Airport Code
	 * @minLength 3
	 * @maxLength 3
	 * @pattern ^[A-Z]{3}$
	 */
	departure_airport_code: string;
	/**
	 * Arrival Airport Code
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
	 * @format date
	 */
	departure_date: string;
	/**
	 * Arrival Date
	 * @format date
	 */
	arrival_date: string;
	departure_time: TimeSchema;
	arrival_time: TimeSchema;
	/**
	 * Departure Terminal
	 * @minLength 1
	 * @maxLength 5
	 */
	departure_terminal: string;
	/**
	 * Departure Gate
	 * @minLength 1
	 * @maxLength 5
	 */
	departure_gate: string;
	/** Amenities */
	amenities?: AmenitiesTypes[];
}

/** FlightHopPubSchema */
export interface FlightHopPubSchemaOutput {
	/**
	 * Airline Code
	 * @minLength 2
	 * @maxLength 3
	 * @pattern ^[A-Z0-9]{2,3}$
	 */
	airline_code: string;
	/**
	 * Flight Number
	 * @min 1
	 * @max 9999
	 */
	flight_number: number;
	/**
	 * Departure Airport Code
	 * @minLength 3
	 * @maxLength 3
	 * @pattern ^[A-Z]{3}$
	 */
	departure_airport_code: string;
	/**
	 * Arrival Airport Code
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
	 * @format date
	 */
	departure_date: string;
	/**
	 * Arrival Date
	 * @format date
	 */
	arrival_date: string;
	departure_time: TimeSchema;
	arrival_time: TimeSchema;
	/**
	 * Departure Terminal
	 * @minLength 1
	 * @maxLength 5
	 */
	departure_terminal: string;
	/**
	 * Departure Gate
	 * @minLength 1
	 * @maxLength 5
	 */
	departure_gate: string;
	/** Amenities */
	amenities?: AmenitiesTypes[];
}

/** FullScheduleSchema */
export interface FullScheduleSchema {
	schedule: TourScheduleModel;
	/** Fixed Dates */
	fixed_dates: FixedDateModel[];
	/** Recurrence Rules */
	recurrence_rules: RecurrenceDateModel[];
}

/** FxRateCreateSchema */
export interface FxRateCreateSchema {
	from_currency: Currency;
	to_currency: Currency;
	/** Rate */
	rate: number | string;
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

/** HousingDetailsPubSchema */
export interface HousingDetailsPubSchemaInput {
	/** Location */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
	/** Amenities */
	amenities: AmenitiesTypes[];
	/** Duration */
	duration: number;
	check_in: TimeSchema;
	check_out: TimeSchema;
}

/** HousingDetailsPubSchema */
export interface HousingDetailsPubSchemaOutput {
	/** Location */
	location: LocationInSchema | LocationRefSchema | LocationOutSchema;
	/** Amenities */
	amenities: AmenitiesTypes[];
	/** Duration */
	duration: number;
	check_in: TimeSchema;
	check_out: TimeSchema;
}

/** HousingDetailsSchema */
export interface HousingDetailsSchemaInput {
	/**
	 * Location
	 * Housing location
	 */
	location?: LocationInSchema | LocationRefSchema | LocationOutSchema | null;
	/** Amenities */
	amenities?: AmenitiesTypes[] | null;
	/**
	 * Duration
	 * Length of stay
	 */
	duration?: number | null;
	check_in?: TimeSchema | null;
	check_out?: TimeSchema | null;
	/**
	 * Expenses
	 * Expenses strategy for this event
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseInput)
				| ({
						typ: "per_room";
				  } & PerRoomExpensesInput)
				| ({
						typ: "per_room_category";
				  } & PerRoomCategoryExpensesInput)
		  )
		| null;
}

/** HousingDetailsSchema */
export interface HousingDetailsSchemaOutput {
	/**
	 * Location
	 * Housing location
	 */
	location?: LocationInSchema | LocationRefSchema | LocationOutSchema | null;
	/** Amenities */
	amenities?: AmenitiesTypes[] | null;
	/**
	 * Duration
	 * Length of stay
	 */
	duration?: number | null;
	check_in?: TimeSchema | null;
	check_out?: TimeSchema | null;
	/**
	 * Expenses
	 * Expenses strategy for this event
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseOutput)
				| ({
						typ: "per_room";
				  } & PerRoomExpensesOutput)
				| ({
						typ: "per_room_category";
				  } & PerRoomCategoryExpensesOutput)
		  )
		| null;
}

/** HousingEventPubRead */
export interface HousingEventPubReadInput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "5"
	 */
	typ?: "5";
	details: HousingDetailsPubSchemaInput;
}

/** HousingEventPubRead */
export interface HousingEventPubReadOutput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "5"
	 */
	typ?: "5";
	details: HousingDetailsPubSchemaOutput;
}

/** HousingEventSchema */
export interface HousingEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: HousingDetailsSchemaInput | null;
}

/** HousingEventSchema */
export interface HousingEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: HousingDetailsSchemaOutput | null;
}

/** HousingEventUpdate */
export interface HousingEventUpdate {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "5"
	 */
	typ?: "5";
	details?: HousingDetailsSchemaInput | null;
}

/** HousingRoomCategoryExpensesSchema */
export interface HousingRoomCategoryExpensesSchemaInput {
	typ?: HousingRoomTypes | null;
	/** Pax */
	pax?: number | null;
	/**
	 * Description
	 * Room description
	 */
	description?: string | null;
	/** Categories */
	categories?: HousingRoomCategorySchemaInput[] | null;
}

/** HousingRoomCategoryExpensesSchema */
export interface HousingRoomCategoryExpensesSchemaOutput {
	typ?: HousingRoomTypes | null;
	/** Pax */
	pax?: number | null;
	/**
	 * Description
	 * Room description
	 */
	description?: string | null;
	/** Categories */
	categories?: HousingRoomCategorySchemaOutput[] | null;
}

/** HousingRoomCategorySchema */
export interface HousingRoomCategorySchemaInput {
	/**
	 * Name
	 * Room category, i.e. single, double e.t.c.
	 */
	name?: string | null;
	/** Expenses for this car of this category. */
	expenses?: FixedExpenseInput | null;
	fees?: FixedExpenseInput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** HousingRoomCategorySchema */
export interface HousingRoomCategorySchemaOutput {
	/**
	 * Name
	 * Room category, i.e. single, double e.t.c.
	 */
	name?: string | null;
	/** Expenses for this car of this category. */
	expenses?: FixedExpenseOutput | null;
	fees?: FixedExpenseOutput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** HousingRoomExpensesSchema */
export interface HousingRoomExpensesSchemaInput {
	typ?: HousingRoomTypes | null;
	/** Pax */
	pax?: number | null;
	/**
	 * Description
	 * Room description
	 */
	description?: string | null;
	expenses?: FixedExpenseInput | null;
	fees?: FixedExpenseInput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** HousingRoomExpensesSchema */
export interface HousingRoomExpensesSchemaOutput {
	typ?: HousingRoomTypes | null;
	/** Pax */
	pax?: number | null;
	/**
	 * Description
	 * Room description
	 */
	description?: string | null;
	expenses?: FixedExpenseOutput | null;
	fees?: FixedExpenseOutput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** InformationEventPubRead */
export interface InformationEventPubRead {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "7"
	 */
	typ?: "7";
	/** @default {} */
	details?: EmptyDetailsPub;
}

/** InformationEventSchema */
export interface InformationEventSchema {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: EmptyDetails | null;
}

/** InformationEventUpdate */
export interface InformationEventUpdate {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "7"
	 */
	typ?: "7";
	details?: EmptyDetails | null;
}

/** InvoiceDetailResponse */
export interface InvoiceDetailResponse {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Invoice Number */
	invoice_number: string;
	/** Booking Id */
	booking_id: string | null;
	/** Order Number */
	order_number: string | null;
	typ: InvoiceType;
	status: InvoiceStatus;
	/**
	 * Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	amount: string;
	/** Currency */
	currency: string;
	/**
	 * Total
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	total: string;
	/**
	 * Paid Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	paid_amount: string;
	/**
	 * Balance
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	balance: string;
	/** Issued At */
	issued_at: string | null;
}

/** InvoiceGenerate */
export interface InvoiceGenerate {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
}

/** InvoiceListItem */
export interface InvoiceListItem {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Booking Id */
	booking_id: string | null;
	status: InvoiceStatus;
	/** Total Amount */
	total_amount: number;
	/** Paid Amount */
	paid_amount: number;
	/** Currency */
	currency: string;
	/** Issue Date */
	issue_date: string | null;
	/** Invoice Number */
	invoice_number: string;
	/** Order Number */
	order_number: string | null;
}

/** InvoiceListResponse */
export interface InvoiceListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: InvoiceListItem[];
}

/** InvoicePaymentCreate */
export interface InvoicePaymentCreate {
	/** Amount */
	amount: number | string;
	/** @default "wire" */
	method?: PaymentMethod;
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

/** LandingPageImagePubSchema */
export interface LandingPageImagePubSchema {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Url */
	image_url: string;
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
	/** Title */
	title: string | null;
	/** Overview */
	overview: string | null;
	/** Description */
	description: string | null;
	/** Overview Description */
	overview_description: string | null;
	/** Pickup Description */
	pickup_description: string | null;
	/** Additional Information */
	additional_information: string | null;
	/** Cancellation Policy */
	cancellation_policy: string | null;
	/** Languages */
	languages: Language[];
	/** Pickup Type */
	pickup_type: PickupType[];
	/** Amenities Included */
	amenities_included: string[];
	/** Amenities Not Included */
	amenities_not_included: string[];
}

/** LandingPagePubSchema */
export interface LandingPagePubSchema {
	/** Title */
	title: string | null;
	/** Overview */
	overview: string | null;
	/** Description */
	description: string | null;
	/** Overview Description */
	overview_description: string | null;
	/** Pickup Description */
	pickup_description: string | null;
	/** Additional Information */
	additional_information: string | null;
	/** Cancellation Policy */
	cancellation_policy: string | null;
	/** Languages */
	languages: Language[];
	/** Pickup Type */
	pickup_type: PickupType[];
	/** Amenities Included */
	amenities_included: string[];
	/** Amenities Not Included */
	amenities_not_included: string[];
	/** Images */
	images: LandingPageImagePubSchema[];
}

/** LandingPageUpdate */
export interface LandingPageUpdate {
	/** Title */
	title?: string | null;
	/** Overview */
	overview?: string | null;
	/** Description */
	description?: string | null;
	/** Overview Description */
	overview_description?: string | null;
	/** Pickup Description */
	pickup_description?: string | null;
	/** Cancellation Policy */
	cancellation_policy?: string | null;
	/** Additional Information */
	additional_information?: string | null;
	/** Languages */
	languages?: Language[] | null;
	/** Pickup Type */
	pickup_type?: PickupType[] | null;
	/** Amenities Included */
	amenities_included?: string[] | null;
	/** Amenities Not Included */
	amenities_not_included?: string[] | null;
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

/**
 * MonetaryValueSchema
 * Monetary value pair.
 *
 * Conversion happens inside the schema but takes an explicit ``FxContext``
 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
 * ``return self``; cross-currency requires a matching entry in
 * ``fx.rates`` and applies ``val * rate``.
 *
 * Arithmetic operators stay same-currency-only on purpose: event calc
 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
 * so same-currency is always satisfied and the guards catch anything that
 * slips through.
 */
export interface MonetaryValueSchema {
	/**
	 * Val
	 * The total monetary value.
	 * @min 0
	 */
	val: number;
	/** @default "USD" */
	currency?: Currency;
}

/** MultipleOptionEvent */
export interface MultipleOptionEventInput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?:
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
		  )[]
		| null;
}

/** MultipleOptionEvent */
export interface MultipleOptionEventOutput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?:
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
		  )[]
		| null;
}

/** MultipleOptionEventPub */
export interface MultipleOptionEventPubInput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/** Typ */
	typ: "8";
	/**
	 * Details
	 * @minItems 1
	 */
	details: (
		| ({
				typ: "1";
		  } & FlightEventPubReadInput)
		| ({
				typ: "2";
		  } & TrainEventPubReadInput)
		| ({
				typ: "3";
		  } & BusEventPubReadInput)
		| ({
				typ: "4";
		  } & TransferEventPubReadInput)
		| ({
				typ: "5";
		  } & HousingEventPubReadInput)
		| ({
				typ: "6";
		  } & ActivityEventPubReadInput)
		| ({
				typ: "7";
		  } & InformationEventPubRead)
	)[];
}

/** MultipleOptionEventPub */
export interface MultipleOptionEventPubOutput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/** Typ */
	typ: "8";
	/**
	 * Details
	 * @minItems 1
	 */
	details: (
		| ({
				typ: "1";
		  } & FlightEventPubReadOutput)
		| ({
				typ: "2";
		  } & TrainEventPubReadOutput)
		| ({
				typ: "3";
		  } & BusEventPubReadOutput)
		| ({
				typ: "4";
		  } & TransferEventPubReadOutput)
		| ({
				typ: "5";
		  } & HousingEventPubReadOutput)
		| ({
				typ: "6";
		  } & ActivityEventPubReadOutput)
		| ({
				typ: "7";
		  } & InformationEventPubRead)
	)[];
}

/** MultipleOptionEventUpdate */
export interface MultipleOptionEventUpdate {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
	/** Typ */
	typ: "8";
	/** Details */
	details?:
		| (
				| ({
						typ: "1";
				  } & FlightEventUpdate)
				| ({
						typ: "2";
				  } & TrainEventUpdate)
				| ({
						typ: "3";
				  } & BusEventUpdate)
				| ({
						typ: "4";
				  } & TransferEventUpdate)
				| ({
						typ: "5";
				  } & HousingEventUpdate)
				| ({
						typ: "6";
				  } & ActivityEventUpdate)
				| ({
						typ: "7";
				  } & InformationEventUpdate)
		  )[]
		| null;
}

/** MyAccountRead */
export interface MyAccountRead {
	/** Email */
	email: string;
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
	/** Profile Picture Path */
	profile_picture_path: string | null;
	default_currency: Currency;
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

/** OperatorFinancialSettingsRead */
export interface OperatorFinancialSettingsRead {
	default_currency: Currency;
	/** Vat Enabled */
	vat_enabled: boolean;
	/**
	 * Vat Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	vat_rate: string;
	/** Profit Tax Enabled */
	profit_tax_enabled: boolean;
	/**
	 * Profit Tax Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	profit_tax_rate: string;
	/**
	 * Default Markup
	 * The markup calculation strategy.
	 */
	default_markup:
		| ({
				typ: "fixed";
		  } & FixedExpenseOutput)
		| ({
				typ: "percentage";
		  } & PercentageMarkup);
	/**
	 * Default Staff Commission
	 * The markup calculation strategy.
	 */
	default_staff_commission:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** OperatorFinancialSettingsUpdate */
export interface OperatorFinancialSettingsUpdate {
	default_currency?: Currency | null;
	/** Vat Enabled */
	vat_enabled?: boolean | null;
	/** Vat Rate */
	vat_rate?: number | string | null;
	/** Profit Tax Enabled */
	profit_tax_enabled?: boolean | null;
	/** Profit Tax Rate */
	profit_tax_rate?: number | string | null;
	/**
	 * Default Markup
	 * The markup calculation strategy.
	 */
	default_markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
	/**
	 * Default Staff Commission
	 * The markup calculation strategy.
	 */
	default_staff_commission?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/**
 * OperatorFxRateModel
 * Append-only FX rate ledger per operator.
 *
 * See ``src/operator/fx_rate/__init__.py`` for the append-only convention.
 * The column type for ``from_currency`` / ``to_currency`` stays ``String(3)``;
 * only the Python ``Mapped[...]`` annotation is the ``Currency`` StrEnum.
 */
export interface OperatorFxRateModel {
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
	from_currency: Currency;
	to_currency: Currency;
	/**
	 * Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	rate: string;
	/**
	 * Valid From
	 * @format date-time
	 */
	valid_from: string;
	/** Created By */
	created_by: string | null;
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
	/** Logo Path */
	logo_path: string | null;
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

/** OperatorPaymentRouteModel */
export interface OperatorPaymentRouteModel {
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
	/** Internal Label */
	internal_label: string;
	currency: Currency;
	/** Note */
	note: string | null;
	/** Details */
	details:
		| ({
				typ: "classic_swift";
		  } & ClassicSwiftDetails)
		| ({
				typ: "wise";
		  } & WiseDetails);
}

/** OperatorPreviewPubSchema */
export interface OperatorPreviewPubSchema {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Business Name */
	business_name: string | null;
	/** Description */
	description: string | null;
	/** Website Url */
	website_url: string | null;
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
	/** Logo Url */
	logo_url: string | null;
}

/** PackageCreate */
export interface PackageCreate {
	/** Name */
	name: string;
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
	fees?: FixedExpenseInput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
	/** Supplier Id */
	supplier_id?: string | null;
}

/** PackageUpdate */
export interface PackageUpdate {
	/** Name */
	name?: string | null;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseInput)
		  )
		| null;
	fees?: FixedExpenseInput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
	/** Supplier Id */
	supplier_id?: string | null;
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

/** PaxCreate */
export interface PaxCreate {
	/**
	 * Full Name
	 * @maxLength 255
	 */
	full_name: string;
	gender: Gender;
	/** Nationality */
	nationality: string;
	/**
	 * Date Of Birth
	 * @format date
	 */
	date_of_birth: string;
	/**
	 * Passport Number
	 * @maxLength 50
	 */
	passport_number: string;
	/**
	 * Expired Date
	 * @format date
	 */
	expired_date: string;
	/** Comment */
	comment?: string | null;
}

/** PaxUpdate */
export interface PaxUpdate {
	/** Full Name */
	full_name?: string | null;
	gender?: Gender | null;
	/** Nationality */
	nationality?: string | null;
	/** Date Of Birth */
	date_of_birth?: string | null;
	/** Passport Number */
	passport_number?: string | null;
	/** Expired Date */
	expired_date?: string | null;
	/** Comment */
	comment?: string | null;
}

/** PaymentRouteCreate */
export interface PaymentRouteCreate {
	/**
	 * Internal Label
	 * @maxLength 255
	 */
	internal_label: string;
	currency: Currency;
	/** Note */
	note?: string | null;
	/** Details */
	details:
		| ({
				typ: "classic_swift";
		  } & ClassicSwiftDetails)
		| ({
				typ: "wise";
		  } & WiseDetails);
}

/** PaymentRouteUpdate */
export interface PaymentRouteUpdate {
	/** Internal Label */
	internal_label?: string | null;
	currency?: Currency | null;
	/** Note */
	note?: string | null;
	/** Details */
	details?:
		| (
				| ({
						typ: "classic_swift";
				  } & ClassicSwiftDetails)
				| ({
						typ: "wise";
				  } & WiseDetails)
		  )
		| null;
}

/** PerCarCategoryExpense */
export interface PerCarCategoryExpenseInput {
	/** Typ */
	typ: "per_car_category";
	/**
	 * Cars
	 * All types of cars and their categories
	 */
	cars?: TransferCarCategoriesVariantInput[] | null;
}

/** PerCarCategoryExpense */
export interface PerCarCategoryExpenseOutput {
	/** Typ */
	typ: "per_car_category";
	/**
	 * Cars
	 * All types of cars and their categories
	 */
	cars?: TransferCarCategoriesVariantOutput[] | null;
}

/** PerCarExpense */
export interface PerCarExpenseInput {
	/** Typ */
	typ: "per_car";
	/**
	 * Cars
	 * All types of cars and their categories
	 */
	cars?: TransferCarVariantInput[] | null;
}

/** PerCarExpense */
export interface PerCarExpenseOutput {
	/** Typ */
	typ: "per_car";
	/**
	 * Cars
	 * All types of cars and their categories
	 */
	cars?: TransferCarVariantOutput[] | null;
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
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
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
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
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
	rooms?: HousingRoomCategoryExpensesSchemaInput[] | null;
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
	rooms?: HousingRoomCategoryExpensesSchemaOutput[] | null;
}

/**
 * PerRoomExpenses
 * Represents a expenses associated with a room
 */
export interface PerRoomExpensesInput {
	/** Typ */
	typ: "per_room";
	/**
	 * Rooms
	 * All rooms
	 */
	rooms?: HousingRoomExpensesSchemaInput[] | null;
}

/**
 * PerRoomExpenses
 * Represents a expenses associated with a room
 */
export interface PerRoomExpensesOutput {
	/** Typ */
	typ: "per_room";
	/**
	 * Rooms
	 * All rooms
	 */
	rooms?: HousingRoomExpensesSchemaOutput[] | null;
}

/**
 * PercentageMarkup
 * Adds a percentage on top of a base cost.
 */
export interface PercentageMarkup {
	/** Typ */
	typ: "percentage";
	/**
	 * Percentage
	 * e.g., 0.15 for 15%
	 * @exclusiveMin 0
	 * @exclusiveMax 1
	 */
	percentage: number;
}

/** PriceRangeSchema */
export interface PriceRangeSchema {
	/** Min */
	min: number | null;
	/** Max */
	max: number | null;
	currency: Currency | null;
}

/** PublicTourCatalogSchema */
export interface PublicTourCatalogSchemaInput {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tour_id: string;
	/** Name */
	name: string;
	/** Cover Image Url */
	cover_image_url: string | null;
	/** Description */
	description: string | null;
	/** Days */
	days: number;
	/** Nights */
	nights: number;
	/** Duration Hours */
	duration_hours: number | null;
	/** Age From */
	age_from: number | null;
	/** Age To */
	age_to: number | null;
	/** Categories */
	categories: TourCategory[];
	tour_type: TourType;
	/** Landing Photos */
	landing_photos: string[];
	/** Cities */
	cities: string[];
	/** Languages */
	languages: Language[];
	price_range: PriceRangeSchema | null;
	/** Option Count */
	option_count?: number | null;
}

/** PublicTourCatalogSchema */
export interface PublicTourCatalogSchemaOutput {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tour_id: string;
	/** Name */
	name: string;
	/** Cover Image Url */
	cover_image_url: string | null;
	/** Description */
	description: string | null;
	/** Days */
	days: number;
	/** Nights */
	nights: number;
	/** Duration Hours */
	duration_hours: number | null;
	/** Age From */
	age_from: number | null;
	/** Age To */
	age_to: number | null;
	/** Categories */
	categories: TourCategory[];
	tour_type: TourType;
	/** Landing Photos */
	landing_photos: string[];
	/** Cities */
	cities: string[];
	/** Languages */
	languages: Language[];
	price_range: PriceRangeSchema | null;
	/** Option Count */
	option_count?: number | null;
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
	 * @maxLength 255
	 */
	email: string;
	/**
	 * First Name
	 * @maxLength 255
	 */
	first_name: string;
	/**
	 * Last Name
	 * @maxLength 255
	 */
	last_name: string;
	/** Role */
	role: StaffInviteRoleEnum;
}

/** StaffInviteResult */
export interface StaffInviteResult {
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
	role: StaffInviteResultRoleEnum;
	status: StaffStatus;
	/** Commission Percent */
	commission_percent: number | null;
	/** Generated Password */
	generated_password: string;
}

/** StaffListResponse */
export interface StaffListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: StaffRead[];
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
	status: StaffStatus;
	/** Commission Percent */
	commission_percent: number | null;
}

/** StaffUpdate */
export interface StaffUpdate {
	/** First Name */
	first_name?: string | null;
	/** Last Name */
	last_name?: string | null;
	/** Role */
	role?: StaffUpdateRoleEnum | null;
	/** Status */
	status?: StaffUpdateStatusEnum | null;
	/** Commission Percent */
	commission_percent?: number | null;
}

/** SupplierCreateSchema */
export interface SupplierCreateSchema {
	/**
	 * Brand Name
	 * @maxLength 255
	 */
	brand_name: string;
	/** Legal Name */
	legal_name?: string | null;
	/** Phone */
	phone?: string | null;
	/** Website */
	website?: string | null;
	supplier_type: SupplierType;
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
	/** Brand Name */
	brand_name: string;
	/** Legal Name */
	legal_name: string | null;
	/** Phone */
	phone: string | null;
	/** Website */
	website: string | null;
	/** Logo Path */
	logo_path: string | null;
	supplier_type: SupplierType;
	/** Deleted At */
	deleted_at: string | null;
}

/**
 * SupplierPaymentResponse
 * Adds ``base_amount`` — the real cost converted into the operator's base
 * currency at the pinned rate (``amount * rate``). This is what feeds the
 * tour's real-cost / profit-loss accounting.
 */
export interface SupplierPaymentResponse {
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
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Supplier Id */
	supplier_id: string | null;
	/**
	 * Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	amount: string;
	currency: Currency;
	/**
	 * Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	rate: string;
	/**
	 * Base Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	base_amount: string;
	/** File */
	file: string | null;
	/** Note */
	note: string | null;
	status: SupplierPaymentStatus;
	/** Paid At */
	paid_at: string | null;
}

/**
 * SupplierPaymentUpdate
 * Operator edits a seeded payment row: real cost, supplier, status, note.
 *
 * ``rate`` is never set by hand — when ``currency`` differs from the operator's
 * base currency the service pins the operator's annual FX rate. Status may only
 * become PAID once a confirmation ``file`` is attached (enforced in service).
 */
export interface SupplierPaymentUpdate {
	/** Supplier Id */
	supplier_id?: string | null;
	/** Amount */
	amount?: number | string | null;
	currency?: Currency | null;
	/** Note */
	note?: string | null;
	status?: SupplierPaymentStatus | null;
}

/** SupplierUpdateSchema */
export interface SupplierUpdateSchema {
	/** Brand Name */
	brand_name?: string | null;
	/** Legal Name */
	legal_name?: string | null;
	/** Phone */
	phone?: string | null;
	/** Website */
	website?: string | null;
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
	/** Image Paths */
	image_paths?: string[];
	/** Primary Image Path */
	primary_image_path?: string | null;
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
	currency_type: Currency;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
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
	/**
	 * Days
	 * @min 1
	 * @default 1
	 */
	days?: number;
	/**
	 * Nights
	 * @min 0
	 * @default 0
	 */
	nights?: number;
	/** Duration Hours */
	duration_hours?: number | null;
	/** Age From */
	age_from?: number | null;
	/** Age To */
	age_to?: number | null;
	/**
	 * Group Size
	 * @min 1
	 * @default 1
	 */
	group_size?: number;
	/** @default "regular" */
	typ?: TourType;
	/** Agency Id */
	agency_id?: string | null;
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
	/** Agency Id */
	agency_id: string | null;
	/** Landing Id */
	landing_id: string | null;
	/** Name */
	name: string;
	/** Cover Image Path */
	cover_image_path: string | null;
	/** Group Size */
	group_size: number;
	/** Days */
	days: number;
	/** Nights */
	nights: number;
	/** Duration Hours */
	duration_hours: number | null;
	/** Age From */
	age_from: number | null;
	/** Age To */
	age_to: number | null;
	typ: TourType;
	status: TourStatus;
	/** Categories */
	categories: TourCategory[];
}

/** TourMetaUpdateSchema */
export interface TourMetaUpdateSchema {
	/** Name */
	name?: string | null;
	typ?: TourType | null;
	/** Agency Id */
	agency_id?: string | null;
	/** Days */
	days?: number | null;
	/** Nights */
	nights?: number | null;
	/** Duration Hours */
	duration_hours?: number | null;
	/** Age From */
	age_from?: number | null;
	/** Age To */
	age_to?: number | null;
	/** Group Size */
	group_size?: number | null;
	/** Categories */
	categories?: TourCategory[] | null;
}

/** TourMinMaxCostSchema */
export interface TourMinMaxCostSchemaInput {
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	min: MonetaryValueSchema;
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	max: MonetaryValueSchema;
}

/** TourMinMaxCostSchema */
export interface TourMinMaxCostSchemaOutput {
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	min: MonetaryValueSchema;
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	max: MonetaryValueSchema;
}

/** TourOptionCreateSchema */
export interface TourOptionCreateSchema {
	/** Name */
	name?: string | null;
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
	/** Name */
	name: string | null;
	/** Deleted At */
	deleted_at: string | null;
}

/** TourOptionPreviewSchema */
export interface TourOptionPreviewSchemaInput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	total_price: MonetaryValueSchema;
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	total_price_max: MonetaryValueSchema;
}

/** TourOptionPreviewSchema */
export interface TourOptionPreviewSchemaOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	total_price: MonetaryValueSchema;
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	total_price_max: MonetaryValueSchema;
}

/** TourOptionPublicResponse */
export interface TourOptionPublicResponse {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Events */
	events: (
		| (
				| ({
						typ: "1";
				  } & FlightEventPubReadOutput)
				| ({
						typ: "2";
				  } & TrainEventPubReadOutput)
				| ({
						typ: "3";
				  } & BusEventPubReadOutput)
				| ({
						typ: "4";
				  } & TransferEventPubReadOutput)
				| ({
						typ: "5";
				  } & HousingEventPubReadOutput)
				| ({
						typ: "6";
				  } & ActivityEventPubReadOutput)
				| ({
						typ: "7";
				  } & InformationEventPubRead)
		  )
		| MultipleOptionEventPubOutput
	)[];
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	total_price: MonetaryValueSchema;
	/**
	 * Monetary value pair.
	 *
	 * Conversion happens inside the schema but takes an explicit ``FxContext``
	 * — no module-level rate singleton. Same-currency ``convert`` is a cheap
	 * ``return self``; cross-currency requires a matching entry in
	 * ``fx.rates`` and applies ``val * rate``.
	 *
	 * Arithmetic operators stay same-currency-only on purpose: event calc
	 * normalizes every leaf to ``fx.target`` via ``convert`` before summing,
	 * so same-currency is always satisfied and the guards catch anything that
	 * slips through.
	 */
	total_price_max: MonetaryValueSchema;
}

/** TourOptionUpdateSchema */
export interface TourOptionUpdateSchema {
	/** Name */
	name?: string | null;
}

/** TourPackageModel */
export interface TourPackageModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
	/** Supplier Id */
	supplier_id: string | null;
	/** Name */
	name: string;
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
	fees: FixedExpenseOutput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
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
	cost: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
	profit_tax: TourMinMaxCostSchemaOutput;
	vat: TourMinMaxCostSchemaOutput;
	fees: TourMinMaxCostSchemaOutput;
	total: TourMinMaxCostSchemaOutput;
}

/** TrainDetailPubSchema */
export interface TrainDetailPubSchemaInput {
	/** Hop */
	hop: TrainHopPubSchemaInput[];
}

/** TrainDetailPubSchema */
export interface TrainDetailPubSchemaOutput {
	/** Hop */
	hop: TrainHopPubSchemaOutput[];
}

/** TrainDetailSchema */
export interface TrainDetailSchemaInput {
	/** Hop */
	hop?: TrainHopSchemaInput[] | null;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseInput)
		  )
		| null;
	fees?: FixedExpenseInput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** TrainDetailSchema */
export interface TrainDetailSchemaOutput {
	/** Hop */
	hop?: TrainHopSchemaOutput[] | null;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseOutput)
		  )
		| null;
	fees?: FixedExpenseOutput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** TrainEventPubRead */
export interface TrainEventPubReadInput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "2"
	 */
	typ?: "2";
	details: TrainDetailPubSchemaInput;
}

/** TrainEventPubRead */
export interface TrainEventPubReadOutput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "2"
	 */
	typ?: "2";
	details: TrainDetailPubSchemaOutput;
}

/** TrainEventSchema */
export interface TrainEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: TrainDetailSchemaInput | null;
}

/** TrainEventSchema */
export interface TrainEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: TrainDetailSchemaOutput | null;
}

/** TrainEventUpdate */
export interface TrainEventUpdate {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "2"
	 */
	typ?: "2";
	details?: TrainDetailSchemaInput | null;
}

/** TrainHopPubSchema */
export interface TrainHopPubSchemaInput {
	/** Represents either a departure or arrival point for the train journey. */
	departure: TrainJourneyPointSchemaInput;
	/** Represents either a departure or arrival point for the train journey. */
	arrival: TrainJourneyPointSchemaInput;
}

/** TrainHopPubSchema */
export interface TrainHopPubSchemaOutput {
	/** Represents either a departure or arrival point for the train journey. */
	departure: TrainJourneyPointSchemaOutput;
	/** Represents either a departure or arrival point for the train journey. */
	arrival: TrainJourneyPointSchemaOutput;
}

/**
 * TrainHopSchema
 * Represents a single leg of a train journey.
 */
export interface TrainHopSchemaInput {
	/** Details of the departure. */
	departure?: TrainJourneyPointSchemaInput | null;
	/** Details of the arrival. */
	arrival?: TrainJourneyPointSchemaInput | null;
}

/**
 * TrainHopSchema
 * Represents a single leg of a train journey.
 */
export interface TrainHopSchemaOutput {
	/** Details of the departure. */
	departure?: TrainJourneyPointSchemaOutput | null;
	/** Details of the arrival. */
	arrival?: TrainJourneyPointSchemaOutput | null;
}

/**
 * TrainJourneyPointSchema
 * Represents either a departure or arrival point for the train journey.
 */
export interface TrainJourneyPointSchemaInput {
	/**
	 * Date
	 * The date of departure or arrival.
	 */
	date?: string | null;
	/** The time of an event */
	time?: TimeSchema | null;
	/** Location */
	location?: LocationInSchema | LocationRefSchema | LocationOutSchema | null;
}

/**
 * TrainJourneyPointSchema
 * Represents either a departure or arrival point for the train journey.
 */
export interface TrainJourneyPointSchemaOutput {
	/**
	 * Date
	 * The date of departure or arrival.
	 */
	date?: string | null;
	/** The time of an event */
	time?: TimeSchema | null;
	/** Location */
	location?: LocationInSchema | LocationRefSchema | LocationOutSchema | null;
}

/** TransferCarCategoriesVariant */
export interface TransferCarCategoriesVariantInput {
	typ?: VehicleBodyType | null;
	/** Pax */
	pax?: number | null;
	/**
	 * Description
	 * Car description
	 */
	description?: string | null;
	/** Categories */
	categories?: TransferCarPackageCategorySchemaInput[] | null;
}

/** TransferCarCategoriesVariant */
export interface TransferCarCategoriesVariantOutput {
	typ?: VehicleBodyType | null;
	/** Pax */
	pax?: number | null;
	/**
	 * Description
	 * Car description
	 */
	description?: string | null;
	/** Categories */
	categories?: TransferCarPackageCategorySchemaOutput[] | null;
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
	name?: string | null;
	/** Expenses for this car of this category. */
	expenses?: FixedExpenseInput | null;
	fees?: FixedExpenseInput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
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
	name?: string | null;
	/** Expenses for this car of this category. */
	expenses?: FixedExpenseOutput | null;
	fees?: FixedExpenseOutput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** TransferCarVariant */
export interface TransferCarVariantInput {
	typ?: VehicleBodyType | null;
	/** Pax */
	pax?: number | null;
	/**
	 * Description
	 * Car description
	 */
	description?: string | null;
	expenses?: FixedExpenseInput | null;
	fees?: FixedExpenseInput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** TransferCarVariant */
export interface TransferCarVariantOutput {
	typ?: VehicleBodyType | null;
	/** Pax */
	pax?: number | null;
	/**
	 * Description
	 * Car description
	 */
	description?: string | null;
	expenses?: FixedExpenseOutput | null;
	fees?: FixedExpenseOutput | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
}

/** TransferDetailsPubSchema */
export interface TransferDetailsPubSchemaInput {
	typ: TransferTypes;
	/** Represents either a departure or arrival point for the journey. */
	departure: TransferJourneyPointSchemaInput;
	/** Represents either a departure or arrival point for the journey. */
	arrival: TransferJourneyPointSchemaInput;
}

/** TransferDetailsPubSchema */
export interface TransferDetailsPubSchemaOutput {
	typ: TransferTypes;
	/** Represents either a departure or arrival point for the journey. */
	departure: TransferJourneyPointSchemaOutput;
	/** Represents either a departure or arrival point for the journey. */
	arrival: TransferJourneyPointSchemaOutput;
}

/**
 * TransferDetailsSchema
 * Represents a transfer journey with departure and arrival details.
 */
export interface TransferDetailsSchemaInput {
	typ?: TransferTypes | null;
	/** Details of the departure. */
	departure?: TransferJourneyPointSchemaInput | null;
	/** Details of the arrival. */
	arrival?: TransferJourneyPointSchemaInput | null;
	/** Expenses */
	expenses?:
		| (
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
				  } & PerPersonExpenseInput)
		  )
		| null;
}

/**
 * TransferDetailsSchema
 * Represents a transfer journey with departure and arrival details.
 */
export interface TransferDetailsSchemaOutput {
	typ?: TransferTypes | null;
	/** Details of the departure. */
	departure?: TransferJourneyPointSchemaOutput | null;
	/** Details of the arrival. */
	arrival?: TransferJourneyPointSchemaOutput | null;
	/** Expenses */
	expenses?:
		| (
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
				  } & PerPersonExpenseOutput)
		  )
		| null;
}

/** TransferEventPubRead */
export interface TransferEventPubReadInput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "4"
	 */
	typ?: "4";
	details: TransferDetailsPubSchemaInput;
}

/** TransferEventPubRead */
export interface TransferEventPubReadOutput {
	/** Name */
	name: string;
	/** Description */
	description: string;
	/** Day */
	day: number;
	/** Position */
	position: number;
	/**
	 * Typ
	 * @default "4"
	 */
	typ?: "4";
	details: TransferDetailsPubSchemaOutput;
}

/** TransferEventSchema */
export interface TransferEventSchemaInput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: TransferDetailsSchemaInput | null;
}

/** TransferEventSchema */
export interface TransferEventSchemaOutput {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
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
	details?: TransferDetailsSchemaOutput | null;
}

/** TransferEventUpdate */
export interface TransferEventUpdate {
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "4"
	 */
	typ?: "4";
	details?: TransferDetailsSchemaInput | null;
}

/**
 * TransferJourneyPointSchema
 * Represents either a departure or arrival point for the journey.
 */
export interface TransferJourneyPointSchemaInput {
	/**
	 * Date
	 * The date of departure or arrival.
	 */
	date?: string | null;
	/** The time of an event */
	time?: TimeSchema | null;
	/** Location */
	location?: LocationInSchema | LocationRefSchema | LocationOutSchema | null;
}

/**
 * TransferJourneyPointSchema
 * Represents either a departure or arrival point for the journey.
 */
export interface TransferJourneyPointSchemaOutput {
	/**
	 * Date
	 * The date of departure or arrival.
	 */
	date?: string | null;
	/** The time of an event */
	time?: TimeSchema | null;
	/** Location */
	location?: LocationInSchema | LocationRefSchema | LocationOutSchema | null;
}

/** UpdateFinancialSchema */
export interface UpdateFinancialSchema {
	currency_type?: Currency | null;
	/**
	 * Markup
	 * The markup calculation strategy.
	 */
	markup?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
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
	default_currency?: Currency | null;
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

/** WiseDetails */
export interface WiseDetails {
	/**
	 * Typ
	 * @default "wise"
	 */
	typ?: "wise";
	/**
	 * Account Id Email
	 * @maxLength 255
	 */
	account_id_email: string;
	/**
	 * Payment Link
	 * @format uri
	 * @minLength 1
	 * @maxLength 2083
	 */
	payment_link: string;
}

/** Role */
export enum StaffInviteRoleEnum {
	OperatorSalesManager = "operator_sales_manager",
	OperatorAccountant = "operator_accountant"
}

/** Role */
export enum StaffInviteResultRoleEnum {
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

export enum StaffUpdateStatusEnum {
	Active = "active",
	Inactive = "inactive"
}

export interface GetAllUsersAdminUserAllGetParams {
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
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
	 * Desc
	 * @default true
	 */
	desc?: boolean;
	/** Status */
	status?: TourStatus | null;
	/** Typ */
	typ?: TourType | null;
	/** Q */
	q?: string | null;
	/** @default "created_at" */
	sort_by?: TourListSortField;
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
}

export interface ListOneDayToursTourOneDayGetParams {
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
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

export interface PublishTourTourTourIdPublishPostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface ArchiveTourTourTourIdArchivePostParams {
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
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

/** Payload */
export type CreateTourOptionTourTourIdOptionCreatePostPayload =
	TourOptionCreateSchema | null;

export interface CreateTourOptionTourTourIdOptionCreatePostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface UpdateTourOptionTourTourIdOptionOptionIdPatchParams {
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
	/** @default "USD" */
	currency?: Currency;
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

export interface GetTourFinancialsTourTourIdFinanceGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface CreateTourFinancialsTourTourIdFinancePostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
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
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
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

/** Event */
export type UpdateTourEventTourTourIdOptionIdEventEventIdPatchPayload =
	| (
			| ({
					typ: "1";
			  } & FlightEventUpdate)
			| ({
					typ: "2";
			  } & TrainEventUpdate)
			| ({
					typ: "3";
			  } & BusEventUpdate)
			| ({
					typ: "4";
			  } & TransferEventUpdate)
			| ({
					typ: "5";
			  } & HousingEventUpdate)
			| ({
					typ: "6";
			  } & ActivityEventUpdate)
			| ({
					typ: "7";
			  } & InformationEventUpdate)
	  )
	| MultipleOptionEventUpdate;

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
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
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
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
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
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
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

export interface SetPrimaryLandingImageTourTourIdLandingImagesImageIdSetPrimaryPatchParams {
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

export interface ListPublicTourOptionsTourTourIdPublicOptionAllGetParams {
	/** @default "USD" */
	currency?: Currency;
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface GetPublicTourOptionTourTourIdPublicOptionOptionIdGetParams {
	/** @default "USD" */
	currency?: Currency;
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

export interface GetPublicLandingPageTourTourIdPublicLandingGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface GetPublicOperatorPreviewTourTourIdPublicOperatorGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface ListPublicCatalogTourCatalogPublicGetParams {
	/** Sort */
	sort?: TourCatalogSort | null;
	/** Q */
	q?: string | null;
	/** Categories */
	categories?: TourCategory[] | null;
	/** Duration Days Min */
	duration_days_min?: number | null;
	/** Duration Days Max */
	duration_days_max?: number | null;
	/** City */
	city?: string | null;
	/** Language */
	language?: Language | null;
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
}

export interface ListAgencyCatalogTourCatalogAgencyGetParams {
	/** Sort */
	sort?: TourCatalogSort | null;
	/** Q */
	q?: string | null;
	/** Categories */
	categories?: TourCategory[] | null;
	/** Duration Days Min */
	duration_days_min?: number | null;
	/** Duration Days Max */
	duration_days_max?: number | null;
	/** City */
	city?: string | null;
	/** Language */
	language?: Language | null;
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
}

export interface CreatePackageTourTourIdOptionIdPackagePostParams {
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

export interface ListPackagesTourTourIdOptionIdPackageGetParams {
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

export interface GetPackageTourTourIdOptionIdPackagePackageIdGetParams {
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
	/**
	 * Package Id
	 * @format uuid
	 */
	packageId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface UpdatePackageTourTourIdOptionIdPackagePackageIdPatchParams {
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
	/**
	 * Package Id
	 * @format uuid
	 */
	packageId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface DeletePackageTourTourIdOptionIdPackagePackageIdDeleteParams {
	/**
	 * Option Id
	 * @format uuid
	 */
	optionId: string;
	/**
	 * Package Id
	 * @format uuid
	 */
	packageId: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface ListFilesOperatorMeFilesGetParams {
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
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

export interface ListStaffOperatorStaffAllGetParams {
	/** Q */
	q?: string | null;
	/** Statuses */
	statuses?: StaffStatus[] | null;
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
}

export interface UpdateStaffMemberOperatorStaffUserIdPatchParams {
	/**
	 * User Id
	 * @format uuid
	 */
	userId: string;
}

export interface DeleteStaffMemberOperatorStaffUserIdDeleteParams {
	/**
	 * User Id
	 * @format uuid
	 */
	userId: string;
}

export interface ListFxRatesOperatorFxRateGetParams {
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
}

export interface GetFxRateOperatorFxRateFxRateIdGetParams {
	/**
	 * Fx Rate Id
	 * @format uuid
	 */
	fxRateId: string;
}

export interface ListSupplierPaymentsOperatorSupplierPaymentGetParams {
	/** Booking Id */
	booking_id?: string | null;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Event Id */
	event_id?: string | null;
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
}

export interface GetSupplierPaymentOperatorSupplierPaymentPaymentIdGetParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
}

export interface UpdateSupplierPaymentOperatorSupplierPaymentPaymentIdPatchParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
}

export interface UploadReceiptOperatorSupplierPaymentPaymentIdReceiptPostParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
}

export interface ListPaymentRoutesOperatorPaymentRoutesGetParams {
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
}

export interface GetPaymentRouteOperatorPaymentRoutesRouteIdGetParams {
	/**
	 * Route Id
	 * @format uuid
	 */
	routeId: string;
}

export interface UpdatePaymentRouteOperatorPaymentRoutesRouteIdPatchParams {
	/**
	 * Route Id
	 * @format uuid
	 */
	routeId: string;
}

export interface DeletePaymentRouteOperatorPaymentRoutesRouteIdDeleteParams {
	/**
	 * Route Id
	 * @format uuid
	 */
	routeId: string;
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
	/** Supplier Type */
	supplier_type?: SupplierType | null;
	/** Q */
	q?: string | null;
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

export interface ListAgencyDocumentsAgencyMeDocumentsGetParams {
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
}

export interface GetAgencyDocumentUrlAgencyMeDocumentsFileIdGetParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface RemoveAgencyDocumentAgencyMeDocumentsFileIdDeleteParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface ListMyBookingsBookingOrderMyGetParams {
	/** Booking Status */
	booking_status?: BookingStatus | null;
	/** Tour Id */
	tour_id?: string | null;
	/** Q */
	q?: string | null;
	/** Date From */
	date_from?: string | null;
	/** Date To */
	date_to?: string | null;
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
}

export interface GetBookingOrderBookingOrderBookingIdGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface UpdateBookingOrderBookingOrderBookingIdPatchParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface DeleteBookingOrderBookingOrderBookingIdDeleteParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface SubmitBookingOrderBookingOrderBookingIdSubmitPatchParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface TransitionBookingStatusBookingOrderBookingIdStatusTransitionPatchParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
	transition: BookingTransition;
}

export interface DeclineBookingBookingOrderBookingIdDeclinePostParams {
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

export interface ListBookingAvailabilityBookingOrderBookingIdAvailabilityGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface ApplyEventAvailabilityBookingOrderBookingIdEventsEventIdAvailabilityPatchParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
}

export interface AddPassengerInfoBookingOrderBookingIdPaxPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface ListPassengerInfoBookingOrderBookingIdPaxGetParams {
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface UpdatePassengerInfoBookingOrderBookingIdPaxPaxIdPatchParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
	/**
	 * Pax Id
	 * @format uuid
	 */
	paxId: string;
}

export interface DeletePassengerInfoBookingOrderBookingIdPaxPaxIdDeleteParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
	/**
	 * Pax Id
	 * @format uuid
	 */
	paxId: string;
}

export interface UploadPassengerPassportBookingOrderBookingIdPaxPaxIdPassportPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
	/**
	 * Pax Id
	 * @format uuid
	 */
	paxId: string;
}

export interface GetFileBinaryBookingOrderPaxFileFileIdGetParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface RemoveFileBookingOrderPaxFileFileIdDeleteParams {
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

export interface ListMyInvoicesInvoiceGetParams {
	/** Statuses */
	statuses?: InvoiceStatus[] | null;
	/** Q */
	q?: string | null;
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 100
	 * @default 10
	 */
	limit?: number;
}

export interface GetInvoiceInvoiceInvoiceIdGetParams {
	/**
	 * Invoice Id
	 * @format uuid
	 */
	invoiceId: string;
}

export interface RecordInvoicePaymentInvoiceInvoiceIdPaymentPostParams {
	/**
	 * Invoice Id
	 * @format uuid
	 */
	invoiceId: string;
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
