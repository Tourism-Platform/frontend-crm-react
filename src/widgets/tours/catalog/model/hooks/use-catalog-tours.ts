import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useDebounce, useOptionalResourceQuery } from "@/shared/hooks";

import {
	type ENUM_CATALOG_SORT_TYPE,
	type ICatalogTourFilters,
	type TCatalogLocationBar,
	useGetCatalogToursQuery
} from "@/entities/tour";

import {
	DEFAULT_CATALOG_FILTERS,
	type TCatalogViewMode
} from "../config/catalog-tours.config";

import { useCatalogUrlSync } from "./use-catalog-url-sync";

export const useCatalogTours = () => {
	const { t, i18n } = useTranslation("tours_catalog_page");
	const searchInputRef = useRef<HTMLInputElement>(null);
	const [viewMode, setViewMode] = useState<TCatalogViewMode>("grid");

	const readLang = i18n.language;

	const methods = useForm<ICatalogTourFilters>({
		defaultValues: DEFAULT_CATALOG_FILTERS
	});

	const locationForm = useForm<TCatalogLocationBar>({
		defaultValues: {
			destination: null,
			dates: undefined
		}
	});

	const { watch, setValue } = methods;
	const formValues = watch();
	const { search, page, limit, sort, filters: filterValues } = formValues;

	const [localSearch, setLocalSearch] = useState(search);
	const debouncedSearch = useDebounce(localSearch, 500);

	const {
		applyLocationBarSubmit,
		syncUrlFromFilters,
		handleReset: handleUrlReset,
		isHydratingRef
	} = useCatalogUrlSync({
		filtersForm: methods,
		locationForm,
		setLocalSearch
	});

	useEffect(() => {
		setLocalSearch(search);
	}, [search]);

	useEffect(() => {
		if (isHydratingRef.current) return;
		if (debouncedSearch === search) return;

		const shouldApply =
			debouncedSearch.length === 0 || debouncedSearch.length >= 3;

		if (shouldApply) {
			setValue("search", debouncedSearch);
			setValue("page", 1);
		}
	}, [debouncedSearch, isHydratingRef, search, setValue]);

	// Новая сортировка — снова с первой страницы
	useEffect(() => {
		if (isHydratingRef.current) return;

		setValue("page", 1);
	}, [sort, isHydratingRef, setValue]);

	const debouncedSource = useMemo(() => filterValues, [filterValues]);
	const debouncedFilters = useDebounce(debouncedSource, 500);

	useEffect(() => {
		if (isHydratingRef.current) return;

		syncUrlFromFilters();
	}, [
		debouncedFilters,
		page,
		limit,
		sort,
		isHydratingRef,
		syncUrlFromFilters
	]);

	const {
		data: toursData,
		isLoading: isLoadingTours,
		isFetching: isFetchingTours,
		isRealError: isError
	} = useOptionalResourceQuery(
		useGetCatalogToursQuery({
			search,
			page,
			limit,
			sort,
			readLang,
			filters: debouncedFilters
		})
	);

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const tours = toursData?.data ?? [];
	const totalCount = toursData?.total ?? 0;
	const totalPages = Math.max(1, Math.ceil(totalCount / limit));
	const isLoading = isLoadingTours || isFetchingTours;

	const handleReset = useCallback(() => {
		handleUrlReset();
	}, [handleUrlReset]);

	const handleSortChange = useCallback(
		(value: string) => {
			setValue("sort", value as ENUM_CATALOG_SORT_TYPE);
		},
		[setValue]
	);

	const handlePrevPage = useCallback(() => {
		setValue("page", Math.max(1, page - 1));
	}, [page, setValue]);

	const handleNextPage = useCallback(() => {
		setValue("page", Math.min(totalPages, page + 1));
	}, [page, setValue, totalPages]);

	const similarParams = useMemo(
		() => ({
			search,
			page,
			limit,
			sort,
			readLang,
			filters: {
				...debouncedFilters,
				duration: []
			}
		}),
		[search, page, limit, sort, readLang, debouncedFilters]
	);

	return {
		methods,
		locationForm,
		applyLocationBarSubmit,
		search,
		page,
		limit,
		sort,
		tours,
		totalCount,
		totalPages,
		isLoading,
		viewMode,
		setViewMode,
		localSearch,
		setLocalSearch,
		searchInputRef,
		handleReset,
		handleSortChange,
		handlePrevPage,
		handleNextPage,
		similarParams
	};
};
