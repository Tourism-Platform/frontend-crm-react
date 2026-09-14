import type { ENUM_LANGUAGES_TYPE } from "@/shared/config/languages";

/** Scope — how much of a linked product the event takes. */
export interface IEventProductScopeAll {
	typ: "all";
}

export interface IEventProductScopeOnly {
	typ: "only";
	/** Product unit ids (hotel category / fare / vehicle / car / offering). */
	ids: string[];
}

export type TEventProductScope = IEventProductScopeAll | IEventProductScopeOnly;

/** Attach/relink body — maps to AttachBody/RelinkBody after converter. */
export interface IEventProductLink {
	productId: string;
	/** undefined = whole product ("all"). */
	scope?: TEventProductScope;
}

/** Detach body — what the event keeps of the product it leaves. */
export interface IEventProductDetach {
	keep: "spec" | "nothing";
	dropOverride?: boolean;
}

export interface IEventProductRelink extends IEventProductLink {
	dropOverride?: boolean;
}

export interface IEventProductScopeUpdate {
	scope: TEventProductScope;
	dropStrayOverrides?: boolean;
}

interface IEventOptionProductArgsBase {
	tourId: string;
	optionId: string;
	eventId: string;
	/** Option row id — for single events it is `event.id` from the read. */
	eventOptionId: string;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IAttachOptionProduct extends IEventOptionProductArgsBase {
	data: IEventProductLink;
}

export interface IDetachOptionProduct extends IEventOptionProductArgsBase {
	data: IEventProductDetach;
}

export interface IRelinkOptionProduct extends IEventOptionProductArgsBase {
	data: IEventProductRelink;
}

export interface IScopeOptionProduct extends IEventOptionProductArgsBase {
	data: IEventProductScopeUpdate;
}
