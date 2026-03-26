import { type FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
	RecentSearchCard,
	RecentSearchCardSkeleton,
	useGetRecentlySearchedToursQuery
} from "@/entities/tour";
import { type IRecentSearch } from "@/entities/tour";

interface IRecentlySearchProps {
	onSelect: (data: IRecentSearch) => void;
}

const RecentlySearchInner: FC<IRecentlySearchProps> = ({ onSelect }) => {
	const { t } = useTranslation("tours_search_page");

	const { data: items = [], isLoading } = useGetRecentlySearchedToursQuery();

	const handleSelect = useCallback(
		(item: IRecentSearch) => {
			onSelect(item);
		},
		[onSelect]
	);

	if (!isLoading && items.length === 0) return null;

	return (
		<section className="flex flex-col gap-4">
			<h2 className="text-xl font-semibold">
				{t("recently_search.title")}
			</h2>
			<div className="grid grid-cols-5 gap-5">
				{isLoading
					? [...Array(5)].map((_, i) => (
							<RecentSearchCardSkeleton key={i} />
						))
					: items.map((item) => (
							<RecentSearchCard
								key={item.id}
								data={item}
								onClick={() => handleSelect(item)}
							/>
						))}
			</div>
		</section>
	);
};

export const RecentlySearch = memo(RecentlySearchInner);
