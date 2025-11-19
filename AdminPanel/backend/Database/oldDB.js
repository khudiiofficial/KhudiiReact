import mysql from "mysql2";

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



// import mysql from "mysql2";
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






// function createTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS crousel_images (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       image_path VARCHAR(255) NOT NULL,
//       description TEXT,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//   `;

//   db1.query(createTableQuery, (err, results) => {
//     if (err) {
//       console.error("❌ Error creating table: ", err);
//       return;
//     }
//     console.log("✅ Table 'crousel_images' created or already exists");
    
//     // Insert images after table is created
//     insertImages();
//   });
// }

// function insertImages() {
//   const images = [
//     '/1-taryaq-flood-2025-monthly-theme-khudii.webp',
//     '/2-taryaq-flood-2025-monthly-theme-khudii.webp',
//     '/3-taryaq-flood-2025-monthly-theme-khudii.webp',
//     '/6-taryaq-flood-2025-monthly-theme-khudii.webp',
//     '/7-taryaq-flood-2025-monthly-theme-khudii.webp',
//     '/8-taryaq-flood-2025-monthly-theme-khudii.webp',
//   ];

//   const insertQuery = "INSERT INTO crousel_images (image_path, description) VALUES ?";
  
//   // Map images to values array with empty descriptions
//   const values = images.map(image_path => [image_path, null]);

//   db1.query(insertQuery, [values], (err, results) => {
//     if (err) {
//       console.error("❌ Error inserting images: ", err);
//       return;
//     }
//     console.log(`✅ Successfully inserted ${results.affectedRows} images into crousel_images table`);
    
//     // Close connection
//     db1.end();
//   });
// }

// createTable()





  


export default db1;

