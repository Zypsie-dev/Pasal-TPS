import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import classes from './UserButton.module.css'
import { useContext } from 'react'
import { UserContext } from '../../App'

export default function UserButton() {
  const { currentUser } = useContext(UserContext)
  const username = currentUser.username
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar radius="sm" size="md" color="--white-color">
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <div style={{ flex: 1 }}>
          <Text size="lg" fw={300}>
            {username.charAt(0).toUpperCase() + username.slice(1)}
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(10), height: rem(10) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  )
}
