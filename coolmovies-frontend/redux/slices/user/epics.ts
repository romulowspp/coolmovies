import { gql } from '@apollo/client';
import { Epic, StateObservable, ofType } from 'redux-observable';
import { Observable, interval, of, from, filter, catchError, switchMap, throttle, mergeMap, tap } from 'rxjs';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';

export const currentUserAsyncEpic: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      console.log('fetching user')
      try {
        const result = await client.query({
          query: currentUserQuery,
        });
        return actions.loaded({ data: result.data.currentUser });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

const currentUserQuery = gql`
  query {
    currentUser {
      id
      name
    }
  }
`;
