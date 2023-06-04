import { css } from '@emotion/react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Zoom,
} from '@mui/material';
import type { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '../redux';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';

const Home: NextPage = () => {
  return (
    <div css={styles.root}>
        <div css={styles.body}>
          <Box sx={{ display: 'flex' }}>
            <Box component="main" sx={{ flexGrow: 1 }}>
              {/* <Container>
                {movieState?.isLoading ? (
                  <CircularProgress />
                ) : (
                  <List>
                    {movieState?.fetchData?.map(movie => (
                      <ListItem key={movie.id}>
                        <ListItemText
                          primary={movie.title}
                          secondary={`${movie.releaseDate} - Rating: ${movie.id}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Container> */}

              <div css={styles.mainControls}>
                <MovieList />
                {/* <Button
                  variant={'outlined'}
                  onClick={() =>
                    dispatch(
                      movieState.fetchData
                        ? movieActions.clearData()
                        : movieActions.fetch()
                    )
                  }
                >
                  {movieState.fetchData ? 'Hide some data' : 'Fetch some data'}
                </Button> */}
              </div>

              {/* {movieState.fetchError && (
                <Alert severity="error">Error fetching movies!</Alert>
              )}

              {movieState.fetchData && (
                <Zoom in={Boolean(movieState.fetchData)} unmountOnExit mountOnEnter>
                  <TextField
                    css={styles.dataInput}
                    multiline
                    label={'Some Data'}
                    defaultValue={JSON.stringify(movieState.fetchData)}
                  />
                </Zoom>
              )} */}
            </Box>
          </Box>
        </div>
    </div>
  );
};

const styles = {
  root: css({
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  body: css({
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 0,
  }),
  heading: css({ marginTop: 16, fontSize: '2.75rem', textAlign: 'center' }),
  subtitle: css({
    fontWeight: 300,
    textAlign: 'center',
    maxWidth: 600,
    margin: '24px 0',
    color: 'rgba(0, 0, 0, 0.6)',
  }),
  mainControls: css({
    display: 'flex',
    alignItems: 'center',
    button: { marginRight: 16 },
  }),
  dataInput: css({
    alignSelf: 'stretch',
    margin: '32px 0',
  }),
};

export default Home;
