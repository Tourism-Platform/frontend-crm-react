import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { ConfirmHost, Form } from "@/shared/ui";

import {
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_FORM_ROOMS,
	type TAccommodationEditSchema
} from "@/entities/tour";

// Not the model barrel: its tabs config imports this ui back (cycle).
import { ENUM_FORM_SECTION } from "../../model/types/form-section.types";

import { RoomsDetails } from "./rooms-details";

/** Tiptap does not run in jsdom: the room description is a plain stub. */
vi.mock("@/shared/ui/custom/custom-editor", async (importOriginal) => ({
	...(await importOriginal<
		typeof import("@/shared/ui/custom/custom-editor")
	>()),
	CustomEditor: () => <div data-testid="editor" />
}));

const setup = (names: string[]) => {
	const defaultValues = {
		[ENUM_FORM_SECTION.ROOMS]: {
			[ENUM_FORM_ROOMS.ROOMS_LIST]: names.map((name) => ({
				[ENUM_FORM_ROOMS.ROOM_NAME]: name,
				[ENUM_FORM_ROOMS.DESCRIPTION]: ""
			}))
		},
		[ENUM_FORM_SECTION.PRICING]: {
			[ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES]: {
				[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]: []
			}
		}
	} as unknown as TAccommodationEditSchema;

	const Harness = () => {
		const form = useForm<TAccommodationEditSchema>({ defaultValues });
		return (
			<Form {...form}>
				<RoomsDetails form={form} />
			</Form>
		);
	};

	const user = userEvent.setup();
	// ConfirmHost shows the "remove the last room" dialog.
	render(
		<>
			<Harness />
			<ConfirmHost />
		</>
	);
	return { user };
};

const header = (name: string) =>
	screen.getByRole("button", { name: new RegExp(name) });
const card = (name: string) =>
	header(name).closest<HTMLElement>("[data-slot='accordion-item']")!;
const menuTrigger = (name: string) =>
	card(name).querySelector<HTMLElement>("[aria-haspopup='menu']")!;
const openNames = () =>
	screen
		.queryAllByRole("textbox")
		.map((input) => (input as HTMLInputElement).value);

describe("Accommodation RoomsDetails collapsible cards", () => {
	it("keeps the last room open when its removal is cancelled", async () => {
		const { user } = setup(["Single"]);
		await user.click(header("Single"));

		await user.click(menuTrigger("Single"));
		await user.click(screen.getByRole("menuitem", { name: "Remove" }));
		await user.click(
			within(screen.getByRole("alertdialog")).getByRole("button", {
				name: "Cancel"
			})
		);

		expect(header("Single")).toBeInTheDocument();
		expect(openNames()).toEqual(["Single"]);
	});

	it("removes the last open room once confirmed", async () => {
		const { user } = setup(["Single"]);
		await user.click(header("Single"));

		await user.click(menuTrigger("Single"));
		await user.click(screen.getByRole("menuitem", { name: "Remove" }));
		await user.click(
			within(screen.getByRole("alertdialog")).getByRole("button", {
				name: "Remove"
			})
		);

		expect(
			screen.queryByRole("button", { name: /Single/ })
		).not.toBeInTheDocument();
	});

	it("keeps a later open room open after an earlier one is removed", async () => {
		const { user } = setup(["Single", "Double", "Suite"]);
		await user.click(header("Suite"));

		await user.click(menuTrigger("Single"));
		await user.click(screen.getByRole("menuitem", { name: "Remove" }));

		expect(openNames()).toEqual(["Suite"]);
		expect(card("Double")).toHaveAttribute("data-state", "closed");
	});
});
