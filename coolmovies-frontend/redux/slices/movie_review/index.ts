export { actions as movieReviewActions } from './slice';
export { default as movieReviewReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { movieRewviewsAsyncEpic } from './epics';

export const moviesReviewEpics = combineEpics(movieRewviewsAsyncEpic);
