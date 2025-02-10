import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, CircularProgress, Typography
} from '@mui/material';

function ConfirmationMsg({ 
  open, 
  onClose, 
  onConfirm, 
  title = 'Confirm', 
  message = 'Are you sure?', 
  loading = false
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error" 
          disabled={loading}
        >
          {loading ? <CircularProgress size="1.5rem" /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationMsg;
