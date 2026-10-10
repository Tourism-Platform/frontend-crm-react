/**
 * One request at a time per part. A body pushed while a request is in
 * flight replaces the queued tail, so a burst of edits ends in exactly one
 * more request carrying the latest body — never out-of-order writes.
 */
export const createSaveQueue = <B>(save: (body: B) => Promise<unknown>) => {
	let running: Promise<void> | null = null;
	let next: { body: B } | null = null;

	const drain = async () => {
		while (next) {
			const { body } = next;
			next = null;
			await save(body);
		}
	};

	return {
		push(body: B): Promise<void> {
			next = { body };
			running ??= drain().finally(() => {
				running = null;
				next = null;
			});
			return running;
		},
		get isBusy() {
			return running !== null;
		}
	};
};

export type TSaveQueue<B> = ReturnType<typeof createSaveQueue<B>>;
