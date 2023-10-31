import { useState } from 'react'
import UserButton from './UserButton'
import useAuth from '../Authentication/useAuth'
import {
  IconFingerprint,
  IconKey,
  IconSettings,
  IconReceipt2,
  IconLogout
} from '@tabler/icons-react'
import { AiOutlineHome } from 'react-icons/ai'
import { PiPackageDuotone } from 'react-icons/pi'
import { Group } from '@mantine/core'
import classes from './sidebar.module.css'
import { Link } from 'react-router-dom'
const data = [
  { link: '/', label: 'Home', icon: AiOutlineHome },
  { link: '/product', label: 'Products', icon: PiPackageDuotone },
  { link: '/user', label: 'User', icon: IconReceipt2 },
  { link: '/home', label: 'Purchase', icon: IconFingerprint },
  { link: '/sales', label: 'Sales', icon: IconKey }
]
export default function SideBar(props: any) { 
  const {active, setActive} = props
  const Auth = useAuth()
  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active ? true : undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Link>
  ))
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header}>
          <UserButton />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <Link to="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Settings</span>
        </Link>
        <Link to="/login" className={classes.link} onClick={() => Auth.setIsAuthenticated(false)}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  )
}
