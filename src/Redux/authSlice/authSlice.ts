import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }: LoginPayload) => {
  const response = await axios.post<{ user: User, token: string }>('http://localhost:5000/api/auth/login', { email, password });
  const { token } = response.data;
  localStorage.setItem("token_dummy",JSON.stringify(token))
  return response.data;
});

export const register = createAsyncThunk(
    'auth/register',
    async ({ email, password }: { email: string, password: string }) => {
      await axios.post("http://localhost:5000/api/auth/register", { email, password });
    }
);
 
export const forgotPassword = createAsyncThunk(
    'auth/forgot-password',
    async ({ email }: { email: string }) => {
     const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
     return response.data;  
    }
);
  
export const resetPassword = createAsyncThunk(
    'auth/reset-password',
    async ({ email , password ,token}: { email: string | undefined, password:string ,token :string | null }) => {
      await axios.post("http://localhost:5000/api/auth/reset-password", { email, password ,token });
}
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },  
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Unknown error';
    });
  },
});               

export const { logout } = authSlice.actions;

export default authSlice.reducer;
