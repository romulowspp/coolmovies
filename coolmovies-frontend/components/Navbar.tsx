import { Button, Container, Typography, css } from "@mui/material";
import { useEffect, useState } from "react";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Link from "next/link";
import { movieActions, useAppDispatch, userActions } from "../redux";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => { };
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(userActions.fetch());
    dispatch(movieActions.fetch());
  }, [dispatch]);

  return (
    <Container maxWidth="xl" css={styles.navBar}>
      <MovieFilterIcon sx={{ fontSize: 30 }} />
      <Typography css={styles.logo} >
        {'EcoPortal'}
      </Typography>
      <Link
        css={styles.navItem}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        href={'/'}
        shallow={true}
      >
        HOME
      </Link>
      <Link
        css={styles.navItem}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        href={`/reviews`}
        shallow={true}
      >
        MY REVIEWS
      </Link>

    </Container>
  );
}

const styles = {
  logo: css({
    color: 'black',
    fontWeight: '400'
  }),
  navBar: css({
    background: 'white',
    color: 'black',
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    'padding-left': 20,
    borderRadius: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    boxShadow: 'none',
  }),
  navItem: css({
    color: 'black',
    paddingLeft: 20,
    ":hover": {
      opacity: '70%'
    }
  })
}

export default Navbar;
