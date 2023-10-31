import { Outlet } from 'react-router-dom'
import SideBar from './Sidebar/SideBar'
import { useState } from 'react'

export default function Layout() {
  const [active, setActive] = useState('Home')
  return (
    <>
      <SideBar active={active} setActive={setActive} />
      <Outlet />
    </>
  )
}
