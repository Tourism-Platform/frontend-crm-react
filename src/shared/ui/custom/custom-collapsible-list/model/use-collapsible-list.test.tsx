import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useCollapsibleList } from "./use-collapsible-list";

const setup = (count = 3, resetKey: unknown = "supplier-a") =>
	renderHook(
		(props: { count: number; resetKey: unknown }) =>
			useCollapsibleList(props.count, props.resetKey),
		{ initialProps: { count, resetKey } }
	);

describe("useCollapsibleList", () => {
	it("starts with everything collapsed", () => {
		const { result } = setup();

		expect(result.current.value).toEqual([]);
	});

	it("expands and collapses all items", () => {
		const { result } = setup(3);

		act(() => result.current.expandAll());
		expect(result.current.value).toEqual(["0", "1", "2"]);

		act(() => result.current.collapseAll());
		expect(result.current.value).toEqual([]);
	});

	it("opens one item without duplicates", () => {
		const { result } = setup(3);

		act(() => result.current.openItem(2));
		act(() => result.current.openItem(2));

		expect(result.current.value).toEqual(["2"]);
	});

	it("follows the accordion value", () => {
		const { result } = setup(3);

		act(() => result.current.onValueChange(["1", "2"]));

		expect(result.current.value).toEqual(["1", "2"]);
	});

	it("keeps open items on their own items after a removal", () => {
		const { result, rerender } = setup(3);
		act(() => result.current.onValueChange(["0", "2"]));

		act(() => result.current.removeItem(1));
		rerender({ count: 2, resetKey: "supplier-a" });

		expect(result.current.value).toEqual(["0", "1"]);
	});

	it("forgets indexes a shorter list no longer has", () => {
		const { result, rerender } = setup(3);
		act(() => result.current.expandAll());

		rerender({ count: 1, resetKey: "supplier-a" });
		expect(result.current.value).toEqual(["0"]);

		// The list grows back from the server: old items do not reopen.
		rerender({ count: 3, resetKey: "supplier-a" });
		expect(result.current.value).toEqual(["0"]);
	});

	it("collapses everything when the edited record changes", () => {
		const { result, rerender } = setup(3, "supplier-a");
		act(() => result.current.expandAll());

		rerender({ count: 3, resetKey: "supplier-a" });
		expect(result.current.value).toEqual(["0", "1", "2"]);

		rerender({ count: 3, resetKey: "supplier-b" });
		expect(result.current.value).toEqual([]);
	});

	it("resets to the given open items", () => {
		const { result } = setup(3);
		act(() => result.current.expandAll());

		act(() => result.current.reset([0]));

		expect(result.current.value).toEqual(["0"]);
	});

	it("keeps callbacks stable between renders", () => {
		const { result, rerender } = setup(3);
		const first = result.current;

		act(() => result.current.openItem(1));
		rerender({ count: 3, resetKey: "supplier-a" });

		expect(result.current.onValueChange).toBe(first.onValueChange);
		expect(result.current.collapseAll).toBe(first.collapseAll);
		expect(result.current.openItem).toBe(first.openItem);
		expect(result.current.removeItem).toBe(first.removeItem);
		expect(result.current.reset).toBe(first.reset);
	});
});
