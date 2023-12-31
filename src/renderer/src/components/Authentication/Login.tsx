/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useForm } from '@mantine/form'
import './Login.css'
import { TextInput, PasswordInput, Text, Paper, Button, Stack } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'
export default function Login() {
  const { setCurrentUser, setIsAuthenticated } = useAuth()
  const form = useForm({
    initialValues: {
      Username: '',
      name: '',
      password: ''
    },

    validate: {
      password: (val) => (val.length <= 4 ? 'Password should include at least 4 characters' : null)
    }
  })
  const Navigate = useNavigate()
  return (
    <div className="login">
      <Paper
        styles={{
          root: { backgroundColor: '#457b9d' }
        }}
        radius="md"
        p="xl"
        className="LoginPaper"
      >
        <Text size="1.8rem" fw={600} ta="center" variant="text" pb={10}>
          Pasal Management
        </Text>

        <form
          onSubmit={form.onSubmit(() => {
            window.ipcRender.invoke('login', form.values).then((res: any) => {
              const { success, message, usertype, username } = res
              if (success) {
                setIsAuthenticated(true)
                setCurrentUser({ username, usertype })
                Navigate('/')
                notifications.show({
                  title: 'Welcome',
                  message: username,
                  color: 'green',
                  autoClose: 2000,
                  className: 'notification'
                })
              } else {
                notifications.show({ title: 'Error', message, color: 'red', autoClose: 2000 })
              }
            })
          })}
        >
          <Stack p={20} mx={30} className="loginStack">
            <TextInput
              className="loginInput"
              required
              label="Username"
              placeholder="User"
              value={form.values.Username}
              onChange={(event) => form.setFieldValue('Username', event.currentTarget.value)}
              error={form.errors.Username && 'Invalid Username'}
              radius="md"
              p={10}
            />

            <PasswordInput
              required
              className="loginInput"
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 4 characters'}
              radius="md"
              p={10}
              pb={15}
            />
            <Button type="submit" radius="xl" color="#e63946">
              Log In
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  )
}
