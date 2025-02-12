import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../Types/types";
import {
  getAllUsersApi,
  getUserByIdApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../../Apis/UsersAPI";
interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  user: User;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
  user: {
    user_ID: 0,
    userName: "",
    password: "",
    permission: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await getAllUsersApi();
  console.log("response.data from getAllUsers Slice : ", response);
  return response;
});




export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: number) => {
    const response = await getUserByIdApi(id);
    return response;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (user: User) => {
    const response = await createUserApi(user);
    console.log("response.data from createUser Slice : ", response);
    return response;
  }
);


export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: User) => {
    const response = await updateUserApi(user.user_ID, user);
    return response;
  }

);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
      const response = await deleteUserApi(id);
      console.log("response.data from deleteUser Slice : ", response);
    return response;
  }
);
const UsersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getAllUsers cases
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading"; // Set loading state while fetching
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "idle"; // Request successful
        state.users = action.payload; // Update users array with fetched data
      })
      .addCase(getAllUsers.rejected, (state, action) => {   
        state.status = "failed"; // Request failed
        state.error = action.error.message || "failed To Fetch Users";
      })


      // Handle getUserById cases  
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload; // Update single user with fetched data
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "failed To Fetch User";
        console.log("action.error : ", action.error);
      })


      // Handle createUser cases
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload; // Set newly created user
      })
      .addCase(createUser.rejected, (state, action) => {
        console.log("action.error : ", action.error);
        state.error = action.error.message || "failed To Create User";
        state.status = "failed";
      })


      // Handle updateUser cases
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload; // Update user with modified data
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log("action.error : ", action.error);
        state.error = action.error.message || "failed To Update User";
        state.status = "failed";
      })


      // Handle deleteUser cases
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload; // Clear deleted user data
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.log("action.error : ", action.error);
        state.status = "failed";
        state.error = action.error.message || "failed To Delete User";
      });


  },
});



export default UsersSlice.reducer;
