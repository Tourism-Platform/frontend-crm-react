import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useCallback, useMemo } from "react";
import { type Resolver, type UseFormReturn, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

import { ENUM_PATH, parseQueryByRoute } from "@/shared/config";
import { withErrorBoundary } from "@/shared/ui";

import {
	type IRecentSearch,
	type TCatalogLocationBar,
	type TSearchTours,
	createSearchToursSchema,
	mapSearchQueryToSearchTours
} from "@/entities/tour";

import { SearchToursBar } from "@/features/tours";

import { MostPopularTours } from "./most-popular-tours";
import { RecentlySearch } from "./recently-search";

const SearchToursBase: FC = () => {
	const { t } = useTranslation("common_tours");
	const location = useLocation();
	const query = parseQueryByRoute<typeof ENUM_PATH.TOURS.SEARCH>(
		location.search
	);

	const schema = useMemo(
		() => createSearchToursSchema(t("search.form.fields.where.required")),
		[t]
	);

	const topSearchForm = useForm<TSearchTours>({
		resolver: zodResolver(schema) as Resolver<TSearchTours>,
		defaultValues: mapSearchQueryToSearchTours(query)
	});

	const handleRecentSelect = useCallback(
		(data: IRecentSearch) => {
			topSearchForm.reset(data.searchTours);
		},
		[topSearchForm]
	);

	return (
		<section className="grid gap-12">
			<SearchToursBar
				form={
					topSearchForm as unknown as UseFormReturn<TCatalogLocationBar>
				}
			/>
			<RecentlySearch onSelect={handleRecentSelect} />
			<MostPopularTours />
		</section>
	);
};

export const SearchTours = withErrorBoundary(SearchToursBase);
