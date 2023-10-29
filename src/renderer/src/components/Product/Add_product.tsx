import { Button, Modal, NumberInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { LuPackagePlus } from 'react-icons/lu'
export default function AddProduct(props: any) {
  const { setProductData, ProductData } = props
  const [opened, toggle] = useDisclosure(false)
  const form = useForm({
    initialValues: {
      name: '',
      sell_price: 0,
      cost_price: 0,
      stock_quantity: 0,
      description: ''
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
      <Modal opened={opened} onClose={handleModelClose} centered title="Add product" size="md">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            window.ipcRender.invoke('addproduct', form.values).then((res: any) => {
              if (res.success) {
                notifications.show({
                  title: 'Success',
                  message: res.message,
                  color: 'green',
                  autoClose: 2000
                })
                toggle.close()
                form.reset()
                const updatedProductData = [...ProductData, res.data]
                setProductData(updatedProductData)
                console.log(ProductData)
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
          className="addProduct"
        >
          <TextInput
            label="Product Name"
            placeholder="Product Name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          />
          <NumberInput
            label="Selling Price"
            placeholder="Selling Price"
            {...form.getInputProps('sell_price')}
            error={form.errors.password && 'Number only'}
          />
          <NumberInput
            label="Cost Price"
            placeholder="Cost Price"
            {...form.getInputProps('cost_price')}
          />
          <NumberInput
            label="Product Quantity"
            placeholder="Product Quantity"
            {...form.getInputProps('stock_quantity')}
          />
          <TextInput
            label="Product Description"
            placeholder="Product Description"
            value={form.values.description}
            onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
          />
          <Button type="submit" variant="light">
            <LuPackagePlus size={14} /> Add
          </Button>
        </form>
      </Modal>
    </>
  )
}
