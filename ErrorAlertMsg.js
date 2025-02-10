import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function ErrorAlertMsg({ message }) {
  if (!message) return null;
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
}

export default ErrorAlertMsg;
