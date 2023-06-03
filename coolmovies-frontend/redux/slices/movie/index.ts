export { actions as movieActions } from './slice';
export { default as movieReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { moviesAsyncEpic } from './epics';

export const moviesEpics = combineEpics(moviesAsyncEpic);
