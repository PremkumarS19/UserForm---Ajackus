import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress
} from '@mui/material';

function UserForm({ 
  open, 
  onClose, 
  onSubmit, 
  existingUser, 
  formLoading 
}) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    street: '',
    city: '',
    phone: '',
    website: '',
    company: '',
  });

  // For storing validation errors for each field
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingUser) {
      setFormData({
        name: existingUser.name || '',
        username: existingUser.username || '',
        email: existingUser.email || '',
        street: existingUser.address?.street || '',
        city: existingUser.address?.city || '',
        phone: existingUser.phone || '',
        website: existingUser.website || '',
        company: existingUser.company?.name || '',
      });
    } else {
      setFormData({
        name: '',
        username: '',
        email: '',
        street: '',
        city: '',
        phone: '',
        website: '',
        company: '',
      });
    }
    // Clear errors when dialog is opened fresh
    setErrors({});
  }, [existingUser, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic field-level validations
  const validateFields = () => {
    const newErrors = {};

    // Name validation (required)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Username validation (required)
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Email validation (required + format)
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      // Simple email pattern check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }
    
    setErrors(newErrors);
    // If we have any keys in newErrors, validation fails
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateFields();
    if (!isValid) {
      return; // don't submit if validation fails
    }

    // Construct object similar to JSONPlaceholder structure
    const finalData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      address: {
        street: formData.street,
        city: formData.city,
      },
      phone: formData.phone,
      website: formData.website,
      company: {
        name: formData.company,
      },
    };
    onSubmit(finalData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {existingUser ? 'Edit User' : 'Add New User'}
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Street"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
          <TextField
            label="Company Name"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={formLoading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={formLoading}
        >
          {formLoading ? <CircularProgress size="1.5rem" /> : 
           existingUser ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserForm;
