import { AppDispatch, RootState } from "./Store/store";
import { useDispatch, useSelector } from "react-redux";


export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppdispatch = useDispatch.withTypes<AppDispatch>();