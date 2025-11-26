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
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false }, // required for Hostinger
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




// function addSearchTagsColumn() {
//   const alterQuery = `
//     ALTER TABLE items 
//     ADD COLUMN search_tags TEXT NULL
//   `;

//   db.query(alterQuery, (err, results) => {
//     if (err) {
//       console.error("❌ Error adding search_tags column:", err);
//       return;
//     }
//     console.log("✅ search_tags column added successfully!");
//     console.log("Results:", results);
    
//     // Close the connection
//     db.end();
//   });
// }
// addSearchTagsColumn()


export default db;

