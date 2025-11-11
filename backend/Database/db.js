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






// async function convertCategoryToJSON() {
//   try {
//     console.log("🔄 Converting category column to JSON format...");
    
//     // Step 1: First convert existing data to JSON array format
//     const selectQuery = 'SELECT id, category FROM items';
    
//     db.query(selectQuery, async (err, results) => {
//       if (err) {
//         console.error("❌ Error fetching data: ", err);
//         db.end();
//         return;
//       }
      
//       // Convert each category to JSON array format
//       for (const row of results) {
//         const newCategoryValue = JSON.stringify([row.category]);
        
//         const updateQuery = 'UPDATE items SET category = ? WHERE id = ?';
//         await queryAsync(updateQuery, [newCategoryValue, row.id]);
//         console.log(`✅ Updated ID ${row.id}: "${row.category}" -> ${newCategoryValue}`);
//       }
      
//       // Step 2: Alter table to change data type to JSON
//       console.log("🔄 Changing column data type to JSON...");
//       try {
//         await queryAsync('ALTER TABLE items MODIFY category JSON');
//         console.log("✅ Successfully changed category column to JSON type");
//       } catch (alterError) {
//         console.log("⚠️  Could not change to JSON type, keeping as VARCHAR but with JSON arrays");
//         console.log("💡 Your MySQL version might not support JSON type");
//       }
      
//       // Step 3: Verify the changes
//       console.log("🔍 Verifying final data...");
//       const finalResults = await queryAsync('SELECT id, category FROM items');
      
//       console.log("📊 Final categories (as JSON arrays):");
//       finalResults.forEach(row => {
//         console.log(`  ID: ${row.id}, Category: ${row.category}`);
        
//         // Parse and show it's actually an array
//         try {
//           // const parsed = JSON.parse(row.category);
//           console.log(`Parsed as array:`, row.category);
//         } catch (e) {
//           console.log(`Could not parse as JSON`);
//         }
//       });
      
//       console.log("🎉 Migration completed! You can now store multiple categories like: [\"Health\", \"Education\"]");
//       db.end();
//     });
    
//   } catch (error) {
//     console.error("❌ Migration failed: ", error);
//     db.end();
//   }
// }

// // Helper function to use promises
// function queryAsync(sql, params = []) {
//   return new Promise((resolve, reject) => {
//     db.query(sql, params, (err, results) => {
//       if (err) reject(err);
//       else resolve(results);
//     });
//   });
// }
// convertCategoryToJSON()

export default db;

