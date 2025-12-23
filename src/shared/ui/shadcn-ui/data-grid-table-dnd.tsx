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
	restrictToHorizontalAxis,
	restrictToWindowEdges
} from "@dnd-kit/modifiers";
import {
	SortableContext,
	arrayMove,
	horizontalListSortingStrategy,
	useSortable,
	verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
	type Cell,
	type Header,
	type HeaderGroup,
	type Row,
	flexRender
} from "@tanstack/react-table";
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

function DataGridTableHeadRowCellDraggable<TData>({
	header
}: {
	header: Header<TData, unknown>;
}) {
	const { props } = useDataGrid();
	const { column } = header;

	const {
		attributes,
		isDragging,
		listeners,
		setNodeRef,
		transform,
		transition
	} = useSortable({
		id: column.id
	});

	const style: React.CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition,
		zIndex: isDragging ? 1 : 0
	};

	return (
		<DataGridTableHeadRowCell
			header={header}
			dndRef={setNodeRef}
			dndStyle={style}
		>
			<div
				className="flex items-center h-full grow"
				{...attributes}
				{...listeners}
			>
				{header.isPlaceholder
					? null
					: flexRender(
							header.column.columnDef.header,
							header.getContext()
						)}
			</div>
			{props.tableLayout?.columnsResizable && column.getCanResize() && (
				<DataGridTableHeadRowCellResize header={header} />
			)}
		</DataGridTableHeadRowCell>
	);
}

function DataGridTableBodyRowDraggable<TData>({ row }: { row: Row<TData> }) {
	const {
		attributes,
		isDragging,
		listeners,
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
		<DataGridTableBodyRow row={row} dndRef={setNodeRef} dndStyle={style}>
			{row
				.getVisibleCells()
				.map((cell: Cell<TData, unknown>, colIndex) => {
					return (
						<DataGridTableBodyRowCell
							cell={cell}
							key={colIndex}
							{...attributes}
							{...listeners}
						>
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

function DataGridTableDnD<TData extends { id: string }>() {
	const { table, props } = useDataGrid();

	const columnIds = useMemo(
		() => table.getState().columnOrder,
		[table.getState().columnOrder]
	);
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

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			if (props.tableLayout?.columnsDraggable) {
				const oldIndex = columnIds.indexOf(active.id as string);
				const newIndex = columnIds.indexOf(over.id as string);
				table.setColumnOrder(arrayMove(columnIds, oldIndex, newIndex));
			}
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]}
			onDragEnd={handleDragEnd}
		>
			<DataGridTableBase>
				<DataGridTableHead>
					{table
						.getHeaderGroups()
						.map((headerGroup: HeaderGroup<TData>, index) => (
							<DataGridTableHeadRow
								headerGroup={headerGroup}
								key={index}
							>
								<SortableContext
									items={columnIds}
									strategy={horizontalListSortingStrategy}
								>
									{headerGroup.headers.map(
										(header, index) => (
											<DataGridTableHeadRowCellDraggable
												header={header}
												key={index}
											/>
										)
									)}
								</SortableContext>
							</DataGridTableHeadRow>
						))}
				</DataGridTableHead>

				<DataGridTableBody>
					{props.tableLayout?.rowsDraggable ? (
						<SortableContext
							items={rowIds}
							strategy={verticalListSortingStrategy}
						>
							{table
								.getRowModel()
								.rows.map((row: Row<TData>, index) => (
									<DataGridTableBodyRowDraggable
										row={row}
										key={index}
									/>
								))}
						</SortableContext>
					) : (
						table
							.getRowModel()
							.rows.map((row: Row<TData>, index) => (
								<DataGridTableBodyRow row={row} key={index}>
									{row
										.getVisibleCells()
										.map(
											(
												cell: Cell<TData, unknown>,
												colIndex
											) => (
												<DataGridTableBodyRowCell
													cell={cell}
													key={colIndex}
												>
													{flexRender(
														cell.column.columnDef
															.cell,
														cell.getContext()
													)}
												</DataGridTableBodyRowCell>
											)
										)}
								</DataGridTableBodyRow>
							))
					)}
				</DataGridTableBody>
			</DataGridTableBase>
		</DndContext>
	);
}

export { DataGridTableDnD };
