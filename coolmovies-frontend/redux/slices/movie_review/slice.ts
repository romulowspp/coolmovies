import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MovieReview from '../../../models/movie-review.interface';

interface MovieReviewState {
  fetchData?: MovieReview[];
  fetchError?: string;
  isLoading: boolean;
}

const initialState: MovieReviewState = {
  isLoading: false
};

export const slice = createSlice({
  initialState,
  name: 'movie_review',
  reducers: {
    fetch: (state) => {
      state.isLoading = true;
    },
    clearData: (state) => {
      state.fetchData = undefined;
    },
    loaded: (state, action: PayloadAction<{ data: MovieReview[] }>) => {
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
