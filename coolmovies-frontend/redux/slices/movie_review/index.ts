export { actions as movieReviewActions } from './slice';
export { default as movieReviewReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { movieRewviewsAsyncEpic, createMovieReviewAsyncEpic, updateMovieReviewAsyncEpic } from './epics';

export const moviesReviewEpics = combineEpics(movieRewviewsAsyncEpic, createMovieReviewAsyncEpic, updateMovieReviewAsyncEpic);
