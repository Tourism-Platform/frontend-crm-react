export interface IConfirmOptions {
	title: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	/** Red confirm button for destructive actions. */
	destructive?: boolean;
}

export interface IConfirmRequest extends IConfirmOptions {
	resolve: (confirmed: boolean) => void;
}

type TListener = (request: IConfirmRequest | null) => void;

let listener: TListener | null = null;
let current: IConfirmRequest | null = null;

/** Registered by the single `ConfirmHost` mounted in the app root. */
export const subscribeConfirm = (next: TListener) => {
	listener = next;
	next(current);
	return () => {
		if (listener === next) listener = null;
	};
};

/**
 * Asks the user to confirm and resolves `true` / `false`. Works from any
 * component or handler; without a mounted host it resolves `true` so the
 * action is never silently blocked.
 */
export const requestConfirm = (options: IConfirmOptions): Promise<boolean> => {
	if (!listener) return Promise.resolve(true);

	current?.resolve(false);
	return new Promise<boolean>((resolve) => {
		current = {
			...options,
			resolve: (confirmed) => {
				current = null;
				listener?.(null);
				resolve(confirmed);
			}
		};
		listener?.(current);
	});
};

export const useConfirm = () => requestConfirm;
