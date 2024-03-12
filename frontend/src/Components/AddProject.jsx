import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function AddProduct() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project Details
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project Name
          </Typography>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project Description
          </Typography>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
    </Box>
  );
}
