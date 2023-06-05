import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { movieReviewActions, useAppDispatch, useAppSelector } from "../redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";

function ReviewForm() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const reviewState = useAppSelector((state) => state.moviewReview);
  const movieState = useAppSelector((state) => state.movie);
  const [review, setReview] = React.useState({
    title: "",
    body: "",
    rating: 1,
    userReviewerId: userState.currentUser?.id,
    movieId: "",
  });
  let isEditMode = !!id;

  useEffect(() => {
    const review = reviewState.fetchData?.find((review) => review.id === id);
    const reviewData = {
      id: review?.id || "",
      title: review?.title || "",
      body: review?.body || "",
      rating: review?.rating || 1,
      userReviewerId: review?.userByUserReviewerId?.id || "",
      movieId: review?.movieId || "",
    };
    if (isEditMode && reviewData) {
      setReview(reviewData);
    }
  }, [isEditMode, id, reviewState.fetchData]);

  const handleChange = (event: any) => {
    setReview({
      ...review,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isEditMode) {
      // if we're in edit mode, update the review
      dispatch(movieReviewActions.update({ movieReview: review }));
    } else {
      // if we're not in edit mode, create a new review
      dispatch(movieReviewActions.create({ movieReview: review }));
    }

    dispatch(movieReviewActions.fetch());

    router.push(`/reviews`);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" component="div">
        Write a Review
      </Typography>
      <TextField
        required
        id="outlined-required"
        label="Title"
        name="title"
        value={review.title}
        onChange={handleChange}
        fullWidth
      />
      {!isEditMode && (
        <FormControl>
          <InputLabel id="movie-label">Movie</InputLabel>
          <Select
            labelId="movie-label"
            id="movieId"
            name="movieId"
            value={review.movieId}
            onChange={handleChange}
          >
            {movieState?.fetchData?.map((movie) => (
              <MenuItem key={movie.id} value={movie.id}>
                {movie.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <FormControl>
        <InputLabel id="rating-label">Rating</InputLabel>
        <Select
          labelId="rating-label"
          id="rating"
          name="rating"
          value={review.rating}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        id="outlined-multiline-static"
        label="Review Body"
        multiline
        rows={4}
        name="body"
        value={review.body}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
}

export default ReviewForm;
