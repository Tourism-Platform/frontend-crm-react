import { useCallback, useEffect, useRef, useState } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import type {
	IAutosavePart,
	IUseAutosaveOptions,
	IUseAutosaveResult,
	TAutosaveStatus
} from "./autosave.types";
import { isSameBody } from "./is-same-body";
import { type TSaveQueue, createSaveQueue } from "./save-queue";

const DEFAULT_DEBOUNCE_MS = 800;
const DEFAULT_TEXT_DEBOUNCE_MS = 2500;

const TEXT_FIELD_SEGMENTS = new Set([
	"name",
	"title",
	"description",
	"room_name",
	"note"
]);

/** Text by the last path segment (`cars.0.description` → `description`). */
export const isTextFieldByName = (name: string): boolean =>
	TEXT_FIELD_SEGMENTS.has(name.split(".").pop() ?? "");

const STATUS_PRIORITY: TAutosaveStatus[] = [
	"error",
	"invalid",
	"saving",
	"pending",
	"saved",
	"idle"
];

const mergeStatus = (
	statusByPart: Record<string, TAutosaveStatus>
): TAutosaveStatus => {
	const statuses = Object.values(statusByPart);
	return (
		STATUS_PRIORITY.find((status) => statuses.includes(status)) ?? "idle"
	);
};

/**
 * Debounced autosave of a react-hook-form form, split into parts (see
 * `IAutosavePart`). Knows nothing about the domain or the API:
 * - any change except its own server reset schedules a save; parts whose
 *   body did not change are not sent (de-duplication);
 * - texts wait for a blur or `textDebounceMs`, the rest `debounceMs`;
 * - each part validates and saves on its own — an invalid price does not
 *   block the texts;
 * - one request per part at a time, a burst collapses into one tail request;
 * - server values reset the form: fully when nothing is pending (fresh ids
 *   come in), keeping the user's input when they typed during the request;
 * - pending changes are saved on unmount, and the tab warns before closing.
 */
export const useAutosave = <T extends FieldValues>(
	form: UseFormReturn<T>,
	{
		parts,
		server,
		debounceMs = DEFAULT_DEBOUNCE_MS,
		textDebounceMs = DEFAULT_TEXT_DEBOUNCE_MS,
		isTextField = isTextFieldByName,
		onError,
		enabled = true
	}: IUseAutosaveOptions<T>
): IUseAutosaveResult => {
	const [statusByPart, setStatusByPart] = useState<
		Record<string, TAutosaveStatus>
	>({});

	// Latest config without re-subscribing on every render.
	const partsRef = useRef(parts);
	const onErrorRef = useRef(onError);
	const enabledRef = useRef(enabled);
	partsRef.current = parts;
	onErrorRef.current = onError;
	enabledRef.current = enabled;

	const lastSent = useRef(new Map<string, unknown>());
	const queues = useRef(new Map<string, TSaveQueue<unknown>>());
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const isPending = useRef(false);
	const hasPendingText = useRef(false);
	const isSyncing = useRef(false);
	const syncedKey = useRef<string | undefined>(undefined);

	const setStatus = useCallback((key: string, status: TAutosaveStatus) => {
		setStatusByPart((prev) =>
			prev[key] === status ? prev : { ...prev, [key]: status }
		);
	}, []);

	const activeParts = () =>
		enabledRef.current
			? partsRef.current.filter((part) => part.enabled !== false)
			: [];

	/** The current bodies count as saved (after a load or a full server reset). */
	const rebaseline = useCallback(() => {
		const values = form.getValues();
		lastSent.current.clear();
		partsRef.current.forEach((part) =>
			lastSent.current.set(part.key, part.build(values))
		);
	}, [form]);

	const getQueue = (part: IAutosavePart<T>) => {
		let queue = queues.current.get(part.key);
		if (!queue) {
			queue = createSaveQueue((body) =>
				// Always the latest `save` of this part.
				(partsRef.current.find((p) => p.key === part.key) ?? part).save(
					body
				)
			);
			queues.current.set(part.key, queue);
		}
		return queue;
	};

	const run = useCallback(async () => {
		clearTimeout(timer.current);
		isPending.current = false;
		hasPendingText.current = false;
		const values = form.getValues();

		await Promise.all(
			activeParts().map(async (part) => {
				const body = part.build(values);
				if (
					body === undefined ||
					isSameBody(body, lastSent.current.get(part.key))
				) {
					// The change was not in this part: drop its "pending" mark.
					setStatusByPart((prev) =>
						prev[part.key] === "pending"
							? { ...prev, [part.key]: "idle" }
							: prev
					);
					return;
				}
				if (part.validate && !(await form.trigger(part.validate))) {
					setStatus(part.key, "invalid");
					return;
				}

				lastSent.current.set(part.key, body);
				setStatus(part.key, "saving");
				try {
					await getQueue(part).push(body);
					setStatus(part.key, "saved");
				} catch (error) {
					// Forget the failed body: the next edit retries it.
					lastSent.current.delete(part.key);
					setStatus(part.key, "error");
					onErrorRef.current?.(error, part.key);
				}
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form, setStatus]);

	// Any change but our own server reset; unchanged bodies are filtered by `run`.
	useEffect(() => {
		const subscription = form.watch((_values, { name }) => {
			if (isSyncing.current || !enabledRef.current) return;

			const isText = Boolean(name && isTextField(name));
			hasPendingText.current ||= isText;
			isPending.current = true;
			activeParts().forEach((part) =>
				setStatusByPart((prev) =>
					prev[part.key] === "saving"
						? prev
						: { ...prev, [part.key]: "pending" }
				)
			);

			clearTimeout(timer.current);
			timer.current = setTimeout(
				run,
				hasPendingText.current ? textDebounceMs : debounceMs
			);
		});
		return () => subscription.unsubscribe();
	}, [form, run, debounceMs, textDebounceMs, isTextField]);

	// Server values: a new record resets fully and becomes the baseline; a
	// refetch after a save resets fully too unless the user typed meanwhile.
	const serverData = server?.data;
	const recordKey = server?.recordKey;
	useEffect(() => {
		if (!serverData) return;

		const isNewRecord = syncedKey.current !== recordKey;
		const isUserBusy =
			!isNewRecord &&
			(isPending.current ||
				[...queues.current.values()].some((queue) => queue.isBusy));

		isSyncing.current = true;
		form.reset(
			serverData,
			isUserBusy ? { keepDirtyValues: true } : undefined
		);
		isSyncing.current = false;
		syncedKey.current = recordKey;

		if (!isUserBusy) rebaseline();
		if (isNewRecord) setStatusByPart({});
	}, [serverData, recordKey, form, rebaseline]);

	const handleBlur = useCallback(() => {
		if (hasPendingText.current) run();
	}, [run]);

	// Leaving the page (e.g. another event from the sidebar): save, not drop.
	useEffect(
		() => () => {
			if (isPending.current) run();
		},
		[run]
	);

	const status = mergeStatus(statusByPart);

	useEffect(() => {
		if (status !== "pending" && status !== "saving") return;
		const warn = (event: BeforeUnloadEvent) => {
			event.preventDefault();
		};
		window.addEventListener("beforeunload", warn);
		return () => window.removeEventListener("beforeunload", warn);
	}, [status]);

	return { status, statusByPart, flush: run, handleBlur };
};
