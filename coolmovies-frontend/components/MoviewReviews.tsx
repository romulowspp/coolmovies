// MovieReviews.js
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const MovieReviews = () => {
  // Sample data
  const reviews = [
    { id: 1, movieTitle: 'Movie 1', reviewer: 'Reviewer 1', review: 'This movie was great!' },
    { id: 2, movieTitle: 'Movie 2', reviewer: 'Reviewer 2', review: 'I enjoyed this movie.' },
    { id: 3, movieTitle: 'Movie 3', reviewer: 'Reviewer 3', review: 'This movie was not good.' },
    // Add more reviews as needed
  ];

  return (
    <Box sx={{ py: 2 }}>
      {reviews.map((review) => (
        <Box key={review.id} sx={{ mb: 2 }}>
          <Card sx={{ borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {review.movieTitle}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Review by {review.reviewer}
              </Typography>
              <Typography variant="body2">
                {review.review}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default MovieReviews;
