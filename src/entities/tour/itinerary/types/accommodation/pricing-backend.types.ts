import type {
	CustomHousingDetailsInput,
	CustomHousingDetailsOutput,
	HousingRoomCategoryExpensesSchemaOutput,
	HousingRoomDoubleSchemaInput,
	HousingRoomDoubleSchemaOutput,
	HousingRoomSchemaOutput,
	InheritedHousingDetailsOutput,
	PerRoomCategoryExpensesOutput,
	PerRoomExpensesOutput
} from "@/shared/api";

export type TCustomHousingDetailsBackend = CustomHousingDetailsOutput;
export type TCustomHousingDetailsInputBackend = CustomHousingDetailsInput;
export type TInheritedHousingDetailsBackend = InheritedHousingDetailsOutput;

export type THousingDetailsBackend =
	| TCustomHousingDetailsBackend
	| TInheritedHousingDetailsBackend;

export type THousingRoomExpensesBackend = HousingRoomDoubleSchemaOutput;
export type THousingRoomCategoryBackend = HousingRoomSchemaOutput;
export type THousingRoomCategoryExpensesBackend =
	HousingRoomCategoryExpensesSchemaOutput;
export type TPerRoomExpensesBackend = PerRoomExpensesOutput;
export type TPerRoomCategoryExpensesBackend = PerRoomCategoryExpensesOutput;

export type THousingRoomChargeInputBackend = NonNullable<
	HousingRoomDoubleSchemaInput["expenses"]
>;
