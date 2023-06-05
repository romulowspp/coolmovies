import { css } from '@emotion/react';
import {
  Box,
} from '@mui/material';
import type { NextPage } from 'next';
import MovieReviews from '../components/MoviewReviews';

const Home: NextPage = () => {
  return (
    <div css={styles.root}>
        <div css={styles.body}>
          <Box sx={{ display: 'flex' }}>
            <Box component="main" sx={{ flexGrow: 1 }}>
              <div css={styles.mainControls}>
                <MovieReviews />
              </div>
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
  mainControls: css({
    display: 'flex',
    alignItems: 'center',
    button: { marginRight: 16 },
  }),
};

export default Home;
