import React, { useEffect } from "react";
import { Box, Card, CardContent, CardMedia, SvgIcon, Typography } from "@mui/material";
import {
  movieActions,
  movieReviewActions,
  useAppDispatch,
  useAppSelector,
} from "../redux";
import Link from "next/link";
import EditIcon from "../public/edit.svg";

const MovieReviews = () => {
  const dispatch = useAppDispatch();
  const movieReviewState = useAppSelector((state) => state.moviewReview);
  const movies = useAppSelector((state) => state.movie);

  useEffect(() => {
    if (movieReviewState.fetchData) {
      if (!movies.fetchData) {
        dispatch(movieActions.fetch());
      }
      return;
    }

    dispatch(
      movieReviewState.fetchData
        ? movieReviewActions.clearData()
        : movieReviewActions.fetch()
    );
  }, [movieReviewState.fetchData, dispatch, movies]);

  return (
    <Box sx={{ py: 2 }}>
      {movieReviewState?.fetchData?.map((review) => (
        <Box key={review.id} sx={{ mb: 2 }}>
          <Card sx={{ borderRadius: "16px" }}>
          <CardMedia
                component="img"
                height="140"
                image={movies?.fetchData?.find((movie) => movie.id === review.movieId)?.imgUrl}
                alt={movies?.fetchData?.find((movie) => movie.id === review.movieId)?.title}
              />
            <CardContent>
              <Typography variant="h5" component="div">
                {review.movieId
                  ? movies?.fetchData?.find(
                      (movie) => movie.id === review.movieId
                    )?.title
                  : ''}
              </Typography>
              <Typography variant="h6" component="div">
                {review.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Review by {review.userByUserReviewerId?.name}
              </Typography>
              <Typography variant="body2">{review.body}</Typography>
              <Link
                shallow={true}
                href={`/reviews/edit?id=${review.id}`}
              >
                <SvgIcon>
                <EditIcon/>
                </SvgIcon>
              </Link>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default MovieReviews;
