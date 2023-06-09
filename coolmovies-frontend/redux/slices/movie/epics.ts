import { gql } from '@apollo/client';
import { Epic, StateObservable, ofType } from 'redux-observable';
import { Observable, interval, of, from, filter, catchError, switchMap, throttle, mergeMap, tap } from 'rxjs';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';

export const moviesAsyncEpic: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    throttle(() => interval(2000)),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: allMoviesQuery,
        });
        return actions.loaded({ data: result.data.allMovies.nodes });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

const allMoviesQuery = gql`
  query AllMovies {
    allMovies {
      nodes {
        id
        imgUrl
        movieDirectorId
        userCreatorId
        title
        releaseDate
        nodeId
        userByUserCreatorId {
          id
          name
          nodeId
        }
      }
    }
  }
`;
