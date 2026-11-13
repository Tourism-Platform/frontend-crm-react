import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { type UseFormReturn, useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";

import { Form } from "@/shared/ui";

import {
	ENUM_FORM_SUPPLEMENT_ITEMS,
	ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD,
	ENUM_SUPPLEMENT_PRICING_FIELD,
	type TSupplementEditSchema
} from "@/entities/tour";

// Not the model barrel: its tabs config imports this ui back (cycle).
import { ENUM_FORM_SECTION } from "../../model/types/form-section.types";

import { ItemsDetails } from "./items-details";

const NAMES = ["Breakfast", "Dinner", "Spa"];

const DEFAULT_VALUES = {
	[ENUM_FORM_SECTION.ITEMS]: {
		[ENUM_FORM_SUPPLEMENT_ITEMS.ITEMS_LIST]: NAMES.map((name) => ({
			[ENUM_FORM_SUPPLEMENT_ITEMS.NAME]: name
		}))
	},
	[ENUM_FORM_SECTION.PRICING]: {
		[ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES]: {
			[ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS]: NAMES.map(
				(name) => ({ row: name })
			)
		}
	}
} as unknown as TSupplementEditSchema;

const PRICE_ROWS_PATH =
	`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.EXPENSES}.${ENUM_SUPPLEMENT_PER_ITEM_EXPENSES_FIELD.ITEMS}` as never;

const setup = () => {
	const ref: { form?: UseFormReturn<TSupplementEditSchema> } = {};

	const Harness = () => {
		const form = useForm<TSupplementEditSchema>({
			defaultValues: DEFAULT_VALUES
		});
		ref.form = form;
		return (
			<Form {...form}>
				<ItemsDetails form={form} />
			</Form>
		);
	};

	const user = userEvent.setup();
	render(<Harness />);
	return { user, form: () => ref.form! };
};

const header = (name: string) =>
	screen.getByRole("button", { name: new RegExp(name) });
const card = (name: string) =>
	header(name).closest<HTMLElement>("[data-slot='accordion-item']")!;
/** The card's ⋯ menu trigger (Radix marks it with aria-haspopup). */
const menuTrigger = (name: string) =>
	card(name).querySelector<HTMLElement>("[aria-haspopup='menu']")!;
const openNames = () =>
	screen
		.queryAllByRole("textbox")
		.map((input) => (input as HTMLInputElement).value);

describe("Supplement ItemsDetails collapsible cards", () => {
	it("shows collapsed cards titled by number and item name", () => {
		setup();

		expect(header("Item 1")).toHaveTextContent("Breakfast");
		expect(header("Item 3")).toHaveTextContent("Spa");
		expect(openNames()).toEqual([]);
	});

	it("keeps a later open card and its price row aligned after a removal", async () => {
		const { user, form } = setup();
		await user.click(header("Spa"));

		await user.click(menuTrigger("Breakfast"));
		await user.click(screen.getByRole("menuitem", { name: "Remove" }));

		expect(openNames()).toEqual(["Spa"]);
		expect(header("Item 2")).toHaveTextContent("Spa");
		expect(form().getValues(PRICE_ROWS_PATH)).toEqual([
			{ row: "Dinner" },
			{ row: "Spa" }
		]);
	});
});
