import Login from './components/Authentication/Login'
import Layout from './components/Layout/Layout'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import './App.css'
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
        <Router>
          <Routes>
            {!isAuthenticated && <Route path="/" element={<Login />} />}
            <Route
              path="/"
              element={
                <UserElement>
                  <Layout />
                </UserElement>
              }
            />
          </Routes>
        </Router>
      </MantineProvider>
    </UserContext.Provider>
  )
}
export default App
function UserElement({ children }) {
  const { currentUser } = useContext(UserContext)
  if (currentUser.usertype === 'admin') return <>{children}</>
  else return null
}
export { UserContext }
