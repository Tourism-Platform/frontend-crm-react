import type {
	InheritedTransferDetailsOutput,
	PerCarCategoryExpenseOutput,
	PerCarExpenseOutput,
	TransferCarCategoriesVariantOutput,
	TransferCarPackageCategorySchemaOutput,
	TransferCarVariantOutput,
	TransferDetailsSchemaOutput
} from "@/shared/api";

export type TTransferDetailsBackend = TransferDetailsSchemaOutput;
export type TInheritedTransferDetailsBackend = InheritedTransferDetailsOutput;
export type TTransferEventDetailsBackend =
	| TTransferDetailsBackend
	| TInheritedTransferDetailsBackend;
export type TTransferCarVariantBackend = TransferCarVariantOutput;
export type TTransferCarPackageCategoryBackend =
	TransferCarPackageCategorySchemaOutput;
export type TTransferCarCategoriesVariantBackend =
	TransferCarCategoriesVariantOutput;
export type TPerCarExpenseBackend = PerCarExpenseOutput;
export type TPerCarCategoryExpenseBackend = PerCarCategoryExpenseOutput;
