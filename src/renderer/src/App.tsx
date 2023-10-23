import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import './App.css'
import { Notifications } from '@mantine/notifications'

import Product from './components/Product/product'
import Login from './components/Authentication/Login'
import SideBar from './components/Sidebar/SideBar'

interface UserContextType {
  currentUser: { username: string; usertype: string }
  setCurrentUser: React.Dispatch<React.SetStateAction<{ username: string; usertype: string }>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const UserContext = createContext({} as UserContextType)

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState({ username: '', usertype: '' })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated }}
    >
      <MantineProvider>
        <Notifications />
        <Router>
          {!isAuthenticated ? (
            <Navigate to="/login" />
          ) : currentUser.usertype === 'admin' ? (
            <Navigate to="/" />
          ) : (
            <Navigate to="/user" />
          )}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <AdminElement>
                  <SideBar />
                  <Product />
                </AdminElement>
              }
            />
          </Routes>
        </Router>
      </MantineProvider>
    </UserContext.Provider>
  )
}
export default App
function AdminElement({ children }) {
  const { currentUser } = useContext(UserContext)
  if (currentUser.usertype === 'admin') return <>{children}</>
  else return null
}
export { UserContext }
