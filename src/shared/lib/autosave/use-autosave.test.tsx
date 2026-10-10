// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { IAutosavePart } from "./autosave.types";
import { useAutosave } from "./use-autosave";

type TForm = { name: string; price: number | null };

const SERVER: TForm = { name: "Transfer", price: 10 };

type TSaveMock = ReturnType<typeof vi.fn<(body: unknown) => Promise<void>>>;
type TSaves = { option: TSaveMock; member: TSaveMock };
type TParts = (saves: TSaves) => IAutosavePart<TForm, unknown>[];

const setup = (parts: TParts, options: { onError?: () => void } = {}) => {
	const saves: TSaves = {
		option: vi
			.fn<(body: unknown) => Promise<void>>()
			.mockResolvedValue(undefined),
		member: vi
			.fn<(body: unknown) => Promise<void>>()
			.mockResolvedValue(undefined)
	};
	const hook = renderHook(() => {
		const form = useForm<TForm>({
			defaultValues: { name: "", price: null }
		});
		const autosave = useAutosave(form, {
			parts: parts(saves),
			server: { data: SERVER, recordKey: "event-1" },
			onError: options.onError
		});
		return { form, autosave };
	});
	return { ...hook, saves };
};

const twoParts: TParts = (saves) => [
	{
		key: "option",
		build: (v: TForm) => ({ name: v.name }),
		save: (body) => saves.option(body)
	},
	{
		key: "member",
		build: (v: TForm) => ({ price: v.price }),
		save: (body) => saves.member(body),
		validate: ["price" as const]
	}
];

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
	cleanup();
	vi.useRealTimers();
});

const change = async (
	result: { current: { form: ReturnType<typeof useForm<TForm>> } },
	name: keyof TForm,
	value: TForm[keyof TForm]
) => {
	await act(async () => {
		result.current.form.setValue(name, value as never, {
			shouldDirty: true
		});
	});
};

const advance = async (ms: number) => {
	await act(async () => {
		await vi.advanceTimersByTimeAsync(ms);
	});
};

describe("useAutosave", () => {
	it("does not save the server load itself", async () => {
		const { saves } = setup(twoParts);
		await advance(5000);
		expect(saves.option).not.toHaveBeenCalled();
		expect(saves.member).not.toHaveBeenCalled();
	});

	it("saves a non-text change after 800 ms, only the changed part", async () => {
		const { result, saves } = setup(twoParts);
		await change(result, "price", 20);

		await advance(799);
		expect(saves.member).not.toHaveBeenCalled();
		await advance(1);

		expect(saves.member).toHaveBeenCalledWith({ price: 20 });
		expect(saves.option).not.toHaveBeenCalled();
		expect(result.current.autosave.status).toBe("saved");
	});

	it("waits 2.5 s for text, but a blur saves it right away", async () => {
		const { result, saves } = setup(twoParts);
		await change(result, "name", "Transfer VIP");

		await advance(1000);
		expect(saves.option).not.toHaveBeenCalled();

		await act(async () => result.current.autosave.handleBlur());
		expect(saves.option).toHaveBeenCalledWith({ name: "Transfer VIP" });
	});

	it("does not send an unchanged body again", async () => {
		const { result, saves } = setup(twoParts);
		await change(result, "price", 20);
		await advance(800);
		await change(result, "price", 20);
		await advance(800);
		expect(saves.member).toHaveBeenCalledTimes(1);
	});

	it("keeps saving texts when the price part is invalid", async () => {
		const { result, saves } = setup((s) => [
			twoParts(s)[0],
			{ ...twoParts(s)[1], validate: ["price"] }
		]);
		await act(async () => {
			result.current.form.register("price", { required: true });
		});
		await change(result, "price", null);
		await change(result, "name", "Renamed");
		await act(async () => result.current.autosave.handleBlur());

		expect(saves.option).toHaveBeenCalledWith({ name: "Renamed" });
		expect(saves.member).not.toHaveBeenCalled();
		expect(result.current.autosave.statusByPart.member).toBe("invalid");
	});

	it("reports an error and retries the body on the next change", async () => {
		const onError = vi.fn();
		const { result, saves } = setup(twoParts, { onError });
		saves.member.mockRejectedValueOnce(new Error("500"));

		await change(result, "price", 20);
		await advance(800);
		expect(onError).toHaveBeenCalledTimes(1);
		expect(result.current.autosave.status).toBe("error");

		await change(result, "price", 20);
		await advance(800);
		expect(saves.member).toHaveBeenCalledTimes(2);
	});

	it("saves pending changes on unmount", async () => {
		const { result, saves, unmount } = setup(twoParts);
		await change(result, "price", 30);
		await act(async () => unmount());
		expect(saves.member).toHaveBeenCalledWith({ price: 30 });
	});
});
