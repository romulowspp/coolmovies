import { gql } from '@apollo/client';
import { Epic, StateObservable } from 'redux-observable';
import { Observable, interval } from 'rxjs';
import { filter, map, switchMap, throttle  } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';

export const movieRewviewsAsyncEpic: Epic = (
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
          query: allMovieReviewsQuery,
        });
        return actions.loaded({ data: result.data.allMovieReviews.nodes });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

const allMovieReviewsQuery = gql`
  query AllMovieReviews {
    allMovieReviews {
      nodes {
        id
        title
        body
        rating
        title
        movieId
        nodeId
      }
    }
  }
`;
