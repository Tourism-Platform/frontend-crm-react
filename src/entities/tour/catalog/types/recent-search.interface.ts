export interface ISearchTours {
	destination: string;
	dates?: {
		from: string;
		to: string;
	};
}

export interface IRecentSearch extends ISearchTours {
	id: string;
}
