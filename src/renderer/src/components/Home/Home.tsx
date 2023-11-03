import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../Authentication/useAuth'
export default function Home() {
  const [shouldRedirect, setShouldRedirect] = React.useState(false)
  const Auth = useAuth()
  // Use useEffect to start the timer
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRedirect(true)
      Auth.setActive('Products')
    console.log(Auth.active)
    }, 1000)

    // Clean up the timer when the component unmounts
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="home-content">
      {shouldRedirect && <Navigate to="/product" replace={true} />}
    </div>
  )
}
