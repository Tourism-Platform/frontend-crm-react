export interface ISearchTours {
	destination: string;
	dates: {
		from: string | Date;
		to: string | Date;
	};
}

export interface IRecentSearch extends ISearchTours {
	id: string;
	label?: string;
}
