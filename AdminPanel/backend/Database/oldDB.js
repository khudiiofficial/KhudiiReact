// import mysql from "mysql2";

// Create the connection
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




// function createFooterTable() {
//   db1.getConnection((err, connection) => {
//     if (err) {
//       console.error("❌ Error getting connection:", err);
//       return;
//     }

//     // Create table
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS footercontents (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         logoimage TEXT,
//         pageimage TEXT,
//         footertext TEXT,
//         email TEXT,
//         location TEXT,
//         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//       )
//     `;
    
//     connection.query(createTableQuery, (err, results) => {
//       if (err) {
//         console.error("❌ Error creating table:", err);
//         connection.release();
//         return;
//       }
      
//       console.log("✅ FooterContents table created successfully!");

//       // Check if sample data already exists
//       connection.query("SELECT COUNT(*) as count FROM footercontents", (err, rows) => {
//         if (err) {
//           console.error("❌ Error checking existing data:", err);
//           connection.release();
//           return;
//         }

//         const rowCount = rows[0].count;
        
//         if (rowCount === 0) {
//           // Insert sample data only if table is empty
//           const insertSampleQuery = `
//             INSERT INTO footercontents (logoimage, pageimage, footertext, email, location) 
//             VALUES (?, ?, ?, ?, ?)
//           `;
          
//           const sampleData = [
//             "https://media.khudii.com/logo.png",
//             "https://media.khudii.com/page-image.png",
//             "© 2024 Khudii. All rights reserved. Your one-stop destination for amazing products and services.",
//             "info@khudii.com",
//             "123 Business Street, City, Country"
//           ];
          
//           connection.query(insertSampleQuery, sampleData, (err, results) => {
//             if (err) {
//               console.error("❌ Error inserting sample data:", err);
//             } else {
//               console.log("✅ Sample data inserted successfully!");
//             }
//             connection.release();
//           });
//         } else {
//           console.log("ℹ️  Table already contains data, skipping sample insertion.");
//           connection.release();
//         }
//       });
//     });
//   });
// }

// // Run table creation
// createFooterTable();

// function addLocationInfoColumn() {
//   db1.getConnection((err, connection) => {
//     if (err) {
//       console.error("❌ Error getting connection:", err);
//       return;
//     }

//     // Add locationinfo column using ALTER TABLE
//     const alterTableQuery = "ALTER TABLE footercontents ADD COLUMN locationinfo TEXT";
    
//     connection.query(alterTableQuery, (err, results) => {
//       if (err) {
//         if (err.code === 'ER_DUP_FIELDNAME') {
//           console.log("✅ locationinfo column already exists");
//         } else {
//           console.error("❌ Error adding locationinfo column:", err);
//         }
//       } else {
//         console.log("✅ locationinfo column added successfully!");
//       }
//       connection.release();
//     });
//   });
// }

// // Run the alter table command
// addLocationInfoColumn();


export default db1;

