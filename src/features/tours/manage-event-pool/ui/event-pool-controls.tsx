import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { ENUM_SUPPLIER_TYPE_TYPE } from "@/entities/supplier";
import {
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_FORM_EVENT_PRODUCT,
	type TAddPoolMemberIntent
} from "@/entities/tour";

import {
	type ENUM_EVENT_POOL_VARIANT_TYPE,
	useEventPoolMembers
} from "../model";

import { EventPoolList } from "./event-pool-list";

interface IEventPoolControlsProps<T extends FieldValues> {
	form: UseFormReturn<T>;
	variant: ENUM_EVENT_POOL_VARIANT_TYPE;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	supplierTyp?: ENUM_SUPPLIER_TYPE_TYPE;
	onSelect: (supplyId: string | undefined) => void;
}

export const EventPoolControls = <T extends FieldValues>({
	form,
	variant,
	eventTyp,
	supplierTyp,
	onSelect
}: IEventPoolControlsProps<T>) => {
	const pool = useEventPoolMembers(variant);
	const selectedSupplyId = useWatch({
		control: form.control,
		name: ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID as Path<T>
	}) as string | undefined;

	const handleRemove = async (supplyId: string) => {
		const wasSelected = supplyId === selectedSupplyId;
		const nextId = pool.members.find(
			(member) => member.id !== supplyId
		)?.id;

		await pool.remove(supplyId);

		if (wasSelected) {
			onSelect(nextId);
		}
	};

	const handleAdd = async (intent: TAddPoolMemberIntent) => {
		await pool.add(intent);
	};

	const handleSetMain = pool.setMain
		? async (supplyId: string) => {
				await pool.setMain?.(supplyId);
			}
		: undefined;

	if (pool.hideForCreate) {
		return null;
	}

	return (
		<EventPoolList
			variant={variant}
			members={pool.members}
			selectedSupplyId={selectedSupplyId}
			canRemove={pool.canRemove}
			isBusy={pool.isBusy}
			isAdding={pool.isAdding}
			isRemoving={pool.isRemoving}
			isSettingMain={pool.isSettingMain}
			eventTyp={eventTyp}
			supplierTyp={supplierTyp}
			onSelect={onSelect}
			onAdd={handleAdd}
			onRemove={handleRemove}
			onSetMain={handleSetMain}
		/>
	);
};
