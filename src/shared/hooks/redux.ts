import { type TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
	type TAppDispatch,
	type TRootState
} from "@/app/providers/store/store";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
