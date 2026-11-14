import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ThemeToggleCircular } from "./theme-toggle-circular";

const root = document.documentElement;

function renderToggle(onToggle: () => void) {
	render(
		<ThemeToggleCircular onToggle={onToggle}>
			<button type="button">Toggle theme</button>
		</ThemeToggleCircular>
	);
	return screen.getByRole("button", { name: "Toggle theme" });
}

afterEach(() => {
	Reflect.deleteProperty(document, "startViewTransition");
	root.removeAttribute("data-theme-transition");
	root.removeAttribute("style");
});

describe("ThemeToggleCircular", () => {
	it("toggles immediately without View Transitions", () => {
		const onToggle = vi.fn();

		fireEvent.click(renderToggle(onToggle));

		expect(onToggle).toHaveBeenCalledTimes(1);
		expect(root).not.toHaveAttribute("data-theme-transition");
	});

	it("runs the circle transition from the click point", async () => {
		let finish!: () => void;
		const finished = new Promise<void>((resolve) => {
			finish = resolve;
		});
		const startViewTransition = vi.fn((update: () => void) => {
			update();
			return { finished } as ViewTransition;
		});
		Object.defineProperty(document, "startViewTransition", {
			configurable: true,
			value: startViewTransition
		});
		const onToggle = vi.fn();
		const button = renderToggle(onToggle);

		fireEvent.click(button, { clientX: 40, clientY: 12 });

		expect(onToggle).toHaveBeenCalledTimes(1);
		expect(root.style.getPropertyValue("--x")).toBe("40px");
		expect(root.style.getPropertyValue("--y")).toBe("12px");
		expect(root).toHaveAttribute("data-theme-transition", "to-dark");

		// Повторный клик во время перехода игнорируется
		fireEvent.click(button);
		expect(startViewTransition).toHaveBeenCalledTimes(1);

		await act(async () => {
			finish();
			await finished;
		});

		expect(root).not.toHaveAttribute("data-theme-transition");
	});
});
