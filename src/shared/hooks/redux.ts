import { type TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// `import type` стирается целиком; `import { type … }` при verbatimModuleSyntax
// оставляет рантайм-импорт store.ts и создаёт цикл shared → app → entities
import type { TAppDispatch, TRootState } from "@/app/providers/store/store";

export type { TAppDispatch, TRootState };

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
