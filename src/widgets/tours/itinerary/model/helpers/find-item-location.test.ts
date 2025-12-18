import { describe, expect, it } from "vitest";
import { findItemLocation } from "./find-item-location";
import { ENUM_EVENT } from "../types";

describe("findItemLocation", () => {
    const mockOptionsData = {
        1: {
            tripDetails: [
                {
                    id: "1",
                    block_id: "block-1",
                    event_type: ENUM_EVENT.FLIGHT,
                    title: "Flight"
                },
                {
                    id: "2",
                    block_id: "block-2",
                    event_type: ENUM_EVENT.MULTIPLY_OPTION,
                    title: "Options",
                    items: [
                        {
                            id: "2-1",
                            block_id: "block-2-1",
                            event_type: ENUM_EVENT.ACTIVITY,
                            title: "Nested Activity"
                        }
                    ]
                }
            ],
            days: {
                1: [
                    {
                        id: "3",
                        block_id: "block-3",
                        event_type: ENUM_EVENT.ACCOMMODATION,
                        title: "Hotel"
                    }
                ],
                2: [
                    {
                        id: "4",
                        block_id: "block-4",
                        event_type: ENUM_EVENT.MULTIPLY_OPTION,
                        title: "Day Options",
                        items: [
                            {
                                id: "4-1",
                                block_id: "block-4-1",
                                event_type: ENUM_EVENT.TRANSPORTATION,
                                title: "Nested Car"
                            }
                        ]
                    }
                ]
            },
            dayOrder: [1, 2]
        }
    } as any;

    it("should find an item in tripDetails", () => {
        const result = findItemLocation(mockOptionsData, "block-1");
        expect(result).toEqual({
            optionId: 1,
            location: "tripDetails",
            index: 0
        });
    });

    it("should find a nested item in tripDetails", () => {
        const result = findItemLocation(mockOptionsData, "block-2-1");
        expect(result).toEqual({
            optionId: 1,
            location: "tripDetails",
            index: 1,
            nestedIndex: 0
        });
    });

    it("should find an item in days", () => {
        const result = findItemLocation(mockOptionsData, "block-3");
        expect(result).toEqual({
            optionId: 1,
            location: "day",
            day: 1,
            index: 0
        });
    });

    it("should find a nested item in days", () => {
        const result = findItemLocation(mockOptionsData, "block-4-1");
        expect(result).toEqual({
            optionId: 1,
            location: "day",
            day: 2,
            index: 0,
            nestedIndex: 0
        });
    });

    it("should return null if item is not found", () => {
        const result = findItemLocation(mockOptionsData, "non-existent");
        expect(result).toBeNull();
    });
});
