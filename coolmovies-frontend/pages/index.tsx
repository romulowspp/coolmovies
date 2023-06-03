import { css } from '@emotion/react';
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import type { NextPage } from 'next';
import { movieActions, useAppDispatch, useAppSelector } from '../redux';
import Navbar from '../components/Navbar';

const primary = '#1976d2';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const movieState = useAppSelector((state) => state.movie);
  return (
    <div css={styles.root}>
      <Container maxWidth="xl">
        <Navbar />

        <div css={styles.body}>
          <Container>
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
        </Container>

          <div css={styles.mainControls}>
            <Button
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
            </Button>
          </div>

          { movieState.fetchError && (
            <Alert severity="error">Error fetching movies!</Alert>
          )}

          { movieState.fetchData && (
            <Zoom in={Boolean(movieState.fetchData)} unmountOnExit mountOnEnter>
              <TextField
                css={styles.dataInput}
                multiline
                label={'Some Data'}
                defaultValue={JSON.stringify(movieState.fetchData)}
              />
            </Zoom>
          )}
        </div>
      </Container>
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
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderStyle: 'solid',
    height: '100vh',
    borderBottom: 0,
    borderTop: 0,
    borderWidth: 0.5,
    marginTop: 10,
    boxShadow: '5px 0 5px -5px rgba(0, 0, 0, 0.4), -5px 0 5px -5px rgba(0, 0, 0, 0.4)'
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
