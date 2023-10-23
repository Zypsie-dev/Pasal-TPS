import { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button, Loader } from '@mantine/core'
import { LuPackagePlus } from 'react-icons/lu'
import { CustomDeleteToolbar } from './deleteToolbar'
import './product.css'
async function getProduct() {
  try {
    const result = await window.ipcRender.invoke('getproduct')
    return result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
export default function Product() {
  const [ProductData, setProductData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const columns = [
    {
      name: 'product_id',
      label: 'Id',
      options: {
        filter: true,
        sort: true,
        display: false
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true
      }
    },
    {
      name: 'cost_price',
      label: 'Cost Price',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: number) => `Rs ${value}`
      }
    },
    {
      name: 'sell_price',
      label: 'Sell Price',
      options: {
        filter: true,
        customBodyRender: (value: number) => `Rs ${value}`
      }
    },
    {
      name: 'stock_quantity',
      label: 'Stock Quantity',
      options: {
        filter: true
      }
    }
  ]
  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    pagination: true,
    selectableRows: 'single',
    selectableRowsHideCheckboxes: true,
    selectableRowsOnClick: true,
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      return (
        <CustomDeleteToolbar
          selectedRows={selectedRows}
          displayData={displayData}
          setSelectedRows={setSelectedRows}
          setProductData={setProductData}
        />
      )
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getProduct()
        setProductData(result.data)
      } catch (error) {
        console.error('Error in Home:', error)
      } finally {
        // Set loading state to false when data fetching is complete
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="content">
      <header>
        <h1>Product</h1>
        <Button id="add" leftSection={<LuPackagePlus size={14} />} variant="default">
          Add
        </Button>
      </header>
      {isLoading && <Loader color="white" type="oval" className="loader" />}
      {ProductData && (
        <MUIDataTable title={'Product'} data={ProductData} columns={columns} options={options} />
      )}
    </div>
  )
}
