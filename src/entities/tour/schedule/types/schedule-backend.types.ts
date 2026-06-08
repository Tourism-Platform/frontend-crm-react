import type {
	ExcludedDateCreate,
	ExcludedDateModel,
	FixedDateCreate,
	FixedDateModel,
	FullScheduleSchema,
	RecurrenceDateModel,
	RecurrenceRuleCreate,
	TourScheduleModel,
	TourScheduleUpdate
} from "@/shared/api";

export type TFullScheduleBackend = FullScheduleSchema;
export type TTourScheduleBackend = TourScheduleModel;
export type TTourScheduleUpdateBackend = TourScheduleUpdate;
export type TFixedDateCreateBackend = FixedDateCreate;
export type TFixedDateBackend = FixedDateModel;
export type TExcludedDateCreateBackend = ExcludedDateCreate;
export type TExcludedDateBackend = ExcludedDateModel;
export type TRecurrenceRuleCreateBackend = RecurrenceRuleCreate;
export type TRecurrenceRuleBackend = RecurrenceDateModel;
