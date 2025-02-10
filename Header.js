import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Header({ onAddUser }) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management Dashboard
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<AddCircleIcon />}
            onClick={onAddUser}
          >
            Add New User
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
