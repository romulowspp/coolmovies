import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Movie from '../../../models/movie.interface';

interface MovieState {
  fetchData?: Movie[];
  fetchError?: string;
  isLoading: boolean;
}

const initialState: MovieState = {
  isLoading: false
};

export const slice = createSlice({
  initialState,
  name: 'movie',
  reducers: {
    fetch: (state) => {
      state.isLoading = true;
    },
    clearData: (state) => {
      state.fetchData = undefined;
    },
    loaded: (state, action: PayloadAction<{ data: Movie[] }>) => {
      state.fetchData = action.payload.data;
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
