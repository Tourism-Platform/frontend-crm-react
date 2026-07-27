import type {
	HousingDetailsSchemaOutput,
	HousingRoomCategoryExpensesSchemaOutput,
	HousingRoomCategorySchemaOutput,
	HousingRoomExpensesSchemaOutput,
	PerRoomCategoryExpensesOutput,
	PerRoomExpensesOutput
} from "@/shared/api";

export type THousingDetailsBackend = HousingDetailsSchemaOutput;
export type THousingRoomExpensesBackend = HousingRoomExpensesSchemaOutput;
export type THousingRoomCategoryBackend = HousingRoomCategorySchemaOutput;
export type THousingRoomCategoryExpensesBackend =
	HousingRoomCategoryExpensesSchemaOutput;
export type TPerRoomExpensesBackend = PerRoomExpensesOutput;
export type TPerRoomCategoryExpensesBackend = PerRoomCategoryExpensesOutput;
