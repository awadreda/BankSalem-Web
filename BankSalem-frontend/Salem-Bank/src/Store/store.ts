import { configureStore } from "@reduxjs/toolkit";
import ClientsReducer from "../features/Clinets/ClinetsSlice";


export  const store = configureStore({

  reducer :{ 
    clients: ClientsReducer
  }
})




export type RootState =  ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;





