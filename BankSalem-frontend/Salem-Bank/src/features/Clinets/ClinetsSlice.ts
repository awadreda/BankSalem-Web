import { addNewClient, getClients } from "../../Apis/ClinetsApi";
import { Client } from "../../Types/types";
import {
  createAsyncThunk,
  
  createSlice,
} from "@reduxjs/toolkit";

interface ClientState {
  clients: Client[];
  state: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  client:Client | null;
}

const initialState: ClientState = {
  clients: [],
  state: "idle",
  error: null,
  client:null
};

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    const response = await getClients();


    return response;
  }
);

export const addClinet = createAsyncThunk(
  "clients/addClinet",
  async (client: Client) => {
    const response = await addNewClient(client);
    console.log("response from ClinetSlice",response);
    return response;
  }
);



const ClinetSlice = createSlice({
  name: "clients",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.state = "idle";
        state.clients = action.payload;
     
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message || "failed To Fetch Data";
      }).addCase(addClinet.pending, (state) => {
        state.state = "loading";
      }).addCase(addClinet.fulfilled, (state, action) => {
        state.state = "idle";
      console.log( "action.payload : ", action.payload);
     
      }).addCase(addClinet.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message || "failed To Add New Clinet";
      });
  },
});





export default ClinetSlice.reducer;
