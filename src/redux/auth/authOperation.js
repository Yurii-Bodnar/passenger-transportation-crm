import { createAsyncThunk } from '@reduxjs/toolkit';
import { correctErrorMessage } from 'helpers/correctErrorMessage';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export const authRegister = createAsyncThunk(
  'auth/register',
  async (user, thunkApi) => {
    const auth = getAuth();
    const { name, email, password } = user;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      return {
        name,
        email: user.email,
        userId: user.uid,
      };
    } catch (error) {
      alert(correctErrorMessage(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const authLogin = createAsyncThunk(
  'auth/login',
  async (user, thunkApi) => {
    const auth = getAuth();
    const { email, password } = user;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return {
        name: user.displayName,
        email: user.email,
        password: user.password,
        userId: user.uid,
        token: user.accessToken,
      };
    } catch (error) {
      alert(correctErrorMessage(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
