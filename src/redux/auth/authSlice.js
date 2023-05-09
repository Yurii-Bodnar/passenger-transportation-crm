import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authRegister } from './authOperation';

const initialState = {
  user: {
    email: '',
    password: '',
    userName: '',
    id: null,
  },
  isLoading: false,
  token: null,
  error: '',
};

const pendingHandlerAuth = (state, action) => {
  state.isLoading = true;
  state.error = null;
};

const rejectedHandler = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    removeUser(state) {
      state.user.email = '';
      state.user.password = '';
      state.user.userName = '';
      state.user.id = null;
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(authRegister.pending, pendingHandlerAuth);
    builder.addCase(authRegister.rejected, rejectedHandler);
    builder.addCase(authRegister.fulfilled, (state, action) => {
      const { name, email, userId } = action.payload;
      console.log(action, '<==action');
      state.user = {
        userName: name,
        email,
        id: userId,
      };
      state.isLoading = false;
    });
    builder.addCase(authLogin.pending, pendingHandlerAuth);
    builder.addCase(authLogin.rejected, rejectedHandler);
    builder.addCase(authLogin.fulfilled, (state, action) => {
   
      console.log('action', action);
      state.user = {
        email: action.payload.email,
        password: action.payload.password,
        id: action.payload.id,
        userName: action.payload.name,
      };
      state.token = action.payload.token;
      state.isLoading = false;
    });
  },
});

export const { removeUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
