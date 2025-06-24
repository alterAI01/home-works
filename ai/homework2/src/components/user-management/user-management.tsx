import { useEffect, useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { setUsers, deleteUser, type User } from '../store/user'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useMediaQuery,
  Slide,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import type { SlideProps } from '@mui/material/Slide'

function UserManagement() {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state: { user: { users: User[] } }) => state.user.users)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((data: User[]) => dispatch(setUsers(data)))
  }, [dispatch])

  function handleOpenModal(user: User) {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const handleDelete = useCallback((id: number) => {
    dispatch(deleteUser(id))
  }, [dispatch])

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <TableContainer component={Paper} className="shadow-md rounded-lg">
        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell>Name / Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Company</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id} hover className="transition-colors duration-200">
                <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleOpenModal(user)}>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span>{user.address.city}, {user.address.street}</span>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.website}</a>
                </TableCell>
                <TableCell>{user.company.name}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="details" onClick={() => handleOpenModal(user)}>
                    <InfoIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="error" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' } as SlideProps}
        fullScreen={isMobile}
        aria-labelledby="user-details-title"
        PaperProps={{ className: 'rounded-lg' }}
      >
        <DialogTitle id="user-details-title" className="flex items-center justify-between">
          <span>User Details</span>
          <IconButton aria-label="close" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <div className="space-y-2">
              <Typography variant="h6">{selectedUser.name} ({selectedUser.username})</Typography>
              <Typography>Email: {selectedUser.email}</Typography>
              <Typography>Phone: {selectedUser.phone}</Typography>
              <Typography>Website: <a href={`http://${selectedUser.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedUser.website}</a></Typography>
              <Typography>Company: {selectedUser.company.name}</Typography>
              <Typography>CatchPhrase: {selectedUser.company.catchPhrase}</Typography>
              <Typography>Address: {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}, {selectedUser.address.zipcode}</Typography>
              <Typography>Geo: <a href={`https://www.google.com/maps?q=${selectedUser.address.geo.lat},${selectedUser.address.geo.lng}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View on Map</a></Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" variant="contained">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export { UserManagement } 