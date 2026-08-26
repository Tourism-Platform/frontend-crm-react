import { describe, expect, it } from "vitest";

import { ENUM_PATH } from "@/shared/config";

import { resolveBreadcrumbTrail } from "./resolve";

describe("resolveBreadcrumbTrail", () => {
	it("resolves finance invoices list", () => {
		const result = resolveBreadcrumbTrail(ENUM_PATH.FINANCE.INVOICES);
		expect(result).not.toBeNull();
		expect(result!).toHaveLength(2);
		expect(result![1]).toMatchObject({
			labelKey: "operator.finance.general.menu.invoices",
			isCurrent: true
		});
	});

	it("resolves finance invoice detail with dynamic last crumb", () => {
		const pathname =
			"/finance/invoices/47eb0200-ec47-4e13-8548-9ec6647811f1";
		const result = resolveBreadcrumbTrail(pathname);
		expect(result).not.toBeNull();
		expect(result!).toHaveLength(3);
		expect(result![1]).toMatchObject({
			to: ENUM_PATH.FINANCE.INVOICES,
			isCurrent: false
		});
		expect(result![2]).toMatchObject({
			dynamicIndex: 0,
			isCurrent: true
		});
	});

	it("resolves reconciliation detail", () => {
		const result = resolveBreadcrumbTrail(
			"/finance/reconciliation/abc-booking-id"
		);
		expect(result).not.toBeNull();
		expect(result!).toHaveLength(3);
		expect(result![2].dynamicIndex).toBe(0);
	});

	it("resolves operator order detail", () => {
		const result = resolveBreadcrumbTrail(
			"/operator/booking/orders/order-uuid-1"
		);
		expect(result).not.toBeNull();
		expect(result![0]).toMatchObject({
			labelKey: "operator.booking.title",
			isCurrent: false
		});
		expect(result![2]).toMatchObject({
			dynamicIndex: 0,
			isCurrent: true
		});
	});

	it("resolves agency orders list", () => {
		const result = resolveBreadcrumbTrail(ENUM_PATH.AGENCY.BOOKING.ORDERS);
		expect(result).not.toBeNull();
		expect(result![0].labelKey).toBe("agency.booking.title");
	});

	it("resolves library event edit with libraryId from URL", () => {
		const libraryId = "evt-123-uuid";
		const result = resolveBreadcrumbTrail(
			`/library/events/${libraryId}/transfer`
		);
		expect(result).not.toBeNull();
		expect(result!).toHaveLength(3);
		expect(result![2]).toMatchObject({
			label: libraryId,
			dynamicIndex: undefined,
			isCurrent: true
		});
	});

	it("resolves library supplier detail", () => {
		const result = resolveBreadcrumbTrail("/library/suppliers/sup-uuid");
		expect(result).not.toBeNull();
		expect(result!).toHaveLength(3);
		expect(result![2].dynamicIndex).toBe(0);
	});

	it("resolves hotel product with two dynamic crumbs", () => {
		const result = resolveBreadcrumbTrail(
			"/library/suppliers/sup-1/products/hotel/prod-2"
		);
		expect(result).not.toBeNull();
		expect(result!).toHaveLength(4);
		expect(result![2]).toMatchObject({
			dynamicIndex: 0,
			to: "/library/suppliers/sup-1",
			isCurrent: false
		});
		expect(result![3]).toMatchObject({
			dynamicIndex: 1,
			isCurrent: true
		});
	});

	it("returns null for settings", () => {
		expect(resolveBreadcrumbTrail("/operator/settings/tags")).toBeNull();
		expect(
			resolveBreadcrumbTrail("/agency/settings/account-settings")
		).toBeNull();
	});

	it("returns null for unknown paths", () => {
		expect(resolveBreadcrumbTrail("/tours/catalog")).toBeNull();
		expect(resolveBreadcrumbTrail("/")).toBeNull();
	});
});
