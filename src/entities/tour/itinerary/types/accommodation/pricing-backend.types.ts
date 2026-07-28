import type {
	HousingDetailsSchemaOutput,
	HousingRoomCategoryExpensesSchemaOutput,
	HousingRoomDoubleSchemaOutput,
	HousingRoomSchemaOutput,
	PerRoomCategoryExpensesOutput,
	PerRoomExpensesOutput
} from "@/shared/api";

export type THousingDetailsBackend = HousingDetailsSchemaOutput;
export type THousingRoomExpensesBackend = HousingRoomDoubleSchemaOutput;
export type THousingRoomCategoryBackend = HousingRoomSchemaOutput;
export type THousingRoomCategoryExpensesBackend =
	HousingRoomCategoryExpensesSchemaOutput;
export type TPerRoomExpensesBackend = PerRoomExpensesOutput;
export type TPerRoomCategoryExpensesBackend = PerRoomCategoryExpensesOutput;
