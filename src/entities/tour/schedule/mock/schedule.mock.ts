import type {
	ExcludedDateModel,
	FixedDateModel,
	RecurrenceDateModel,
	SeasonalityCommissionModel,
	TourScheduleModel
} from "@/shared/api";
import { createMockId } from "@/shared/api";

import { TOURS_MOCK } from "@/entities/tour/tour/mock/tour.mock";

export interface IScheduleMockState {
	schedule: TourScheduleModel;
	fixed_dates: FixedDateModel[];
	excluded_dates: ExcludedDateModel[];
	recurrence_rules: RecurrenceDateModel[];
	commissions: SeasonalityCommissionModel[];
}

const SATURDAY = 5;
const WEDNESDAY = 2;

/** Расписание тура: еженедельные правила, пара фиксированных и исключённых дат */
export const createScheduleMock = (
	scheduleId: string,
	index: number
): IScheduleMockState => ({
	schedule: { id: scheduleId, is_seasonal: index % 2 === 0 },
	recurrence_rules: [
		{
			id: createMockId("b210", index * 10),
			schedule_id: scheduleId,
			day: index % 2 === 0 ? SATURDAY : WEDNESDAY,
			valid_from: "2026-01-01",
			valid_until: "2027-12-31"
		}
	],
	fixed_dates: [
		{
			id: createMockId("b220", index * 10),
			schedule_id: scheduleId,
			value: `2026-${String((index % 12) + 1).padStart(2, "0")}-15`
		}
	],
	excluded_dates: [
		{
			id: createMockId("b230", index * 10),
			schedule_id: scheduleId,
			value: "2026-12-31"
		}
	],
	commissions: [
		{
			id: createMockId("b240", index * 10),
			schedule_id: scheduleId,
			commission: 10,
			valid_from: "2026-06-01",
			valid_until: "2026-08-31"
		},
		{
			id: createMockId("b240", index * 10 + 1),
			schedule_id: scheduleId,
			commission: 7,
			valid_from: "2026-12-20",
			valid_until: "2027-01-10"
		}
	]
});

/** tourId → schedule_id из моков туров */
export const SCHEDULE_SEED = TOURS_MOCK.map((tour, index) => ({
	tourId: tour.id,
	state: createScheduleMock(
		tour.schedule_id ?? createMockId("b110", index),
		index
	)
}));
