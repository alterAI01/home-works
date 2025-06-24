import { useEffect, useState, useCallback } from 'react'
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
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import type { SlideProps } from '@mui/material/Slide'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface TodosManagementProps {
  initialUserId?: number
}

function TodosManagement({ initialUserId }: TodosManagementProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const url = initialUserId
      ? `https://jsonplaceholder.typicode.com/todos?userId=${initialUserId}`
      : 'https://jsonplaceholder.typicode.com/todos'
    fetch(url)
      .then(res => res.json())
      .then((data: Todo[]) => setTodos(data))
  }, [initialUserId])

  function handleOpenModal(todo: Todo) {
    setSelectedTodo(todo)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedTodo(null)
  }

  const handleDelete = useCallback((id: number) => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto p-2 sm:p-4">
      <div className="flex items-center gap-2 mb-2">
        {initialUserId ? (
          <div className="inline-flex items-center bg-green-100 text-green-800 rounded px-2 py-1 text-xs font-semibold">
            Todos for user #{initialUserId}
            <button onClick={() => window.location.reload()} className="ml-2 text-green-500 cursor-pointer hover:underline text-xs">Reset</button>
          </div>
        ) : (
          <div className="text-xs text-gray-500">All Todos</div>
        )}
      </div>
      <Typography variant="h4" gutterBottom className="text-lg sm:text-2xl">Todos</Typography>
      <div className="overflow-x-auto">
        <TableContainer component={Paper} className="w-full sm:min-w-[600px]">
          <Table size={isMobile ? 'small' : 'medium'} className="w-full">
            <TableHead>
              <TableRow>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">ID</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">Title</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">Completed</TableCell>
                <TableCell align="right" className="whitespace-nowrap text-xs sm:text-base">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo: Todo) => (
                <TableRow key={todo.id} hover className="transition-colors duration-200">
                  <TableCell className="text-xs sm:text-base">{todo.id}</TableCell>
                  <TableCell className="max-w-xs truncate text-xs sm:text-base" sx={{ cursor: 'pointer' }} onClick={() => handleOpenModal(todo)}>{todo.title}</TableCell>
                  <TableCell className="text-xs sm:text-base">
                    <Checkbox checked={todo.completed} disabled color="success" />
                  </TableCell>
                  <TableCell align="right" className="text-xs sm:text-base">
                    <IconButton aria-label="details" onClick={() => handleOpenModal(todo)}>
                      <InfoIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" onClick={() => handleDelete(todo.id)}>
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
        aria-labelledby="todo-details-title"
        PaperProps={{ className: 'rounded-lg' }}
      >
        <DialogTitle id="todo-details-title" className="flex items-center justify-between text-base sm:text-xl">
          <span>Todo Details</span>
          <IconButton aria-label="close" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="p-2 sm:p-4">
          {selectedTodo && (
            <div className="space-y-2 text-xs sm:text-base">
              <Typography variant="h6">{selectedTodo.title}</Typography>
              <Typography>ID: {selectedTodo.id}</Typography>
              <Typography>User ID: {selectedTodo.userId}</Typography>
              <Typography>Completed: {selectedTodo.completed ? 'Yes' : 'No'}</Typography>
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

export { TodosManagement } 