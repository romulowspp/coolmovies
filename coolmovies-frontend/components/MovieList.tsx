import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Container, Button } from '@mui/material';

const MovieList = () => {
  const movies = [
    { id: 1, title: 'Star Wars', imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81aA7hEEykL.jpg' },
    { id: 2, title: 'Movie 2', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Rogue_One%2C_A_Star_Wars_Story_poster.png' },
  ];

  return (
    <Grid container spacing={3} sx={{ pb: 5}}>
      {movies.map((movie) => (
        <Grid key={movie.id} item xs={12} sm={6} md={4}>
          <Card sx={{ "&:hover": { transform: 'scale(1.01)', transition: 'all 0.3s ease-in-out' } }}>
            <CardMedia
              component="img"
              height="250"
              image={movie.imageUrl}
              alt={movie.title}
            />
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography component="div" variant="h5">
                  {movie.title}
                </Typography>
                <Box>
                  <Button size="large">View Reviews</Button>
                  <Button size="large">Review</Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;