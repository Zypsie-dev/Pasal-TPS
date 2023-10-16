import Login from './components/Authentication/Login'
import '@mantine/core/styles.css'
import { MantineProvider, createTheme } from '@mantine/core'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
const myTheme = createTheme({})
function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <MantineProvider theme={myTheme}>
      <Router>
        <Routes>
          {!isAuthenticated && (
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          )}
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}

function Home(): JSX.Element {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default App
