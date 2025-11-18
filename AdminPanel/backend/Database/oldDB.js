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











// export const alterSectorsTable = () => {
//   return new Promise((resolve, reject) => {
//     // First check if columns exist
//     const checkQuery = `
//       SELECT COLUMN_NAME 
//       FROM INFORMATION_SCHEMA.COLUMNS 
//       WHERE TABLE_SCHEMA = DATABASE() 
//       AND TABLE_NAME = 'sectors' 
//       AND COLUMN_NAME IN ('meta_title', 'meta_description', 'meta_keywords')
//     `;

//     db1.query(checkQuery, (err, results) => {
//       if (err) {
//         console.error('❌ Error checking columns:', err);
//         reject(err);
//         return;
//       }

//       // Get existing columns
//       const existingColumns = results.map(row => row.COLUMN_NAME);
//       const columnsToAdd = [];

//       if (!existingColumns.includes('meta_title')) {
//         columnsToAdd.push('ADD COLUMN meta_title TEXT DEFAULT NULL');
//       }
//       if (!existingColumns.includes('meta_description')) {
//         columnsToAdd.push('ADD COLUMN meta_description TEXT DEFAULT NULL');
//       }
//       if (!existingColumns.includes('meta_keywords')) {
//         columnsToAdd.push('ADD COLUMN meta_keywords TEXT DEFAULT NULL');
//       }

//       // If no columns to add, resolve immediately
//       if (columnsToAdd.length === 0) {
//         console.log('✅ All meta columns already exist in sectors table');
//         resolve();
//         return;
//       }

//       // Execute ALTER TABLE with only needed columns
//       const alterQuery = `
//         ALTER TABLE sectors 
//         ${columnsToAdd.join(',\n')}
//       `;

//       db1.query(alterQuery, (alterErr, result) => {
//         if (alterErr) {
//           console.error('❌ Error altering sectors table:', alterErr);
//           reject(alterErr);
//         } else {
//           console.log('✅ Sectors table altered successfully with meta fields');
//           resolve(result);
//         }
//       });
//     });
//   });
// };
// alterSectorsTable()









  


export default db1;

