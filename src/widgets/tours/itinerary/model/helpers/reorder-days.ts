import { arrayMove } from "@dnd-kit/sortable";
import type { TOptionsData } from "../types";

export function reorderDaysInData(
    optionsData: TOptionsData,
    optionId: number,
    activeDay: number,
    overDay: number
): TOptionsData {
    const copy = { ...optionsData };
    const current = copy[optionId];
    if (current) {
        const oldIndex = current.dayOrder.indexOf(activeDay);
        const newIndex = current.dayOrder.indexOf(overDay);
        if (oldIndex !== -1 && newIndex !== -1) {
            current.dayOrder = arrayMove(current.dayOrder, oldIndex, newIndex);
            copy[optionId] = { ...current };
        }
    }
    return copy;
}
