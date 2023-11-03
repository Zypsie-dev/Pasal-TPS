import { Button, Modal, NativeSelect, NumberInput, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { LuPackagePlus } from 'react-icons/lu'
export default function AddUserModal(props: any) {
  const { setUserData, UserData } = props
  const [opened, toggle] = useDisclosure(false)
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      user_type: 'user',
      contact_number: '',
      email: ''
    }
  })
  function handleModelClose() {
    toggle.close()
    form.reset()
  }
  return (
    <>
      <Button
        id="add"
        leftSection={<LuPackagePlus size={14} />}
        variant="default"
        onClick={toggle.open}
      >
        Add
      </Button>
      <Modal opened={opened} onClose={handleModelClose} centered title="Add User" size="sm">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            window.ipcRender.invoke('adduser', form.values).then((res: any) => {
              if (res) {
                notifications.show({
                  title: 'Success',
                  message: res.message,
                  color: 'green',
                  autoClose: 2000
                })
                toggle.close()
                form.reset()
                const updatedUserData = [...UserData, form.values]
                setUserData(updatedUserData)
              } else {
                notifications.show({
                  title: 'Error',
                  message: res.message,
                  color: 'red',
                  autoClose: 2000
                })
              }
            })
          }}
          className="addUser"
        >
          <TextInput
            label="User Name"
            placeholder="User Name"
            value={form.values.username}
            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
          />
          <NativeSelect
            label="User type"
            value={form.values.user_type}
            description="Select user type"
            data={['user', 'admin']}
            onChange={(event) => form.setFieldValue('user_type', event.currentTarget.value)}
          />
          <TextInput
            label="Contact Number"
            placeholder="Contact Number"
            value={form.values.contact_number}
            onChange={(event) => form.setFieldValue('contact_number', event.currentTarget.value)}
          />
          <TextInput
            label="Email"
            placeholder="Email"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
          />
          <Button type="submit" variant="light">
            <LuPackagePlus size={14} /> Add
          </Button>
        </form>
      </Modal>
    </>
  )
}
