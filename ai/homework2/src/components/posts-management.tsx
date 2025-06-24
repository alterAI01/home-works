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
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import type { SlideProps } from '@mui/material/Slide'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

interface PostsManagementProps {
  initialUserId?: number
}

function PostsManagement({ initialUserId }: PostsManagementProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [commentsError, setCommentsError] = useState<string | null>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const url = initialUserId
      ? `https://jsonplaceholder.typicode.com/posts?userId=${initialUserId}`
      : 'https://jsonplaceholder.typicode.com/posts'
    fetch(url)
      .then(res => res.json())
      .then((data: Post[]) => setPosts(data))
  }, [initialUserId])

  function handleOpenModal(post: Post) {
    setSelectedPost(post)
    setIsModalOpen(true)
    setComments([])
    setCommentsError(null)
    setIsLoadingComments(true)
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch comments')
        return res.json()
      })
      .then((data: Comment[]) => setComments(data))
      .catch(() => setCommentsError('Ошибка загрузки комментариев'))
      .finally(() => setIsLoadingComments(false))
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  const handleDelete = useCallback((id: number) => {
    setPosts(posts => posts.filter(post => post.id !== id))
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto p-2 sm:p-4">
      <div className="flex items-center gap-2 mb-2">
        {initialUserId ? (
          <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs font-semibold">
            Posts for user #{initialUserId}
            <button onClick={() => window.location.reload()} className="ml-2 text-blue-500 cursor-pointer hover:underline text-xs">Reset</button>
          </div>
        ) : (
          <div className="text-xs text-gray-500">All Posts</div>
        )}
      </div>
      <Typography variant="h4" gutterBottom className="text-lg sm:text-2xl">Posts</Typography>
      <div className="overflow-x-auto">
        <TableContainer component={Paper} className="w-full sm:min-w-[600px]">
          <Table size={isMobile ? 'small' : 'medium'} className="w-full">
            <TableHead>
              <TableRow>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">ID</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">Title</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-base">Body</TableCell>
                <TableCell align="right" className="whitespace-nowrap text-xs sm:text-base">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post: Post) => (
                <TableRow key={post.id} hover className="transition-colors duration-200">
                  <TableCell className="text-xs sm:text-base">{post.id}</TableCell>
                  <TableCell className="max-w-xs truncate text-xs sm:text-base" sx={{ cursor: 'pointer' }} onClick={() => handleOpenModal(post)}>{post.title}</TableCell>
                  <TableCell className="max-w-md truncate text-xs sm:text-base">{post.body}</TableCell>
                  <TableCell align="right" className="text-xs sm:text-base">
                    <IconButton aria-label="details" onClick={() => handleOpenModal(post)}>
                      <InfoIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" onClick={() => handleDelete(post.id)}>
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
        aria-labelledby="post-details-title"
        PaperProps={{ className: 'rounded-lg' }}
      >
        <DialogTitle id="post-details-title" className="flex items-center justify-between text-base sm:text-xl">
          <span>Post Details</span>
          <IconButton aria-label="close" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers className="p-2 sm:p-4">
          {selectedPost && (
            <div className="space-y-2 text-xs sm:text-base">
              <Typography variant="h6">{selectedPost.title}</Typography>
              <Typography>ID: {selectedPost.id}</Typography>
              <Typography>User ID: {selectedPost.userId}</Typography>
              <Typography>Body: {selectedPost.body}</Typography>
              <div className="mt-6">
                <Typography variant="subtitle1" className="mb-2">Comments</Typography>
                {isLoadingComments && <div className="text-center text-gray-500 py-2">Loading...</div>}
                {commentsError && <div className="text-center text-red-500 py-2">{commentsError}</div>}
                {!isLoadingComments && !commentsError && comments.length === 0 && (
                  <div className="text-center text-gray-400 py-2">No comments</div>
                )}
                <div className="max-h-60 overflow-y-auto space-y-3">
                  {comments.map(comment => (
                    <div key={comment.id} className="border rounded p-2 bg-gray-50 dark:bg-gray-800">
                      <div className="font-semibold text-sm">{comment.name} <span className="text-xs text-gray-500">({comment.email})</span></div>
                      <div className="text-sm mt-1">{comment.body}</div>
                    </div>
                  ))}
                </div>
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

export { PostsManagement } 