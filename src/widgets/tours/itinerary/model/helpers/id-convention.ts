export const itemId = (id: string) => `item:${id}`;
export const templateId = (id: string) => `template:${id}`;
export const libraryId = (id: string) => `library:${id}`;
export const containerIdTrip = () => `container:tripDetails`;
export const containerIdDay = (day: number) => `container:day-${day}`;
export const columnId = (day: number) => `column:${day}`;

/** Valid Kanban drop targets for sidebar create sources (library / template). */
export const isValidKanbanDropTarget = (overId: string): boolean =>
	overId.startsWith("container:day-") ||
	overId.startsWith("item:") ||
	overId.startsWith("container:nested:") ||
	overId === containerIdTrip();
