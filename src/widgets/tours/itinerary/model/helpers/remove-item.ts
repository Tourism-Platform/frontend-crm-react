import type { TOptionsData } from "../types";

interface ItemLocation {
    optionId: number;
    location: "tripDetails" | "day";
    day?: number;
    index: number;
    nestedIndex?: number;
}

export function removeItemFromData(
    optionsData: TOptionsData,
    loc: ItemLocation
): TOptionsData {
    const resultData = { ...optionsData };
    const sourceOpt = { ...resultData[loc.optionId] };

    if (loc.location === "tripDetails") {
        const src = [...sourceOpt.tripDetails];
        if (loc.nestedIndex !== undefined) {
            const parent = { ...src[loc.index] };
            const nested = [...(parent.items || [])];
            nested.splice(loc.nestedIndex, 1);
            parent.items = nested;
            src[loc.index] = parent;
        } else {
            src.splice(loc.index, 1);
        }
        sourceOpt.tripDetails = src;
    } else {
        const dayNum = loc.day as number;
        const src = [...(sourceOpt.days[dayNum] || [])];
        if (loc.nestedIndex !== undefined) {
            const parent = { ...src[loc.index] };
            const nested = [...(parent.items || [])];
            nested.splice(loc.nestedIndex, 1);
            parent.items = nested;
            src[loc.index] = parent;
        } else {
            src.splice(loc.index, 1);
        }
        sourceOpt.days = {
            ...sourceOpt.days,
            [dayNum]: src
        };
    }
    resultData[loc.optionId] = sourceOpt;
    return resultData;
}
