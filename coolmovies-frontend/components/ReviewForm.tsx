import React from 'react';
import { TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { movieReviewActions, useAppDispatch, useAppSelector } from '../redux';
import { useRouter } from 'next/router';

function ReviewForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const [review, setReview] = React.useState({
    title: '',
    body: '',
    rating: 1,
    userReviewerId: userState.currentUser?.id,
    movieId: "70351289-8756-4101-bf9a-37fc8c7a82cd",
  });

  const handleChange = (event: any) => {
    console.log(userState.currentUser?.id);
    setReview({
      ...review,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    dispatch(movieReviewActions.create({movieReview: review }));
    dispatch(movieReviewActions.fetch());

    router.push(`/reviews`);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
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
