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

export default db1;



// async function addPartnerImageColumn() {
//   try {
//     // Using promise-based query (mysql2/promise)
//     const promisePool = db1.promise();
    
//     const sql = `
//       ALTER TABLE items 
//       ADD COLUMN partner_image TEXT 
//     `;
    
//     // Or without specifying position:
//     // const sql = `ALTER TABLE items ADD COLUMN partner_image VARCHAR(255)`;
    
//     await promisePool.query(sql);
//     console.log("✅ Successfully added 'partner_image' column to 'items' table");
    
//   } catch (error) {
//     console.error("❌ Error adding column:", error.message);
//   }
// }

// // Execute the function
// addPartnerImageColumn();