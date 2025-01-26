import { AppDispatch, RootState } from "./Store/store";
import { useDispatch, useSelector } from "react-redux";

// Correctly typed useSelector hook
export const useAppSelector = useSelector.withTypes<RootState>();

// Correctly typed useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();
