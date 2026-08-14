import { useCallback, useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

import { ENUM_PATH } from "@/shared/config";

import {
	type ICatalogTourFilters,
	type TCatalogLocationBar,
	areCatalogQueryStringsEqual,
	buildCatalogRoute,
	mapCatalogFiltersToCatalogQuery,
	mapCatalogQueryToCatalogFilters,
	mapCatalogQueryToLocationBar,
	mapLocationBarToCatalogQuery,
	mergeCatalogQuery,
	parseCatalogQuery
} from "@/entities/tour";

import { DEFAULT_CATALOG_FILTERS } from "../config/catalog-tours.config";

interface IUseCatalogUrlSyncParams {
	filtersForm: UseFormReturn<ICatalogTourFilters>;
	locationForm: UseFormReturn<TCatalogLocationBar>;
	setLocalSearch: (value: string) => void;
}

export const useCatalogUrlSync = ({
	filtersForm,
	locationForm,
	setLocalSearch
}: IUseCatalogUrlSyncParams) => {
	const location = useLocation();
	const navigate = useNavigate();
	const isHydratingRef = useRef(false);

	const writeUrl = useCallback(
		(query: ReturnType<typeof parseCatalogQuery>) => {
			if (isHydratingRef.current) return;

			if (areCatalogQueryStringsEqual(location.search, query)) {
				return;
			}

			const route = buildCatalogRoute(query);

			navigate(route, { replace: true });
		},
		[location.search, navigate]
	);

	const hydrateFromUrl = useCallback(() => {
		isHydratingRef.current = true;

		const query = parseCatalogQuery(location.search);
		const nextFilters = mapCatalogQueryToCatalogFilters(
			query,
			DEFAULT_CATALOG_FILTERS
		);
		const nextLocationBar = mapCatalogQueryToLocationBar(query);

		filtersForm.reset(nextFilters);
		locationForm.reset(nextLocationBar);
		setLocalSearch(query.place ?? "");

		window.setTimeout(() => {
			isHydratingRef.current = false;
		}, 0);
	}, [filtersForm, location.search, locationForm, setLocalSearch]);

	useEffect(() => {
		hydrateFromUrl();
	}, [hydrateFromUrl]);

	const applyLocationBarSubmit = useCallback(
		(data: TCatalogLocationBar) => {
			const fromFilters = mapCatalogFiltersToCatalogQuery(
				filtersForm.getValues()
			);
			const fromBar = mapLocationBarToCatalogQuery(data);
			const query = mergeCatalogQuery(fromFilters, {
				...fromBar,
				page: 1
			});

			writeUrl(query);
		},
		[filtersForm, writeUrl]
	);

	const syncUrlFromFilters = useCallback(() => {
		const current = parseCatalogQuery(location.search);
		const fromFilters = mapCatalogFiltersToCatalogQuery(
			filtersForm.getValues()
		);

		writeUrl(
			mergeCatalogQuery(fromFilters, {
				checkIn: current.checkIn,
				checkOut: current.checkOut
			})
		);
	}, [filtersForm, location.search, writeUrl]);

	const handleReset = useCallback(() => {
		isHydratingRef.current = true;

		filtersForm.reset(DEFAULT_CATALOG_FILTERS);
		locationForm.reset({ destination: null, dates: undefined });
		setLocalSearch("");

		navigate(ENUM_PATH.TOURS.CATALOG.ROOT, { replace: true });

		window.setTimeout(() => {
			isHydratingRef.current = false;
		}, 0);
	}, [filtersForm, locationForm, navigate, setLocalSearch]);

	return {
		applyLocationBarSubmit,
		syncUrlFromFilters,
		handleReset,
		isHydratingRef
	};
};
