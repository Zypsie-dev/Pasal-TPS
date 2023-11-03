import { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { Loader } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import AddUserModal from './AddUser'
import './User.css'

async function getUser() {
  try {
    const result = await window.ipcRender.invoke('getusers')
    return result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export default function Users() {
  const [Data, setData] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const columns = [
    {
      name: 'user_id',
      label: 'User id',
      options: {
        filter: true,
        sort: true,
        display: false
      }
    },
    {
      name: 'username',
      label: 'Name',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'user_type',
      label: 'User type',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'contact_number',
      label: 'Contact number',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: false
      }
    }
  ]
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getUser()
        setData(result)
      } catch (error) {
        console.error('Error in Users:', error)
      } finally {
        // Set loading state to false when data fetching is complete
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    pagination: true,
    selectableRows: 'single',
    selectableRowsHideCheckboxes: true,
    selectableRowsOnClick: true,
    onRowsDelete: async (rowsDeleted: any) => {
      const idsToDelete = rowsDeleted.data.map((d) => Data[d.dataIndex].user_id)
      console.log(idsToDelete)
      try {
        await window.ipcRender.invoke('deleteuser', idsToDelete).then(() => {
          notifications.show({
            title: 'Success',
            message: 'User deleted successfully',
            color: 'green',
            autoClose: 2000,
            className: 'notification'
          })
        })
        return true
      } catch (error: any) {
        console.error('Error in Home:', error)
        return false
      }
    }
  }
  return (
    <div className="content">
      <header>
        <h1>Users</h1>
        <AddUserModal UserData={Data} setUserData={setData}/>
      </header>

      {isLoading ? (
        <Loader color="white" type="oval" className="loader" />
      ) : Data ? (
        <MUIDataTable
          title={'Users list'}
          data={Data}
          setData={setData}
          columns={columns}
          options={options}
          className="userslist"
        />
      ) : null}
    </div>
  )
}
