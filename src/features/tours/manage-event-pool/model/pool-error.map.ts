import { ENUM_POOL_ERROR_CODE, type ENUM_POOL_ERROR_CODE_TYPE } from "./types";

export const POOL_ERROR_DETAIL_TO_CODE: Record<
	string,
	ENUM_POOL_ERROR_CODE_TYPE
> = {
	"Pool member not found": ENUM_POOL_ERROR_CODE.POOL_MEMBER_NOT_FOUND,
	"Cannot remove the last supplier of an option's pool":
		ENUM_POOL_ERROR_CODE.POOL_LAST_MEMBER,
	"Pool members are added and removed through the pool routes":
		ENUM_POOL_ERROR_CODE.POOL_ECHO_MISMATCH,
	"Supply moves through attach, relink, scope or detach":
		ENUM_POOL_ERROR_CODE.POOL_SUPPLY_MOVE,
	"A new option states where its supply comes from":
		ENUM_POOL_ERROR_CODE.POOL_REQUIRED,
	"Option type must match the event's other options":
		ENUM_POOL_ERROR_CODE.POOL_TYP_MISMATCH,
	"Event option not found": ENUM_POOL_ERROR_CODE.EVENT_OPTION_NOT_FOUND
};

export const POOL_ERROR_CODE_SET = new Set<string>(
	Object.values(ENUM_POOL_ERROR_CODE)
);
