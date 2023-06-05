export { actions as userActions, default as userReducer } from './slice';
export type { UserState } from './slice';
import { combineEpics } from 'redux-observable';
import { currentUserAsyncEpic } from './epics';

export const userEpics = combineEpics(currentUserAsyncEpic);
