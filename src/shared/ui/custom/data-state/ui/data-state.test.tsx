// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DataState } from "./data-state";

afterEach(cleanup);

const renderItems = (
	props: Partial<Parameters<typeof DataState<string[]>>[0]> = {}
) =>
	render(
		<DataState<string[]>
			data={["a", "b"]}
			isLoading={false}
			error={{ description: "load failed" }}
			empty={{ title: "nothing here" }}
			{...props}
		>
			{(items) => (
				<ul>
					{items.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			)}
		</DataState>
	);

describe("DataState", () => {
	it("renders children with the data", () => {
		renderItems();

		expect(screen.getAllByRole("listitem")).toHaveLength(2);
	});

	it("shows loading before error while data is not there yet", () => {
		const children = vi.fn();
		render(
			<DataState
				data={undefined}
				isLoading
				isError
				error={{ description: "load failed" }}
			>
				{children}
			</DataState>
		);

		expect(screen.getByRole("status")).toBeInTheDocument();
		expect(screen.queryByText("load failed")).not.toBeInTheDocument();
		expect(children).not.toHaveBeenCalled();
	});

	it("inline loading is a small spinner, page loading is LoadingState", () => {
		const { unmount } = renderItems({ isLoading: true });
		expect(
			screen.getByRole("status").parentElement?.className
		).not.toContain("min-h-[260px]");
		unmount();

		renderItems({ isLoading: true, variant: "page" });
		expect(
			screen.getByRole("status").classList.contains("min-h-[260px]")
		).toBe(true);
	});

	it("shows the error with retry", () => {
		const onRetry = vi.fn();
		renderItems({
			isError: true,
			error: { description: "load failed", onRetry }
		});

		expect(screen.getByText("load failed")).toBeInTheDocument();
		screen.getByRole("button").click();
		expect(onRetry).toHaveBeenCalledOnce();
	});

	it("treats null and an empty array as empty", () => {
		const { unmount } = renderItems({ data: null });
		expect(screen.getByText("nothing here")).toBeInTheDocument();
		unmount();

		renderItems({ data: [] });
		expect(screen.getByText("nothing here")).toBeInTheDocument();
	});

	it("uses a custom isEmpty", () => {
		renderItems({ data: [], isEmpty: () => false });

		expect(screen.queryByText("nothing here")).not.toBeInTheDocument();
		expect(screen.getByRole("list")).toBeInTheDocument();
	});
});
