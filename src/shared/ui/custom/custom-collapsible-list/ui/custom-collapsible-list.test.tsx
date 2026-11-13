import { zodResolver } from "@hookform/resolvers/zod";
import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { type UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import { Accordion } from "@/shared/ui/shadcn-ui/accordion";

import { useCollapsibleList } from "../model";

import { CustomCollapsibleListItem } from "./custom-collapsible-list-item";
import { CustomCollapsibleListToolbar } from "./custom-collapsible-list-toolbar";

type TForm = { items: { name: string }[] };

const ITEMS: TForm = {
	items: [{ name: "Alpha" }, { name: "Beta" }, { name: "Gamma" }]
};

/** Real schema validation, as on the event pages (zod resolver). */
const SCHEMA = z.object({
	items: z.array(z.object({ name: z.string().min(1) }))
});

/** A form list wired like the event lists: remove/add go through the hook. */
const setup = () => {
	const ref: { form?: UseFormReturn<TForm> } = {};

	const Harness = () => {
		const form = useForm<TForm>({
			defaultValues: ITEMS,
			resolver: zodResolver(SCHEMA)
		});
		ref.form = form;
		const { fields, append, remove } = useFieldArray({
			control: form.control,
			name: "items"
		});
		const list = useCollapsibleList(fields.length);

		return (
			<>
				<CustomCollapsibleListToolbar
					onExpandAll={list.expandAll}
					onCollapseAll={list.collapseAll}
				/>
				<Accordion
					type="multiple"
					value={list.value}
					onValueChange={list.onValueChange}
				>
					{fields.map((field, index) => (
						<CustomCollapsibleListItem
							key={field.id}
							value={String(index)}
							control={form.control}
							name={`items.${index}`}
							title={field.name}
							actions={
								<button
									type="button"
									onClick={() => {
										remove(index);
										list.removeItem(index);
									}}
								>
									{`Remove ${field.name}`}
								</button>
							}
						>
							<input
								aria-label={`${field.name} name`}
								{...form.register(`items.${index}.name`)}
							/>
						</CustomCollapsibleListItem>
					))}
				</Accordion>
				<button
					type="button"
					onClick={() => {
						append({ name: "Delta" });
						list.openItem(fields.length);
					}}
				>
					Add
				</button>
			</>
		);
	};

	const user = userEvent.setup();
	render(<Harness />);

	return { user, form: () => ref.form! };
};

const header = (title: string) => screen.getByRole("button", { name: title });
const field = (title: string) =>
	screen.queryByRole("textbox", { name: `${title} name` });
const card = (title: string) =>
	header(title).closest("[data-slot='accordion-item']")!;
const openFields = () =>
	screen
		.queryAllByRole("textbox")
		.map((input) => input.getAttribute("aria-label"));

describe("CustomCollapsibleList accordion", () => {
	it("starts with every card collapsed", () => {
		setup();

		expect(header("Alpha")).toBeInTheDocument();
		expect(header("Beta")).toBeInTheDocument();
		expect(header("Gamma")).toBeInTheDocument();
		expect(openFields()).toEqual([]);
	});

	it("toggles one card from its header", async () => {
		const { user } = setup();

		await user.click(header("Beta"));
		expect(field("Beta")).toHaveValue("Beta");
		expect(openFields()).toEqual(["Beta name"]);

		await user.click(header("Beta"));
		expect(openFields()).toEqual([]);
	});

	it("expands and collapses all cards", async () => {
		const { user } = setup();

		await user.click(screen.getByRole("button", { name: "Expand all" }));
		expect(openFields()).toEqual(["Alpha name", "Beta name", "Gamma name"]);

		await user.click(screen.getByRole("button", { name: "Collapse all" }));
		expect(openFields()).toEqual([]);
	});

	it("opens an added card and leaves the others collapsed", async () => {
		const { user } = setup();

		await user.click(screen.getByRole("button", { name: "Add" }));

		expect(openFields()).toEqual(["Delta name"]);
		expect(field("Delta")).toHaveValue("Delta");
	});

	it("keeps typed values while a card is collapsed", async () => {
		const { user } = setup();
		await user.click(header("Alpha"));
		await user.type(field("Alpha")!, " Prime");

		await user.click(header("Alpha"));
		await user.click(header("Alpha"));

		expect(field("Alpha")).toHaveValue("Alpha Prime");
	});
});

describe("CustomCollapsibleList removal", () => {
	it("keeps a later open card open on its own item", async () => {
		const { user } = setup();
		await user.click(header("Gamma"));

		await user.click(screen.getByRole("button", { name: "Remove Alpha" }));

		expect(openFields()).toEqual(["Gamma name"]);
		expect(field("Gamma")).toHaveValue("Gamma");
	});

	it("keeps open cards on both sides of a removed one", async () => {
		const { user } = setup();
		await user.click(header("Alpha"));
		await user.click(header("Gamma"));

		await user.click(screen.getByRole("button", { name: "Remove Beta" }));

		expect(openFields()).toEqual(["Alpha name", "Gamma name"]);
		expect(field("Alpha")).toHaveValue("Alpha");
		expect(field("Gamma")).toHaveValue("Gamma");
	});

	it("opens no other card when the open one is removed", async () => {
		const { user } = setup();
		await user.click(header("Beta"));

		await user.click(screen.getByRole("button", { name: "Remove Beta" }));

		expect(openFields()).toEqual([]);
	});

	it("leaves earlier cards alone when the last one is removed", async () => {
		const { user } = setup();
		await user.click(header("Alpha"));

		await user.click(screen.getByRole("button", { name: "Remove Gamma" }));

		expect(openFields()).toEqual(["Alpha name"]);
	});
});

describe("CustomCollapsibleList form integration", () => {
	it("keeps open cards through a form reset (autosave)", async () => {
		const { user, form } = setup();
		await user.click(header("Beta"));

		// Autosave resets the form with the server values: field ids change.
		act(() => form().reset(ITEMS));

		expect(openFields()).toEqual(["Beta name"]);
	});

	it("highlights only the card with an error", async () => {
		const { form } = setup();

		act(() => form().setError("items.1.name", { message: "Required" }));
		expect(card("Beta")).toHaveAttribute("data-invalid");
		expect(card("Alpha")).not.toHaveAttribute("data-invalid");
		expect(card("Gamma")).not.toHaveAttribute("data-invalid");

		act(() => form().clearErrors());
		expect(card("Beta")).not.toHaveAttribute("data-invalid");
	});

	it("highlights a collapsed card when schema validation fails on its hidden field", async () => {
		const { form } = setup();

		// The field of a collapsed card is not mounted; its value stays in the form.
		act(() => form().setValue("items.2.name", ""));
		await act(async () => {
			await form().trigger();
		});

		expect(openFields()).toEqual([]);
		expect(card("Gamma")).toHaveAttribute("data-invalid");
		expect(card("Alpha")).not.toHaveAttribute("data-invalid");
		expect(card("Beta")).not.toHaveAttribute("data-invalid");
	});
});
