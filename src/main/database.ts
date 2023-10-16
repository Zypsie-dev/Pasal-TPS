import sqlite3 from 'sqlite3'
const db_path = 'database'
const db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.log('Could not connect to database', err)
  } else {
    console.log('Connected to database')
  }
})
export default db
