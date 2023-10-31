import { Navigate, Outlet } from "react-router-dom"
import useAuth from "./useAuth"

export default function RequireAuth(props: any) {
  const allowedRoles = props.allowedRoles
  const auth = useAuth()
  return auth.isAuthenticated ? allowedRoles.includes(auth.currentUser.usertype)?<Outlet/>: <Navigate to="/" replace={true}/>: <Navigate to="/login" replace={true}/>
}