import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import io from 'socket.io-client';

import {
  Stack,
  AppBar,
  Toolbar,
  Button,
  Container,
  Box, Paper,
  CssBaseline,
  TextField,
  Divider
} from '@mui/material';

function App() {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:4001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);


   return (
    <>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <AppBar position="absolute" open={false}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Remash v2
          </Typography>

        </Toolbar>
      </AppBar>
        <Container component="main" sx={{ mt: 32, mb: 10 }} maxWidth="sm">
          <Paper sx={{
            width: "600px",
            padding:"30px"
          }}>
            <Stack spacing={3}>
              <Button variant="contained">Sync</Button>
              <Divider></Divider>
              <TextField
                variant="standard"
                placeholder="Type here!"
                multiline
                rows={4}
              />
            </Stack>
          </Paper>
        </Container>
      </Box>

    </>
  );
}

export default App;
