import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();
// Create the connection
// const db = mysql.createConnection({
//   host: "localhost",   // WAMP default
//   user: "root",        // default MySQL user
//   password: "",        // set if you gave root a password
//   database: "db_ka",   // your database name,
//   port:3308
// });


// // Connect to database
// db.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed: ", err);
//     return;
//   }
//   console.log("✅ Connected to MySQL Database!");
// });




const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 5, // REDUCE THIS - 10 might be too high for shared hosting
  maxIdle: 5, // Maximum number of idle connections
  idleTimeout: 60000, // 60 seconds - close idle connections after 1 min
  queueLimit: 50, // Reasonable queue limit
  enableKeepAlive: true, // Keep connections alive
  keepAliveInitialDelay: 10000, // 10 seconds
  
  // Connection settings
  connectTimeout: 10000, // 10 second timeout
  ssl: { rejectUnauthorized: false },
  
  // IMPORTANT: Add these to manage connections better
  acquireTimeout: 10000, // Wait 10 seconds max for a connection
  multipleStatements: false, // Disable multiple statements for security
});

// Test the connection once
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database via pool!");
    connection.release();
  }
});







export default db;

