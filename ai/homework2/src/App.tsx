import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { store } from './components/store';
import { UserManagement } from './components/user-management/user-management'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
          <div>
            <UserManagement />
          </div>
      </Provider>
    </BrowserRouter>
  )
}

export default App
