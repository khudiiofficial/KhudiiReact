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



// async function setupBankDataTable() {
//   const createTableSQL = `
//     CREATE TABLE IF NOT EXISTS bankdata (
//       id INT PRIMARY KEY DEFAULT 1, -- Always use ID 1 for single instance
//       name VARCHAR(255) NOT NULL COMMENT 'Bank name',
//       imagepath VARCHAR(500) COMMENT 'Path to bank logo/image on FTP',
//       account_title VARCHAR(255) NOT NULL COMMENT 'Account title',
//       branch VARCHAR(255) COMMENT 'Bank branch name',
//       iban VARCHAR(100) COMMENT 'IBAN number',
//       accountNumber VARCHAR(100) COMMENT 'Account number',
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//       CONSTRAINT single_row CHECK (id = 1) -- Ensures only one row
//     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
//   `;

//   try {
//     const [result] = await db1.promise().query(createTableSQL);
//     console.log('✅ BankData table created/verified successfully');

//     // Insert sample data (only if table is empty)
//     const [existingRows] = await db1.promise().query('SELECT COUNT(*) as count FROM bankdata WHERE id = 1');
    
//     if (existingRows[0].count === 0) {
//       const sampleDataSQL = `
//         INSERT INTO bankdata 
//         (id, name, account_title, branch, iban, accountNumber) 
//         VALUES 
//         (1, 'Habib Bank Limited', 'KHUDII WELFARE ORGANIZATION', 'Main Branch', 'PK00HABB0000001234567890', '1234567890123')
//       `;
      
//       await db1.promise().query(sampleDataSQL);
//       console.log('✅ Sample bank data inserted successfully');
//     } else {
//       console.log(`ℹ️ BankData already has data`);
//     }

//     // Display current data
//     const [bankData] = await db1.promise().query('SELECT * FROM bankdata WHERE id = 1');
    
//     if (bankData.length > 0) {
//       const bank = bankData[0];
//       console.log('\n📊 Current Bank Data:');
//       console.log(`🏦 Bank Name: ${bank.name}`);
//       console.log(`   Account Title: ${bank.account_title}`);
//       console.log(`   Branch: ${bank.branch}`);
//       console.log(`   IBAN: ${bank.iban}`);
//       console.log(`   Account No: ${bank.accountNumber}`);
//       console.log(`   Image: ${bank.imagepath || 'No image'}`);
//     }

//   } catch (error) {
//     console.error('❌ Error setting up BankData table:', error);
//     throw error;
//   }
// }

// // Run the setup
// setupBankDataTable()
//   .then(() => {
//     console.log('\n✨ BankData setup completed successfully!');
//     process.exit(0);
//   })
//   .catch(error => {
//     console.error('💥 Setup failed:', error);
//     process.exit(1);
//   });