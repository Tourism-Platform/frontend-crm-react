import type { CustomFieldVariant, SelectPickerOption } from "@/shared/ui";

// Универсальные типы ключей и идентификаторов
type TGenericLabel = string;
type TGenericKey = string;

// Базовый интерфейс формы
interface IFormBase<L = TGenericLabel, K = TGenericKey> {
	label: L;
	key: K;
}

// Универсальные поля
type TFormRequired<L = TGenericLabel, K = TGenericKey> = IFormBase<L, K> & {
	fieldType: Exclude<CustomFieldVariant, "date" | "time" | "select">;
	placeholder: L;
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

// Универсальный тип формы
export type TFormField<L = TGenericLabel, K = TGenericKey> =
	| TFormRequired<L, K>
	| TFormOptional<L, K>
	| TFormSelect<L, K>;
