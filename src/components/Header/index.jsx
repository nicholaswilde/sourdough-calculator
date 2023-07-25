import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import Container from '@mui/material/Container';

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
          href="https://github.com/nicholaswilde/sourdough-calculator"
          size="large">
            <GitHub />
        </IconButton>
      </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
