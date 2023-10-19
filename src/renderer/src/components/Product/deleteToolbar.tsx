import { MdDeleteOutline } from 'react-icons/md'
import { Button, NumberInput } from '@mantine/core'
import { useState } from 'react'
export async function handleRowDelete(
  selectedRows: any,
  displayData: any,
  deleteAmt: number,
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
      setProductData(products.data)
      alert('Product deleted successfully')
      return true
    } else {
      alert('Product deletion failed')
      return false
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const CustomDeleteToolbar = ({
  selectedRows,
  displayData,
  setSelectedRows,
  setProductData
}) => {
  const [deleteAmt, setdeleteAmt] = useState(1)
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
          handleRowDelete(selectedRows, displayData, deleteAmt, setProductData)
        }}
        leftSection={<MdDeleteOutline size={20} />}
      >
        Delete
      </Button>
    </div>
  )
}
