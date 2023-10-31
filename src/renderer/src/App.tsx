import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { useState, createContext, useContext, useEffect } from 'react'
import './App.css'
import { Notifications } from '@mantine/notifications'
import Product from './components/Product/product'
import Login from './components/Authentication/Login'
import Layout from './components/Layout'
import Home from './components/Home/Home'
import RequireAuth from './components/Authentication/RequireAuth'

interface Auth {
  currentUser: { username: string; usertype: string }
  setCurrentUser: React.Dispatch<React.SetStateAction<{ username: string; usertype: string }>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
const Auth = createContext({} as Auth)

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState({ username: '', usertype: '' })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <Auth.Provider value={{ currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated }}>
      <MantineProvider>
        <Notifications />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/product" element={<Product />} />
            </Route>
          </Route>
        </Routes>
      </MantineProvider>
    </Auth.Provider>
  )
}
export default App
export { Auth }
