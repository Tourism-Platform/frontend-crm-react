import { useCallback, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useDebounce, useOptionalResourceQuery } from "@/shared/hooks";

import {
	type ENUM_CATALOG_SORT_TYPE,
	type ICatalogTourFilters,
	type TCatalogLocationBar,
	useGetCatalogToursQuery
} from "@/entities/tour";

import { DEFAULT_CATALOG_FILTERS } from "../config/catalog-tours.config";

import { useCatalogUrlSync } from "./use-catalog-url-sync";

export const useCatalogTours = () => {
	const { t, i18n } = useTranslation("tours_catalog_page");

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
	const { search, page, limit, sort } = formValues;

	const {
		applyLocationBarSubmit,
		syncUrlFromFilters,
		handleReset: handleUrlReset,
		isHydratingRef,
		searchResetKey
	} = useCatalogUrlSync({
		filtersForm: methods,
		locationForm
	});

	// Задержка и минимальная длина поиска — в SmartTable; новый поиск — с первой страницы
	const handleSearchChange = useCallback(
		(value: string) => {
			setValue("search", value);
			setValue("page", 1);
		},
		[setValue]
	);

	// Новая сортировка — снова с первой страницы
	useEffect(() => {
		if (isHydratingRef.current) return;

		setValue("page", 1);
	}, [sort, isHydratingRef, setValue]);

	// Новый фильтр — снова с первой страницы; восстановление из адреса страницу не трогает
	useEffect(
		() =>
			methods.subscribe({
				name: "filters",
				formState: { values: true },
				callback: () => {
					if (isHydratingRef.current) return;

					setValue("page", 1);
				}
			}),
		[methods, isHydratingRef, setValue]
	);

	// Поле фильтра пишет в `filters.*` на месте — `watch()` отдаёт тот же объект, useWatch — новую копию
	const filterValues = useWatch({
		control: methods.control,
		name: "filters"
	});
	const debouncedFilters = useDebounce(filterValues, 500);

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

	// Страница из адреса за пределами выдачи (вписали руками) — на первую
	useEffect(() => {
		if (toursData && page > totalPages) {
			setValue("page", 1);
		}
	}, [toursData, page, totalPages, setValue]);

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
		handleSearchChange,
		searchResetKey,
		handleReset,
		handleSortChange,
		handlePrevPage,
		handleNextPage,
		similarParams
	};
};
