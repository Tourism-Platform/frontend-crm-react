import { useCallback, useEffect, useRef } from "react";
import {
	type NavigateOptions,
	useLocation,
	useNavigate
} from "react-router-dom";

export interface IUseNavigateByTypeOptions<
	TType extends string,
	TParams extends Record<string, string>
> {
	expectedType: TType;
	actualType?: TType | null;
	params: TParams;
	resolvePath: (type: TType, params: TParams) => string | undefined;
	enabled?: boolean;
}

export const useNavigateByType = <
	TType extends string,
	TParams extends Record<string, string>
>({
	expectedType,
	actualType,
	params,
	resolvePath,
	enabled = true
}: IUseNavigateByTypeOptions<TType, TParams>) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const paramsRef = useRef(params);
	paramsRef.current = params;

	const isExpectedType = actualType == null || actualType === expectedType;

	useEffect(() => {
		if (!enabled || actualType == null || actualType === expectedType) {
			return;
		}

		const path = resolvePath(actualType, paramsRef.current);
		if (!path) return;

		const [target] = path.split("?");
		if (target === pathname) return;

		navigate(path, { replace: true });
	}, [actualType, enabled, expectedType, navigate, pathname, resolvePath]);

	const navigateToType = useCallback(
		(
			type: TType,
			navOptions?: NavigateOptions,
			paramsOverride?: Partial<TParams>
		) => {
			const path = resolvePath(type, {
				...paramsRef.current,
				...paramsOverride
			});
			if (!path) return;
			navigate(path, navOptions);
		},
		[navigate, resolvePath]
	);

	return { navigateToType, isExpectedType };
};
