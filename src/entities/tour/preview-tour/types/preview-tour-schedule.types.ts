import type { TourSchedulePubSchema } from "@/shared/api";

export type TPreviewTourScheduleBackend = TourSchedulePubSchema;

export interface IPreviewTourSchedule {
	occurrences: Date[];
	windowFrom: Date | null;
	windowUntil: Date | null;
}
