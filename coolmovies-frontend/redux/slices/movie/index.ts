export { actions as movieActions, default as movieReducer } from './slice';
export type { MovieState } from './slice';
import { combineEpics } from 'redux-observable';
import { moviesAsyncEpic } from './epics';

export const moviesEpics = combineEpics(moviesAsyncEpic);
