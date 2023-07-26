import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="https://nicholaswilde.io/">
        Nicholas Wilde
      </Link>
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            bottom: 0,
            width: '100%',
            position: 'fixed',
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} sm={4}>
                <Copyright />
                <Typography variant="body2">
                  Made with React
                </Typography>
              </Grid>
              <Grid item sm={8}>
                <Box display="flex" justifyContent="flex-end">
                  <Link href="https://www.facebook.com/" color="inherit">
                    <Facebook />
                  </Link>
                  <Link href="https://www.twitter.com/" color="inherit">
                    <Twitter />
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
    </ThemeProvider>
  );
}
