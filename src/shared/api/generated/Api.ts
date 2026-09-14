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
	OperatorStaff = "operator_staff",
	AgencyAdmin = "agency_admin",
	AgencyStaff = "agency_staff",
	AuthenticatedUser = "authenticated_user"
}

/** TranslationState */
export enum TranslationState {
	Source = "source",
	Ready = "ready",
	Pending = "pending"
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
	Title = "title",
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

/**
 * SupplierType
 * What a supplier can be contracted for. A supplier carries a set of these,
 * not one: a hotel that also runs the restaurant, or a DMC selling transfers
 * and guides, is one counterparty with one set of bank details.
 */
export enum SupplierType {
	Flight = "flight",
	Hotel = "hotel",
	Museum = "museum",
	Transfer = "transfer",
	Activity = "activity",
	Train = "train",
	Bus = "bus"
}

/**
 * SupplierPolicyWarning
 * What a supplier policy caught on an event. Advisory, never a publish
 * block: the operator is the authority on their own contract, so a warning
 * reports the conflict and the charge to expect and leaves the call to them.
 *
 * Check: GET /tour/{tour_id}/{option_id}/event/policy-check
 */
export enum SupplierPolicyWarning {
	EarlyCheckIn = "early_check_in",
	LateCheckOut = "late_check_out",
	SupplierTypeMismatch = "supplier_type_mismatch"
}

/** SupplierPaymentStatus */
export enum SupplierPaymentStatus {
	Paid = "paid",
	NotPaid = "not_paid"
}

/** SuggestKind */
export enum SuggestKind {
	City = "city",
	Place = "place",
	Country = "country"
}

/** StaffStatus */
export enum StaffStatus {
	Pending = "pending",
	Active = "active",
	Inactive = "inactive"
}

/** RebuildState */
export enum RebuildState {
	Started = "started",
	AlreadyRunning = "already_running"
}

/** PickupType */
export enum PickupType {
	AirportPickup = "airport_pickup",
	HotelPickup = "hotel_pickup"
}

/** Permissions */
export enum Permissions {
	TourRead = "tour_read",
	TourCreate = "tour_create",
	TourUpdate = "tour_update",
	TourDelete = "tour_delete",
	TourPublish = "tour_publish",
	TourArchive = "tour_archive",
	TourOptionWrite = "tour_option_write",
	TourEventWrite = "tour_event_write",
	TourEventOverrideWrite = "tour_event_override_write",
	TourEventLibraryRead = "tour_event_library_read",
	TourEventLibraryWrite = "tour_event_library_write",
	TourGalleryWrite = "tour_gallery_write",
	TourLandingWrite = "tour_landing_write",
	TourScheduleWrite = "tour_schedule_write",
	TourFinanceRead = "tour_finance_read",
	TourFinanceWrite = "tour_finance_write",
	CatalogRead = "catalog_read",
	BookingRead = "booking_read",
	BookingWrite = "booking_write",
	BookingCancel = "booking_cancel",
	BookingTransition = "booking_transition",
	BookingFinanceRead = "booking_finance_read",
	BookingPaxWrite = "booking_pax_write",
	BookingRevisionWrite = "booking_revision_write",
	BookingEventOverrideWrite = "booking_event_override_write",
	BookingPaymentRead = "booking_payment_read",
	BookingPaymentWrite = "booking_payment_write",
	BookingPaymentConfirm = "booking_payment_confirm",
	BookingAvailabilityWrite = "booking_availability_write",
	BookingVoucherWrite = "booking_voucher_write",
	BookingReconciliationRead = "booking_reconciliation_read",
	InvoiceRead = "invoice_read",
	InvoiceWrite = "invoice_write",
	InvoicePaymentWrite = "invoice_payment_write",
	LedgerRead = "ledger_read",
	SupplierRead = "supplier_read",
	SupplierWrite = "supplier_write",
	OperatorInfoRead = "operator_info_read",
	OperatorInfoWrite = "operator_info_write",
	OperatorDelete = "operator_delete",
	OperatorFinancialsRead = "operator_financials_read",
	OperatorFinancialsWrite = "operator_financials_write",
	OperatorFilesRead = "operator_files_read",
	OperatorFilesWrite = "operator_files_write",
	OperatorAgenciesRead = "operator_agencies_read",
	OperatorAgenciesWrite = "operator_agencies_write",
	FxRateRead = "fx_rate_read",
	FxRateWrite = "fx_rate_write",
	SupplierPaymentRead = "supplier_payment_read",
	SupplierPaymentWrite = "supplier_payment_write",
	PaymentRouteRead = "payment_route_read",
	PaymentRouteWrite = "payment_route_write",
	AgencyInfoRead = "agency_info_read",
	AgencyInfoWrite = "agency_info_write",
	StaffRead = "staff_read",
	StaffManage = "staff_manage",
	AuditRead = "audit_read"
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

/**
 * LedgerSource
 * Which rail produced the entry. Bank, card and SWIFT rails append their
 * own members here; the posting contract does not change.
 */
export enum LedgerSource {
	Invoice = "invoice",
	ClientPayment = "client_payment",
	InvoicePayment = "invoice_payment",
	SupplierPayment = "supplier_payment",
	Manual = "manual"
}

/**
 * LedgerParty
 * One end of an entry. ``OPERATOR`` is a party like any other, not an
 * implied centre — that is what lets a future entry record an agency paying a
 * supplier directly, with the operator's books merely observing it.
 */
export enum LedgerParty {
	User = "user",
	Agency = "agency",
	Supplier = "supplier",
	Operator = "operator"
}

/**
 * LedgerFlow
 * Derived read lens, never stored: which way an entry moves relative to the
 * operator's own books. ``INBOUND`` is ``payee_typ = OPERATOR``. Entries where
 * the operator is neither end have no flow.
 */
export enum LedgerFlow {
	Inbound = "inbound",
	Outbound = "outbound"
}

/**
 * LedgerEntryType
 * ``ACCRUAL`` is what was agreed and is now owed; ``SETTLEMENT`` is cash
 * that actually moved. Debt is the difference between the two.
 *
 * There is exactly one accrual per source row and it is restated in place as
 * the operator edits the agreed figure. Settlements accumulate — an invoice
 * paid in three instalments posts three of them.
 */
export enum LedgerEntryType {
	Accrual = "accrual",
	Settlement = "settlement"
}

/** LanguageCode */
export enum LanguageCode {
	En = "en",
	Ru = "ru",
	Uz = "uz",
	It = "it",
	De = "de",
	Es = "es",
	Pt = "pt",
	Kk = "kk",
	Ky = "ky",
	Tg = "tg",
	Tk = "tk",
	Zh = "zh",
	Ja = "ja",
	Ar = "ar",
	Tr = "tr",
	Hi = "hi",
	Jp = "jp",
	Ch = "ch",
	Fr = "fr",
	Ko = "ko",
	ZhHans = "zh-Hans"
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

/**
 * HotelKind
 * What kind of place a stay is put up in. Descriptive only — it never
 * changes how the hotel prices, which is what ``HotelPricing`` tags. A hotel
 * may be several at once, so a spec carries a list.
 */
export enum HotelKind {
	Hotel = "hotel",
	Boutique = "boutique",
	Resort = "resort",
	Guesthouse = "guesthouse",
	Hostel = "hostel",
	Apartment = "apartment",
	Villa = "villa",
	Yurt = "yurt",
	Camp = "camp"
}

/** GuideType */
export enum GuideType {
	Local = "local",
	Route = "route"
}

/** Gender */
export enum Gender {
	M = "M",
	F = "F"
}

/** EventTypes */
export enum EventTypes {
	Flight = "flight",
	Train = "train",
	Bus = "bus",
	Transfer = "transfer",
	Housing = "housing",
	Activity = "activity",
	Ref = "ref",
	Guide = "guide",
	Supplementary = "supplementary",
	Options = "options"
}

/** EditOp */
export enum EditOp {
	Create = "create",
	Update = "update",
	Delete = "delete",
	Override = "override"
}

/**
 * DetachKeep
 * What a detached event keeps of the product it left. SPEC copies the
 * resolved spec in as its own; NOTHING leaves the event empty for the operator
 * to state.
 */
export enum DetachKeep {
	Spec = "spec",
	Nothing = "nothing"
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
	MoveToConfirmed = "move-to-confirmed",
	MoveToInProgress = "move-to-in-progress",
	MoveToCompleted = "move-to-completed"
}

/** BookingStatusLabel */
export enum BookingStatusLabel {
	Draft = "Draft",
	New = "New",
	InProcessing = "In processing",
	Booked = "Booked",
	InProgress = "In progress",
	Complete = "Complete",
	Cancelled = "Cancelled",
	Declined = "Declined"
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
	Unavailable = "unavailable",
	Selected = "selected",
	Deselected = "deselected"
}

/** ApplyAvailabilityInput */
export enum ApplyAvailabilityInput {
	Available = "available",
	Unavailable = "unavailable",
	Selected = "selected",
	Deselected = "deselected"
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
	Spiritual = "spiritual",
	Other = "other"
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

/**
 * ActivityDetails
 * A visit as it reads.
 */
export interface ActivityDetailsOutput {
	/** When the group is somewhere: an activity's hours, an information entry's. */
	plan: Times;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & ActivityProductSupplyOutput);
	/**
	 * Spec
	 * What the venue sells.
	 */
	spec:
		| ({
				sub_typ: "entertainment";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "extreme";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "food";
		  } & FoodVenueOutput)
		| ({
				sub_typ: "master_class";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "other";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "outdoor";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "photography";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "riding";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "sightseeing";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "spiritual";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "water_activities";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "wellness";
		  } & GeneralVenueOutput);
}

/**
 * ActivityDetailsWrite
 * A visit as the API takes it.
 */
export interface ActivityDetailsWrite {
	/** When the group is somewhere: an activity's hours, an information entry's. */
	plan?: Times;
	/** Supply */
	supply?:
		| (
				| ({
						source: "inline";
				  } & ActivityInlineSupplyNew)
				| ({
						source: "product";
				  } & ProductSupplyNew)
		  )
		| null;
}

/** ActivityEvent */
export interface ActivityEvent {
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	/** A visit as the API takes it. */
	details: ActivityDetailsWrite;
}

/** ActivityEventPubRead */
export interface ActivityEventPubReadOutput {
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Day */
	day: number | null;
	/** Position */
	position: number | null;
	/** Is Optional */
	is_optional: boolean | null;
	/** Images */
	images: EventImagePubSchema[];
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	/** Details */
	details:
		| (
				| ({
						typ: "entertainment";
				  } & GeneralActivityPubSchemaOutput)
				| ({
						typ: "extreme";
				  } & GeneralActivityPubSchemaOutput)
				| ({
						typ: "food";
				  } & FoodActivityPubSchemaOutput)
				| ({
						typ: "master_class";
				  } & GeneralActivityPubSchemaOutput)
				| ({
						typ: "other";
				  } & GeneralActivityPubSchemaOutput)
				| ({
						typ: "outdoor";
				  } & GeneralActivityPubSchemaOutput)
				| ({
						typ: "photography";
				  } & GeneralActivityPubSchemaOutput)
				| ({
						typ: "riding";
				  } & GeneralActivityPubSchemaOutput)
				| ({
						typ: "sightseeing";
				  } & GeneralActivityPubSchemaOutput)
				| ({
						typ: "spiritual";
				  } & GeneralActivityPubSchemaOutput)
				| ({
						typ: "water_activities";
				  } & GeneralActivityPubSchemaOutput)
				| ({
						typ: "wellness";
				  } & GeneralActivityPubSchemaOutput)
		  )
		| null;
}

/** ActivityEventTypeRead */
export interface ActivityEventTypeReadOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	/** A visit as it reads. */
	details: ActivityDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * ActivityInlineSupplyNew
 * A visit the operator describes and prices itself, as the API takes it.
 */
export interface ActivityInlineSupplyNew {
	/**
	 * Source
	 * @default "inline"
	 */
	source: "inline";
	/** Supplier Id */
	supplier_id?: string | null;
	/**
	 * Spec
	 * What the venue sells.
	 */
	spec:
		| ({
				sub_typ: "entertainment";
		  } & GeneralVenueInput)
		| ({
				sub_typ: "extreme";
		  } & GeneralVenueInput)
		| ({
				sub_typ: "food";
		  } & FoodVenueInput)
		| ({
				sub_typ: "master_class";
		  } & GeneralVenueInput)
		| ({
				sub_typ: "other";
		  } & GeneralVenueInput)
		| ({
				sub_typ: "outdoor";
		  } & GeneralVenueInput)
		| ({
				sub_typ: "photography";
		  } & GeneralVenueInput)
		| ({
				sub_typ: "riding";
		  } & GeneralVenueInput)
		| ({
				sub_typ: "sightseeing";
		  } & GeneralVenueInput)
		| ({
				sub_typ: "spiritual";
		  } & GeneralVenueInput)
		| ({
				sub_typ: "water_activities";
		  } & GeneralVenueInput)
		| ({
				sub_typ: "wellness";
		  } & GeneralVenueInput);
}

/**
 * ActivityOverride
 * A price this tour negotiated with a venue, replacing the offering's own.
 */
export interface ActivityOverrideInput {
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	/** The offerings this tour repriced, each named once. */
	rates: OfferingChargesOverrideInput;
}

/**
 * ActivityOverride
 * A price this tour negotiated with a venue, replacing the offering's own.
 */
export interface ActivityOverrideOutput {
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	/** The offerings this tour repriced, each named once. */
	rates: OfferingChargesOverrideOutput;
}

/** ActivityProductCreate */
export interface ActivityProductCreate {
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	/**
	 * A venue as a create takes it: its facts, what it sells and the offerings
	 * it opens with. An offering names no arm of its own — a venue prices one way
	 * — so a create carries the variant route's own body.
	 *
	 * Check: ``POST /supplier/{supplier_id}/product/{product_id}/variant`` adds an
	 * offering to a venue that already stands.
	 */
	details: ActivityProductCreateDetails;
}

/**
 * ActivityProductCreateDetails
 * A venue as a create takes it: its facts, what it sells and the offerings
 * it opens with. An offering names no arm of its own — a venue prices one way
 * — so a create carries the variant route's own body.
 *
 * Check: ``POST /supplier/{supplier_id}/product/{product_id}/variant`` adds an
 * offering to a venue that already stands.
 */
export interface ActivityProductCreateDetails {
	/**
	 * Typ
	 * @default "activity"
	 */
	typ?: "activity";
	sub_typ: ActivityType;
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Offerings */
	offerings?: ActivityVariantWrite[];
}

/**
 * ActivityProductDetails
 * A venue as the API takes it: what it stores plus the name that lands on
 * the ``name`` column. A product states its facts rather than drafting them,
 * so its name is required where a spec's is not.
 */
export interface ActivityProductDetails {
	/**
	 * Typ
	 * @default "activity"
	 */
	typ?: "activity";
	sub_typ: ActivityType;
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/** ActivityProductRead */
export interface ActivityProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/** Name */
	name: string;
	/** Image Paths */
	image_paths: string[];
	/** Primary Image Path */
	primary_image_path: string | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	/**
	 * Spec
	 * What the venue sells.
	 */
	spec:
		| ({
				sub_typ: "entertainment";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "extreme";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "food";
		  } & FoodVenueOutput)
		| ({
				sub_typ: "master_class";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "other";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "outdoor";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "photography";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "riding";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "sightseeing";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "spiritual";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "water_activities";
		  } & GeneralVenueOutput)
		| ({
				sub_typ: "wellness";
		  } & GeneralVenueOutput);
}

/**
 * ActivityProductSupply
 * A visit to a supplier's venue.
 */
export interface ActivityProductSupplyOutput {
	/**
	 * Source
	 * @default "product"
	 */
	source: "product";
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
	/** Who a linked product is bought from, resolved on read. */
	supplier: SupplierRef;
	/**
	 * Scope
	 * How much of the product the event takes.
	 */
	scope:
		| ({
				typ: "all";
		  } & AllVariants)
		| ({
				typ: "only";
		  } & OnlyVariants);
	override: ActivityOverrideOutput | null;
}

/** ActivityProductUpdate */
export interface ActivityProductUpdate {
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	details?: ActivityProductDetails | null;
}

/** ActivitySingleEvent */
export interface ActivitySingleEvent {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	/** A visit as the API takes it. */
	details: ActivityDetailsWrite;
}

/** ActivitySingleEventRead */
export interface ActivitySingleEventReadOutput {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	/** A visit as it reads. */
	details: ActivityDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * ActivityVariantWrite
 * One offering of a venue as the API takes it: a set menu, a ticket tier,
 * a class. The arm is the venue's ``sub_typ``, not the offering's, so an
 * offering names no arm of its own; a menu is read back only for a food
 * venue.
 */
export interface ActivityVariantWrite {
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/** Menu */
	menu?: MenuItem[];
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
	picture: string | null;
	/** Operator Id */
	operator_id: string | null;
	/** Agency Id */
	agency_id: string | null;
}

/** AgencyDiscountUpdate */
export interface AgencyDiscountUpdate {
	/**
	 * Discount
	 * The markup calculation strategy.
	 */
	discount:
		| ({
				typ: "fixed";
		  } & FixedExpenseInput)
		| ({
				typ: "percentage";
		  } & PercentageMarkup);
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
	/** File Name */
	file_name: string;
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

/**
 * AgencyInvite
 * One-time creation of an agency owner on the agency's behalf. Only the
 * email is required — the account activates on first Google SSO or, when a
 * password is set, email + password sign-in.
 *
 * Check:
 * - GET /operator/agencies/partnered — where the invitee shows up
 * - PATCH /operator/agencies/{agency_id}/discount — per-partner pricing
 */
export interface AgencyInvite {
	/**
	 * Email
	 * @format email
	 * @maxLength 255
	 */
	email: string;
	/** Password */
	password?: string | null;
	/** Name */
	name?: string | null;
	info?: AgencyInfoUpdate | null;
}

/** AgencyListItem */
export interface AgencyListItem {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string;
	/** Business Name */
	business_name: string | null;
	/** Legal Name */
	legal_name: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Tax Id */
	tax_id: string | null;
	/** City */
	city: string | null;
	/** Country */
	country: string | null;
	/** Website Url */
	website_url: string | null;
	/** Logo Url */
	logo_url: string | null;
}

/** AgencyListResponse */
export interface AgencyListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: AgencyListItem[];
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

/**
 * AllVariants
 * The event follows every variant the product has, now and later.
 */
export interface AllVariants {
	/**
	 * Typ
	 * @default "all"
	 */
	typ: "all";
}

/**
 * AttachBody
 * Point an inline event at a supplier product. The inline spec is dropped:
 * the product is the authority on what it supplies from here on.
 */
export interface AttachBody {
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
	/**
	 * Scope
	 * How much of the product the event takes.
	 */
	scope?:
		| ({
				typ: "all";
		  } & AllVariants)
		| ({
				typ: "only";
		  } & OnlyVariants);
}

/** AuditLogListResponse */
export interface AuditLogListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: AuditLogRead[];
}

/** AuditLogRead */
export interface AuditLogRead {
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
	/** Email */
	email: string | null;
	/** Display Name */
	display_name: string | null;
	role: UserRoles;
	/** Operator Id */
	operator_id: string | null;
	/** Agency Id */
	agency_id: string | null;
	/** Method */
	method: string;
	/** Path */
	path: string;
	permission: Permissions | null;
	/** Status Code */
	status_code: number;
	/**
	 * Created At
	 * @format date-time
	 */
	created_at: string;
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
	status: ApplyAvailabilityInput;
}

/** BaseUser */
export interface BaseUser {
	/**
	 * Email
	 * @format email
	 */
	email: string;
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

/** Body_add_attachment_booking_payment__payment_id__attachment_post */
export interface BodyAddAttachmentBookingPaymentPaymentIdAttachmentPost {
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
	 * File
	 * @format binary
	 */
	file: File;
	/** @default "USD" */
	currency?: Currency;
	/** Exchange Rate */
	exchange_rate?: number | null;
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

/** Body_upload_event_node_images_tour__tour_id__event__event_id__node__node_id__images_post */
export interface BodyUploadEventNodeImagesTourTourIdEventEventIdNodeNodeIdImagesPost {
	/** Images */
	images: File[];
}

/** Body_upload_invoice_pdf_invoice__invoice_id__pdf_post */
export interface BodyUploadInvoicePdfInvoiceInvoiceIdPdfPost {
	/**
	 * File
	 * @format binary
	 */
	file: File;
}

/** Body_upload_landing_images_tour__tour_id__landing_images_post */
export interface BodyUploadLandingImagesTourTourIdLandingImagesPost {
	/** Images */
	images: File[];
}

/** Body_upload_library_images_tour_event_library__library_id__images_post */
export interface BodyUploadLibraryImagesTourEventLibraryLibraryIdImagesPost {
	/** Images */
	images: File[];
}

/** Body_upload_node_images_supplier__supplier_id__product__product_id__variant__variant_id__node__node_id__images_post */
export interface BodyUploadNodeImagesSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesPost {
	/** Images */
	images: File[];
}

/** Body_upload_option_cover_tour__tour_id__option__option_id__cover_post */
export interface BodyUploadOptionCoverTourTourIdOptionOptionIdCoverPost {
	/**
	 * Image
	 * @format binary
	 */
	image: File;
}

/** Body_upload_passenger_passport_booking_order__booking_id__pax__pax_id__passport_post */
export interface BodyUploadPassengerPassportBookingOrderBookingIdPaxPaxIdPassportPost {
	/**
	 * File
	 * @format binary
	 */
	file: File;
}

/** Body_upload_product_images_supplier__supplier_id__product__product_id__images_post */
export interface BodyUploadProductImagesSupplierSupplierIdProductProductIdImagesPost {
	/** Images */
	images: File[];
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

/** Body_upload_voucher_booking_voucher__booking_id__post */
export interface BodyUploadVoucherBookingVoucherBookingIdPost {
	/**
	 * File
	 * @format binary
	 */
	file: File;
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
	/** @default "en" */
	lang?: LanguageCode;
}

/** BookingEventAvailabilityResponse */
export interface BookingEventAvailabilityResponse {
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
	/** Option Index */
	option_index: number;
	status: AvailabilityStatus;
	/** Event Name */
	event_name: string | null;
	event_typ: EventTypes | null;
}

/**
 * BookingFilesPresent
 * Which documents this order already has, without exposing storage keys —
 * the board only needs to show a paperclip and whether it is complete.
 */
export interface BookingFilesPresent {
	/** Voucher */
	voucher: boolean;
	/** Invoice Pdf */
	invoice_pdf: boolean;
	/** Supplier Receipts */
	supplier_receipts: number;
	/** Client Payment Proofs */
	client_payment_proofs: number;
}

/**
 * BookingFinancialsResponse
 * Full two-sided position on one order, every figure in the operator's base
 * currency so the money-in and money-out halves are directly comparable.
 *
 * Planned figures are what the frozen snapshot prices out. Accrued figures are
 * what has actually been billed and taken on — the issued invoice on the
 * revenue side, the seeded supplier payments on the cost side. Settled figures
 * are cash that moved. The three tiers answer three different questions and
 * are deliberately not collapsed:
 *
 * - ``receivable`` = revenue accrued but not yet received (this order's debtor
 *   position); ``payable`` = cost accrued but not yet paid out (creditor).
 * - ``accrual_profit`` is the margin already locked in contractually;
 *   ``settled_profit`` is cash actually in hand. They converge as an order
 *   completes, and a persistent gap is exactly what needs chasing.
 *
 * ``planned`` figures carry the min/max spread from optional events and
 * category alternatives; the realised tiers are single values.
 */
export interface BookingFinancialsResponse {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Order Number */
	order_number: string;
	currency: Currency;
	/**
	 * Planned Revenue
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_revenue: string;
	/**
	 * Planned Cost
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_cost: string;
	/**
	 * Planned Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_profit: string;
	/**
	 * Revenue Accrued
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	revenue_accrued: string;
	/**
	 * Revenue Settled
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	revenue_settled: string;
	/**
	 * Receivable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	receivable: string;
	/**
	 * Cost Accrued
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	cost_accrued: string;
	/**
	 * Cost Settled
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	cost_settled: string;
	/**
	 * Payable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	payable: string;
	/**
	 * Accrual Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	accrual_profit: string;
	/**
	 * Settled Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	settled_profit: string;
}

/** BookingItineraryResponse */
export interface BookingItineraryResponse {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Order Number */
	order_number: string;
	display_lang: LanguageCode;
	/** Events */
	events: (
		| (
				| ({
						typ: "activity";
				  } & ActivityEventPubReadOutput)
				| ({
						typ: "bus";
				  } & BusEventPubReadOutput)
				| ({
						typ: "flight";
				  } & FlightEventPubReadOutput)
				| ({
						typ: "housing";
				  } & HousingEventPubReadOutput)
				| ({
						typ: "ref";
				  } & InformationEventPubReadOutput)
				| ({
						typ: "train";
				  } & TrainEventPubReadOutput)
				| ({
						typ: "transfer";
				  } & TransferEventPubReadOutput)
		  )
		| MultiEventPubOutput
	)[];
}

/**
 * BookingOrderClientDetail
 * Agency/tourist-facing order detail: instead of echoing the caller's own
 * identity it carries the ``operator`` contact block — who to reach about
 * this booking. ``discount`` is the partner discount frozen into the booking
 * snapshot at creation.
 */
export interface BookingOrderClientDetail {
	order: BookingOrderResponse;
	tour: OrderTourInfo;
	/**
	 * Who to contact about this booking — the operator running the tour. Joined
	 * into the listing rather than fetched per row so an agency or tourist can reach
	 * the right person without a follow-up call per booking. Every field but ``id``
	 * and ``name`` lives on ``operator_info``, which an operator may not have filled
	 * in yet.
	 */
	operator: OrderOperatorInfo;
	/**
	 * Discount
	 * The markup calculation strategy.
	 */
	discount:
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

/**
 * BookingOrderDetail
 * Operator-facing order detail: who placed the booking — exactly one of
 * ``agency`` / ``user`` is set, mirroring the booking's owner column.
 */
export interface BookingOrderDetail {
	order: BookingOrderResponse;
	tour: OrderTourInfo;
	agency: OrderAgencyInfo | null;
	user: OrderUserInfo | null;
}

/** BookingOrderListResponse */
export interface BookingOrderListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: BookingOrderRow[];
}

/** BookingOrderResponse */
export interface BookingOrderResponse {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Agency Id */
	agency_id: string | null;
	/** User Id */
	user_id: string | null;
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
	/** Voucher Path */
	voucher_path: string | null;
	/** Order Number */
	order_number: string;
}

/** BookingOrderRow */
export interface BookingOrderRow {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Order Number
	 * @default ""
	 */
	order_number: string;
	/** Client Name */
	client_name: string;
	client_type: BookingClientType;
	/** Tour Name */
	tour_name: string | null;
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
	/**
	 * Who to contact about this booking — the operator running the tour. Joined
	 * into the listing rather than fetched per row so an agency or tourist can reach
	 * the right person without a follow-up call per booking. Every field but ``id``
	 * and ``name`` lives on ``operator_info``, which an operator may not have filled
	 * in yet.
	 */
	operator: OrderOperatorInfo;
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
	/** File Name */
	file_name: string;
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

/** BookingReconciliationListResponse */
export interface BookingReconciliationListResponse {
	/** Total Count */
	total_count: number;
	currency: Currency;
	/**
	 * Grand totals across the *whole filtered set*, not just the page.
	 *
	 * Only ledger-derived figures appear here. Planned totals are deliberately
	 * absent: they require re-pricing every matching snapshot, and a number that
	 * silently covered only the current page would be worse than no number.
	 */
	totals: ReconciliationTotalsOutput;
	/** Data */
	data: BookingReconciliationRowOutput[];
}

/**
 * BookingReconciliationRow
 * One order on the reconciliation board, every figure in the operator's
 * base currency.
 *
 * ``planned_*`` is re-priced from the frozen snapshot, so an order that has
 * not been invoiced yet still shows what it is worth. ``*_accrued`` is what
 * has actually been billed and committed, ``*_settled`` is cash that moved,
 * and the two debt figures are the gap between them.
 *
 * ``variance`` is ``planned_cost - cost_accrued``: positive means the order is
 * running under its planned supplier budget, negative that it has overrun.
 */
export interface BookingReconciliationRowOutput {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Order Number */
	order_number: string;
	status: BookingStatus;
	status_label: BookingStatusLabel;
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
	/** Tour Name */
	tour_name: string | null;
	tour_type: TourType;
	/** Client Name */
	client_name: string;
	client_type: BookingClientType;
	currency: Currency;
	/**
	 * Planned Revenue
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_revenue: string;
	/**
	 * Planned Cost
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_cost: string;
	/**
	 * Planned Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_profit: string;
	/**
	 * Revenue Accrued
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	revenue_accrued: string;
	/**
	 * Revenue Settled
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	revenue_settled: string;
	/**
	 * Receivable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	receivable: string;
	/**
	 * Cost Accrued
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	cost_accrued: string;
	/**
	 * Cost Settled
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	cost_settled: string;
	/**
	 * Payable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	payable: string;
	/**
	 * Accrual Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	accrual_profit: string;
	/**
	 * Settled Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	settled_profit: string;
	/**
	 * Variance
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	variance: string;
	/** Invoice Id */
	invoice_id: string | null;
	/** Invoice Number */
	invoice_number: string | null;
	/**
	 * Which documents this order already has, without exposing storage keys —
	 * the board only needs to show a paperclip and whether it is complete.
	 */
	files: BookingFilesPresent;
	/**
	 * Counts behind the payable figure, so a row explains itself: how many
	 * event lines exist, how many are settled, and how many are still filed under
	 * no supplier at all.
	 */
	supplier_lines: SupplierLineTally;
	client_payments: ClientPaymentTally;
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

/**
 * BusDetailPubSchema
 * A coach leg as a traveller sees it: the route it drives and the coaches
 * it runs, whoever supplies them.
 */
export interface BusDetailPubSchemaOutput {
	/**
	 * Name
	 * The fleet's own name
	 */
	name: string | null;
	/** Hop */
	hop: TransportHopPubSchemaOutput[];
	/** Vehicles */
	vehicles: VehiclePubSchema[];
	/** Images */
	images: EventImagePubSchema[];
}

/**
 * BusDetails
 * A coach run as it reads.
 */
export interface BusDetailsOutput {
	/**
	 * The run a coach drives: the tour's own statement, whoever supplies the
	 * fleet.
	 */
	plan: BusRouteOutput;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & BusProductSupplyOutput);
	/**
	 * Spec
	 * How the fleet prices a run.
	 */
	spec:
		| ({
				pricing: "per_vehicle";
		  } & PerVehicleFleetOutput)
		| ({
				pricing: "whole";
		  } & WholeFleetOutput);
}

/**
 * BusDetailsWrite
 * A coach run as the API takes it.
 */
export interface BusDetailsWrite {
	/**
	 * The run a coach drives: the tour's own statement, whoever supplies the
	 * fleet.
	 */
	plan?: BusRouteInput;
	/** Supply */
	supply?:
		| (
				| ({
						source: "inline";
				  } & BusInlineSupplyNew)
				| ({
						source: "product";
				  } & ProductSupplyNew)
		  )
		| null;
}

/** BusEvent */
export interface BusEvent {
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
	/** A coach run as the API takes it. */
	details: BusDetailsWrite;
}

/** BusEventPubRead */
export interface BusEventPubReadOutput {
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Day */
	day: number | null;
	/** Position */
	position: number | null;
	/** Is Optional */
	is_optional: boolean | null;
	/** Images */
	images: EventImagePubSchema[];
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
	details: BusDetailPubSchemaOutput | null;
}

/** BusEventTypeRead */
export interface BusEventTypeReadOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
	/** A coach run as it reads. */
	details: BusDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * BusInlineSupplyNew
 * A coach run the operator describes and prices itself, as the API takes it.
 */
export interface BusInlineSupplyNew {
	/**
	 * Source
	 * @default "inline"
	 */
	source: "inline";
	/** Supplier Id */
	supplier_id?: string | null;
	/**
	 * Spec
	 * How the fleet prices a run.
	 */
	spec:
		| ({
				pricing: "per_vehicle";
		  } & PerVehicleFleetInput)
		| ({
				pricing: "whole";
		  } & WholeFleetInput);
}

/**
 * BusLeg
 * One leg of a coach run: where it leaves from and arrives at, and when —
 * the tour's own statement, since a coach drives wherever the tour says.
 */
export interface BusLegInput {
	/** Details of the departure. */
	departure?: BusPointInput | null;
	/** Details of the arrival. */
	arrival?: BusPointInput | null;
}

/**
 * BusLeg
 * One leg of a coach run: where it leaves from and arrives at, and when —
 * the tour's own statement, since a coach drives wherever the tour says.
 */
export interface BusLegOutput {
	/** Details of the departure. */
	departure: BusPointOutput | null;
	/** Details of the arrival. */
	arrival: BusPointOutput | null;
}

/**
 * BusOverride
 * A price this tour negotiated for a coach run, replacing the fleet's own.
 */
export interface BusOverrideInput {
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
	/**
	 * Rates
	 * The arm the fleet prices in.
	 */
	rates:
		| ({
				pricing: "per_vehicle";
		  } & VehicleChargesOverrideInput)
		| ({
				pricing: "whole";
		  } & WholeFleetChargeOverrideInput);
}

/**
 * BusOverride
 * A price this tour negotiated for a coach run, replacing the fleet's own.
 */
export interface BusOverrideOutput {
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
	/**
	 * Rates
	 * The arm the fleet prices in.
	 */
	rates:
		| ({
				pricing: "per_vehicle";
		  } & VehicleChargesOverrideOutput)
		| ({
				pricing: "whole";
		  } & WholeFleetChargeOverrideOutput);
}

/**
 * BusPoint
 * Where a coach leg leaves from or arrives at, and when.
 */
export interface BusPointInput {
	/** The time of an event */
	time?: TimeSchema | null;
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
}

/**
 * BusPoint
 * Where a coach leg leaves from or arrives at, and when.
 */
export interface BusPointOutput {
	/** The time of an event */
	time: TimeSchema | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
}

/** BusProductCreate */
export interface BusProductCreate {
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
	/**
	 * Details
	 * How the fleet prices a run.
	 */
	details:
		| ({
				pricing: "per_vehicle";
		  } & PerVehicleFleetCreate)
		| ({
				pricing: "whole";
		  } & WholeFleetCreate);
}

/** BusProductRead */
export interface BusProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/** Name */
	name: string;
	/** Image Paths */
	image_paths: string[];
	/** Primary Image Path */
	primary_image_path: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
	/**
	 * Spec
	 * How the fleet prices a run.
	 */
	spec:
		| ({
				pricing: "per_vehicle";
		  } & PerVehicleFleetOutput)
		| ({
				pricing: "whole";
		  } & WholeFleetOutput);
}

/**
 * BusProductSupply
 * A run driven by a supplier's coach fleet.
 */
export interface BusProductSupplyOutput {
	/**
	 * Source
	 * @default "product"
	 */
	source: "product";
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
	/** Who a linked product is bought from, resolved on read. */
	supplier: SupplierRef;
	/**
	 * Scope
	 * How much of the product the event takes.
	 */
	scope:
		| ({
				typ: "all";
		  } & AllVariants)
		| ({
				typ: "only";
		  } & OnlyVariants);
	override: BusOverrideOutput | null;
}

/** BusProductUpdate */
export interface BusProductUpdate {
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
	/**
	 * Details
	 * How the fleet prices a run.
	 */
	details?:
		| (
				| ({
						pricing: "per_vehicle";
				  } & PerVehicleBusDetails)
				| ({
						pricing: "whole";
				  } & WholeBusDetails)
		  )
		| null;
}

/**
 * BusRoute
 * The run a coach drives: the tour's own statement, whoever supplies the
 * fleet.
 */
export interface BusRouteInput {
	/** Legs */
	legs?: BusLegInput[];
}

/**
 * BusRoute
 * The run a coach drives: the tour's own statement, whoever supplies the
 * fleet.
 */
export interface BusRouteOutput {
	/** Legs */
	legs: BusLegOutput[];
}

/** BusSingleEvent */
export interface BusSingleEvent {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
	/** A coach run as the API takes it. */
	details: BusDetailsWrite;
}

/** BusSingleEventRead */
export interface BusSingleEventReadOutput {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
	/** A coach run as it reads. */
	details: BusDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * Car
 * A car of a whole-leg fleet: described, never priced — the leg is charged
 * once whatever cars it takes. An ``ImageBearingNode``: echo its ``id`` on
 * update to keep the car's pictures.
 */
export interface Car {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images?: NodeImageSchema[];
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
}

/**
 * CarCategoriesSwitch
 * The classes one car body is taken in once the fleet charges by class.
 */
export interface CarCategoriesSwitch {
	/**
	 * Variant Id
	 * @format uuid
	 */
	variant_id: string;
	/** Categories */
	categories: CategorySwitch[];
}

/**
 * CarCategory
 * One class a car is taken in — economy, comfort, business — and what it
 * costs. Stored inside the variant, so a category sent without an ``id``
 * is minted one here.
 */
export interface CarCategoryInput {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Name */
	name?: string | null;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * CarCategory
 * One class a car is taken in — economy, comfort, business — and what it
 * costs. Stored inside the variant, so a category sent without an ``id``
 * is minted one here.
 */
export interface CarCategoryOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
}

/**
 * CarCategoryChargeOverride
 * What one class a car is taken in costs this tour.
 */
export interface CarCategoryChargeOverrideInput {
	/**
	 * Category Id
	 * @format uuid
	 */
	category_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * CarCategoryChargeOverride
 * What one class a car is taken in costs this tour.
 */
export interface CarCategoryChargeOverrideOutput {
	/**
	 * Category Id
	 * @format uuid
	 */
	category_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
}

/**
 * CarCategoryChargesOverride
 * The car classes this tour repriced, each named once.
 */
export interface CarCategoryChargesOverrideInput {
	/**
	 * Pricing
	 * @default "per_car_category"
	 */
	pricing: "per_car_category";
	/**
	 * Categories
	 * @minItems 1
	 */
	categories: CarCategoryChargeOverrideInput[];
}

/**
 * CarCategoryChargesOverride
 * The car classes this tour repriced, each named once.
 */
export interface CarCategoryChargesOverrideOutput {
	/**
	 * Pricing
	 * @default "per_car_category"
	 */
	pricing: "per_car_category";
	/**
	 * Categories
	 * @minItems 1
	 */
	categories: CarCategoryChargeOverrideOutput[];
}

/**
 * CarChargeOverride
 * What one car costs this tour.
 */
export interface CarChargeOverrideInput {
	/**
	 * Car Id
	 * @format uuid
	 */
	car_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * CarChargeOverride
 * What one car costs this tour.
 */
export interface CarChargeOverrideOutput {
	/**
	 * Car Id
	 * @format uuid
	 */
	car_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
}

/**
 * CarChargeSwitch
 * What one car of a category costs once the fleet charges by car.
 */
export interface CarChargeSwitch {
	/**
	 * Variant Id
	 * @format uuid
	 */
	variant_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * CarChargesOverride
 * The cars this tour repriced, each named once.
 */
export interface CarChargesOverrideInput {
	/**
	 * Pricing
	 * @default "per_car"
	 */
	pricing: "per_car";
	/**
	 * Cars
	 * @minItems 1
	 */
	cars: CarChargeOverrideInput[];
}

/**
 * CarChargesOverride
 * The cars this tour repriced, each named once.
 */
export interface CarChargesOverrideOutput {
	/**
	 * Pricing
	 * @default "per_car"
	 */
	pricing: "per_car";
	/**
	 * Cars
	 * @minItems 1
	 */
	cars: CarChargeOverrideOutput[];
}

/**
 * CarWrite
 * One car category of a whole fleet as a create takes it: what the car is
 * and how many it seats, never what it costs — the leg carries the charge. No
 * ``id``: the category is minted with the fleet.
 */
export interface CarWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Description */
	description?: string | null;
}

/** CatalogFiltersSchema */
export interface CatalogFiltersSchema {
	/** Cities */
	cities: string[];
	/** Countries */
	countries: string[];
}

/**
 * CategorisedCar
 * A car of a per-car-category fleet: one body, several classes, each with
 * its own price.
 */
export interface CategorisedCarInput {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images?: NodeImageSchema[];
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
	/** Categories */
	categories?: CarCategoryInput[];
}

/**
 * CategorisedCar
 * A car of a per-car-category fleet: one body, several classes, each with
 * its own price.
 */
export interface CategorisedCarOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images: NodeImageSchema[];
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Categories */
	categories: CarCategoryOutput[];
}

/**
 * CategorisedCarWrite
 * One car category of a per-car-category fleet as a create takes it: one
 * body, several classes, each with its own price.
 */
export interface CategorisedCarWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Description */
	description?: string | null;
	/** Categories */
	categories?: CarCategoryInput[];
}

/**
 * Category
 * One room category of a whole hotel — a product's variant, or one block of
 * an inline stay. Echo ``id`` to keep the block the same block; one sent
 * without an id is minted here.
 */
export interface CategoryInput {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Name */
	name?: string | null;
	/** Rooms */
	rooms?: Room[];
}

/**
 * Category
 * One room category of a whole hotel — a product's variant, or one block of
 * an inline stay. Echo ``id`` to keep the block the same block; one sent
 * without an id is minted here.
 */
export interface CategoryOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
	/** Rooms */
	rooms: Room[];
}

/**
 * CategorySwitch
 * One class a car is taken in and what it costs. The classes are minted
 * with the switch, so none of them carries an id yet.
 */
export interface CategorySwitch {
	/** Name */
	name: string | null;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * CategoryWrite
 * One room category of a whole hotel as a create takes it: the block's name
 * and the rooms it opens with.
 */
export interface CategoryWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Rooms */
	rooms?: RoomCreate[];
}

/** ClassicSwiftDetails */
export interface ClassicSwiftDetails {
	/**
	 * Typ
	 * @default "classic_swift"
	 */
	typ: "classic_swift";
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

/**
 * ClientPaymentFile
 * One attached proof document, addressed for download and removal.
 */
export interface ClientPaymentFile {
	/**
	 * File Id
	 * @format uuid
	 */
	file_id: string;
	/** File Name */
	file_name: string;
}

/** ClientPaymentListResponse */
export interface ClientPaymentListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: ClientPaymentResponse[];
}

/**
 * ClientPaymentResponse
 * ``rate`` and ``base_amount`` are read back off the ledger settlement this
 * payment produced, not recomputed at read time — so the figure here is the
 * one the reconciliation actually counted, at the rate that was true when the
 * payment was confirmed. Both are ``None`` until confirmation, because an
 * unconfirmed receipt has no pinned rate yet.
 */
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
	/** Order Number */
	order_number: string;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Client Name */
	client_name: string;
	/** Tour Name */
	tour_name: string | null;
	/** Amount */
	amount: number;
	currency: Currency;
	/** Rate */
	rate: string | null;
	/** Base Amount */
	base_amount: string | null;
	status: ClientPaymentStatus;
	/** Note */
	note: string | null;
	/** Attachment Count */
	attachment_count: number;
	/** Created At */
	created_at: string | null;
	/** Updated At */
	updated_at: string | null;
}

/** ClientPaymentTally */
export interface ClientPaymentTally {
	/** Recorded */
	recorded: number;
	/** Confirmed */
	confirmed: number;
	/** Unconfirmed */
	unconfirmed: number;
}

/** ClientPaymentUpdate */
export interface ClientPaymentUpdate {
	/** Amount */
	amount?: number | null;
	/** Note */
	note?: string | null;
}

/** CounterpartyBalanceListResponse */
export interface CounterpartyBalanceListResponse {
	/** Total Count */
	total_count: number;
	currency: Currency;
	/**
	 * Total Outstanding
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	total_outstanding: string;
	/** Data */
	data: CounterpartyBalanceResponseOutput[];
}

/**
 * CounterpartyBalanceResponse
 * One debtor or creditor line, in the operator's base currency.
 *
 * ``billed`` / ``paid`` read from the operator's side of the relationship: for
 * a debtor they are what the operator invoiced and what came in, for a
 * creditor what the supplier charged and what went out.
 */
export interface CounterpartyBalanceResponseOutput {
	/**
	 * One end of an entry. ``OPERATOR`` is a party like any other, not an
	 * implied centre — that is what lets a future entry record an agency paying a
	 * supplier directly, with the operator's books merely observing it.
	 */
	party_typ: LedgerParty;
	/** Party Id */
	party_id: string | null;
	/** Party Name */
	party_name: string | null;
	/**
	 * Billed
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	billed: string;
	/**
	 * Paid
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	paid: string;
	/**
	 * Outstanding
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	outstanding: string;
	currency: Currency;
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
	foc?: FocPolicy | null;
}

/** CustomDetails */
export interface CustomDetails {
	/**
	 * Typ
	 * @default "custom"
	 */
	typ: "custom";
	/** Items */
	items: KeyValItem[];
}

/**
 * DetachBody
 * Take an event off its product. ``keep`` states what it leaves with: the
 * resolved spec copied in as its own, or nothing for the operator to state
 * again.
 */
export interface DetachBody {
	/**
	 * What a detached event keeps of the product it left. SPEC copies the
	 * resolved spec in as its own; NOTHING leaves the event empty for the operator
	 * to state.
	 */
	keep: DetachKeep;
	/**
	 * Drop Override
	 * @default false
	 */
	drop_override?: boolean;
}

/**
 * DurationCharge
 * A per-duration cost together with its own one-off fee and markup.
 */
export interface DurationChargeInput {
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
	/**
	 * Rate
	 * How one unit of the duration is priced.
	 */
	rate:
		| ({
				typ: "fixed";
		  } & FixedExpenseInput)
		| ({
				typ: "per_group";
		  } & PerGroupExpenseInput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseInput);
	/** Fees */
	fees?: FeeInput[] | null;
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs?: ExtraCostInput[];
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
 * DurationCharge
 * A per-duration cost together with its own one-off fee and markup.
 */
export interface DurationChargeOutput {
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
	/**
	 * Rate
	 * How one unit of the duration is priced.
	 */
	rate:
		| ({
				typ: "fixed";
		  } & FixedExpenseOutput)
		| ({
				typ: "per_group";
		  } & PerGroupExpenseOutput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseOutput);
	/** Fees */
	fees: FeeOutput[] | null;
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs: ExtraCostOutput[];
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

/**
 * DurationExpense
 * A cost per unit of the priced event's own length — a night of a stay, a
 * day of a guide. ``rate`` prices one unit at the context headcount and
 * ``context.duration`` scales it; no duration prices at zero, so the publish
 * gate insists on one wherever this strategy is allowed.
 */
export interface DurationExpenseInput {
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
	/**
	 * Rate
	 * How one unit of the duration is priced.
	 */
	rate:
		| ({
				typ: "fixed";
		  } & FixedExpenseInput)
		| ({
				typ: "per_group";
		  } & PerGroupExpenseInput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseInput);
}

/**
 * DurationExpense
 * A cost per unit of the priced event's own length — a night of a stay, a
 * day of a guide. ``rate`` prices one unit at the context headcount and
 * ``context.duration`` scales it; no duration prices at zero, so the publish
 * gate insists on one wherever this strategy is allowed.
 */
export interface DurationExpenseOutput {
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
	/**
	 * Rate
	 * How one unit of the duration is priced.
	 */
	rate:
		| ({
				typ: "fixed";
		  } & FixedExpenseOutput)
		| ({
				typ: "per_group";
		  } & PerGroupExpenseOutput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseOutput);
}

/**
 * Empty
 * The half a type states nothing in: a supplementary entry's plan, an
 * information entry's spec.
 */
export type Empty = object;

/** EmptyDetailsPub */
export interface EmptyDetailsPub {
	start_time: TimeSchema | null;
	end_time: TimeSchema | null;
}

/**
 * EventEditOp
 * Append-only revision log. CREATE and UPDATE carry the full snapshot event
 * UPDATE and DELETE name the existing snapshot event by ``target_id``. ``seq`` is the order and
 * ``at`` the server-set time — together they answer "how many / how long".
 * OVERRIDE carries the negotiated deviation for ``target_id`` — ``None``
 * clears it — and names an OPTIONS alternative by ``option_index``, the same
 * positional key the rest of the snapshot layer uses.
 * ``actor_id``/``actor_name`` freeze who committed the edit — the display name
 * is pinned at write time like everything else in the snapshot, so later staff
 * renames never rewrite history. Edits recorded before actors existed carry
 * ``None``.
 */
export interface EventEditOpOutput {
	op: EditOp;
	/** Seq */
	seq: number;
	/**
	 * At
	 * @format date-time
	 */
	at: string;
	/** Target Id */
	target_id: string | null;
	event: OrderTourEventSchemaOutput | null;
	/** Override */
	override:
		| (
				| ({
						typ: "activity";
				  } & ActivityOverrideOutput)
				| ({
						typ: "bus";
				  } & BusOverrideOutput)
				| ({
						typ: "flight";
				  } & RouteOverrideOutput)
				| ({
						typ: "housing";
				  } & HotelOverrideOutput)
				| ({
						typ: "train";
				  } & RouteOverrideOutput)
				| ({
						typ: "transfer";
				  } & TransferOverrideOutput)
		  )
		| null;
	/** Option Index */
	option_index: number | null;
	/** Actor Id */
	actor_id: string | null;
	/** Actor Name */
	actor_name: string | null;
}

/** EventImageModel */
export interface EventImageModel {
	/** Image Path */
	image_path: string;
	/** Is Primary */
	is_primary: boolean;
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
}

/**
 * EventImagePubSchema
 * One picture, wherever it hangs: an event slot, a room, a dish, or the
 * supplier product the event reads from. The row id is dropped — internal
 * identifiers never cross the boundary.
 */
export interface EventImagePubSchema {
	/** Image Path */
	image_path: string;
	/**
	 * Is Primary
	 * @default false
	 */
	is_primary: boolean;
}

/**
 * EventImageSchema
 * One image attached to an event slot, in the shape ``GET
 * /{tour_id}/event/{event_id}/images/all`` returns.
 *
 * Check: `src.tour.event.images.router.list_event_images`,
 * `src.tour.event.images.router.upload_event_images`.
 */
export interface EventImageSchema {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Path */
	image_path: string;
	/** Is Primary */
	is_primary: boolean;
}

/** EventLibraryListResponse */
export interface EventLibraryListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: EventLibraryResponse[];
}

/** EventLibraryResponse */
export interface EventLibraryResponse {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Event */
	event:
		| ({
				typ: "activity";
		  } & ActivityEventTypeReadOutput)
		| ({
				typ: "bus";
		  } & BusEventTypeReadOutput)
		| ({
				typ: "flight";
		  } & FlightEventTypeReadOutput)
		| ({
				typ: "guide";
		  } & GuideEventTypeReadOutput)
		| ({
				typ: "housing";
		  } & HousingEventTypeReadOutput)
		| ({
				typ: "ref";
		  } & InformationEventTypeReadOutput)
		| ({
				typ: "supplementary";
		  } & SupplementaryEventTypeReadOutput)
		| ({
				typ: "train";
		  } & TrainEventTypeReadOutput)
		| ({
				typ: "transfer";
		  } & TransferEventTypeReadOutput);
	/** Image Paths */
	image_paths: string[];
	/** Primary Image Path */
	primary_image_path: string | null;
}

/**
 * EventLine
 * One event slot on a summary line: the slot id and its full payload.
 *
 * Check
 *
 * - ``/tour/{id}/option/{id}/summary`` for the quote these appear in
 */
export interface EventLineOutput {
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Event */
	event:
		| (
				| ({
						typ: "activity";
				  } & ActivitySingleEventReadOutput)
				| ({
						typ: "bus";
				  } & BusSingleEventReadOutput)
				| ({
						typ: "flight";
				  } & FlightSingleEventReadOutput)
				| ({
						typ: "guide";
				  } & GuideSingleEventReadOutput)
				| ({
						typ: "housing";
				  } & HousingSingleEventReadOutput)
				| ({
						typ: "ref";
				  } & InformationSingleEventReadOutput)
				| ({
						typ: "supplementary";
				  } & SupplementarySingleEventReadOutput)
				| ({
						typ: "train";
				  } & TrainSingleEventReadOutput)
				| ({
						typ: "transfer";
				  } & TransferSingleEventReadOutput)
		  )
		| MultiEventReadOutput;
}

/** EventOptionalSchema */
export interface EventOptionalSchema {
	/** Is Optional */
	is_optional: boolean;
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

/**
 * EventVarianceLine
 * One event's planned spend against what the operator actually committed.
 *
 * ``planned_min``/``planned_max`` come off the frozen snapshot; ``accrued`` is
 * what the operator entered as the real supplier cost; ``settled`` is the part
 * of it marked paid with a receipt attached. ``variance`` is
 * ``planned_max - accrued`` — positive means the event came in under its
 * planned budget, negative means it overran.
 *
 * ``payment_id`` addresses the seeded supplier payment row backing this event —
 * one per ``(booking_id, event_id)`` — so the line opens straight into
 * ``/operator/supplier-payment/{payment_id}``. It is ``None`` only while the
 * booking is unconfirmed and no payment has been seeded yet.
 *
 * Check:
 * - ``GET /booking/order/operator/{booking_id}/financials`` for order totals
 * - ``GET /operator/supplier-payment/{payment_id}`` for the payment detail
 */
export interface EventVarianceLineOutput {
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Payment Id */
	payment_id: string | null;
	/** Event Name */
	event_name: string | null;
	event_typ: EventTypes | null;
	/**
	 * Date
	 * @format date
	 */
	date: string;
	/**
	 * Planned Min
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_min: string;
	/**
	 * Planned Max
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_max: string;
	/**
	 * Accrued
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	accrued: string;
	/**
	 * Settled
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	settled: string;
	/**
	 * Payable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	payable: string;
	/**
	 * Variance
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	variance: string;
}

/** EventVarianceResponse */
export interface EventVarianceResponse {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Order Number */
	order_number: string;
	currency: Currency;
	/**
	 * Planned Total Min
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_total_min: string;
	/**
	 * Planned Total Max
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_total_max: string;
	/**
	 * Accrued Total
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	accrued_total: string;
	/**
	 * Settled Total
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	settled_total: string;
	/**
	 * Variance Total
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	variance_total: string;
	/** Events */
	events: EventVarianceLineOutput[];
}

/** ExcludedDateCreate */
export interface ExcludedDateCreate {
	/**
	 * Value
	 * @format date
	 */
	value: string;
}

/** ExcludedDateModel */
export interface ExcludedDateModel {
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

/** ExcludedDatesBulkCreate */
export interface ExcludedDatesBulkCreate {
	/**
	 * Dates
	 * @minItems 1
	 */
	dates: string[];
}

/** ExcludedDatesBulkDelete */
export interface ExcludedDatesBulkDelete {
	/**
	 * Date Ids
	 * @minItems 1
	 */
	date_ids: string[];
}

/**
 * ExtraCost
 * One named cost line riding inside a charge — a bed added to a room, a
 * permit added to a visit. It prices on the same context the charge does, so a
 * per-person line scales with the group and a per-duration one with the nights
 * the charge covers.
 */
export interface ExtraCostInput {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Expense
	 * How this line prices.
	 */
	expense:
		| ({
				typ: "fixed";
		  } & FixedExpenseInput)
		| ({
				typ: "per_duration";
		  } & DurationExpenseInput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseInput);
}

/**
 * ExtraCost
 * One named cost line riding inside a charge — a bed added to a room, a
 * permit added to a visit. It prices on the same context the charge does, so a
 * per-person line scales with the group and a per-duration one with the nights
 * the charge covers.
 */
export interface ExtraCostOutput {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Expense
	 * How this line prices.
	 */
	expense:
		| ({
				typ: "fixed";
		  } & FixedExpenseOutput)
		| ({
				typ: "per_duration";
		  } & DurationExpenseOutput)
		| ({
				typ: "per_person";
		  } & PerPersonExpenseOutput);
}

/**
 * Fare
 * One fare class of a whole-route: named, not priced — the leg is charged
 * once whatever seats it fills. Echo ``id`` to keep the fare the same fare;
 * one sent without an id is minted here.
 */
export interface Fare {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Name */
	name?: string | null;
}

/**
 * FareChargeOverride
 * What one fare class costs this tour.
 */
export interface FareChargeOverrideInput {
	/**
	 * Fare Id
	 * @format uuid
	 */
	fare_id: string;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * FareChargeOverride
 * What one fare class costs this tour.
 */
export interface FareChargeOverrideOutput {
	/**
	 * Fare Id
	 * @format uuid
	 */
	fare_id: string;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
}

/**
 * FareChargeSwitch
 * What a seat in one fare class costs once the route charges by fare.
 */
export interface FareChargeSwitch {
	/**
	 * Variant Id
	 * @format uuid
	 */
	variant_id: string;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * FareChargesOverride
 * The fare classes this tour repriced, each named once.
 */
export interface FareChargesOverrideInput {
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
	/**
	 * Fares
	 * @minItems 1
	 */
	fares: FareChargeOverrideInput[];
}

/**
 * FareChargesOverride
 * The fare classes this tour repriced, each named once.
 */
export interface FareChargesOverrideOutput {
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
	/**
	 * Fares
	 * @minItems 1
	 */
	fares: FareChargeOverrideOutput[];
}

/**
 * FareCreate
 * One fare class of a per-fare route as a create takes it: what a seat in
 * it costs, and no ``id`` — the fare is minted with the route.
 */
export interface FareCreate {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * Fee
 * One internal fee line riding along with a cost — operator-side
 * bookkeeping, never agency-facing. A fee carries no fee of its own.
 */
export interface FeeInput {
	/** Name */
	name?: string | null;
	cost?: MonetaryValueSchema | null;
	/** Description */
	description?: string | null;
}

/**
 * Fee
 * One internal fee line riding along with a cost — operator-side
 * bookkeeping, never agency-facing. A fee carries no fee of its own.
 */
export interface FeeOutput {
	/** Name */
	name: string | null;
	cost: MonetaryValueSchema | null;
	/** Description */
	description: string | null;
}

/**
 * FixedCharge
 * A fixed cost together with its own fee and markup.
 */
export interface FixedChargeInput {
	/**
	 * Typ
	 * @default "fixed"
	 */
	typ: "fixed";
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
	/** Fees */
	fees?: FeeInput[] | null;
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs?: ExtraCostInput[];
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
 * FixedCharge
 * A fixed cost together with its own fee and markup.
 */
export interface FixedChargeOutput {
	/**
	 * Typ
	 * @default "fixed"
	 */
	typ: "fixed";
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
	/** Fees */
	fees: FeeOutput[] | null;
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs: ExtraCostOutput[];
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
	typ: "fixed";
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
	typ: "fixed";
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
 * FlightDetails
 * An air leg as it reads.
 */
export interface FlightDetailsOutput {
	/**
	 * When a rail or air leg this tour runs leaves and lands.
	 *
	 * The hours are the operator's own statement, not the supplier's: a route
	 * carries a timetable only if its supplier publishes one, and one stated here
	 * is what the leg runs to regardless. Event-level on purpose: a route's legs
	 * carry no ids to align a per-leg list against.
	 */
	plan: Schedule;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & RouteProductSupplyOutput);
	/**
	 * Spec
	 * How the route prices a leg.
	 */
	spec:
		| ({
				pricing: "per_fare";
		  } & PerFareFlightRouteOutput)
		| ({
				pricing: "whole";
		  } & WholeFlightRouteOutput);
}

/**
 * FlightDetailsPubSchema
 * A flight as a traveller sees it: the legs it flies and the fare classes
 * it sells, whoever sells the seat.
 */
export interface FlightDetailsPubSchemaOutput {
	/**
	 * Name
	 * The route's own name
	 */
	name: string | null;
	/** Hop */
	hop: FlightHopPubSchemaOutput[];
	/** Images */
	images: EventImagePubSchema[];
}

/**
 * FlightDetailsWrite
 * An air leg as the API takes it.
 */
export interface FlightDetailsWrite {
	/**
	 * When a rail or air leg this tour runs leaves and lands.
	 *
	 * The hours are the operator's own statement, not the supplier's: a route
	 * carries a timetable only if its supplier publishes one, and one stated here
	 * is what the leg runs to regardless. Event-level on purpose: a route's legs
	 * carry no ids to align a per-leg list against.
	 */
	plan?: Schedule;
	/** Supply */
	supply?:
		| (
				| ({
						source: "inline";
				  } & FlightInlineSupplyNew)
				| ({
						source: "product";
				  } & ProductSupplyNew)
		  )
		| null;
}

/** FlightEvent */
export interface FlightEvent {
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
	/** An air leg as the API takes it. */
	details: FlightDetailsWrite;
}

/** FlightEventPubRead */
export interface FlightEventPubReadOutput {
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Day */
	day: number | null;
	/** Position */
	position: number | null;
	/** Is Optional */
	is_optional: boolean | null;
	/** Images */
	images: EventImagePubSchema[];
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
	details: FlightDetailsPubSchemaOutput | null;
}

/** FlightEventTypeRead */
export interface FlightEventTypeReadOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
	/** An air leg as it reads. */
	details: FlightDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * FlightHopPubSchema
 * One leg of a flight: which flight, between which airports, at what hours
 * and on what dates.
 *
 * An airline's route carries airports but no timetable, so the hours the tour
 * states land on the first departure and the last arrival.
 */
export interface FlightHopPubSchemaOutput {
	/** Airline Code */
	airline_code: string | null;
	/** Flight Number */
	flight_number: number | null;
	/** Departure Airport Code */
	departure_airport_code: string | null;
	/** Arrival Airport Code */
	arrival_airport_code: string | null;
	/** Departure Location */
	departure_location:
		| LocationOutSchema
		| LocationRefSchema
		| LocationInSchema
		| null;
	/** Arrival Location */
	arrival_location:
		| LocationOutSchema
		| LocationRefSchema
		| LocationInSchema
		| null;
	/** Departure Terminal */
	departure_terminal: string | null;
	/** Departure Gate */
	departure_gate: string | null;
	/** Amenities */
	amenities: AmenitiesTypes[];
	departure_time: TimeSchema | null;
	arrival_time: TimeSchema | null;
	/** Departure Date */
	departure_date: string | null;
	/** Arrival Date */
	arrival_date: string | null;
}

/**
 * FlightInlineSupplyNew
 * An air leg the operator describes and prices itself, as the API takes it.
 */
export interface FlightInlineSupplyNew {
	/**
	 * Source
	 * @default "inline"
	 */
	source: "inline";
	/** Supplier Id */
	supplier_id?: string | null;
	/**
	 * Spec
	 * How the route prices a leg.
	 */
	spec:
		| ({
				pricing: "per_fare";
		  } & PerFareFlightRouteInput)
		| ({
				pricing: "whole";
		  } & WholeFlightRouteInput);
}

/**
 * FlightLeg
 * One leg of an airline's route: which flight, between which airports.
 *
 * No hours live here. A route is an identity — an airline code, a number and
 * two airports — while a timetable belongs to a date, so the tour states the
 * hours it flies.
 */
export interface FlightLegInput {
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
		| LocationOutSchema
		| LocationRefSchema
		| LocationInSchema
		| null;
	/** Arrival Location */
	arrival_location?:
		| LocationOutSchema
		| LocationRefSchema
		| LocationInSchema
		| null;
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
	 * Amenities available on this flight.
	 */
	amenities?: AmenitiesTypes[];
}

/**
 * FlightLeg
 * One leg of an airline's route: which flight, between which airports.
 *
 * No hours live here. A route is an identity — an airline code, a number and
 * two airports — while a timetable belongs to a date, so the tour states the
 * hours it flies.
 */
export interface FlightLegOutput {
	/**
	 * Airline Code
	 * IATA or ICAO airline code (2–3 letters/numbers, uppercase)
	 */
	airline_code: string | null;
	/**
	 * Flight Number
	 * Flight number (1–4 digits)
	 */
	flight_number: number | null;
	/**
	 * Departure Airport Code
	 * Departure airport IATA code (3 uppercase letters)
	 */
	departure_airport_code: string | null;
	/**
	 * Arrival Airport Code
	 * Arrival airport IATA code (3 uppercase letters)
	 */
	arrival_airport_code: string | null;
	/** Departure Location */
	departure_location:
		| LocationOutSchema
		| LocationRefSchema
		| LocationInSchema
		| null;
	/** Arrival Location */
	arrival_location:
		| LocationOutSchema
		| LocationRefSchema
		| LocationInSchema
		| null;
	/**
	 * Departure Terminal
	 * Departure terminal (e.g., '1', 'T2', 'A')
	 */
	departure_terminal: string | null;
	/**
	 * Departure Gate
	 * Departure gate (e.g., 'A12', 'B3')
	 */
	departure_gate: string | null;
	/**
	 * Amenities
	 * Amenities available on this flight.
	 */
	amenities: AmenitiesTypes[];
}

/** FlightProductCreate */
export interface FlightProductCreate {
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
	/**
	 * Details
	 * How the route prices a leg.
	 */
	details:
		| ({
				pricing: "per_fare";
		  } & PerFareFlightCreate)
		| ({
				pricing: "whole";
		  } & WholeFlightCreate);
}

/** FlightProductRead */
export interface FlightProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/** Name */
	name: string;
	/** Image Paths */
	image_paths: string[];
	/** Primary Image Path */
	primary_image_path: string | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
	/**
	 * Spec
	 * How the route prices a leg.
	 */
	spec:
		| ({
				pricing: "per_fare";
		  } & PerFareFlightRouteOutput)
		| ({
				pricing: "whole";
		  } & WholeFlightRouteOutput);
}

/** FlightProductUpdate */
export interface FlightProductUpdate {
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
	/**
	 * Details
	 * How the route prices a leg.
	 */
	details?:
		| (
				| ({
						pricing: "per_fare";
				  } & PerFareFlightDetails)
				| ({
						pricing: "whole";
				  } & WholeFlightDetails)
		  )
		| null;
}

/** FlightSingleEvent */
export interface FlightSingleEvent {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
	/** An air leg as the API takes it. */
	details: FlightDetailsWrite;
}

/** FlightSingleEventRead */
export interface FlightSingleEventReadOutput {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
	/** An air leg as it reads. */
	details: FlightDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * FocPolicy
 * Tiered free-of-charge allowance — each tier frees the pax above its base,
 * capped at that tier's ``free``, and the tiers' max applies (never dips, keeps at
 * least the base paying). ``[10->1, 30->3]``: 25 pax -> 1 free, 33 -> 3, 50 -> 3.
 */
export interface FocPolicy {
	/**
	 * Tiers
	 * @minItems 1
	 */
	tiers: FocTier[];
}

/**
 * FocTier
 * One free-of-charge threshold: ``min_pax`` are the paying base, above which up
 * to ``free`` extra heads ride free (so full ``free`` needs ``min_pax + free``).
 */
export interface FocTier {
	/**
	 * Min Pax
	 * Paying base; free pax count from here up.
	 * @min 1
	 */
	min_pax: number;
	/**
	 * Free
	 * Max free pax granted above the base.
	 * @min 1
	 */
	free: number;
}

/**
 * FoodActivityPubSchema
 * A meal, and the only kind with a payload of its own today: what the venue
 * serves.
 */
export interface FoodActivityPubSchemaOutput {
	/**
	 * Name
	 * The venue's own name
	 */
	name: string | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	start_time: TimeSchema | null;
	end_time: TimeSchema | null;
	/** Images */
	images: EventImagePubSchema[];
	/**
	 * Typ
	 * @default "food"
	 */
	typ: "food";
	/** Offerings */
	offerings: FoodOfferingPubSchemaOutput[];
}

/**
 * FoodOffering
 * One set menu of a food venue: what it costs and what is on it. Echo
 * ``id`` to keep the offering the same offering; one sent without an id is
 * minted here.
 */
export interface FoodOfferingInput {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Name */
	name?: string | null;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/** Menu */
	menu?: MenuItem[];
}

/**
 * FoodOffering
 * One set menu of a food venue: what it costs and what is on it. Echo
 * ``id`` to keep the offering the same offering; one sent without an id is
 * minted here.
 */
export interface FoodOfferingOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
	/** Menu */
	menu: MenuItem[];
}

/**
 * FoodOfferingPubSchema
 * One thing a food venue serves — a set menu, a tasting — price stripped.
 * A tour that describes the meal itself has a single unnamed offering; a venue
 * read off a supplier names each of its own.
 */
export interface FoodOfferingPubSchemaOutput {
	/** Name */
	name: string | null;
	/** Menu */
	menu: MenuItemPubSchema[];
}

/**
 * FoodVenue
 * A venue that feeds a group: its offerings are set menus.
 */
export interface FoodVenueInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Name */
	name?: string | null;
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Sub Typ
	 * @default "food"
	 */
	sub_typ: "food";
	/** Offerings */
	offerings?: FoodOfferingInput[];
}

/**
 * FoodVenue
 * A venue that feeds a group: its offerings are set menus.
 */
export interface FoodVenueOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Name */
	name: string | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Sub Typ
	 * @default "food"
	 */
	sub_typ: "food";
	/** Offerings */
	offerings: FoodOfferingOutput[];
}

/** FrozenFxRate */
export interface FrozenFxRateOutput {
	from_currency: Currency;
	to_currency: Currency;
	/**
	 * Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	rate: string;
}

/** FrozenTourFin */
export interface FrozenTourFinOutput {
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
	foc: FocPolicy | null;
}

/** FrozenTourMeta */
export interface FrozenTourMeta {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Title */
	title: string | null;
	/** Slug */
	slug: string | null;
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

/**
 * FrozenTourOption
 * ``markup`` is the option-level override frozen at booking time; snapshot
 * pricing resolves it before the tour-level markup, so later option edits
 * never change this booking.
 */
export interface FrozenTourOptionOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Cover Image Path */
	cover_image_path: string | null;
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

/** FullScheduleSchema */
export interface FullScheduleSchema {
	schedule: TourScheduleModel;
	/** Fixed Dates */
	fixed_dates: FixedDateModel[];
	/** Excluded Dates */
	excluded_dates: ExcludedDateModel[];
	/** Recurrence Rules */
	recurrence_rules: RecurrenceDateModel[];
	/**
	 * Occurrences
	 * Materialised bookable dates (fixed ∪ recurrence) − excluded, within the requested window.
	 */
	occurrences: string[];
	/**
	 * Window From
	 * @format date
	 */
	window_from: string;
	/**
	 * Window Until
	 * @format date
	 */
	window_until: string;
}

/** FxRateCreateSchema */
export interface FxRateCreateSchema {
	from_currency: Currency;
	to_currency: Currency;
	/** Rate */
	rate: number | string;
}

/**
 * FxRateUpdateSchema
 * Correct a recorded rate in place. The currency pair is immutable — a
 * different pair is a different ledger entry, so record a new one.
 */
export interface FxRateUpdateSchema {
	/** Rate */
	rate: number | string;
}

/**
 * GeneralActivityPubSchema
 * Every kind that has nothing to say beyond the base. The tag is spelled out
 * member by member because the union discriminates on it — a new
 * ``ActivityType`` is added here, or given its own arm once it has a payload.
 */
export interface GeneralActivityPubSchemaOutput {
	/**
	 * Name
	 * The venue's own name
	 */
	name: string | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	start_time: TimeSchema | null;
	end_time: TimeSchema | null;
	/** Images */
	images: EventImagePubSchema[];
	/**
	 * Typ
	 * @default "other"
	 */
	typ: GeneralActivityPubSchemaOutputTypEnum;
}

/**
 * GeneralVenue
 * Every other venue — a museum, a workshop, a ride: its offerings are
 * priced tickets.
 */
export interface GeneralVenueInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Name */
	name?: string | null;
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Sub Typ */
	sub_typ: GeneralVenueInputSubTypEnum;
	/** Offerings */
	offerings?: TicketedOfferingInput[];
}

/**
 * GeneralVenue
 * Every other venue — a museum, a workshop, a ride: its offerings are
 * priced tickets.
 */
export interface GeneralVenueOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Name */
	name: string | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Sub Typ */
	sub_typ: GeneralVenueOutputSubTypEnum;
	/** Offerings */
	offerings: TicketedOfferingOutput[];
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
	name: string | null;
	/** City */
	city: string | null;
	/** Street */
	street: string | null;
	/** Housenumber */
	housenumber: string | null;
	/** Postcode */
	postcode: string | null;
	/** State */
	state: string | null;
	/** Country */
	country: string | null;
	/** Country Code */
	country_code: string | null;
}

/**
 * GroupSizeTier
 * One group-size pricing step: the flat ``cost`` applies to any headcount
 * from the previous tier's bound + 1 up to ``up_to_pax`` inclusive.
 */
export interface GroupSizeTierInput {
	/**
	 * Up To Pax
	 * Inclusive upper headcount bound.
	 * @min 1
	 */
	up_to_pax: number;
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
 * GroupSizeTier
 * One group-size pricing step: the flat ``cost`` applies to any headcount
 * from the previous tier's bound + 1 up to ``up_to_pax`` inclusive.
 */
export interface GroupSizeTierOutput {
	/**
	 * Up To Pax
	 * Inclusive upper headcount bound.
	 * @min 1
	 */
	up_to_pax: number;
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

/** GroupTemplate */
export interface GroupTemplate {
	/** Name */
	name: string;
	/** Permissions */
	permissions: Permissions[];
}

/**
 * GuideByLanguageCategory
 * One language's guide price: flat for the engagement, or per day through
 * ``DurationCharge`` — its ``rate`` is where the group-size tiers live.
 */
export interface GuideByLanguageCategoryInput {
	lang?: LanguageCode | null;
	/**
	 * Expenses
	 * As a whole, or per unit of the event's own length.
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedChargeInput)
				| ({
						typ: "per_duration";
				  } & DurationChargeInput)
		  )
		| null;
}

/**
 * GuideByLanguageCategory
 * One language's guide price: flat for the engagement, or per day through
 * ``DurationCharge`` — its ``rate`` is where the group-size tiers live.
 */
export interface GuideByLanguageCategoryOutput {
	lang: LanguageCode | null;
	/**
	 * Expenses
	 * As a whole, or per unit of the event's own length.
	 */
	expenses:
		| (
				| ({
						typ: "fixed";
				  } & FixedChargeOutput)
				| ({
						typ: "per_duration";
				  } & DurationChargeOutput)
		  )
		| null;
}

/**
 * GuideDetails
 * A guide as it reads.
 */
export interface GuideDetailsOutput {
	/** How long a guide is engaged for. */
	plan: GuidePlan;
	/**
	 * An event that states its own spec: nothing is linked, so the only thing
	 * left to name is the supplier it is bought from.
	 */
	supply: InlineSupply;
	/**
	 * A guide as the event states it. No supplier product backs a guide, so the
	 * spec is always the tour's own.
	 */
	spec: GuideSpecOutput;
}

/**
 * GuideDetailsWrite
 * A guide as the API takes it.
 */
export interface GuideDetailsWrite {
	/** How long a guide is engaged for. */
	plan?: GuidePlan;
	/**
	 * A guide is always the tour's own: no product supplies one, so the supply
	 * carries the spec and whoever it is bought from.
	 */
	supply: GuideInlineSupplyNew;
}

/** GuideEvent */
export interface GuideEvent {
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "guide"
	 */
	typ: "guide";
	/** A guide as the API takes it. */
	details: GuideDetailsWrite;
}

/** GuideEventTypeRead */
export interface GuideEventTypeReadOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "guide"
	 */
	typ: "guide";
	/** A guide as it reads. */
	details: GuideDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * GuideInlineSupplyNew
 * A guide is always the tour's own: no product supplies one, so the supply
 * carries the spec and whoever it is bought from.
 */
export interface GuideInlineSupplyNew {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
	/** Supplier Id */
	supplier_id?: string | null;
	/**
	 * A guide as the event states it. No supplier product backs a guide, so the
	 * spec is always the tour's own.
	 */
	spec: GuideSpecInput;
}

/**
 * GuidePlan
 * How long a guide is engaged for.
 */
export interface GuidePlan {
	/**
	 * Duration
	 * Length of guide activity in days
	 */
	duration?: number | null;
}

/** GuideSingleEvent */
export interface GuideSingleEvent {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "guide"
	 */
	typ: "guide";
	/** A guide as the API takes it. */
	details: GuideDetailsWrite;
}

/** GuideSingleEventRead */
export interface GuideSingleEventReadOutput {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "guide"
	 */
	typ: "guide";
	/** A guide as it reads. */
	details: GuideDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * GuideSpec
 * A guide as the event states it. No supplier product backs a guide, so the
 * spec is always the tour's own.
 */
export interface GuideSpecInput {
	/** Name */
	name?: string | null;
	/**
	 * Typ Tiers
	 * Guide kind stepped by group size; the last tier is open-ended.
	 */
	typ_tiers?: GuideTypeTier[];
	/** Categories */
	categories?: GuideByLanguageCategoryInput[];
}

/**
 * GuideSpec
 * A guide as the event states it. No supplier product backs a guide, so the
 * spec is always the tour's own.
 */
export interface GuideSpecOutput {
	/** Name */
	name: string | null;
	/**
	 * Typ Tiers
	 * Guide kind stepped by group size; the last tier is open-ended.
	 */
	typ_tiers: GuideTypeTier[];
	/** Categories */
	categories: GuideByLanguageCategoryOutput[];
}

/**
 * GuideTypeTier
 * One guide-staffing step: ``typ`` applies to any headcount from the
 * previous tier's bound + 1 up to ``up_to_pax`` inclusive.
 */
export interface GuideTypeTier {
	/**
	 * Up To Pax
	 * Inclusive upper headcount bound.
	 * @min 1
	 */
	up_to_pax: number;
	typ: GuideType;
}

/** HTTPValidationError */
export interface HTTPValidationError {
	/** Detail */
	detail: ValidationError[];
}

/**
 * HotelOverride
 * What one tour negotiated away from a hotel product's own terms: the
 * check-in rules, the rates, or both. Only the negotiable half is
 * representable — a hotel's location or stars are facts about the hotel, and a
 * wrong one means the product is wrong, not the tour.
 */
export interface HotelOverrideInput {
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
	policy?: HotelPolicySchemaInput | null;
	/**
	 * Rates
	 * The arm the hotel prices in.
	 */
	rates?:
		| (
				| ({
						pricing: "per_room";
				  } & RoomRatesOverrideInput)
				| ({
						pricing: "whole";
				  } & WholePriceOverrideInput)
		  )
		| null;
}

/**
 * HotelOverride
 * What one tour negotiated away from a hotel product's own terms: the
 * check-in rules, the rates, or both. Only the negotiable half is
 * representable — a hotel's location or stars are facts about the hotel, and a
 * wrong one means the product is wrong, not the tour.
 */
export interface HotelOverrideOutput {
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
	policy: HotelPolicySchemaOutput | null;
	/**
	 * Rates
	 * The arm the hotel prices in.
	 */
	rates:
		| (
				| ({
						pricing: "per_room";
				  } & RoomRatesOverrideOutput)
				| ({
						pricing: "whole";
				  } & WholePriceOverrideOutput)
		  )
		| null;
}

/**
 * HotelPolicySchema
 * Standard check-in/check-out hours plus the bands billed on either side of
 * them. An unset cutoff switches that half of the check off.
 */
export interface HotelPolicySchemaInput {
	/** Check In From */
	check_in_from?: string | null;
	/** Check Out Until */
	check_out_until?: string | null;
	/** Early Check In */
	early_check_in?: SupplierPolicyBandInput[];
	/** Late Check Out */
	late_check_out?: SupplierPolicyBandInput[];
}

/**
 * HotelPolicySchema
 * Standard check-in/check-out hours plus the bands billed on either side of
 * them. An unset cutoff switches that half of the check off.
 */
export interface HotelPolicySchemaOutput {
	/** Check In From */
	check_in_from: string | null;
	/** Check Out Until */
	check_out_until: string | null;
	/** Early Check In */
	early_check_in: SupplierPolicyBandOutput[];
	/** Late Check Out */
	late_check_out: SupplierPolicyBandOutput[];
}

/** HotelProductCreate */
export interface HotelProductCreate {
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ: "hotel";
	/**
	 * Details
	 * Where the hotel's price sits.
	 */
	details:
		| ({
				pricing: "per_room";
		  } & PerRoomHotelCreate)
		| ({
				pricing: "whole";
		  } & WholeHotelCreate);
}

/** HotelProductRead */
export interface HotelProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/** Name */
	name: string;
	/** Image Paths */
	image_paths: string[];
	/** Primary Image Path */
	primary_image_path: string | null;
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ: "hotel";
	/**
	 * Spec
	 * Where the hotel's price sits.
	 */
	spec:
		| ({
				pricing: "per_room";
		  } & PerRoomHotelOutput)
		| ({
				pricing: "whole";
		  } & WholeHotelOutput);
}

/**
 * HotelProductSupply
 * A stay read off a supplier's hotel: how much of it this event takes and
 * what it negotiated away from the hotel's terms.
 */
export interface HotelProductSupplyOutput {
	/**
	 * Source
	 * @default "product"
	 */
	source: "product";
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
	/** Who a linked product is bought from, resolved on read. */
	supplier: SupplierRef;
	/**
	 * Scope
	 * How much of the product the event takes.
	 */
	scope:
		| ({
				typ: "all";
		  } & AllVariants)
		| ({
				typ: "only";
		  } & OnlyVariants);
	override: HotelOverrideOutput | null;
}

/**
 * HotelProductUpdate
 * Partial update; ``details`` replaces the whole object rather than merging.
 */
export interface HotelProductUpdate {
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ: "hotel";
	/**
	 * Details
	 * Where the hotel's price sits.
	 */
	details?:
		| (
				| ({
						pricing: "per_room";
				  } & PerRoomHotelDetails)
				| ({
						pricing: "whole";
				  } & WholeHotelDetails)
		  )
		| null;
}

/**
 * HousingDetails
 * A stay as it reads: the tour's plan, where the hotel comes from and the
 * hotel itself — stated inline or assembled from the linked product.
 */
export interface HousingDetailsOutput {
	/**
	 * How long a stay runs and at what hours — the tour's own statement,
	 * whoever supplies the hotel.
	 */
	plan: Stay;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & HotelProductSupplyOutput);
	/**
	 * Spec
	 * Where the hotel's price sits.
	 */
	spec:
		| ({
				pricing: "per_room";
		  } & PerRoomHotelOutput)
		| ({
				pricing: "whole";
		  } & WholeHotelOutput);
}

/**
 * HousingDetailsPubSchema
 * A stay as a traveller sees it: where they sleep, how it is rated, how
 * long they stay and which rooms are on offer.
 */
export interface HousingDetailsPubSchemaOutput {
	/**
	 * Name
	 * The accommodation's own name
	 */
	name: string | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Stars */
	stars: number | null;
	/** Amenities */
	amenities: AmenitiesTypes[];
	/** Duration */
	duration: number | null;
	check_in: TimeSchema | null;
	check_out: TimeSchema | null;
	/** Categories */
	categories: HousingRoomCategoryPubSchemaOutput[];
	/** Images */
	images: EventImagePubSchema[];
	/** Typs */
	typs: HotelKind[];
}

/**
 * HousingDetailsWrite
 * A stay as the API takes it: the tour's plan and where the hotel comes
 * from. A create states the supply; an update of a linked row may leave it
 * out to keep the link exactly where it is.
 */
export interface HousingDetailsWrite {
	/**
	 * How long a stay runs and at what hours — the tour's own statement,
	 * whoever supplies the hotel.
	 */
	plan?: Stay;
	/** Supply */
	supply?:
		| (
				| ({
						source: "inline";
				  } & HousingInlineSupplyNew)
				| ({
						source: "product";
				  } & ProductSupplyNew)
		  )
		| null;
}

/** HousingEvent */
export interface HousingEvent {
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
	/**
	 * A stay as the API takes it: the tour's plan and where the hotel comes
	 * from. A create states the supply; an update of a linked row may leave it
	 * out to keep the link exactly where it is.
	 */
	details: HousingDetailsWrite;
}

/** HousingEventPubRead */
export interface HousingEventPubReadOutput {
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Day */
	day: number | null;
	/** Position */
	position: number | null;
	/** Is Optional */
	is_optional: boolean | null;
	/** Images */
	images: EventImagePubSchema[];
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
	details: HousingDetailsPubSchemaOutput | null;
}

/** HousingEventTypeRead */
export interface HousingEventTypeReadOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
	/**
	 * A stay as it reads: the tour's plan, where the hotel comes from and the
	 * hotel itself — stated inline or assembled from the linked product.
	 */
	details: HousingDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * HousingInlineSupplyNew
 * A stay the operator describes and prices itself, as the API takes it.
 */
export interface HousingInlineSupplyNew {
	/**
	 * Source
	 * @default "inline"
	 */
	source: "inline";
	/** Supplier Id */
	supplier_id?: string | null;
	/**
	 * Spec
	 * Where the hotel's price sits.
	 */
	spec:
		| ({
				pricing: "per_room";
		  } & PerRoomHotelInput)
		| ({
				pricing: "whole";
		  } & WholeHotelInput);
}

/**
 * HousingRoomCategoryPubSchema
 * One band of rooms. A stay priced per room with no bands of its own
 * arrives as a single unnamed category.
 */
export interface HousingRoomCategoryPubSchemaOutput {
	/** Name */
	name: string | null;
	/** Rooms */
	rooms: HousingRoomPubSchema[];
}

/**
 * HousingRoomPubSchema
 * One room, charge stripped. Flat across both room shapes: a categorised
 * room states ``typ``/``pax``, a per-room one states ``name``/``description``.
 */
export interface HousingRoomPubSchema {
	typ: HousingRoomTypes | null;
	/** Pax */
	pax: number | null;
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Images */
	images: EventImagePubSchema[];
}

/** HousingSingleEvent */
export interface HousingSingleEvent {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
	/**
	 * A stay as the API takes it: the tour's plan and where the hotel comes
	 * from. A create states the supply; an update of a linked row may leave it
	 * out to keep the link exactly where it is.
	 */
	details: HousingDetailsWrite;
}

/** HousingSingleEventRead */
export interface HousingSingleEventReadOutput {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
	/**
	 * A stay as it reads: the tour's plan, where the hotel comes from and the
	 * hotel itself — stated inline or assembled from the linked product.
	 */
	details: HousingDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * InformationDetails
 * An information entry as it reads.
 */
export interface InformationDetailsOutput {
	/** When the group is somewhere: an activity's hours, an information entry's. */
	plan: Times;
	/**
	 * An event that states its own spec: nothing is linked, so the only thing
	 * left to name is the supplier it is bought from.
	 */
	supply: InlineSupply;
	/**
	 * The half a type states nothing in: a supplementary entry's plan, an
	 * information entry's spec.
	 */
	spec: Empty;
}

/**
 * InformationDetailsWrite
 * An information entry as the API takes it.
 */
export interface InformationDetailsWrite {
	/** When the group is somewhere: an activity's hours, an information entry's. */
	plan?: Times;
	/**
	 * An information entry states nothing but its hours, and no product backs
	 * it, so its supply carries only who it is bought from — if anyone.
	 */
	supply?: InformationInlineSupplyNew;
}

/** InformationEvent */
export interface InformationEvent {
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
	/** An information entry as the API takes it. */
	details?: InformationDetailsWrite;
}

/** InformationEventPubRead */
export interface InformationEventPubReadOutput {
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Day */
	day: number | null;
	/** Position */
	position: number | null;
	/** Is Optional */
	is_optional: boolean | null;
	/** Images */
	images: EventImagePubSchema[];
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
	details: EmptyDetailsPub | null;
}

/** InformationEventTypeRead */
export interface InformationEventTypeReadOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
	/** An information entry as it reads. */
	details: InformationDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * InformationInlineSupplyNew
 * An information entry states nothing but its hours, and no product backs
 * it, so its supply carries only who it is bought from — if anyone.
 */
export interface InformationInlineSupplyNew {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
	/** Supplier Id */
	supplier_id?: string | null;
	/**
	 * The half a type states nothing in: a supplementary entry's plan, an
	 * information entry's spec.
	 */
	spec?: Empty;
}

/** InformationSingleEvent */
export interface InformationSingleEvent {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
	/** An information entry as the API takes it. */
	details?: InformationDetailsWrite;
}

/** InformationSingleEventRead */
export interface InformationSingleEventReadOutput {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
	/** An information entry as it reads. */
	details: InformationDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * InlineSupply
 * An event that states its own spec: nothing is linked, so the only thing
 * left to name is the supplier it is bought from.
 */
export interface InlineSupply {
	/**
	 * Source
	 * @default "inline"
	 */
	source: "inline";
	/** Supplier Id */
	supplier_id: string | null;
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
	/** Payment Details */
	payment_details:
		| (
				| ({
						typ: "classic_swift";
				  } & ClassicSwiftDetails)
				| ({
						typ: "custom";
				  } & CustomDetails)
		  )
		| null;
}

/** InvoiceGenerate */
export interface InvoiceGenerate {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/**
	 * Payment Route Id
	 * @format uuid
	 */
	payment_route_id: string;
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
	typ: InvoiceType;
	status: InvoiceStatus;
	/** Total Amount */
	total_amount: number;
	/** Paid Amount */
	paid_amount: number;
	/** Currency */
	currency: string;
	/** Issue Date */
	issue_date: string | null;
	/** Counterparty Name */
	counterparty_name: string | null;
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

/** InvoicePdfResponse */
export interface InvoicePdfResponse {
	/** Url */
	url: string;
}

/**
 * JourneyPointPubSchema
 * One end of a transport leg: where, at what hour, on what date.
 *
 * ``date`` is read-only and filled by the backend only. A tour template stays
 * reusable across every departure, so it states ``day`` + ``time``; the
 * concrete date is resolved from a booking's anchor date and is never accepted
 * from a client. Stays null on surfaces with no anchor date — the public tour
 * view and the catalog listing.
 */
export interface JourneyPointPubSchemaOutput {
	time: TimeSchema | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Date */
	date: string | null;
}

/** KeyValItem */
export interface KeyValItem {
	/** Key */
	key?: string | null;
	/** Val */
	val?: string | null;
}

/** LandingPageImageModel */
export interface LandingPageImageModel {
	/** Image Path */
	image_path: string;
	/** Is Primary */
	is_primary: boolean;
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
	languages: LanguageCode[];
	/** Pickup Type */
	pickup_type: PickupType[];
	/** Amenities Included */
	amenities_included: string[];
	/** Amenities Not Included */
	amenities_not_included: string[];
	/** Images */
	images: LandingPageImagePubSchema[];
}

/** LandingPageResponse */
export interface LandingPageResponse {
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
	/** Cancellation Policy */
	cancellation_policy: string | null;
	/** Additional Information */
	additional_information: string | null;
	/** Pickup Type */
	pickup_type: PickupType[];
	/** Amenities Included */
	amenities_included: string[];
	/** Amenities Not Included */
	amenities_not_included: string[];
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Languages */
	languages: LanguageCode[];
	/** Created At */
	created_at: string | null;
	/** Updated At */
	updated_at: string | null;
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
	/** Pickup Type */
	pickup_type?: PickupType[] | null;
	/** Amenities Included */
	amenities_included?: string[] | null;
	/** Amenities Not Included */
	amenities_not_included?: string[] | null;
}

/** LedgerEntryListResponse */
export interface LedgerEntryListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: LedgerEntryResponseOutput[];
}

/**
 * LedgerEntryResponse
 * ``flow`` is derived, not stored: ``INBOUND`` when the operator is the
 * payee, ``OUTBOUND`` when they are the payer, ``None`` for an entry between
 * two other participants that the operator's books merely observe.
 */
export interface LedgerEntryResponseOutput {
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
	/** Booking Id */
	booking_id: string | null;
	/** Order Number */
	order_number: string | null;
	/** Snapshot Event Id */
	snapshot_event_id: string | null;
	/**
	 * ``ACCRUAL`` is what was agreed and is now owed; ``SETTLEMENT`` is cash
	 * that actually moved. Debt is the difference between the two.
	 *
	 * There is exactly one accrual per source row and it is restated in place as
	 * the operator edits the agreed figure. Settlements accumulate — an invoice
	 * paid in three instalments posts three of them.
	 */
	typ: LedgerEntryType;
	/**
	 * One end of an entry. ``OPERATOR`` is a party like any other, not an
	 * implied centre — that is what lets a future entry record an agency paying a
	 * supplier directly, with the operator's books merely observing it.
	 */
	payer_typ: LedgerParty;
	/** Payer Id */
	payer_id: string | null;
	/**
	 * One end of an entry. ``OPERATOR`` is a party like any other, not an
	 * implied centre — that is what lets a future entry record an agency paying a
	 * supplier directly, with the operator's books merely observing it.
	 */
	payee_typ: LedgerParty;
	/** Payee Id */
	payee_id: string | null;
	flow: LedgerFlow | null;
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
	/**
	 * Which rail produced the entry. Bank, card and SWIFT rails append their
	 * own members here; the posting contract does not change.
	 */
	source: LedgerSource;
	/** Source Id */
	source_id: string | null;
	/**
	 * Occurred At
	 * @format date-time
	 */
	occurred_at: string;
	/** Note */
	note: string | null;
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
	/**
	 * Id
	 * Stored location id; send it back to reuse this location.
	 */
	id?: string | null;
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

/** LocationRebuildResponse */
export interface LocationRebuildResponse {
	state: RebuildState;
}

/** LocationRefSchema */
export interface LocationRefSchema {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
}

/** LocationSuggestionSchema */
export interface LocationSuggestionSchema {
	/** Value */
	value: string;
	kind: SuggestKind;
	/** City */
	city: string | null;
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
	picture: string | null;
	/** Agency Id */
	agency_id: string | null;
	/** Operator Id */
	operator_id: string | null;
}

/**
 * MenuItem
 * One dish or item of a set menu. An ``ImageBearingNode``: echo its ``id``
 * on update to keep the item's pictures.
 */
export interface MenuItem {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images?: NodeImageSchema[];
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
}

/**
 * MenuItemPubSchema
 * One dish on a food offering's menu, photos kept.
 */
export interface MenuItemPubSchema {
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Images */
	images: EventImagePubSchema[];
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

/** MoveToMultiResult */
export interface MoveToMultiResult {
	/**
	 * One event slot as the operator reads it: the slot's ids, its payload and
	 * the state of its translation. The slot's pictures are ``event.images``.
	 *
	 * Check
	 *
	 * - ``GET /tour/{tour_id}/{option_id}/event/{event_id}``
	 * - ``GET /tour/{tour_id}/event/{event_id}/images/all``
	 */
	target_event: TourEventResponse;
	/**
	 * Removed Event Id
	 * @format uuid
	 */
	removed_event_id: string;
}

/** MoveToMultiSchema */
export interface MoveToMultiSchema {
	/**
	 * Option Position
	 * Insert index among the target's alternatives, clamped to last.
	 * @min 0
	 */
	option_position: number;
}

/** MoveToSingleResult */
export interface MoveToSingleResult {
	/**
	 * One event slot as the operator reads it: the slot's ids, its payload and
	 * the state of its translation. The slot's pictures are ``event.images``.
	 *
	 * Check
	 *
	 * - ``GET /tour/{tour_id}/{option_id}/event/{event_id}``
	 * - ``GET /tour/{tour_id}/event/{event_id}/images/all``
	 */
	new_event: TourEventResponse;
	/**
	 * One event slot as the operator reads it: the slot's ids, its payload and
	 * the state of its translation. The slot's pictures are ``event.images``.
	 *
	 * Check
	 *
	 * - ``GET /tour/{tour_id}/{option_id}/event/{event_id}``
	 * - ``GET /tour/{tour_id}/event/{event_id}/images/all``
	 */
	source_event: TourEventResponse;
}

/** MultiEvent */
export interface MultiEvent {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/** Typ */
	typ: "options";
	/** Details */
	details?:
		| (
				| ({
						typ: "activity";
				  } & ActivityEvent)
				| ({
						typ: "bus";
				  } & BusEvent)
				| ({
						typ: "flight";
				  } & FlightEvent)
				| ({
						typ: "guide";
				  } & GuideEvent)
				| ({
						typ: "housing";
				  } & HousingEvent)
				| ({
						typ: "ref";
				  } & InformationEvent)
				| ({
						typ: "supplementary";
				  } & SupplementaryEvent)
				| ({
						typ: "train";
				  } & TrainEvent)
				| ({
						typ: "transfer";
				  } & TransferEvent)
		  )[]
		| null;
}

/** MultiEventPub */
export interface MultiEventPubOutput {
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Day */
	day: number | null;
	/** Position */
	position: number | null;
	/** Is Optional */
	is_optional: boolean | null;
	/** Images */
	images: EventImagePubSchema[];
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/**
	 * Typ
	 * @default "options"
	 */
	typ: "options";
	/** Details */
	details: (
		| ({
				typ: "activity";
		  } & ActivityEventPubReadOutput)
		| ({
				typ: "bus";
		  } & BusEventPubReadOutput)
		| ({
				typ: "flight";
		  } & FlightEventPubReadOutput)
		| ({
				typ: "housing";
		  } & HousingEventPubReadOutput)
		| ({
				typ: "ref";
		  } & InformationEventPubReadOutput)
		| ({
				typ: "train";
		  } & TrainEventPubReadOutput)
		| ({
				typ: "transfer";
		  } & TransferEventPubReadOutput)
	)[];
}

/**
 * MultiEventRead
 * Alternatives as stored: each carries its own id, none carry day/position
 * (those live on the slot). Empty while the choice holds none.
 */
export interface MultiEventReadOutput {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/** Typ */
	typ: "options";
	/** Details */
	details: (
		| ({
				typ: "activity";
		  } & ActivityEventTypeReadOutput)
		| ({
				typ: "bus";
		  } & BusEventTypeReadOutput)
		| ({
				typ: "flight";
		  } & FlightEventTypeReadOutput)
		| ({
				typ: "guide";
		  } & GuideEventTypeReadOutput)
		| ({
				typ: "housing";
		  } & HousingEventTypeReadOutput)
		| ({
				typ: "ref";
		  } & InformationEventTypeReadOutput)
		| ({
				typ: "supplementary";
		  } & SupplementaryEventTypeReadOutput)
		| ({
				typ: "train";
		  } & TrainEventTypeReadOutput)
		| ({
				typ: "transfer";
		  } & TransferEventTypeReadOutput)
	)[];
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

/**
 * NodeImageSchema
 * One image of a sub-document: the storage key and whether it leads.
 */
export interface NodeImageSchema {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Image Path */
	image_path: string;
	/**
	 * Is Primary
	 * @default false
	 */
	is_primary?: boolean;
}

/**
 * OfferingChargeOverride
 * What one offering costs this tour.
 */
export interface OfferingChargeOverrideInput {
	/**
	 * Offering Id
	 * @format uuid
	 */
	offering_id: string;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * OfferingChargeOverride
 * What one offering costs this tour.
 */
export interface OfferingChargeOverrideOutput {
	/**
	 * Offering Id
	 * @format uuid
	 */
	offering_id: string;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
}

/**
 * OfferingChargesOverride
 * The offerings this tour repriced, each named once.
 */
export interface OfferingChargesOverrideInput {
	/**
	 * Offerings
	 * @minItems 1
	 */
	offerings: OfferingChargeOverrideInput[];
}

/**
 * OfferingChargesOverride
 * The offerings this tour repriced, each named once.
 */
export interface OfferingChargesOverrideOutput {
	/**
	 * Offerings
	 * @minItems 1
	 */
	offerings: OfferingChargeOverrideOutput[];
}

/**
 * OnlyVariants
 * The event takes the variants it names and ignores the rest. The ids are
 * rows in ``tour_event_option_variant``, so one can only name a variant of the
 * linked product and a scoped variant cannot be deleted.
 */
export interface OnlyVariants {
	/**
	 * Typ
	 * @default "only"
	 */
	typ: "only";
	/**
	 * Ids
	 * @minItems 1
	 */
	ids: string[];
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
	/** File Name */
	file_name: string;
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
	/** Default Language */
	default_language: string;
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

/**
 * OperatorItineraryEvent
 * One booking event as the operator sees it: the full ``AnyEventRead`` with
 * every monetary field intact — the opposite of ``AnyEventPub``, which the
 * agency-facing itinerary uses.
 *
 * ``date`` lives on this wrapper rather than inside ``event`` because the
 * operator event schemas are the *write* shape persisted to JSONB; giving them
 * calendar fields would let a client pin a date onto a reusable tour template.
 * It resolves to ``booking.date + (day - 1)``.
 *
 * ``cost`` / ``markup`` / ``fees`` are this event's own share of the booking
 * price, priced off the frozen snapshot at the booking's pax and currency. They
 * read ``0`` when ``billed_via_package_id`` is set — the package is billed once
 * at the booking level instead — and when the event is DESELECTED.
 */
export interface OperatorItineraryEventOutput {
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Tour Option Id */
	tour_option_id: string | null;
	/**
	 * Date
	 * @format date
	 */
	date: string;
	/** Event */
	event:
		| (
				| ({
						typ: "activity";
				  } & ActivitySingleEventReadOutput)
				| ({
						typ: "bus";
				  } & BusSingleEventReadOutput)
				| ({
						typ: "flight";
				  } & FlightSingleEventReadOutput)
				| ({
						typ: "guide";
				  } & GuideSingleEventReadOutput)
				| ({
						typ: "housing";
				  } & HousingSingleEventReadOutput)
				| ({
						typ: "ref";
				  } & InformationSingleEventReadOutput)
				| ({
						typ: "supplementary";
				  } & SupplementarySingleEventReadOutput)
				| ({
						typ: "train";
				  } & TrainSingleEventReadOutput)
				| ({
						typ: "transfer";
				  } & TransferSingleEventReadOutput)
		  )
		| MultiEventReadOutput;
	availability: AvailabilityStatus | null;
	/** Selected Option Index */
	selected_option_index: number | null;
	guide_typ: GuideType | null;
	/** Billed Via Package Id */
	billed_via_package_id: string | null;
	cost: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
	fees: TourMinMaxCostSchemaOutput;
}

/**
 * OperatorItineraryPackage
 * A package billed once for the whole booking, listed separately so the sum
 * of the event lines plus the package lines reconciles to the totals.
 */
export interface OperatorItineraryPackageOutput {
	/**
	 * Package Id
	 * @format uuid
	 */
	package_id: string;
	/** Name */
	name: string;
	cost: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
	fees: TourMinMaxCostSchemaOutput;
}

/**
 * OperatorItineraryResponse
 * Cost-bearing itinerary for the operator's order reconciliation board.
 *
 * Events are the canonical (operator-language) snapshot copy — the same one
 * revision edits and the invoice price against — so figures here match what the
 * booking will be billed. ``display_lang`` is what the agency sees, for
 * reference only.
 *
 * Totals are pre-FOC, matching ``TourSummaryResponse`` semantics; FOC discounts
 * agency revenue only and never supplier cost, so ``cost`` is unaffected.
 */
export interface OperatorItineraryResponse {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Order Number */
	order_number: string;
	/**
	 * Date
	 * @format date
	 */
	date: string;
	/** Pax */
	pax: number;
	currency: Currency;
	display_lang: LanguageCode;
	/** Events */
	events: OperatorItineraryEventOutput[];
	/** Packages */
	packages: OperatorItineraryPackageOutput[];
	cost: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
	fees: TourMinMaxCostSchemaOutput;
	total: TourMinMaxCostSchemaOutput;
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
				typ: "custom";
		  } & CustomDetails);
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

/** OptionReorderSchema */
export interface OptionReorderSchema {
	/**
	 * Order
	 * Every alternative's id — ``details[].id`` on the read — in the new order.
	 * @minItems 2
	 */
	order: string[];
}

/** OrderAgencyInfo */
export interface OrderAgencyInfo {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string;
	/** Business Name */
	business_name: string | null;
	/** Legal Name */
	legal_name: string | null;
	/** Director Name */
	director_name: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Position */
	contact_position: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Tax Id */
	tax_id: string | null;
	/** Address Line */
	address_line: string | null;
	/** City */
	city: string | null;
	/** Country */
	country: string | null;
	/** Website Url */
	website_url: string | null;
	/** Description */
	description: string | null;
	/** Logo Url */
	logo_url: string | null;
}

/**
 * OrderOperatorInfo
 * Who to contact about this booking — the operator running the tour. Joined
 * into the listing rather than fetched per row so an agency or tourist can reach
 * the right person without a follow-up call per booking. Every field but ``id``
 * and ``name`` lives on ``operator_info``, which an operator may not have filled
 * in yet.
 */
export interface OrderOperatorInfo {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string;
	/** Business Name */
	business_name: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Position */
	contact_position: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Website Url */
	website_url: string | null;
	/** Logo Url */
	logo_url: string | null;
}

/**
 * OrderTourEventSchema
 * A snapshot event: the operator ``TourEventResponse`` plus the booking-only
 * ``origin_event_id`` that pairs a canonical event with its localized twin
 * (``events`` ↔ ``events_localized``). Kept out of the operator response so that
 * surface stays free of this booking concern.
 */
export interface OrderTourEventSchemaOutput {
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
						typ: "activity";
				  } & ActivitySingleEventReadOutput)
				| ({
						typ: "bus";
				  } & BusSingleEventReadOutput)
				| ({
						typ: "flight";
				  } & FlightSingleEventReadOutput)
				| ({
						typ: "guide";
				  } & GuideSingleEventReadOutput)
				| ({
						typ: "housing";
				  } & HousingSingleEventReadOutput)
				| ({
						typ: "ref";
				  } & InformationSingleEventReadOutput)
				| ({
						typ: "supplementary";
				  } & SupplementarySingleEventReadOutput)
				| ({
						typ: "train";
				  } & TrainSingleEventReadOutput)
				| ({
						typ: "transfer";
				  } & TransferSingleEventReadOutput)
		  )
		| MultiEventReadOutput;
	/** @default "source" */
	translation: TranslationState;
	/** Origin Event Id */
	origin_event_id: string | null;
}

/** OrderTourInfo */
export interface OrderTourInfo {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Title */
	title: string | null;
	typ: TourType;
	/** Days */
	days: number;
	/** Nights */
	nights: number;
	/** Duration Hours */
	duration_hours: number | null;
	/** Route */
	route: string[];
}

/** OrderUserInfo */
export interface OrderUserInfo {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Email */
	email: string;
	/** First Name */
	first_name: string | null;
	/** Last Name */
	last_name: string | null;
	/** Phone Number */
	phone_number: string | null;
}

/**
 * PackageBillable
 * Every event of one package, priced once for the bundle. ``min`` is zero
 * when only optional events reach the package, so the option's minimum leaves
 * it out exactly as the totals do. ``events`` is empty when the package is
 * reached only through choice alternatives — the money still sits on this line
 * so the itemization reconciles with the totals.
 *
 * Check
 *
 * - ``/tour/{id}/option/{id}/summary`` for the quote this belongs to
 * - ``/tour/{tour_id}/{option_id}/package/{package_id}`` for the package itself
 */
export interface PackageBillableOutput {
	/**
	 * Typ
	 * @default "package_bill"
	 */
	typ: "package_bill";
	/**
	 * Identity of the package a summary line bills through.
	 *
	 * Check
	 *
	 * - ``/tour/{tour_id}/{option_id}/package/{package_id}`` for the package itself
	 */
	package: PackageRef;
	/** Events */
	events: EventLineOutput[];
	cost: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
	fees: TourMinMaxCostSchemaOutput;
}

/**
 * PackageCreate
 * A package starts as a name and nothing else — the operator groups the
 * events first and prices the bundle once the supplier quotes it. An unpriced
 * package bills zero, which the publish gate refuses.
 */
export interface PackageCreate {
	/** Name */
	name: string;
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
	/** Fees */
	fees?: FeeInput[] | null;
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

/**
 * PackageRef
 * Identity of the package a summary line bills through.
 *
 * Check
 *
 * - ``/tour/{tour_id}/{option_id}/package/{package_id}`` for the package itself
 */
export interface PackageRef {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string;
}

/**
 * PackageUpdate
 * Partial update: an omitted field is left alone, an explicit ``null``
 * clears it. ``name`` is the one column that cannot be cleared.
 */
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
	/** Fees */
	fees?: FeeInput[] | null;
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

/** PartneredAgencyItem */
export interface PartneredAgencyItem {
	/**
	 * Agency Id
	 * @format uuid
	 */
	agency_id: string;
	/** Name */
	name: string;
	/** Invited Email */
	invited_email: string;
	/** Invited User Id */
	invited_user_id: string | null;
	/**
	 * Partnered At
	 * @format date-time
	 */
	partnered_at: string;
	/**
	 * Discount
	 * The markup calculation strategy.
	 */
	discount:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
	/** Business Name */
	business_name: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** City */
	city: string | null;
	/** Country */
	country: string | null;
	/** Website Url */
	website_url: string | null;
	/** Logo Url */
	logo_url: string | null;
}

/** PartneredAgencyListResponse */
export interface PartneredAgencyListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: PartneredAgencyItem[];
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

/** PaxFileRef */
export interface PaxFileRef {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** File Name */
	file_name: string;
}

/** PaxListResponse */
export interface PaxListResponse {
	/** Count */
	count: number;
	/** Data */
	data: PaxWithFiles[];
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

/** PaxWithFiles */
export interface PaxWithFiles {
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
	/**
	 * Created At
	 * @format date-time
	 */
	created_at: string;
	/**
	 * Updated At
	 * @format date-time
	 */
	updated_at: string;
	/** Files */
	files: PaxFileRef[];
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
				typ: "custom";
		  } & CustomDetails);
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
						typ: "custom";
				  } & CustomDetails)
		  )
		| null;
}

/**
 * PerCarCategoryTransfer
 * A fleet priced by the class a car is taken in: a group pays for the
 * cheapest combination of car and category that seats it.
 */
export interface PerCarCategoryTransferInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "per_car_category"
	 */
	pricing: "per_car_category";
	/** Name */
	name?: string | null;
	/** Cars */
	cars?: CategorisedCarInput[];
}

/**
 * PerCarCategoryTransfer
 * A fleet priced by the class a car is taken in: a group pays for the
 * cheapest combination of car and category that seats it.
 */
export interface PerCarCategoryTransferOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "per_car_category"
	 */
	pricing: "per_car_category";
	/** Name */
	name: string | null;
	/** Cars */
	cars: CategorisedCarOutput[];
}

/**
 * PerCarCategoryTransferCreate
 * A transfer fleet priced by the class a car is taken in, as a create takes
 * it: every car brings the classes it is sold in.
 */
export interface PerCarCategoryTransferCreate {
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
	/** Pricing */
	pricing: "per_car_category";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Cars */
	cars?: CategorisedCarWrite[];
}

/**
 * PerCarCategoryTransferDetails
 * A transfer fleet priced by the class a car is taken in, as the API takes
 * it.
 */
export interface PerCarCategoryTransferDetails {
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
	/** Pricing */
	pricing: "per_car_category";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/**
 * PerCarCategoryTransferVariantWrite
 * One car body taken in several classes, each with its own price.
 */
export interface PerCarCategoryTransferVariantWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Description */
	description?: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
	/** Pricing */
	pricing: "per_car_category";
	/** Categories */
	categories?: CarCategoryInput[];
}

/**
 * PerCarTransfer
 * A fleet priced by the car: a group pays for the cars it fills.
 */
export interface PerCarTransferInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "per_car"
	 */
	pricing: "per_car";
	/** Name */
	name?: string | null;
	/** Cars */
	cars?: PricedCarInput[];
}

/**
 * PerCarTransfer
 * A fleet priced by the car: a group pays for the cars it fills.
 */
export interface PerCarTransferOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "per_car"
	 */
	pricing: "per_car";
	/** Name */
	name: string | null;
	/** Cars */
	cars: PricedCarOutput[];
}

/**
 * PerCarTransferCreate
 * A transfer fleet priced by the car as a create takes it: its facts, its
 * arm and the car categories it opens with.
 *
 * Check: ``POST /supplier/{supplier_id}/product/{product_id}/variant`` adds a
 * car category to a fleet that already stands.
 */
export interface PerCarTransferCreate {
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
	/** Pricing */
	pricing: "per_car";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Cars */
	cars?: PricedCarWrite[];
}

/**
 * PerCarTransferDetails
 * A transfer fleet priced by the car as the API takes it.
 */
export interface PerCarTransferDetails {
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
	/** Pricing */
	pricing: "per_car";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/** PerCarTransferVariantWrite */
export interface PerCarTransferVariantWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Description */
	description?: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
	/** Pricing */
	pricing: "per_car";
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * PerFareFlightCreate
 * An air route priced by fare as a create takes it: its facts, its arm and
 * the fare classes it opens with.
 */
export interface PerFareFlightCreate {
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
	/** Pricing */
	pricing: "per_fare";
	/** Legs */
	legs?: FlightLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Fares */
	fares?: FareCreate[];
}

/**
 * PerFareFlightDetails
 * An air route priced by fare as the API takes it.
 */
export interface PerFareFlightDetails {
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
	/** Pricing */
	pricing: "per_fare";
	/** Legs */
	legs?: FlightLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/**
 * PerFareFlightRoute
 * An air route priced by the fare class a group is booked into.
 */
export interface PerFareFlightRouteInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
	/** Name */
	name?: string | null;
	/** Legs */
	legs?: FlightLegInput[];
	/** Fares */
	fares?: PricedFareInput[];
}

/**
 * PerFareFlightRoute
 * An air route priced by the fare class a group is booked into.
 */
export interface PerFareFlightRouteOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
	/** Name */
	name: string | null;
	/** Legs */
	legs: FlightLegOutput[];
	/** Fares */
	fares: PricedFareOutput[];
}

/** PerFareFlightVariantWrite */
export interface PerFareFlightVariantWrite {
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
	/** Pricing */
	pricing: "per_fare";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * PerFareTrainCreate
 * A rail route priced by fare as a create takes it: its facts, its arm and
 * the fare classes it opens with.
 *
 * Check: ``POST /supplier/{supplier_id}/product/{product_id}/variant`` adds a
 * fare to a route that already stands.
 */
export interface PerFareTrainCreate {
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
	/** Pricing */
	pricing: "per_fare";
	/** Legs */
	legs?: TrainLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Fares */
	fares?: FareCreate[];
}

/**
 * PerFareTrainDetails
 * A rail route priced by fare as the API takes it: what it stores plus the
 * name that lands on the ``name`` column.
 */
export interface PerFareTrainDetails {
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
	/** Pricing */
	pricing: "per_fare";
	/** Legs */
	legs?: TrainLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/**
 * PerFareTrainRoute
 * A rail route priced by the fare class a group is booked into.
 */
export interface PerFareTrainRouteInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
	/** Name */
	name?: string | null;
	/** Legs */
	legs?: TrainLegInput[];
	/** Fares */
	fares?: PricedFareInput[];
}

/**
 * PerFareTrainRoute
 * A rail route priced by the fare class a group is booked into.
 */
export interface PerFareTrainRouteOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
	/** Name */
	name: string | null;
	/** Legs */
	legs: TrainLegOutput[];
	/** Fares */
	fares: PricedFareOutput[];
}

/** PerFareTrainVariantWrite */
export interface PerFareTrainVariantWrite {
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
	/** Pricing */
	pricing: "per_fare";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * PerGroupExpense
 * A flat cost stepped by group size.
 *
 * Tiers are stored sorted by ``up_to_pax``; ranges are implicit (previous
 * bound + 1 .. own bound) so gaps and overlaps are unrepresentable. The last
 * tier is open-ended: any headcount above it prices at that tier. Costs must
 * share one currency and never decrease with group size — tour pricing
 * evaluates only at the pax-range endpoints, which is sound only for a
 * monotone step function.
 */
export interface PerGroupExpenseInput {
	/**
	 * Typ
	 * @default "per_group"
	 */
	typ: "per_group";
	/**
	 * Tiers
	 * @minItems 1
	 */
	tiers: GroupSizeTierInput[];
}

/**
 * PerGroupExpense
 * A flat cost stepped by group size.
 *
 * Tiers are stored sorted by ``up_to_pax``; ranges are implicit (previous
 * bound + 1 .. own bound) so gaps and overlaps are unrepresentable. The last
 * tier is open-ended: any headcount above it prices at that tier. Costs must
 * share one currency and never decrease with group size — tour pricing
 * evaluates only at the pax-range endpoints, which is sound only for a
 * monotone step function.
 */
export interface PerGroupExpenseOutput {
	/**
	 * Typ
	 * @default "per_group"
	 */
	typ: "per_group";
	/**
	 * Tiers
	 * @minItems 1
	 */
	tiers: GroupSizeTierOutput[];
}

/**
 * PerPersonCharge
 * A per-person cost together with its own fee and markup.
 */
export interface PerPersonChargeInput {
	/**
	 * Typ
	 * @default "per_person"
	 */
	typ: "per_person";
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
	/** Fees */
	fees?: FeeInput[] | null;
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs?: ExtraCostInput[];
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
 * PerPersonCharge
 * A per-person cost together with its own fee and markup.
 */
export interface PerPersonChargeOutput {
	/**
	 * Typ
	 * @default "per_person"
	 */
	typ: "per_person";
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
	/** Fees */
	fees: FeeOutput[] | null;
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs: ExtraCostOutput[];
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

/**
 * PerPersonExpense
 * A cost calculated per person.
 */
export interface PerPersonExpenseInput {
	/**
	 * Typ
	 * @default "per_person"
	 */
	typ: "per_person";
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
	typ: "per_person";
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
 * PerRoomHotel
 * A hotel whose price sits on each room: a group pays for the rooms it
 * fills, so every room in scope carries its own rate. How that rate scales is
 * the charge inside it — ``fixed`` once, ``per_duration`` per night,
 * ``per_person`` per head.
 */
export interface PerRoomHotelInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Name */
	name?: string | null;
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Stars */
	stars?: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/**
	 * Pricing
	 * @default "per_room"
	 */
	pricing: "per_room";
	/** Categories */
	categories?: PricedCategoryInput[];
}

/**
 * PerRoomHotel
 * A hotel whose price sits on each room: a group pays for the rooms it
 * fills, so every room in scope carries its own rate. How that rate scales is
 * the charge inside it — ``fixed`` once, ``per_duration`` per night,
 * ``per_person`` per head.
 */
export interface PerRoomHotelOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Name */
	name: string | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Stars */
	stars: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs: HotelKind[];
	/** Amenities */
	amenities: AmenitiesTypes[];
	/** Check-in and check-out hours and the bands billed outside them. */
	policy: HotelPolicySchemaOutput | null;
	/**
	 * Pricing
	 * @default "per_room"
	 */
	pricing: "per_room";
	/** Categories */
	categories: PricedCategoryOutput[];
}

/**
 * PerRoomHotelCreate
 * A hotel whose price sits on each room, as a create takes it: its facts,
 * its arm and the categories it opens with, every room carrying its own rate.
 *
 * Check: ``POST /supplier/{supplier_id}/product/{product_id}/variant`` adds a
 * category to a hotel that already stands.
 */
export interface PerRoomHotelCreate {
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
	/** Pricing */
	pricing: "per_room";
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Stars */
	stars?: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Categories */
	categories?: PricedCategoryWrite[];
}

/**
 * PerRoomHotelDetails
 * A hotel priced by the room as the API takes it: what it stores plus the
 * name that lands on the ``name`` column. A product states its facts rather
 * than drafting them, so its name is required where a spec's is not.
 */
export interface PerRoomHotelDetails {
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
	/** Pricing */
	pricing: "per_room";
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Stars */
	stars?: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/**
 * PerRoomHotelVariantWrite
 * One room category of a hotel priced by the room: every room carries its
 * own rate.
 */
export interface PerRoomHotelVariantWrite {
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
	/** Pricing */
	pricing: "per_room";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Rooms */
	rooms?: PricedRoomWrite[];
}

/**
 * PerVehicleBusDetails
 * A coach fleet priced by the vehicle as the API takes it: what it stores
 * plus the name that lands on the ``name`` column.
 */
export interface PerVehicleBusDetails {
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
	/** Pricing */
	pricing: "per_vehicle";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/** PerVehicleBusVariantWrite */
export interface PerVehicleBusVariantWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Description */
	description?: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
	/** Pricing */
	pricing: "per_vehicle";
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * PerVehicleFleet
 * A fleet priced by the vehicle: a group pays for the coaches it fills.
 */
export interface PerVehicleFleetInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "per_vehicle"
	 */
	pricing: "per_vehicle";
	/** Name */
	name?: string | null;
	/** Vehicles */
	vehicles?: PricedVehicleInput[];
}

/**
 * PerVehicleFleet
 * A fleet priced by the vehicle: a group pays for the coaches it fills.
 */
export interface PerVehicleFleetOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "per_vehicle"
	 */
	pricing: "per_vehicle";
	/** Name */
	name: string | null;
	/** Vehicles */
	vehicles: PricedVehicleOutput[];
}

/**
 * PerVehicleFleetCreate
 * A coach fleet priced by the vehicle as a create takes it: its facts, its
 * arm and the vehicle categories it opens with.
 *
 * Check: ``POST /supplier/{supplier_id}/product/{product_id}/variant`` adds a
 * vehicle category to a fleet that already stands.
 */
export interface PerVehicleFleetCreate {
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
	/** Pricing */
	pricing: "per_vehicle";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Vehicles */
	vehicles?: PricedVehicleWrite[];
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

/** PermissionCatalog */
export interface PermissionCatalog {
	/** Permissions */
	permissions: Permissions[];
	/** Default Groups */
	default_groups: GroupTemplate[];
}

/** PermissionGroupCreate */
export interface PermissionGroupCreate {
	/**
	 * Name
	 * @minLength 1
	 * @maxLength 64
	 */
	name: string;
	/** Permissions */
	permissions?: Permissions[];
}

/** PermissionGroupListResponse */
export interface PermissionGroupListResponse {
	/** Data */
	data: PermissionGroupRead[];
}

/** PermissionGroupRead */
export interface PermissionGroupRead {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string;
	/** Permissions */
	permissions: Permissions[];
}

/** PermissionGroupUpdate */
export interface PermissionGroupUpdate {
	/** Name */
	name?: string | null;
	/** Permissions */
	permissions: Permissions[];
}

/**
 * PlainFareCreate
 * One fare class of a whole route as a create takes it: named only, the
 * charge sitting on the route.
 */
export interface PlainFareCreate {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/** PriceRangeSchema */
export interface PriceRangeSchema {
	/** Min */
	min: number | null;
	/** Max */
	max: number | null;
	currency: Currency | null;
}

/**
 * PricedCar
 * A car of a per-car fleet: what one of these costs for the leg.
 */
export interface PricedCarInput {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images?: NodeImageSchema[];
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * PricedCar
 * A car of a per-car fleet: what one of these costs for the leg.
 */
export interface PricedCarOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images: NodeImageSchema[];
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
}

/**
 * PricedCarWrite
 * One car category of a per-car fleet as a create takes it: what one of
 * these costs for the leg.
 */
export interface PricedCarWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Description */
	description?: string | null;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * PricedCategory
 * One room category of a per-room hotel: a group bin-packs into the
 * cheapest combination of its rooms.
 */
export interface PricedCategoryInput {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Name */
	name?: string | null;
	/** Rooms */
	rooms?: PricedRoomInput[];
}

/**
 * PricedCategory
 * One room category of a per-room hotel: a group bin-packs into the
 * cheapest combination of its rooms.
 */
export interface PricedCategoryOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
	/** Rooms */
	rooms: PricedRoomOutput[];
}

/**
 * PricedCategoryWrite
 * One room category of a per-room hotel as a create takes it: the block's
 * name and the priced rooms it opens with.
 */
export interface PricedCategoryWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Rooms */
	rooms?: PricedRoomCreate[];
}

/**
 * PricedFare
 * One fare class of a per-fare route: what a seat in it costs.
 */
export interface PricedFareInput {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Name */
	name?: string | null;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * PricedFare
 * One fare class of a per-fare route: what a seat in it costs.
 */
export interface PricedFareOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
}

/**
 * PricedRoom
 * A room of a per-room hotel: what a group pays for filling this room.
 */
export interface PricedRoomInput {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images?: NodeImageSchema[];
	typ: HousingRoomTypes;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateInput;
}

/**
 * PricedRoom
 * A room of a per-room hotel: what a group pays for filling this room.
 */
export interface PricedRoomOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images: NodeImageSchema[];
	typ: HousingRoomTypes;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateOutput;
}

/**
 * PricedRoomCreate
 * One room of a per-room hotel as a create takes it: what a group pays for
 * filling it, and no ``id`` — the room is minted with the hotel.
 */
export interface PricedRoomCreate {
	typ: HousingRoomTypes;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateInput;
}

/**
 * PricedRoomWrite
 * One room of a per-room hotel as the API takes it. Echo ``id`` to keep the
 * stored room and its pictures; a room sent without one is a new room.
 */
export interface PricedRoomWrite {
	typ: HousingRoomTypes;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
	/** Id */
	id?: string | null;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateInput;
}

/**
 * PricedVehicle
 * A vehicle of a per-vehicle fleet: what one of these costs.
 */
export interface PricedVehicleInput {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images?: NodeImageSchema[];
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * PricedVehicle
 * A vehicle of a per-vehicle fleet: what one of these costs.
 */
export interface PricedVehicleOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images: NodeImageSchema[];
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
}

/**
 * PricedVehicleWrite
 * One vehicle category of a per-vehicle fleet as a create takes it: what
 * one of these costs.
 */
export interface PricedVehicleWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Description */
	description?: string | null;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * PricingFinancials
 * Pure markup inputs — built from live operator settings or frozen.
 */
export interface PricingFinancialsOutput {
	/**
	 * Default Markup
	 * The markup calculation strategy.
	 */
	default_markup:
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

/**
 * PricingPackage
 * Pure pricing input for one package — built from the live ``TourPackageModel``
 * (``model_validate`` with ``from_attributes``) or read straight from a frozen
 * booking snapshot. Owned by pricing so the snapshot can reuse it.
 */
export interface PricingPackageOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Name
	 * @default ""
	 */
	name: string;
	/** Supplier Id */
	supplier_id: string | null;
	/**
	 * Expenses
	 * The expense calculation strategy.
	 */
	expenses:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseOutput)
		  )
		| null;
	/** Fees */
	fees: FeeOutput[] | null;
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

/**
 * ProductLinkRead
 * One tour reading this product: where the event sits, how much of the
 * product it takes and whether it deviates from what the product asks.
 */
export interface ProductLinkRead {
	/** Tour Id */
	tour_id: string | null;
	/**
	 * Option Id
	 * @format uuid
	 */
	option_id: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/**
	 * Event Option Id
	 * @format uuid
	 */
	event_option_id: string;
	/**
	 * Scope
	 * How much of the product the event takes.
	 */
	scope:
		| ({
				typ: "all";
		  } & AllVariants)
		| ({
				typ: "only";
		  } & OnlyVariants);
	/** Overridden */
	overridden: boolean;
}

/**
 * ProductSupplyNew
 * A link as the API takes it: which product and how much of it. Who the
 * product is bought from and what it states are the product's, resolved on
 * read; a negotiated deviation is set through its own route.
 */
export interface ProductSupplyNew {
	/**
	 * Source
	 * @default "product"
	 */
	source: "product";
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
	/**
	 * Scope
	 * How much of the product the event takes.
	 */
	scope?:
		| ({
				typ: "all";
		  } & AllVariants)
		| ({
				typ: "only";
		  } & OnlyVariants);
}

/** PublicTourCatalogListResponse */
export interface PublicTourCatalogListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: PublicTourCatalogSchemaOutput[];
}

/** PublicTourCatalogSchema */
export interface PublicTourCatalogSchemaOutput {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tour_id: string;
	/** Slug */
	slug: string | null;
	/** Title */
	title: string | null;
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
	/** Group Size */
	group_size: number;
	/** Group Size Min */
	group_size_min: number | null;
	/** Categories */
	categories: TourCategory[];
	tour_type: TourType;
	/** Landing Photos */
	landing_photos: string[];
	/** Cities */
	cities: string[];
	/** Languages */
	languages: LanguageCode[];
	price_range: PriceRangeSchema | null;
	price_per_person: PriceRangeSchema | null;
	/** Option Count */
	option_count: number | null;
	public_price_range: PriceRangeSchema | null;
	public_price_per_person: PriceRangeSchema | null;
	/**
	 * Discount
	 * The markup calculation strategy.
	 */
	discount:
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

/**
 * PublishBlockSchema
 * One reason a tour cannot be published, addressed to the exact input that
 * has to change.
 *
 * ``event_id`` is the slot (the card in the day plan) and ``tour_option_id``
 * the variant it belongs to — the gate scans every live option, so the block
 * can point outside the one currently open. Everything else about the event
 * (type, day, position) is read off the itinerary the client already holds.
 * ``option_id`` is set only when the offender is an alternative inside a choice
 * event; single events carry no separate option handle.
 *
 * ``path`` walks the event payload down to the offending input, list positions
 * included — ``["details", "hop", 1, "arrival_time"]``. It is relative to the
 * event, or to the alternative when ``option_id`` is set, so it addresses the
 * same form the client already renders. The last segment names what is missing,
 * so it need not resolve: an unpriced guide language reads
 * ``["details", "categories", "en"]``, keyed by language rather than position
 * because the row does not exist yet.
 *
 * Check: POST /tour/{tour_id}/publish
 */
export interface PublishBlockSchema {
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Option Id */
	option_id: string | null;
	/** Path */
	path: (string | number)[];
	/** Detail */
	detail: string;
}

/**
 * ReconciliationTotals
 * Grand totals across the *whole filtered set*, not just the page.
 *
 * Only ledger-derived figures appear here. Planned totals are deliberately
 * absent: they require re-pricing every matching snapshot, and a number that
 * silently covered only the current page would be worse than no number.
 */
export interface ReconciliationTotalsOutput {
	/**
	 * Revenue Accrued
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	revenue_accrued: string;
	/**
	 * Revenue Settled
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	revenue_settled: string;
	/**
	 * Receivable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	receivable: string;
	/**
	 * Cost Accrued
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	cost_accrued: string;
	/**
	 * Cost Settled
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	cost_settled: string;
	/**
	 * Payable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	payable: string;
	/**
	 * Settled Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	settled_profit: string;
	/**
	 * Accrual Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	accrual_profit: string;
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

/**
 * RelinkBody
 * Move a linked event to another product. A negotiated deviation belongs to
 * the terms it departed from, so one standing on the row is refused unless
 * ``drop_override`` says to let it go.
 */
export interface RelinkBody {
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
	/**
	 * Scope
	 * How much of the product the event takes.
	 */
	scope?:
		| ({
				typ: "all";
		  } & AllVariants)
		| ({
				typ: "only";
		  } & OnlyVariants);
	/**
	 * Drop Override
	 * @default false
	 */
	drop_override?: boolean;
}

/**
 * RevisionPreview
 * Effective itinerary for a booking (original snapshot folded with its edit log
 */
export interface RevisionPreview {
	/** Pure-Pydantic snapshot of everything a booking's price depends on, frozen at creation. */
	snapshot: TourSnapshotSchemaOutput;
	/** Cost */
	cost: string | null;
	/** Revenue */
	revenue: string | null;
}

/**
 * Room
 * A room of a whole hotel: described, never priced — the price sits on the
 * hotel, charged once whatever rooms the stay fills. An ``ImageBearingNode``: echo its
 * ``id`` on update to keep the room's pictures.
 */
export interface Room {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images?: NodeImageSchema[];
	typ: HousingRoomTypes;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
}

/**
 * RoomCreate
 * One room of a whole hotel as a create takes it. A create mints the hotel
 * and its rooms together, so a room states no ``id``; the variant routes take
 * one back to keep a stored room and its pictures.
 */
export interface RoomCreate {
	typ: HousingRoomTypes;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
}

/**
 * RoomNightCharge
 * What one room costs for one night, together with its own one-off fee and
 * markup. ``rate`` is the flat price of a night and ``context.duration`` scales
 * it: a room is filled by the heads it sleeps, so what it costs per night never
 * depends on the group — a group needing two rooms pays for two rooms, never
 * twice per head.
 */
export interface RoomNightChargeInput {
	/** Fees */
	fees?: FeeInput[] | null;
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs?: ExtraCostInput[];
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
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
	/** A simple fixed cost, ignores all context. */
	rate: FixedExpenseInput;
}

/**
 * RoomNightCharge
 * What one room costs for one night, together with its own one-off fee and
 * markup. ``rate`` is the flat price of a night and ``context.duration`` scales
 * it: a room is filled by the heads it sleeps, so what it costs per night never
 * depends on the group — a group needing two rooms pays for two rooms, never
 * twice per head.
 */
export interface RoomNightChargeOutput {
	/** Fees */
	fees: FeeOutput[] | null;
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs: ExtraCostOutput[];
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
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
	/** A simple fixed cost, ignores all context. */
	rate: FixedExpenseOutput;
}

/**
 * RoomRate
 * What one room costs: the base charge plus the seasons that replace it. A
 * dated stay pays the season containing its check-in, else the base; an
 * undated one may still land on the base or on any season not yet ended.
 */
export interface RoomRateInput {
	/**
	 * Base
	 * As a whole stay, or per night of it.
	 */
	base:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_duration";
		  } & RoomNightChargeInput);
	/**
	 * Seasons
	 * Charges replacing the base for stays that check in inside them.
	 */
	seasons?: RoomSeasonInput[];
}

/**
 * RoomRate
 * What one room costs: the base charge plus the seasons that replace it. A
 * dated stay pays the season containing its check-in, else the base; an
 * undated one may still land on the base or on any season not yet ended.
 */
export interface RoomRateOutput {
	/**
	 * Base
	 * As a whole stay, or per night of it.
	 */
	base:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_duration";
		  } & RoomNightChargeOutput);
	/**
	 * Seasons
	 * Charges replacing the base for stays that check in inside them.
	 */
	seasons: RoomSeasonOutput[];
}

/**
 * RoomRateOverride
 * What one room of a per-room hotel costs this tour.
 */
export interface RoomRateOverrideInput {
	/**
	 * Room Id
	 * @format uuid
	 */
	room_id: string;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateInput;
}

/**
 * RoomRateOverride
 * What one room of a per-room hotel costs this tour.
 */
export interface RoomRateOverrideOutput {
	/**
	 * Room Id
	 * @format uuid
	 */
	room_id: string;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateOutput;
}

/**
 * RoomRateSwitch
 * What one room costs once the hotel charges the rooms a group fills.
 */
export interface RoomRateSwitch {
	/**
	 * Room Id
	 * @format uuid
	 */
	room_id: string;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateInput;
}

/**
 * RoomRatesOverride
 * The rooms this tour repriced, each named once.
 */
export interface RoomRatesOverrideInput {
	/**
	 * Pricing
	 * @default "per_room"
	 */
	pricing: "per_room";
	/**
	 * Rooms
	 * @minItems 1
	 */
	rooms: RoomRateOverrideInput[];
}

/**
 * RoomRatesOverride
 * The rooms this tour repriced, each named once.
 */
export interface RoomRatesOverrideOutput {
	/**
	 * Pricing
	 * @default "per_room"
	 */
	pricing: "per_room";
	/**
	 * Rooms
	 * @minItems 1
	 */
	rooms: RoomRateOverrideOutput[];
}

/**
 * RoomSeason
 * What a room costs for a stay checking in inside one season. Dates are
 * inclusive and absolute — a hotel's rate sheet is re-entered per year.
 */
export interface RoomSeasonInput {
	/**
	 * From Date
	 * @format date
	 */
	from_date: string;
	/**
	 * To Date
	 * @format date
	 */
	to_date: string;
	/**
	 * Charge
	 * As a whole stay, or per night of it.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_duration";
		  } & RoomNightChargeInput);
}

/**
 * RoomSeason
 * What a room costs for a stay checking in inside one season. Dates are
 * inclusive and absolute — a hotel's rate sheet is re-entered per year.
 */
export interface RoomSeasonOutput {
	/**
	 * From Date
	 * @format date
	 */
	from_date: string;
	/**
	 * To Date
	 * @format date
	 */
	to_date: string;
	/**
	 * Charge
	 * As a whole stay, or per night of it.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_duration";
		  } & RoomNightChargeOutput);
}

/**
 * RoomWrite
 * One room of a whole hotel as the API takes it. Echo ``id`` to keep the
 * stored room and its pictures; a room sent without one is a new room.
 */
export interface RoomWrite {
	typ: HousingRoomTypes;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
	/** Id */
	id?: string | null;
}

/**
 * RouteOverride
 * A fare this tour negotiated, replacing the route's own.
 */
export interface RouteOverrideInput {
	/** Typ */
	typ: RouteOverrideInputTypEnum;
	/**
	 * Rates
	 * The arm the route prices in.
	 */
	rates:
		| ({
				pricing: "per_fare";
		  } & FareChargesOverrideInput)
		| ({
				pricing: "whole";
		  } & WholeRouteChargeOverrideInput);
}

/**
 * RouteOverride
 * A fare this tour negotiated, replacing the route's own.
 */
export interface RouteOverrideOutput {
	/** Typ */
	typ: RouteOverrideOutputTypEnum;
	/**
	 * Rates
	 * The arm the route prices in.
	 */
	rates:
		| ({
				pricing: "per_fare";
		  } & FareChargesOverrideOutput)
		| ({
				pricing: "whole";
		  } & WholeRouteChargeOverrideOutput);
}

/**
 * RouteProductSupply
 * A leg read off a supplier's rail or air route.
 */
export interface RouteProductSupplyOutput {
	/**
	 * Source
	 * @default "product"
	 */
	source: "product";
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
	/** Who a linked product is bought from, resolved on read. */
	supplier: SupplierRef;
	/**
	 * Scope
	 * How much of the product the event takes.
	 */
	scope:
		| ({
				typ: "all";
		  } & AllVariants)
		| ({
				typ: "only";
		  } & OnlyVariants);
	override: RouteOverrideOutput | null;
}

/**
 * Schedule
 * When a rail or air leg this tour runs leaves and lands.
 *
 * The hours are the operator's own statement, not the supplier's: a route
 * carries a timetable only if its supplier publishes one, and one stated here
 * is what the leg runs to regardless. Event-level on purpose: a route's legs
 * carry no ids to align a per-leg list against.
 */
export interface Schedule {
	/** When this tour leaves, whatever the route says */
	departure_time?: TimeSchema | null;
	/** When this tour arrives, whatever the route says */
	arrival_time?: TimeSchema | null;
}

/**
 * ScopeBody
 * Replace how much of the linked product the event takes. An override
 * naming a unit the new scope leaves out is refused unless
 * ``drop_stray_overrides`` says to drop it.
 */
export interface ScopeBody {
	/**
	 * Scope
	 * How much of the product the event takes.
	 */
	scope:
		| ({
				typ: "all";
		  } & AllVariants)
		| ({
				typ: "only";
		  } & OnlyVariants);
	/**
	 * Drop Stray Overrides
	 * @default false
	 */
	drop_stray_overrides?: boolean;
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

/** SignInIn */
export interface SignInIn {
	/**
	 * Email
	 * @format email
	 */
	email: string;
	/**
	 * Password
	 * @minLength 1
	 * @maxLength 128
	 */
	password: string;
}

/**
 * SitemapEntrySchema
 * One public URL for the sitemap: the current slug of a published tour,
 * with the tour's last write as ``lastmod``. Language versions share the slug
 * and differ only by path prefix, so the FE emits one entry per language.
 */
export interface SitemapEntrySchema {
	/** Slug */
	slug: string;
	/**
	 * Updated At
	 * @format date-time
	 */
	updated_at: string;
}

/** StaffAccessReplace */
export interface StaffAccessReplace {
	/** Permissions */
	permissions: Permissions[];
	/** Group Ids */
	group_ids: string[];
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
	/** Password */
	password?: string | null;
	/** Permissions */
	permissions?: Permissions[];
	/** Group Ids */
	group_ids?: string[];
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
	role: UserRoles;
	status: StaffStatus;
	/** Commission Percent */
	commission_percent: number | null;
	/** Generated Password */
	generated_password: string | null;
}

/** StaffListResponse */
export interface StaffListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: StaffRead[];
}

/** StaffPermissionsRead */
export interface StaffPermissionsRead {
	/** Direct */
	direct: Permissions[];
	/** Group Ids */
	group_ids: string[];
	/** Effective */
	effective: Permissions[];
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
	role: UserRoles;
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
	/** Status */
	status?: StaffUpdateStatusEnum | null;
	/** Commission Percent */
	commission_percent?: number | null;
}

/**
 * StandaloneBillable
 * One event that prices itself: its own cost and markup across the option's
 * cheapest and dearest resolutions over the tour's allowed group-size range.
 *
 * Check
 *
 * - ``/tour/{id}/option/{id}/summary`` for the quote this belongs to
 * - ``/tour/{tour_id}/{option_id}/package`` for the packages events can join
 */
export interface StandaloneBillableOutput {
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Event */
	event:
		| (
				| ({
						typ: "activity";
				  } & ActivitySingleEventReadOutput)
				| ({
						typ: "bus";
				  } & BusSingleEventReadOutput)
				| ({
						typ: "flight";
				  } & FlightSingleEventReadOutput)
				| ({
						typ: "guide";
				  } & GuideSingleEventReadOutput)
				| ({
						typ: "housing";
				  } & HousingSingleEventReadOutput)
				| ({
						typ: "ref";
				  } & InformationSingleEventReadOutput)
				| ({
						typ: "supplementary";
				  } & SupplementarySingleEventReadOutput)
				| ({
						typ: "train";
				  } & TrainSingleEventReadOutput)
				| ({
						typ: "transfer";
				  } & TransferSingleEventReadOutput)
		  )
		| MultiEventReadOutput;
	/**
	 * Typ
	 * @default "individual_bill"
	 */
	typ: "individual_bill";
	cost: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
	fees: TourMinMaxCostSchemaOutput;
}

/**
 * Stay
 * How long a stay runs and at what hours — the tour's own statement,
 * whoever supplies the hotel.
 */
export interface Stay {
	/**
	 * Duration
	 * Length of stay
	 */
	duration?: number | null;
	check_in?: TimeSchema | null;
	check_out?: TimeSchema | null;
}

/**
 * StayRate
 * What a whole stay costs: the base charge plus the seasons that replace
 * it. A dated stay pays the season containing its check-in, else the base; an
 * undated one may still land on the base or on any season not yet ended.
 */
export interface StayRateInput {
	/**
	 * Base
	 * As a whole, per head, or per unit of the stay's own length.
	 */
	base:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_duration";
		  } & DurationChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/**
	 * Seasons
	 * Charges replacing the base for stays that check in inside them.
	 */
	seasons?: StaySeasonInput[];
}

/**
 * StayRate
 * What a whole stay costs: the base charge plus the seasons that replace
 * it. A dated stay pays the season containing its check-in, else the base; an
 * undated one may still land on the base or on any season not yet ended.
 */
export interface StayRateOutput {
	/**
	 * Base
	 * As a whole, per head, or per unit of the stay's own length.
	 */
	base:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_duration";
		  } & DurationChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
	/**
	 * Seasons
	 * Charges replacing the base for stays that check in inside them.
	 */
	seasons: StaySeasonOutput[];
}

/**
 * StaySeason
 * What a whole stay costs when it checks in inside one season. Dates are
 * inclusive and absolute — a hotel's rate sheet is re-entered per year.
 */
export interface StaySeasonInput {
	/**
	 * From Date
	 * @format date
	 */
	from_date: string;
	/**
	 * To Date
	 * @format date
	 */
	to_date: string;
	/**
	 * Charge
	 * As a whole, per head, or per unit of the stay's own length.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_duration";
		  } & DurationChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * StaySeason
 * What a whole stay costs when it checks in inside one season. Dates are
 * inclusive and absolute — a hotel's rate sheet is re-entered per year.
 */
export interface StaySeasonOutput {
	/**
	 * From Date
	 * @format date
	 */
	from_date: string;
	/**
	 * To Date
	 * @format date
	 */
	to_date: string;
	/**
	 * Charge
	 * As a whole, per head, or per unit of the stay's own length.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_duration";
		  } & DurationChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
}

/**
 * SupplementaryDetails
 * Supplementary lines as they read.
 */
export interface SupplementaryDetailsOutput {
	/**
	 * The half a type states nothing in: a supplementary entry's plan, an
	 * information entry's spec.
	 */
	plan: Empty;
	/**
	 * An event that states its own spec: nothing is linked, so the only thing
	 * left to name is the supplier it is bought from.
	 */
	supply: InlineSupply;
	/** Whatever else the tour bills for, each line carrying its own charge. */
	spec: SupplementarySpecOutput;
}

/**
 * SupplementaryDetailsWrite
 * Supplementary lines as the API takes them.
 */
export interface SupplementaryDetailsWrite {
	/**
	 * The half a type states nothing in: a supplementary entry's plan, an
	 * information entry's spec.
	 */
	plan?: Empty;
	/** Supplementary lines are always the tour's own: no product supplies them. */
	supply: SupplementaryInlineSupplyNew;
}

/** SupplementaryEvent */
export interface SupplementaryEvent {
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "supplementary"
	 */
	typ: "supplementary";
	/** Supplementary lines as the API takes them. */
	details: SupplementaryDetailsWrite;
}

/** SupplementaryEventTypeRead */
export interface SupplementaryEventTypeReadOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "supplementary"
	 */
	typ: "supplementary";
	/** Supplementary lines as they read. */
	details: SupplementaryDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * SupplementaryInlineSupplyNew
 * Supplementary lines are always the tour's own: no product supplies them.
 */
export interface SupplementaryInlineSupplyNew {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
	/** Supplier Id */
	supplier_id?: string | null;
	/** Whatever else the tour bills for, each line carrying its own charge. */
	spec: SupplementarySpecInput;
}

/** SupplementaryItem */
export interface SupplementaryItemInput {
	/** Name */
	name?: string | null;
	/**
	 * Expenses
	 * The charge calculation strategy.
	 */
	expenses?:
		| (
				| ({
						typ: "fixed";
				  } & FixedChargeInput)
				| ({
						typ: "per_person";
				  } & PerPersonChargeInput)
		  )
		| null;
}

/** SupplementaryItem */
export interface SupplementaryItemOutput {
	/** Name */
	name: string | null;
	/**
	 * Expenses
	 * The charge calculation strategy.
	 */
	expenses:
		| (
				| ({
						typ: "fixed";
				  } & FixedChargeOutput)
				| ({
						typ: "per_person";
				  } & PerPersonChargeOutput)
		  )
		| null;
}

/** SupplementarySingleEvent */
export interface SupplementarySingleEvent {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "supplementary"
	 */
	typ: "supplementary";
	/** Supplementary lines as the API takes them. */
	details: SupplementaryDetailsWrite;
}

/** SupplementarySingleEventRead */
export interface SupplementarySingleEventReadOutput {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "supplementary"
	 */
	typ: "supplementary";
	/** Supplementary lines as they read. */
	details: SupplementaryDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * SupplementarySpec
 * Whatever else the tour bills for, each line carrying its own charge.
 */
export interface SupplementarySpecInput {
	/** Item */
	item?: SupplementaryItemInput[];
}

/**
 * SupplementarySpec
 * Whatever else the tour bills for, each line carrying its own charge.
 */
export interface SupplementarySpecOutput {
	/** Item */
	item: SupplementaryItemOutput[];
}

/**
 * SupplierCreateSchema
 * A supplier the operator contracts with. ``supplier_types`` is a set — the
 * same counterparty may be a hotel and a restaurant — and what it actually
 * sells is created separately, one product per hotel or route.
 */
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
	/**
	 * Supplier Types
	 * @minItems 1
	 */
	supplier_types: SupplierType[];
}

/**
 * SupplierLineTally
 * Counts behind the payable figure, so a row explains itself: how many
 * event lines exist, how many are settled, and how many are still filed under
 * no supplier at all.
 */
export interface SupplierLineTally {
	/** Total */
	total: number;
	/** Paid */
	paid: number;
	/** Unpaid */
	unpaid: number;
	/** Unassigned Supplier */
	unassigned_supplier: number;
	/** Unpriced */
	unpriced: number;
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
	/** Supplier Types */
	supplier_types: SupplierType[];
	/** Deleted At */
	deleted_at: string | null;
}

/**
 * SupplierPaymentFile
 * One attached confirmation document. ``url`` is a presigned link that
 * expires, so it is regenerated on every read rather than stored.
 */
export interface SupplierPaymentFile {
	/**
	 * File Id
	 * @format uuid
	 */
	file_id: string;
	/** Url */
	url: string;
	/** File Name */
	file_name: string;
}

/** SupplierPaymentListResponse */
export interface SupplierPaymentListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: SupplierPaymentListRowOutput[];
}

/**
 * SupplierPaymentListRow
 * One row of the browse table — enough to render, filter and sort, nothing
 * more.
 *
 * Receipts are reduced to a ``receipt_count`` because their signed URLs expire
 * in 900s and a list can stay open far longer than that; ``rate``, ``note`` and
 * the documents themselves are read from the detail call when a row is
 * opened.
 *
 * Check:
 * - ``GET /operator/supplier-payment/{payment_id}`` for the full row
 */
export interface SupplierPaymentListRowOutput {
	/**
	 * Payment Id
	 * @format uuid
	 */
	payment_id: string;
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Order Number */
	order_number: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Event Name */
	event_name: string | null;
	event_typ: EventTypes | null;
	/** Supplier Id */
	supplier_id: string | null;
	/** Supplier Name */
	supplier_name: string | null;
	/**
	 * Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	amount: string;
	currency: Currency;
	/**
	 * Base Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	base_amount: string;
	/** Receipt Count */
	receipt_count: number;
	status: SupplierPaymentStatus;
	/** Paid At */
	paid_at: string | null;
}

/**
 * SupplierPaymentResponse
 * Adds ``base_amount`` — the real cost converted into the operator's base
 * currency at the pinned rate (``amount * rate``). This is what feeds the
 * tour's real-cost / profit-loss accounting.
 */
export interface SupplierPaymentResponse {
	/**
	 * Payment Id
	 * @format uuid
	 */
	payment_id: string;
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
	/** Order Number */
	order_number: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Event Name */
	event_name: string | null;
	event_typ: EventTypes | null;
	/** Supplier Id */
	supplier_id: string | null;
	/** Supplier Name */
	supplier_name: string | null;
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
	/** Files */
	files: SupplierPaymentFile[];
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

/**
 * SupplierPolicyBand
 * Half-open window (``from_time`` inclusive, ``to_time`` exclusive, unset =
 * open) and the surcharge for landing in it. Bands match first-hit; the
 * surcharge inflates base cost before operator markup.
 */
export interface SupplierPolicyBandInput {
	/** From Time */
	from_time?: string | null;
	/** To Time */
	to_time?: string | null;
	/**
	 * Surcharge
	 * The markup calculation strategy.
	 */
	surcharge?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
	/** Note */
	note?: string | null;
}

/**
 * SupplierPolicyBand
 * Half-open window (``from_time`` inclusive, ``to_time`` exclusive, unset =
 * open) and the surcharge for landing in it. Bands match first-hit; the
 * surcharge inflates base cost before operator markup.
 */
export interface SupplierPolicyBandOutput {
	/** From Time */
	from_time: string | null;
	/** To Time */
	to_time: string | null;
	/**
	 * Surcharge
	 * The markup calculation strategy.
	 */
	surcharge:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageMarkup)
		  )
		| null;
	/** Note */
	note: string | null;
}

/**
 * SupplierPolicyWarningSchema
 * One conflict between an event and its inherited product's policy, addressed
 * to the exact input that has to change.
 *
 * Advisory, never a publish block — the surcharge is already priced in, this
 * only names why. ``option_id`` is set when the offender is an alternative of a
 * choice event; ``path`` walks the payload to the offending input.
 * ``expected_surcharge`` is null when the policy records a cutoff but no price
 * for crossing it.
 */
export interface SupplierPolicyWarningSchemaOutput {
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Option Id */
	option_id: string | null;
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string;
	/**
	 * What a supplier policy caught on an event. Advisory, never a publish
	 * block: the operator is the authority on their own contract, so a warning
	 * reports the conflict and the charge to expect and leaves the call to them.
	 *
	 * Check: GET /tour/{tour_id}/{option_id}/event/policy-check
	 */
	code: SupplierPolicyWarning;
	/** Path */
	path: (string | number)[];
	/** Detail */
	detail: string;
	/**
	 * Expected Surcharge
	 * The markup calculation strategy.
	 */
	expected_surcharge:
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

/** SupplierProductImageModel */
export interface SupplierProductImageModel {
	/** Image Path */
	image_path: string;
	/** Is Primary */
	is_primary: boolean;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
}

/** SupplierProductListResponse */
export interface SupplierProductListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: (
		| ({
				typ: "activity";
		  } & ActivityProductReadOutput)
		| ({
				typ: "bus";
		  } & BusProductReadOutput)
		| ({
				typ: "flight";
		  } & FlightProductReadOutput)
		| ({
				typ: "hotel";
		  } & HotelProductReadOutput)
		| ({
				typ: "train";
		  } & TrainProductReadOutput)
		| ({
				typ: "transfer";
		  } & TransferProductReadOutput)
	)[];
}

/**
 * SupplierRef
 * Who a linked product is bought from, resolved on read.
 */
export interface SupplierRef {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string;
}

/**
 * SupplierUpdateSchema
 * Partial update: an omitted field is left alone, an explicit ``null``
 * clears. ``brand_name`` and ``supplier_types`` cannot be cleared.
 */
export interface SupplierUpdateSchema {
	/** Brand Name */
	brand_name?: string | null;
	/** Legal Name */
	legal_name?: string | null;
	/** Phone */
	phone?: string | null;
	/** Website */
	website?: string | null;
	/** Supplier Types */
	supplier_types?: SupplierType[] | null;
}

/**
 * TicketedOffering
 * One offering of any other venue — a ticket tier, a class, a session —
 * and what it costs.
 */
export interface TicketedOfferingInput {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Name */
	name?: string | null;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * TicketedOffering
 * One offering of any other venue — a ticket tier, a class, a session —
 * and what it costs.
 */
export interface TicketedOfferingOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
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
	 * The UTC timezone offset (e.g., 5 for UTC+5). Unset means the offset was never supplied — never assume a fallback zone.
	 */
	timezone?: number | null;
}

/**
 * Times
 * When the group is somewhere: an activity's hours, an information entry's.
 */
export interface Times {
	/** Event start time */
	start_time?: TimeSchema | null;
	/** Event end time */
	end_time?: TimeSchema | null;
}

/**
 * ToPerCar
 * Switch a transfer fleet to charging the cars a group fills: every car
 * category of the fleet is priced here.
 */
export interface ToPerCar {
	/** Typ */
	typ: "transfer";
	/** To */
	to: "per_car";
	/** Cars */
	cars: CarChargeSwitch[];
}

/**
 * ToPerCarCategory
 * Switch a transfer fleet to charging the class a car is taken in: every
 * car of the fleet brings the classes it is sold in.
 */
export interface ToPerCarCategory {
	/** Typ */
	typ: "transfer";
	/** To */
	to: "per_car_category";
	/** Cars */
	cars: CarCategoriesSwitch[];
}

/**
 * ToPerFare
 * Switch a rail or air route to charging the fare class a group is booked
 * into: every fare of the route is priced here.
 */
export interface ToPerFare {
	/** Typ */
	typ: ToPerFareTypEnum;
	/** To */
	to: "per_fare";
	/** Fares */
	fares: FareChargeSwitch[];
}

/**
 * ToPerRoom
 * Move a hotel's price onto each room: every room of every category carries
 * its own rate, so every one of them is priced here.
 */
export interface ToPerRoom {
	/** Typ */
	typ: "hotel";
	/** To */
	to: "per_room";
	/** Rooms */
	rooms: RoomRateSwitch[];
}

/**
 * ToPerVehicle
 * Switch a coach fleet to charging the vehicles a group fills: every
 * vehicle category of the fleet is priced here.
 */
export interface ToPerVehicle {
	/** Typ */
	typ: "bus";
	/** To */
	to: "per_vehicle";
	/** Vehicles */
	vehicles: VehicleChargeSwitch[];
}

/**
 * ToWholeFleet
 * Switch a coach fleet to charging the run once: the charge moves onto the
 * fleet and its vehicles keep none.
 */
export interface ToWholeFleet {
	/** Typ */
	typ: "bus";
	/** To */
	to: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * ToWholeHotel
 * Move a hotel's price onto the hotel, charged once whatever rooms the stay
 * fills: the rooms keep none.
 */
export interface ToWholeHotel {
	/** Typ */
	typ: "hotel";
	/** To */
	to: "whole";
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateInput;
}

/**
 * ToWholeRoute
 * Switch a rail or air route to charging the leg once: the charge moves
 * onto the route and its fares keep none.
 */
export interface ToWholeRoute {
	/** Typ */
	typ: ToWholeRouteTypEnum;
	/** To */
	to: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * ToWholeTransfer
 * Switch a transfer fleet to charging the leg once: the charge moves onto
 * the fleet and its cars keep none.
 */
export interface ToWholeTransfer {
	/** Typ */
	typ: "transfer";
	/** To */
	to: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/** TourEventLibraryImageModel */
export interface TourEventLibraryImageModel {
	/** Image Path */
	image_path: string;
	/** Is Primary */
	is_primary: boolean;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Library Id
	 * @format uuid
	 */
	library_id: string;
}

/**
 * TourEventResponse
 * One event slot as the operator reads it: the slot's ids, its payload and
 * the state of its translation. The slot's pictures are ``event.images``.
 *
 * Check
 *
 * - ``GET /tour/{tour_id}/{option_id}/event/{event_id}``
 * - ``GET /tour/{tour_id}/event/{event_id}/images/all``
 */
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
						typ: "activity";
				  } & ActivitySingleEventReadOutput)
				| ({
						typ: "bus";
				  } & BusSingleEventReadOutput)
				| ({
						typ: "flight";
				  } & FlightSingleEventReadOutput)
				| ({
						typ: "guide";
				  } & GuideSingleEventReadOutput)
				| ({
						typ: "housing";
				  } & HousingSingleEventReadOutput)
				| ({
						typ: "ref";
				  } & InformationSingleEventReadOutput)
				| ({
						typ: "supplementary";
				  } & SupplementarySingleEventReadOutput)
				| ({
						typ: "train";
				  } & TrainSingleEventReadOutput)
				| ({
						typ: "transfer";
				  } & TransferSingleEventReadOutput)
		  )
		| MultiEventReadOutput;
	/** @default "source" */
	translation: TranslationState;
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
	foc: FocPolicy | null;
}

/** TourListResponse */
export interface TourListResponse {
	/** Total Count */
	total_count: number;
	/** Data */
	data: TourMetaResponse[];
}

/** TourMetaCreateSchema */
export interface TourMetaCreateSchema {
	/**
	 * Title
	 * @minLength 1
	 * @maxLength 255
	 */
	title: string;
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
	/** Group Size Min */
	group_size_min?: number | null;
	/** @default "regular" */
	typ?: TourType;
	/** Agency Id */
	agency_id?: string | null;
	/** Categories */
	categories?: TourCategory[];
	/**
	 * Languages
	 * @minItems 1
	 */
	languages?: LanguageCode[];
}

/**
 * TourMetaResponse
 * ``tour_meta`` joined to its landing page, which owns the tour title. The
 * tour row itself carries no text — every reader that used to select
 * ``tour_meta.name`` now reads ``landing_page.title`` through this shape.
 */
export interface TourMetaResponse {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Created At
	 * @format date-time
	 */
	created_at: string;
	/**
	 * Updated At
	 * @format date-time
	 */
	updated_at: string;
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
	/** Title */
	title: string | null;
	/** Slug */
	slug: string | null;
	/** Cover Image Path */
	cover_image_path: string | null;
	/** Group Size */
	group_size: number;
	/** Group Size Min */
	group_size_min: number | null;
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
	/** Languages */
	languages: LanguageCode[];
}

/**
 * TourMetaUpdateSchema
 * The tour title is not here on purpose: it lives on ``landing_page.title``
 * and is renamed through ``PATCH /tour/{tour_id}/landing``, which is also where
 * the per-operator uniqueness check and the translation re-run hang off.
 */
export interface TourMetaUpdateSchema {
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
	/** Group Size Min */
	group_size_min?: number | null;
	/** Categories */
	categories?: TourCategory[] | null;
	/** Languages */
	languages?: LanguageCode[] | null;
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
	/** Description */
	description?: string | null;
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
	/** Description */
	description: string | null;
	/** Cover Image Path */
	cover_image_path: string | null;
	/** Deleted At */
	deleted_at: string | null;
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
	/** Languages */
	languages: LanguageCode[] | null;
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
	/** Description */
	description: string | null;
	/** Cover Image Path */
	cover_image_path: string | null;
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
	price_per_person: MonetaryValueSchema;
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
	price_per_person_max: MonetaryValueSchema;
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
						typ: "activity";
				  } & ActivityEventPubReadOutput)
				| ({
						typ: "bus";
				  } & BusEventPubReadOutput)
				| ({
						typ: "flight";
				  } & FlightEventPubReadOutput)
				| ({
						typ: "housing";
				  } & HousingEventPubReadOutput)
				| ({
						typ: "ref";
				  } & InformationEventPubReadOutput)
				| ({
						typ: "train";
				  } & TrainEventPubReadOutput)
				| ({
						typ: "transfer";
				  } & TransferEventPubReadOutput)
		  )
		| MultiEventPubOutput
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

/**
 * TourOptionUpdateSchema
 * Partial update: an omitted field is left alone, an explicit ``null``
 * clears it. Cleared ``markup``/``languages`` fall back to the tour level.
 *
 * Check: PATCH /tour/{tour_id}/option/{option_id}
 */
export interface TourOptionUpdateSchema {
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
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
	/** Languages */
	languages?: LanguageCode[] | null;
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
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "per_person";
				  } & PerPersonExpenseOutput)
		  )
		| null;
	/** Fees */
	fees: FeeOutput[] | null;
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

/** TourRegenerateResponse */
export interface TourRegenerateResponse {
	/** Scheduled */
	scheduled: boolean;
	/** Landing */
	landing: boolean;
	/** Events Scheduled */
	events_scheduled: number;
	/** Events Skipped */
	events_skipped: number;
	/** Target Languages */
	target_languages: number;
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

/**
 * TourSchedulePubSchema
 * Bookable dates for a published tour.
 *
 * Only the materialised ``occurrences`` cross the public boundary — the raw
 * fixed/excluded/recurrence rows and the seasonal commissions stay operator-only.
 */
export interface TourSchedulePubSchema {
	/** Occurrences */
	occurrences: string[];
	/**
	 * Window From
	 * @format date
	 */
	window_from: string;
	/**
	 * Window Until
	 * @format date
	 */
	window_until: string;
}

/** TourScheduleUpdate */
export interface TourScheduleUpdate {
	/** Is Seasonal */
	is_seasonal?: boolean | null;
}

/**
 * TourSlugResolutionSchema
 * The page a slug URL renders, in the requested ``read_lang``. ``moved``
 * true means the requested slug is retired — the payload is still complete,
 * and the caller replaces the URL with ``slug`` (301 when server-rendered)
 * without refetching. Itinerary is not included: it is per option and fetched
 * on demand.
 */
export interface TourSlugResolutionSchema {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tour_id: string;
	/** Slug */
	slug: string;
	/** Moved */
	moved: boolean;
	/**
	 * ``tour_meta`` joined to its landing page, which owns the tour title. The
	 * tour row itself carries no text — every reader that used to select
	 * ``tour_meta.name`` now reads ``landing_page.title`` through this shape.
	 */
	meta: TourMetaResponse;
	landing: LandingPagePubSchema;
	/** Options */
	options: TourOptionPreviewSchemaOutput[];
}

/**
 * TourSnapshotSchema
 * Pure-Pydantic snapshot of everything a booking's price depends on, frozen at creation.
 */
export interface TourSnapshotSchemaOutput {
	tour_meta: FrozenTourMeta;
	/**
	 * ``markup`` is the option-level override frozen at booking time; snapshot
	 * pricing resolves it before the tour-level markup, so later option edits
	 * never change this booking.
	 */
	tour_option: FrozenTourOptionOutput;
	tour_financial_settings: FrozenTourFinOutput | null;
	/** Events */
	events: OrderTourEventSchemaOutput[];
	/** @default "en" */
	display_lang: LanguageCode;
	/** Events Localized */
	events_localized: OrderTourEventSchemaOutput[] | null;
	/** Packages */
	packages: PricingPackageOutput[];
	operator_financials: PricingFinancialsOutput | null;
	/** Fx Rates */
	fx_rates: FrozenFxRateOutput[];
	/**
	 * Agency Discount
	 * The markup calculation strategy.
	 */
	agency_discount:
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

/**
 * TourStatisticsResponse
 * Tour-level order, revenue & profit statistics, all in the operator's base
 * currency. Every field defaults to 0 so the endpoint never returns null/empty.
 *
 * Planned figures are summed over the confirmed booking set, each order priced
 * from its own frozen snapshot — the pax, the categories the client actually
 * chose and the FX table pinned at booking time — through the same
 * ``planned_of`` the reconciliation board and the order detail use. A tour
 * with no orders therefore reports 0, not a catalog projection; live option
 * pricing is what ``/tour/{id}/option/{id}/summary`` and the catalog are for.
 * An order whose snapshot cannot be priced (operator financials wiped, an
 * unregistered FX pair) contributes 0 rather than failing the response.
 *
 * - ``planned_revenue`` — planned gross agency price (cost+markup+fees+taxes).
 * - ``planned_cost`` — planned supplier cost.
 * - ``planned_profit`` = planned_revenue − planned_cost.
 *
 * Realized figures are over the same confirmed booking set ({CONFIRMED,
 * IN_PROGRESS, COMPLETED}):
 *
 * - ``confirmed_revenue`` — actually billed: sum of issued invoice totals.
 * - ``real_cost`` — actually recorded supplier-payment ledger, FX-converted to
 *   base (amount × pinned rate). Captures real cost + exchange differences.
 * - ``real_profit`` = confirmed_revenue − real_cost (real-time performance).
 *
 * Cash-basis figures come off the money ledger and answer a different question
 * — not what was agreed, but what has actually moved. They span every booking
 * on the tour regardless of status, because a cancelled order can still leave
 * a retained deposit or an already-paid supplier on the books, and dropping
 * those would overstate the tour's position:
 *
 * - ``revenue_accrued`` / ``cost_accrued`` — billed and committed. These are
 *   the ledger's own restatement of the two accrual figures above and should
 *   track them; a gap means an invoice or supplier payment bypassed a seam.
 * - ``revenue_settled`` / ``cost_settled`` — cash received and cash paid out.
 * - ``receivable`` — still owed to the operator by agencies and tourists.
 * - ``payable`` — still owed by the operator to suppliers.
 * - ``settled_profit`` = revenue_settled − cost_settled: margin in hand, as
 *   opposed to ``real_profit``, which is margin on paper.
 */
export interface TourStatisticsResponse {
	/**
	 * Total Orders
	 * @default 0
	 */
	total_orders: number;
	/**
	 * Completed
	 * @default 0
	 */
	completed: number;
	/**
	 * In Progress
	 * @default 0
	 */
	in_progress: number;
	/**
	 * Tourists
	 * @default 0
	 */
	tourists: number;
	/**
	 * Planned Revenue
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_revenue: string;
	/**
	 * Planned Cost
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_cost: string;
	/**
	 * Planned Profit
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_profit: string;
	/**
	 * Confirmed Revenue
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	confirmed_revenue: string;
	/**
	 * Real Cost
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	real_cost: string;
	/**
	 * Real Profit
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	real_profit: string;
	/**
	 * Revenue Accrued
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	revenue_accrued: string;
	/**
	 * Revenue Settled
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	revenue_settled: string;
	/**
	 * Receivable
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	receivable: string;
	/**
	 * Cost Accrued
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	cost_accrued: string;
	/**
	 * Cost Settled
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	cost_settled: string;
	/**
	 * Payable
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	payable: string;
	/**
	 * Settled Profit
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	settled_profit: string;
	/** @default "USD" */
	currency: Currency;
}

/**
 * TourSummaryResponse
 * Option quote: ``estimated_cost`` is what the operator pays out
 * (cost + fees), ``estimated_profit`` is the markup kept, and
 * ``estimated_revenue`` is the full agency price — the two always
 * sum to it.
 *
 * Check
 *
 * - ``/tour/{id}/option/{id}/summary`` for the quote itself
 */
export interface TourSummaryResponse {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Events */
	events: (
		| ({
				typ: "individual_bill";
		  } & StandaloneBillableOutput)
		| ({
				typ: "package_bill";
		  } & PackageBillableOutput)
	)[];
	estimated_cost: TourMinMaxCostSchemaOutput;
	estimated_profit: TourMinMaxCostSchemaOutput;
	estimated_revenue: TourMinMaxCostSchemaOutput;
}

/**
 * TrainDetailPubSchema
 * A rail leg as a traveller sees it: the stations it calls at, the hours it
 * runs to, and the fare classes it sells.
 *
 * A supplier's route carries stations but no timetable, so the hours the tour
 * states land on the first departure and the last arrival — the only two the
 * leg has. A route with no stations at all still keeps its hours, in one hop
 * with no place attached.
 */
export interface TrainDetailPubSchemaOutput {
	/**
	 * Name
	 * The route's own name
	 */
	name: string | null;
	/** Hop */
	hop: TransportHopPubSchemaOutput[];
	/** Images */
	images: EventImagePubSchema[];
}

/**
 * TrainDetails
 * A rail leg as it reads.
 */
export interface TrainDetailsOutput {
	/**
	 * When a rail or air leg this tour runs leaves and lands.
	 *
	 * The hours are the operator's own statement, not the supplier's: a route
	 * carries a timetable only if its supplier publishes one, and one stated here
	 * is what the leg runs to regardless. Event-level on purpose: a route's legs
	 * carry no ids to align a per-leg list against.
	 */
	plan: Schedule;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & RouteProductSupplyOutput);
	/**
	 * Spec
	 * How the route prices a leg.
	 */
	spec:
		| ({
				pricing: "per_fare";
		  } & PerFareTrainRouteOutput)
		| ({
				pricing: "whole";
		  } & WholeTrainRouteOutput);
}

/**
 * TrainDetailsWrite
 * A rail leg as the API takes it.
 */
export interface TrainDetailsWrite {
	/**
	 * When a rail or air leg this tour runs leaves and lands.
	 *
	 * The hours are the operator's own statement, not the supplier's: a route
	 * carries a timetable only if its supplier publishes one, and one stated here
	 * is what the leg runs to regardless. Event-level on purpose: a route's legs
	 * carry no ids to align a per-leg list against.
	 */
	plan?: Schedule;
	/** Supply */
	supply?:
		| (
				| ({
						source: "inline";
				  } & TrainInlineSupplyNew)
				| ({
						source: "product";
				  } & ProductSupplyNew)
		  )
		| null;
}

/** TrainEvent */
export interface TrainEvent {
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
	/** A rail leg as the API takes it. */
	details: TrainDetailsWrite;
}

/** TrainEventPubRead */
export interface TrainEventPubReadOutput {
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Day */
	day: number | null;
	/** Position */
	position: number | null;
	/** Is Optional */
	is_optional: boolean | null;
	/** Images */
	images: EventImagePubSchema[];
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
	details: TrainDetailPubSchemaOutput | null;
}

/** TrainEventTypeRead */
export interface TrainEventTypeReadOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
	/** A rail leg as it reads. */
	details: TrainDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * TrainInlineSupplyNew
 * A rail leg the operator describes and prices itself, as the API takes it.
 */
export interface TrainInlineSupplyNew {
	/**
	 * Source
	 * @default "inline"
	 */
	source: "inline";
	/** Supplier Id */
	supplier_id?: string | null;
	/**
	 * Spec
	 * How the route prices a leg.
	 */
	spec:
		| ({
				pricing: "per_fare";
		  } & PerFareTrainRouteInput)
		| ({
				pricing: "whole";
		  } & WholeTrainRouteInput);
}

/**
 * TrainLeg
 * One leg of a rail route — its two stations and nothing else.
 */
export interface TrainLegInput {
	/** Where the leg leaves from. */
	departure?: TrainStopInput | null;
	/** Where the leg arrives. */
	arrival?: TrainStopInput | null;
}

/**
 * TrainLeg
 * One leg of a rail route — its two stations and nothing else.
 */
export interface TrainLegOutput {
	/** Where the leg leaves from. */
	departure: TrainStopOutput | null;
	/** Where the leg arrives. */
	arrival: TrainStopOutput | null;
}

/** TrainProductCreate */
export interface TrainProductCreate {
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
	/**
	 * Details
	 * How the route prices a leg.
	 */
	details:
		| ({
				pricing: "per_fare";
		  } & PerFareTrainCreate)
		| ({
				pricing: "whole";
		  } & WholeTrainCreate);
}

/** TrainProductRead */
export interface TrainProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/** Name */
	name: string;
	/** Image Paths */
	image_paths: string[];
	/** Primary Image Path */
	primary_image_path: string | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
	/**
	 * Spec
	 * How the route prices a leg.
	 */
	spec:
		| ({
				pricing: "per_fare";
		  } & PerFareTrainRouteOutput)
		| ({
				pricing: "whole";
		  } & WholeTrainRouteOutput);
}

/** TrainProductUpdate */
export interface TrainProductUpdate {
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
	/**
	 * Details
	 * How the route prices a leg.
	 */
	details?:
		| (
				| ({
						pricing: "per_fare";
				  } & PerFareTrainDetails)
				| ({
						pricing: "whole";
				  } & WholeTrainDetails)
		  )
		| null;
}

/** TrainSingleEvent */
export interface TrainSingleEvent {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
	/** A rail leg as the API takes it. */
	details: TrainDetailsWrite;
}

/** TrainSingleEventRead */
export interface TrainSingleEventReadOutput {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
	/** A rail leg as it reads. */
	details: TrainDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * TrainStop
 * Where a rail route calls, with no hour attached: the supplier states
 * which stations it runs between, the tour states when it runs them.
 */
export interface TrainStopInput {
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
}

/**
 * TrainStop
 * Where a rail route calls, with no hour attached: the supplier states
 * which stations it runs between, the tour states when it runs them.
 */
export interface TrainStopOutput {
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
}

/** TransferCarCategoryPubSchema */
export interface TransferCarCategoryPubSchema {
	/** Name */
	name: string | null;
}

/**
 * TransferCarPubSchema
 * One car of the ride. ``categories`` is the trim a tour prices its own
 * cars by; a supplier's fleet names its cars instead and leaves it empty.
 */
export interface TransferCarPubSchema {
	/** Name */
	name: string | null;
	typ: VehicleBodyType | null;
	/** Pax */
	pax: number | null;
	/** Description */
	description: string | null;
	/** Categories */
	categories: TransferCarCategoryPubSchema[];
}

/**
 * TransferDetails
 * A ride as it reads.
 */
export interface TransferDetailsOutput {
	/**
	 * What kind of run a transfer is and where it leaves from and arrives at,
	 * whoever drives it.
	 */
	plan: TransferLegOutput;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & TransferProductSupplyOutput);
	/**
	 * Spec
	 * How the fleet prices a leg.
	 */
	spec:
		| ({
				pricing: "per_car";
		  } & PerCarTransferOutput)
		| ({
				pricing: "per_car_category";
		  } & PerCarCategoryTransferOutput)
		| ({
				pricing: "whole";
		  } & WholeTransferOutput);
}

/**
 * TransferDetailsPubSchema
 * A transfer as a traveller sees it: what kind of run it is, where it
 * leaves from and arrives at, and the cars that drive it.
 */
export interface TransferDetailsPubSchemaOutput {
	/**
	 * Name
	 * The fleet's own name
	 */
	name: string | null;
	typ: TransferTypes | null;
	/**
	 * One end of a transport leg: where, at what hour, on what date.
	 *
	 * ``date`` is read-only and filled by the backend only. A tour template stays
	 * reusable across every departure, so it states ``day`` + ``time``; the
	 * concrete date is resolved from a booking's anchor date and is never accepted
	 * from a client. Stays null on surfaces with no anchor date — the public tour
	 * view and the catalog listing.
	 */
	departure: JourneyPointPubSchemaOutput;
	/**
	 * One end of a transport leg: where, at what hour, on what date.
	 *
	 * ``date`` is read-only and filled by the backend only. A tour template stays
	 * reusable across every departure, so it states ``day`` + ``time``; the
	 * concrete date is resolved from a booking's anchor date and is never accepted
	 * from a client. Stays null on surfaces with no anchor date — the public tour
	 * view and the catalog listing.
	 */
	arrival: JourneyPointPubSchemaOutput;
	/** Cars */
	cars: TransferCarPubSchema[];
	/** Images */
	images: EventImagePubSchema[];
}

/**
 * TransferDetailsWrite
 * A ride as the API takes it.
 */
export interface TransferDetailsWrite {
	/**
	 * What kind of run a transfer is and where it leaves from and arrives at,
	 * whoever drives it.
	 */
	plan?: TransferLegInput;
	/** Supply */
	supply?:
		| (
				| ({
						source: "inline";
				  } & TransferInlineSupplyNew)
				| ({
						source: "product";
				  } & ProductSupplyNew)
		  )
		| null;
}

/** TransferEvent */
export interface TransferEvent {
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
	/** A ride as the API takes it. */
	details: TransferDetailsWrite;
}

/** TransferEventPubRead */
export interface TransferEventPubReadOutput {
	/** Name */
	name: string | null;
	/** Description */
	description: string | null;
	/** Day */
	day: number | null;
	/** Position */
	position: number | null;
	/** Is Optional */
	is_optional: boolean | null;
	/** Images */
	images: EventImagePubSchema[];
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
	details: TransferDetailsPubSchemaOutput | null;
}

/** TransferEventTypeRead */
export interface TransferEventTypeReadOutput {
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
	/** A ride as it reads. */
	details: TransferDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * TransferInlineSupplyNew
 * A ride the operator describes and prices itself, as the API takes it.
 */
export interface TransferInlineSupplyNew {
	/**
	 * Source
	 * @default "inline"
	 */
	source: "inline";
	/** Supplier Id */
	supplier_id?: string | null;
	/**
	 * Spec
	 * How the fleet prices a leg.
	 */
	spec:
		| ({
				pricing: "per_car";
		  } & PerCarTransferInput)
		| ({
				pricing: "per_car_category";
		  } & PerCarCategoryTransferInput)
		| ({
				pricing: "whole";
		  } & WholeTransferInput);
}

/**
 * TransferLeg
 * What kind of run a transfer is and where it leaves from and arrives at,
 * whoever drives it.
 */
export interface TransferLegInput {
	typ?: TransferTypes | null;
	/** Details of the departure. */
	departure?: TransferPointInput | null;
	/** Details of the arrival. */
	arrival?: TransferPointInput | null;
}

/**
 * TransferLeg
 * What kind of run a transfer is and where it leaves from and arrives at,
 * whoever drives it.
 */
export interface TransferLegOutput {
	typ: TransferTypes | null;
	/** Details of the departure. */
	departure: TransferPointOutput | null;
	/** Details of the arrival. */
	arrival: TransferPointOutput | null;
}

/**
 * TransferOverride
 * A price this tour negotiated for a ride, replacing the fleet's own.
 */
export interface TransferOverrideInput {
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
	/**
	 * Rates
	 * The arm the fleet prices in.
	 */
	rates:
		| ({
				pricing: "per_car";
		  } & CarChargesOverrideInput)
		| ({
				pricing: "per_car_category";
		  } & CarCategoryChargesOverrideInput)
		| ({
				pricing: "whole";
		  } & WholeTransferChargeOverrideInput);
}

/**
 * TransferOverride
 * A price this tour negotiated for a ride, replacing the fleet's own.
 */
export interface TransferOverrideOutput {
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
	/**
	 * Rates
	 * The arm the fleet prices in.
	 */
	rates:
		| ({
				pricing: "per_car";
		  } & CarChargesOverrideOutput)
		| ({
				pricing: "per_car_category";
		  } & CarCategoryChargesOverrideOutput)
		| ({
				pricing: "whole";
		  } & WholeTransferChargeOverrideOutput);
}

/**
 * TransferPoint
 * Where a transfer leg leaves from or arrives at, and when.
 */
export interface TransferPointInput {
	/** The time of an event */
	time?: TimeSchema | null;
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
}

/**
 * TransferPoint
 * Where a transfer leg leaves from or arrives at, and when.
 */
export interface TransferPointOutput {
	/** The time of an event */
	time: TimeSchema | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
}

/** TransferProductCreate */
export interface TransferProductCreate {
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
	/**
	 * Details
	 * How the fleet prices a leg.
	 */
	details:
		| ({
				pricing: "per_car";
		  } & PerCarTransferCreate)
		| ({
				pricing: "per_car_category";
		  } & PerCarCategoryTransferCreate)
		| ({
				pricing: "whole";
		  } & WholeTransferCreate);
}

/** TransferProductRead */
export interface TransferProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/** Name */
	name: string;
	/** Image Paths */
	image_paths: string[];
	/** Primary Image Path */
	primary_image_path: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
	/**
	 * Spec
	 * How the fleet prices a leg.
	 */
	spec:
		| ({
				pricing: "per_car";
		  } & PerCarTransferOutput)
		| ({
				pricing: "per_car_category";
		  } & PerCarCategoryTransferOutput)
		| ({
				pricing: "whole";
		  } & WholeTransferOutput);
}

/**
 * TransferProductSupply
 * A ride driven by a supplier's transfer fleet.
 */
export interface TransferProductSupplyOutput {
	/**
	 * Source
	 * @default "product"
	 */
	source: "product";
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
	/** Who a linked product is bought from, resolved on read. */
	supplier: SupplierRef;
	/**
	 * Scope
	 * How much of the product the event takes.
	 */
	scope:
		| ({
				typ: "all";
		  } & AllVariants)
		| ({
				typ: "only";
		  } & OnlyVariants);
	override: TransferOverrideOutput | null;
}

/** TransferProductUpdate */
export interface TransferProductUpdate {
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
	/**
	 * Details
	 * How the fleet prices a leg.
	 */
	details?:
		| (
				| ({
						pricing: "per_car";
				  } & PerCarTransferDetails)
				| ({
						pricing: "per_car_category";
				  } & PerCarCategoryTransferDetails)
				| ({
						pricing: "whole";
				  } & WholeTransferDetails)
		  )
		| null;
}

/** TransferSingleEvent */
export interface TransferSingleEvent {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
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
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
	/** A ride as the API takes it. */
	details: TransferDetailsWrite;
}

/** TransferSingleEventRead */
export interface TransferSingleEventReadOutput {
	/**
	 * Day
	 * Event's day number in a tour
	 * @min 1
	 */
	day: number;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
	/** A ride as it reads. */
	details: TransferDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
}

/**
 * TransportHopPubSchema
 * One leg of a road or rail journey — its two ends.
 */
export interface TransportHopPubSchemaOutput {
	/**
	 * One end of a transport leg: where, at what hour, on what date.
	 *
	 * ``date`` is read-only and filled by the backend only. A tour template stays
	 * reusable across every departure, so it states ``day`` + ``time``; the
	 * concrete date is resolved from a booking's anchor date and is never accepted
	 * from a client. Stays null on surfaces with no anchor date — the public tour
	 * view and the catalog listing.
	 */
	departure: JourneyPointPubSchemaOutput;
	/**
	 * One end of a transport leg: where, at what hour, on what date.
	 *
	 * ``date`` is read-only and filled by the backend only. A tour template stays
	 * reusable across every departure, so it states ``day`` + ``time``; the
	 * concrete date is resolved from a booking's anchor date and is never accepted
	 * from a client. Stays null on surfaces with no anchor date — the public tour
	 * view and the catalog listing.
	 */
	arrival: JourneyPointPubSchemaOutput;
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
	foc?: FocPolicy | null;
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

/**
 * VariantCreated
 * One unit just added and the product it now sits in: ``variant_id`` is
 * the new entry of ``product.spec.categories|fares|vehicles|cars|offerings``.
 *
 * Check
 *
 * - ``POST /supplier/{supplier_id}/product/{product_id}/variant``
 * - ``PATCH /supplier/{supplier_id}/product/{product_id}/variant/{variant_id}``
 */
export interface VariantCreated {
	/**
	 * Variant Id
	 * @format uuid
	 */
	variant_id: string;
	/** Product */
	product:
		| ({
				typ: "activity";
		  } & ActivityProductReadOutput)
		| ({
				typ: "bus";
		  } & BusProductReadOutput)
		| ({
				typ: "flight";
		  } & FlightProductReadOutput)
		| ({
				typ: "hotel";
		  } & HotelProductReadOutput)
		| ({
				typ: "train";
		  } & TrainProductReadOutput)
		| ({
				typ: "transfer";
		  } & TransferProductReadOutput);
}

/**
 * Vehicle
 * A vehicle of a whole-run fleet: described, never priced — the run is
 * charged once whatever vehicles it takes. An ``ImageBearingNode``: echo its
 * ``id`` on update to keep the vehicle's pictures.
 */
export interface Vehicle {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/**
	 * Images
	 * Images of this node, primary first; server-owned — ignored on write, changed only through the node image routes.
	 * @maxItems 5
	 */
	images?: NodeImageSchema[];
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
	/** Name */
	name?: string | null;
	/** Description */
	description?: string | null;
}

/**
 * VehicleChargeOverride
 * What one coach costs this tour.
 */
export interface VehicleChargeOverrideInput {
	/**
	 * Vehicle Id
	 * @format uuid
	 */
	vehicle_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * VehicleChargeOverride
 * What one coach costs this tour.
 */
export interface VehicleChargeOverrideOutput {
	/**
	 * Vehicle Id
	 * @format uuid
	 */
	vehicle_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
}

/**
 * VehicleChargeSwitch
 * What one vehicle of a category costs once the fleet charges by vehicle.
 */
export interface VehicleChargeSwitch {
	/**
	 * Variant Id
	 * @format uuid
	 */
	variant_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * VehicleChargesOverride
 * The coaches this tour repriced, each named once.
 */
export interface VehicleChargesOverrideInput {
	/**
	 * Pricing
	 * @default "per_vehicle"
	 */
	pricing: "per_vehicle";
	/**
	 * Vehicles
	 * @minItems 1
	 */
	vehicles: VehicleChargeOverrideInput[];
}

/**
 * VehicleChargesOverride
 * The coaches this tour repriced, each named once.
 */
export interface VehicleChargesOverrideOutput {
	/**
	 * Pricing
	 * @default "per_vehicle"
	 */
	pricing: "per_vehicle";
	/**
	 * Vehicles
	 * @minItems 1
	 */
	vehicles: VehicleChargeOverrideOutput[];
}

/**
 * VehiclePubSchema
 * One coach or car category: body, seats and description survive, its price
 * does not.
 */
export interface VehiclePubSchema {
	/** Name */
	name: string | null;
	typ: VehicleBodyType | null;
	/** Pax */
	pax: number | null;
	/** Description */
	description: string | null;
}

/**
 * VehicleWrite
 * One vehicle category of a whole fleet as a create takes it: what the
 * coach is and how many it seats, never what it costs — the run carries the
 * charge. No ``id``: the category is minted with the fleet.
 */
export interface VehicleWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Description */
	description?: string | null;
}

/** VoucherResponse */
export interface VoucherResponse {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Order Number */
	order_number: string;
	/** Url */
	url: string;
	/** File Name */
	file_name: string | null;
}

/**
 * WholeBusDetails
 * A coach fleet sold whole as the API takes it.
 */
export interface WholeBusDetails {
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
	/** Pricing */
	pricing: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/** WholeBusVariantWrite */
export interface WholeBusVariantWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Description */
	description?: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
	/** Pricing */
	pricing: "whole";
}

/**
 * WholeFleet
 * A fleet taken whole: one charge for the run, the vehicles only
 * describing what the group rides in.
 */
export interface WholeFleetInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Name */
	name?: string | null;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/** Vehicles */
	vehicles?: Vehicle[];
}

/**
 * WholeFleet
 * A fleet taken whole: one charge for the run, the vehicles only
 * describing what the group rides in.
 */
export interface WholeFleetOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Name */
	name: string | null;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
	/** Vehicles */
	vehicles: Vehicle[];
}

/**
 * WholeFleetChargeOverride
 * What a run taken whole costs this tour, replacing the fleet's own charge.
 */
export interface WholeFleetChargeOverrideInput {
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * WholeFleetChargeOverride
 * What a run taken whole costs this tour, replacing the fleet's own charge.
 */
export interface WholeFleetChargeOverrideOutput {
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
}

/**
 * WholeFleetCreate
 * A coach fleet sold whole as a create takes it: the one charge of the run
 * and the vehicle categories it takes, none of them priced.
 */
export interface WholeFleetCreate {
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
	/** Pricing */
	pricing: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Vehicles */
	vehicles?: VehicleWrite[];
}

/**
 * WholeFlightCreate
 * An air route sold whole as a create takes it: the one charge of the leg
 * and the fare classes it is taken in, none of them priced.
 */
export interface WholeFlightCreate {
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
	/** Pricing */
	pricing: "whole";
	/** Legs */
	legs?: FlightLegInput[];
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Fares */
	fares?: PlainFareCreate[];
}

/**
 * WholeFlightDetails
 * An air route sold whole as the API takes it.
 */
export interface WholeFlightDetails {
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
	/** Pricing */
	pricing: "whole";
	/** Legs */
	legs?: FlightLegInput[];
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/**
 * WholeFlightRoute
 * An air route taken whole: one charge for the leg, the fares only naming
 * what the group flies in.
 */
export interface WholeFlightRouteInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Name */
	name?: string | null;
	/** Legs */
	legs?: FlightLegInput[];
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/** Fares */
	fares?: Fare[];
}

/**
 * WholeFlightRoute
 * An air route taken whole: one charge for the leg, the fares only naming
 * what the group flies in.
 */
export interface WholeFlightRouteOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Name */
	name: string | null;
	/** Legs */
	legs: FlightLegOutput[];
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
	/** Fares */
	fares: Fare[];
}

/** WholeFlightVariantWrite */
export interface WholeFlightVariantWrite {
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
	/** Pricing */
	pricing: "whole";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/**
 * WholeHotel
 * A hotel whose price sits on the hotel: one price whatever rooms the stay
 * fills, the categories only describing what the group gets. How that price
 * scales is the charge inside it — ``fixed`` once, ``per_duration`` per night,
 * ``per_person`` per head.
 */
export interface WholeHotelInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Name */
	name?: string | null;
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Stars */
	stars?: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateInput;
	/** Categories */
	categories?: CategoryInput[];
}

/**
 * WholeHotel
 * A hotel whose price sits on the hotel: one price whatever rooms the stay
 * fills, the categories only describing what the group gets. How that price
 * scales is the charge inside it — ``fixed`` once, ``per_duration`` per night,
 * ``per_person`` per head.
 */
export interface WholeHotelOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Name */
	name: string | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Stars */
	stars: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs: HotelKind[];
	/** Amenities */
	amenities: AmenitiesTypes[];
	/** Check-in and check-out hours and the bands billed outside them. */
	policy: HotelPolicySchemaOutput | null;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateOutput;
	/** Categories */
	categories: CategoryOutput[];
}

/**
 * WholeHotelCreate
 * A hotel whose price sits on the hotel, as a create takes it: its facts,
 * the one price of a stay and the categories it opens with, whose rooms are
 * described and never priced.
 *
 * Check: ``POST /supplier/{supplier_id}/product/{product_id}/variant`` adds a
 * category to a hotel that already stands.
 */
export interface WholeHotelCreate {
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
	/** Pricing */
	pricing: "whole";
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Stars */
	stars?: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateInput;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Categories */
	categories?: CategoryWrite[];
}

/**
 * WholeHotelDetails
 * A hotel sold whole as the API takes it.
 */
export interface WholeHotelDetails {
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
	/** Pricing */
	pricing: "whole";
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Stars */
	stars?: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateInput;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/**
 * WholeHotelVariantWrite
 * One room category of a whole hotel: its rooms are described, the price
 * sitting on the hotel.
 */
export interface WholeHotelVariantWrite {
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
	/** Pricing */
	pricing: "whole";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Rooms */
	rooms?: RoomWrite[];
}

/**
 * WholePriceOverride
 * What a whole stay costs this tour, replacing the hotel's own price.
 */
export interface WholePriceOverrideInput {
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateInput;
}

/**
 * WholePriceOverride
 * What a whole stay costs this tour, replacing the hotel's own price.
 */
export interface WholePriceOverrideOutput {
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateOutput;
}

/**
 * WholeRouteChargeOverride
 * What a leg taken whole costs this tour, replacing the route's own charge.
 */
export interface WholeRouteChargeOverrideInput {
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * WholeRouteChargeOverride
 * What a leg taken whole costs this tour, replacing the route's own charge.
 */
export interface WholeRouteChargeOverrideOutput {
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
}

/**
 * WholeTrainCreate
 * A rail route sold whole as a create takes it: the one charge of the leg
 * and the fare classes it is taken in, none of them priced.
 */
export interface WholeTrainCreate {
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
	/** Pricing */
	pricing: "whole";
	/** Legs */
	legs?: TrainLegInput[];
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Fares */
	fares?: PlainFareCreate[];
}

/**
 * WholeTrainDetails
 * A rail route sold whole as the API takes it.
 */
export interface WholeTrainDetails {
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
	/** Pricing */
	pricing: "whole";
	/** Legs */
	legs?: TrainLegInput[];
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/**
 * WholeTrainRoute
 * A rail route taken whole: one charge for the leg, the fares only naming
 * what the group travels in.
 */
export interface WholeTrainRouteInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Name */
	name?: string | null;
	/** Legs */
	legs?: TrainLegInput[];
	/** Fares */
	fares?: Fare[];
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * WholeTrainRoute
 * A rail route taken whole: one charge for the leg, the fares only naming
 * what the group travels in.
 */
export interface WholeTrainRouteOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Name */
	name: string | null;
	/** Legs */
	legs: TrainLegOutput[];
	/** Fares */
	fares: Fare[];
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
}

/** WholeTrainVariantWrite */
export interface WholeTrainVariantWrite {
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
	/** Pricing */
	pricing: "whole";
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/**
 * WholeTransfer
 * A fleet taken whole: one charge for the leg, the cars only describing
 * what the group rides in.
 */
export interface WholeTransferInput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Name */
	name?: string | null;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/** Cars */
	cars?: Car[];
}

/**
 * WholeTransfer
 * A fleet taken whole: one charge for the leg, the cars only describing
 * what the group rides in.
 */
export interface WholeTransferOutput {
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Name */
	name: string | null;
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
	/** Cars */
	cars: Car[];
}

/**
 * WholeTransferChargeOverride
 * What a ride taken whole costs this tour, replacing the fleet's own charge.
 */
export interface WholeTransferChargeOverrideInput {
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
}

/**
 * WholeTransferChargeOverride
 * What a ride taken whole costs this tour, replacing the fleet's own charge.
 */
export interface WholeTransferChargeOverrideOutput {
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeOutput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeOutput);
}

/**
 * WholeTransferCreate
 * A transfer fleet sold whole as a create takes it: the one charge of the
 * leg and the car categories it takes, none of them priced.
 */
export interface WholeTransferCreate {
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
	/** Pricing */
	pricing: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Cars */
	cars?: CarWrite[];
}

/**
 * WholeTransferDetails
 * A transfer fleet sold whole as the API takes it: what it stores plus the
 * name that lands on the ``name`` column.
 */
export interface WholeTransferDetails {
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
	/** Pricing */
	pricing: "whole";
	/**
	 * Charge
	 * The charge calculation strategy.
	 */
	charge:
		| ({
				typ: "fixed";
		  } & FixedChargeInput)
		| ({
				typ: "per_person";
		  } & PerPersonChargeInput);
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
}

/** WholeTransferVariantWrite */
export interface WholeTransferVariantWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	body_type: VehicleBodyType;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Description */
	description?: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
	/** Pricing */
	pricing: "whole";
}

/**
 * Typ
 * @default "other"
 */
export enum GeneralActivityPubSchemaOutputTypEnum {
	MasterClass = "master_class",
	Sightseeing = "sightseeing",
	Outdoor = "outdoor",
	Riding = "riding",
	Extreme = "extreme",
	Wellness = "wellness",
	Entertainment = "entertainment",
	WaterActivities = "water_activities",
	Photography = "photography",
	Spiritual = "spiritual",
	Other = "other"
}

/** Sub Typ */
export enum GeneralVenueInputSubTypEnum {
	MasterClass = "master_class",
	Sightseeing = "sightseeing",
	Outdoor = "outdoor",
	Riding = "riding",
	Extreme = "extreme",
	Wellness = "wellness",
	Entertainment = "entertainment",
	WaterActivities = "water_activities",
	Photography = "photography",
	Spiritual = "spiritual",
	Other = "other"
}

/** Sub Typ */
export enum GeneralVenueOutputSubTypEnum {
	MasterClass = "master_class",
	Sightseeing = "sightseeing",
	Outdoor = "outdoor",
	Riding = "riding",
	Extreme = "extreme",
	Wellness = "wellness",
	Entertainment = "entertainment",
	WaterActivities = "water_activities",
	Photography = "photography",
	Spiritual = "spiritual",
	Other = "other"
}

/** Typ */
export enum RouteOverrideInputTypEnum {
	Train = "train",
	Flight = "flight"
}

/** Typ */
export enum RouteOverrideOutputTypEnum {
	Train = "train",
	Flight = "flight"
}

export enum StaffUpdateStatusEnum {
	Active = "active",
	Inactive = "inactive"
}

/** Typ */
export enum ToPerFareTypEnum {
	Train = "train",
	Flight = "flight"
}

/** Typ */
export enum ToWholeRouteTypEnum {
	Train = "train",
	Flight = "flight"
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

export interface ListSitemapTourSlugSitemapGetParams {
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/**
	 * Limit
	 * @min 1
	 * @max 50000
	 * @default 50000
	 */
	limit?: number;
}

export interface ResolveTourSlugTourSlugSlugGetParams {
	/** @default "en" */
	read_lang?: LanguageCode;
	/** @default "USD" */
	currency?: Currency;
	/**
	 * Slug
	 * @minLength 1
	 * @maxLength 136
	 * @pattern ^[a-z0-9-]+$
	 */
	slug: string;
}

export interface SuggestLocationsTourCatalogSuggestGetParams {
	/**
	 * Q
	 * @minLength 1
	 * @maxLength 128
	 */
	q: string;
	/** @default "en" */
	read_lang?: LanguageCode;
	/**
	 * Limit
	 * @min 1
	 * @max 20
	 * @default 10
	 */
	limit?: number;
}

export interface ListFiltersTourCatalogFiltersGetParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	city?: string[] | null;
	/** Country */
	country?: string[] | null;
	/** Tour Lang */
	tour_lang?: LanguageCode[] | null;
	/** @default "en" */
	read_lang?: LanguageCode;
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
	city?: string[] | null;
	/** Country */
	country?: string[] | null;
	/** Tour Lang */
	tour_lang?: LanguageCode[] | null;
	/** @default "en" */
	read_lang?: LanguageCode;
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

export interface GetTourSummaryTourTourIdOptionOptionIdSummaryGetParams {
	/** @default "USD" */
	currency?: Currency;
	/** @default "en" */
	read_lang?: LanguageCode;
	/**
	 * As Of
	 * Preview the template spread as of this date.
	 */
	as_of?: string | null;
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

export interface UploadOptionCoverTourTourIdOptionOptionIdCoverPostParams {
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

export interface DeleteOptionCoverTourTourIdOptionOptionIdCoverDeleteParams {
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
export type CreateLibraryEventTourEventLibraryPostPayload =
	| ({
			typ: "ref";
	  } & InformationEvent)
	| ({
			typ: "bus";
	  } & BusEvent)
	| ({
			typ: "train";
	  } & TrainEvent)
	| ({
			typ: "transfer";
	  } & TransferEvent)
	| ({
			typ: "activity";
	  } & ActivityEvent)
	| ({
			typ: "housing";
	  } & HousingEvent)
	| ({
			typ: "flight";
	  } & FlightEvent)
	| ({
			typ: "guide";
	  } & GuideEvent)
	| ({
			typ: "supplementary";
	  } & SupplementaryEvent);

export interface ListLibraryEventsTourEventLibraryGetParams {
	/** Typ */
	typ?: EventTypes | null;
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

export interface GetLibraryEventTourEventLibraryLibraryIdGetParams {
	/**
	 * Library Id
	 * @format uuid
	 */
	libraryId: string;
}

/** Event */
export type UpdateLibraryEventTourEventLibraryLibraryIdPatchPayload =
	| ({
			typ: "ref";
	  } & InformationEvent)
	| ({
			typ: "bus";
	  } & BusEvent)
	| ({
			typ: "train";
	  } & TrainEvent)
	| ({
			typ: "transfer";
	  } & TransferEvent)
	| ({
			typ: "activity";
	  } & ActivityEvent)
	| ({
			typ: "housing";
	  } & HousingEvent)
	| ({
			typ: "flight";
	  } & FlightEvent)
	| ({
			typ: "guide";
	  } & GuideEvent)
	| ({
			typ: "supplementary";
	  } & SupplementaryEvent);

export interface UpdateLibraryEventTourEventLibraryLibraryIdPatchParams {
	/**
	 * Library Id
	 * @format uuid
	 */
	libraryId: string;
}

export interface DeleteLibraryEventTourEventLibraryLibraryIdDeleteParams {
	/**
	 * Library Id
	 * @format uuid
	 */
	libraryId: string;
}

export interface UploadLibraryImagesTourEventLibraryLibraryIdImagesPostParams {
	/**
	 * Library Id
	 * @format uuid
	 */
	libraryId: string;
}

export interface ListLibraryImagesTourEventLibraryLibraryIdImagesAllGetParams {
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
	 * Library Id
	 * @format uuid
	 */
	libraryId: string;
}

export interface DeleteLibraryImageTourEventLibraryLibraryIdImagesImageIdDeleteParams {
	/**
	 * Library Id
	 * @format uuid
	 */
	libraryId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
}

export interface SetPrimaryLibraryImageTourEventLibraryLibraryIdImagesImageIdSetPrimaryPatchParams {
	/**
	 * Library Id
	 * @format uuid
	 */
	libraryId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
}

export enum PolicyCheckOptionTourTourIdOptionIdEventPolicyCheckGetDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum PolicyCheckOptionTourTourIdOptionIdEventPolicyCheckGetDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum PolicyCheckOptionTourTourIdOptionIdEventPolicyCheckGetDetailEnum2 {
	NotFound = "Not found",
	TourOptionNotFoundForThisTour = "Tour option not found for this tour"
}

export enum PolicyCheckOptionTourTourIdOptionIdEventPolicyCheckGetDetailEnum3 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface PolicyCheckOptionTourTourIdOptionIdEventPolicyCheckGetParams {
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

export enum PolicyCheckEventTourTourIdOptionIdEventEventIdPolicyCheckGetDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum PolicyCheckEventTourTourIdOptionIdEventEventIdPolicyCheckGetDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum PolicyCheckEventTourTourIdOptionIdEventEventIdPolicyCheckGetDetailEnum2 {
	NotFound = "Not found",
	TourOptionNotFoundForThisTour = "Tour option not found for this tour"
}

export enum PolicyCheckEventTourTourIdOptionIdEventEventIdPolicyCheckGetDetailEnum3 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface PolicyCheckEventTourTourIdOptionIdEventEventIdPolicyCheckGetParams {
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

export enum CreateEventTourTourIdOptionIdEventCreatePostDetailEnum {
	ANewOptionStatesWhereItsSupplyComesFrom = "A new option states where its supply comes from",
	SupplierProductTypeCannotServeThisEventType = "Supplier product type cannot serve this event type"
}

export enum CreateEventTourTourIdOptionIdEventCreatePostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum CreateEventTourTourIdOptionIdEventCreatePostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum CreateEventTourTourIdOptionIdEventCreatePostDetailEnum3 {
	SupplierNotFound = "Supplier not found",
	SupplierProductNotFound = "Supplier product not found",
	PackageNotFound = "Package not found"
}

export enum CreateEventTourTourIdOptionIdEventCreatePostDetailEnum4 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export enum CreateEventTourTourIdOptionIdEventCreatePostDetailEnum5 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have",
	EveryGuideEventMustPriceEveryTourLanguageAddTheMissingGuidePricesOrNarrowTheToursLanguages = "Every guide event must price every tour language; add the missing guide prices or narrow the tour's languages"
}

/** Event */
export type CreateEventTourTourIdOptionIdEventCreatePostPayload =
	| (
			| ({
					typ: "ref";
			  } & InformationSingleEvent)
			| ({
					typ: "bus";
			  } & BusSingleEvent)
			| ({
					typ: "train";
			  } & TrainSingleEvent)
			| ({
					typ: "transfer";
			  } & TransferSingleEvent)
			| ({
					typ: "activity";
			  } & ActivitySingleEvent)
			| ({
					typ: "housing";
			  } & HousingSingleEvent)
			| ({
					typ: "flight";
			  } & FlightSingleEvent)
			| ({
					typ: "guide";
			  } & GuideSingleEvent)
			| ({
					typ: "supplementary";
			  } & SupplementarySingleEvent)
	  )
	| MultiEvent;

export interface CreateEventTourTourIdOptionIdEventCreatePostParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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

export enum ListTourEventsTourTourIdOptionIdEventItineraryGetDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum ListTourEventsTourTourIdOptionIdEventItineraryGetDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum ListTourEventsTourTourIdOptionIdEventItineraryGetDetailEnum2 {
	NotFound = "Not found",
	TourOptionNotFoundForThisTour = "Tour option not found for this tour"
}

export enum ListTourEventsTourTourIdOptionIdEventItineraryGetDetailEnum3 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface ListTourEventsTourTourIdOptionIdEventItineraryGetParams {
	/** Day */
	day?: number | null;
	/** @default "en" */
	read_lang?: LanguageCode;
	/**
	 * Skip
	 * @min 0
	 * @default 0
	 */
	skip?: number;
	/** Limit */
	limit?: number | null;
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

export enum GetTourEventTourTourIdOptionIdEventEventIdGetDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum GetTourEventTourTourIdOptionIdEventEventIdGetDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum GetTourEventTourTourIdOptionIdEventEventIdGetDetailEnum2 {
	NotFound = "Not found",
	TourOptionNotFoundForThisTour = "Tour option not found for this tour"
}

export enum GetTourEventTourTourIdOptionIdEventEventIdGetDetailEnum3 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface GetTourEventTourTourIdOptionIdEventEventIdGetParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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

export enum DeleteTourEventTourTourIdOptionIdEventEventIdDeleteDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum DeleteTourEventTourTourIdOptionIdEventEventIdDeleteDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum DeleteTourEventTourTourIdOptionIdEventEventIdDeleteDetailEnum2 {
	NotFound = "Not found",
	TourOptionNotFoundForThisTour = "Tour option not found for this tour"
}

export enum DeleteTourEventTourTourIdOptionIdEventEventIdDeleteDetailEnum3 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface DeleteTourEventTourTourIdOptionIdEventEventIdDeleteParams {
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
}

export enum ValidateEventTourTourIdOptionIdEventEventIdValidateGetDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum ValidateEventTourTourIdOptionIdEventEventIdValidateGetDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum ValidateEventTourTourIdOptionIdEventEventIdValidateGetDetailEnum2 {
	NotFound = "Not found"
}

export enum ValidateEventTourTourIdOptionIdEventEventIdValidateGetDetailEnum3 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface ValidateEventTourTourIdOptionIdEventEventIdValidateGetParams {
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
}

export enum SetOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverridePatchDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum SetOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverridePatchDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum SetOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverridePatchDetailEnum2 {
	EventOptionNotFound = "Event option not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum SetOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverridePatchDetailEnum3 {
	EventReadsFromNoSupplierProduct = "Event reads from no supplier product",
	OverrideTypeMustMatchTheEventsType = "Override type must match the event's type",
	OverridePricesByAnArmTheSupplierProductDoesNotPriceBy = "Override prices by an arm the supplier product does not price by"
}

export enum SetOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverridePatchDetailEnum4 {
	OverridePricesAUnitTheEventsScopeDoesNotTake = "Override prices a unit the event's scope does not take"
}

/** Override */
export type SetOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverridePatchPayload =

		| ({
				typ: "housing";
		  } & HotelOverrideInput)
		| ({
				typ: "train";
		  } & RouteOverrideInput)
		| ({
				typ: "flight";
		  } & RouteOverrideInput)
		| ({
				typ: "bus";
		  } & BusOverrideInput)
		| ({
				typ: "transfer";
		  } & TransferOverrideInput)
		| ({
				typ: "activity";
		  } & ActivityOverrideInput);

export interface SetOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverridePatchParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Event Option Id
	 * @format uuid
	 */
	eventOptionId: string;
}

export enum ClearOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverrideDeleteDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum ClearOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverrideDeleteDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum ClearOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverrideDeleteDetailEnum2 {
	EventOptionNotFound = "Event option not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum ClearOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverrideDeleteDetailEnum3 {
	EventReadsFromNoSupplierProduct = "Event reads from no supplier product"
}

export interface ClearOptionOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdOverrideDeleteParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Event Option Id
	 * @format uuid
	 */
	eventOptionId: string;
}

export enum AttachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdAttachPostDetailEnum {
	SupplierProductTypeCannotServeThisEventType = "Supplier product type cannot serve this event type"
}

export enum AttachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdAttachPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum AttachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdAttachPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum AttachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdAttachPostDetailEnum3 {
	EventOptionNotFound = "Event option not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum AttachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdAttachPostDetailEnum4 {
	EventAlreadyReadsFromASupplierProductRelinkItInstead = "Event already reads from a supplier product; relink it instead"
}

export enum AttachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdAttachPostDetailEnum5 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have"
}

export interface AttachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdAttachPostParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Event Option Id
	 * @format uuid
	 */
	eventOptionId: string;
}

export enum RelinkOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdRelinkPostDetailEnum {
	SupplierProductTypeCannotServeThisEventType = "Supplier product type cannot serve this event type"
}

export enum RelinkOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdRelinkPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum RelinkOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdRelinkPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum RelinkOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdRelinkPostDetailEnum3 {
	EventOptionNotFound = "Event option not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum RelinkOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdRelinkPostDetailEnum4 {
	EventReadsFromNoSupplierProduct = "Event reads from no supplier product",
	EventCarriesANegotiatedOverrideSayToDropItToMoveTheLink = "Event carries a negotiated override; say to drop it to move the link"
}

export enum RelinkOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdRelinkPostDetailEnum5 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have"
}

export interface RelinkOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdRelinkPostParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Event Option Id
	 * @format uuid
	 */
	eventOptionId: string;
}

export enum ScopeOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdScopePatchDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum ScopeOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdScopePatchDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum ScopeOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdScopePatchDetailEnum2 {
	EventOptionNotFound = "Event option not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum ScopeOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdScopePatchDetailEnum3 {
	EventReadsFromNoSupplierProduct = "Event reads from no supplier product",
	ScopeWouldStrandANegotiatedOverrideOnUnitsItLeavesOut = "Scope would strand a negotiated override on units it leaves out"
}

export enum ScopeOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdScopePatchDetailEnum4 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have"
}

export interface ScopeOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdScopePatchParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Event Option Id
	 * @format uuid
	 */
	eventOptionId: string;
}

export enum DetachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdDetachPostDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum DetachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdDetachPostDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum DetachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdDetachPostDetailEnum2 {
	EventOptionNotFound = "Event option not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum DetachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdDetachPostDetailEnum3 {
	EventReadsFromNoSupplierProduct = "Event reads from no supplier product",
	EventCarriesANegotiatedOverrideSayToDropItToMoveTheLink = "Event carries a negotiated override; say to drop it to move the link"
}

export interface DetachOptionProductTourTourIdOptionIdEventEventIdOptionEventOptionIdDetachPostParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Event Option Id
	 * @format uuid
	 */
	eventOptionId: string;
}

export enum ReorderEventTourTourIdOptionIdEventEventIdReorderPostDetailEnum {
	BadRequest = "Bad Request"
}

export enum ReorderEventTourTourIdOptionIdEventEventIdReorderPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum ReorderEventTourTourIdOptionIdEventEventIdReorderPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum ReorderEventTourTourIdOptionIdEventEventIdReorderPostDetailEnum3 {
	NotFound = "Not found",
	TourOptionNotFoundForThisTour = "Tour option not found for this tour"
}

export enum ReorderEventTourTourIdOptionIdEventEventIdReorderPostDetailEnum4 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface ReorderEventTourTourIdOptionIdEventEventIdReorderPostParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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

export enum SetEventOptionalTourTourIdOptionIdEventEventIdOptionalPatchDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum SetEventOptionalTourTourIdOptionIdEventEventIdOptionalPatchDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum SetEventOptionalTourTourIdOptionIdEventEventIdOptionalPatchDetailEnum2 {
	NotFound = "Not found",
	TourOptionNotFoundForThisTour = "Tour option not found for this tour"
}

export enum SetEventOptionalTourTourIdOptionIdEventEventIdOptionalPatchDetailEnum3 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface SetEventOptionalTourTourIdOptionIdEventEventIdOptionalPatchParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
}

export enum ReorderEventOptionsTourTourIdOptionIdEventEventIdReorderOptionsPostDetailEnum {
	EventIsNotAMultipleOptionEventNothingToReorder = "Event is not a multiple-option event; nothing to reorder",
	OrderMustNameEachOfTheEventsOptionsExactlyOnce = "Order must name each of the event's options exactly once"
}

export enum ReorderEventOptionsTourTourIdOptionIdEventEventIdReorderOptionsPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum ReorderEventOptionsTourTourIdOptionIdEventEventIdReorderOptionsPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum ReorderEventOptionsTourTourIdOptionIdEventEventIdReorderOptionsPostDetailEnum3 {
	NotFound = "Not found",
	TourOptionNotFoundForThisTour = "Tour option not found for this tour"
}

export enum ReorderEventOptionsTourTourIdOptionIdEventEventIdReorderOptionsPostDetailEnum4 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface ReorderEventOptionsTourTourIdOptionIdEventEventIdReorderOptionsPostParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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

export enum AddOptionTourTourIdOptionIdEventEventIdOptionPostDetailEnum {
	ANewOptionStatesWhereItsSupplyComesFrom = "A new option states where its supply comes from",
	OptionTypeMustMatchTheEventsOtherOptions = "Option type must match the event's other options",
	SupplierProductTypeCannotServeThisEventType = "Supplier product type cannot serve this event type"
}

export enum AddOptionTourTourIdOptionIdEventEventIdOptionPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum AddOptionTourTourIdOptionIdEventEventIdOptionPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum AddOptionTourTourIdOptionIdEventEventIdOptionPostDetailEnum3 {
	SupplierNotFound = "Supplier not found",
	SupplierProductNotFound = "Supplier product not found",
	PackageNotFound = "Package not found"
}

export enum AddOptionTourTourIdOptionIdEventEventIdOptionPostDetailEnum4 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export enum AddOptionTourTourIdOptionIdEventEventIdOptionPostDetailEnum5 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have",
	EveryGuideEventMustPriceEveryTourLanguageAddTheMissingGuidePricesOrNarrowTheToursLanguages = "Every guide event must price every tour language; add the missing guide prices or narrow the tour's languages"
}

/** Option */
export type AddOptionTourTourIdOptionIdEventEventIdOptionPostPayload =
	| ({
			typ: "ref";
	  } & InformationEvent)
	| ({
			typ: "bus";
	  } & BusEvent)
	| ({
			typ: "train";
	  } & TrainEvent)
	| ({
			typ: "transfer";
	  } & TransferEvent)
	| ({
			typ: "activity";
	  } & ActivityEvent)
	| ({
			typ: "housing";
	  } & HousingEvent)
	| ({
			typ: "flight";
	  } & FlightEvent)
	| ({
			typ: "guide";
	  } & GuideEvent)
	| ({
			typ: "supplementary";
	  } & SupplementaryEvent);

export interface AddOptionTourTourIdOptionIdEventEventIdOptionPostParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
}

export enum UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchDetailEnum {
	ANewOptionStatesWhereItsSupplyComesFrom = "A new option states where its supply comes from",
	OptionTypeMustMatchTheEventsOtherOptions = "Option type must match the event's other options",
	SupplierProductTypeCannotServeThisEventType = "Supplier product type cannot serve this event type"
}

export enum UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchDetailEnum3 {
	EventOptionNotFound = "Event option not found",
	SupplierNotFound = "Supplier not found",
	SupplierProductNotFound = "Supplier product not found",
	PackageNotFound = "Package not found"
}

export enum UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchDetailEnum4 {
	SupplyMovesThroughAttachRelinkScopeOrDetach = "Supply moves through attach, relink, scope or detach"
}

export enum UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchDetailEnum5 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have",
	EveryGuideEventMustPriceEveryTourLanguageAddTheMissingGuidePricesOrNarrowTheToursLanguages = "Every guide event must price every tour language; add the missing guide prices or narrow the tour's languages"
}

/** Option */
export type UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchPayload =

		| ({
				typ: "ref";
		  } & InformationEvent)
		| ({
				typ: "bus";
		  } & BusEvent)
		| ({
				typ: "train";
		  } & TrainEvent)
		| ({
				typ: "transfer";
		  } & TransferEvent)
		| ({
				typ: "activity";
		  } & ActivityEvent)
		| ({
				typ: "housing";
		  } & HousingEvent)
		| ({
				typ: "flight";
		  } & FlightEvent)
		| ({
				typ: "guide";
		  } & GuideEvent)
		| ({
				typ: "supplementary";
		  } & SupplementaryEvent);

export interface UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Event Option Id
	 * @format uuid
	 */
	eventOptionId: string;
}

export enum DeleteOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdDeleteDetailEnum {
	CannotDeleteTheLastRemainingOptionOfAnEvent = "Cannot delete the last remaining option of an event"
}

export enum DeleteOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdDeleteDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum DeleteOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdDeleteDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum DeleteOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdDeleteDetailEnum3 {
	EventOptionNotFound = "Event option not found"
}

export enum DeleteOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdDeleteDetailEnum4 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface DeleteOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdDeleteParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Event Option Id
	 * @format uuid
	 */
	eventOptionId: string;
}

export enum MoveOptionToSingleTourTourIdOptionIdEventEventIdOptionEventOptionIdMoveToSinglePostDetailEnum {
	EventIsNotAMultipleOptionEventNothingToReorder = "Event is not a multiple-option event; nothing to reorder"
}

export enum MoveOptionToSingleTourTourIdOptionIdEventEventIdOptionEventOptionIdMoveToSinglePostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum MoveOptionToSingleTourTourIdOptionIdEventEventIdOptionEventOptionIdMoveToSinglePostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum MoveOptionToSingleTourTourIdOptionIdEventEventIdOptionEventOptionIdMoveToSinglePostDetailEnum3 {
	EventOptionNotFound = "Event option not found"
}

export enum MoveOptionToSingleTourTourIdOptionIdEventEventIdOptionEventOptionIdMoveToSinglePostDetailEnum4 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

/** Move */
export type MoveOptionToSingleTourTourIdOptionIdEventEventIdOptionEventOptionIdMoveToSinglePostPayload =
	EventReorderSchema | null;

export interface MoveOptionToSingleTourTourIdOptionIdEventEventIdOptionEventOptionIdMoveToSinglePostParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Event Option Id
	 * @format uuid
	 */
	eventOptionId: string;
}

export enum MoveEventToMultiTourTourIdOptionIdEventEventIdMoveToMultiTargetEventIdPostDetailEnum {
	CannotMoveAnEventIntoItself = "Cannot move an event into itself",
	EventIsNotASingleOptionEvent = "Event is not a single-option event",
	OptionTypeMustMatchTheEventsOtherOptions = "Option type must match the event's other options"
}

export enum MoveEventToMultiTourTourIdOptionIdEventEventIdMoveToMultiTargetEventIdPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum MoveEventToMultiTourTourIdOptionIdEventEventIdMoveToMultiTargetEventIdPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum MoveEventToMultiTourTourIdOptionIdEventEventIdMoveToMultiTargetEventIdPostDetailEnum3 {
	MoveTargetEventNotFound = "Move target event not found"
}

export enum MoveEventToMultiTourTourIdOptionIdEventEventIdMoveToMultiTargetEventIdPostDetailEnum4 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

/** Move */
export type MoveEventToMultiTourTourIdOptionIdEventEventIdMoveToMultiTargetEventIdPostPayload =
	MoveToMultiSchema | null;

export interface MoveEventToMultiTourTourIdOptionIdEventEventIdMoveToMultiTargetEventIdPostParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	eventId: string;
	/**
	 * Target Event Id
	 * @format uuid
	 */
	targetEventId: string;
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

export interface UploadEventNodeImagesTourTourIdEventEventIdNodeNodeIdImagesPostParams {
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
	 * Node Id
	 * @format uuid
	 */
	nodeId: string;
}

export interface DeleteEventNodeImageTourTourIdEventEventIdNodeNodeIdImagesImageIdDeleteParams {
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
	 * Node Id
	 * @format uuid
	 */
	nodeId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
}

export interface SetPrimaryEventNodeImageTourTourIdEventEventIdNodeNodeIdImagesImageIdSetPrimaryPatchParams {
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
	 * Node Id
	 * @format uuid
	 */
	nodeId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
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
	/** From */
	from?: string | null;
	/** To */
	to?: string | null;
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

export interface AddExcludedDateTourTourIdScheduleExcludePostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface BulkAddExcludedDatesTourTourIdScheduleExcludeBulkPostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface BulkRemoveExcludedDatesTourTourIdScheduleExcludeBulkDeleteParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface RemoveExcludedDateTourTourIdScheduleExcludeDateIdDeleteParams {
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

export interface GetLandingPageTourTourIdLandingGetParams {
	/** @default "en" */
	read_lang?: LanguageCode;
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

export interface GetTourTourTourIdPublicGetParams {
	/** @default "en" */
	read_lang?: LanguageCode;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
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

export interface GetPublicTourOptionTourTourIdPublicOptionOptionIdItineraryGetParams {
	/** @default "USD" */
	currency?: Currency;
	/** @default "en" */
	read_lang?: LanguageCode;
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
	/** @default "en" */
	read_lang?: LanguageCode;
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

export interface GetPublicTourScheduleTourTourIdPublicScheduleGetParams {
	/** From */
	from?: string | null;
	/** To */
	to?: string | null;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface CreatePackageTourTourIdOptionIdPackagePostParams {
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

export interface ListPackagesTourTourIdOptionIdPackageGetParams {
	/**
	 * Q
	 * Filter by package name
	 */
	q?: string | null;
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
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
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
}

export interface DeletePackageTourTourIdOptionIdPackagePackageIdDeleteParams {
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
	/**
	 * Package Id
	 * @format uuid
	 */
	packageId: string;
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

export interface ValidateTourTourTourIdValidateGetParams {
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

export interface UnarchiveTourTourTourIdUnarchivePostParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface RefreshTourProjectionTourTourIdRefreshPostParams {
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

export interface GetTourStatisticsTourTourIdStatisticsGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export interface RegenerateTourTranslationsTourComputedI18NTourTourIdRegeneratePostParams {
	/**
	 * Force
	 * @default false
	 */
	force?: boolean;
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

export interface ListPartneredAgenciesOperatorAgenciesPartneredGetParams {
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

export interface ListAgenciesOperatorAgenciesAllGetParams {
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

export interface GetAgencyInfoByIdOperatorAgenciesAgencyIdInfoGetParams {
	/**
	 * Agency Id
	 * @format uuid
	 */
	agencyId: string;
}

export interface SetAgencyDiscountOperatorAgenciesAgencyIdDiscountPatchParams {
	/**
	 * Agency Id
	 * @format uuid
	 */
	agencyId: string;
}

export interface DeleteAgencyDiscountOperatorAgenciesAgencyIdDiscountDeleteParams {
	/**
	 * Agency Id
	 * @format uuid
	 */
	agencyId: string;
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

export interface ReplaceStaffMemberAccessOperatorStaffUserIdAccessPostParams {
	/**
	 * User Id
	 * @format uuid
	 */
	userId: string;
}

export interface GetStaffMemberPermissionsOperatorStaffUserIdPermissionsGetParams {
	/**
	 * User Id
	 * @format uuid
	 */
	userId: string;
}

export interface ListFxRatesOperatorFxRateGetParams {
	/** From Currency */
	from_currency?: Currency | null;
	/** To Currency */
	to_currency?: Currency | null;
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

export interface UpdateFxRateOperatorFxRateFxRateIdPatchParams {
	/**
	 * Fx Rate Id
	 * @format uuid
	 */
	fxRateId: string;
}

export interface DeleteFxRateOperatorFxRateFxRateIdDeleteParams {
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
	/** Status */
	status?: SupplierPaymentStatus | null;
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

export interface RemoveReceiptOperatorSupplierPaymentPaymentIdReceiptFileIdDeleteParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
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

export enum ListAllProductsSupplierProductGetDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum ListAllProductsSupplierProductGetDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export interface ListAllProductsSupplierProductGetParams {
	/** Supplier Id */
	supplier_id?: string | null;
	/** Typ */
	typ?: SupplierType | null;
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

export enum CreateProductSupplierSupplierIdProductPostDetailEnum {
	ProductTypeMustBeOneOfTheSuppliersSupplierTypes = "product type must be one of the supplier's supplier_types"
}

export enum CreateProductSupplierSupplierIdProductPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum CreateProductSupplierSupplierIdProductPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum CreateProductSupplierSupplierIdProductPostDetailEnum3 {
	NotFound = "Not found"
}

/** Payload */
export type CreateProductSupplierSupplierIdProductPostPayload =
	| ({
			typ: "hotel";
	  } & HotelProductCreate)
	| ({
			typ: "train";
	  } & TrainProductCreate)
	| ({
			typ: "flight";
	  } & FlightProductCreate)
	| ({
			typ: "bus";
	  } & BusProductCreate)
	| ({
			typ: "transfer";
	  } & TransferProductCreate)
	| ({
			typ: "activity";
	  } & ActivityProductCreate);

export interface CreateProductSupplierSupplierIdProductPostParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
}

export enum ListSupplierProductsSupplierSupplierIdProductGetDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum ListSupplierProductsSupplierSupplierIdProductGetDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export interface ListSupplierProductsSupplierSupplierIdProductGetParams {
	/** Typ */
	typ?: SupplierType | null;
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
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
}

export enum GetProductSupplierSupplierIdProductProductIdGetDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum GetProductSupplierSupplierIdProductProductIdGetDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum GetProductSupplierSupplierIdProductProductIdGetDetailEnum2 {
	SupplierProductNotFound = "Supplier product not found"
}

export interface GetProductSupplierSupplierIdProductProductIdGetParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
}

export enum UpdateProductSupplierSupplierIdProductProductIdPatchDetailEnum {
	PayloadTypeDoesNotMatchTheProductsType = "payload type does not match the product's type"
}

export enum UpdateProductSupplierSupplierIdProductProductIdPatchDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum UpdateProductSupplierSupplierIdProductProductIdPatchDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum UpdateProductSupplierSupplierIdProductProductIdPatchDetailEnum3 {
	SupplierProductNotFound = "Supplier product not found"
}

export enum UpdateProductSupplierSupplierIdProductProductIdPatchDetailEnum4 {
	PayloadPricesForAnArmTheProductDoesNotPriceBy = "payload prices for an arm the product does not price by",
	PricingSwitchWouldOrphanTourOverrides = "pricing switch would orphan tour overrides"
}

/** Payload */
export type UpdateProductSupplierSupplierIdProductProductIdPatchPayload =
	| ({
			typ: "hotel";
	  } & HotelProductUpdate)
	| ({
			typ: "train";
	  } & TrainProductUpdate)
	| ({
			typ: "flight";
	  } & FlightProductUpdate)
	| ({
			typ: "bus";
	  } & BusProductUpdate)
	| ({
			typ: "transfer";
	  } & TransferProductUpdate)
	| ({
			typ: "activity";
	  } & ActivityProductUpdate);

export interface UpdateProductSupplierSupplierIdProductProductIdPatchParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
}

export enum DeleteProductSupplierSupplierIdProductProductIdDeleteDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum DeleteProductSupplierSupplierIdProductProductIdDeleteDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum DeleteProductSupplierSupplierIdProductProductIdDeleteDetailEnum2 {
	SupplierProductNotFound = "Supplier product not found"
}

export enum DeleteProductSupplierSupplierIdProductProductIdDeleteDetailEnum3 {
	SupplierProductIsReferencedByTourEvents = "Supplier product is referenced by tour events"
}

export interface DeleteProductSupplierSupplierIdProductProductIdDeleteParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
}

export enum ListProductLinksSupplierSupplierIdProductProductIdLinksGetDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum ListProductLinksSupplierSupplierIdProductProductIdLinksGetDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum ListProductLinksSupplierSupplierIdProductProductIdLinksGetDetailEnum2 {
	SupplierProductNotFound = "Supplier product not found"
}

export interface ListProductLinksSupplierSupplierIdProductProductIdLinksGetParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
}

export enum SwitchProductPricingSupplierSupplierIdProductProductIdPricingPostDetailEnum {
	PayloadTypeDoesNotMatchTheProductsType = "payload type does not match the product's type"
}

export enum SwitchProductPricingSupplierSupplierIdProductProductIdPricingPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum SwitchProductPricingSupplierSupplierIdProductProductIdPricingPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum SwitchProductPricingSupplierSupplierIdProductProductIdPricingPostDetailEnum3 {
	SupplierProductNotFound = "Supplier product not found"
}

export enum SwitchProductPricingSupplierSupplierIdProductProductIdPricingPostDetailEnum4 {
	PayloadPricesForAnArmTheProductDoesNotPriceBy = "payload prices for an arm the product does not price by",
	PricingSwitchWouldOrphanTourOverrides = "pricing switch would orphan tour overrides"
}

export enum SwitchProductPricingSupplierSupplierIdProductProductIdPricingPostDetailEnum5 {
	PricingSwitchMustPriceEveryUnitOfTheProductExactlyOnce = "pricing switch must price every unit of the product exactly once"
}

/** Payload */
export type SwitchProductPricingSupplierSupplierIdProductProductIdPricingPostPayload =

		| ({
				typ: "hotel";
		  } & (
				| ({
						to: "per_room";
				  } & ToPerRoom)
				| ({
						to: "whole";
				  } & ToWholeHotel)
		  ))
		| ({
				typ: "train";
		  } & (
				| ({
						to: "per_fare";
				  } & ToPerFare)
				| ({
						to: "whole";
				  } & ToWholeRoute)
		  ))
		| ({
				typ: "flight";
		  } & (
				| ({
						to: "per_fare";
				  } & ToPerFare)
				| ({
						to: "whole";
				  } & ToWholeRoute)
		  ))
		| ({
				typ: "bus";
		  } & (
				| ({
						to: "per_vehicle";
				  } & ToPerVehicle)
				| ({
						to: "whole";
				  } & ToWholeFleet)
		  ))
		| ({
				typ: "transfer";
		  } & (
				| ({
						to: "per_car";
				  } & ToPerCar)
				| ({
						to: "per_car_category";
				  } & ToPerCarCategory)
				| ({
						to: "whole";
				  } & ToWholeTransfer)
		  ));

export interface SwitchProductPricingSupplierSupplierIdProductProductIdPricingPostParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
}

export enum CreateVariantSupplierSupplierIdProductProductIdVariantPostDetailEnum {
	PayloadTypeDoesNotMatchTheProductsType = "payload type does not match the product's type"
}

export enum CreateVariantSupplierSupplierIdProductProductIdVariantPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum CreateVariantSupplierSupplierIdProductProductIdVariantPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum CreateVariantSupplierSupplierIdProductProductIdVariantPostDetailEnum3 {
	SupplierProductNotFound = "Supplier product not found"
}

export enum CreateVariantSupplierSupplierIdProductProductIdVariantPostDetailEnum4 {
	PayloadPricesForAnArmTheProductDoesNotPriceBy = "payload prices for an arm the product does not price by"
}

/** Payload */
export type CreateVariantSupplierSupplierIdProductProductIdVariantPostPayload =
	| ({
			typ: "hotel";
	  } & (
			| ({
					pricing: "per_room";
			  } & PerRoomHotelVariantWrite)
			| ({
					pricing: "whole";
			  } & WholeHotelVariantWrite)
	  ))
	| ({
			typ: "train";
	  } & (
			| ({
					pricing: "per_fare";
			  } & PerFareTrainVariantWrite)
			| ({
					pricing: "whole";
			  } & WholeTrainVariantWrite)
	  ))
	| ({
			typ: "flight";
	  } & (
			| ({
					pricing: "per_fare";
			  } & PerFareFlightVariantWrite)
			| ({
					pricing: "whole";
			  } & WholeFlightVariantWrite)
	  ))
	| ({
			typ: "bus";
	  } & (
			| ({
					pricing: "per_vehicle";
			  } & PerVehicleBusVariantWrite)
			| ({
					pricing: "whole";
			  } & WholeBusVariantWrite)
	  ))
	| ({
			typ: "transfer";
	  } & (
			| ({
					pricing: "per_car";
			  } & PerCarTransferVariantWrite)
			| ({
					pricing: "whole";
			  } & WholeTransferVariantWrite)
			| ({
					pricing: "per_car_category";
			  } & PerCarCategoryTransferVariantWrite)
	  ))
	| ({
			typ: "activity";
	  } & ActivityVariantWrite);

export interface CreateVariantSupplierSupplierIdProductProductIdVariantPostParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
}

export enum UpdateVariantSupplierSupplierIdProductProductIdVariantVariantIdPatchDetailEnum {
	PayloadTypeDoesNotMatchTheProductsType = "payload type does not match the product's type"
}

export enum UpdateVariantSupplierSupplierIdProductProductIdVariantVariantIdPatchDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum UpdateVariantSupplierSupplierIdProductProductIdVariantVariantIdPatchDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum UpdateVariantSupplierSupplierIdProductProductIdVariantVariantIdPatchDetailEnum3 {
	SupplierProductNotFound = "Supplier product not found",
	SupplierProductVariantNotFound = "Supplier product variant not found"
}

export enum UpdateVariantSupplierSupplierIdProductProductIdVariantVariantIdPatchDetailEnum4 {
	PayloadPricesForAnArmTheProductDoesNotPriceBy = "payload prices for an arm the product does not price by",
	SupplierProductVariantIsReferencedByTourEvents = "Supplier product variant is referenced by tour events"
}

/** Payload */
export type UpdateVariantSupplierSupplierIdProductProductIdVariantVariantIdPatchPayload =

		| ({
				typ: "hotel";
		  } & (
				| ({
						pricing: "per_room";
				  } & PerRoomHotelVariantWrite)
				| ({
						pricing: "whole";
				  } & WholeHotelVariantWrite)
		  ))
		| ({
				typ: "train";
		  } & (
				| ({
						pricing: "per_fare";
				  } & PerFareTrainVariantWrite)
				| ({
						pricing: "whole";
				  } & WholeTrainVariantWrite)
		  ))
		| ({
				typ: "flight";
		  } & (
				| ({
						pricing: "per_fare";
				  } & PerFareFlightVariantWrite)
				| ({
						pricing: "whole";
				  } & WholeFlightVariantWrite)
		  ))
		| ({
				typ: "bus";
		  } & (
				| ({
						pricing: "per_vehicle";
				  } & PerVehicleBusVariantWrite)
				| ({
						pricing: "whole";
				  } & WholeBusVariantWrite)
		  ))
		| ({
				typ: "transfer";
		  } & (
				| ({
						pricing: "per_car";
				  } & PerCarTransferVariantWrite)
				| ({
						pricing: "whole";
				  } & WholeTransferVariantWrite)
				| ({
						pricing: "per_car_category";
				  } & PerCarCategoryTransferVariantWrite)
		  ))
		| ({
				typ: "activity";
		  } & ActivityVariantWrite);

export interface UpdateVariantSupplierSupplierIdProductProductIdVariantVariantIdPatchParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
	/**
	 * Variant Id
	 * @format uuid
	 */
	variantId: string;
}

export enum DeleteVariantSupplierSupplierIdProductProductIdVariantVariantIdDeleteDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum DeleteVariantSupplierSupplierIdProductProductIdVariantVariantIdDeleteDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum DeleteVariantSupplierSupplierIdProductProductIdVariantVariantIdDeleteDetailEnum2 {
	SupplierProductNotFound = "Supplier product not found",
	SupplierProductVariantNotFound = "Supplier product variant not found"
}

export enum DeleteVariantSupplierSupplierIdProductProductIdVariantVariantIdDeleteDetailEnum3 {
	SupplierProductVariantIsReferencedByTourEvents = "Supplier product variant is referenced by tour events"
}

export interface DeleteVariantSupplierSupplierIdProductProductIdVariantVariantIdDeleteParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
	/**
	 * Variant Id
	 * @format uuid
	 */
	variantId: string;
}

export enum UploadProductImagesSupplierSupplierIdProductProductIdImagesPostDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum UploadProductImagesSupplierSupplierIdProductProductIdImagesPostDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export interface UploadProductImagesSupplierSupplierIdProductProductIdImagesPostParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
}

export enum ListProductImagesSupplierSupplierIdProductProductIdImagesAllGetDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum ListProductImagesSupplierSupplierIdProductProductIdImagesAllGetDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export interface ListProductImagesSupplierSupplierIdProductProductIdImagesAllGetParams {
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
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
}

export enum DeleteProductImageSupplierSupplierIdProductProductIdImagesImageIdDeleteDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum DeleteProductImageSupplierSupplierIdProductProductIdImagesImageIdDeleteDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export interface DeleteProductImageSupplierSupplierIdProductProductIdImagesImageIdDeleteParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
}

export enum SetPrimaryProductImageSupplierSupplierIdProductProductIdImagesImageIdSetPrimaryPatchDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum SetPrimaryProductImageSupplierSupplierIdProductProductIdImagesImageIdSetPrimaryPatchDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export interface SetPrimaryProductImageSupplierSupplierIdProductProductIdImagesImageIdSetPrimaryPatchParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
}

export enum UploadNodeImagesSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesPostDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum UploadNodeImagesSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesPostDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export interface UploadNodeImagesSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesPostParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
	/**
	 * Variant Id
	 * @format uuid
	 */
	variantId: string;
	/**
	 * Node Id
	 * @format uuid
	 */
	nodeId: string;
}

export enum DeleteNodeImageSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesImageIdDeleteDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum DeleteNodeImageSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesImageIdDeleteDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export interface DeleteNodeImageSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesImageIdDeleteParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
	/**
	 * Variant Id
	 * @format uuid
	 */
	variantId: string;
	/**
	 * Node Id
	 * @format uuid
	 */
	nodeId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
}

export enum SetPrimaryNodeImageRouteSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesImageIdSetPrimaryPatchDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum SetPrimaryNodeImageRouteSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesImageIdSetPrimaryPatchDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export interface SetPrimaryNodeImageRouteSupplierSupplierIdProductProductIdVariantVariantIdNodeNodeIdImagesImageIdSetPrimaryPatchParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
	/**
	 * Product Id
	 * @format uuid
	 */
	productId: string;
	/**
	 * Variant Id
	 * @format uuid
	 */
	variantId: string;
	/**
	 * Node Id
	 * @format uuid
	 */
	nodeId: string;
	/**
	 * Image Id
	 * @format uuid
	 */
	imageId: string;
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

export interface ListBookingAvailabilityBookingOrderOperatorBookingIdAvailabilityGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface ApplyEventAvailabilityBookingOrderOperatorBookingIdEventsEventIdOptionsOptionIndexAvailabilityPatchParams {
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
	/** Option Index */
	optionIndex: number;
}

export interface GetUserBookingOrderBookingOrderUserBookingIdGetParams {
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface GetAgencyBookingOrderBookingOrderAgencyBookingIdGetParams {
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface GetOperatorBookingOrderBookingOrderOperatorBookingIdGetParams {
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface GetOperatorOrderFinancialsBookingOrderOperatorBookingIdFinancialsGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface GetOperatorOrderVarianceBookingOrderOperatorBookingIdVarianceGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface GetOperatorBookingItineraryBookingOrderOperatorBookingIdItineraryGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface TransitionBookingStatusBookingOrderOperatorBookingIdStatusTransitionPatchParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
	transition: BookingTransition;
}

export interface DeclineBookingBookingOrderOperatorBookingIdDeclinePostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
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

export interface GetBookingItineraryBookingOrderBookingIdItineraryGetParams {
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

export interface CancelBookingBookingOrderBookingIdCancelPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

/** Event */
export type AddEventBookingRevisionBookingIdEventPostPayload =
	| (
			| ({
					typ: "ref";
			  } & InformationSingleEvent)
			| ({
					typ: "bus";
			  } & BusSingleEvent)
			| ({
					typ: "train";
			  } & TrainSingleEvent)
			| ({
					typ: "transfer";
			  } & TransferSingleEvent)
			| ({
					typ: "activity";
			  } & ActivitySingleEvent)
			| ({
					typ: "housing";
			  } & HousingSingleEvent)
			| ({
					typ: "flight";
			  } & FlightSingleEvent)
			| ({
					typ: "guide";
			  } & GuideSingleEvent)
			| ({
					typ: "supplementary";
			  } & SupplementarySingleEvent)
	  )
	| MultiEvent;

export interface AddEventBookingRevisionBookingIdEventPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

/** Event */
export type UpdateEventBookingRevisionBookingIdEventEventIdPatchPayload =
	| (
			| ({
					typ: "ref";
			  } & InformationSingleEvent)
			| ({
					typ: "bus";
			  } & BusSingleEvent)
			| ({
					typ: "train";
			  } & TrainSingleEvent)
			| ({
					typ: "transfer";
			  } & TransferSingleEvent)
			| ({
					typ: "activity";
			  } & ActivitySingleEvent)
			| ({
					typ: "housing";
			  } & HousingSingleEvent)
			| ({
					typ: "flight";
			  } & FlightSingleEvent)
			| ({
					typ: "guide";
			  } & GuideSingleEvent)
			| ({
					typ: "supplementary";
			  } & SupplementarySingleEvent)
	  )
	| MultiEvent;

export interface UpdateEventBookingRevisionBookingIdEventEventIdPatchParams {
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

export interface RemoveEventBookingRevisionBookingIdEventEventIdDeleteParams {
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

export interface SetEventProductBookingRevisionBookingIdEventEventIdProductPatchParams {
	/** Event Option Id */
	event_option_id?: string | null;
	/** Option Index */
	option_index?: number | null;
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

export interface ClearEventProductBookingRevisionBookingIdEventEventIdProductDeleteParams {
	/** Event Option Id */
	event_option_id?: string | null;
	/** Option Index */
	option_index?: number | null;
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

export interface ListEditsBookingRevisionBookingIdEditsGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface PreviewBookingRevisionBookingIdPreviewGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

/** Override */
export type SetEventOverrideBookingRevisionBookingIdEventEventIdOverridePatchPayload =

		| ({
				typ: "housing";
		  } & HotelOverrideInput)
		| ({
				typ: "train";
		  } & RouteOverrideInput)
		| ({
				typ: "flight";
		  } & RouteOverrideInput)
		| ({
				typ: "bus";
		  } & BusOverrideInput)
		| ({
				typ: "transfer";
		  } & TransferOverrideInput)
		| ({
				typ: "activity";
		  } & ActivityOverrideInput);

export interface SetEventOverrideBookingRevisionBookingIdEventEventIdOverridePatchParams {
	/** Event Option Id */
	event_option_id?: string | null;
	/** Option Index */
	option_index?: number | null;
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

export interface ClearEventOverrideBookingRevisionBookingIdEventEventIdOverrideDeleteParams {
	/** Event Option Id */
	event_option_id?: string | null;
	/** Option Index */
	option_index?: number | null;
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
	/** Q */
	q?: string | null;
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

export interface ListAttachmentsBookingPaymentPaymentIdAttachmentGetParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
}

export interface AddAttachmentBookingPaymentPaymentIdAttachmentPostParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
}

export interface DownloadAttachmentBookingPaymentPaymentIdAttachmentFileIdGetParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface RemoveAttachmentBookingPaymentPaymentIdAttachmentFileIdDeleteParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface ListBookingReconciliationBookingReconciliationGetParams {
	/** Status */
	status?: BookingStatus | null;
	/** Tour Id */
	tour_id?: string | null;
	/** Date From */
	date_from?: string | null;
	/** Date To */
	date_to?: string | null;
	/**
	 * Outstanding Only
	 * @default false
	 */
	outstanding_only?: boolean;
	/**
	 * Payable Only
	 * @default false
	 */
	payable_only?: boolean;
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

export interface UploadVoucherBookingVoucherBookingIdPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface GetVoucherBookingVoucherBookingIdGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface DeleteVoucherBookingVoucherBookingIdDeleteParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
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

export interface UploadInvoicePdfInvoiceInvoiceIdPdfPostParams {
	/**
	 * Invoice Id
	 * @format uuid
	 */
	invoiceId: string;
}

export interface GetInvoicePdfInvoiceInvoiceIdPdfGetParams {
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

export interface ListLedgerEntriesLedgerOperatorGetParams {
	/** Booking Id */
	booking_id?: string | null;
	/** Party Typ */
	party_typ?: LedgerParty | null;
	/** Party Id */
	party_id?: string | null;
	/** Flow */
	flow?: LedgerFlow | null;
	/** Typ */
	typ?: LedgerEntryType | null;
	/** Source */
	source?: LedgerSource | null;
	/** Occurred From */
	occurred_from?: string | null;
	/** Occurred To */
	occurred_to?: string | null;
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

export interface ListDebtorsLedgerOperatorDebtorsGetParams {
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

export interface ListCreditorsLedgerOperatorCreditorsGetParams {
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

export interface ListOrgAuditAuditAllGetParams {
	/** User Id */
	user_id?: string | null;
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

export interface ListAllAuditAuditAdminAllGetParams {
	/** User Id */
	user_id?: string | null;
	/** Operator Id */
	operator_id?: string | null;
	/** Agency Id */
	agency_id?: string | null;
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

export interface UpdatePermissionGroupAuthPermissionGroupGroupIdPatchParams {
	/**
	 * Group Id
	 * @format uuid
	 */
	groupId: string;
}

export interface DeletePermissionGroupAuthPermissionGroupGroupIdDeleteParams {
	/**
	 * Group Id
	 * @format uuid
	 */
	groupId: string;
}
