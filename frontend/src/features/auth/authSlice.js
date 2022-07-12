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
  async (user, thunkAPI) => {
    try {
      const response = await AuthService.register(user);
      return response;
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
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      return response;
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
    // REGISTER REDUCER
    builder
      .addCase(register.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      });
    // LOGIN REDUCER
    builder
      .addCase(login.pending, (state, _) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload;
      })
    // LOGOUT REDUCER
    builder.addCase(logout.fulfilled, (state, _) => {
      state.isLoading = false;
      state.isError = false;
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;