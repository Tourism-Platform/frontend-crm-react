import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { ENUM_PATH, parseQueryByRoute } from "@/shared/config";
import { fromatISOtoDate } from "@/shared/utils";

import { type IRecentSearch, type ISearchTours } from "@/entities/tour";

import { SearchToursBar } from "@/features/tours";

import { MostPopularTours } from "./most-popular-tours";
import { RecentlySearch } from "./recently-search";

export const SearchTours: FC = () => {
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

	const handleRecentSelect = (data: IRecentSearch) => {
		topSearchForm.reset({
			destination: data.destination,
			dates: {
				from: fromatISOtoDate(data.dates.from),
				to: fromatISOtoDate(data.dates.to)
			}
		});
	};
	return (
		<section className="grid gap-12">
			<SearchToursBar form={topSearchForm} />
			<RecentlySearch onSelect={handleRecentSelect} />
			<MostPopularTours />
		</section>
	);
};
