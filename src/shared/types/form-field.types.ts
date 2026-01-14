import type { LucideIcon } from "lucide-react";

import type {
	BadgeVariant,
	CustomAutocompleteOption,
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

// Конкретные типы полей
type TFormInput<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType?: "input";
	placeholder: L;
	type?: string;
};

type TFormPassword<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: "password";
	placeholder: L;
};

type TFormPhone<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: "phone";
	placeholder: L;
};

type TFormTextarea<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: "textarea";
	placeholder: L;
	rows?: number;
};

type TFormOptional<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: "date" | "time" | "editor";
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

type TFormDateRange<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: "dateRange";
	placeholder?: L;
};

type TFormAutocomplete<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: "autocomplete";
	options: CustomAutocompleteOption[];
	placeholder?: string;
	emptyText?: string;
	icon?: LucideIcon;
};

// Универсальный тип формы
export type TFormField<L = TGenericLabel, K = TGenericKey> =
	| TFormInput<L, K>
	| TFormPassword<L, K>
	| TFormPhone<L, K>
	| TFormTextarea<L, K>
	| TFormOptional<L, K>
	| TFormSelect<L, K>
	| TFormMultiSelect<L, K>
	| TFormUploadFiles<L, K>
	| TFormAutocomplete<L, K>
	| TFormDateRange<L, K>;
