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

const createMovieReviewQuery = gql`
  mutation
    createMovieReview($title: String!, $body: String!, $rating: Int!, $movieId: String!, $userReviewerId: String!)
    {
      createMovieReview(title: $title, body: $body, rating: $rating, movieId: $movieId, userReviewerId: $userReviewerId) {
        id
        title
        body
        rating
        movieId
        userReviewerId
      }
    }
  `;

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
