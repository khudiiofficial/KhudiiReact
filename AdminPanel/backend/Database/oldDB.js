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



// async function addIsMobileColumn() {
//   try {
//     console.log('🔄 Adding isMobile column to crousel_images table...');
    
//     // Check if column already exists
//     const [existingColumns] = await db1.promise().query(`
//       SELECT COLUMN_NAME 
//       FROM INFORMATION_SCHEMA.COLUMNS 
//       WHERE TABLE_SCHEMA = ? 
//       AND TABLE_NAME = 'crousel_images' 
//       AND COLUMN_NAME = 'isMobile'
//     `, [process.env.DB_NAME]);
    
//     if (existingColumns.length > 0) {
//       console.log('✅ isMobile column already exists');
//     } else {
//       // Add the new column
//       await db1.promise().query(`
//         ALTER TABLE crousel_images 
//         ADD COLUMN isMobile BOOLEAN DEFAULT FALSE 
//         COMMENT 'Flag to identify if image is for mobile devices'
//       `);
      
//       console.log('✅ isMobile column added successfully');
//     }
    
//     // Display table structure
//     const [tableStructure] = await db1.promise().query(`
//       SHOW COLUMNS FROM crousel_images
//     `);
    
//     console.log('\n📊 Updated table structure:');
//     console.table(tableStructure.map(col => ({
//       Field: col.Field,
//       Type: col.Type,
//       Null: col.Null,
//       Default: col.Default,
//       Extra: col.Extra
//     })));
    
//     // Show current data count by isMobile
//     const [dataStats] = await db1.promise().query(`
//       SELECT 
//         isMobile,
//         COUNT(*) as count
//       FROM crousel_images 
//       GROUP BY isMobile
//     `);
    
//     console.log('\n📈 Data Statistics:');
//     dataStats.forEach(stat => {
//       console.log(`   isMobile = ${stat.isMobile}: ${stat.count} images`);
//     });
    
//     return true;
    
//   } catch (error) {
//     console.error('❌ Error adding column:', error);
//     throw error;
//   }
// }

// // Run the migration
// addIsMobileColumn()
//   .then(() => {
//     console.log('\n✨ Migration completed successfully!');
//     process.exit(0);
//   })
//   .catch(error => {
//     console.error('💥 Migration failed:', error);
//     process.exit(1);
//   });