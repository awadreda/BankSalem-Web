import {
  addNewClient,
  DeleteClientApi,
  FindClientByIdApi,
  getClients,
  UpdateClientApi,
} from "../../Apis/ClinetsApi";
import { Client } from "../../Types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ClientState {
  clients: Client[];
  state: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  client: Client | null;
}

const initialState: ClientState = {
  clients: [],
  state: "idle",
  error: null,
  client: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    accountNumber: "",
    pincode: "",
    accountBalance: 0,
  },
};

export const FindClientByIdClientSlice = createAsyncThunk(
  "clients/FindClientByIdClientSlice",
  async (clientID: number) => {
    const response = await FindClientByIdApi(clientID);
    console.log("response from ClinetSlice", response);
    return response;
  }
);

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
    console.log("response from ClinetSlice", response);
    return response.data;
  }
);

export const DeleteClientSliceFuction = createAsyncThunk(
  "clients/DeleteClientSliceFuction",
  async (ClientID: number) => {
    const response = await DeleteClientApi(ClientID);

    console.log("response from ClinetSlice", response);
    return response.data;
  }
);

export const UpdateClientSlice = createAsyncThunk(
  "clients/UpdateClientSlice",
  async (client: Client) => {
    const response = await UpdateClientApi(client);
    console.log("response from ClinetSlice", response);
    return response.data;
  }
);

const ClinetSlice = createSlice({
  name: "clients",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FindClientByIdClientSlice.pending, (state) => {
        state.state = "loading";
      })
      .addCase(FindClientByIdClientSlice.fulfilled, (state, action) => {
        state.state = "idle";
        state.client = action.payload;

        console.log("action.payload : ", action.payload);
      })
      .addCase(FindClientByIdClientSlice.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message || "failed To Fetch Data";
      })

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
      })
      .addCase(addClinet.pending, (state) => {
        state.state = "loading";
      })
      .addCase(addClinet.fulfilled, (state, action) => {
        state.state = "idle";
        console.log("action.payload : ", action.payload);
        state.client = action.payload;
      })
      .addCase(addClinet.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message || "failed To Add New Clinet";
      })
      .addCase(DeleteClientSliceFuction.pending, (state) => {
        state.state = "loading";
      })
      .addCase(DeleteClientSliceFuction.fulfilled, (state, action) => {
        state.state = "idle";
        console.log("action.payload : ", action.payload);
      })
      .addCase(DeleteClientSliceFuction.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message || "failed To Delete Clinet";
      }).addCase(UpdateClientSlice.pending, (state) => {
        state.state = "loading";
      }).addCase(UpdateClientSlice.fulfilled, (state, action) => {
        state.state = "idle";
        state.client = action.payload;
        console.log("action.payload : ", action.payload);
      }).addCase(UpdateClientSlice.rejected, (state, action) => { 
        state.state = "failed";
        state.error = action.error.message || "failed To Update Clinet"
      })
      
      ;
  },
});

export default ClinetSlice.reducer;
