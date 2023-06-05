import { gql } from '@apollo/client';
import { Epic, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap  } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';
import MovieReview from '../../../models/movie-review.interface';

export const movieRewviewsAsyncEpic: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      console.log('fetching')
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

export const createMovieReviewAsyncEpic: Epic = (
  action$: Observable<SliceAction['create']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.create.match),
    switchMap(async (action) => {
      console.log(action.payload.movieReview);
      try {
        const result = await client.mutate({
          mutation: gql`mutation {
            createMovieReview(input: {
              movieReview: {
                title: "${action.payload.movieReview.title}",
                body: "${action.payload.movieReview.body}",
                rating: ${action.payload.movieReview.rating},
                movieId: "${action.payload.movieReview.movieId}",
                userReviewerId: "${action.payload.movieReview.userReviewerId}"
              }})
            {
              movieReview {
                id
                title
                body
                rating
                movieId
                userByUserReviewerId {
                  id
                  name
                }
              }
            }
          }`,
        });
        console.log(result)
        return actions.loaded({ data: [...(state$.value.moviewReview.fetchData || []), result.data.createMovieReview.movieReview] });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

  export const updateMovieReviewAsyncEpic: Epic = (
    action$: Observable<SliceAction['update']>,
    state$: StateObservable<RootState>,
    { client }: EpicDependencies
  ) =>
    action$.pipe(
      filter(actions.update.match),
      switchMap(async (action) => {
        try {
          const result = await client.mutate({
            mutation: gql`mutation {
              updateMovieReviewById(input: {
                id: "${action.payload.movieReview.id}",
                movieReviewPatch: {
                  title: "${action.payload.movieReview.title}",
                  body: "${action.payload.movieReview.body}",
                  rating: ${action.payload.movieReview.rating},
                  movieId: "${action.payload.movieReview.movieId}",
                  userReviewerId: "${action.payload.movieReview.userReviewerId}"
                }})
              {
                movieReview {
                  id
                  title
                  body
                  rating
                  movieId
                  userByUserReviewerId {
                    id
                    name
                  }
                }
              }
            }`,
          });
          return actions.upsert({ movieReview: result.data.updateMovieReviewById.movieReview as MovieReview });
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
        userByUserReviewerId {
          id
          name
        }
      }
    }
  }
`;
