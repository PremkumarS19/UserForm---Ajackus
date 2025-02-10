import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UsersInformation({ users, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ my: 1 }} >
      <Table>
        <TableHead sx={{ backgroundColor: 'primary.main' }}>
          <TableRow>
            <TableCell sx={{ color: '#fff' }}>ID</TableCell>
            <TableCell sx={{ color: '#fff' }}>Name</TableCell>
            <TableCell sx={{ color: '#fff' }}>Username</TableCell>
            <TableCell sx={{ color: '#fff' }}>Email</TableCell>
            <TableCell sx={{ color: '#fff' }}>Street</TableCell>
            <TableCell sx={{ color: '#fff' }}>City</TableCell>
            <TableCell sx={{ color: '#fff' }}>Phone</TableCell>
            <TableCell sx={{ color: '#fff' }}>Website</TableCell>
            <TableCell sx={{ color: '#fff' }}>Company</TableCell>
            <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address?.street}</TableCell>
                <TableCell>{user.address?.city}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.website}</TableCell>
                <TableCell>{user.company?.name}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    size="small" 
                    onClick={() => onEdit(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => onDelete(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersInformation;
