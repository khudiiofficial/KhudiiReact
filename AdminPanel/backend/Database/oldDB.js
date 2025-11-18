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


// // SQL query to create events table
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS events (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(500) NOT NULL,
//       url VARCHAR(500) NOT NULL,
//       videoId VARCHAR(100) NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )
//   `;

//   // Execute the query
//   db1.query(createTableQuery, (err, results) => {
//     if (err) {
//       console.error("❌ Error creating events table: ", err);
//       return;
//     }
//     console.log("✅ Events table created successfully!");
    
//     // Close the connection
//     db1.end();
//   });


// export const alterTestimonialsTable = () => {
//   const alterQueries = [
//     // Add new columns if they don't exist
//     `ALTER TABLE testimonials 
//      ADD COLUMN IF NOT EXISTS name VARCHAR(255) NOT NULL DEFAULT 'Unknown' AFTER id`,

//     `ALTER TABLE testimonials 
//      ADD COLUMN IF NOT EXISTS position VARCHAR(255) NOT NULL DEFAULT '' AFTER name`,

//     `ALTER TABLE testimonials 
//      ADD COLUMN IF NOT EXISTS thumbnail VARCHAR(500) NOT NULL DEFAULT '' AFTER position`,

//     `ALTER TABLE testimonials 
//      ADD COLUMN IF NOT EXISTS role VARCHAR(255) NOT NULL DEFAULT '' AFTER video_url`
//   ];

//   alterQueries.forEach((query, index) => {
//     db1.query(query, (err, results) => {
//       if (err) {
//         console.error(`❌ Error executing alter query ${index + 1}:`, err);
//       } else {
//         console.log(`✅ Alter query ${index + 1} executed successfully`);
//       }
//     });
//   });
// };

// // Run table alteration
// alterTestimonialsTable();







// const createCertificationsTable = () => {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS certifications (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       description TEXT,
//       image_url VARCHAR(500) NOT NULL,
//       display_order INT DEFAULT 0,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )
//   `;

//   db1.query(createTableQuery, (err, results) => {
//     if (err) {
//       console.error('❌ Error creating certifications table:', err);
//       return;
//     }
//     console.log('✅ Certifications table created or already exists!');
    
//     // Insert sample data (optional)
//     // insertSampleData();
//   });
// };

// createCertificationsTable()


  


export default db1;

