// Import the mysql2 module
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost', // Your MySQL host (e.g., localhost)
  user: 'root',      // Your MySQL username
  password: '2002@gansaiesh',  // Your MySQL password
  database: 'userdetails', // Your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function executeQuery(query, values = []) {
    try {
      const connection = await pool.getConnection();
      console.log(connection);
      const [rows, fields] = await connection.execute(query, values);
      console.log(rows)
      connection.release();
      return rows;
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  }

module.exports = {executeQuery};