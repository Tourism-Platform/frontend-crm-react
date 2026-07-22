import { isNotFoundError } from "@/shared/api";

export type TResourceMode = "create" | "update";

type TQueryLike<T> = {
	data?: T;
	isError: boolean;
	error?: unknown;
	isLoading: boolean;
	isFetching: boolean;
	isSuccess: boolean;
};

export function useOptionalResourceQuery<T>(
	query: TQueryLike<T>
): TQueryLike<T> & {
	isNotFound: boolean;
	isRealError: boolean;
	exists: boolean;
	mode: TResourceMode;
} {
	const isNotFound = query.isError && isNotFoundError(query.error);
	const isRealError = query.isError && !isNotFound;
	const exists = !isNotFound && query.data != null;
	const mode: TResourceMode = isNotFound || !query.data ? "create" : "update";

	return {
		...query,
		isNotFound,
		isRealError,
		exists,
		mode
	};
}
