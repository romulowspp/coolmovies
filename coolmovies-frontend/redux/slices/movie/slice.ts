import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Movie from '../../../models/movie.interface';

interface MovieState {
  fetchData?: Movie[];
  fetchError?: string;
}

const initialState: MovieState = {};

export const slice = createSlice({
  initialState,
  name: 'movie',
  reducers: {
    fetch: () => {},
    clearData: (state) => {
      state.fetchData = undefined;
    },
    loaded: (state, action: PayloadAction<{ data: Movie[] }>) => {
      state.fetchData = action.payload.data;
    },
    loadError: (state) => {
      state.fetchError = 'Error Fetching :(';
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
