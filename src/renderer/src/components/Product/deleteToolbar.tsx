import { MdDeleteOutline } from 'react-icons/md'
import { Button, NumberInput, Group, Modal } from '@mantine/core'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks'

export async function handleRowDelete(
  selectedRows: any,
  displayData: any,
  deleteAmt: string | number,
  setProductData: Function
) {
  const idsToDelete = selectedRows.data.map((d: any) => displayData[d.dataIndex].data[0])
  try {
    const result = await window.ipcRender.invoke('deleteproduct', {
      idsToDelete,
      deleteAmt
    })
    if (result.success) {
      const products = await window.ipcRender.invoke('getproduct')
      if (!products) throw new Error(products.message)
      setProductData(products.data)
      notifications.show({
        title: 'Success',
        message: 'Successfully deleted',
        color: 'green',
        autoClose: 2000
      })
      return true
    } else {
      notifications.show({
        title: 'Error',
        message: result.message,
        color: 'green',
        autoClose: 2000
      })
      return false
    }
  } catch (error: any) {
    throw error
  }
}

export const CustomDeleteToolbar = ({
  selectedRows,
  displayData,
  setSelectedRows,
  setProductData
}) => {
  const [opened, toggle] = useDisclosure(false)
  const [deleteAmt, setdeleteAmt] = useState<string | number>(1)

  return (
    <div className="deleteButton">
      <NumberInput
        description="Stock Quantity"
        radius="md"
        size="xs"
        clampBehavior="strict"
        min={1}
        max={100}
        value={deleteAmt}
        onChange={setdeleteAmt}
      />
      <Button
        onClick={() => {
          toggle.open()
        }}
        leftSection={<MdDeleteOutline size={20} />}
      >
        Delete
      </Button>
      <Modal
        opened={opened}
        onClose={toggle.close}
        centered
        withCloseButton={false}
      >
        <div className='delete-dialog'>
          <h2>Are you sure you want to delete?</h2>
          <Group justify="flex-end" gap="sm" className="delbuttongrp">
            <Button
              onClick={() => {
                handleRowDelete(selectedRows, displayData, deleteAmt, setProductData)
                setSelectedRows([])
                toggle.close()
              }}
              color="#e63946"
            >
              Yes
            </Button>
            <Button onClick={toggle.close}>No</Button>
          </Group>
        </div>
      </Modal>
    </div>
  )
}
