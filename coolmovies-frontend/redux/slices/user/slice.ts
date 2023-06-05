import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Movie from '../../../models/movie.interface';
import User from '../../../models/user.interface';

export interface UserState {
  currentUser?: User;
  fetchError?: string;
  isLoading: boolean;
}

const initialState: UserState = {
  isLoading: false
};


export const slice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    fetch: (state) => {
      state.isLoading = true;
    },
    clearData: (state) => {
      state.currentUser = undefined;
    },
    loaded: (state, action: PayloadAction<{ data: User }>) => {
      state.currentUser = action.payload.data;
      state.isLoading = false;
    },
    loadError: (state) => {
      state.fetchError = 'Error Fetching :(';
      state.isLoading = false;
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
