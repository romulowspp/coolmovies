import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MovieReview from '../../../models/movie-review.interface';
import MovieReviewInput from '../../../models/movie-review-input.interface';

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
    create: (state, action: PayloadAction<{ movieReview: MovieReviewInput }>) => {},
    update: (state, action: PayloadAction<{ movieReview: MovieReviewInput }>) => {},
    upsert: (state, action: PayloadAction<{ movieReview: MovieReview }>) => {
      state.fetchData = state.fetchData?.map((movieReview) => {
        if (movieReview.id === action.payload.movieReview.id) {
          return action.payload.movieReview;
        }
        return movieReview;
      });
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
