export const findNewestOptionId = (
	prevIds: Set<string>,
	options: { id: string }[] | undefined
): string | undefined => {
	if (!options?.length) return undefined;
	return options.find((opt) => !prevIds.has(opt.id))?.id;
};

/**
 * Serializes async jobs per key. Errors in one job do not block subsequent jobs,
 * but the returned promise still rejects so callers (e.g. toast) can react.
 */
export const enqueueByKey = <T>(
	queues: Map<string, Promise<void>>,
	key: string,
	job: () => Promise<T>
): Promise<T> => {
	const previous = queues.get(key) ?? Promise.resolve();
	const run = previous.catch(() => undefined).then(() => job());

	const tracked: Promise<void> = run.then(
		() => undefined,
		() => undefined
	);

	const next = tracked.finally(() => {
		if (queues.get(key) === next) {
			queues.delete(key);
		}
	});

	queues.set(key, next);
	return run;
};
