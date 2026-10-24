import { describe, expect, it } from "vitest";

import {
	AUTH_PATHS,
	BOOKING_ORDER_OPERATOR_PATHS,
	BOOKING_ORDER_PATHS,
	BOOKING_REVISION_PATHS,
	FX_PATHS,
	MOCK_BASE_URL,
	OPERATOR_STAFF_PATHS,
	PROFILE_INFO_PATHS,
	SUPPLIER_PATHS,
	SUPPLIER_PRODUCT_PATHS,
	TOUR_CATALOG_PATHS,
	TOUR_EVENTS_PATHS,
	TOUR_OPTION_PATHS,
	TOUR_PATHS,
	TOUR_SCHEDULE_PATHS
} from "@/shared/api";

import {
	MOCK_TOUR_ID,
	MOCK_TOUR_OPTION_ID
} from "@/entities/booking/order/mock/booking-order.mock.constants";
import { ENUM_ORDER_TRANSITION_BACKEND } from "@/entities/booking/order/types/order-status.types";

import { setupMswServer } from "./setup-msw-server";

setupMswServer();

const call = async (
	endpoint: { url: string; method: string },
	body?: unknown,
	query = ""
) => {
	const response = await fetch(`${MOCK_BASE_URL}${endpoint.url}${query}`, {
		method: endpoint.method,
		headers:
			body === undefined
				? undefined
				: { "Content-Type": "application/json" },
		body: body === undefined ? undefined : JSON.stringify(body)
	});
	const text = await response.text();
	return { status: response.status, data: text ? JSON.parse(text) : null };
};

const signIn = (email = "damirk355@gmail.com") =>
	call(AUTH_PATHS.authUser, { email, password: "String1!" });

describe("MSW mocks", () => {
	it("auth: /auth/me requires a session and returns the signed-in account", async () => {
		expect((await call(AUTH_PATHS.getMyAccount)).status).toBe(401);
		expect(
			(
				await call(AUTH_PATHS.authUser, {
					email: "x@y.z",
					password: "no"
				})
			).status
		).toBe(401);

		await signIn();
		const me = await call(AUTH_PATHS.getMyAccount);
		expect(me.status).toBe(200);
		expect(me.data.role).toBe("operator_admin");

		const profile = await call(PROFILE_INFO_PATHS.getMyAccount);
		expect(profile.data.email).toBe("damirk355@gmail.com");

		await call(AUTH_PATHS.logoutUser);
		expect((await call(AUTH_PATHS.getMyAccount)).status).toBe(401);
	});

	it("tours: list paginates and filters, created tour is readable", async () => {
		const page = await call(
			TOUR_PATHS.listTours,
			undefined,
			"?skip=0&limit=5"
		);
		expect(page.data.data).toHaveLength(5);
		expect(page.data.total_count).toBeGreaterThan(5);

		const drafts = await call(
			TOUR_PATHS.listTours,
			undefined,
			"?status=draft&limit=100"
		);
		expect(
			drafts.data.data.every(
				(tour: { status: string }) => tour.status === "draft"
			)
		).toBe(true);

		const created = await call(TOUR_PATHS.createTour, {
			title: "Mock tour",
			days: 3
		});
		expect(created.status).toBe(201);
		const read = await call(TOUR_PATHS.getTour(created.data.id));
		expect(read.data.title).toBe("Mock tour");

		expect((await call(TOUR_PATHS.createTour, {})).status).toBe(422);
	});

	it("schedule: added fixed date shows up in occurrences", async () => {
		const added = await call(
			TOUR_SCHEDULE_PATHS.addFixedDate(MOCK_TOUR_ID),
			{
				value: "2030-05-20"
			}
		);
		expect(added.status).toBe(201);

		const schedule = await call(
			TOUR_SCHEDULE_PATHS.getTourSchedule(MOCK_TOUR_ID),
			undefined,
			"?from=2030-05-01&to=2030-05-31"
		);
		expect(schedule.data.occurrences).toContain("2030-05-20");
	});

	it("itinerary: options, events, multi-options and pool members", async () => {
		const options = await call(
			TOUR_OPTION_PATHS.listAllTourOptions(MOCK_TOUR_ID)
		);
		expect(
			options.data.map((option: { id: string }) => option.id)
		).toContain(MOCK_TOUR_OPTION_ID);

		const events = await call(
			TOUR_EVENTS_PATHS.listTourEvents(MOCK_TOUR_ID, MOCK_TOUR_OPTION_ID)
		);
		expect(events.data.length).toBeGreaterThan(3);

		const created = await call(
			TOUR_EVENTS_PATHS.createEvent(MOCK_TOUR_ID, MOCK_TOUR_OPTION_ID),
			{
				typ: "activity",
				day: 1,
				position: 1,
				name: "Museum",
				details: {}
			}
		);
		expect(created.status).toBe(201);
		const eventId = created.data.id;
		const optionId = created.data.event.id;

		const withOption = await call(
			TOUR_EVENTS_PATHS.addOption(
				MOCK_TOUR_ID,
				MOCK_TOUR_OPTION_ID,
				eventId
			),
			{ typ: "activity", name: "Theatre", details: {} }
		);
		expect(withOption.data.event.typ).toBe("options");
		expect(withOption.data.event.details).toHaveLength(2);

		const withMember = await call(
			TOUR_EVENTS_PATHS.addPoolMember(
				MOCK_TOUR_ID,
				MOCK_TOUR_OPTION_ID,
				eventId,
				optionId
			),
			{
				typ: "activity",
				supply: { source: "inline", spec: { sub_typ: "sightseeing" } }
			}
		);
		expect(withMember.data.event.details[0].details.pool).toHaveLength(1);
	});

	it("suppliers: product with variants is created and listed", async () => {
		const supplier = await call(SUPPLIER_PATHS.createSupplier, {
			brand_name: "Mock Supplier"
		});
		const product = await call(
			SUPPLIER_PRODUCT_PATHS.createProduct(supplier.data.id),
			{
				typ: "activity",
				details: {
					sub_typ: "sightseeing",
					name: "City walk",
					offerings: []
				}
			}
		);
		expect(product.status).toBe(201);

		const variant = await call(
			SUPPLIER_PRODUCT_PATHS.createVariant(
				supplier.data.id,
				product.data.id
			),
			{ name: "Adult", charge: { typ: "fixed", cost: { val: 10 } } }
		);
		expect(variant.data.product.spec.offerings).toHaveLength(1);

		const list = await call(
			SUPPLIER_PRODUCT_PATHS.listAllProducts,
			undefined,
			`?supplier_id=${supplier.data.id}`
		);
		expect(list.data.total_count).toBe(1);
	});

	it("booking: draft → new → pending, revision preview and itinerary", async () => {
		await signIn("damirk366@gmail.com");
		const created = await call(BOOKING_ORDER_PATHS.createBookingOrder, {
			tour_option_id: MOCK_TOUR_OPTION_ID,
			date: "2030-06-01",
			pax: 2
		});
		expect(created.data.status).toBe("draft");
		const bookingId = created.data.id;

		expect(
			(await call(BOOKING_ORDER_PATHS.submitBookingOrder(bookingId))).data
				.status
		).toBe("new");
		const pending = await call(
			BOOKING_ORDER_OPERATOR_PATHS.transitionBookingStatus(
				bookingId,
				ENUM_ORDER_TRANSITION_BACKEND.IN_PROCESSING
			)
		);
		expect(pending.data.status).toBe("pending");

		const preview = await call(BOOKING_REVISION_PATHS.preview(bookingId));
		expect(preview.data.snapshot.events.length).toBeGreaterThan(0);

		const itinerary = await call(
			BOOKING_ORDER_OPERATOR_PATHS.getOperatorBookingItinerary(bookingId)
		);
		expect(itinerary.data.events).toHaveLength(
			preview.data.snapshot.events.length
		);
	});

	it("staff, fx rates and catalog", async () => {
		const invited = await call(OPERATOR_STAFF_PATHS.inviteStaff, {
			email: "new@staff.dev",
			first_name: "New",
			last_name: "Staff"
		});
		expect(invited.status).toBe(201);
		expect(
			(await call(OPERATOR_STAFF_PATHS.inviteStaff, invited.data)).status
		).toBe(400);

		const rates = await call(FX_PATHS.listOperatorRates);
		expect(rates.data.length).toBeGreaterThan(0);

		const filters = await call(TOUR_CATALOG_PATHS.listFilters);
		expect(filters.data.cities.length).toBeGreaterThan(0);
	});
});
