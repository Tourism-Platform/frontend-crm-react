// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { CustomScroll } from "./custom-scroll";

afterEach(cleanup);

const renderScroll = (props: Parameters<typeof CustomScroll>[0] = {}) => {
	render(
		<CustomScroll data-testid="scroll" {...props}>
			<span>content</span>
		</CustomScroll>
	);
	return screen.getByTestId("scroll");
};

describe("CustomScroll", () => {
	it("scrolls vertically by default and contains overscroll only on Y", () => {
		const el = renderScroll();

		expect(el.classList.contains("overflow-y-auto")).toBe(true);
		expect(el.classList.contains("overscroll-y-contain")).toBe(true);
		expect(el.classList.contains("overflow-x-auto")).toBe(false);
	});

	it("scrolls horizontally and contains overscroll only on X", () => {
		const el = renderScroll({ orientation: "horizontal" });

		expect(el.classList.contains("overflow-x-auto")).toBe(true);
		expect(el.classList.contains("overscroll-x-contain")).toBe(true);
		expect(el.classList.contains("overflow-y-auto")).toBe(false);
	});

	it.each(["vertical", "horizontal"] as const)(
		"never blocks scroll chaining on both axes (%s)",
		(orientation) => {
			// overscroll-contain on both axes swallows Shift+wheel / trackpad
			// swipes inside nested scrollers and breaks the parent's scroll
			const el = renderScroll({ orientation });

			expect(el.classList.contains("overscroll-contain")).toBe(false);
		}
	);

	it("merges custom className and renders children", () => {
		const el = renderScroll({ className: "h-full px-3" });

		expect(el.classList.contains("h-full")).toBe(true);
		expect(el.classList.contains("px-3")).toBe(true);
		expect(el.textContent).toBe("content");
	});
});
