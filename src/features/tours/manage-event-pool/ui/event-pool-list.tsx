import { useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Badge, Button } from "@/shared/ui";

import type { ENUM_SUPPLIER_TYPE_TYPE } from "@/entities/supplier";
import {
	type ENUM_EVENT_BACKEND_TYPE,
	type TAddPoolMemberIntent,
	type TEventPoolMemberBackend,
	getPoolMemberLabel,
	isProductPoolMember
} from "@/entities/tour";

import {
	ENUM_EVENT_POOL_VARIANT,
	type ENUM_EVENT_POOL_VARIANT_TYPE
} from "../model";

import { AddEventPoolMemberDialog } from "./add-event-pool-member-dialog";
import { RemoveEventPoolMemberButton } from "./remove-event-pool-member-button";
import { SetEventPoolMemberMainButton } from "./set-event-pool-member-main-button";

interface IEventPoolListProps {
	variant: ENUM_EVENT_POOL_VARIANT_TYPE;
	members: TEventPoolMemberBackend[];
	selectedSupplyId?: string;
	canRemove: boolean;
	isBusy: boolean;
	isAdding?: boolean;
	isRemoving?: boolean;
	isSettingMain?: boolean;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	supplierTyp?: ENUM_SUPPLIER_TYPE_TYPE;
	onSelect: (supplyId: string | undefined) => void;
	onAdd: (intent: TAddPoolMemberIntent) => Promise<void>;
	onRemove: (supplyId: string) => Promise<void>;
	onSetMain?: (supplyId: string) => Promise<void>;
}

export const EventPoolList = ({
	variant,
	members,
	selectedSupplyId,
	canRemove,
	isBusy,
	isAdding,
	isRemoving,
	isSettingMain,
	eventTyp,
	supplierTyp,
	onSelect,
	onAdd,
	onRemove,
	onSetMain
}: IEventPoolListProps) => {
	const { t } = useTranslation("common_events");
	const [addOpen, setAddOpen] = useState(false);

	if (!members.length) {
		return null;
	}

	return (
		<div className="grid gap-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<h3 className="text-sm font-medium">{t("pool.list")}</h3>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => setAddOpen(true)}
					disabled={isBusy}
				>
					{t("pool.add.title")}
				</Button>
			</div>

			<ul className="grid gap-2">
				{members.map((member) => {
					const isSelected = member.id === selectedSupplyId;
					const isMain =
						Boolean(member.is_main) || members.length === 1;

					return (
						<li key={member.id}>
							<div
								className={cn(
									"flex flex-wrap items-center justify-between gap-2 rounded-md border p-3",
									isSelected && "border-primary"
								)}
							>
								<button
									type="button"
									className="flex min-w-0 flex-1 items-center gap-2 text-left"
									onClick={() => onSelect(member.id)}
								>
									<span className="truncate font-medium">
										{getPoolMemberLabel(member)}
									</span>
									<Badge variant="outline" size="sm">
										{isProductPoolMember(member)
											? t("pool.source.product")
											: t("pool.source.inline")}
									</Badge>
									{isMain ? (
										<Badge variant="secondary" size="sm">
											{t("pool.main")}
										</Badge>
									) : null}
								</button>
								<div className="flex flex-wrap gap-2">
									{variant === ENUM_EVENT_POOL_VARIANT.TOUR &&
									onSetMain ? (
										<SetEventPoolMemberMainButton
											supplyId={member.id}
											isMain={isMain}
											isLoading={isSettingMain}
											onSetMain={onSetMain}
										/>
									) : null}
									<RemoveEventPoolMemberButton
										supplyId={member.id}
										disabled={!canRemove}
										isLoading={isRemoving}
										onRemove={onRemove}
									/>
								</div>
							</div>
						</li>
					);
				})}
			</ul>

			<AddEventPoolMemberDialog
				open={addOpen}
				onOpenChange={setAddOpen}
				eventTyp={eventTyp}
				supplierTyp={supplierTyp}
				isSubmitting={isAdding}
				onAdd={onAdd}
			/>
		</div>
	);
};
