import { AccountSlice, ActionError, User } from "@/common/interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AccountSlice = {
  loading: true,
  user: null,
  error: null,
};

export const getCurrentUser = createAsyncThunk<User, void, ActionError>(
  "account/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts/1");
      return {} as User;
    } catch (error) {
      return rejectWithValue({ message: (error as Error).message });
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCurrentUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default accountSlice.reducer;
