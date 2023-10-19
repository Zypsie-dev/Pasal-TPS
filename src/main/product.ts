import { ipcMain } from 'electron'
import db from './database'
export default async function product() {
  const selectProductSQL = 'SELECT * FROM products'
  interface Row {
    product_id: number
    name: string
    cost_price: number
    sell_price: number
    description: string
    stock_quantity: number
  }
  ipcMain.handle('getproduct', async (_, arg) => {
    try {
      const row = await new Promise<Row | null>((resolve, reject) => {
        db.all(selectProductSQL, (selectProductErr, row: Row) => {
          if (selectProductErr) {
            console.error('Error querying the database:', selectProductErr.message)
            reject('Database query error')
          } else {
            resolve(row as Row)
          }
        })
      })
      return { success: true, message: 'Product found', data: row }
    } catch (error) {
      console.error(error)
      return { success: false, message: 'Error querying the database' }
    }
  })
}
ipcMain.handle('deleteproduct', async (event, args) => {
  const { idsToDelete, deleteAmt } = args

  try {
    const promises = idsToDelete.map((productId) => {
      return new Promise((resolve, reject) => {
        db.get(
          'SELECT stock_quantity FROM products WHERE product_id = ?',
          [productId],
          (error, row) => {
            if (error) {
              reject(error)
            } else {
              const currentStock = row.stock_quantity
              if (currentStock <= deleteAmt) {
                // Delete the product if the quantity is zero or less
                db.run('DELETE FROM products WHERE product_id = ?', [productId], (deleteError) => {
                  if (deleteError) {
                    reject(deleteError)
                  } else {
                    resolve(true) // Product deleted
                  }
                })
              } else {
                // Update the stock_quantity
                const newStock = currentStock - deleteAmt
                db.run(
                  'UPDATE products SET stock_quantity = ? WHERE product_id = ?',
                  [newStock, productId],
                  (updateError) => {
                    if (updateError) {
                      reject(updateError)
                    } else {
                      resolve(true) // Stock updated
                    }
                  }
                )
              }
            }
          }
        )
      })
    })

    // Wait for all promises to resolve
    const results = await Promise.all(promises)

    // Check if all operations were successful
    const success = results.every((result) => result === true)
    return {
      success,
      message: success ? 'Product deleted successfully' : 'Product deletion failed'
    }
  } catch (error) {
    console.error('Error:', error)
    return { success: false, message: 'An error occurred' }
  }
})
