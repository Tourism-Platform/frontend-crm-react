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

/**
 * SearchKind
 * What one ``GET /supplier/search`` hit names. Declared in rank order: on
 * a tied score the supplier lists before its product, the product before its
 * variant.
 */
export enum SearchKind {
	Supplier = "supplier",
	Product = "product",
	Variant = "variant"
}

/** RebuildState */
export enum RebuildState {
	Started = "started",
	AlreadyRunning = "already_running"
}

/**
 * PricingWarning
 * A structural smell in how an event is priced, flagged so the operator
 * checks the data before trusting the figure. ``FIXED_CHARGE_ON_SIGHTSEEING``
 * is a heuristic: entrance fees are per head almost everywhere.
 */
export enum PricingWarning {
	FlatChargeOnMultiNightStay = "flat_charge_on_multi_night_stay",
	FlatChargeOnMultiDayGuide = "flat_charge_on_multi_day_guide",
	FixedChargeOnSightseeing = "fixed_charge_on_sightseeing",
	EmptySupply = "empty_supply",
	ZeroCost = "zero_cost"
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
	SupplierPaymentRead = "supplier_payment_read",
	SupplierPaymentWrite = "supplier_payment_write",
	PaymentRouteRead = "payment_route_read",
	PaymentRouteWrite = "payment_route_write",
	AgencyInfoRead = "agency_info_read",
	AgencyInfoWrite = "agency_info_write",
	StaffRead = "staff_read",
	StaffManage = "staff_manage",
	AuditRead = "audit_read",
	TaskRead = "task_read",
	TaskRetry = "task_retry"
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

/** FxSource */
export enum FxSource {
	Cbu = "cbu"
}

/**
 * ExpenseType
 * Enumeration for different types of commissions.
 */
export enum ExpenseType {
	Fixed = "fixed",
	PerPerson = "per_person",
	PerGroup = "per_group",
	PerDuration = "per_duration",
	PerCar = "per_car",
	PerCarCategory = "per_car_category",
	PerRoom = "per_room",
	PerRoomCategory = "per_room_category"
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
	GBP = "GBP",
	CNY = "CNY"
}

/** ClientPaymentStatus */
export enum ClientPaymentStatus {
	NotConfirmed = "not_confirmed",
	Confirmed = "confirmed"
}

/**
 * BreakdownLineKind
 * What one line of an event's bill is: the priced unit itself, a named
 * extra cost riding inside the charge, or a supplier surcharge on top of it.
 */
export enum BreakdownLineKind {
	Unit = "unit",
	ExtraCost = "extra_cost",
	Surcharge = "surcharge"
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
	/**
	 * Pool
	 * @minItems 1
	 */
	pool: ActivityMemberOutput[];
}

/**
 * ActivityDetailsPubSchema
 * A visit as a traveller sees it: when the group is there, and where.
 *
 * A venue is the one supplier a traveller is promised by name — visiting this
 * museum is the point of the entry, not an accident of who had capacity — so
 * unlike every other type the venue keeps its name, its place and its
 * pictures. A pool of venues publishes the one the card is built on.
 */
export interface ActivityDetailsPubSchemaOutput {
	end_time: TimeSchema | null;
	/** Spec */
	spec:
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
	start_time: TimeSchema | null;
}

/**
 * ActivityDetailsUpdate
 * The half of a visit an alternative update writes: the tour's plan,
 * replaced whole. Its pool is written member by member.
 *
 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
 */
export interface ActivityDetailsUpdate {
	/** When the group is somewhere: an activity's hours, an information entry's. */
	plan?: Times;
}

/**
 * ActivityDetailsWrite
 * A visit as a create takes it: the tour's plan and the venues that host it.
 */
export interface ActivityDetailsWrite {
	/** When the group is somewhere: an activity's hours, an information entry's. */
	plan?: Times;
	/** Pool */
	pool?: ActivityMemberWrite[] | null;
}

/** ActivityEvent */
export interface ActivityEvent {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** A visit as a create takes it: the tour's plan and the venues that host it. */
	details: ActivityDetailsWrite;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
}

/** ActivityEventPubRead */
export interface ActivityEventPubReadOutput {
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/** Day */
	day: number | null;
	/** Description */
	description: string | null;
	details: ActivityDetailsPubSchemaOutput | null;
	/** Images */
	images: EventImagePubSchema[];
	/** Is Optional */
	is_optional: boolean | null;
	/** Name */
	name: string | null;
	/** Position */
	position: number | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
}

/** ActivityEventTypeRead */
export interface ActivityEventTypeReadOutput {
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A visit as it reads. */
	details: ActivityDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
}

/** ActivityEventUpdate */
export interface ActivityEventUpdate {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * The half of a visit an alternative update writes: the tour's plan,
	 * replaced whole. Its pool is written member by member.
	 *
	 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
	 */
	details: ActivityDetailsUpdate;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
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
	/** Supplier Id */
	supplier_id?: string | null;
}

/**
 * ActivityMember
 * One venue of a visit's pool as it reads.
 */
export interface ActivityMemberOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Is Main
	 * Whether the public card falls back to this member for its title and pictures. Exactly one member of a pool carries it.
	 * @default false
	 */
	is_main: boolean;
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
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & ActivityProductSupplyOutput);
}

/**
 * ActivityMemberNew
 * A venue joining a visit's pool.
 */
export interface ActivityMemberNew {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & ActivityInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
	/** Typ */
	typ: "activity";
}

/**
 * ActivityMemberUpdate
 * A venue of a visit's pool restated in place: who it is bought from and
 * the venue it states, both replaced whole.
 */
export interface ActivityMemberUpdate {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
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
	/** Supplier Id */
	supplier_id?: string | null;
	/** Typ */
	typ: "activity";
}

/**
 * ActivityMemberWrite
 * One venue of a visit's pool as the API takes it. An ``id`` it carries is
 * ignored: every member a write lands is new.
 */
export interface ActivityMemberWrite {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & ActivityInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
}

/**
 * ActivityOverride
 * A price this tour negotiated with a venue, replacing the offering's own.
 */
export interface ActivityOverrideInput {
	/** The offerings this tour repriced, each named once. */
	rates: OfferingChargesOverrideInput;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
}

/**
 * ActivityOverride
 * A price this tour negotiated with a venue, replacing the offering's own.
 */
export interface ActivityOverrideOutput {
	/** The offerings this tour repriced, each named once. */
	rates: OfferingChargesOverrideOutput;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
}

/** ActivityProductCreate */
export interface ActivityProductCreate {
	/**
	 * A venue as a create takes it: its facts, what it sells and the offerings
	 * it opens with. An offering names no arm of its own — a venue prices one way
	 * — so a create carries the variant route's own body.
	 *
	 * Check: ``POST /supplier/{supplier_id}/product/{product_id}/variant`` adds an
	 * offering to a venue that already stands.
	 */
	details: ActivityProductCreateDetails;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
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
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Offerings */
	offerings?: ActivityVariantWrite[];
	sub_typ: ActivityType;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ?: "activity";
}

/**
 * ActivityProductDetails
 * A venue as the API takes it: what it stores plus the name that lands on
 * the ``name`` column. A product states its facts rather than drafting them,
 * so its name is required where a spec's is not.
 */
export interface ActivityProductDetails {
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	sub_typ: ActivityType;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ?: "activity";
}

/** ActivityProductRead */
export interface ActivityProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Paths */
	image_paths: string[];
	/** Name */
	name: string;
	/** Primary Image Path */
	primary_image_path: string | null;
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
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
}

/**
 * ActivityProductSupply
 * A visit to a supplier's venue.
 */
export interface ActivityProductSupplyOutput {
	override: ActivityOverrideOutput | null;
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
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
	 * Source
	 * @default "product"
	 */
	source: "product";
	/** Who a linked product is bought from, resolved on read. */
	supplier: SupplierRef;
}

/** ActivityProductUpdate */
export interface ActivityProductUpdate {
	details?: ActivityProductDetails | null;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
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
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/** A visit as a create takes it: the tour's plan and the venues that host it. */
	details: ActivityDetailsWrite;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
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
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A visit as it reads. */
	details: ActivityDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ: "activity";
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
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Typ
	 * @default "activity"
	 */
	typ?: "activity";
}

/** AdminUserView */
export interface AdminUserView {
	/** Agency Id */
	agency_id: string | null;
	/** Email */
	email: string;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Operator Id */
	operator_id: string | null;
	/** Picture */
	picture: string | null;
	/** Role */
	role: string;
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
	 * Agency Id
	 * @format uuid
	 */
	agency_id: string;
	/** File Name */
	file_name: string;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Url */
	url: string;
}

/** AgencyInfoModel */
export interface AgencyInfoModel {
	/** Address Line */
	address_line: string | null;
	/**
	 * Agency Id
	 * @format uuid
	 */
	agency_id: string;
	/** Business Name */
	business_name: string | null;
	/** City */
	city: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Contact Position */
	contact_position: string | null;
	/** Country */
	country: string | null;
	/** Description */
	description: string | null;
	/** Director Name */
	director_name: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Legal Name */
	legal_name: string | null;
	/** Logo Path */
	logo_path: string | null;
	/** Tax Id */
	tax_id: string | null;
	/** Website Url */
	website_url: string | null;
}

/** AgencyInfoUpdate */
export interface AgencyInfoUpdate {
	/** Address Line */
	address_line?: string | null;
	/** Business Name */
	business_name?: string | null;
	/** City */
	city?: string | null;
	/** Contact Email */
	contact_email?: string | null;
	/** Contact Person */
	contact_person?: string | null;
	/** Contact Phone */
	contact_phone?: string | null;
	/** Contact Position */
	contact_position?: string | null;
	/** Country */
	country?: string | null;
	/** Description */
	description?: string | null;
	/** Director Name */
	director_name?: string | null;
	/** Legal Name */
	legal_name?: string | null;
	/** Tax Id */
	tax_id?: string | null;
	/** Website Url */
	website_url?: string | null;
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
	info?: AgencyInfoUpdate | null;
	/** Name */
	name?: string | null;
	/** Password */
	password?: string | null;
}

/** AgencyListItem */
export interface AgencyListItem {
	/** Business Name */
	business_name: string | null;
	/** City */
	city: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Country */
	country: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Legal Name */
	legal_name: string | null;
	/** Logo Url */
	logo_url: string | null;
	/** Name */
	name: string;
	/** Tax Id */
	tax_id: string | null;
	/** Website Url */
	website_url: string | null;
}

/** AgencyListResponse */
export interface AgencyListResponse {
	/** Data */
	data: AgencyListItem[];
	/** Total Count */
	total_count: number;
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
	/** Data */
	data: AuditLogRead[];
	/** Total Count */
	total_count: number;
}

/** AuditLogRead */
export interface AuditLogRead {
	/** Agency Id */
	agency_id: string | null;
	/**
	 * Created At
	 * @format date-time
	 */
	created_at: string;
	/** Display Name */
	display_name: string | null;
	/** Email */
	email: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Method */
	method: string;
	/** Operator Id */
	operator_id: string | null;
	/** Path */
	path: string;
	permission: Permissions | null;
	role: UserRoles;
	/** Status Code */
	status_code: number;
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string;
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
	default_currency: Currency;
	/** First Name */
	first_name: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Last Name */
	last_name: string | null;
	/** Location */
	location: string | null;
	/** Phone Number */
	phone_number: string | null;
	/** Profile Picture Path */
	profile_picture_path: string | null;
	/** Title */
	title: string | null;
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string;
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
	 * Amount Uzs
	 * @exclusiveMin 0
	 */
	amount_uzs: number;
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	currency?: Currency | null;
	/** Exchange Rate */
	exchange_rate?: number | null;
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
	/** Comment */
	comment?: string | null;
	/**
	 * Date
	 * @format date
	 */
	date: string;
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Pax
	 * @exclusiveMin 0
	 */
	pax: number;
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
}

/** BookingEventAvailabilityResponse */
export interface BookingEventAvailabilityResponse {
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
	/** Event Name */
	event_name: string | null;
	event_typ: EventTypes | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Option Index */
	option_index: number;
	status: AvailabilityStatus;
}

/**
 * BookingFilesPresent
 * Which documents this order already has, without exposing storage keys —
 * the board only needs to show a paperclip and whether it is complete.
 */
export interface BookingFilesPresent {
	/** Client Payment Proofs */
	client_payment_proofs: number;
	/** Invoice Pdf */
	invoice_pdf: boolean;
	/** Supplier Receipts */
	supplier_receipts: number;
	/** Voucher */
	voucher: boolean;
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
	 * Accrual Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	accrual_profit: string;
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
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
	currency: Currency;
	/** Order Number */
	order_number: string;
	/**
	 * Payable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	payable: string;
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
	 * Planned Revenue
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_revenue: string;
	/**
	 * Receivable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	receivable: string;
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
	/** Order Number */
	order_number: string;
}

/**
 * BookingOrderClientDetail
 * Agency/tourist-facing order detail: instead of echoing the caller's own
 * identity it carries the ``operator`` contact block — who to reach about
 * this booking. ``discount`` is the partner discount frozen into the booking
 * snapshot at creation.
 */
export interface BookingOrderClientDetail {
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
	/**
	 * Who to contact about this booking — the operator running the tour. Joined
	 * into the listing rather than fetched per row so an agency or tourist can reach
	 * the right person without a follow-up call per booking. Every field but ``id``
	 * and ``name`` lives on ``operator_info``, which an operator may not have filled
	 * in yet.
	 */
	operator: OrderOperatorInfo;
	order: BookingOrderResponse;
	tour: OrderTourInfo;
}

/**
 * BookingOrderDetail
 * Operator-facing order detail: who placed the booking — exactly one of
 * ``agency`` / ``user`` is set, mirroring the booking's owner column.
 */
export interface BookingOrderDetail {
	agency: OrderAgencyInfo | null;
	order: BookingOrderResponse;
	tour: OrderTourInfo;
	user: OrderUserInfo | null;
}

/** BookingOrderListResponse */
export interface BookingOrderListResponse {
	/** Data */
	data: BookingOrderRow[];
	/** Total Count */
	total_count: number;
}

/** BookingOrderResponse */
export interface BookingOrderResponse {
	/** Agency Id */
	agency_id: string | null;
	/** Agreed Price */
	agreed_price: string | null;
	/** Cancellation Reason */
	cancellation_reason: string | null;
	/** Cancelled At */
	cancelled_at: string | null;
	/** Comment */
	comment: string | null;
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
	/** Fx Rate Applied */
	fx_rate_applied: string | null;
	/** Fx Rate Id */
	fx_rate_id: string | null;
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
	/** Order Number */
	order_number: string;
	/**
	 * Paid Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	paid_amount: string;
	paid_currency: Currency;
	/** Pax */
	pax: number;
	/** Snapshot Id */
	snapshot_id: string | null;
	status: BookingStatus;
	/**
	 * Tour Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	tour_amount: string;
	tour_currency: Currency;
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
	/** User Id */
	user_id: string | null;
	/** Voucher Path */
	voucher_path: string | null;
}

/** BookingOrderRow */
export interface BookingOrderRow {
	/** Client Name */
	client_name: string;
	client_type: BookingClientType;
	/**
	 * Created At
	 * @format date-time
	 */
	created_at: string;
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
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Who to contact about this booking — the operator running the tour. Joined
	 * into the listing rather than fetched per row so an agency or tourist can reach
	 * the right person without a follow-up call per booking. Every field but ``id``
	 * and ``name`` lives on ``operator_info``, which an operator may not have filled
	 * in yet.
	 */
	operator: OrderOperatorInfo;
	/**
	 * Order Number
	 * @default ""
	 */
	order_number: string;
	/** Pax */
	pax: number;
	status: BookingStatus;
	/** Tour Name */
	tour_name: string | null;
	tour_type: TourType;
}

/** BookingPaxFilesModel */
export interface BookingPaxFilesModel {
	/**
	 * Booking Pax Id
	 * @format uuid
	 */
	booking_pax_id: string;
	/** File Name */
	file_name: string;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Url */
	url: string;
}

/** BookingPaxModel */
export interface BookingPaxModel {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Comment */
	comment: string | null;
	/**
	 * Date Of Birth
	 * @format date
	 */
	date_of_birth: string;
	/**
	 * Expired Date
	 * @format date
	 */
	expired_date: string;
	/** Full Name */
	full_name: string;
	gender: Gender;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Nationality */
	nationality: string;
	/** Passport Number */
	passport_number: string;
}

/**
 * BookingPaxPriceResponse
 * The booking's minimum price for ``pax`` travellers, and every currency
 * the booking can be priced in.
 *
 * Check: GET /booking/order/{booking_id}/price
 */
export interface BookingPaxPriceResponse {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	currency: Currency;
	/** Display Currencies */
	display_currencies: Currency[];
	/** Pax */
	pax: number;
	/**
	 * Total Min Price
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	total_min_price: string;
}

/**
 * BookingQuoteResponse
 * The minimum price a booking of ``tour_option_id`` on ``date`` for ``pax``
 * travellers in ``lang`` would freeze, before the booking exists, and every
 * currency the quote can be priced in.
 *
 * Check: GET /booking/order/quote, POST /booking/order
 */
export interface BookingQuoteResponse {
	currency: Currency;
	/**
	 * Date
	 * @format date
	 */
	date: string;
	/** Display Currencies */
	display_currencies: Currency[];
	lang: LanguageCode;
	/** Pax */
	pax: number;
	/**
	 * Total Min Price
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	total_min_price: string;
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
}

/** BookingReconciliationListResponse */
export interface BookingReconciliationListResponse {
	currency: Currency;
	/** Data */
	data: BookingReconciliationRowOutput[];
	/** Total Count */
	total_count: number;
	/**
	 * Grand totals across the *whole filtered set*, not just the page.
	 *
	 * Only ledger-derived figures appear here. Planned totals are deliberately
	 * absent: they require re-pricing every matching snapshot, and a number that
	 * silently covered only the current page would be worse than no number.
	 */
	totals: ReconciliationTotalsOutput;
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
	 * Accrual Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	accrual_profit: string;
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Client Name */
	client_name: string;
	client_payments: ClientPaymentTally;
	client_type: BookingClientType;
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
	 * Created At
	 * @format date-time
	 */
	created_at: string;
	currency: Currency;
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
	 * Which documents this order already has, without exposing storage keys —
	 * the board only needs to show a paperclip and whether it is complete.
	 */
	files: BookingFilesPresent;
	/** Invoice Id */
	invoice_id: string | null;
	/** Invoice Number */
	invoice_number: string | null;
	/** Order Number */
	order_number: string;
	/** Pax */
	pax: number;
	/**
	 * Payable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	payable: string;
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
	 * Planned Revenue
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_revenue: string;
	/**
	 * Receivable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	receivable: string;
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
	 * Settled Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	settled_profit: string;
	status: BookingStatus;
	status_label: BookingStatusLabel;
	/**
	 * Counts behind the payable figure, so a row explains itself: how many
	 * event lines exist, how many are settled, and how many are still filed under
	 * no supplier at all.
	 */
	supplier_lines: SupplierLineTally;
	/** Tour Name */
	tour_name: string | null;
	tour_type: TourType;
	/**
	 * Variance
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	variance: string;
}

/** BookingUpdate */
export interface BookingUpdate {
	/** Comment */
	comment?: string | null;
	/** Date */
	date?: string | null;
	/** Pax */
	pax?: number | null;
}

/**
 * BreakdownLineSchema
 * One priced unit inside an event's bill, the way a supplier invoice would
 * list it: ``quantity`` units of ``unit_cost`` in the supplier's own currency,
 * multiplied by ``pax`` heads and ``duration`` nights or days where the
 * strategy says so, converted at ``fx_rate`` into ``cost``. ``fee`` and
 * ``markup`` are this line's share, so a bill's lines sum to its event line.
 * ``unit_id`` names the supplier row when the unit is one, so the operator can
 * book exactly this room, car or fare, and ``supply_id`` the pool member it is
 * bought from.
 *
 * Check
 *
 * - ``/tour/{id}/option/{id}/pricing-breakdown`` for the planning bill
 * - ``/booking/operator/{id}/itinerary`` for the bill at the booked headcount
 */
export interface BreakdownLineSchemaOutput {
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
	/** Duration */
	duration: number | null;
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
	fee: MonetaryValueSchema;
	/** Fx Rate */
	fx_rate: string | null;
	/**
	 * What one line of an event's bill is: the priced unit itself, a named
	 * extra cost riding inside the charge, or a supplier surcharge on top of it.
	 */
	kind: BreakdownLineKind;
	/** Label */
	label: string | null;
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
	markup: MonetaryValueSchema;
	/** Pax */
	pax: number | null;
	pricing: ExpenseType | null;
	/**
	 * Quantity
	 * @default 1
	 */
	quantity: number;
	rate: ExpenseType | null;
	/** Supply Id */
	supply_id: string | null;
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
	unit_cost: MonetaryValueSchema;
	/** Unit Id */
	unit_id: string | null;
}

/**
 * BreakdownSpreadSchema
 * An event's bill on each leg of a quote: what the cheapest resolution books
 * and what the dearest one does.
 */
export interface BreakdownSpreadSchemaOutput {
	/** Max */
	max: BreakdownLineSchemaOutput[];
	/** Min */
	min: BreakdownLineSchemaOutput[];
}

/**
 * BusDetailPubSchema
 * A coach leg as a traveller sees it: the route it drives and the coaches
 * it is driven in.
 */
export interface BusDetailPubSchemaOutput {
	/** Hop */
	hop: TransportHopPubSchemaOutput[];
	spec: BusSpecPubSchemaOutput | null;
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
	/**
	 * Pool
	 * @minItems 1
	 */
	pool: BusMemberOutput[];
}

/**
 * BusDetailsUpdate
 * The half of a coach run an alternative update writes: the tour's plan,
 * replaced whole. Its pool is written member by member.
 *
 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
 */
export interface BusDetailsUpdate {
	/**
	 * The run a coach drives: the tour's own statement, whoever supplies the
	 * fleet.
	 */
	plan?: BusRouteInput;
}

/**
 * BusDetailsWrite
 * A coach run as a create takes it: the tour's plan and the coach suppliers that
 * drive it.
 */
export interface BusDetailsWrite {
	/**
	 * The run a coach drives: the tour's own statement, whoever supplies the
	 * fleet.
	 */
	plan?: BusRouteInput;
	/** Pool */
	pool?: BusMemberWrite[] | null;
}

/** BusEvent */
export interface BusEvent {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * A coach run as a create takes it: the tour's plan and the coach suppliers that
	 * drive it.
	 */
	details: BusDetailsWrite;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
}

/** BusEventPubRead */
export interface BusEventPubReadOutput {
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/** Day */
	day: number | null;
	/** Description */
	description: string | null;
	details: BusDetailPubSchemaOutput | null;
	/** Images */
	images: EventImagePubSchema[];
	/** Is Optional */
	is_optional: boolean | null;
	/** Name */
	name: string | null;
	/** Position */
	position: number | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
}

/** BusEventTypeRead */
export interface BusEventTypeReadOutput {
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A coach run as it reads. */
	details: BusDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
}

/** BusEventUpdate */
export interface BusEventUpdate {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * The half of a coach run an alternative update writes: the tour's plan,
	 * replaced whole. Its pool is written member by member.
	 *
	 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
	 */
	details: BusDetailsUpdate;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
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
	/** Supplier Id */
	supplier_id?: string | null;
}

/**
 * BusLeg
 * One leg of a coach run: where it leaves from and arrives at, and when —
 * the tour's own statement, since a coach drives wherever the tour says.
 */
export interface BusLegInput {
	/** Details of the arrival. */
	arrival?: BusPointInput | null;
	/** Details of the departure. */
	departure?: BusPointInput | null;
}

/**
 * BusLeg
 * One leg of a coach run: where it leaves from and arrives at, and when —
 * the tour's own statement, since a coach drives wherever the tour says.
 */
export interface BusLegOutput {
	/** Details of the arrival. */
	arrival: BusPointOutput | null;
	/** Details of the departure. */
	departure: BusPointOutput | null;
}

/**
 * BusMember
 * One coach supplier of a run's pool as it reads.
 */
export interface BusMemberOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Is Main
	 * Whether the public card falls back to this member for its title and pictures. Exactly one member of a pool carries it.
	 * @default false
	 */
	is_main: boolean;
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
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & BusProductSupplyOutput);
}

/**
 * BusMemberNew
 * A coach supplier joining a run's pool.
 */
export interface BusMemberNew {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & BusInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
	/** Typ */
	typ: "bus";
}

/**
 * BusMemberUpdate
 * A coach supplier of a run's pool restated in place: who it is bought from
 * and the fleet it states, both replaced whole.
 */
export interface BusMemberUpdate {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
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
	/** Supplier Id */
	supplier_id?: string | null;
	/** Typ */
	typ: "bus";
}

/**
 * BusMemberWrite
 * One coach supplier of a run's pool as the API takes it. An ``id`` it carries
 * is ignored: every member a write lands is new.
 */
export interface BusMemberWrite {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & BusInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
}

/**
 * BusOverride
 * A price this tour negotiated for a coach run, replacing the fleet's own.
 */
export interface BusOverrideInput {
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
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
}

/**
 * BusOverride
 * A price this tour negotiated for a coach run, replacing the fleet's own.
 */
export interface BusOverrideOutput {
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
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
}

/**
 * BusPoint
 * Where a coach leg leaves from or arrives at, and when.
 */
export interface BusPointInput {
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** The time of an event */
	time?: TimeSchema | null;
}

/**
 * BusPoint
 * Where a coach leg leaves from or arrives at, and when.
 */
export interface BusPointOutput {
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** The time of an event */
	time: TimeSchema | null;
}

/** BusProductCreate */
export interface BusProductCreate {
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
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
}

/** BusProductRead */
export interface BusProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Paths */
	image_paths: string[];
	/** Name */
	name: string;
	/** Primary Image Path */
	primary_image_path: string | null;
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
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
}

/**
 * BusProductSupply
 * A run driven by a supplier's coach fleet.
 */
export interface BusProductSupplyOutput {
	override: BusOverrideOutput | null;
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
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
	 * Source
	 * @default "product"
	 */
	source: "product";
	/** Who a linked product is bought from, resolved on read. */
	supplier: SupplierRef;
}

/** BusProductUpdate */
export interface BusProductUpdate {
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
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
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
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * A coach run as a create takes it: the tour's plan and the coach suppliers that
	 * drive it.
	 */
	details: BusDetailsWrite;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
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
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A coach run as it reads. */
	details: BusDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "bus"
	 */
	typ: "bus";
}

/**
 * BusSpecPubSchema
 * The coaches a run promises, over every fleet of its pool: one entry per
 * distinct body type and capacity, in the order they were met. Which company
 * actually drives is procurement, so a fleet's own name and pictures never
 * reach a traveller, and a coach's own name and description go with them.
 */
export interface BusSpecPubSchemaOutput {
	/** Vehicles */
	vehicles: VehiclePubSchema[];
}

/**
 * Car
 * A car of a whole-leg fleet: described, never priced — the leg is charged
 * once whatever cars it takes. An ``ImageBearingNode``: echo its ``id`` on
 * update to keep the car's pictures.
 */
export interface Car {
	body_type: VehicleBodyType;
	/** Description */
	description?: string | null;
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
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
}

/**
 * CarCategory
 * One class a fleet sells its cars in — economy, comfort, luxury — declared
 * once for the whole fleet. Echo ``id`` to keep the class the same class; one
 * sent without an id is new.
 */
export interface CarCategory {
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Name */
	name?: string | null;
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
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/**
	 * Variant Id
	 * @format uuid
	 */
	variant_id: string;
}

/**
 * CarChargesOverride
 * The cars this tour repriced, each named once.
 */
export interface CarChargesOverrideInput {
	/**
	 * Cars
	 * @minItems 1
	 */
	cars: CarChargeOverrideInput[];
	/**
	 * Pricing
	 * @default "per_car"
	 */
	pricing: "per_car";
}

/**
 * CarChargesOverride
 * The cars this tour repriced, each named once.
 */
export interface CarChargesOverrideOutput {
	/**
	 * Cars
	 * @minItems 1
	 */
	cars: CarChargeOverrideOutput[];
	/**
	 * Pricing
	 * @default "per_car"
	 */
	pricing: "per_car";
}

/**
 * CarPrice
 * What a car costs in one category of its fleet: the unit a fleet priced by
 * category sells, named by ``id`` wherever a tour negotiates it or a booking
 * takes it.
 */
export interface CarPriceInput {
	/**
	 * Category Id
	 * @format uuid
	 */
	category_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/**
	 * Id
	 * @format uuid
	 */
	id?: string;
}

/**
 * CarPrice
 * What a car costs in one category of its fleet: the unit a fleet priced by
 * category sells, named by ``id`` wherever a tour negotiates it or a booking
 * takes it.
 */
export interface CarPriceOutput {
	/**
	 * Category Id
	 * @format uuid
	 */
	category_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
}

/**
 * CarPriceChargeOverride
 * What one car costs this tour in one category: the price row of the fleet
 * it replaces, by its ``id``.
 */
export interface CarPriceChargeOverrideInput {
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/**
	 * Price Id
	 * @format uuid
	 */
	price_id: string;
}

/**
 * CarPriceChargeOverride
 * What one car costs this tour in one category: the price row of the fleet
 * it replaces, by its ``id``.
 */
export interface CarPriceChargeOverrideOutput {
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
	/**
	 * Price Id
	 * @format uuid
	 */
	price_id: string;
}

/**
 * CarPriceChargesOverride
 * The car prices this tour repriced, each named once.
 */
export interface CarPriceChargesOverrideInput {
	/**
	 * Prices
	 * @minItems 1
	 */
	prices: CarPriceChargeOverrideInput[];
	/**
	 * Pricing
	 * @default "per_car_category"
	 */
	pricing: "per_car_category";
}

/**
 * CarPriceChargesOverride
 * The car prices this tour repriced, each named once.
 */
export interface CarPriceChargesOverrideOutput {
	/**
	 * Prices
	 * @minItems 1
	 */
	prices: CarPriceChargeOverrideOutput[];
	/**
	 * Pricing
	 * @default "per_car_category"
	 */
	pricing: "per_car_category";
}

/**
 * CarPriceSwitch
 * What one car costs in one category once the fleet prices by category.
 */
export interface CarPriceSwitch {
	/**
	 * Category Id
	 * @format uuid
	 */
	category_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/**
	 * Variant Id
	 * @format uuid
	 */
	variant_id: string;
}

/**
 * CarPriceWrite
 * What a car costs in one category of its fleet, as a write takes it: the
 * category by the id the fleet declares it under.
 */
export interface CarPriceWrite {
	/**
	 * Category Id
	 * @format uuid
	 */
	category_id: string;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
}

/**
 * CarWrite
 * One car category of a whole fleet as a create takes it: what the car is
 * and how many it seats, never what it costs — the leg carries the charge. No
 * ``id``: the category is minted with the fleet.
 */
export interface CarWrite {
	body_type: VehicleBodyType;
	/** Description */
	description?: string | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
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
 * A car of a fleet priced by category: sold in every category it has a
 * price in and in none of the others.
 */
export interface CategorisedCarInput {
	body_type: VehicleBodyType;
	/** Description */
	description?: string | null;
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
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
	/** Prices */
	prices?: CarPriceInput[];
}

/**
 * CategorisedCar
 * A car of a fleet priced by category: sold in every category it has a
 * price in and in none of the others.
 */
export interface CategorisedCarOutput {
	body_type: VehicleBodyType;
	/** Description */
	description: string | null;
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
	/** Name */
	name: string | null;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
	/** Prices */
	prices: CarPriceOutput[];
}

/**
 * CategorisedCarWrite
 * One car of a fleet priced by category as a create takes it, with what it
 * costs in each category it is sold in; a car priced in none is sold in none
 * until it is.
 */
export interface CategorisedCarWrite {
	body_type: VehicleBodyType;
	/** Description */
	description?: string | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Prices */
	prices?: CarPriceWrite[];
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
	 * Account Name Iban
	 * @maxLength 64
	 */
	account_name_iban: string;
	/**
	 * Bank Address
	 * @maxLength 512
	 */
	bank_address: string;
	/**
	 * Bank Name
	 * @maxLength 255
	 */
	bank_name: string;
	/**
	 * Swift Bic
	 * @minLength 8
	 * @maxLength 11
	 */
	swift_bic: string;
	/**
	 * Typ
	 * @default "classic_swift"
	 */
	typ: "classic_swift";
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
	/** Data */
	data: ClientPaymentResponse[];
	/** Total Count */
	total_count: number;
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
	/** Amount */
	amount: number;
	/** Attachment Count */
	attachment_count: number;
	/** Base Amount */
	base_amount: string | null;
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Client Name */
	client_name: string;
	/** Created At */
	created_at: string | null;
	currency: Currency;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Note */
	note: string | null;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Order Number */
	order_number: string;
	/** Rate */
	rate: string | null;
	status: ClientPaymentStatus;
	/** Tour Name */
	tour_name: string | null;
	/** Updated At */
	updated_at: string | null;
}

/** ClientPaymentTally */
export interface ClientPaymentTally {
	/** Confirmed */
	confirmed: number;
	/** Recorded */
	recorded: number;
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
	currency: Currency;
	/** Data */
	data: CounterpartyBalanceResponseOutput[];
	/** Total Count */
	total_count: number;
	/**
	 * Total Outstanding
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	total_outstanding: string;
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
	 * Billed
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	billed: string;
	currency: Currency;
	/**
	 * Outstanding
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	outstanding: string;
	/**
	 * Paid
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	paid: string;
	/** Party Id */
	party_id: string | null;
	/** Party Name */
	party_name: string | null;
	/**
	 * One end of an entry. ``OPERATOR`` is a party like any other, not an
	 * implied centre — that is what lets a future entry record an agency paying a
	 * supplier directly, with the operator's books merely observing it.
	 */
	party_typ: LedgerParty;
}

/** CreateAgencySchema */
export interface CreateAgencySchema {
	/** Name */
	name: string;
}

/** CreateFinancialSchema */
export interface CreateFinancialSchema {
	currency_type: Currency;
	foc?: FocPolicy | null;
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

/** CustomDetails */
export interface CustomDetails {
	/** Items */
	items: KeyValItem[];
	/**
	 * Typ
	 * @default "custom"
	 */
	typ: "custom";
}

/**
 * DetachBody
 * Take an event off its product. ``keep`` states what it leaves with: the
 * resolved spec copied in as its own, or nothing for the operator to state
 * again.
 */
export interface DetachBody {
	/**
	 * Drop Override
	 * @default false
	 */
	drop_override?: boolean;
	/**
	 * What a detached event keeps of the product it left. SPEC copies the
	 * resolved spec in as its own; NOTHING leaves the event empty for the operator
	 * to state.
	 */
	keep: DetachKeep;
}

/**
 * DurationCharge
 * A per-duration cost together with its own one-off fee and markup.
 */
export interface DurationChargeInput {
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs?: ExtraCostInput[];
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
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
}

/**
 * DurationCharge
 * A per-duration cost together with its own one-off fee and markup.
 */
export interface DurationChargeOutput {
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs: ExtraCostOutput[];
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
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
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
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
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
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
}

/**
 * Empty
 * The half a type states nothing in: a supplementary entry's plan, an
 * information entry's spec.
 */
export type Empty = object;

/** EmptyDetailsPub */
export interface EmptyDetailsPub {
	end_time: TimeSchema | null;
	start_time: TimeSchema | null;
}

/**
 * EventBreakdownSchema
 * One booked event's bill at the booking's own headcount and date, with the
 * structural warnings its pricing carries.
 *
 * Check
 *
 * - ``/booking/revision/{id}/preview`` for the effective itinerary it belongs to
 */
export interface EventBreakdownSchemaOutput {
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Lines */
	lines: BreakdownLineSchemaOutput[];
	/** Warnings */
	warnings: PricingWarning[];
}

/**
 * EventCopyFromEvent
 * Copy an event of the same tour option — every alternative, its pool with
 * pins and overrides, its pictures.
 */
export interface EventCopyFromEvent {
	/**
	 * Day
	 * Day the copy lands on; the source's day.
	 */
	day?: number | null;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Kind */
	kind: "event";
	/**
	 * Position
	 * Position within the day, clamped to append; right after the source on its own day, the end of any other day.
	 */
	position?: number | null;
}

/**
 * EventCopyFromLibrary
 * Copy one of the operator's library entries into the tour option — its
 * pool with pins, its pictures onto the slot.
 */
export interface EventCopyFromLibrary {
	/**
	 * Day
	 * Day the copy lands on
	 * @min 1
	 */
	day: number;
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/** Kind */
	kind: "library";
	/**
	 * Library Id
	 * @format uuid
	 */
	library_id: string;
	/**
	 * Position
	 * Position within the day, clamped to append
	 * @min 0
	 */
	position: number;
}

/** EventCopySchema */
export interface EventCopySchema {
	/** Source */
	source:
		| ({
				kind: "event";
		  } & EventCopyFromEvent)
		| ({
				kind: "library";
		  } & EventCopyFromLibrary);
}

/**
 * EventEditOp
 * Append-only revision log. CREATE and UPDATE carry the full snapshot event
 * UPDATE and DELETE name the existing snapshot event by ``target_id``. ``seq`` is the order and
 * ``at`` the server-set time — together they answer "how many / how long".
 * OVERRIDE carries the negotiated deviation for ``target_id`` — ``None``
 * clears it — names an OPTIONS alternative by ``option_index``, the same
 * positional key the rest of the snapshot layer uses, and the pool member it
 * deviates for by ``supply_id``.
 * ``actor_id``/``actor_name`` freeze who committed the edit — the display name
 * is pinned at write time like everything else in the snapshot, so later staff
 * renames never rewrite history. Edits recorded before actors existed carry
 * ``None``.
 */
export interface EventEditOpOutput {
	/** Actor Id */
	actor_id: string | null;
	/** Actor Name */
	actor_name: string | null;
	/**
	 * At
	 * @format date-time
	 */
	at: string;
	event: OrderTourEventSchemaOutput | null;
	op: EditOp;
	/** Option Index */
	option_index: number | null;
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
	/** Seq */
	seq: number;
	/** Supply Id */
	supply_id: string | null;
	/** Target Id */
	target_id: string | null;
}

/** EventImageModel */
export interface EventImageModel {
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
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
	/** Data */
	data: EventLibraryResponse[];
	/** Total Count */
	total_count: number;
}

/** EventLibraryResponse */
export interface EventLibraryResponse {
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
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
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
 * - ``/tour/{id}/option/{id}/pricing-breakdown`` for the quote these appear in
 */
export interface EventLineOutput {
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
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
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
	 * Accrued
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	accrued: string;
	/**
	 * Date
	 * @format date
	 */
	date: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Event Name */
	event_name: string | null;
	event_typ: EventTypes | null;
	/**
	 * Payable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	payable: string;
	/** Payment Id */
	payment_id: string | null;
	/**
	 * Planned Max
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_max: string;
	/**
	 * Planned Min
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_min: string;
	/**
	 * Settled
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	settled: string;
	/**
	 * Variance
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	variance: string;
}

/** EventVarianceResponse */
export interface EventVarianceResponse {
	/**
	 * Accrued Total
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	accrued_total: string;
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	currency: Currency;
	/** Events */
	events: EventVarianceLineOutput[];
	/** Order Number */
	order_number: string;
	/**
	 * Planned Total Max
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_total_max: string;
	/**
	 * Planned Total Min
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_total_min: string;
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
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
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
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
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
	 * Fare Id
	 * @format uuid
	 */
	fare_id: string;
}

/**
 * FareChargeOverride
 * What one fare class costs this tour.
 */
export interface FareChargeOverrideOutput {
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
	/**
	 * Fare Id
	 * @format uuid
	 */
	fare_id: string;
}

/**
 * FareChargeSwitch
 * What a seat in one fare class costs once the route charges by fare.
 */
export interface FareChargeSwitch {
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
	 * Variant Id
	 * @format uuid
	 */
	variant_id: string;
}

/**
 * FareChargesOverride
 * The fare classes this tour repriced, each named once.
 */
export interface FareChargesOverrideInput {
	/**
	 * Fares
	 * @minItems 1
	 */
	fares: FareChargeOverrideInput[];
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
}

/**
 * FareChargesOverride
 * The fare classes this tour repriced, each named once.
 */
export interface FareChargesOverrideOutput {
	/**
	 * Fares
	 * @minItems 1
	 */
	fares: FareChargeOverrideOutput[];
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
}

/**
 * FareCreate
 * One fare class of a per-fare route as a create takes it: what a seat in
 * it costs, and no ``id`` — the fare is minted with the route.
 */
export interface FareCreate {
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
 * Fee
 * One internal fee line riding along with a cost — operator-side
 * bookkeeping, never agency-facing. A fee carries no fee of its own.
 */
export interface FeeInput {
	cost?: MonetaryValueSchema | null;
	/** Description */
	description?: string | null;
	/** Name */
	name?: string | null;
}

/**
 * Fee
 * One internal fee line riding along with a cost — operator-side
 * bookkeeping, never agency-facing. A fee carries no fee of its own.
 */
export interface FeeOutput {
	cost: MonetaryValueSchema | null;
	/** Description */
	description: string | null;
	/** Name */
	name: string | null;
}

/**
 * FixedCharge
 * A fixed cost together with its own fee and markup.
 */
export interface FixedChargeInput {
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
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs?: ExtraCostInput[];
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
	/**
	 * Typ
	 * @default "fixed"
	 */
	typ: "fixed";
}

/**
 * FixedCharge
 * A fixed cost together with its own fee and markup.
 */
export interface FixedChargeOutput {
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
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs: ExtraCostOutput[];
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
	/**
	 * Typ
	 * @default "fixed"
	 */
	typ: "fixed";
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
	/**
	 * Typ
	 * @default "fixed"
	 */
	typ: "fixed";
}

/**
 * FixedExpense
 * A simple fixed cost, ignores all context.
 */
export interface FixedExpenseOutput {
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
	/**
	 * Typ
	 * @default "fixed"
	 */
	typ: "fixed";
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
	/**
	 * Pool
	 * @minItems 1
	 */
	pool: FlightMemberOutput[];
}

/**
 * FlightDetailsPubSchema
 * A flight as a traveller sees it: where the group is flown, and when.
 */
export interface FlightDetailsPubSchemaOutput {
	spec: FlightSpecPubSchemaOutput | null;
}

/**
 * FlightDetailsUpdate
 * The half of an air leg an alternative update writes: the tour's plan,
 * replaced whole. Its pool is written member by member.
 *
 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
 */
export interface FlightDetailsUpdate {
	/**
	 * When a rail or air leg this tour runs leaves and lands.
	 *
	 * The hours are the operator's own statement, not the supplier's: a route
	 * carries a timetable only if its supplier publishes one, and one stated here
	 * is what the leg runs to regardless. Event-level on purpose: a route's legs
	 * carry no ids to align a per-leg list against.
	 */
	plan?: Schedule;
}

/**
 * FlightDetailsWrite
 * An air leg as a create takes it: the tour's plan and the air suppliers that
 * fly it.
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
	/** Pool */
	pool?: FlightMemberWrite[] | null;
}

/** FlightEvent */
export interface FlightEvent {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * An air leg as a create takes it: the tour's plan and the air suppliers that
	 * fly it.
	 */
	details: FlightDetailsWrite;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
}

/** FlightEventPubRead */
export interface FlightEventPubReadOutput {
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/** Day */
	day: number | null;
	/** Description */
	description: string | null;
	details: FlightDetailsPubSchemaOutput | null;
	/** Images */
	images: EventImagePubSchema[];
	/** Is Optional */
	is_optional: boolean | null;
	/** Name */
	name: string | null;
	/** Position */
	position: number | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
}

/** FlightEventTypeRead */
export interface FlightEventTypeReadOutput {
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** An air leg as it reads. */
	details: FlightDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
}

/** FlightEventUpdate */
export interface FlightEventUpdate {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * The half of an air leg an alternative update writes: the tour's plan,
	 * replaced whole. Its pool is written member by member.
	 *
	 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
	 */
	details: FlightDetailsUpdate;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
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
	/** Amenities */
	amenities: AmenitiesTypes[];
	/** Arrival Airport Code */
	arrival_airport_code: string | null;
	/** Arrival Date */
	arrival_date: string | null;
	/** Arrival Location */
	arrival_location:
		| LocationOutSchema
		| LocationRefSchema
		| LocationInSchema
		| null;
	arrival_time: TimeSchema | null;
	/** Departure Airport Code */
	departure_airport_code: string | null;
	/** Departure Date */
	departure_date: string | null;
	/** Departure Gate */
	departure_gate: string | null;
	/** Departure Location */
	departure_location:
		| LocationOutSchema
		| LocationRefSchema
		| LocationInSchema
		| null;
	/** Departure Terminal */
	departure_terminal: string | null;
	departure_time: TimeSchema | null;
	/** Flight Number */
	flight_number: number | null;
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
	/** Supplier Id */
	supplier_id?: string | null;
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
	 * Amenities
	 * Amenities available on this flight.
	 */
	amenities?: AmenitiesTypes[];
	/**
	 * Arrival Airport Code
	 * Arrival airport IATA code (3 uppercase letters)
	 */
	arrival_airport_code?: string | null;
	/** Arrival Location */
	arrival_location?:
		| LocationOutSchema
		| LocationRefSchema
		| LocationInSchema
		| null;
	/**
	 * Departure Airport Code
	 * Departure airport IATA code (3 uppercase letters)
	 */
	departure_airport_code?: string | null;
	/**
	 * Departure Gate
	 * Departure gate (e.g., 'A12', 'B3')
	 */
	departure_gate?: string | null;
	/** Departure Location */
	departure_location?:
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
	 * Flight Number
	 * Flight number (1–4 digits)
	 */
	flight_number?: number | null;
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
	 * Amenities
	 * Amenities available on this flight.
	 */
	amenities: AmenitiesTypes[];
	/**
	 * Arrival Airport Code
	 * Arrival airport IATA code (3 uppercase letters)
	 */
	arrival_airport_code: string | null;
	/** Arrival Location */
	arrival_location:
		| LocationOutSchema
		| LocationRefSchema
		| LocationInSchema
		| null;
	/**
	 * Departure Airport Code
	 * Departure airport IATA code (3 uppercase letters)
	 */
	departure_airport_code: string | null;
	/**
	 * Departure Gate
	 * Departure gate (e.g., 'A12', 'B3')
	 */
	departure_gate: string | null;
	/** Departure Location */
	departure_location:
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
	 * Flight Number
	 * Flight number (1–4 digits)
	 */
	flight_number: number | null;
}

/**
 * FlightMember
 * One air supplier of a leg's pool as it reads.
 */
export interface FlightMemberOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Is Main
	 * Whether the public card falls back to this member for its title and pictures. Exactly one member of a pool carries it.
	 * @default false
	 */
	is_main: boolean;
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
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & RouteProductSupplyOutput);
}

/**
 * FlightMemberNew
 * An air supplier joining a leg's pool.
 */
export interface FlightMemberNew {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & FlightInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
	/** Typ */
	typ: "flight";
}

/**
 * FlightMemberUpdate
 * An air supplier of a leg's pool restated in place: who it is bought from
 * and the route it states, both replaced whole.
 */
export interface FlightMemberUpdate {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
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
	/** Supplier Id */
	supplier_id?: string | null;
	/** Typ */
	typ: "flight";
}

/**
 * FlightMemberWrite
 * One air supplier of a leg's pool as the API takes it. An ``id`` it carries is
 * ignored: every member a write lands is new.
 */
export interface FlightMemberWrite {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & FlightInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
}

/** FlightProductCreate */
export interface FlightProductCreate {
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
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
}

/** FlightProductRead */
export interface FlightProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Paths */
	image_paths: string[];
	/** Name */
	name: string;
	/** Primary Image Path */
	primary_image_path: string | null;
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
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
}

/** FlightProductUpdate */
export interface FlightProductUpdate {
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
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
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
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * An air leg as a create takes it: the tour's plan and the air suppliers that
	 * fly it.
	 */
	details: FlightDetailsWrite;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
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
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** An air leg as it reads. */
	details: FlightDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "flight"
	 */
	typ: "flight";
}

/**
 * FlightSpecPubSchema
 * The journey a flight promises: the legs it flies and the hours it runs
 * to. Two sellers of one pool put the group on the same flights, so the legs
 * come from the member the card is built on rather than from a combination
 * that would have no meaning.
 */
export interface FlightSpecPubSchemaOutput {
	/** Hop */
	hop: FlightHopPubSchemaOutput[];
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
	 * Free
	 * Max free pax granted above the base.
	 * @min 1
	 */
	free: number;
	/**
	 * Min Pax
	 * Paying base; free pax count from here up.
	 * @min 1
	 */
	min_pax: number;
}

/**
 * FoodActivityPubSchema
 * A meal, and the only kind with a payload of its own today: what the venue
 * serves.
 */
export interface FoodActivityPubSchemaOutput {
	/** Images */
	images: EventImagePubSchema[];
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Name
	 * The venue's own name
	 */
	name: string | null;
	/** Offerings */
	offerings: FoodOfferingPubSchemaOutput[];
	/**
	 * Typ
	 * @default "food"
	 */
	typ: "food";
}

/**
 * FoodOffering
 * One set menu of a food venue: what it costs and what is on it. Echo
 * ``id`` to keep the offering the same offering; one sent without an id is
 * minted here.
 */
export interface FoodOfferingInput {
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
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Menu */
	menu?: MenuItem[];
	/** Name */
	name?: string | null;
}

/**
 * FoodOffering
 * One set menu of a food venue: what it costs and what is on it. Echo
 * ``id`` to keep the offering the same offering; one sent without an id is
 * minted here.
 */
export interface FoodOfferingOutput {
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
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Menu */
	menu: MenuItem[];
	/** Name */
	name: string | null;
}

/**
 * FoodOfferingPubSchema
 * One thing a food venue serves — a set menu, a tasting — price stripped.
 * A tour that describes the meal itself has a single unnamed offering; a venue
 * read off a supplier names each of its own.
 */
export interface FoodOfferingPubSchemaOutput {
	/** Menu */
	menu: MenuItemPubSchema[];
	/** Name */
	name: string | null;
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
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Name */
	name?: string | null;
	/** Offerings */
	offerings?: FoodOfferingInput[];
	/**
	 * Sub Typ
	 * @default "food"
	 */
	sub_typ: "food";
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
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Name */
	name: string | null;
	/** Offerings */
	offerings: FoodOfferingOutput[];
	/**
	 * Sub Typ
	 * @default "food"
	 */
	sub_typ: "food";
}

/** FrozenFxRate */
export interface FrozenFxRateOutput {
	from_currency: Currency;
	/**
	 * Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	rate: string;
	to_currency: Currency;
}

/** FrozenTourFin */
export interface FrozenTourFinOutput {
	currency_type: Currency;
	foc: FocPolicy | null;
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

/** FrozenTourMeta */
export interface FrozenTourMeta {
	/** Age From */
	age_from: number | null;
	/** Age To */
	age_to: number | null;
	/** Categories */
	categories: TourCategory[];
	/** Cover Image Path */
	cover_image_path: string | null;
	/** Days */
	days: number;
	/** Duration Hours */
	duration_hours: number | null;
	/** Group Size */
	group_size: number;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Nights */
	nights: number;
	/** Slug */
	slug: string | null;
	status: TourStatus;
	/** Title */
	title: string | null;
	typ: TourType;
}

/**
 * FrozenTourOption
 * ``markup`` is the option-level override frozen at booking time; snapshot
 * pricing resolves it before the tour-level markup, so later option edits
 * never change this booking.
 */
export interface FrozenTourOptionOutput {
	/** Cover Image Path */
	cover_image_path: string | null;
	/** Description */
	description: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
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
	/** Name */
	name: string | null;
}

/** FullScheduleSchema */
export interface FullScheduleSchema {
	/** Excluded Dates */
	excluded_dates: ExcludedDateModel[];
	/** Fixed Dates */
	fixed_dates: FixedDateModel[];
	/**
	 * Occurrences
	 * Materialised bookable dates (fixed ∪ recurrence) − excluded, within the requested window.
	 */
	occurrences: string[];
	/** Recurrence Rules */
	recurrence_rules: RecurrenceDateModel[];
	schedule: TourScheduleModel;
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

/**
 * FxReferenceRateModel
 * A central bank's rate for one currency on one day, in UZS per 1 unit.
 * Written only by the daily sync and never edited; a new day is a new row.
 *
 * Check:
 *     POST /fx/admin/sync
 *     GET /fx/operator/rate
 */
export interface FxReferenceRateModel {
	currency: Currency;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	rate: string;
	/**
	 * Rate Date
	 * @format date
	 */
	rate_date: string;
	source: FxSource;
}

/**
 * FxSyncRead
 * What one sync wrote. ``inserted`` is empty when the source still
 * publishes a day already stored; ``missing`` lists supported currencies the
 * source did not publish at all.
 */
export interface FxSyncRead {
	/** Inserted */
	inserted: FxReferenceRateModel[];
	/** Missing */
	missing: Currency[];
}

/**
 * GeneralActivityPubSchema
 * Every kind that has nothing to say beyond the base. The tag is spelled out
 * member by member because the union discriminates on it — a new
 * ``ActivityType`` is added here, or given its own arm once it has a payload.
 */
export interface GeneralActivityPubSchemaOutput {
	/** Images */
	images: EventImagePubSchema[];
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Name
	 * The venue's own name
	 */
	name: string | null;
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
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Name */
	name?: string | null;
	/** Offerings */
	offerings?: TicketedOfferingInput[];
	/** Sub Typ */
	sub_typ: GeneralVenueInputSubTypEnum;
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
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Name */
	name: string | null;
	/** Offerings */
	offerings: TicketedOfferingOutput[];
	/** Sub Typ */
	sub_typ: GeneralVenueOutputSubTypEnum;
}

/**
 * GeoFeature
 * Provider-neutral geocoded place.
 */
export interface GeoFeature {
	/** City */
	city: string | null;
	/** Country */
	country: string | null;
	/** Country Code */
	country_code: string | null;
	/** Housenumber */
	housenumber: string | null;
	/** Lat */
	lat: number;
	/** Long */
	long: number;
	/** Name */
	name: string | null;
	/** Postcode */
	postcode: string | null;
	/** State */
	state: string | null;
	/** Street */
	street: string | null;
}

/**
 * GroupSizeTier
 * One group-size pricing step: the flat ``cost`` applies to any headcount
 * from the previous tier's bound + 1 up to ``up_to_pax`` inclusive.
 */
export interface GroupSizeTierInput {
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
	/**
	 * Up To Pax
	 * Inclusive upper headcount bound.
	 * @min 1
	 */
	up_to_pax: number;
}

/**
 * GroupSizeTier
 * One group-size pricing step: the flat ``cost`` applies to any headcount
 * from the previous tier's bound + 1 up to ``up_to_pax`` inclusive.
 */
export interface GroupSizeTierOutput {
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
	/**
	 * Up To Pax
	 * Inclusive upper headcount bound.
	 * @min 1
	 */
	up_to_pax: number;
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
	lang?: LanguageCode | null;
}

/**
 * GuideByLanguageCategory
 * One language's guide price: flat for the engagement, or per day through
 * ``DurationCharge`` — its ``rate`` is where the group-size tiers live.
 */
export interface GuideByLanguageCategoryOutput {
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
	lang: LanguageCode | null;
}

/**
 * GuideDetails
 * A guide as it reads.
 */
export interface GuideDetailsOutput {
	/** How long a guide is engaged for. */
	plan: GuidePlan;
	/**
	 * Pool
	 * @minItems 1
	 */
	pool: GuideMemberOutput[];
}

/**
 * GuideDetailsUpdate
 * The half of a guide an alternative update writes: the tour's plan,
 * replaced whole. Its pool is written member by member.
 *
 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
 */
export interface GuideDetailsUpdate {
	/** How long a guide is engaged for. */
	plan?: GuidePlan;
}

/**
 * GuideDetailsWrite
 * A guide as a create takes it: the tour's plan and the guide suppliers that
 * staff it.
 */
export interface GuideDetailsWrite {
	/** How long a guide is engaged for. */
	plan?: GuidePlan;
	/** Pool */
	pool?: GuideMemberWrite[] | null;
}

/** GuideEvent */
export interface GuideEvent {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * A guide as a create takes it: the tour's plan and the guide suppliers that
	 * staff it.
	 */
	details: GuideDetailsWrite;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "guide"
	 */
	typ: "guide";
}

/** GuideEventTypeRead */
export interface GuideEventTypeReadOutput {
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A guide as it reads. */
	details: GuideDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "guide"
	 */
	typ: "guide";
}

/** GuideEventUpdate */
export interface GuideEventUpdate {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * The half of a guide an alternative update writes: the tour's plan,
	 * replaced whole. Its pool is written member by member.
	 *
	 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
	 */
	details: GuideDetailsUpdate;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "guide"
	 */
	typ: "guide";
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
	/**
	 * A guide as the event states it. No supplier product backs a guide, so the
	 * spec is always the tour's own.
	 */
	spec: GuideSpecInput;
	/** Supplier Id */
	supplier_id?: string | null;
}

/**
 * GuideMember
 * One guide supplier of an engagement's pool as it reads.
 */
export interface GuideMemberOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Is Main
	 * Whether the public card falls back to this member for its title and pictures. Exactly one member of a pool carries it.
	 * @default false
	 */
	is_main: boolean;
	/**
	 * A guide as the event states it. No supplier product backs a guide, so the
	 * spec is always the tour's own.
	 */
	spec: GuideSpecOutput;
	/**
	 * An event that states its own spec: nothing is linked, so the only thing
	 * left to name is the supplier it is bought from.
	 */
	supply: InlineSupply;
}

/**
 * GuideMemberNew
 * A guide supplier joining an engagement's pool.
 */
export interface GuideMemberNew {
	/** Id */
	id?: string | null;
	/**
	 * A guide is always the tour's own: no product supplies one, so the supply
	 * carries the spec and whoever it is bought from.
	 */
	supply: GuideInlineSupplyNew;
	/** Typ */
	typ: "guide";
}

/**
 * GuideMemberUpdate
 * A guide supplier of an engagement's pool restated in place: who it is
 * bought from and the guide it states, both replaced whole.
 */
export interface GuideMemberUpdate {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
	/**
	 * A guide as the event states it. No supplier product backs a guide, so the
	 * spec is always the tour's own.
	 */
	spec: GuideSpecInput;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Typ */
	typ: "guide";
}

/**
 * GuideMemberWrite
 * One guide supplier of an engagement's pool as the API takes it. An ``id`` it
 * carries is ignored: every member a write lands is new.
 */
export interface GuideMemberWrite {
	/** Id */
	id?: string | null;
	/**
	 * A guide is always the tour's own: no product supplies one, so the supply
	 * carries the spec and whoever it is bought from.
	 */
	supply: GuideInlineSupplyNew;
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
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * A guide as a create takes it: the tour's plan and the guide suppliers that
	 * staff it.
	 */
	details: GuideDetailsWrite;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "guide"
	 */
	typ: "guide";
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
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A guide as it reads. */
	details: GuideDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "guide"
	 */
	typ: "guide";
}

/**
 * GuideSpec
 * A guide as the event states it. No supplier product backs a guide, so the
 * spec is always the tour's own.
 */
export interface GuideSpecInput {
	/** Categories */
	categories?: GuideByLanguageCategoryInput[];
	/** Name */
	name?: string | null;
	/**
	 * Typ Tiers
	 * Guide kind stepped by group size; the last tier is open-ended.
	 */
	typ_tiers?: GuideTypeTier[];
}

/**
 * GuideSpec
 * A guide as the event states it. No supplier product backs a guide, so the
 * spec is always the tour's own.
 */
export interface GuideSpecOutput {
	/** Categories */
	categories: GuideByLanguageCategoryOutput[];
	/** Name */
	name: string | null;
	/**
	 * Typ Tiers
	 * Guide kind stepped by group size; the last tier is open-ended.
	 */
	typ_tiers: GuideTypeTier[];
}

/**
 * GuideTypeTier
 * One guide-staffing step: ``typ`` applies to any headcount from the
 * previous tier's bound + 1 up to ``up_to_pax`` inclusive.
 */
export interface GuideTypeTier {
	typ: GuideType;
	/**
	 * Up To Pax
	 * Inclusive upper headcount bound.
	 * @min 1
	 */
	up_to_pax: number;
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
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
}

/**
 * HotelOverride
 * What one tour negotiated away from a hotel product's own terms: the
 * check-in rules, the rates, or both. Only the negotiable half is
 * representable — a hotel's location or stars are facts about the hotel, and a
 * wrong one means the product is wrong, not the tour.
 */
export interface HotelOverrideOutput {
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
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
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
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ: "hotel";
}

/** HotelProductRead */
export interface HotelProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Paths */
	image_paths: string[];
	/** Name */
	name: string;
	/** Primary Image Path */
	primary_image_path: string | null;
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
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ: "hotel";
}

/**
 * HotelProductSupply
 * A stay read off a supplier's hotel: how much of it this event takes and
 * what it negotiated away from the hotel's terms.
 */
export interface HotelProductSupplyOutput {
	override: HotelOverrideOutput | null;
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
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
	 * Source
	 * @default "product"
	 */
	source: "product";
	/** Who a linked product is bought from, resolved on read. */
	supplier: SupplierRef;
}

/**
 * HotelProductUpdate
 * Partial update; ``details`` replaces the whole object rather than merging.
 */
export interface HotelProductUpdate {
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
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ: "hotel";
}

/**
 * HousingDetails
 * A stay as it reads: the tour's plan and the hotels that together fill it.
 */
export interface HousingDetailsOutput {
	/**
	 * How long a stay runs and at what hours — the tour's own statement,
	 * whoever supplies the hotel.
	 */
	plan: Stay;
	/**
	 * Pool
	 * @minItems 1
	 */
	pool: HousingMemberOutput[];
}

/**
 * HousingDetailsPubSchema
 * A stay as a traveller sees it: how long they stay and at what hours, and
 * what they are promised to stay in.
 */
export interface HousingDetailsPubSchemaOutput {
	check_in: TimeSchema | null;
	check_out: TimeSchema | null;
	/** Duration */
	duration: number | null;
	spec: HousingSpecPubSchemaOutput | null;
}

/**
 * HousingDetailsUpdate
 * The half of a stay an alternative update writes: the tour's plan,
 * replaced whole. Its pool is written member by member.
 *
 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
 */
export interface HousingDetailsUpdate {
	/**
	 * How long a stay runs and at what hours — the tour's own statement,
	 * whoever supplies the hotel.
	 */
	plan?: Stay;
}

/**
 * HousingDetailsWrite
 * A stay as a create takes it: the tour's plan and the hotels that together fill
 * it.
 */
export interface HousingDetailsWrite {
	/**
	 * How long a stay runs and at what hours — the tour's own statement,
	 * whoever supplies the hotel.
	 */
	plan?: Stay;
	/** Pool */
	pool?: HousingMemberWrite[] | null;
}

/** HousingEvent */
export interface HousingEvent {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * A stay as a create takes it: the tour's plan and the hotels that together fill
	 * it.
	 */
	details: HousingDetailsWrite;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
}

/** HousingEventPubRead */
export interface HousingEventPubReadOutput {
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/** Day */
	day: number | null;
	/** Description */
	description: string | null;
	details: HousingDetailsPubSchemaOutput | null;
	/** Images */
	images: EventImagePubSchema[];
	/** Is Optional */
	is_optional: boolean | null;
	/** Name */
	name: string | null;
	/** Position */
	position: number | null;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
}

/** HousingEventTypeRead */
export interface HousingEventTypeReadOutput {
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A stay as it reads: the tour's plan and the hotels that together fill it. */
	details: HousingDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
}

/** HousingEventUpdate */
export interface HousingEventUpdate {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * The half of a stay an alternative update writes: the tour's plan,
	 * replaced whole. Its pool is written member by member.
	 *
	 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
	 */
	details: HousingDetailsUpdate;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
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
	/** Supplier Id */
	supplier_id?: string | null;
}

/**
 * HousingMember
 * One hotel of a stay's pool as it reads: where it comes from and the hotel
 * itself — stated inline or assembled from the linked product.
 */
export interface HousingMemberOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Is Main
	 * Whether the public card falls back to this member for its title and pictures. Exactly one member of a pool carries it.
	 * @default false
	 */
	is_main: boolean;
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
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & HotelProductSupplyOutput);
}

/**
 * HousingMemberNew
 * A hotel joining a stay's pool.
 */
export interface HousingMemberNew {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & HousingInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
	/** Typ */
	typ: "housing";
}

/**
 * HousingMemberUpdate
 * A hotel of a stay's pool restated in place: who it is bought from and the
 * hotel it states, both replaced whole.
 */
export interface HousingMemberUpdate {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
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
	/** Supplier Id */
	supplier_id?: string | null;
	/** Typ */
	typ: "housing";
}

/**
 * HousingMemberWrite
 * One hotel of a stay's pool as the API takes it. An ``id`` it carries is
 * ignored: every member a write lands is new.
 */
export interface HousingMemberWrite {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & HousingInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
}

/**
 * HousingRoomPubSchema
 * One room, charge stripped. Flat across both room shapes: a categorised
 * room states ``typ``/``pax``, a per-room one states ``name``/``description``.
 */
export interface HousingRoomPubSchema {
	/** Description */
	description: string | null;
	/** Images */
	images: EventImagePubSchema[];
	/** Name */
	name: string | null;
	/** Pax */
	pax: number | null;
	typ: HousingRoomTypes | null;
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
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * A stay as a create takes it: the tour's plan and the hotels that together fill
	 * it.
	 */
	details: HousingDetailsWrite;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
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
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A stay as it reads: the tour's plan and the hotels that together fill it. */
	details: HousingDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "housing"
	 */
	typ: "housing";
}

/**
 * HousingSpecPubSchema
 * The stay a traveller is promised, over every hotel of the pool. Which
 * property the group is actually put in is procurement, so no hotel's name,
 * address or pictures reach a traveller; what is promised is the class, and
 * every figure here is a floor that holds whichever member they land in.
 *
 * ``stars`` is the lowest of the pool. ``typs`` and ``amenities`` are what
 * every member has, so one member without a pool drops the pool from the
 * card. ``rooms`` is every distinct type and capacity the pool's scoped rooms
 * offer, without the names each hotel gives them.
 */
export interface HousingSpecPubSchemaOutput {
	/** Amenities */
	amenities: AmenitiesTypes[];
	/** Rooms */
	rooms: HousingRoomPubSchema[];
	/** Stars */
	stars: number | null;
	/** Typs */
	typs: HotelKind[];
}

/**
 * InformationDetails
 * An information entry as it reads.
 */
export interface InformationDetailsOutput {
	/** When the group is somewhere: an activity's hours, an information entry's. */
	plan: Times;
	/**
	 * Pool
	 * @minItems 1
	 */
	pool: InformationMember[];
}

/**
 * InformationDetailsUpdate
 * The half of an information entry an alternative update writes: its
 * hours, replaced whole.
 *
 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
 */
export interface InformationDetailsUpdate {
	/** When the group is somewhere: an activity's hours, an information entry's. */
	plan?: Times;
}

/**
 * InformationDetailsWrite
 * An information entry as a create takes it. No product supplies one, so a
 * create that leaves the pool out gets a single member naming no supplier.
 */
export interface InformationDetailsWrite {
	/** When the group is somewhere: an activity's hours, an information entry's. */
	plan?: Times;
	/** Pool */
	pool?: InformationMemberWrite[] | null;
}

/** InformationEvent */
export interface InformationEvent {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * An information entry as a create takes it. No product supplies one, so a
	 * create that leaves the pool out gets a single member naming no supplier.
	 */
	details?: InformationDetailsWrite;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
}

/** InformationEventPubRead */
export interface InformationEventPubReadOutput {
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/** Day */
	day: number | null;
	/** Description */
	description: string | null;
	details: EmptyDetailsPub | null;
	/** Images */
	images: EventImagePubSchema[];
	/** Is Optional */
	is_optional: boolean | null;
	/** Name */
	name: string | null;
	/** Position */
	position: number | null;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
}

/** InformationEventTypeRead */
export interface InformationEventTypeReadOutput {
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** An information entry as it reads. */
	details: InformationDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
}

/** InformationEventUpdate */
export interface InformationEventUpdate {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * The half of an information entry an alternative update writes: its
	 * hours, replaced whole.
	 *
	 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
	 */
	details?: InformationDetailsUpdate;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
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
	/**
	 * The half a type states nothing in: a supplementary entry's plan, an
	 * information entry's spec.
	 */
	spec?: Empty;
	/** Supplier Id */
	supplier_id?: string | null;
}

/**
 * InformationMember
 * One member of an information entry's pool as it reads.
 */
export interface InformationMember {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Is Main
	 * Whether the public card falls back to this member for its title and pictures. Exactly one member of a pool carries it.
	 * @default false
	 */
	is_main: boolean;
	/**
	 * The half a type states nothing in: a supplementary entry's plan, an
	 * information entry's spec.
	 */
	spec: Empty;
	/**
	 * An event that states its own spec: nothing is linked, so the only thing
	 * left to name is the supplier it is bought from.
	 */
	supply: InlineSupply;
}

/**
 * InformationMemberNew
 * A member joining an information entry's pool.
 */
export interface InformationMemberNew {
	/** Id */
	id?: string | null;
	/**
	 * An information entry states nothing but its hours, and no product backs
	 * it, so its supply carries only who it is bought from — if anyone.
	 */
	supply?: InformationInlineSupplyNew;
	/** Typ */
	typ: "ref";
}

/**
 * InformationMemberUpdate
 * A member of an information entry's pool restated in place: who it is
 * bought from.
 */
export interface InformationMemberUpdate {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
	/**
	 * The half a type states nothing in: a supplementary entry's plan, an
	 * information entry's spec.
	 */
	spec?: Empty;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Typ */
	typ: "ref";
}

/**
 * InformationMemberWrite
 * One member of an information entry's pool as the API takes it. An ``id`` it
 * carries is ignored: every member a write lands is new.
 */
export interface InformationMemberWrite {
	/** Id */
	id?: string | null;
	/**
	 * An information entry states nothing but its hours, and no product backs
	 * it, so its supply carries only who it is bought from — if anyone.
	 */
	supply?: InformationInlineSupplyNew;
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
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * An information entry as a create takes it. No product supplies one, so a
	 * create that leaves the pool out gets a single member naming no supplier.
	 */
	details?: InformationDetailsWrite;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
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
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** An information entry as it reads. */
	details: InformationDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "ref"
	 */
	typ: "ref";
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
	 * Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	amount: string;
	/**
	 * Balance
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	balance: string;
	/** Booking Id */
	booking_id: string | null;
	/** Currency */
	currency: string;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Invoice Number */
	invoice_number: string;
	/** Issued At */
	issued_at: string | null;
	/** Order Number */
	order_number: string | null;
	/**
	 * Paid Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	paid_amount: string;
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
	status: InvoiceStatus;
	/**
	 * Total
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	total: string;
	typ: InvoiceType;
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
	/** Booking Id */
	booking_id: string | null;
	/** Counterparty Name */
	counterparty_name: string | null;
	/** Currency */
	currency: string;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Invoice Number */
	invoice_number: string;
	/** Issue Date */
	issue_date: string | null;
	/** Order Number */
	order_number: string | null;
	/** Paid Amount */
	paid_amount: number;
	status: InvoiceStatus;
	/** Total Amount */
	total_amount: number;
	typ: InvoiceType;
}

/** InvoiceListResponse */
export interface InvoiceListResponse {
	/** Data */
	data: InvoiceListItem[];
	/** Total Count */
	total_count: number;
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
	/** Date */
	date: string | null;
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	time: TimeSchema | null;
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
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Path */
	image_path: string;
	/** Is Primary */
	is_primary: boolean;
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
	/** Additional Information */
	additional_information: string | null;
	/** Amenities Included */
	amenities_included: string[];
	/** Amenities Not Included */
	amenities_not_included: string[];
	/** Cancellation Policy */
	cancellation_policy: string | null;
	/** Description */
	description: string | null;
	/** Images */
	images: LandingPageImagePubSchema[];
	/** Languages */
	languages: LanguageCode[];
	/** Overview */
	overview: string | null;
	/** Overview Description */
	overview_description: string | null;
	/** Pickup Description */
	pickup_description: string | null;
	/** Pickup Type */
	pickup_type: PickupType[];
	/** Title */
	title: string | null;
}

/** LandingPageResponse */
export interface LandingPageResponse {
	/** Additional Information */
	additional_information: string | null;
	/** Amenities Included */
	amenities_included: string[];
	/** Amenities Not Included */
	amenities_not_included: string[];
	/** Cancellation Policy */
	cancellation_policy: string | null;
	/** Created At */
	created_at: string | null;
	/** Description */
	description: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Languages */
	languages: LanguageCode[];
	/** Overview */
	overview: string | null;
	/** Overview Description */
	overview_description: string | null;
	/** Pickup Description */
	pickup_description: string | null;
	/** Pickup Type */
	pickup_type: PickupType[];
	/** Title */
	title: string | null;
	/** Updated At */
	updated_at: string | null;
}

/** LandingPageUpdate */
export interface LandingPageUpdate {
	/** Additional Information */
	additional_information?: string | null;
	/** Amenities Included */
	amenities_included?: string[] | null;
	/** Amenities Not Included */
	amenities_not_included?: string[] | null;
	/** Cancellation Policy */
	cancellation_policy?: string | null;
	/** Description */
	description?: string | null;
	/** Overview */
	overview?: string | null;
	/** Overview Description */
	overview_description?: string | null;
	/** Pickup Description */
	pickup_description?: string | null;
	/** Pickup Type */
	pickup_type?: PickupType[] | null;
	/** Title */
	title?: string | null;
}

/** LedgerEntryListResponse */
export interface LedgerEntryListResponse {
	/** Data */
	data: LedgerEntryResponseOutput[];
	/** Total Count */
	total_count: number;
}

/**
 * LedgerEntryResponse
 * ``flow`` is derived, not stored: ``INBOUND`` when the operator is the
 * payee, ``OUTBOUND`` when they are the payer, ``None`` for an entry between
 * two other participants that the operator's books merely observe.
 */
export interface LedgerEntryResponseOutput {
	/**
	 * Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	amount: string;
	/**
	 * Base Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	base_amount: string;
	/** Booking Id */
	booking_id: string | null;
	currency: Currency;
	flow: LedgerFlow | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Note */
	note: string | null;
	/**
	 * Occurred At
	 * @format date-time
	 */
	occurred_at: string;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Order Number */
	order_number: string | null;
	/** Payee Id */
	payee_id: string | null;
	/**
	 * One end of an entry. ``OPERATOR`` is a party like any other, not an
	 * implied centre — that is what lets a future entry record an agency paying a
	 * supplier directly, with the operator's books merely observing it.
	 */
	payee_typ: LedgerParty;
	/** Payer Id */
	payer_id: string | null;
	/**
	 * One end of an entry. ``OPERATOR`` is a party like any other, not an
	 * implied centre — that is what lets a future entry record an agency paying a
	 * supplier directly, with the operator's books merely observing it.
	 */
	payer_typ: LedgerParty;
	/**
	 * Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	rate: string;
	/** Snapshot Event Id */
	snapshot_event_id: string | null;
	/**
	 * Which rail produced the entry. Bank, card and SWIFT rails append their
	 * own members here; the posting contract does not change.
	 */
	source: LedgerSource;
	/** Source Id */
	source_id: string | null;
	/**
	 * ``ACCRUAL`` is what was agreed and is now owed; ``SETTLEMENT`` is cash
	 * that actually moved. Debt is the difference between the two.
	 *
	 * There is exactly one accrual per source row and it is restated in place as
	 * the operator edits the agreed figure. Settlements accumulate — an invoice
	 * paid in three instalments posts three of them.
	 */
	typ: LedgerEntryType;
}

/**
 * LibraryCopyFromEvent
 * Save one alternative of a tour event — its texts, plan and pool with
 * pins, and the slot's pictures.
 */
export interface LibraryCopyFromEvent {
	/**
	 * Event Option Id
	 * The alternative: ``event.id`` on a single event, ``event.details[].id`` on a choice.
	 * @format uuid
	 */
	event_option_id: string;
	/** Kind */
	kind: "event";
	/**
	 * Option Id
	 * @format uuid
	 */
	option_id: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tour_id: string;
}

/**
 * LibraryCopyFromLibrary
 * Duplicate a library entry with its pictures.
 */
export interface LibraryCopyFromLibrary {
	/** Kind */
	kind: "library";
	/**
	 * Library Id
	 * @format uuid
	 */
	library_id: string;
}

/** LibraryCopySchema */
export interface LibraryCopySchema {
	/** Source */
	source:
		| ({
				kind: "event";
		  } & LibraryCopyFromEvent)
		| ({
				kind: "library";
		  } & LibraryCopyFromLibrary);
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
	/** Address */
	address?: string | null;
	/** City */
	city?: string | null;
	/**
	 * Id
	 * Stored location id; send it back to reuse this location.
	 */
	id?: string | null;
	lang: LanguageCode;
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
	/** City */
	city: string | null;
	kind: SuggestKind;
	/** Value */
	value: string;
}

/** MeSchema */
export interface MeSchema {
	/** Agency Id */
	agency_id: string | null;
	/** Email */
	email: string;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Operator Id */
	operator_id: string | null;
	/** Picture */
	picture: string | null;
	/** Role */
	role: string;
}

/**
 * MenuItem
 * One dish or item of a set menu. An ``ImageBearingNode``: echo its ``id``
 * on update to keep the item's pictures.
 */
export interface MenuItem {
	/** Description */
	description?: string | null;
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
}

/**
 * MenuItemPubSchema
 * One dish on a food offering's menu, photos kept.
 */
export interface MenuItemPubSchema {
	/** Description */
	description: string | null;
	/** Images */
	images: EventImagePubSchema[];
	/** Name */
	name: string | null;
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
	/** @default "USD" */
	currency?: Currency;
	/**
	 * Val
	 * The total monetary value.
	 * @min 0
	 */
	val: number;
}

/** MoveToMultiResult */
export interface MoveToMultiResult {
	/**
	 * Removed Event Id
	 * @format uuid
	 */
	removed_event_id: string;
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
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/** Typ */
	typ: "options";
}

/** MultiEventPub */
export interface MultiEventPubOutput {
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/** Day */
	day: number | null;
	/** Description */
	description: string | null;
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
	/** Images */
	images: EventImagePubSchema[];
	/** Is Optional */
	is_optional: boolean | null;
	/** Name */
	name: string | null;
	/** Position */
	position: number | null;
	/**
	 * Typ
	 * @default "options"
	 */
	typ: "options";
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
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/** Typ */
	typ: "options";
}

/** MyAccountRead */
export interface MyAccountRead {
	default_currency: Currency;
	/** Email */
	email: string;
	/** First Name */
	first_name: string | null;
	/** Last Name */
	last_name: string | null;
	/** Location */
	location: string | null;
	/** Phone Number */
	phone_number: string | null;
	/** Profile Picture Path */
	profile_picture_path: string | null;
	/** Title */
	title: string | null;
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
	 * Offering Id
	 * @format uuid
	 */
	offering_id: string;
}

/**
 * OfferingChargeOverride
 * What one offering costs this tour.
 */
export interface OfferingChargeOverrideOutput {
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
	/**
	 * Offering Id
	 * @format uuid
	 */
	offering_id: string;
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
 * The event takes part of the product and ignores the rest. Every pin is a
 * row whose foreign keys name the linked product, so a pin can only name a
 * unit of that product and a pinned unit cannot be deleted.
 *
 * ``ids`` are the variants it takes; left empty it takes every one, which only
 * ``categories`` may narrow. ``units`` are rooms of pinned hotel categories: a
 * pinned category none of whose rooms is listed takes all of them, now and
 * later. ``categories`` are car categories of a fleet priced by category, taken
 * across every car in scope, now and later.
 */
export interface OnlyVariants {
	/**
	 * Categories
	 * Car categories the event takes across every car in scope.
	 */
	categories?: string[];
	/** Ids */
	ids?: string[];
	/**
	 * Typ
	 * @default "only"
	 */
	typ: "only";
	/**
	 * Units
	 * Rooms of the pinned hotel categories the event takes.
	 */
	units?: string[];
}

/** OperatorCreateSchema */
export interface OperatorCreateSchema {
	/** Name */
	name: string;
}

/** OperatorFilesModel */
export interface OperatorFilesModel {
	/** File Name */
	file_name: string;
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
	/** Accepted Currencies */
	accepted_currencies: Currency[];
	default_currency: Currency;
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
	/**
	 * Fx Margin
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	fx_margin: string;
	/** Profit Tax Enabled */
	profit_tax_enabled: boolean;
	/**
	 * Profit Tax Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	profit_tax_rate: string;
	/** Vat Enabled */
	vat_enabled: boolean;
	/**
	 * Vat Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	vat_rate: string;
}

/** OperatorFinancialSettingsUpdate */
export interface OperatorFinancialSettingsUpdate {
	/**
	 * Accepted Currencies
	 * Currencies the operator holds accounts in. Every price, payment and payment route must use one of them; default_currency must be one of them.
	 */
	accepted_currencies?: Currency[] | null;
	default_currency?: Currency | null;
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
	/**
	 * Fx Margin
	 * Share every currency conversion is pushed in the operator's favour, e.g. 0.02 for 2%.
	 */
	fx_margin?: number | string | null;
	/** Profit Tax Enabled */
	profit_tax_enabled?: boolean | null;
	/** Profit Tax Rate */
	profit_tax_rate?: number | string | null;
	/** Vat Enabled */
	vat_enabled?: boolean | null;
	/** Vat Rate */
	vat_rate?: number | string | null;
}

/**
 * OperatorFxRateRead
 * One accepted currency against the operator's base currency: the bank's
 * rate and the rate a client is charged at once the margin is on.
 */
export interface OperatorFxRateReadOutput {
	from_currency: Currency;
	/**
	 * Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	rate: string;
	/** Rate Date */
	rate_date: string | null;
	/**
	 * Rate With Margin
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	rate_with_margin: string;
	to_currency: Currency;
}

/** OperatorInfoModel */
export interface OperatorInfoModel {
	/** Address Line */
	address_line: string | null;
	/** Business Name */
	business_name: string | null;
	/** City */
	city: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Contact Position */
	contact_position: string | null;
	/** Country */
	country: string | null;
	/** Default Language */
	default_language: string;
	/** Description */
	description: string | null;
	/** Director Name */
	director_name: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Legal Name */
	legal_name: string | null;
	/** Logo Path */
	logo_path: string | null;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Tax Id */
	tax_id: string | null;
	/** Website Url */
	website_url: string | null;
}

/** OperatorInfoUpdate */
export interface OperatorInfoUpdate {
	/** Address Line */
	address_line?: string | null;
	/** Business Name */
	business_name?: string | null;
	/** City */
	city?: string | null;
	/** Contact Email */
	contact_email?: string | null;
	/** Contact Person */
	contact_person?: string | null;
	/** Contact Phone */
	contact_phone?: string | null;
	/** Contact Position */
	contact_position?: string | null;
	/** Country */
	country?: string | null;
	/** Description */
	description?: string | null;
	/** Director Name */
	director_name?: string | null;
	/** Legal Name */
	legal_name?: string | null;
	/** Tax Id */
	tax_id?: string | null;
	/** Website Url */
	website_url?: string | null;
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
	availability: AvailabilityStatus | null;
	/** Billed Via Package Id */
	billed_via_package_id: string | null;
	/**
	 * An event's bill on each leg of a quote: what the cheapest resolution books
	 * and what the dearest one does.
	 */
	breakdown: BreakdownSpreadSchemaOutput;
	cost: TourMinMaxCostSchemaOutput;
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
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	fees: TourMinMaxCostSchemaOutput;
	guide_typ: GuideType | null;
	markup: TourMinMaxCostSchemaOutput;
	/** Selected Option Index */
	selected_option_index: number | null;
	/** Tour Option Id */
	tour_option_id: string | null;
	/** Warnings */
	warnings: PricingWarning[];
}

/**
 * OperatorItineraryPackage
 * A package billed once for the whole booking, listed separately so the sum
 * of the event lines plus the package lines reconciles to the totals.
 */
export interface OperatorItineraryPackageOutput {
	/**
	 * An event's bill on each leg of a quote: what the cheapest resolution books
	 * and what the dearest one does.
	 */
	breakdown: BreakdownSpreadSchemaOutput;
	cost: TourMinMaxCostSchemaOutput;
	fees: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
	/** Name */
	name: string;
	/**
	 * Package Id
	 * @format uuid
	 */
	package_id: string;
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
 * Totals are pre-FOC, matching ``PricingBreakdownResponse`` semantics; FOC discounts
 * agency revenue only and never supplier cost, so ``cost`` is unaffected.
 */
export interface OperatorItineraryResponse {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	cost: TourMinMaxCostSchemaOutput;
	currency: Currency;
	/**
	 * Date
	 * @format date
	 */
	date: string;
	display_lang: LanguageCode;
	/** Events */
	events: OperatorItineraryEventOutput[];
	fees: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
	/** Order Number */
	order_number: string;
	/** Packages */
	packages: OperatorItineraryPackageOutput[];
	/** Pax */
	pax: number;
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
	currency: Currency;
	/** Details */
	details:
		| ({
				typ: "classic_swift";
		  } & ClassicSwiftDetails)
		| ({
				typ: "custom";
		  } & CustomDetails);
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Internal Label */
	internal_label: string;
	/** Note */
	note: string | null;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
}

/** OperatorPreviewPubSchema */
export interface OperatorPreviewPubSchema {
	/** Address Line */
	address_line: string | null;
	/** Business Name */
	business_name: string | null;
	/** City */
	city: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Country */
	country: string | null;
	/** Description */
	description: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Logo Url */
	logo_url: string | null;
	/** Website Url */
	website_url: string | null;
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
	/** Address Line */
	address_line: string | null;
	/** Business Name */
	business_name: string | null;
	/** City */
	city: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Contact Position */
	contact_position: string | null;
	/** Country */
	country: string | null;
	/** Description */
	description: string | null;
	/** Director Name */
	director_name: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Legal Name */
	legal_name: string | null;
	/** Logo Url */
	logo_url: string | null;
	/** Name */
	name: string;
	/** Tax Id */
	tax_id: string | null;
	/** Website Url */
	website_url: string | null;
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
	/** Business Name */
	business_name: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Contact Position */
	contact_position: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Logo Url */
	logo_url: string | null;
	/** Name */
	name: string;
	/** Website Url */
	website_url: string | null;
}

/**
 * OrderTourEventSchema
 * A snapshot event: the operator ``TourEventResponse`` plus the booking-only
 * ``origin_event_id`` that pairs a canonical event with its localized twin
 * (``events`` ↔ ``events_localized``). Kept out of the operator response so that
 * surface stays free of this booking concern.
 */
export interface OrderTourEventSchemaOutput {
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
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Origin Event Id */
	origin_event_id: string | null;
	/** Tour Option Id */
	tour_option_id: string | null;
	/** @default "source" */
	translation: TranslationState;
}

/** OrderTourInfo */
export interface OrderTourInfo {
	/** Days */
	days: number;
	/** Duration Hours */
	duration_hours: number | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Nights */
	nights: number;
	/** Route */
	route: string[];
	/** Title */
	title: string | null;
	typ: TourType;
}

/** OrderUserInfo */
export interface OrderUserInfo {
	/** Email */
	email: string;
	/** First Name */
	first_name: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
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
 * - ``/tour/{id}/option/{id}/pricing-breakdown`` for the quote this belongs to
 * - ``/tour/{tour_id}/{option_id}/package/{package_id}`` for the package itself
 */
export interface PackageBillableOutput {
	/**
	 * An event's bill on each leg of a quote: what the cheapest resolution books
	 * and what the dearest one does.
	 */
	breakdown: BreakdownSpreadSchemaOutput;
	cost: TourMinMaxCostSchemaOutput;
	/** Events */
	events: EventLineOutput[];
	fees: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
	/**
	 * Identity of the package a summary line bills through.
	 *
	 * Check
	 *
	 * - ``/tour/{tour_id}/{option_id}/package/{package_id}`` for the package itself
	 */
	package: PackageRef;
	/**
	 * Typ
	 * @default "package_bill"
	 */
	typ: "package_bill";
}

/**
 * PackageCreate
 * A package starts as a name and nothing else — the operator groups the
 * events first and prices the bundle once the supplier quotes it. An unpriced
 * package bills zero, which the publish gate refuses.
 */
export interface PackageCreate {
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
	/** Name */
	name: string;
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
	/** Name */
	name?: string | null;
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
	/** Business Name */
	business_name: string | null;
	/** City */
	city: string | null;
	/** Contact Email */
	contact_email: string | null;
	/** Contact Person */
	contact_person: string | null;
	/** Contact Phone */
	contact_phone: string | null;
	/** Country */
	country: string | null;
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
	/** Invited Email */
	invited_email: string;
	/** Invited User Id */
	invited_user_id: string | null;
	/** Logo Url */
	logo_url: string | null;
	/** Name */
	name: string;
	/**
	 * Partnered At
	 * @format date-time
	 */
	partnered_at: string;
	/** Website Url */
	website_url: string | null;
}

/** PartneredAgencyListResponse */
export interface PartneredAgencyListResponse {
	/** Data */
	data: PartneredAgencyItem[];
	/** Total Count */
	total_count: number;
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
	/** Comment */
	comment?: string | null;
	/**
	 * Date Of Birth
	 * @format date
	 */
	date_of_birth: string;
	/**
	 * Expired Date
	 * @format date
	 */
	expired_date: string;
	/**
	 * Full Name
	 * @maxLength 255
	 */
	full_name: string;
	gender: Gender;
	/** Nationality */
	nationality: string;
	/**
	 * Passport Number
	 * @maxLength 50
	 */
	passport_number: string;
}

/** PaxFileRef */
export interface PaxFileRef {
	/** File Name */
	file_name: string;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
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
	/** Comment */
	comment?: string | null;
	/** Date Of Birth */
	date_of_birth?: string | null;
	/** Expired Date */
	expired_date?: string | null;
	/** Full Name */
	full_name?: string | null;
	gender?: Gender | null;
	/** Nationality */
	nationality?: string | null;
	/** Passport Number */
	passport_number?: string | null;
}

/** PaxWithFiles */
export interface PaxWithFiles {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** Comment */
	comment: string | null;
	/**
	 * Created At
	 * @format date-time
	 */
	created_at: string;
	/**
	 * Date Of Birth
	 * @format date
	 */
	date_of_birth: string;
	/**
	 * Expired Date
	 * @format date
	 */
	expired_date: string;
	/** Files */
	files: PaxFileRef[];
	/** Full Name */
	full_name: string;
	gender: Gender;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Nationality */
	nationality: string;
	/** Passport Number */
	passport_number: string;
	/**
	 * Updated At
	 * @format date-time
	 */
	updated_at: string;
}

/** PaymentRouteCreate */
export interface PaymentRouteCreate {
	currency: Currency;
	/** Details */
	details:
		| ({
				typ: "classic_swift";
		  } & ClassicSwiftDetails)
		| ({
				typ: "custom";
		  } & CustomDetails);
	/**
	 * Internal Label
	 * @maxLength 255
	 */
	internal_label: string;
	/** Note */
	note?: string | null;
}

/** PaymentRouteUpdate */
export interface PaymentRouteUpdate {
	currency?: Currency | null;
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
	/** Internal Label */
	internal_label?: string | null;
	/** Note */
	note?: string | null;
}

/**
 * PerCarCategoryTransfer
 * A fleet priced by category: a group rides one category, packed into the
 * cheapest combination of the cars priced in it, and the cheapest and the
 * dearest category bound the spread.
 */
export interface PerCarCategoryTransferInput {
	/** Cars */
	cars?: CategorisedCarInput[];
	/** Categories */
	categories?: CarCategory[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Name */
	name?: string | null;
	/**
	 * Pricing
	 * @default "per_car_category"
	 */
	pricing: "per_car_category";
}

/**
 * PerCarCategoryTransfer
 * A fleet priced by category: a group rides one category, packed into the
 * cheapest combination of the cars priced in it, and the cheapest and the
 * dearest category bound the spread.
 */
export interface PerCarCategoryTransferOutput {
	/** Cars */
	cars: CategorisedCarOutput[];
	/** Categories */
	categories: CarCategory[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Name */
	name: string | null;
	/**
	 * Pricing
	 * @default "per_car_category"
	 */
	pricing: "per_car_category";
}

/**
 * PerCarCategoryTransferCreate
 * A transfer fleet priced by category as a create takes it: the categories
 * it opens with and its cars, each priced in the categories it is sold in. A
 * price names its category by the ``id`` the body gives it; the create mints
 * the stored ids and keeps every price pointing at its category.
 *
 * Check: ``POST /supplier/{supplier_id}/product/{product_id}/variant`` adds a
 * car to a fleet that already stands.
 */
export interface PerCarCategoryTransferCreate {
	/** Cars */
	cars?: CategorisedCarWrite[];
	/** Categories */
	categories: CarCategory[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_car_category";
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
}

/**
 * PerCarCategoryTransferDetails
 * A transfer fleet priced by category as the API takes it: its name and
 * the categories it sells its cars in, replaced whole on every write — echo a
 * category's ``id`` to keep it, leave one out to remove it with every price
 * its cars have in it.
 */
export interface PerCarCategoryTransferDetails {
	/** Categories */
	categories: CarCategory[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_car_category";
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
}

/**
 * PerCarCategoryTransferVariantWrite
 * One car of a fleet priced by category, with what it costs in each
 * category it is sold in — replaced whole, a price keeping its ``id`` for as
 * long as its category is sent back.
 */
export interface PerCarCategoryTransferVariantWrite {
	body_type: VehicleBodyType;
	/** Description */
	description?: string | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Prices */
	prices?: CarPriceWrite[];
	/** Pricing */
	pricing: "per_car_category";
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
}

/**
 * PerCarTransfer
 * A fleet priced by the car: a group pays for the cars it fills.
 */
export interface PerCarTransferInput {
	/** Cars */
	cars?: PricedCarInput[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Name */
	name?: string | null;
	/**
	 * Pricing
	 * @default "per_car"
	 */
	pricing: "per_car";
}

/**
 * PerCarTransfer
 * A fleet priced by the car: a group pays for the cars it fills.
 */
export interface PerCarTransferOutput {
	/** Cars */
	cars: PricedCarOutput[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Name */
	name: string | null;
	/**
	 * Pricing
	 * @default "per_car"
	 */
	pricing: "per_car";
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
	/** Cars */
	cars?: PricedCarWrite[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_car";
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
}

/**
 * PerCarTransferDetails
 * A transfer fleet priced by the car as the API takes it.
 */
export interface PerCarTransferDetails {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_car";
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
}

/** PerCarTransferVariantWrite */
export interface PerCarTransferVariantWrite {
	body_type: VehicleBodyType;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/** Description */
	description?: string | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Pricing */
	pricing: "per_car";
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
}

/**
 * PerFareFlightCreate
 * An air route priced by fare as a create takes it: its facts, its arm and
 * the fare classes it opens with.
 */
export interface PerFareFlightCreate {
	/** Fares */
	fares?: FareCreate[];
	/** Legs */
	legs?: FlightLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_fare";
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
}

/**
 * PerFareFlightDetails
 * An air route priced by fare as the API takes it.
 */
export interface PerFareFlightDetails {
	/** Legs */
	legs?: FlightLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_fare";
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
}

/**
 * PerFareFlightRoute
 * An air route priced by the fare class a group is booked into.
 */
export interface PerFareFlightRouteInput {
	/** Fares */
	fares?: PricedFareInput[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Legs */
	legs?: FlightLegInput[];
	/** Name */
	name?: string | null;
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
}

/**
 * PerFareFlightRoute
 * An air route priced by the fare class a group is booked into.
 */
export interface PerFareFlightRouteOutput {
	/** Fares */
	fares: PricedFareOutput[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Legs */
	legs: FlightLegOutput[];
	/** Name */
	name: string | null;
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
}

/** PerFareFlightVariantWrite */
export interface PerFareFlightVariantWrite {
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
	/** Pricing */
	pricing: "per_fare";
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
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
	/** Fares */
	fares?: FareCreate[];
	/** Legs */
	legs?: TrainLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_fare";
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
}

/**
 * PerFareTrainDetails
 * A rail route priced by fare as the API takes it: what it stores plus the
 * name that lands on the ``name`` column.
 */
export interface PerFareTrainDetails {
	/** Legs */
	legs?: TrainLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_fare";
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
}

/**
 * PerFareTrainRoute
 * A rail route priced by the fare class a group is booked into.
 */
export interface PerFareTrainRouteInput {
	/** Fares */
	fares?: PricedFareInput[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Legs */
	legs?: TrainLegInput[];
	/** Name */
	name?: string | null;
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
}

/**
 * PerFareTrainRoute
 * A rail route priced by the fare class a group is booked into.
 */
export interface PerFareTrainRouteOutput {
	/** Fares */
	fares: PricedFareOutput[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Legs */
	legs: TrainLegOutput[];
	/** Name */
	name: string | null;
	/**
	 * Pricing
	 * @default "per_fare"
	 */
	pricing: "per_fare";
}

/** PerFareTrainVariantWrite */
export interface PerFareTrainVariantWrite {
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
	/** Pricing */
	pricing: "per_fare";
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
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
	 * Tiers
	 * @minItems 1
	 */
	tiers: GroupSizeTierInput[];
	/**
	 * Typ
	 * @default "per_group"
	 */
	typ: "per_group";
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
	 * Tiers
	 * @minItems 1
	 */
	tiers: GroupSizeTierOutput[];
	/**
	 * Typ
	 * @default "per_group"
	 */
	typ: "per_group";
}

/**
 * PerPaxPriceMatrixSchema
 * The price curve of one option: a row per headcount asked for.
 */
export interface PerPaxPriceMatrixSchemaOutput {
	currency: Currency;
	/** Rows */
	rows: PriceMatrixRowSchemaOutput[];
	/**
	 * Typ
	 * @default "per_pax"
	 */
	typ: "per_pax";
}

/**
 * PerPersonCharge
 * A per-person cost together with its own fee and markup.
 */
export interface PerPersonChargeInput {
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
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs?: ExtraCostInput[];
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
	/**
	 * Typ
	 * @default "per_person"
	 */
	typ: "per_person";
}

/**
 * PerPersonCharge
 * A per-person cost together with its own fee and markup.
 */
export interface PerPersonChargeOutput {
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
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs: ExtraCostOutput[];
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
	/**
	 * Typ
	 * @default "per_person"
	 */
	typ: "per_person";
}

/**
 * PerPersonExpense
 * A cost calculated per person.
 */
export interface PerPersonExpenseInput {
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
	/**
	 * Typ
	 * @default "per_person"
	 */
	typ: "per_person";
}

/**
 * PerPersonExpense
 * A cost calculated per person.
 */
export interface PerPersonExpenseOutput {
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
	/**
	 * Typ
	 * @default "per_person"
	 */
	typ: "per_person";
}

/**
 * PerRangePriceMatrixSchema
 * The price sheet of one option: a line per group-size bracket asked for.
 */
export interface PerRangePriceMatrixSchemaOutput {
	/** Brackets */
	brackets: PriceMatrixBracketSchemaOutput[];
	currency: Currency;
	/**
	 * Typ
	 * @default "per_range"
	 */
	typ: "per_range";
}

/**
 * PerRoomHotel
 * A hotel whose price sits on each room: a group pays for the rooms it
 * fills, so every room in scope carries its own rate. How that rate scales is
 * the charge inside it — ``fixed`` once, ``per_duration`` per night,
 * ``per_person`` per head.
 */
export interface PerRoomHotelInput {
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Categories */
	categories?: PricedCategoryInput[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Name */
	name?: string | null;
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/**
	 * Pricing
	 * @default "per_room"
	 */
	pricing: "per_room";
	/** Stars */
	stars?: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
}

/**
 * PerRoomHotel
 * A hotel whose price sits on each room: a group pays for the rooms it
 * fills, so every room in scope carries its own rate. How that rate scales is
 * the charge inside it — ``fixed`` once, ``per_duration`` per night,
 * ``per_person`` per head.
 */
export interface PerRoomHotelOutput {
	/** Amenities */
	amenities: AmenitiesTypes[];
	/** Categories */
	categories: PricedCategoryOutput[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Name */
	name: string | null;
	/** Check-in and check-out hours and the bands billed outside them. */
	policy: HotelPolicySchemaOutput | null;
	/**
	 * Pricing
	 * @default "per_room"
	 */
	pricing: "per_room";
	/** Stars */
	stars: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs: HotelKind[];
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
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Categories */
	categories?: PricedCategoryWrite[];
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/** Pricing */
	pricing: "per_room";
	/** Stars */
	stars?: number | null;
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
}

/**
 * PerRoomHotelDetails
 * A hotel priced by the room as the API takes it: what it stores plus the
 * name that lands on the ``name`` column. A product states its facts rather
 * than drafting them, so its name is required where a spec's is not.
 */
export interface PerRoomHotelDetails {
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/** Pricing */
	pricing: "per_room";
	/** Stars */
	stars?: number | null;
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
}

/**
 * PerRoomHotelVariantWrite
 * One room category of a hotel priced by the room: every room carries its
 * own rate.
 */
export interface PerRoomHotelVariantWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_room";
	/** Rooms */
	rooms?: PricedRoomWrite[];
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
}

/**
 * PerVehicleBusDetails
 * A coach fleet priced by the vehicle as the API takes it: what it stores
 * plus the name that lands on the ``name`` column.
 */
export interface PerVehicleBusDetails {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_vehicle";
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
}

/** PerVehicleBusVariantWrite */
export interface PerVehicleBusVariantWrite {
	body_type: VehicleBodyType;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/** Description */
	description?: string | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Pricing */
	pricing: "per_vehicle";
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
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
	/** Name */
	name?: string | null;
	/**
	 * Pricing
	 * @default "per_vehicle"
	 */
	pricing: "per_vehicle";
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
	/** Name */
	name: string | null;
	/**
	 * Pricing
	 * @default "per_vehicle"
	 */
	pricing: "per_vehicle";
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
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "per_vehicle";
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
	/** Vehicles */
	vehicles?: PricedVehicleWrite[];
}

/**
 * PercentageMarkup
 * Adds a percentage on top of a base cost.
 */
export interface PercentageMarkup {
	/**
	 * Percentage
	 * e.g., 0.15 for 15%
	 * @exclusiveMin 0
	 * @exclusiveMax 1
	 */
	percentage: number;
	/** Typ */
	typ: "percentage";
}

/**
 * PercentageSurcharge
 * A supplier's share of one unit of a cost billed on top of it — half a
 * night for an early arrival, the whole of one for an arrival before dawn. A
 * markup stays under the whole; a surcharge may reach it.
 */
export interface PercentageSurcharge {
	/**
	 * Percentage
	 * e.g., 0.5 for half a night, 1.0 for a whole
	 * @exclusiveMin 0
	 * @max 1
	 */
	percentage: number;
	/** Typ */
	typ: "percentage";
}

/** PermissionCatalog */
export interface PermissionCatalog {
	/** Default Groups */
	default_groups: GroupTemplate[];
	/** Permissions */
	permissions: Permissions[];
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

/**
 * PriceMatrixBracketSchema
 * One group-size bracket quoted as a single price: ``per_person.max`` is the
 * dearest head inside the bracket and ``binding_pax`` the headcount that sets
 * it, so quoting that figure never loses money at any size in the range.
 * ``min`` figures are the cheapest the bracket can turn out.
 *
 * Check
 *
 * - ``/tour/{id}/option/{id}/price-matrix?brackets=`` for the brackets
 */
export interface PriceMatrixBracketSchemaOutput {
	/** Binding Pax */
	binding_pax: number;
	cost: TourMinMaxCostSchemaOutput;
	/** Pax From */
	pax_from: number;
	/** Pax To */
	pax_to: number;
	per_person: TourMinMaxCostSchemaOutput;
	profit: TourMinMaxCostSchemaOutput;
	revenue: TourMinMaxCostSchemaOutput;
}

/**
 * PriceMatrixRowSchema
 * One headcount priced end to end, the same legs the breakdown shows:
 * ``cost`` is what the operator pays out (cost + fees), ``profit`` the markup,
 * ``revenue`` the agency price and ``per_person`` that revenue over ``pax``.
 * ``min``/``max`` span the cheapest and dearest room, car and fare categories.
 *
 * Check
 *
 * - ``/tour/{id}/option/{id}/price-matrix`` for the rows
 * - ``/tour/{id}/option/{id}/pricing-breakdown?pax=`` for what one row books
 */
export interface PriceMatrixRowSchemaOutput {
	cost: TourMinMaxCostSchemaOutput;
	/** Pax */
	pax: number;
	per_person: TourMinMaxCostSchemaOutput;
	profit: TourMinMaxCostSchemaOutput;
	revenue: TourMinMaxCostSchemaOutput;
}

/** PriceRangeSchema */
export interface PriceRangeSchema {
	currency: Currency | null;
	/** Min */
	min: number | null;
}

/**
 * PricedCar
 * A car of a per-car fleet: what one of these costs for the leg.
 */
export interface PricedCarInput {
	body_type: VehicleBodyType;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/** Description */
	description?: string | null;
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
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
}

/**
 * PricedCar
 * A car of a per-car fleet: what one of these costs for the leg.
 */
export interface PricedCarOutput {
	body_type: VehicleBodyType;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
	/** Description */
	description: string | null;
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
	/** Name */
	name: string | null;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
}

/**
 * PricedCarWrite
 * One car category of a per-car fleet as a create takes it: what one of
 * these costs for the leg.
 */
export interface PricedCarWrite {
	body_type: VehicleBodyType;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/** Description */
	description?: string | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
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
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Name */
	name?: string | null;
}

/**
 * PricedFare
 * One fare class of a per-fare route: what a seat in it costs.
 */
export interface PricedFareOutput {
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
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
}

/**
 * PricedRoom
 * A room of a per-room hotel: what a group pays for filling this room.
 */
export interface PricedRoomInput {
	/** Description */
	description?: string | null;
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
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateInput;
	typ: HousingRoomTypes;
}

/**
 * PricedRoom
 * A room of a per-room hotel: what a group pays for filling this room.
 */
export interface PricedRoomOutput {
	/** Description */
	description: string | null;
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
	/** Name */
	name: string | null;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateOutput;
	typ: HousingRoomTypes;
}

/**
 * PricedRoomCreate
 * One room of a per-room hotel as a create takes it: what a group pays for
 * filling it, and no ``id`` — the room is minted with the hotel.
 */
export interface PricedRoomCreate {
	/** Description */
	description?: string | null;
	/** Name */
	name?: string | null;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateInput;
	typ: HousingRoomTypes;
}

/**
 * PricedRoomWrite
 * One room of a per-room hotel as the API takes it. Echo ``id`` to keep the
 * stored room and its pictures; a room sent without one is a new room.
 */
export interface PricedRoomWrite {
	/** Description */
	description?: string | null;
	/** Id */
	id?: string | null;
	/** Name */
	name?: string | null;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateInput;
	typ: HousingRoomTypes;
}

/**
 * PricedVehicle
 * A vehicle of a per-vehicle fleet: what one of these costs.
 */
export interface PricedVehicleInput {
	body_type: VehicleBodyType;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/** Description */
	description?: string | null;
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
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
}

/**
 * PricedVehicle
 * A vehicle of a per-vehicle fleet: what one of these costs.
 */
export interface PricedVehicleOutput {
	body_type: VehicleBodyType;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
	/** Description */
	description: string | null;
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
	/** Name */
	name: string | null;
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
}

/**
 * PricedVehicleWrite
 * One vehicle category of a per-vehicle fleet as a create takes it: what
 * one of these costs.
 */
export interface PricedVehicleWrite {
	body_type: VehicleBodyType;
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/** Description */
	description?: string | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
}

/**
 * PricingBreakdownResponse
 * Option quote: ``estimated_cost`` is what the operator pays out
 * (cost + fees), ``estimated_profit`` is the markup kept, and
 * ``estimated_revenue`` is the full agency price — the two always
 * sum to it. Every ``min`` is the whole group priced at ``pax.min``, every
 * ``max`` at ``pax.max``. ``estimated_revenue_per_person`` splits each leg's
 * revenue across its own headcount and reports the realizable spread, the
 * same figure the public option page and the catalog show.
 *
 * Check
 *
 * - ``/tour/{id}/option/{id}/pricing-breakdown`` for the quote itself
 * - ``/tour/{id}/public/option/all`` for the agency-facing per-person spread
 */
export interface PricingBreakdownResponse {
	estimated_cost: TourMinMaxCostSchemaOutput;
	estimated_profit: TourMinMaxCostSchemaOutput;
	estimated_revenue: TourMinMaxCostSchemaOutput;
	estimated_revenue_per_person: TourMinMaxCostSchemaOutput;
	/** Events */
	events: (
		| ({
				typ: "individual_bill";
		  } & StandaloneBillableOutput)
		| ({
				typ: "package_bill";
		  } & PackageBillableOutput)
	)[];
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * The headcounts a quote's two legs are priced at: ``min`` is the tour's
	 * ``group_size_min`` (1 when unset), ``max`` its ``group_size``.
	 */
	pax: TourMinMaxPaxSchema;
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
	 * Id
	 * @format uuid
	 */
	id: string;
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
	 * Name
	 * @default ""
	 */
	name: string;
	/** Supplier Id */
	supplier_id: string | null;
}

/**
 * ProductLinkRead
 * One tour pool member reading this product: where the event sits, which
 * member of which alternative reads it, how much of the product it takes and
 * whether it deviates from what the product asks.
 */
export interface ProductLinkRead {
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
	 * Option Id
	 * @format uuid
	 */
	option_id: string;
	/** Overridden */
	overridden: boolean;
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
	 * Supply Id
	 * @format uuid
	 */
	supply_id: string;
	/** Tour Id */
	tour_id: string | null;
}

/**
 * ProductSupplyNew
 * A link as the API takes it: which product and how much of it. Who the
 * product is bought from and what it states are the product's, resolved on
 * read; a negotiated deviation is set through its own route.
 */
export interface ProductSupplyNew {
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
	 * Source
	 * @default "product"
	 */
	source: "product";
}

/** PublicTourCatalogListResponse */
export interface PublicTourCatalogListResponse {
	/** Data */
	data: PublicTourCatalogSchemaOutput[];
	/** Total Count */
	total_count: number;
}

/** PublicTourCatalogSchema */
export interface PublicTourCatalogSchemaOutput {
	/** Age From */
	age_from: number | null;
	/** Age To */
	age_to: number | null;
	/** Categories */
	categories: TourCategory[];
	/** Cities */
	cities: string[];
	/** Cover Image Url */
	cover_image_url: string | null;
	/** Days */
	days: number;
	/** Description */
	description: string | null;
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
	/** Duration Hours */
	duration_hours: number | null;
	/** Group Size */
	group_size: number;
	/** Group Size Min */
	group_size_min: number | null;
	/** Landing Photos */
	landing_photos: string[];
	/** Languages */
	languages: LanguageCode[];
	/** Nights */
	nights: number;
	/** Option Count */
	option_count: number | null;
	price_per_person: PriceRangeSchema | null;
	price_range: PriceRangeSchema | null;
	public_price_per_person: PriceRangeSchema | null;
	public_price_range: PriceRangeSchema | null;
	/** Slug */
	slug: string | null;
	/** Title */
	title: string | null;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tour_id: string;
	tour_type: TourType;
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
	/** Detail */
	detail: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Option Id */
	option_id: string | null;
	/** Path */
	path: (string | number)[];
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
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
	 * Accrual Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	accrual_profit: string;
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
	 * Receivable
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	receivable: string;
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
	 * Settled Profit
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	settled_profit: string;
}

/** RecurrenceDateModel */
export interface RecurrenceDateModel {
	/** Day */
	day: number | null;
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
	 * Drop Override
	 * @default false
	 */
	drop_override?: boolean;
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

/**
 * RevisionCopyFromEvent
 * Freeze a live event of the booked tour option into the booking, the way
 * the booking froze its own events.
 */
export interface RevisionCopyFromEvent {
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Kind */
	kind: "event";
}

/**
 * RevisionCopyFromRevision
 * Duplicate an event of the booking's revised snapshot.
 */
export interface RevisionCopyFromRevision {
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Kind */
	kind: "revision";
}

/** RevisionCopySchema */
export interface RevisionCopySchema {
	/** Source */
	source:
		| ({
				kind: "event";
		  } & RevisionCopyFromEvent)
		| ({
				kind: "revision";
		  } & RevisionCopyFromRevision);
}

/**
 * RevisionPreview
 * Effective itinerary for a booking (original snapshot folded with its edit
 * log), priced at the booking's own headcount and date. ``breakdown`` is one
 * bill per effective event in itinerary order: the units the cheapest
 * resolution books and the warnings its data carries; empty when the price
 * could not be resolved.
 *
 * Check
 *
 * - ``/booking/revision/{id}/preview`` for the itinerary itself
 * - ``/booking/operator/{id}/itinerary`` for the same bills beside cost columns
 */
export interface RevisionPreview {
	/** Breakdown */
	breakdown: EventBreakdownSchemaOutput[];
	/** Cost */
	cost: string | null;
	/** Revenue */
	revenue: string | null;
	/** Pure-Pydantic snapshot of everything a booking's price depends on, frozen at creation. */
	snapshot: TourSnapshotSchemaOutput;
}

/**
 * Room
 * A room of a whole hotel: described, never priced — the price sits on the
 * hotel, charged once whatever rooms the stay fills. An ``ImageBearingNode``: echo its
 * ``id`` on update to keep the room's pictures.
 */
export interface Room {
	/** Description */
	description?: string | null;
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
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	typ: HousingRoomTypes;
}

/**
 * RoomCreate
 * One room of a whole hotel as a create takes it. A create mints the hotel
 * and its rooms together, so a room states no ``id``; the variant routes take
 * one back to keep a stored room and its pictures.
 */
export interface RoomCreate {
	/** Description */
	description?: string | null;
	/** Name */
	name?: string | null;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	typ: HousingRoomTypes;
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
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs?: ExtraCostInput[];
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
	/** A simple fixed cost, ignores all context. */
	rate: FixedExpenseInput;
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
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
	/**
	 * Extra Costs
	 * Named cost lines inside this charge, covered by its markup.
	 */
	extra_costs: ExtraCostOutput[];
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
	/** A simple fixed cost, ignores all context. */
	rate: FixedExpenseOutput;
	/**
	 * Typ
	 * @default "per_duration"
	 */
	typ: "per_duration";
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
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateInput;
	/**
	 * Room Id
	 * @format uuid
	 */
	room_id: string;
}

/**
 * RoomRateOverride
 * What one room of a per-room hotel costs this tour.
 */
export interface RoomRateOverrideOutput {
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateOutput;
	/**
	 * Room Id
	 * @format uuid
	 */
	room_id: string;
}

/**
 * RoomRateSwitch
 * What one room costs once the hotel charges the rooms a group fills.
 */
export interface RoomRateSwitch {
	/**
	 * What one room costs: the base charge plus the seasons that replace it. A
	 * dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	rate: RoomRateInput;
	/**
	 * Room Id
	 * @format uuid
	 */
	room_id: string;
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
}

/**
 * RoomSeason
 * What a room costs for a stay checking in inside one season. Dates are
 * inclusive and absolute — a hotel's rate sheet is re-entered per year.
 */
export interface RoomSeasonOutput {
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
}

/**
 * RoomWrite
 * One room of a whole hotel as the API takes it. Echo ``id`` to keep the
 * stored room and its pictures; a room sent without one is a new room.
 */
export interface RoomWrite {
	/** Description */
	description?: string | null;
	/** Id */
	id?: string | null;
	/** Name */
	name?: string | null;
	/**
	 * Pax
	 * Heads this room sleeps.
	 * @min 1
	 */
	pax: number;
	typ: HousingRoomTypes;
}

/**
 * RouteOverride
 * A fare this tour negotiated, replacing the route's own.
 */
export interface RouteOverrideInput {
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
	/** Typ */
	typ: RouteOverrideInputTypEnum;
}

/**
 * RouteOverride
 * A fare this tour negotiated, replacing the route's own.
 */
export interface RouteOverrideOutput {
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
	/** Typ */
	typ: RouteOverrideOutputTypEnum;
}

/**
 * RouteProductSupply
 * A leg read off a supplier's rail or air route.
 */
export interface RouteProductSupplyOutput {
	override: RouteOverrideOutput | null;
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
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
	 * Source
	 * @default "product"
	 */
	source: "product";
	/** Who a linked product is bought from, resolved on read. */
	supplier: SupplierRef;
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
	/** When this tour arrives, whatever the route says */
	arrival_time?: TimeSchema | null;
	/** When this tour leaves, whatever the route says */
	departure_time?: TimeSchema | null;
}

/**
 * ScopeBody
 * Replace how much of the linked product the event takes. An override
 * naming a unit the new scope leaves out is refused unless
 * ``drop_stray_overrides`` says to drop it.
 */
export interface ScopeBody {
	/**
	 * Drop Stray Overrides
	 * @default false
	 */
	drop_stray_overrides?: boolean;
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
	/** Commission */
	commission: number;
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
	/** Group Ids */
	group_ids: string[];
	/** Permissions */
	permissions: Permissions[];
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
	/** Group Ids */
	group_ids?: string[];
	/**
	 * Last Name
	 * @maxLength 255
	 */
	last_name: string;
	/** Password */
	password?: string | null;
	/** Permissions */
	permissions?: Permissions[];
}

/** StaffInviteResult */
export interface StaffInviteResult {
	/** Commission Percent */
	commission_percent: number | null;
	/** Email */
	email: string;
	/** First Name */
	first_name: string | null;
	/** Generated Password */
	generated_password: string | null;
	/** Last Name */
	last_name: string | null;
	role: UserRoles;
	status: StaffStatus;
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string;
}

/** StaffListResponse */
export interface StaffListResponse {
	/** Data */
	data: StaffRead[];
	/** Total Count */
	total_count: number;
}

/** StaffPermissionsRead */
export interface StaffPermissionsRead {
	/** Direct */
	direct: Permissions[];
	/** Effective */
	effective: Permissions[];
	/** Group Ids */
	group_ids: string[];
}

/** StaffRead */
export interface StaffRead {
	/** Commission Percent */
	commission_percent: number | null;
	/** Email */
	email: string;
	/** First Name */
	first_name: string | null;
	/** Last Name */
	last_name: string | null;
	role: UserRoles;
	status: StaffStatus;
	/**
	 * User Id
	 * @format uuid
	 */
	user_id: string;
}

/** StaffUpdate */
export interface StaffUpdate {
	/** Commission Percent */
	commission_percent?: number | null;
	/** First Name */
	first_name?: string | null;
	/** Last Name */
	last_name?: string | null;
	/** Status */
	status?: StaffUpdateStatusEnum | null;
}

/**
 * StandaloneBillable
 * One event that prices itself: its own cost and markup across the option's
 * cheapest and dearest resolutions over the tour's allowed group-size range.
 *
 * Check
 *
 * - ``/tour/{id}/option/{id}/pricing-breakdown`` for the quote this belongs to
 * - ``/tour/{tour_id}/{option_id}/package`` for the packages events can join
 */
export interface StandaloneBillableOutput {
	/**
	 * An event's bill on each leg of a quote: what the cheapest resolution books
	 * and what the dearest one does.
	 */
	breakdown: BreakdownSpreadSchemaOutput;
	cost: TourMinMaxCostSchemaOutput;
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
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	fees: TourMinMaxCostSchemaOutput;
	markup: TourMinMaxCostSchemaOutput;
	/**
	 * Typ
	 * @default "individual_bill"
	 */
	typ: "individual_bill";
	/** Warnings */
	warnings: PricingWarning[];
}

/**
 * Stay
 * How long a stay runs and at what hours — the tour's own statement,
 * whoever supplies the hotel.
 */
export interface Stay {
	check_in?: TimeSchema | null;
	check_out?: TimeSchema | null;
	/**
	 * Duration
	 * Length of stay
	 */
	duration?: number | null;
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
}

/**
 * StaySeason
 * What a whole stay costs when it checks in inside one season. Dates are
 * inclusive and absolute — a hotel's rate sheet is re-entered per year.
 */
export interface StaySeasonOutput {
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
	 * Pool
	 * @minItems 1
	 */
	pool: SupplementaryMemberOutput[];
}

/**
 * SupplementaryDetailsUpdate
 * The half of supplementary lines an alternative update writes: the tour's plan,
 * replaced whole. Its pool is written member by member.
 *
 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
 */
export interface SupplementaryDetailsUpdate {
	/**
	 * The half a type states nothing in: a supplementary entry's plan, an
	 * information entry's spec.
	 */
	plan?: Empty;
}

/**
 * SupplementaryDetailsWrite
 * Supplementary lines as a create takes them: the tour's plan and the suppliers
 * that bill them.
 */
export interface SupplementaryDetailsWrite {
	/**
	 * The half a type states nothing in: a supplementary entry's plan, an
	 * information entry's spec.
	 */
	plan?: Empty;
	/** Pool */
	pool?: SupplementaryMemberWrite[] | null;
}

/** SupplementaryEvent */
export interface SupplementaryEvent {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * Supplementary lines as a create takes them: the tour's plan and the suppliers
	 * that bill them.
	 */
	details: SupplementaryDetailsWrite;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "supplementary"
	 */
	typ: "supplementary";
}

/** SupplementaryEventTypeRead */
export interface SupplementaryEventTypeReadOutput {
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Supplementary lines as they read. */
	details: SupplementaryDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "supplementary"
	 */
	typ: "supplementary";
}

/** SupplementaryEventUpdate */
export interface SupplementaryEventUpdate {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * The half of supplementary lines an alternative update writes: the tour's plan,
	 * replaced whole. Its pool is written member by member.
	 *
	 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
	 */
	details: SupplementaryDetailsUpdate;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "supplementary"
	 */
	typ: "supplementary";
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
	/** Whatever else the tour bills for, each line carrying its own charge. */
	spec: SupplementarySpecInput;
	/** Supplier Id */
	supplier_id?: string | null;
}

/** SupplementaryItem */
export interface SupplementaryItemInput {
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
	/** Name */
	name?: string | null;
}

/** SupplementaryItem */
export interface SupplementaryItemOutput {
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
	/** Name */
	name: string | null;
}

/**
 * SupplementaryMember
 * One supplier of the supplementary lines' pool as it reads.
 */
export interface SupplementaryMemberOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Is Main
	 * Whether the public card falls back to this member for its title and pictures. Exactly one member of a pool carries it.
	 * @default false
	 */
	is_main: boolean;
	/** Whatever else the tour bills for, each line carrying its own charge. */
	spec: SupplementarySpecOutput;
	/**
	 * An event that states its own spec: nothing is linked, so the only thing
	 * left to name is the supplier it is bought from.
	 */
	supply: InlineSupply;
}

/**
 * SupplementaryMemberNew
 * A supplier joining the supplementary lines' pool.
 */
export interface SupplementaryMemberNew {
	/** Id */
	id?: string | null;
	/** Supplementary lines are always the tour's own: no product supplies them. */
	supply: SupplementaryInlineSupplyNew;
	/** Typ */
	typ: "supplementary";
}

/**
 * SupplementaryMemberUpdate
 * A supplier of the supplementary lines' pool restated in place: who it is
 * bought from and the lines it states, both replaced whole.
 */
export interface SupplementaryMemberUpdate {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
	/** Whatever else the tour bills for, each line carrying its own charge. */
	spec: SupplementarySpecInput;
	/** Supplier Id */
	supplier_id?: string | null;
	/** Typ */
	typ: "supplementary";
}

/**
 * SupplementaryMemberWrite
 * One supplier of the supplementary lines' pool as the API takes it. An ``id``
 * it carries is ignored: every member a write lands is new.
 */
export interface SupplementaryMemberWrite {
	/** Id */
	id?: string | null;
	/** Supplementary lines are always the tour's own: no product supplies them. */
	supply: SupplementaryInlineSupplyNew;
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
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * Supplementary lines as a create takes them: the tour's plan and the suppliers
	 * that bill them.
	 */
	details: SupplementaryDetailsWrite;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "supplementary"
	 */
	typ: "supplementary";
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
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** Supplementary lines as they read. */
	details: SupplementaryDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "supplementary"
	 */
	typ: "supplementary";
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
 * A supplier the operator contracts with: the counterparty alone. What it
 * sells is its products, created one per hotel or route afterwards, and
 * ``supplier_types`` on the read follows them.
 *
 * Check: ``POST /supplier/{supplier_id}/product``.
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
}

/**
 * SupplierLineTally
 * Counts behind the payable figure, so a row explains itself: how many
 * event lines exist, how many are settled, and how many are still filed under
 * no supplier at all.
 */
export interface SupplierLineTally {
	/** Paid */
	paid: number;
	/** Total */
	total: number;
	/** Unassigned Supplier */
	unassigned_supplier: number;
	/** Unpaid */
	unpaid: number;
	/** Unpriced */
	unpriced: number;
}

/** SupplierListResponse */
export interface SupplierListResponse {
	/** Data */
	data: SupplierModel[];
	/** Total Count */
	total_count: number;
}

/** SupplierModel */
export interface SupplierModel {
	/** Brand Name */
	brand_name: string;
	/** Deleted At */
	deleted_at: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Legal Name */
	legal_name: string | null;
	/** Logo Path */
	logo_path: string | null;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Phone */
	phone: string | null;
	/** Supplier Types */
	supplier_types: SupplierType[];
	/** Website */
	website: string | null;
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
	/** File Name */
	file_name: string;
	/** Url */
	url: string;
}

/** SupplierPaymentListResponse */
export interface SupplierPaymentListResponse {
	/** Data */
	data: SupplierPaymentListRowOutput[];
	/** Total Count */
	total_count: number;
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
	 * Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	amount: string;
	/**
	 * Base Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	base_amount: string;
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	currency: Currency;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Event Name */
	event_name: string | null;
	event_typ: EventTypes | null;
	/** Order Number */
	order_number: string;
	/** Paid At */
	paid_at: string | null;
	/**
	 * Payment Id
	 * @format uuid
	 */
	payment_id: string;
	/** Receipt Count */
	receipt_count: number;
	status: SupplierPaymentStatus;
	/** Supplier Id */
	supplier_id: string | null;
	/** Supplier Name */
	supplier_name: string | null;
}

/**
 * SupplierPaymentResponse
 * Adds ``base_amount`` — the real cost converted into the operator's base
 * currency at the pinned rate (``amount * rate``). This is what feeds the
 * tour's real-cost / profit-loss accounting.
 */
export interface SupplierPaymentResponse {
	/**
	 * Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	amount: string;
	/**
	 * Base Amount
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	base_amount: string;
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	currency: Currency;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/** Event Name */
	event_name: string | null;
	event_typ: EventTypes | null;
	/** Files */
	files: SupplierPaymentFile[];
	/** Note */
	note: string | null;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Order Number */
	order_number: string;
	/** Paid At */
	paid_at: string | null;
	/**
	 * Payment Id
	 * @format uuid
	 */
	payment_id: string;
	/**
	 * Rate
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	rate: string;
	status: SupplierPaymentStatus;
	/** Supplier Id */
	supplier_id: string | null;
	/** Supplier Name */
	supplier_name: string | null;
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
	/** Amount */
	amount?: number | string | null;
	currency?: Currency | null;
	/** Note */
	note?: string | null;
	status?: SupplierPaymentStatus | null;
	/** Supplier Id */
	supplier_id?: string | null;
}

/**
 * SupplierPolicyBand
 * Half-open window (``from_time`` inclusive, ``to_time`` exclusive, unset =
 * open) and the surcharge for landing in it. Bands match first-hit. A
 * percentage is a share of one room night — the first for an early arrival,
 * the last for a late departure — up to the whole of it; the surcharge
 * inflates base cost before operator markup.
 */
export interface SupplierPolicyBandInput {
	/** From Time */
	from_time?: string | null;
	/** Note */
	note?: string | null;
	/**
	 * Surcharge
	 * The surcharge calculation strategy.
	 */
	surcharge?:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseInput)
				| ({
						typ: "percentage";
				  } & PercentageSurcharge)
		  )
		| null;
	/** To Time */
	to_time?: string | null;
}

/**
 * SupplierPolicyBand
 * Half-open window (``from_time`` inclusive, ``to_time`` exclusive, unset =
 * open) and the surcharge for landing in it. Bands match first-hit. A
 * percentage is a share of one room night — the first for an early arrival,
 * the last for a late departure — up to the whole of it; the surcharge
 * inflates base cost before operator markup.
 */
export interface SupplierPolicyBandOutput {
	/** From Time */
	from_time: string | null;
	/** Note */
	note: string | null;
	/**
	 * Surcharge
	 * The surcharge calculation strategy.
	 */
	surcharge:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageSurcharge)
		  )
		| null;
	/** To Time */
	to_time: string | null;
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
	 * What a supplier policy caught on an event. Advisory, never a publish
	 * block: the operator is the authority on their own contract, so a warning
	 * reports the conflict and the charge to expect and leaves the call to them.
	 *
	 * Check: GET /tour/{tour_id}/{option_id}/event/policy-check
	 */
	code: SupplierPolicyWarning;
	/** Detail */
	detail: string;
	/**
	 * Event Id
	 * @format uuid
	 */
	event_id: string;
	/**
	 * Expected Surcharge
	 * The surcharge calculation strategy.
	 */
	expected_surcharge:
		| (
				| ({
						typ: "fixed";
				  } & FixedExpenseOutput)
				| ({
						typ: "percentage";
				  } & PercentageSurcharge)
		  )
		| null;
	/** Option Id */
	option_id: string | null;
	/** Path */
	path: (string | number)[];
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string;
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
}

/** SupplierProductImageModel */
export interface SupplierProductImageModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Path */
	image_path: string;
	/** Is Primary */
	is_primary: boolean;
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
}

/** SupplierProductListResponse */
export interface SupplierProductListResponse {
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
	/** Total Count */
	total_count: number;
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
 * SupplierSearchHit
 * One name the search reached: a supplier, a product, or a variant, each
 * with the ids above it so a click can land on the row. ``product_id`` and
 * ``typ`` are set on product and variant hits only.
 */
export interface SupplierSearchHit {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * What one ``GET /supplier/search`` hit names. Declared in rank order: on
	 * a tied score the supplier lists before its product, the product before its
	 * variant.
	 */
	kind: SearchKind;
	/** Name */
	name: string;
	/** Product Id */
	product_id: string | null;
	/** Product Name */
	product_name: string | null;
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string;
	typ: SupplierType | null;
}

/**
 * SupplierUpdateSchema
 * Partial update: an omitted field is left alone, an explicit ``null``
 * clears. ``brand_name`` cannot be cleared; ``supplier_types`` is not a
 * field here — it follows the products.
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
}

/**
 * TicketedOffering
 * One offering of any other venue — a ticket tier, a class, a session —
 * and what it costs.
 */
export interface TicketedOfferingInput {
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
	 * Id
	 * @format uuid
	 */
	id?: string;
	/** Name */
	name?: string | null;
}

/**
 * TicketedOffering
 * One offering of any other venue — a ticket tier, a class, a session —
 * and what it costs.
 */
export interface TicketedOfferingOutput {
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
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Name */
	name: string | null;
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
	/** Event end time */
	end_time?: TimeSchema | null;
	/** Event start time */
	start_time?: TimeSchema | null;
}

/**
 * ToPerCar
 * Switch a transfer fleet to charging the cars a group fills: every car
 * category of the fleet is priced here.
 */
export interface ToPerCar {
	/** Cars */
	cars: CarChargeSwitch[];
	/** To */
	to: "per_car";
	/** Typ */
	typ: "transfer";
}

/**
 * ToPerCarCategory
 * Switch a transfer fleet to pricing by category: the categories it will
 * sell in, and what each car costs in the ones it is sold in. A price names
 * its category by the ``id`` the body gives it; a car priced in none is sold
 * in none until it is.
 */
export interface ToPerCarCategory {
	/** Categories */
	categories: CarCategory[];
	/** Prices */
	prices: CarPriceSwitch[];
	/** To */
	to: "per_car_category";
	/** Typ */
	typ: "transfer";
}

/**
 * ToPerFare
 * Switch a rail or air route to charging the fare class a group is booked
 * into: every fare of the route is priced here.
 */
export interface ToPerFare {
	/** Fares */
	fares: FareChargeSwitch[];
	/** To */
	to: "per_fare";
	/** Typ */
	typ: ToPerFareTypEnum;
}

/**
 * ToPerRoom
 * Move a hotel's price onto each room: every room of every category carries
 * its own rate, so every one of them is priced here.
 */
export interface ToPerRoom {
	/** Rooms */
	rooms: RoomRateSwitch[];
	/** To */
	to: "per_room";
	/** Typ */
	typ: "hotel";
}

/**
 * ToPerVehicle
 * Switch a coach fleet to charging the vehicles a group fills: every
 * vehicle category of the fleet is priced here.
 */
export interface ToPerVehicle {
	/** To */
	to: "per_vehicle";
	/** Typ */
	typ: "bus";
	/** Vehicles */
	vehicles: VehicleChargeSwitch[];
}

/**
 * ToWholeFleet
 * Switch a coach fleet to charging the run once: the charge moves onto the
 * fleet and its vehicles keep none.
 */
export interface ToWholeFleet {
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
	/** To */
	to: "whole";
	/** Typ */
	typ: "bus";
}

/**
 * ToWholeHotel
 * Move a hotel's price onto the hotel, charged once whatever rooms the stay
 * fills: the rooms keep none.
 */
export interface ToWholeHotel {
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateInput;
	/** To */
	to: "whole";
	/** Typ */
	typ: "hotel";
}

/**
 * ToWholeRoute
 * Switch a rail or air route to charging the leg once: the charge moves
 * onto the route and its fares keep none.
 */
export interface ToWholeRoute {
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
	/** To */
	to: "whole";
	/** Typ */
	typ: ToWholeRouteTypEnum;
}

/**
 * ToWholeTransfer
 * Switch a transfer fleet to charging the leg once: the charge moves onto
 * the fleet and its cars keep none.
 */
export interface ToWholeTransfer {
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
	/** To */
	to: "whole";
	/** Typ */
	typ: "transfer";
}

/** TourEventLibraryImageModel */
export interface TourEventLibraryImageModel {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Path */
	image_path: string;
	/** Is Primary */
	is_primary: boolean;
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
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Tour Option Id */
	tour_option_id: string | null;
	/** @default "source" */
	translation: TranslationState;
}

/** TourFinSettingsModel */
export interface TourFinSettingsModel {
	currency_type: Currency;
	foc: FocPolicy | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
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
	/** Tour Meta Id */
	tour_meta_id: string | null;
}

/** TourListResponse */
export interface TourListResponse {
	/** Data */
	data: TourMetaResponse[];
	/** Total Count */
	total_count: number;
}

/** TourMetaCreateSchema */
export interface TourMetaCreateSchema {
	/** Age From */
	age_from?: number | null;
	/** Age To */
	age_to?: number | null;
	/** Agency Id */
	agency_id?: string | null;
	/** Categories */
	categories?: TourCategory[];
	/**
	 * Days
	 * @min 1
	 * @default 1
	 */
	days?: number;
	/** Duration Hours */
	duration_hours?: number | null;
	/**
	 * Group Size
	 * @min 1
	 * @default 1
	 */
	group_size?: number;
	/** Group Size Min */
	group_size_min?: number | null;
	/**
	 * Languages
	 * @minItems 1
	 */
	languages?: LanguageCode[];
	/**
	 * Nights
	 * @min 0
	 * @default 0
	 */
	nights?: number;
	/**
	 * Title
	 * @minLength 1
	 * @maxLength 255
	 */
	title: string;
	/** @default "regular" */
	typ?: TourType;
}

/**
 * TourMetaResponse
 * ``tour_meta`` joined to its landing page, which owns the tour title. The
 * tour row itself carries no text — every reader that used to select
 * ``tour_meta.name`` now reads ``landing_page.title`` through this shape.
 */
export interface TourMetaResponse {
	/** Age From */
	age_from: number | null;
	/** Age To */
	age_to: number | null;
	/** Agency Id */
	agency_id: string | null;
	/** Categories */
	categories: TourCategory[];
	/** Cover Image Path */
	cover_image_path: string | null;
	/**
	 * Created At
	 * @format date-time
	 */
	created_at: string;
	/** Days */
	days: number;
	/** Duration Hours */
	duration_hours: number | null;
	/** Group Size */
	group_size: number;
	/** Group Size Min */
	group_size_min: number | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Landing Id */
	landing_id: string | null;
	/** Languages */
	languages: LanguageCode[];
	/** Nights */
	nights: number;
	/**
	 * Operator Id
	 * @format uuid
	 */
	operator_id: string;
	/** Schedule Id */
	schedule_id: string | null;
	/** Slug */
	slug: string | null;
	status: TourStatus;
	/** Title */
	title: string | null;
	typ: TourType;
	/**
	 * Updated At
	 * @format date-time
	 */
	updated_at: string;
}

/**
 * TourMetaUpdateSchema
 * The tour title is not here on purpose: it lives on ``landing_page.title``
 * and is renamed through ``PATCH /tour/{tour_id}/landing``, which is also where
 * the per-operator uniqueness check and the translation re-run hang off.
 */
export interface TourMetaUpdateSchema {
	/** Age From */
	age_from?: number | null;
	/** Age To */
	age_to?: number | null;
	/** Agency Id */
	agency_id?: string | null;
	/** Categories */
	categories?: TourCategory[] | null;
	/** Days */
	days?: number | null;
	/** Duration Hours */
	duration_hours?: number | null;
	/** Group Size */
	group_size?: number | null;
	/** Group Size Min */
	group_size_min?: number | null;
	/** Languages */
	languages?: LanguageCode[] | null;
	/** Nights */
	nights?: number | null;
	typ?: TourType | null;
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
	max: MonetaryValueSchema;
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
}

/**
 * TourMinMaxPaxSchema
 * The headcounts a quote's two legs are priced at: ``min`` is the tour's
 * ``group_size_min`` (1 when unset), ``max`` its ``group_size``.
 */
export interface TourMinMaxPaxSchema {
	/** Max */
	max: number;
	/** Min */
	min: number;
}

/** TourOptionCreateSchema */
export interface TourOptionCreateSchema {
	/** Description */
	description?: string | null;
	/** Name */
	name?: string | null;
}

/** TourOptionModel */
export interface TourOptionModel {
	/** Cover Image Path */
	cover_image_path: string | null;
	/** Deleted At */
	deleted_at: string | null;
	/** Description */
	description: string | null;
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Languages */
	languages: LanguageCode[] | null;
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
	/** Name */
	name: string | null;
	/** Tour Meta Id */
	tour_meta_id: string | null;
}

/** TourOptionPreviewSchema */
export interface TourOptionPreviewSchemaOutput {
	/** Cover Image Path */
	cover_image_path: string | null;
	/** Description */
	description: string | null;
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
	total_price: MonetaryValueSchema;
}

/** TourOptionPublicResponse */
export interface TourOptionPublicResponse {
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
	 * Id
	 * @format uuid
	 */
	id: string;
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
}

/**
 * TourOptionUpdateSchema
 * Partial update: an omitted field is left alone, an explicit ``null``
 * clears it. Cleared ``markup``/``languages`` fall back to the tour level.
 *
 * Check: PATCH /tour/{tour_id}/option/{option_id}
 */
export interface TourOptionUpdateSchema {
	/** Description */
	description?: string | null;
	/** Languages */
	languages?: LanguageCode[] | null;
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
	/** Name */
	name?: string | null;
}

/** TourPackageModel */
export interface TourPackageModel {
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
	 * Id
	 * @format uuid
	 */
	id: string;
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
	/** Name */
	name: string;
	/** Supplier Id */
	supplier_id: string | null;
	/**
	 * Tour Option Id
	 * @format uuid
	 */
	tour_option_id: string;
}

/** TourRegenerateResponse */
export interface TourRegenerateResponse {
	/** Events Scheduled */
	events_scheduled: number;
	/** Events Skipped */
	events_skipped: number;
	/** Landing */
	landing: boolean;
	/** Scheduled */
	scheduled: boolean;
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
	landing: LandingPagePubSchema;
	/**
	 * ``tour_meta`` joined to its landing page, which owns the tour title. The
	 * tour row itself carries no text — every reader that used to select
	 * ``tour_meta.name`` now reads ``landing_page.title`` through this shape.
	 */
	meta: TourMetaResponse;
	/** Moved */
	moved: boolean;
	/** Options */
	options: TourOptionPreviewSchemaOutput[];
	/** Slug */
	slug: string;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tour_id: string;
}

/**
 * TourSnapshotSchema
 * Pure-Pydantic snapshot of everything a booking's price depends on, frozen at creation.
 */
export interface TourSnapshotSchemaOutput {
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
	/** @default "en" */
	display_lang: LanguageCode;
	/** Events */
	events: OrderTourEventSchemaOutput[];
	/** Events Localized */
	events_localized: OrderTourEventSchemaOutput[] | null;
	/**
	 * Fx Margin
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	fx_margin: string;
	/** Fx Rates */
	fx_rates: FrozenFxRateOutput[];
	operator_financials: PricingFinancialsOutput | null;
	/** Packages */
	packages: PricingPackageOutput[];
	tour_financial_settings: FrozenTourFinOutput | null;
	tour_meta: FrozenTourMeta;
	/**
	 * ``markup`` is the option-level override frozen at booking time; snapshot
	 * pricing resolves it before the tour-level markup, so later option edits
	 * never change this booking.
	 */
	tour_option: FrozenTourOptionOutput;
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
	 * Completed
	 * @default 0
	 */
	completed: number;
	/**
	 * Confirmed Revenue
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	confirmed_revenue: string;
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
	/** @default "USD" */
	currency: Currency;
	/**
	 * In Progress
	 * @default 0
	 */
	in_progress: number;
	/**
	 * Payable
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	payable: string;
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
	 * Planned Revenue
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	planned_revenue: string;
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
	 * Receivable
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	receivable: string;
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
	 * Settled Profit
	 * @default "0"
	 * @pattern ^(?!^[-+.]*$)[+-]?0*\d*\.?\d*$
	 */
	settled_profit: string;
	/**
	 * Total Orders
	 * @default 0
	 */
	total_orders: number;
	/**
	 * Tourists
	 * @default 0
	 */
	tourists: number;
}

/**
 * TrainDetailPubSchema
 * A rail leg as a traveller sees it: where the group is carried, and when.
 */
export interface TrainDetailPubSchemaOutput {
	spec: TrainSpecPubSchemaOutput | null;
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
	/**
	 * Pool
	 * @minItems 1
	 */
	pool: TrainMemberOutput[];
}

/**
 * TrainDetailsUpdate
 * The half of a rail leg an alternative update writes: the tour's plan,
 * replaced whole. Its pool is written member by member.
 *
 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
 */
export interface TrainDetailsUpdate {
	/**
	 * When a rail or air leg this tour runs leaves and lands.
	 *
	 * The hours are the operator's own statement, not the supplier's: a route
	 * carries a timetable only if its supplier publishes one, and one stated here
	 * is what the leg runs to regardless. Event-level on purpose: a route's legs
	 * carry no ids to align a per-leg list against.
	 */
	plan?: Schedule;
}

/**
 * TrainDetailsWrite
 * A rail leg as a create takes it: the tour's plan and the rail suppliers that
 * run it.
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
	/** Pool */
	pool?: TrainMemberWrite[] | null;
}

/** TrainEvent */
export interface TrainEvent {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * A rail leg as a create takes it: the tour's plan and the rail suppliers that
	 * run it.
	 */
	details: TrainDetailsWrite;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
}

/** TrainEventPubRead */
export interface TrainEventPubReadOutput {
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/** Day */
	day: number | null;
	/** Description */
	description: string | null;
	details: TrainDetailPubSchemaOutput | null;
	/** Images */
	images: EventImagePubSchema[];
	/** Is Optional */
	is_optional: boolean | null;
	/** Name */
	name: string | null;
	/** Position */
	position: number | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
}

/** TrainEventTypeRead */
export interface TrainEventTypeReadOutput {
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A rail leg as it reads. */
	details: TrainDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
}

/** TrainEventUpdate */
export interface TrainEventUpdate {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * The half of a rail leg an alternative update writes: the tour's plan,
	 * replaced whole. Its pool is written member by member.
	 *
	 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
	 */
	details: TrainDetailsUpdate;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
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
	/** Supplier Id */
	supplier_id?: string | null;
}

/**
 * TrainLeg
 * One leg of a rail route — its two stations and nothing else.
 */
export interface TrainLegInput {
	/** Where the leg arrives. */
	arrival?: TrainStopInput | null;
	/** Where the leg leaves from. */
	departure?: TrainStopInput | null;
}

/**
 * TrainLeg
 * One leg of a rail route — its two stations and nothing else.
 */
export interface TrainLegOutput {
	/** Where the leg arrives. */
	arrival: TrainStopOutput | null;
	/** Where the leg leaves from. */
	departure: TrainStopOutput | null;
}

/**
 * TrainMember
 * One rail supplier of a leg's pool as it reads.
 */
export interface TrainMemberOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Is Main
	 * Whether the public card falls back to this member for its title and pictures. Exactly one member of a pool carries it.
	 * @default false
	 */
	is_main: boolean;
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
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & RouteProductSupplyOutput);
}

/**
 * TrainMemberNew
 * A rail supplier joining a leg's pool.
 */
export interface TrainMemberNew {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & TrainInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
	/** Typ */
	typ: "train";
}

/**
 * TrainMemberUpdate
 * A rail supplier of a leg's pool restated in place: who it is bought from
 * and the route it states, both replaced whole.
 */
export interface TrainMemberUpdate {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
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
	/** Supplier Id */
	supplier_id?: string | null;
	/** Typ */
	typ: "train";
}

/**
 * TrainMemberWrite
 * One rail supplier of a leg's pool as the API takes it. An ``id`` it carries is
 * ignored: every member a write lands is new.
 */
export interface TrainMemberWrite {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & TrainInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
}

/** TrainProductCreate */
export interface TrainProductCreate {
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
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
}

/** TrainProductRead */
export interface TrainProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Paths */
	image_paths: string[];
	/** Name */
	name: string;
	/** Primary Image Path */
	primary_image_path: string | null;
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
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
}

/** TrainProductUpdate */
export interface TrainProductUpdate {
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
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
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
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * A rail leg as a create takes it: the tour's plan and the rail suppliers that
	 * run it.
	 */
	details: TrainDetailsWrite;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
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
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A rail leg as it reads. */
	details: TrainDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "train"
	 */
	typ: "train";
}

/**
 * TrainSpecPubSchema
 * The journey a rail leg promises: the stations it calls at and the hours
 * it runs to. Two rail suppliers of one pool carry the same group over the
 * same line, so the stations come from the member the card is built on rather
 * than from a combination that would have no meaning.
 *
 * A supplier's route carries stations but no timetable, so the hours the tour
 * states land on the first departure and the last arrival — the only two the
 * leg has. A route with no stations at all still keeps its hours, in one hop
 * with no place attached.
 */
export interface TrainSpecPubSchemaOutput {
	/** Hop */
	hop: TransportHopPubSchemaOutput[];
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
 * One car class of the ride. ``categories``, like the inherited ``name``
 * and ``description``, stays empty: they are one fleet's, and a card promises
 * the class.
 */
export interface TransferCarPubSchema {
	/** Categories */
	categories: TransferCarCategoryPubSchema[];
	/** Description */
	description: string | null;
	/** Name */
	name: string | null;
	/** Pax */
	pax: number | null;
	typ: VehicleBodyType | null;
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
	/**
	 * Pool
	 * @minItems 1
	 */
	pool: TransferMemberOutput[];
}

/**
 * TransferDetailsPubSchema
 * A transfer as a traveller sees it: what kind of run it is, where it
 * leaves from and arrives at, and what it is driven in.
 */
export interface TransferDetailsPubSchemaOutput {
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
	spec: TransferSpecPubSchemaOutput | null;
	typ: TransferTypes | null;
}

/**
 * TransferDetailsUpdate
 * The half of a ride an alternative update writes: the tour's plan,
 * replaced whole. Its pool is written member by member.
 *
 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
 */
export interface TransferDetailsUpdate {
	/**
	 * What kind of run a transfer is and where it leaves from and arrives at,
	 * whoever drives it.
	 */
	plan?: TransferLegInput;
}

/**
 * TransferDetailsWrite
 * A ride as a create takes it: the tour's plan and the car suppliers that drive
 * it.
 */
export interface TransferDetailsWrite {
	/**
	 * What kind of run a transfer is and where it leaves from and arrives at,
	 * whoever drives it.
	 */
	plan?: TransferLegInput;
	/** Pool */
	pool?: TransferMemberWrite[] | null;
}

/** TransferEvent */
export interface TransferEvent {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * A ride as a create takes it: the tour's plan and the car suppliers that drive
	 * it.
	 */
	details: TransferDetailsWrite;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
}

/** TransferEventPubRead */
export interface TransferEventPubReadOutput {
	/**
	 * Date
	 * Calendar date this event falls on, computed as the booking's departure date plus ``day - 1``. Null in the catalogue, where a template tour has no departure date to anchor against.
	 */
	date: string | null;
	/** Day */
	day: number | null;
	/** Description */
	description: string | null;
	details: TransferDetailsPubSchemaOutput | null;
	/** Images */
	images: EventImagePubSchema[];
	/** Is Optional */
	is_optional: boolean | null;
	/** Name */
	name: string | null;
	/** Position */
	position: number | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
}

/** TransferEventTypeRead */
export interface TransferEventTypeReadOutput {
	/**
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A ride as it reads. */
	details: TransferDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
}

/** TransferEventUpdate */
export interface TransferEventUpdate {
	/**
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * The half of a ride an alternative update writes: the tour's plan,
	 * replaced whole. Its pool is written member by member.
	 *
	 * Check: ``PATCH /tour/{tour_id}/{option_id}/event/{event_id}/option/{event_option_id}/pool/{supply_id}``
	 */
	details: TransferDetailsUpdate;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
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
	/** Supplier Id */
	supplier_id?: string | null;
}

/**
 * TransferLeg
 * What kind of run a transfer is and where it leaves from and arrives at,
 * whoever drives it.
 */
export interface TransferLegInput {
	/** Details of the arrival. */
	arrival?: TransferPointInput | null;
	/** Details of the departure. */
	departure?: TransferPointInput | null;
	typ?: TransferTypes | null;
}

/**
 * TransferLeg
 * What kind of run a transfer is and where it leaves from and arrives at,
 * whoever drives it.
 */
export interface TransferLegOutput {
	/** Details of the arrival. */
	arrival: TransferPointOutput | null;
	/** Details of the departure. */
	departure: TransferPointOutput | null;
	typ: TransferTypes | null;
}

/**
 * TransferMember
 * One car supplier of a ride's pool as it reads.
 */
export interface TransferMemberOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/**
	 * Is Main
	 * Whether the public card falls back to this member for its title and pictures. Exactly one member of a pool carries it.
	 * @default false
	 */
	is_main: boolean;
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
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & InlineSupply)
		| ({
				source: "product";
		  } & TransferProductSupplyOutput);
}

/**
 * TransferMemberNew
 * A car supplier joining a ride's pool.
 */
export interface TransferMemberNew {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & TransferInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
	/** Typ */
	typ: "transfer";
}

/**
 * TransferMemberUpdate
 * A car supplier of a ride's pool restated in place: who it is bought from
 * and the fleet it states, both replaced whole.
 */
export interface TransferMemberUpdate {
	/**
	 * Source
	 * @default "inline"
	 */
	source?: "inline";
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
	/** Supplier Id */
	supplier_id?: string | null;
	/** Typ */
	typ: "transfer";
}

/**
 * TransferMemberWrite
 * One car supplier of a ride's pool as the API takes it. An ``id`` it carries is
 * ignored: every member a write lands is new.
 */
export interface TransferMemberWrite {
	/** Id */
	id?: string | null;
	/** Supply */
	supply:
		| ({
				source: "inline";
		  } & TransferInlineSupplyNew)
		| ({
				source: "product";
		  } & ProductSupplyNew);
}

/**
 * TransferOverride
 * A price this tour negotiated for a ride, replacing the fleet's own.
 */
export interface TransferOverrideInput {
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
		  } & CarPriceChargesOverrideInput)
		| ({
				pricing: "whole";
		  } & WholeTransferChargeOverrideInput);
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
}

/**
 * TransferOverride
 * A price this tour negotiated for a ride, replacing the fleet's own.
 */
export interface TransferOverrideOutput {
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
		  } & CarPriceChargesOverrideOutput)
		| ({
				pricing: "whole";
		  } & WholeTransferChargeOverrideOutput);
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
}

/**
 * TransferPoint
 * Where a transfer leg leaves from or arrives at, and when.
 */
export interface TransferPointInput {
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** The time of an event */
	time?: TimeSchema | null;
}

/**
 * TransferPoint
 * Where a transfer leg leaves from or arrives at, and when.
 */
export interface TransferPointOutput {
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** The time of an event */
	time: TimeSchema | null;
}

/** TransferProductCreate */
export interface TransferProductCreate {
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
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
}

/** TransferProductRead */
export interface TransferProductReadOutput {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
	/** Image Paths */
	image_paths: string[];
	/** Name */
	name: string;
	/** Primary Image Path */
	primary_image_path: string | null;
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
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplier_id: string;
	/** Supplier Name */
	supplier_name: string | null;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
}

/**
 * TransferProductSupply
 * A ride driven by a supplier's transfer fleet.
 */
export interface TransferProductSupplyOutput {
	override: TransferOverrideOutput | null;
	/**
	 * Product Id
	 * @format uuid
	 */
	product_id: string;
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
	 * Source
	 * @default "product"
	 */
	source: "product";
	/** Who a linked product is bought from, resolved on read. */
	supplier: SupplierRef;
}

/** TransferProductUpdate */
export interface TransferProductUpdate {
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
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
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
	 * Description
	 * Event's description
	 */
	description?: string | null;
	/**
	 * A ride as a create takes it: the tour's plan and the car suppliers that drive
	 * it.
	 */
	details: TransferDetailsWrite;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images?: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional?: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name?: string | null;
	/** Package Id */
	package_id?: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
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
	 * Description
	 * Event's description
	 */
	description: string | null;
	/** A ride as it reads. */
	details: TransferDetailsOutput;
	/**
	 * Id
	 * The option row this payload is — what ``/{event_id}/option/{event_option_id}`` addresses, on a single event and on each alternative of a choice alike.
	 * @format uuid
	 */
	id: string;
	/**
	 * Images
	 * Images of the event slot, primary first; populated on read, ignored on write.
	 */
	images: EventImageSchema[];
	/**
	 * Is Optional
	 * @default false
	 */
	is_optional: boolean;
	/**
	 * Name
	 * Event's name
	 */
	name: string | null;
	/** Package Id */
	package_id: string | null;
	/**
	 * Position
	 * Event's order number in a tour
	 * @min 0
	 */
	position: number;
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ: "transfer";
}

/**
 * TransferSpecPubSchema
 * The cars a ride promises, over every fleet of its pool: one entry per
 * distinct body type and capacity. Which company actually drives is
 * procurement, so a fleet's own name and pictures never reach a traveller, and
 * a car's own name, description and trim go with them — a trim is priced per
 * fleet and means nothing once the fleets are put together.
 */
export interface TransferSpecPubSchemaOutput {
	/** Cars */
	cars: TransferCarPubSchema[];
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
	arrival: JourneyPointPubSchemaOutput;
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
}

/** UpdateFinancialSchema */
export interface UpdateFinancialSchema {
	currency_type?: Currency | null;
	foc?: FocPolicy | null;
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
	default_currency?: Currency | null;
	/** First Name */
	first_name?: string | null;
	/** Last Name */
	last_name?: string | null;
	/** Location */
	location?: string | null;
	/** Phone Number */
	phone_number?: string | null;
	/** Title */
	title?: string | null;
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
 * the new entry of a hotel's ``product.spec.categories``, a route's ``fares``,
 * a fleet's ``vehicles`` or ``cars``, or a venue's ``offerings`` — a fleet
 * priced by category also lists ``categories``, which are not its units.
 *
 * Check
 *
 * - ``POST /supplier/{supplier_id}/product/{product_id}/variant``
 * - ``PATCH /supplier/{supplier_id}/product/{product_id}/variant/{variant_id}``
 */
export interface VariantCreated {
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
	/**
	 * Variant Id
	 * @format uuid
	 */
	variant_id: string;
}

/**
 * Vehicle
 * A vehicle of a whole-run fleet: described, never priced — the run is
 * charged once whatever vehicles it takes. An ``ImageBearingNode``: echo its
 * ``id`` on update to keep the vehicle's pictures.
 */
export interface Vehicle {
	body_type: VehicleBodyType;
	/** Description */
	description?: string | null;
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
	/**
	 * Pax
	 * Seats a group is packed into.
	 * @min 1
	 */
	pax: number;
}

/**
 * VehicleChargeOverride
 * What one coach costs this tour.
 */
export interface VehicleChargeOverrideInput {
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/**
	 * Vehicle Id
	 * @format uuid
	 */
	vehicle_id: string;
}

/**
 * VehicleChargeOverride
 * What one coach costs this tour.
 */
export interface VehicleChargeOverrideOutput {
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeOutput;
	/**
	 * Vehicle Id
	 * @format uuid
	 */
	vehicle_id: string;
}

/**
 * VehicleChargeSwitch
 * What one vehicle of a category costs once the fleet charges by vehicle.
 */
export interface VehicleChargeSwitch {
	/** A fixed cost together with its own fee and markup. */
	charge: FixedChargeInput;
	/**
	 * Variant Id
	 * @format uuid
	 */
	variant_id: string;
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
 * One coach or car class: body and seats. ``name`` and ``description`` stay
 * empty — they are one fleet's — and the price never crosses.
 */
export interface VehiclePubSchema {
	/** Description */
	description: string | null;
	/** Name */
	name: string | null;
	/** Pax */
	pax: number | null;
	typ: VehicleBodyType | null;
}

/**
 * VehicleWrite
 * One vehicle category of a whole fleet as a create takes it: what the
 * coach is and how many it seats, never what it costs — the run carries the
 * charge. No ``id``: the category is minted with the fleet.
 */
export interface VehicleWrite {
	body_type: VehicleBodyType;
	/** Description */
	description?: string | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
}

/** VoucherResponse */
export interface VoucherResponse {
	/**
	 * Booking Id
	 * @format uuid
	 */
	booking_id: string;
	/** File Name */
	file_name: string | null;
	/** Order Number */
	order_number: string;
	/** Url */
	url: string;
}

/**
 * WholeBusDetails
 * A coach fleet sold whole as the API takes it.
 */
export interface WholeBusDetails {
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
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
}

/** WholeBusVariantWrite */
export interface WholeBusVariantWrite {
	body_type: VehicleBodyType;
	/** Description */
	description?: string | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
}

/**
 * WholeFleet
 * A fleet taken whole: one charge for the run, the vehicles only
 * describing what the group rides in.
 */
export interface WholeFleetInput {
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
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Name */
	name?: string | null;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
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
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Name */
	name: string | null;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Vehicles */
	vehicles: Vehicle[];
}

/**
 * WholeFleetChargeOverride
 * What a run taken whole costs this tour, replacing the fleet's own charge.
 */
export interface WholeFleetChargeOverrideInput {
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
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeFleetChargeOverride
 * What a run taken whole costs this tour, replacing the fleet's own charge.
 */
export interface WholeFleetChargeOverrideOutput {
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
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeFleetCreate
 * A coach fleet sold whole as a create takes it: the one charge of the run
 * and the vehicle categories it takes, none of them priced.
 */
export interface WholeFleetCreate {
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
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "bus"
	 */
	typ?: "bus";
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
	fares?: PlainFareCreate[];
	/** Legs */
	legs?: FlightLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
}

/**
 * WholeFlightDetails
 * An air route sold whole as the API takes it.
 */
export interface WholeFlightDetails {
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
	/** Legs */
	legs?: FlightLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
}

/**
 * WholeFlightRoute
 * An air route taken whole: one charge for the leg, the fares only naming
 * what the group flies in.
 */
export interface WholeFlightRouteInput {
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
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Legs */
	legs?: FlightLegInput[];
	/** Name */
	name?: string | null;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeFlightRoute
 * An air route taken whole: one charge for the leg, the fares only naming
 * what the group flies in.
 */
export interface WholeFlightRouteOutput {
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
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Legs */
	legs: FlightLegOutput[];
	/** Name */
	name: string | null;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/** WholeFlightVariantWrite */
export interface WholeFlightVariantWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "flight"
	 */
	typ?: "flight";
}

/**
 * WholeHotel
 * A hotel whose price sits on the hotel: one price whatever rooms the stay
 * fills, the categories only describing what the group gets. How that price
 * scales is the charge inside it — ``fixed`` once, ``per_duration`` per night,
 * ``per_person`` per head.
 */
export interface WholeHotelInput {
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Categories */
	categories?: CategoryInput[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Name */
	name?: string | null;
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateInput;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Stars */
	stars?: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
}

/**
 * WholeHotel
 * A hotel whose price sits on the hotel: one price whatever rooms the stay
 * fills, the categories only describing what the group gets. How that price
 * scales is the charge inside it — ``fixed`` once, ``per_duration`` per night,
 * ``per_person`` per head.
 */
export interface WholeHotelOutput {
	/** Amenities */
	amenities: AmenitiesTypes[];
	/** Categories */
	categories: CategoryOutput[];
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Location */
	location: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/** Name */
	name: string | null;
	/** Check-in and check-out hours and the bands billed outside them. */
	policy: HotelPolicySchemaOutput | null;
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateOutput;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
	/** Stars */
	stars: number | null;
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs: HotelKind[];
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
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Categories */
	categories?: CategoryWrite[];
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateInput;
	/** Pricing */
	pricing: "whole";
	/** Stars */
	stars?: number | null;
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
}

/**
 * WholeHotelDetails
 * A hotel sold whole as the API takes it.
 */
export interface WholeHotelDetails {
	/** Amenities */
	amenities?: AmenitiesTypes[];
	/** Location */
	location?: LocationOutSchema | LocationRefSchema | LocationInSchema | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Check-in and check-out hours and the bands billed outside them. */
	policy?: HotelPolicySchemaInput | null;
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateInput;
	/** Pricing */
	pricing: "whole";
	/** Stars */
	stars?: number | null;
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
	/**
	 * Typs
	 * What kind of place this is — a hotel, a yurt camp, a villa.
	 */
	typs?: HotelKind[];
}

/**
 * WholeHotelVariantWrite
 * One room category of a whole hotel: its rooms are described, the price
 * sitting on the hotel.
 */
export interface WholeHotelVariantWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "whole";
	/** Rooms */
	rooms?: RoomWrite[];
	/**
	 * Typ
	 * @default "hotel"
	 */
	typ?: "hotel";
}

/**
 * WholePriceOverride
 * What a whole stay costs this tour, replacing the hotel's own price.
 */
export interface WholePriceOverrideInput {
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateInput;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholePriceOverride
 * What a whole stay costs this tour, replacing the hotel's own price.
 */
export interface WholePriceOverrideOutput {
	/**
	 * What a whole stay costs: the base charge plus the seasons that replace
	 * it. A dated stay pays the season containing its check-in, else the base; an
	 * undated one may still land on the base or on any season not yet ended.
	 */
	price: StayRateOutput;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeRouteChargeOverride
 * What a leg taken whole costs this tour, replacing the route's own charge.
 */
export interface WholeRouteChargeOverrideInput {
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
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeRouteChargeOverride
 * What a leg taken whole costs this tour, replacing the route's own charge.
 */
export interface WholeRouteChargeOverrideOutput {
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
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeTrainCreate
 * A rail route sold whole as a create takes it: the one charge of the leg
 * and the fare classes it is taken in, none of them priced.
 */
export interface WholeTrainCreate {
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
	fares?: PlainFareCreate[];
	/** Legs */
	legs?: TrainLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
}

/**
 * WholeTrainDetails
 * A rail route sold whole as the API takes it.
 */
export interface WholeTrainDetails {
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
	/** Legs */
	legs?: TrainLegInput[];
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
}

/**
 * WholeTrainRoute
 * A rail route taken whole: one charge for the leg, the fares only naming
 * what the group travels in.
 */
export interface WholeTrainRouteInput {
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
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Legs */
	legs?: TrainLegInput[];
	/** Name */
	name?: string | null;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeTrainRoute
 * A rail route taken whole: one charge for the leg, the fares only naming
 * what the group travels in.
 */
export interface WholeTrainRouteOutput {
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
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Legs */
	legs: TrainLegOutput[];
	/** Name */
	name: string | null;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/** WholeTrainVariantWrite */
export interface WholeTrainVariantWrite {
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "train"
	 */
	typ?: "train";
}

/**
 * WholeTransfer
 * A fleet taken whole: one charge for the leg, the cars only describing
 * what the group rides in.
 */
export interface WholeTransferInput {
	/** Cars */
	cars?: Car[];
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
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images?: NodeImageSchema[];
	/** Name */
	name?: string | null;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeTransfer
 * A fleet taken whole: one charge for the leg, the cars only describing
 * what the group rides in.
 */
export interface WholeTransferOutput {
	/** Cars */
	cars: Car[];
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
	/**
	 * Images
	 * Pictures of what the spec describes, primary first; server-owned — ignored on write, filled from the product's gallery.
	 */
	images: NodeImageSchema[];
	/** Name */
	name: string | null;
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeTransferChargeOverride
 * What a ride taken whole costs this tour, replacing the fleet's own charge.
 */
export interface WholeTransferChargeOverrideInput {
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
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeTransferChargeOverride
 * What a ride taken whole costs this tour, replacing the fleet's own charge.
 */
export interface WholeTransferChargeOverrideOutput {
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
	/**
	 * Pricing
	 * @default "whole"
	 */
	pricing: "whole";
}

/**
 * WholeTransferCreate
 * A transfer fleet sold whole as a create takes it: the one charge of the
 * leg and the car categories it takes, none of them priced.
 */
export interface WholeTransferCreate {
	/** Cars */
	cars?: CarWrite[];
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
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
}

/**
 * WholeTransferDetails
 * A transfer fleet sold whole as the API takes it: what it stores plus the
 * name that lands on the ``name`` column.
 */
export interface WholeTransferDetails {
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
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
}

/** WholeTransferVariantWrite */
export interface WholeTransferVariantWrite {
	body_type: VehicleBodyType;
	/** Description */
	description?: string | null;
	/**
	 * Name
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Pax
	 * Seats; what the bin-packer fills a group with.
	 * @min 1
	 */
	pax: number;
	/** Pricing */
	pricing: "whole";
	/**
	 * Typ
	 * @default "transfer"
	 */
	typ?: "transfer";
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

export interface CreateUserAdminUserPostParams {
	/** @default "authenticated_user" */
	role?: UserRoles;
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

export interface DeleteUserAdminUserIdDeleteParams {
	/**
	 * Id
	 * @format uuid
	 */
	id: string;
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

export interface RemoveAgencyDocumentAgencyMeDocumentsFileIdDeleteParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface GetAgencyDocumentUrlAgencyMeDocumentsFileIdGetParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
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

export interface GoogleLoginAuthGoogleLoginGetParams {
	/** Next */
	next?: string | null;
}

export interface DeletePermissionGroupAuthPermissionGroupGroupIdDeleteParams {
	/**
	 * Group Id
	 * @format uuid
	 */
	groupId: string;
}

export interface UpdatePermissionGroupAuthPermissionGroupGroupIdPatchParams {
	/**
	 * Group Id
	 * @format uuid
	 */
	groupId: string;
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

export interface GetOperatorBookingOrderBookingOrderOperatorBookingIdGetParams {
	/** @default "en" */
	lang?: LanguageCode;
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface ListBookingAvailabilityBookingOrderOperatorBookingIdAvailabilityGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface DeclineBookingBookingOrderOperatorBookingIdDeclinePostParams {
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

export interface GetOperatorOrderFinancialsBookingOrderOperatorBookingIdFinancialsGetParams {
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

export interface GetOperatorOrderVarianceBookingOrderOperatorBookingIdVarianceGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface RemoveFileBookingOrderPaxFileFileIdDeleteParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface GetFileBinaryBookingOrderPaxFileFileIdGetParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface GetBookingQuoteBookingOrderQuoteGetParams {
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
	 * @min 1
	 */
	pax: number;
	/** @default "en" */
	lang?: LanguageCode;
	/** Currency */
	currency?: Currency | null;
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

export interface DeleteBookingOrderBookingOrderBookingIdDeleteParams {
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

export interface CancelBookingBookingOrderBookingIdCancelPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface GetBookingItineraryBookingOrderBookingIdItineraryGetParams {
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

export interface AddPassengerInfoBookingOrderBookingIdPaxPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
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

export interface GetBookingPriceBookingOrderBookingIdPriceGetParams {
	/**
	 * Pax
	 * @min 1
	 */
	pax: number;
	/** Currency */
	currency?: Currency | null;
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

export interface DeletePaymentBookingPaymentPaymentIdDeleteParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
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

export interface ConfirmPaymentBookingPaymentPaymentIdConfirmPostParams {
	/**
	 * Payment Id
	 * @format uuid
	 */
	paymentId: string;
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

export interface ListEditsBookingRevisionBookingIdEditsGetParams {
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
					typ: "activity";
			  } & ActivitySingleEvent)
			| ({
					typ: "bus";
			  } & BusSingleEvent)
			| ({
					typ: "flight";
			  } & FlightSingleEvent)
			| ({
					typ: "guide";
			  } & GuideSingleEvent)
			| ({
					typ: "housing";
			  } & HousingSingleEvent)
			| ({
					typ: "ref";
			  } & InformationSingleEvent)
			| ({
					typ: "supplementary";
			  } & SupplementarySingleEvent)
			| ({
					typ: "train";
			  } & TrainSingleEvent)
			| ({
					typ: "transfer";
			  } & TransferSingleEvent)
	  )
	| MultiEvent;

export interface AddEventBookingRevisionBookingIdEventPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export enum CopyEventBookingRevisionBookingIdEventCopyPostDetailEnum {
	NoSuchEventOnTheBookedTourOption = "No such event on the booked tour option",
	NoSuchEventInThisBookingsSnapshot = "No such event in this booking's snapshot"
}

export enum CopyEventBookingRevisionBookingIdEventCopyPostDetailEnum1 {
	EventsCanOnlyBeRevisedWhileTheBookingIsInProcessing = "Events can only be revised while the booking is in processing",
	BookingHasNoSnapshotToRevise = "Booking has no snapshot to revise"
}

export interface CopyEventBookingRevisionBookingIdEventCopyPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
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

/** Event */
export type UpdateEventBookingRevisionBookingIdEventEventIdPatchPayload =
	| (
			| ({
					typ: "activity";
			  } & ActivitySingleEvent)
			| ({
					typ: "bus";
			  } & BusSingleEvent)
			| ({
					typ: "flight";
			  } & FlightSingleEvent)
			| ({
					typ: "guide";
			  } & GuideSingleEvent)
			| ({
					typ: "housing";
			  } & HousingSingleEvent)
			| ({
					typ: "ref";
			  } & InformationSingleEvent)
			| ({
					typ: "supplementary";
			  } & SupplementarySingleEvent)
			| ({
					typ: "train";
			  } & TrainSingleEvent)
			| ({
					typ: "transfer";
			  } & TransferSingleEvent)
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

/** Member */
export type AddPoolMemberBookingRevisionBookingIdEventEventIdPoolPostPayload =
	| ({
			typ: "activity";
	  } & ActivityMemberNew)
	| ({
			typ: "bus";
	  } & BusMemberNew)
	| ({
			typ: "flight";
	  } & FlightMemberNew)
	| ({
			typ: "guide";
	  } & GuideMemberNew)
	| ({
			typ: "housing";
	  } & HousingMemberNew)
	| ({
			typ: "ref";
	  } & InformationMemberNew)
	| ({
			typ: "supplementary";
	  } & SupplementaryMemberNew)
	| ({
			typ: "train";
	  } & TrainMemberNew)
	| ({
			typ: "transfer";
	  } & TransferMemberNew);

export interface AddPoolMemberBookingRevisionBookingIdEventEventIdPoolPostParams {
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

export interface RemovePoolMemberBookingRevisionBookingIdEventEventIdPoolSupplyIdDeleteParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export interface ClearPoolMemberOverrideBookingRevisionBookingIdEventEventIdPoolSupplyIdOverrideDeleteParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

/** Override */
export type SetPoolMemberOverrideBookingRevisionBookingIdEventEventIdPoolSupplyIdOverridePatchPayload =

		| ({
				typ: "activity";
		  } & ActivityOverrideInput)
		| ({
				typ: "bus";
		  } & BusOverrideInput)
		| ({
				typ: "flight";
		  } & RouteOverrideInput)
		| ({
				typ: "housing";
		  } & HotelOverrideInput)
		| ({
				typ: "train";
		  } & RouteOverrideInput)
		| ({
				typ: "transfer";
		  } & TransferOverrideInput);

export interface SetPoolMemberOverrideBookingRevisionBookingIdEventEventIdPoolSupplyIdOverridePatchParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export interface ClearPoolMemberProductBookingRevisionBookingIdEventEventIdPoolSupplyIdProductDeleteParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export interface SetPoolMemberProductBookingRevisionBookingIdEventEventIdPoolSupplyIdProductPatchParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export interface PreviewBookingRevisionBookingIdPreviewGetParams {
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

export interface GetVoucherBookingVoucherBookingIdGetParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
}

export interface UploadVoucherBookingVoucherBookingIdPostParams {
	/**
	 * Booking Id
	 * @format uuid
	 */
	bookingId: string;
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

export interface GetInvoicePdfInvoiceInvoiceIdPdfGetParams {
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

export interface DeleteAgencyDiscountOperatorAgenciesAgencyIdDiscountDeleteParams {
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

export interface GetAgencyInfoByIdOperatorAgenciesAgencyIdInfoGetParams {
	/**
	 * Agency Id
	 * @format uuid
	 */
	agencyId: string;
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

export interface RemoveFileOperatorMeFilesFileIdDeleteParams {
	/**
	 * File Id
	 * @format uuid
	 */
	fileId: string;
}

export interface GetFileUrlOperatorMeFilesFileIdGetParams {
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

export interface DeletePaymentRouteOperatorPaymentRoutesRouteIdDeleteParams {
	/**
	 * Route Id
	 * @format uuid
	 */
	routeId: string;
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

export interface DeleteStaffMemberOperatorStaffUserIdDeleteParams {
	/**
	 * User Id
	 * @format uuid
	 */
	userId: string;
}

export interface UpdateStaffMemberOperatorStaffUserIdPatchParams {
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

export interface DeleteOperatorOperatorIdDeleteParams {
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

export interface UdpateOperatorOperatorIdPatchParams {
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

export interface SearchSupplierSearchGetParams {
	/**
	 * Q
	 * @minLength 1
	 * @maxLength 128
	 */
	q: string;
	/**
	 * Limit
	 * @min 1
	 * @max 50
	 * @default 10
	 */
	limit?: number;
	/** Typ */
	typ?: SupplierType | null;
}

export interface DeleteSupplierSupplierSupplierIdDeleteParams {
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

export interface UpdateSupplierSupplierSupplierIdPatchParams {
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

export enum CreateProductSupplierSupplierIdProductPostDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum CreateProductSupplierSupplierIdProductPostDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum CreateProductSupplierSupplierIdProductPostDetailEnum2 {
	NotFound = "Not found"
}

/** Payload */
export type CreateProductSupplierSupplierIdProductPostPayload =
	| ({
			typ: "activity";
	  } & ActivityProductCreate)
	| ({
			typ: "bus";
	  } & BusProductCreate)
	| ({
			typ: "flight";
	  } & FlightProductCreate)
	| ({
			typ: "hotel";
	  } & HotelProductCreate)
	| ({
			typ: "train";
	  } & TrainProductCreate)
	| ({
			typ: "transfer";
	  } & TransferProductCreate);

export interface CreateProductSupplierSupplierIdProductPostParams {
	/**
	 * Supplier Id
	 * @format uuid
	 */
	supplierId: string;
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
	PricingSwitchWouldOrphanTourOverrides = "pricing switch would orphan tour overrides",
	CarCategoryIsReferencedByTourEvents = "Car category is referenced by tour events"
}

/** Payload */
export type UpdateProductSupplierSupplierIdProductProductIdPatchPayload =
	| ({
			typ: "activity";
	  } & ActivityProductUpdate)
	| ({
			typ: "bus";
	  } & BusProductUpdate)
	| ({
			typ: "flight";
	  } & FlightProductUpdate)
	| ({
			typ: "hotel";
	  } & HotelProductUpdate)
	| ({
			typ: "train";
	  } & TrainProductUpdate)
	| ({
			typ: "transfer";
	  } & TransferProductUpdate);

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
	PricingSwitchWouldOrphanTourOverrides = "pricing switch would orphan tour overrides",
	PricingSwitchWouldDropCarCategoriesToursPin = "pricing switch would drop car categories tours pin"
}

export enum SwitchProductPricingSupplierSupplierIdProductProductIdPricingPostDetailEnum5 {
	PricingSwitchMustPriceEveryUnitOfTheProductExactlyOnce = "pricing switch must price every unit of the product exactly once"
}

/** Payload */
export type SwitchProductPricingSupplierSupplierIdProductProductIdPricingPostPayload =

		| (
				| ({
						to: "per_room";
				  } & ToPerRoom)
				| ({
						to: "whole";
				  } & ToWholeHotel)
		  )
		| (
				| ({
						to: "per_fare";
				  } & ToPerFare)
				| ({
						to: "whole";
				  } & ToWholeRoute)
		  )
		| (
				| ({
						to: "per_vehicle";
				  } & ToPerVehicle)
				| ({
						to: "whole";
				  } & ToWholeFleet)
		  )
		| (
				| ({
						to: "per_car";
				  } & ToPerCar)
				| ({
						to: "per_car_category";
				  } & ToPerCarCategory)
				| ({
						to: "whole";
				  } & ToWholeTransfer)
		  );

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

export enum CreateVariantSupplierSupplierIdProductProductIdVariantPostDetailEnum5 {
	CarIsPricedInACategoryTheFleetDoesNotDeclare = "Car is priced in a category the fleet does not declare"
}

/** Payload */
export type CreateVariantSupplierSupplierIdProductProductIdVariantPostPayload =
	| (
			| ({
					pricing: "per_room";
			  } & PerRoomHotelVariantWrite)
			| ({
					pricing: "whole";
			  } & WholeHotelVariantWrite)
	  )
	| (
			| ({
					pricing: "per_fare";
			  } & PerFareTrainVariantWrite)
			| ({
					pricing: "whole";
			  } & WholeTrainVariantWrite)
	  )
	| (
			| ({
					pricing: "per_fare";
			  } & PerFareFlightVariantWrite)
			| ({
					pricing: "whole";
			  } & WholeFlightVariantWrite)
	  )
	| (
			| ({
					pricing: "per_vehicle";
			  } & PerVehicleBusVariantWrite)
			| ({
					pricing: "whole";
			  } & WholeBusVariantWrite)
	  )
	| (
			| ({
					pricing: "per_car";
			  } & PerCarTransferVariantWrite)
			| ({
					pricing: "per_car_category";
			  } & PerCarCategoryTransferVariantWrite)
			| ({
					pricing: "whole";
			  } & WholeTransferVariantWrite)
	  )
	| ActivityVariantWrite;

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

export enum UpdateVariantSupplierSupplierIdProductProductIdVariantVariantIdPatchDetailEnum5 {
	CarIsPricedInACategoryTheFleetDoesNotDeclare = "Car is priced in a category the fleet does not declare"
}

/** Payload */
export type UpdateVariantSupplierSupplierIdProductProductIdVariantVariantIdPatchPayload =

		| (
				| ({
						pricing: "per_room";
				  } & PerRoomHotelVariantWrite)
				| ({
						pricing: "whole";
				  } & WholeHotelVariantWrite)
		  )
		| (
				| ({
						pricing: "per_fare";
				  } & PerFareTrainVariantWrite)
				| ({
						pricing: "whole";
				  } & WholeTrainVariantWrite)
		  )
		| (
				| ({
						pricing: "per_fare";
				  } & PerFareFlightVariantWrite)
				| ({
						pricing: "whole";
				  } & WholeFlightVariantWrite)
		  )
		| (
				| ({
						pricing: "per_vehicle";
				  } & PerVehicleBusVariantWrite)
				| ({
						pricing: "whole";
				  } & WholeBusVariantWrite)
		  )
		| (
				| ({
						pricing: "per_car";
				  } & PerCarTransferVariantWrite)
				| ({
						pricing: "per_car_category";
				  } & PerCarCategoryTransferVariantWrite)
				| ({
						pricing: "whole";
				  } & WholeTransferVariantWrite)
		  )
		| ActivityVariantWrite;

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

export interface ListLibraryEventsTourEventLibraryGetParams {
	/** Typ */
	typ?: EventTypes[] | null;
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

/** Event */
export type CreateLibraryEventTourEventLibraryPostPayload =
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
	  } & TransferEvent);

export enum CopyLibraryEventTourEventLibraryCopyPostDetailEnum {
	LibraryEventNotFound = "Library event not found",
	NotFound = "Not found",
	TourOptionNotFoundForThisTour = "Tour option not found for this tour",
	EventOptionNotFound = "Event option not found"
}

export interface CopyLibraryEventTourEventLibraryCopyPostParams {
	/** @default "en" */
	read_lang?: LanguageCode;
}

export interface DeleteLibraryEventTourEventLibraryLibraryIdDeleteParams {
	/**
	 * Library Id
	 * @format uuid
	 */
	libraryId: string;
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
	  } & TransferEvent);

export interface UpdateLibraryEventTourEventLibraryLibraryIdPatchParams {
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

export interface DeleteTourTourTourIdDeleteParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
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

export interface ArchiveTourTourTourIdArchivePostParams {
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

export interface UploadTourCoverTourTourIdCoverPostParams {
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

export interface GetTourFinancialsTourTourIdFinanceGetParams {
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

export interface CreateTourFinancialsTourTourIdFinancePostParams {
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

export interface UploadLandingImagesTourTourIdLandingImagesPostParams {
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

export interface GetPriceMatrixTourTourIdOptionOptionIdPriceMatrixGetParams {
	/** @default "USD" */
	currency?: Currency;
	/**
	 * Pax From
	 * First headcount; the tour's group_size_min or 1.
	 */
	pax_from?: number | null;
	/**
	 * Pax To
	 * Last headcount; the tour's group_size.
	 */
	pax_to?: number | null;
	/**
	 * Brackets
	 * Comma-separated from-to pairs, e.g. 1-1,2-3,4-6. Given, the matrix is cut per bracket and pax_from/pax_to are ignored.
	 */
	brackets?: string | null;
	/**
	 * Date
	 * Tour day 1; pins date-ranged supplier rates.
	 */
	date?: string | null;
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

export interface GetPricingBreakdownTourTourIdOptionOptionIdPricingBreakdownGetParams {
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
	 * Pax
	 * Price both legs at this one headcount instead of the tour's group-size range — what a price-matrix row books.
	 */
	pax?: number | null;
	/**
	 * Date
	 * Tour day 1; pins date-ranged supplier rates.
	 */
	date?: string | null;
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

export interface GetTourTourTourIdPublicGetParams {
	/** @default "en" */
	read_lang?: LanguageCode;
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
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

export interface PublishTourTourTourIdPublishPostParams {
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

export interface BulkRemoveFixedDatesTourTourIdScheduleDateBulkDeleteParams {
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

export interface BulkRemoveExcludedDatesTourTourIdScheduleExcludeBulkDeleteParams {
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

export interface GetTourStatisticsTourTourIdStatisticsGetParams {
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

export interface ValidateTourTourTourIdValidateGetParams {
	/**
	 * Tour Id
	 * @format uuid
	 */
	tourId: string;
}

export enum CopyEventTourTourIdOptionIdEventCopyPostDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum CopyEventTourTourIdOptionIdEventCopyPostDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum CopyEventTourTourIdOptionIdEventCopyPostDetailEnum2 {
	LibraryEventNotFound = "Library event not found"
}

export enum CopyEventTourTourIdOptionIdEventCopyPostDetailEnum3 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export enum CopyEventTourTourIdOptionIdEventCopyPostDetailEnum4 {
	EveryGuideEventMustPriceEveryTourLanguageAddTheMissingGuidePricesOrNarrowTheToursLanguages = "Every guide event must price every tour language; add the missing guide prices or narrow the tour's languages"
}

export interface CopyEventTourTourIdOptionIdEventCopyPostParams {
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
	ScopeNamesRoomsOutsideTheHotelCategoriesItPins = "Scope names rooms outside the hotel categories it pins",
	ScopeNamesCarCategoriesTheSupplierProductDoesNotDeclare = "Scope names car categories the supplier product does not declare",
	OnlyAHotelNarrowsToRoomsAndOnlyAFleetPricedByCategoryNarrowsToCarCategories = "Only a hotel narrows to rooms and only a fleet priced by category narrows to car categories",
	EveryGuideEventMustPriceEveryTourLanguageAddTheMissingGuidePricesOrNarrowTheToursLanguages = "Every guide event must price every tour language; add the missing guide prices or narrow the tour's languages"
}

/** Event */
export type CreateEventTourTourIdOptionIdEventCreatePostPayload =
	| (
			| ({
					typ: "activity";
			  } & ActivitySingleEvent)
			| ({
					typ: "bus";
			  } & BusSingleEvent)
			| ({
					typ: "flight";
			  } & FlightSingleEvent)
			| ({
					typ: "guide";
			  } & GuideSingleEvent)
			| ({
					typ: "housing";
			  } & HousingSingleEvent)
			| ({
					typ: "ref";
			  } & InformationSingleEvent)
			| ({
					typ: "supplementary";
			  } & SupplementarySingleEvent)
			| ({
					typ: "train";
			  } & TrainSingleEvent)
			| ({
					typ: "transfer";
			  } & TransferSingleEvent)
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
	ScopeNamesRoomsOutsideTheHotelCategoriesItPins = "Scope names rooms outside the hotel categories it pins",
	ScopeNamesCarCategoriesTheSupplierProductDoesNotDeclare = "Scope names car categories the supplier product does not declare",
	OnlyAHotelNarrowsToRoomsAndOnlyAFleetPricedByCategoryNarrowsToCarCategories = "Only a hotel narrows to rooms and only a fleet priced by category narrows to car categories",
	EveryGuideEventMustPriceEveryTourLanguageAddTheMissingGuidePricesOrNarrowTheToursLanguages = "Every guide event must price every tour language; add the missing guide prices or narrow the tour's languages"
}

/** Option */
export type AddOptionTourTourIdOptionIdEventEventIdOptionPostPayload =
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
	  } & TransferEvent);

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

export enum UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchDetailEnum {
	OptionTypeMustMatchTheEventsOtherOptions = "Option type must match the event's other options"
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
	PackageNotFound = "Package not found"
}

export enum UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchDetailEnum4 {
	OptionTypeChangesThroughRetype = "Option type changes through retype"
}

/** Option */
export type UpdateOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdPatchPayload =

		| ({
				typ: "activity";
		  } & ActivityEventUpdate)
		| ({
				typ: "bus";
		  } & BusEventUpdate)
		| ({
				typ: "flight";
		  } & FlightEventUpdate)
		| ({
				typ: "guide";
		  } & GuideEventUpdate)
		| ({
				typ: "housing";
		  } & HousingEventUpdate)
		| ({
				typ: "ref";
		  } & InformationEventUpdate)
		| ({
				typ: "supplementary";
		  } & SupplementaryEventUpdate)
		| ({
				typ: "train";
		  } & TrainEventUpdate)
		| ({
				typ: "transfer";
		  } & TransferEventUpdate);

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

export enum AddPoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolPostDetailEnum {
	OptionTypeMustMatchTheEventsOtherOptions = "Option type must match the event's other options",
	SupplierProductTypeCannotServeThisEventType = "Supplier product type cannot serve this event type"
}

export enum AddPoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum AddPoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum AddPoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolPostDetailEnum3 {
	EventOptionNotFound = "Event option not found",
	SupplierNotFound = "Supplier not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum AddPoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolPostDetailEnum4 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export enum AddPoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolPostDetailEnum5 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have",
	ScopeNamesRoomsOutsideTheHotelCategoriesItPins = "Scope names rooms outside the hotel categories it pins",
	ScopeNamesCarCategoriesTheSupplierProductDoesNotDeclare = "Scope names car categories the supplier product does not declare",
	OnlyAHotelNarrowsToRoomsAndOnlyAFleetPricedByCategoryNarrowsToCarCategories = "Only a hotel narrows to rooms and only a fleet priced by category narrows to car categories"
}

/** Member */
export type AddPoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolPostPayload =

		| ({
				typ: "activity";
		  } & ActivityMemberNew)
		| ({
				typ: "bus";
		  } & BusMemberNew)
		| ({
				typ: "flight";
		  } & FlightMemberNew)
		| ({
				typ: "guide";
		  } & GuideMemberNew)
		| ({
				typ: "housing";
		  } & HousingMemberNew)
		| ({
				typ: "ref";
		  } & InformationMemberNew)
		| ({
				typ: "supplementary";
		  } & SupplementaryMemberNew)
		| ({
				typ: "train";
		  } & TrainMemberNew)
		| ({
				typ: "transfer";
		  } & TransferMemberNew);

export interface AddPoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolPostParams {
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

export enum RemovePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDeleteDetailEnum {
	CannotRemoveTheLastSupplierOfAnOptionsPool = "Cannot remove the last supplier of an option's pool"
}

export enum RemovePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDeleteDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum RemovePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDeleteDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum RemovePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDeleteDetailEnum3 {
	EventOptionNotFound = "Event option not found",
	PoolMemberNotFound = "Pool member not found"
}

export enum RemovePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDeleteDetailEnum4 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface RemovePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDeleteParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export enum UpdatePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdPatchDetailEnum {
	OptionTypeMustMatchTheEventsOtherOptions = "Option type must match the event's other options"
}

export enum UpdatePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdPatchDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum UpdatePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdPatchDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum UpdatePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdPatchDetailEnum3 {
	EventOptionNotFound = "Event option not found",
	PoolMemberNotFound = "Pool member not found",
	SupplierNotFound = "Supplier not found"
}

export enum UpdatePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdPatchDetailEnum4 {
	PoolMemberReadsASupplierProductDetachItToStateItsOwnSpec = "Pool member reads a supplier product; detach it to state its own spec"
}

export enum UpdatePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdPatchDetailEnum5 {
	EveryGuideEventMustPriceEveryTourLanguageAddTheMissingGuidePricesOrNarrowTheToursLanguages = "Every guide event must price every tour language; add the missing guide prices or narrow the tour's languages"
}

/** Member */
export type UpdatePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdPatchPayload =

		| ({
				typ: "activity";
		  } & ActivityMemberUpdate)
		| ({
				typ: "bus";
		  } & BusMemberUpdate)
		| ({
				typ: "flight";
		  } & FlightMemberUpdate)
		| ({
				typ: "guide";
		  } & GuideMemberUpdate)
		| ({
				typ: "housing";
		  } & HousingMemberUpdate)
		| ({
				typ: "ref";
		  } & InformationMemberUpdate)
		| ({
				typ: "supplementary";
		  } & SupplementaryMemberUpdate)
		| ({
				typ: "train";
		  } & TrainMemberUpdate)
		| ({
				typ: "transfer";
		  } & TransferMemberUpdate);

export interface UpdatePoolMemberTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdPatchParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export enum AttachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdAttachPostDetailEnum {
	SupplierProductTypeCannotServeThisEventType = "Supplier product type cannot serve this event type"
}

export enum AttachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdAttachPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum AttachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdAttachPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum AttachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdAttachPostDetailEnum3 {
	EventOptionNotFound = "Event option not found",
	PoolMemberNotFound = "Pool member not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum AttachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdAttachPostDetailEnum4 {
	EventAlreadyReadsFromASupplierProductRelinkItInstead = "Event already reads from a supplier product; relink it instead"
}

export enum AttachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdAttachPostDetailEnum5 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have",
	ScopeNamesRoomsOutsideTheHotelCategoriesItPins = "Scope names rooms outside the hotel categories it pins",
	ScopeNamesCarCategoriesTheSupplierProductDoesNotDeclare = "Scope names car categories the supplier product does not declare",
	OnlyAHotelNarrowsToRoomsAndOnlyAFleetPricedByCategoryNarrowsToCarCategories = "Only a hotel narrows to rooms and only a fleet priced by category narrows to car categories"
}

export interface AttachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdAttachPostParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export enum DetachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDetachPostDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum DetachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDetachPostDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum DetachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDetachPostDetailEnum2 {
	EventOptionNotFound = "Event option not found",
	PoolMemberNotFound = "Pool member not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum DetachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDetachPostDetailEnum3 {
	EventReadsFromNoSupplierProduct = "Event reads from no supplier product",
	EventCarriesANegotiatedOverrideSayToDropItToMoveTheLink = "Event carries a negotiated override; say to drop it to move the link"
}

export interface DetachPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdDetachPostParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export enum SetPoolMemberMainTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdMainPostDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum SetPoolMemberMainTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdMainPostDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum SetPoolMemberMainTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdMainPostDetailEnum2 {
	EventOptionNotFound = "Event option not found",
	PoolMemberNotFound = "Pool member not found"
}

export enum SetPoolMemberMainTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdMainPostDetailEnum3 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export interface SetPoolMemberMainTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdMainPostParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export enum ClearPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverrideDeleteDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum ClearPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverrideDeleteDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum ClearPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverrideDeleteDetailEnum2 {
	EventOptionNotFound = "Event option not found",
	PoolMemberNotFound = "Pool member not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum ClearPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverrideDeleteDetailEnum3 {
	EventReadsFromNoSupplierProduct = "Event reads from no supplier product"
}

export interface ClearPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverrideDeleteParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export enum SetPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverridePatchDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum SetPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverridePatchDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum SetPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverridePatchDetailEnum2 {
	EventOptionNotFound = "Event option not found",
	PoolMemberNotFound = "Pool member not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum SetPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverridePatchDetailEnum3 {
	EventReadsFromNoSupplierProduct = "Event reads from no supplier product",
	OverrideTypeMustMatchTheEventsType = "Override type must match the event's type",
	OverridePricesByAnArmTheSupplierProductDoesNotPriceBy = "Override prices by an arm the supplier product does not price by"
}

export enum SetPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverridePatchDetailEnum4 {
	OverridePricesAUnitTheEventsScopeDoesNotTake = "Override prices a unit the event's scope does not take"
}

/** Override */
export type SetPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverridePatchPayload =

		| ({
				typ: "activity";
		  } & ActivityOverrideInput)
		| ({
				typ: "bus";
		  } & BusOverrideInput)
		| ({
				typ: "flight";
		  } & RouteOverrideInput)
		| ({
				typ: "housing";
		  } & HotelOverrideInput)
		| ({
				typ: "train";
		  } & RouteOverrideInput)
		| ({
				typ: "transfer";
		  } & TransferOverrideInput);

export interface SetPoolMemberOverrideTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdOverridePatchParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export enum RelinkPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdRelinkPostDetailEnum {
	SupplierProductTypeCannotServeThisEventType = "Supplier product type cannot serve this event type"
}

export enum RelinkPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdRelinkPostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum RelinkPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdRelinkPostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum RelinkPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdRelinkPostDetailEnum3 {
	EventOptionNotFound = "Event option not found",
	PoolMemberNotFound = "Pool member not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum RelinkPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdRelinkPostDetailEnum4 {
	EventReadsFromNoSupplierProduct = "Event reads from no supplier product",
	EventCarriesANegotiatedOverrideSayToDropItToMoveTheLink = "Event carries a negotiated override; say to drop it to move the link"
}

export enum RelinkPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdRelinkPostDetailEnum5 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have",
	ScopeNamesRoomsOutsideTheHotelCategoriesItPins = "Scope names rooms outside the hotel categories it pins",
	ScopeNamesCarCategoriesTheSupplierProductDoesNotDeclare = "Scope names car categories the supplier product does not declare",
	OnlyAHotelNarrowsToRoomsAndOnlyAFleetPricedByCategoryNarrowsToCarCategories = "Only a hotel narrows to rooms and only a fleet priced by category narrows to car categories"
}

export interface RelinkPoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdRelinkPostParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export enum ScopePoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdScopePatchDetailEnum {
	AuthenticationRequired = "Authentication required."
}

export enum ScopePoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdScopePatchDetailEnum1 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum ScopePoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdScopePatchDetailEnum2 {
	EventOptionNotFound = "Event option not found",
	PoolMemberNotFound = "Pool member not found",
	SupplierProductNotFound = "Supplier product not found"
}

export enum ScopePoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdScopePatchDetailEnum3 {
	EventReadsFromNoSupplierProduct = "Event reads from no supplier product",
	ScopeWouldStrandANegotiatedOverrideOnUnitsItLeavesOut = "Scope would strand a negotiated override on units it leaves out"
}

export enum ScopePoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdScopePatchDetailEnum4 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have",
	ScopeNamesRoomsOutsideTheHotelCategoriesItPins = "Scope names rooms outside the hotel categories it pins",
	ScopeNamesCarCategoriesTheSupplierProductDoesNotDeclare = "Scope names car categories the supplier product does not declare",
	OnlyAHotelNarrowsToRoomsAndOnlyAFleetPricedByCategoryNarrowsToCarCategories = "Only a hotel narrows to rooms and only a fleet priced by category narrows to car categories"
}

export interface ScopePoolMemberProductTourTourIdOptionIdEventEventIdOptionEventOptionIdPoolSupplyIdScopePatchParams {
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
	/**
	 * Supply Id
	 * @format uuid
	 */
	supplyId: string;
}

export enum RetypeOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdRetypePostDetailEnum {
	OptionTypeMustMatchTheEventsOtherOptions = "Option type must match the event's other options",
	OptionAlreadyHasThisTypeUpdateItInPlace = "Option already has this type; update it in place",
	ANewOptionStatesWhereItsSupplyComesFrom = "A new option states where its supply comes from",
	SupplierProductTypeCannotServeThisEventType = "Supplier product type cannot serve this event type"
}

export enum RetypeOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdRetypePostDetailEnum1 {
	AuthenticationRequired = "Authentication required."
}

export enum RetypeOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdRetypePostDetailEnum2 {
	AuthorizationFailedUserHasNoAccess = "Authorization failed. User has no access.",
	AuthorizationFailedMissingRequiredPermission = "Authorization failed. Missing required permission."
}

export enum RetypeOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdRetypePostDetailEnum3 {
	EventOptionNotFound = "Event option not found",
	SupplierNotFound = "Supplier not found",
	SupplierProductNotFound = "Supplier product not found",
	PackageNotFound = "Package not found"
}

export enum RetypeOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdRetypePostDetailEnum4 {
	ArchivedToursAreImmutableNothingRelatedToTheTourCanChange = "Archived tours are immutable; nothing related to the tour can change"
}

export enum RetypeOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdRetypePostDetailEnum5 {
	ScopeNamesVariantsTheSupplierProductDoesNotHave = "Scope names variants the supplier product does not have",
	ScopeNamesRoomsOutsideTheHotelCategoriesItPins = "Scope names rooms outside the hotel categories it pins",
	ScopeNamesCarCategoriesTheSupplierProductDoesNotDeclare = "Scope names car categories the supplier product does not declare",
	OnlyAHotelNarrowsToRoomsAndOnlyAFleetPricedByCategoryNarrowsToCarCategories = "Only a hotel narrows to rooms and only a fleet priced by category narrows to car categories",
	EveryGuideEventMustPriceEveryTourLanguageAddTheMissingGuidePricesOrNarrowTheToursLanguages = "Every guide event must price every tour language; add the missing guide prices or narrow the tour's languages"
}

/** Option */
export type RetypeOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdRetypePostPayload =

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
		  } & TransferEvent);

export interface RetypeOptionTourTourIdOptionIdEventEventIdOptionEventOptionIdRetypePostParams {
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
