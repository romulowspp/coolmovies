import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  SvgIcon,
  Typography,
} from "@mui/material";
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
      <Grid container spacing={2}>
        {movieReviewState?.fetchData?.map((review) => (
            <Grid key={review.id} item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: "16px" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    movies?.fetchData?.find(
                      (movie) => movie.id === review.movieId
                    )?.imgUrl
                  }
                  alt={
                    movies?.fetchData?.find(
                      (movie) => movie.id === review.movieId
                    )?.title
                  }
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {review.movieId
                      ? movies?.fetchData?.find(
                          (movie) => movie.id === review.movieId
                        )?.title
                      : ""}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {review.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Review by {review.userByUserReviewerId?.name}
                  </Typography>
                  <Typography variant="body2">{review.body}</Typography>
                  <Link shallow={true} href={`/reviews/edit?id=${review.id}`}>
                    <SvgIcon>
                      <EditIcon />
                    </SvgIcon>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieReviews;
