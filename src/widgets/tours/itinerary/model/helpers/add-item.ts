import type { IDayItem, TOptionsData } from "../types";

interface TargetContainer {
    type: "tripDetails" | "day";
    day?: number;
    nestedIn?: number;
}

export function addItemToData(
    optionsData: TOptionsData,
    target: TargetContainer,
    toIndex: number,
    item: IDayItem,
    targetOptionId: number
): TOptionsData {
    const resultData = { ...optionsData };
    const targetOpt = { ...resultData[targetOptionId] };

    if (target.type === "tripDetails") {
        const trg = [...targetOpt.tripDetails];
        if (target.nestedIn !== undefined) {
            const parent = { ...trg[target.nestedIn] };
            const nested = [...(parent.items || [])];
            nested.splice(toIndex, 0, item);
            parent.items = nested;
            trg[target.nestedIn] = parent;
        } else {
            trg.splice(toIndex, 0, item);
        }
        targetOpt.tripDetails = trg;
    } else {
        const dayNum = target.day as number;
        const trg = [...(targetOpt.days[dayNum] || [])];
        if (target.nestedIn !== undefined) {
            const parent = { ...trg[target.nestedIn] };
            const nested = [...(parent.items || [])];
            nested.splice(toIndex, 0, item);
            parent.items = nested;
            trg[target.nestedIn] = parent;
        } else {
            trg.splice(toIndex, 0, item);
        }
        targetOpt.days = {
            ...targetOpt.days,
            [dayNum]: trg
        };
    }
    resultData[targetOptionId] = targetOpt;
    return resultData;
}
