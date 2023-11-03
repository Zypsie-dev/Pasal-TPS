import { Outlet } from 'react-router-dom'
import SideBar from './Sidebar/SideBar'

export default function Layout() {
  return (
    <>
      <SideBar/>
      <Outlet />
    </>
  )
}
