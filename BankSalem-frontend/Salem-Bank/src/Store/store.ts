import { configureStore } from "@reduxjs/toolkit";
import ClientsReducer from "../features/Clinets/ClinetsSlice";
import TransactionsReducer from "../features/Transactions/TransSlice";
import UsersReducer from "../features/Users/UsersSlice";

const store = configureStore({
  reducer: {
    clients: ClientsReducer,
    Transactions: TransactionsReducer,
    users: UsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
