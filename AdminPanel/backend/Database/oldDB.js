// import mysql from "mysql2";

// // Create the connection
// const db1 = mysql.createConnection({
//   host: "localhost",   // WAMP default
//   user: "root",        // default MySQL user
//   password: "",        // set if you gave root a password
//   database: "db_ka",   // your database name,
//   port:3308
// });

// // Connect to database
// db1.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed: ", err);
//     return;
//   }
//   console.log("✅ Connected to MySQL old Database!");
// });




// export default db1;



import mysql from "mysql2";
const db1 = mysql.createPool({
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
db1.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database via pool!");
    connection.release();
  }
});


// function createTelephoneTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS telephone (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       phone_number VARCHAR(500) NOT NULL,
//       icon_name VARCHAR(100) NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )
//   `;

//   db1.query(createTableQuery, (err, results) => {
//     if (err) {
//       console.error("❌ Error creating telephone table: ", err);
//       return;
//     }
//     console.log("✅ Table 'telephone' created or already exists");
    
//     // Insert sample data if table is empty
//     insertSampleData();
//   });
// }

// function insertSampleData() {
//   const checkQuery = "SELECT COUNT(*) as count FROM telephone";
  
//   db1.query(checkQuery, (err, results) => {
//     if (err) {
//       console.error("❌ Error checking existing data: ", err);
//       return;
//     }
    
//     if (results[0].count === 0) {
//       const sampleData = {
//         phone_number: "+92 300 1234567",
//         icon_name: "fa-solid fa-phone"
//       };

//       const insertQuery = "INSERT INTO telephone (phone_number, icon_name) VALUES (?, ?)";
      
//       db1.query(insertQuery, [
//         sampleData.phone_number,
//         sampleData.icon_name
//       ], (err, results) => {
//         if (err) {
//           console.error("❌ Error inserting sample data: ", err);
//           return;
//         }
//         console.log("✅ Sample data inserted into telephone table");
//         db1.end();
//       });
//     } else {
//       console.log("✅ Data already exists in telephone table");
//       db1.end();
//     }
//   });
// }
// createTelephoneTable()


export default db1;

