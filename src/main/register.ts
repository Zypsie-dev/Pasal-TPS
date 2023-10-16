import db from './database'
import bcrypt from 'bcrypt'
import { ipcMain } from 'electron'

export default function register() {
  ipcMain.handle('register', async (_, arg) => {
    const { username, password, usertype } = arg
    console.log('Registering user:', username, password, usertype)
    try {
      // Check if the user already exists
      const checkUserSQL = 'SELECT * FROM users WHERE username = ?'
      const existingUser = await new Promise((resolve, reject) => {
        db.get(checkUserSQL, [username], (checkUserErr, row) => {
          if (checkUserErr) {
            console.error('Error checking user in the database:', checkUserErr.message)
            reject('Database query error')
          } else {
            resolve(row)
          }
        })
      })

      if (existingUser) {
        // User already exists, return an error message to the frontend
        console.log('User already exists')
        return { success: false, message: 'User already exists' }
      } else {
        // User does not exist, proceed with registration
        const hashedPassword = await bcrypt.hash(password, 10)
        const insertUserSQL =
          'INSERT INTO users (username, password_hash, user_type) VALUES (?, ?, ?)'

        await new Promise((resolve, reject) => {
          db.run(insertUserSQL, [username, hashedPassword, usertype], (insertUserErr) => {
            if (insertUserErr) {
              console.error('Error inserting user into the database:', insertUserErr.message)
              reject('Database insertion error')
            } else {
              console.log('User registered successfully')
              resolve({ success: true, message: 'User registered successfully' })
            }
          })
        })

        return { success: true, message: 'User registered successfully' }
      }
    } catch (error) {
      console.error('Error:', error)
      return { success: false, message: 'An error occurred' }
    }
  })
}
