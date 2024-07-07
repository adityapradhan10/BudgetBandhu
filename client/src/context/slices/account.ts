import { getCurrentUser } from "@/api/user.service";
import { AccountSlice, ActionError, User } from "@/common/types/interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AccountSlice = {
  loading: true,
  user: null,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk<User, void, ActionError>(
  "account/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user as User;
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
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default accountSlice.reducer;
