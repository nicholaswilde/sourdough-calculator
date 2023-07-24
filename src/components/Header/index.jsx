import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const Header = () => {
  const classes = useStyles();
  
  return (
    <AppBar role="banner" className={classes.root} position="fixed">
      <Container maxWidth="lg">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Sourdough Calculator
        </Typography>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          href="https://github.com/nicholaswilde/sourdough-calculator">
            <GitHub />
        </IconButton>
      </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
