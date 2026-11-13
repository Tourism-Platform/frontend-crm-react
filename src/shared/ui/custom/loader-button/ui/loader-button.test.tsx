import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LoaderButton } from "./loader-button";

const Icon = () => <svg data-testid="icon" />;

describe("LoaderButton", () => {
	it("renders label and icon when idle", () => {
		render(<LoaderButton label="Save" icon={<Icon />} />);

		const button = screen.getByRole("button", { name: "Save" });
		expect(button).toBeEnabled();
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("falls back to label while loading without loadingLabel", () => {
		render(<LoaderButton label="Save" icon={<Icon />} isLoading />);

		expect(screen.getByRole("button")).toHaveTextContent("Save");
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("replaces icon with spinner while loading", () => {
		render(
			<LoaderButton
				label="Save"
				loadingLabel="Saving"
				icon={<Icon />}
				isLoading
			/>
		);

		expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
		expect(screen.getAllByRole("status").length).toBeGreaterThan(0);
		expect(screen.getByRole("button")).toHaveTextContent("Saving");
	});

	it("renders icon-only button without label", () => {
		render(<LoaderButton aria-label="Delete" icon={<Icon />} />);

		const button = screen.getByRole("button", { name: "Delete" });
		expect(button).toHaveTextContent("");
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("keeps explicit disabled over loading state", () => {
		render(<LoaderButton label="Save" disabled />);

		expect(screen.getByRole("button")).toBeDisabled();
	});
});
