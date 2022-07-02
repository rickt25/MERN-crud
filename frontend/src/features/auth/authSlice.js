import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
}

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password);
      return { user: data };
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout", 
  async () => {
    await AuthService.logout();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(register.pending, (state, _) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.user = action.payload.user;
    });
    builder.addCase(register.rejected, (state, _) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload.message;
    });
    builder.addCase(login.pending, (state, _) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log(action);
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.user = null;
      state.message = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, _) => {
      state.isLoading = false;
      state.isError = false;
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;