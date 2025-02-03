import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Deposit_WithDraw_Request,
  Transaction,
  TransferRequest,
} from "../../Types/types";
import {
  DepositeApi,
  getTransactionsApi,
  TransferApi,
  WithDrawApi,
} from "../../Apis/TransactionsApis";

interface TransState {
  transactions: Transaction[];
  state: "idle" | "loading" | "failed";
  error: string | null;
  transaction: Transaction | null;
}

const initialState: TransState = {
  transactions: [],
  state: "idle",
  error: null,
  transaction: null,
};

export const fetchTransactionsSlice = createAsyncThunk(
  "Transactions/fetchTransactionsSlice",
  async () => {
    const response = await getTransactionsApi();
    console.log("response from TransSlice", response);
    return response;
  }
);

export const DepositeSlice = createAsyncThunk(
  "Transactions/DepositeSlice",
  async (Dreq: Deposit_WithDraw_Request) => {
    const response = await DepositeApi(Dreq);
    console.log("response from TransSlice", response);
    return response;
  }
);

export const WithDrawSlice = createAsyncThunk(
  "Transactions/WithDrawSlice",
  async (Wreq: Deposit_WithDraw_Request) => {
    const response = await WithDrawApi(Wreq);
    console.log("response from TransSlice", response);
    return response;
  }
);

export const TransFerSclie = createAsyncThunk(
  "Transactions/TransFerSclie",
  async (Treq: TransferRequest) => {
    const response = await TransferApi(Treq);
    console.log("response from TransSlice", response);
    return response;
  }
);

const TransSclie = createSlice({
  name: "Transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsSlice.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchTransactionsSlice.fulfilled, (state, action) => {
        state.state = "idle";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsSlice.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message || "failed To Fetch Data";
      })
      .addCase(DepositeSlice.pending, (state) => {
        state.state = "loading";
      })
      .addCase(DepositeSlice.fulfilled, (state, action) => {
        state.state = "idle";
        state.transaction = action.payload;
      })
      .addCase(DepositeSlice.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message || "failed To Fetch Data";
      })
      .addCase(WithDrawSlice.pending, (state) => {
        state.state = "loading";
      })
      .addCase(WithDrawSlice.fulfilled, (state, action) => {
        state.state = "idle";
        state.transaction = action.payload;
      })
      .addCase(WithDrawSlice.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message || "failed To Fetch Data";
      })
      .addCase(TransFerSclie.pending, (state) => {
        state.state = "loading";
      })
      .addCase(TransFerSclie.fulfilled, (state, action) => {
        state.state = "idle";
        state.transaction = action.payload;
      })
      .addCase(TransFerSclie.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error.message || "failed To Fetch Data";
      });
  },
});



export default TransSclie.reducer;