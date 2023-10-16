import { ipcMain } from 'electron'
import db from './database'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { session } from 'electron'
async function insertSession(sessionId: string, userId: number, createdAt: number) {
  await new Promise((resolve, reject) => {
    const insertSessionSQL = 'INSERT INTO sessions (session_id, user_id,created_at) VALUES (?, ?,?)'
    db.run(insertSessionSQL, [sessionId, userId, createdAt], (insertSessionErr) => {
      if (insertSessionErr) {
        console.error('Error inserting session into the database:', insertSessionErr.message)
        reject('Database insertion error')
      } else {
        console.log('Session inserted successfully')
        resolve({ success: true, message: 'Session inserted successfully' })
      }
    })
  })
}

export default function login() {
  ipcMain.handle('login', async (_, arg) => {
    const { Username, password } = arg
    const selectUserSQL = 'SELECT * FROM users WHERE username = ?'
    interface Row {
      user_id: number
      username: string
      password_hash: string
      user_type: string
    }

    try {
      const row = await new Promise<Row | null>((resolve, reject) => {
        db.get(selectUserSQL, [Username], (selectUserErr, row: Row) => {
          if (selectUserErr) {
            console.error('Error querying the database:', selectUserErr.message)
            reject('Database query error')
          } else {
            resolve(row as Row)
          }
        })
      })

      if (!row) {
        // Username not found
        console.log('Username not found')
        return { success: false, message: 'Username not found' }
      } else {
        const isPasswordValid = await bcrypt.compare(password, row.password_hash)
        if (!isPasswordValid) {
          // Incorrect password
          console.log('Incorrect password')
          return { success: false, message: 'Incorrect password' }
        } else {
          const sessionId = uuidv4()
          // const createdAt = Date.now()
          console.log('Login successful')
          // Successful login
          const cookie = {
            url: 'http://localhost',
            name: 'session',
            value: sessionId,
            expirationDate: Date.now() + 3600
          }
          session.defaultSession.cookies.set(cookie).then(
            () => {
              // success
            },
            (error) => {
              console.error(error)
            }
          )
          return {
            success: true,
            message: 'Login successful',
            usertype: row.user_type,
            sessionId: sessionId
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      return { success: false, message: 'An error occurred' }
    }
  })
}
