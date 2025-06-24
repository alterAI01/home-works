import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { store } from './components/store';
import { UserManagement } from './components/user-management';
import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { PostsManagement } from './components/posts-management'
import { TodosManagement } from './components/todos-management'

function App() {
  const [tab, setTab] = useState(0);
  const [postsUserId, setPostsUserId] = useState<number | undefined>(undefined);
  const [todosUserId, setTodosUserId] = useState<number | undefined>(undefined);

  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setTab(newValue);
    if (newValue !== 1) setPostsUserId(undefined);
    if (newValue !== 2) setTodosUserId(undefined);
  }

  function handleNavigateToPosts(userId: number) {
    setPostsUserId(userId);
    setTab(1);
  }
  function handleNavigateToTodos(userId: number) {
    setTodosUserId(userId);
    setTab(2);
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Box className="w-full max-w-6xl mx-auto p-4">
          <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" className="mb-4">
            <Tab label="Users" />
            <Tab label="Posts" />
            <Tab label="Todos" />
          </Tabs>
          {tab === 0 && <UserManagement onNavigateToPosts={handleNavigateToPosts} onNavigateToTodos={handleNavigateToTodos} />}
          {tab === 1 && <PostsManagement initialUserId={postsUserId} />}
          {tab === 2 && <TodosManagement initialUserId={todosUserId} />}
        </Box>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
