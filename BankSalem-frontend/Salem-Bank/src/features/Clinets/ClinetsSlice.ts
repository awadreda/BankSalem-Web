import {
  addNewClient,
  DeleteClientApi,
  FindClientByEmailAndPINCODEApi,
  FindClientByIdApi,
  getClients,
  UpdateClientApi,
} from "../../Apis/ClinetsApi";
import { Client, ClientLogin } from "../../Types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ClientState {
  [x: string]: any;
  clients: Client[];
  state: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  client: Client | null;
  CurrentClient: Client | null;
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
  CurrentClient: null,
};

export const FindClientByIdClientSlice = createAsyncThunk(
  "clients/FindClientByIdClientSlice",
  async (clientID: number) => {
    const response = await FindClientByIdApi(clientID);
    console.log("response from ClinetSlice", response);
    return response;
  }
);

export const FindClientByEmailAndPINCODEClientSlice = createAsyncThunk(
  "clients/FindClientByEmailAndPINCODEClientSlice",
  async (clientLogin: ClientLogin) => {
    const response = await FindClientByEmailAndPINCODEApi(clientLogin);
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

      // Handle the pending state for finding a client by ID
      .addCase(FindClientByIdClientSlice.pending, (state) => {
        state.state = "loading"; // Set state to loading
      })
      // Handle the fulfilled state for finding a client by ID
      .addCase(FindClientByIdClientSlice.fulfilled, (state, action) => {
        state.state = "idle"; // Set state to idle
        state.client = action.payload; // Store the fetched client data

        console.log("action.payload : ", action.payload); // Log the fetched client data
      })
      // Handle the rejected state for finding a client by ID
      .addCase(FindClientByIdClientSlice.rejected, (state, action) => {
        state.state = "failed"; // Set state to failed
        state.error = action.error.message || "failed To Fetch Data"; // Store the error message
      })

      // Handle the pending state for finding a client by email and PINCODE
      .addCase(FindClientByEmailAndPINCODEClientSlice.pending, (state) => {
        state.state = "loading"; // Set state to loading
      })
      // Handle the fulfilled state for finding a client by email and PINCODE
      .addCase(FindClientByEmailAndPINCODEClientSlice.fulfilled, (state, action) => {
        state.state = "idle"; // Set state to idle
        state.CurrentClient = action.payload; // Store the fetched client data
      })  
      // Handle the rejected state for finding a client by email and PINCODE
      .addCase(FindClientByEmailAndPINCODEClientSlice.rejected, (state, action) => {
        state.state = "failed"; // Set state to failed
        state.error = action.error.message || "failed To Fetch Data"; // Store the error message
      })
        
      // Handle the pending state for fetching all clients
      .addCase(fetchClients.pending, (state) => {
        state.state = "loading"; // Set state to loading
      })
      // Handle the fulfilled state for fetching all clients
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.state = "idle"; // Set state to idle
        state.clients = action.payload; // Store the fetched clients data
      })
      // Handle the rejected state for fetching all clients
      .addCase(fetchClients.rejected, (state, action) => {
        state.state = "failed"; // Set state to failed
        state.error = action.error.message || "failed To Fetch Data"; // Store the error message
      })
      // Handle the pending state for adding a new client
      .addCase(addClinet.pending, (state) => {
        state.state = "loading"; // Set state to loading
      })
      // Handle the fulfilled state for adding a new client
      .addCase(addClinet.fulfilled, (state, action) => {
        state.state = "idle"; // Set state to idle
        console.log("action.payload : ", action.payload); // Log the added client data
        state.client = action.payload; // Store the added client data
      })
      // Handle the rejected state for adding a new client
      .addCase(addClinet.rejected, (state, action) => {
        state.state = "failed"; // Set state to failed
        state.error = action.error.message || "failed To Add New Clinet"; // Store the error message
      })
      // Handle the pending state for deleting a client
      .addCase(DeleteClientSliceFuction.pending, (state) => {
        state.state = "loading"; // Set state to loading
      })
      // Handle the fulfilled state for deleting a client
      .addCase(DeleteClientSliceFuction.fulfilled, (state, action) => {
        state.state = "idle"; // Set state to idle
        console.log("action.payload : ", action.payload); // Log the deleted client data
      })
      // Handle the rejected state for deleting a client
      .addCase(DeleteClientSliceFuction.rejected, (state, action) => {
        state.state = "failed"; // Set state to failed
        state.error = action.error.message || "failed To Delete Clinet"; // Store the error message
      })
      // Handle the pending state for updating a client
      .addCase(UpdateClientSlice.pending, (state) => {
        state.state = "loading"; // Set state to loading
      })
      // Handle the fulfilled state for updating a client
      .addCase(UpdateClientSlice.fulfilled, (state, action) => {
        state.state = "idle"; // Set state to idle
        state.client = action.payload; // Store the updated client data
        console.log("action.payload : ", action.payload); // Log the updated client data
      })
      // Handle the rejected state for updating a client
      .addCase(UpdateClientSlice.rejected, (state, action) => {
        state.state = "failed"; // Set state to failed
        state.error = action.error.message || "failed To Update Clinet"; // Store the error message
      });
  },
});

export default ClinetSlice.reducer;
