// @vitest-environment jsdom
import { DndContext } from "@dnd-kit/core";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { IOptionData } from "../../model";

import { BoardColumns } from "./board-columns";
import { DayColumn } from "./day-column";

vi.mock("react-i18next", async (importOriginal) => ({
	...(await importOriginal<typeof import("react-i18next")>()),
	useTranslation: () => ({
		t: (key: string, opts?: { day?: number }) =>
			opts?.day ? `Day ${opts.day}` : key
	})
}));

vi.mock("../droppable-day-container", () => ({
	DroppableDayContainer: ({ day }: { day: number }) => (
		<div data-testid={`day-container-${day}`} />
	)
}));

afterEach(cleanup);

const data: IOptionData = {
	tripDetails: [],
	days: { 1: [], 2: [], 3: [] },
	dayOrder: [1, 2, 3]
};

const renderBoard = () =>
	render(
		<DndContext>
			<BoardColumns data={data} optionId="opt" onRemoveItem={vi.fn()} />
		</DndContext>
	);

const hasClasses = (el: Element, classes: string[]) =>
	classes.every((c) => el.classList.contains(c));

describe("BoardColumns layout", () => {
	it("uses a horizontal scroller that can shrink next to the sidebar", () => {
		renderBoard();
		const row = screen.getByText("Day 1").parentElement!.parentElement!;
		const scroller = row.parentElement!;

		// min-w-0 keeps the min-w-max row from pushing the sidebar out
		expect(
			hasClasses(scroller, [
				"min-w-0",
				"flex-1",
				"overflow-x-auto",
				"overflow-y-hidden"
			])
		).toBe(true);
		expect(hasClasses(row, ["flex", "h-full", "min-w-max"])).toBe(true);
	});

	it("stretches every day column to the full board height", () => {
		renderBoard();

		for (const day of [1, 2, 3]) {
			const title = screen.getByText(`Day ${day}`);
			const wrapper = title.parentElement!;
			const sortable = title.nextElementSibling!;

			expect(title.classList.contains("shrink-0")).toBe(true);
			expect(
				hasClasses(wrapper, ["flex", "h-full", "min-h-0", "flex-col"])
			).toBe(true);
			expect(
				hasClasses(sortable, ["flex", "min-h-0", "flex-1", "flex-col"])
			).toBe(true);
			expect(
				screen
					.getByTestId(`day-container-${day}`)
					.parentElement!.classList.contains("flex-1")
			).toBe(true);
		}
	});

	it("does not hardcode viewport-based heights on day columns", () => {
		const { container } = renderBoard();

		expect(container.innerHTML).not.toMatch(/100dvh/);
	});
});

describe("DayColumn", () => {
	it("fills the parent when on the board", () => {
		render(
			<DayColumn
				day={1}
				items={[]}
				optionId="opt"
				onRemoveItem={vi.fn()}
			/>
		);
		const column = screen.getByTestId("day-container-1").parentElement!;

		expect(hasClasses(column, ["min-h-0", "flex-1"])).toBe(true);
	});

	it("keeps content height in the drag overlay", () => {
		render(
			<DayColumn
				day={1}
				items={[]}
				isOverlay
				optionId="opt"
				onRemoveItem={vi.fn()}
			/>
		);
		const column = screen.getByTestId("day-container-1").parentElement!;

		expect(column.classList.contains("flex-1")).toBe(false);
	});
});
