import UserButton from './UserButton'
import useAuth from '../Authentication/useAuth'
import {
  IconSettings,
  IconLogout
} from '@tabler/icons-react'
import { Group } from '@mantine/core'
import classes from './sidebar.module.css'
import { Link } from 'react-router-dom'
import { data } from './Links'
export default function SideBar() { 
  const Auth = useAuth()
  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === Auth.active ? true : undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        Auth.setActive(item.label)
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
