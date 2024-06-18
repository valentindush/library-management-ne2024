import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import { AuthProvider } from './utils/providers/authProvider'
import Register from './pages/auth/Register'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';

function App() {

  return (
    <MantineProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='*' element={<Home />}></Route>
            <Route path='/auth/login' element={<Login />}></Route>
            <Route path='/auth/register' element={<Register />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </MantineProvider>
  )
}


export default App
