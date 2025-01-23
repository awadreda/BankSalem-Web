import { getClients } from "../../Apis/ClinetsApi";
import { Client } from "../../Types/types";
import {
  createAsyncThunk,
  
  createSlice,
} from "@reduxjs/toolkit";

interface ClientState {
  clients: Client[];
  state: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  state: "idle",
  error: null,
};

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    const response = await getClients();

    return response.data;
  }
);

const ClinetSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message || "failed To Fetch Data";
      });
  },
});





export default ClinetSlice.reducer;
