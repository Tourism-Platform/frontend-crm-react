import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { LanguageCode } from "@/shared/api";
import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import { languageCodeMapper } from "@/shared/converters";
import { useDebounce, useOptionalResourceQuery } from "@/shared/hooks";

import {
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

	const readLang = useMemo(
		() =>
			languageCodeMapper.to(
				i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN
			) ?? LanguageCode.En,
		[i18n.language]
	);

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
	const { search, page, limit, filters: filterValues } = formValues;

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

	const debouncedSource = useMemo(() => filterValues, [filterValues]);
	const debouncedFilters = useDebounce(debouncedSource, 500);

	useEffect(() => {
		if (isHydratingRef.current) return;

		syncUrlFromFilters();
	}, [debouncedFilters, page, limit, isHydratingRef, syncUrlFromFilters]);

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
			readLang,
			filters: {
				...debouncedFilters,
				duration: []
			}
		}),
		[search, page, limit, readLang, debouncedFilters]
	);

	return {
		methods,
		locationForm,
		applyLocationBarSubmit,
		search,
		page,
		limit,
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
		handlePrevPage,
		handleNextPage,
		similarParams
	};
};
