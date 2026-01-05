import type {
	BadgeVariant,
	CustomFieldVariant,
	MultipleSelectorDisplayMode,
	Option as MultipleSelectorOption,
	SelectPickerOption
} from "@/shared/ui";

// Универсальные типы ключей и идентификаторов
type TGenericLabel = string;
type TGenericKey = string;

// Базовый интерфейс формы
interface IFormBase<L = TGenericLabel, K = TGenericKey> {
	label: L;
	key: K;
	className?: string;
}

// Универсальные поля
type TFormRequired<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: Exclude<
		CustomFieldVariant,
		"date" | "time" | "select" | "multiselect" | "upload"
	>;
	placeholder: L;
	type?: string;
};

type TFormOptional<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: "date" | "time" | "editor" | "upload";
	placeholder?: L;
};

type TFormSelect<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: "select";
	options: SelectPickerOption[];
	placeholder?: L;
	defaultValue?: string;
};

type TFormMultiSelect<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: "multiselect";
	options: MultipleSelectorOption[];
	placeholder?: string;
	displayMode?: MultipleSelectorDisplayMode;
	badgeVariant?: BadgeVariant;
	hideClearAllButton?: boolean;
};

type TFormUploadFiles<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: "upload";
	maxFiles?: number;
	showAllRemoveButton?: boolean;
	showTopTitle?: boolean;
	readOnly?: boolean;
	isLoading?: boolean;
	loadingId?: string;
};

// Универсальный тип формы
export type TFormField<L = TGenericLabel, K = TGenericKey> =
	| TFormRequired<L, K>
	| TFormOptional<L, K>
	| TFormSelect<L, K>
	| TFormMultiSelect<L, K>
	| TFormUploadFiles<L, K>;
