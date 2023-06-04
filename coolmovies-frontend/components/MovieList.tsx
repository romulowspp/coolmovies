import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Button,
  CircularProgress,
} from "@mui/material";
import { movieActions, useAppDispatch, useAppSelector } from "../redux";

const MovieList = () => {
  const dispatch = useAppDispatch();
  const movieState = useAppSelector((state) => state.movie);
  const movies = [
    {
      id: 1,
      title: "Star Wars",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81aA7hEEykL.jpg",
    },
    {
      id: 2,
      title: "Movie 2",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/d/d4/Rogue_One%2C_A_Star_Wars_Story_poster.png",
    },
  ];

  useEffect(() => {
    if (movieState.fetchData) return;

    dispatch(
      movieState.fetchData ? movieActions.clearData() : movieActions.fetch()
    );
  }, [movieState.fetchData, dispatch]);

  return (
    <Grid container spacing={3} sx={{ pb: 5, pt: 2 }}>
      {movieState?.isLoading ? (
        <CircularProgress />
      ) : (
        movieState?.fetchData?.map((movie) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                "&:hover": {
                  transform: "scale(1.01)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={movie.imgUrl}
                alt={movie.title}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography component="div" variant="h5">
                    {movie.title}
                  </Typography>
                  <Box>
                    <Button href={`/reviews/${movie.id}`} size="large">View Reviews</Button>
                    <Button size="large">Review</Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default MovieList;
