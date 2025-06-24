import { useEffect, useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from './store'
import { setUsers, deleteUser, type User } from './store/user'
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

interface UserManagementProps {
  onNavigateToPosts?: (userId: number) => void
  onNavigateToTodos?: (userId: number) => void
}

function UserManagement({ onNavigateToPosts, onNavigateToTodos }: UserManagementProps) {
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
    <div className="w-full max-w-5xl mx-auto p-2 sm:p-4">
      <Typography variant="h4" gutterBottom className="text-lg sm:text-2xl">User Management</Typography>
      <div className="overflow-x-auto">
        <TableContainer component={Paper} className="w-full sm:min-w-[600px]">
          <Table size={isMobile ? 'small' : 'medium'} className="w-full">
            <TableHead>
              <TableRow>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">Name / Email</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">Address</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">Phone</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">Website</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">Company</TableCell>
                <TableCell align="right" className="whitespace-nowrap text-xs sm:text-base">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: User) => (
                <TableRow key={user.id} hover className="transition-colors duration-200">
                  <TableCell sx={{ cursor: 'pointer' }} onClick={() => handleOpenModal(user)} className="text-xs sm:text-base">
                    <div className="flex flex-col">
                      <span className="font-bold">{user.name}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs sm:text-base">
                    <span>{user.address.city}, {user.address.street}</span>
                  </TableCell>
                  <TableCell className="text-xs sm:text-base">{user.phone}</TableCell>
                  <TableCell className="text-xs sm:text-base">
                    <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.website}</a>
                  </TableCell>
                  <TableCell className="text-xs sm:text-base">{user.company.name}</TableCell>
                  <TableCell align="right" className="text-xs sm:text-base">
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
      </div>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' } as SlideProps}
        fullScreen={isMobile}
        aria-labelledby="user-details-title"
        PaperProps={{ className: 'rounded-lg' }}
      >
        <DialogTitle id="user-details-title" className="flex items-center justify-between text-base sm:text-xl">
          <span>User Details</span>
          <IconButton aria-label="close" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="p-2 sm:p-4">
          {selectedUser && (
            <div className="space-y-2 text-xs sm:text-base">
              <Typography variant="h6">{selectedUser.name} ({selectedUser.username})</Typography>
              <Typography>Email: {selectedUser.email}</Typography>
              <Typography>Phone: {selectedUser.phone}</Typography>
              <Typography>Website: <a href={`http://${selectedUser.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedUser.website}</a></Typography>
              <Typography>Company: {selectedUser.company.name}</Typography>
              <Typography>CatchPhrase: {selectedUser.company.catchPhrase}</Typography>
              <Typography>Address: {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}, {selectedUser.address.zipcode}</Typography>
              <Typography>Geo: <a href={`https://www.google.com/maps?q=${selectedUser.address.geo.lat},${selectedUser.address.geo.lng}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View on Map</a></Typography>
              <div className="flex gap-2 mt-4">
                {onNavigateToPosts && (
                  <Button variant="outlined" color="primary" onClick={() => { setIsModalOpen(false); onNavigateToPosts(selectedUser.id) }}>View Posts</Button>
                )}
                {onNavigateToTodos && (
                  <Button variant="outlined" color="secondary" onClick={() => { setIsModalOpen(false); onNavigateToTodos(selectedUser.id) }}>View Todos</Button>
                )}
              </div>
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