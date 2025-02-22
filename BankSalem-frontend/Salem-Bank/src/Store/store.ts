import { configureStore } from "@reduxjs/toolkit";
import ClientsReducer from "../features/Clinets/ClinetsSlice";
import TransactionsReducer from "../features/Transactions/TransSlice";
import UsersReducer from "../features/Users/UsersSlice";
import LogsReducer from "../features/Logs/LogsSlice";

const store = configureStore({
  reducer: {
    clients: ClientsReducer,
    Transactions: TransactionsReducer,
    users: UsersReducer,
    logs: LogsReducer,
  },
});

// console.log("Store configured successfully"); // Commented out for debugging
// console.error("Error configuring store"); // Error message remains uncommented

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
