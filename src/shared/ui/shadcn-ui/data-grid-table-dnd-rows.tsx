"use client";

import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import {
	restrictToVerticalAxis,
	restrictToWindowEdges
} from "@dnd-kit/modifiers";
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
	type Cell,
	type HeaderGroup,
	type Row,
	flexRender
} from "@tanstack/react-table";
import { GripHorizontal } from "lucide-react";
import { useMemo } from "react";

import { useDataGrid } from "./data-grid";
import {
	DataGridTableBase,
	DataGridTableBody,
	DataGridTableBodyRow,
	DataGridTableBodyRowCell,
	DataGridTableHead,
	DataGridTableHeadRow,
	DataGridTableHeadRowCell,
	DataGridTableHeadRowCellResize
} from "./data-grid-table";

function DataGridTableRowHandle<TData>({ row }: { row: Row<TData> }) {
	const { attributes, listeners, setNodeRef } = useSortable({
		id: row.id
	});

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded-md transition-colors"
		>
			<GripHorizontal className="size-4 text-muted-foreground" />
		</div>
	);
}

function DataGridTableBodyRowDraggable<TData>({ row }: { row: Row<TData> }) {
	const {
		attributes,
		listeners,
		isDragging,
		setNodeRef,
		transform,
		transition
	} = useSortable({
		id: row.id
	});

	const style: React.CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition,
		zIndex: isDragging ? 1 : 0
	};

	return (
		<DataGridTableBodyRow
			row={row}
			dndRef={setNodeRef}
			dndStyle={style}
			{...attributes}
			{...listeners}
		>
			{row
				.getVisibleCells()
				.map((cell: Cell<TData, unknown>, colIndex) => {
					return (
						<DataGridTableBodyRowCell cell={cell} key={colIndex}>
							{flexRender(
								cell.column.columnDef.cell,
								cell.getContext()
							)}
						</DataGridTableBodyRowCell>
					);
				})}
		</DataGridTableBodyRow>
	);
}

function DataGridTableDnDRows<TData extends { id: string }>({
	onDragEnd
}: {
	onDragEnd?: (event: DragEndEvent) => void;
}) {
	const { table, props } = useDataGrid();

	const rowIds = useMemo(
		() => table.getRowModel().rows.map((row) => row.id),
		[table.getRowModel().rows]
	);

	const sensors = useSensors(
		useSensor(MouseSensor, {}),
		useSensor(TouchSensor, {}),
		useSensor(PointerSensor, {}),
		useSensor(KeyboardSensor, {})
	);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
			onDragEnd={onDragEnd}
		>
			<DataGridTableBase>
				<DataGridTableHead>
					{table
						.getHeaderGroups()
						.map((headerGroup: HeaderGroup<TData>, index) => {
							return (
								<DataGridTableHeadRow
									headerGroup={headerGroup}
									key={index}
								>
									{headerGroup.headers.map(
										(header, index) => {
											const { column } = header;

											return (
												<DataGridTableHeadRowCell
													header={header}
													key={index}
												>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column
																	.columnDef
																	.header,
																header.getContext()
															)}
													{props.tableLayout
														?.columnsResizable &&
														column.getCanResize() && (
															<DataGridTableHeadRowCellResize
																header={header}
															/>
														)}
												</DataGridTableHeadRowCell>
											);
										}
									)}
								</DataGridTableHeadRow>
							);
						})}
				</DataGridTableHead>

				<DataGridTableBody>
					<SortableContext
						items={rowIds}
						strategy={verticalListSortingStrategy}
					>
						{table
							.getRowModel()
							.rows.map((row: Row<TData>, index) => {
								return (
									<DataGridTableBodyRowDraggable
										row={row}
										key={index}
									/>
								);
							})}
					</SortableContext>
				</DataGridTableBody>
			</DataGridTableBase>
		</DndContext>
	);
}

export { DataGridTableDnDRows, DataGridTableRowHandle };
