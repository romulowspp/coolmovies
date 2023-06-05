import {
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  css,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import Link from "next/link";
import { movieActions, useAppDispatch, userActions } from "../redux";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(userActions.fetch());
    dispatch(movieActions.fetch());
  }, [dispatch]);

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const mobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link
        css={styles.navItem}
        id="basic-button"
        aria-haspopup="true"
        href={`/reviews`}
        shallow={true}
      >
        REVIEWS
      </Link>
      <Link
        css={styles.navItem}
        id="basic-button"
        aria-haspopup="true"
        href={`/reviews/add`}
        shallow={true}
      >
        ADD REVIEW
      </Link>
    </Drawer>
  );

  return (
    <Container maxWidth="xl" css={styles.navBar} style={{
      justifyContent: (isMobile ? "space-between" : "flex-start"),
    }}>
      <MovieFilterIcon sx={{ fontSize: 30 }} />
      <Typography css={styles.logo}>{"EcoPortal"}</Typography>
      {!isMobile && (
        <>
          <Link
            css={styles.navItem}
            id="basic-button"
            aria-haspopup="true"
            href={`/reviews`}
            shallow={true}
          >
            REVIEWS
          </Link>
          <Link
            css={styles.navItem}
            id="basic-button"
            aria-haspopup="true"
            href={`/reviews/add`}
            shallow={true}
          >
            ADD REVIEW
          </Link>
        </>
      )}
      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </IconButton>
      )}
      {mobileMenu}
    </Container>
  );
};

const styles = {
  logo: css({
    color: "black",
    fontWeight: "400",
  }),
  navBar: css({
    background: "white",
    color: "black",
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    padding: 5,
    "padding-left": 20,
    borderRadius: 0,
    borderWidth: 0,
    borderStyle: "solid",
    borderBottomWidth: 1,
    boxShadow: "none",
  }),
  navItem: css({
    color: "black",
    padding: 20,
    ":hover": {
      opacity: "70%",
    },
  }),
};

export default Navbar;
