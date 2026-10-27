import { type FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { DataState, withErrorBoundary } from "@/shared/ui";

import {
	RecentSearchCard,
	useGetRecentlySearchedToursQuery
} from "@/entities/tour";
import { type IRecentSearch } from "@/entities/tour";

interface IRecentlySearchProps {
	onSelect: (data: IRecentSearch) => void;
}

const RecentlySearchBase: FC<IRecentlySearchProps> = ({ onSelect }) => {
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
			<h2 className="text-xl">{t("recently_search.title")}</h2>
			<DataState data={items} isLoading={isLoading}>
				{(items) => (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
						{items.map((item) => (
							<RecentSearchCard
								key={item.id}
								data={item}
								onClick={() => handleSelect(item)}
							/>
						))}
					</div>
				)}
			</DataState>
		</section>
	);
};

export const RecentlySearch = withErrorBoundary(memo(RecentlySearchBase));
