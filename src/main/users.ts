import { ipcMain } from 'electron'
import db from './database'
import bcrypt from 'bcrypt'
export default function users() {
  ipcMain.handle('getusers', async () => {
    const getUsersSQL = 'SELECT * FROM users'
    const users = await new Promise((resolve, reject) => {
      db.all(getUsersSQL, [], (err, rows) => {
        if (err) {
          console.error('Error getting users from the database:', err.message)
          reject('Database query error')
        } else {
          resolve(rows)
        }
      })
    })
    return users
  })
  ipcMain.handle('deleteuser', async (_, args) => {
    const idsToDelete = args
    const deleteSQL = 'DELETE FROM users WHERE user_id = ?'
    await Promise.all(
      idsToDelete.map(async (userId) => {
        await new Promise((resolve, reject) => {
          db.run(deleteSQL, [userId], (err) => {
            if (err) {
              console.error(`Error deleting user ${userId} from the database:`, err.message)
              reject('Database query error')
            } else {
              console.log(`Deleted user ${userId}`)
              resolve(true)
            }
          })
        })
      })
    )
    return true
  })
  ipcMain.handle('adduser', async (_, args) => {
    console.log(args)
    const { username, email, password, user_type, contact_number } = args
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    const insertSQL =
      'INSERT INTO users (username, password_hash,user_type,contact_number,email) VALUES (?, ?, ?,?,?)'
    await new Promise((resolve, reject) => {
      db.run(insertSQL, [username, hash, user_type, contact_number, email], (err) => {
        if (err) {
          console.error('Error inserting user into the database:', err.message)
          reject('Database query error')
        } else {
          console.log('Inserted user into the database')
          resolve(true)
        }
      })
    })
    return true
  })
}
