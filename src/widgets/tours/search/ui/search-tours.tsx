import { type FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { ENUM_PATH, parseQueryByRoute } from "@/shared/config";
import { withErrorBoundary } from "@/shared/ui";
import { fromatISOtoDate } from "@/shared/utils";

import { type IRecentSearch, type ISearchTours } from "@/entities/tour";

import { SearchToursBar } from "@/features/tours";

import { MostPopularTours } from "./most-popular-tours";
import { RecentlySearch } from "./recently-search";

const SearchToursBase: FC = () => {
	const location = useLocation();
	const {
		destination,
		checkIn = "",
		checkOut = ""
	} = parseQueryByRoute<typeof ENUM_PATH.TOURS.SEARCH>(location.search);
	const topSearchForm = useForm<ISearchTours>({
		defaultValues: {
			destination,
			dates: {
				from: fromatISOtoDate(checkIn),
				to: fromatISOtoDate(checkOut)
			}
		}
	});

	const handleRecentSelect = useCallback(
		(data: IRecentSearch) => {
			topSearchForm.reset({
				destination: data.destination,
				dates: {
					from: fromatISOtoDate(data.dates.from),
					to: fromatISOtoDate(data.dates.to)
				}
			});
		},
		[topSearchForm]
	);
	return (
		<section className="grid gap-12">
			<SearchToursBar form={topSearchForm} />
			<RecentlySearch onSelect={handleRecentSelect} />
			<MostPopularTours />
		</section>
	);
};

export const SearchTours = withErrorBoundary(SearchToursBase);
