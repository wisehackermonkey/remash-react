import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

 import socketIOClient from "socket.io-client";
 
 
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
  
  const ENDPOINT = "http://127.0.0.1:4001";
function App() {

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

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
                value={response }
                rows={4}
                onChange={(e)=>setResponse(e.target.value)}
              />
            </Stack>
          </Paper>
        </Container>
      </Box>

    </>
  );
}

export default App;



//   return (
//     <p>
//       It's <time dateTime={response}>{response}</time>
//     </p>
//   );
// }

// export default App;