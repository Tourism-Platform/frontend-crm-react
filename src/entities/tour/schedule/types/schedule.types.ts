export interface ISchedule {
	isSeasonal: boolean;
}

export interface IFixedDate {
	id: string;
	value: Date;
}

export interface IFixedDateCreate {
	value: Date;
}

export interface IRecurrenceRule {
	id: string;
	day: number | null;
	validFrom: Date | null;
	validUntil: Date | null;
}

export interface IRecurrenceRuleCreate {
	day?: number | null;
	validFrom?: Date | null;
	validUntil?: Date | null;
}

export interface IFullSchedule {
	schedule: ISchedule;
	fixedDates: IFixedDate[];
	recurrenceRules: IRecurrenceRule[];
}
