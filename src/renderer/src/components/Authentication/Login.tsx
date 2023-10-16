import { useForm } from '@mantine/form'
import './Login.css'
import { TextInput, PasswordInput, Text, Paper, Button, Stack } from '@mantine/core'

export default function Login(props: { setIsAuthenticated: (arg0: boolean) => void }) {
  const setIsAuthenticated = props.setIsAuthenticated
  const form = useForm({
    initialValues: {
      Username: '',
      name: '',
      password: '',
      terms: true
    },

    validate: {
      password: (val) => (val.length <= 4 ? 'Password should include at least 5 characters' : null)
    }
  })

  return (
    <Paper
      styles={{
        root: { backgroundColor: 'black' }
      }}
      radius="md"
      p="xl"
      withBorder
      className="LoginPaper"
    >
      <Text
        size="2rem"
        fw={500}
        ta="center"
        variant="gradient"
        gradient={{ from: 'grape', to: 'cyan', deg: 90 }}
      >
        Pasal Management
      </Text>

      <form
        onSubmit={form.onSubmit(() => {
          window.ipcRender.invoke('login', form.values).then((res) => {
            const { success, message } = res
            if (success) {
              setIsAuthenticated(true)
            } else {
              alert(message)
            }
          })
        })}
      >
        <Stack p={20} mx={30} className="loginStack">
          <TextInput
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
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
            p={10}
            pb={0}
          />
          <Button type="submit" radius="xl">
            Log In
          </Button>
        </Stack>
      </form>
    </Paper>
  )
}
