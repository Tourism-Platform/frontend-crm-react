/** Компилируется только если T = never; используется для проверки покрытия enum бэка */
export type TAssertNever<T extends never> = T;
