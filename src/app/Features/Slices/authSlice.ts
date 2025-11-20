import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isHydrated: boolean;
}

const initialState: AuthState = {
  token: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
    hydrateAuth: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isHydrated = true;
    },
  },
});

export const { setToken, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;

