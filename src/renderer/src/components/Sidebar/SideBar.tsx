import { useState, useContext } from 'react'
import UserButton from './UserButton'
import {
  IconFingerprint,
  IconKey,
  IconSettings,
  IconReceipt2,
  IconLogout
} from '@tabler/icons-react'
import { PiPackageDuotone } from 'react-icons/pi'
import { Group } from '@mantine/core'
import classes from './sidebar.module.css'
const data = [
  { link: '', label: 'Products', icon: PiPackageDuotone },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Stocks', icon: IconFingerprint },
  { link: '', label: 'Sales', icon: IconKey },
  { link: '', label: 'Users', icon: IconKey }
]
export default function SideBar() {
  const [active, setActive] = useState('Products')
  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
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
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Settings</span>
        </a>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}
