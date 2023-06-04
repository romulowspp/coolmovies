import { Button, Container, Typography, css } from "@mui/material";
import { useState } from "react";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

const Navbar = () => {
  const handleClick = () => { };
  const [open, setOpen] = useState(false);
  return (
    <Container maxWidth="xl" css={styles.navBar}>
      <MovieFilterIcon sx={{ fontSize: 30 }} />
      <Typography css={styles.logo} >
        {'EcoPortal'}
      </Typography>
      <Button
        css={styles.navItem}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        href={'/'}
      >
        HOME
      </Button>
      <Button
        css={styles.navItem}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        href={`/reviews`}
      >
        MY REVIEWS
      </Button>

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
