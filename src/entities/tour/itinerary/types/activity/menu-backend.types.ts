import type { MenuItem } from "@/shared/api";

/**
 * Backend menu-item shape for a food activity spec (contract 3.1).
 * `MenuItem` is shared between read (`details.spec.offerings[].menu[]`)
 * and write (`supply.inline.spec.offerings[].menu[]`).
 */
export type TActivityMenuItemBackend = MenuItem;
export type TActivityMenuItemInputBackend = MenuItem;
