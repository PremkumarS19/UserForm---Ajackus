import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, TablePagination } from '@mui/material';
import AppBarHeader from './components/AppBarHeader';
import UsersInformation from './components/UsersInformation';
import UserForm from './components/UserForm';
import ConfirmationMsg from './components/ConfirmationMsg';
import ErrorAlertMsg from './components/ErrorAlertMsg';

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from './services/userService';

function App() {
  // State for user data
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // State for form (create/edit)
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // State for delete confirmation
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);            
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch initial users on mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  // ----- CREATE -----
  const handleAddUser = () => {
    setSelectedUser(null);
    setFormOpen(true);
  };
  const handleCreateUser = async (formData) => {
    try {
      setFormLoading(true);
      await createUser(formData);
      // JSONPlaceholder won't persist, so we just simulate:
      const newUser = { id: Date.now(), ...formData };
      setUsers((prev) => [newUser, ...prev]);  // Add at the beginning
      setFormOpen(false);
    } catch (err) {
      setError('Error creating user');
    } finally {
      setFormLoading(false);
    }
  };

  // ----- EDIT -----
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormOpen(true);
  };
  const handleUpdateUser = async (formData) => {
    if (!selectedUser) return;
    try {
      setFormLoading(true);
      await updateUser(selectedUser.id, formData);
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, ...formData } : u))
      );
      setFormOpen(false);
      setSelectedUser(null);
    } catch (err) {
      setError('Error updating user');
    } finally {
      setFormLoading(false);
    }
  };

  // ----- DELETE -----
  const handleDeleteUser = (userId) => {
    setDeleteUserId(userId);
    setConfirmOpen(true);
  };
  const confirmDeleteUser = async () => {
    if (!deleteUserId) return;
    try {
      setDeleteLoading(true);
      await deleteUser(deleteUserId);
      setUsers((prev) => prev.filter((u) => u.id !== deleteUserId));
      setConfirmOpen(false);
      setDeleteUserId(null);
    } catch (err) {
      setError('Error deleting user');
    } finally {
      setDeleteLoading(false);
    }
  };

  // ----- PAGINATION -----
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const startIndex = page * rowsPerPage;
  const currentData = users.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div style={{ flexGrow: 1 }}>
      {/* TOP APP BAR */}
      <Header onAddUser={handleAddUser} />

      <Container sx={{ mt: 10 }}>
        {/* Error Alert */}
        <ErrorAlertMsg message={error} />

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {/* Data Table */}
            <UsersInformation
              users={currentData} 
              onEdit={handleEditUser} 
              onDelete={handleDeleteUser} 
            />

            {/* Table Pagination */}
            <TablePagination
              component="div"
              count={users.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]} 
            />
          </>
        )}
      </Container>

      {/* CREATE / EDIT Dialog */}
      <UserForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        existingUser={selectedUser}
        formLoading={formLoading}
      />

      {/* DELETE Confirmation Dialog */}
      <ConfirmationMsg
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDeleteUser}
        title="Confirm Deletion"
        message="Are you sure you want to delete this user?"
        loading={deleteLoading}
      />
    </div>
  );
}

export default App;
