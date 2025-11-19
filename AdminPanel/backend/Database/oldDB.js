import mysql from "mysql2";

// Create the connection
const db1 = mysql.createConnection({
  host: "localhost",   // WAMP default
  user: "root",        // default MySQL user
  password: "",        // set if you gave root a password
  database: "db_ka",   // your database name,
  port:3308
});

// Connect to database
db1.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed: ", err);
    return;
  }
  console.log("✅ Connected to MySQL old Database!");
});


// function createStoriesTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS stories_description (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       description TEXT NOT NULL,
//       image_path VARCHAR(500),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )
//   `;

//   db1.query(createTableQuery, (err, results) => {
//     if (err) {
//       console.error("❌ Error creating stories_description table: ", err);
//       return;
//     }
//     console.log("✅ Table 'stories_description' created or already exists");
//     db1.end();
//   });
// }
// createStoriesTable()


// export default db1;



// import mysql from "mysql2";
// const db1 = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   ssl: { rejectUnauthorized: false }, // required for Hostinger
// });

// // Test the connection once
// db1.getConnection((err, connection) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err);
//   } else {
//     console.log("✅ Connected to MySQL Database via pool!");
//     connection.release();
//   }
// });





// function createVisionMissionTable() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS vision_mission_items (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       icon VARCHAR(100) NOT NULL,
//       title VARCHAR(255) NOT NULL,
//       description TEXT NOT NULL,
//       sort_order INT DEFAULT 0,
//       is_active BOOLEAN DEFAULT TRUE,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )
//   `;

//   db1.query(createTableQuery, (err, results) => {
//     if (err) {
//       console.error("❌ Error creating vision_mission_items table: ", err);
//       return;
//     }
//     console.log("✅ Table 'vision_mission_items' created or already exists");
    
//     // Insert initial data
//     insertInitialData();
//   });
// }

// function insertInitialData() {
//   const items = [
//     {
//       icon: 'fa-solid fa-crosshairs',
//       title: 'Vision',
//       description: 'To build Pakistan’s largest digital home for welfare — a hub where organizations, donors, volunteers, and communities come together seamlessly to create lasting change and uplift every vulnerable life with dignity and hope.',
//       sort_order: 1
//     },
//     {
//       icon: 'fa-solid fa-chart-area',
//       title: 'Goal',
//       description: 'To actively identify, support, and amplify credible welfare organizations across Pakistan—building bridges between changemakers and supporters, and laying the digital foundation to empower 25,000 model initiatives through strategic connection, visibility, and collaboration.',
//       sort_order: 2
//     },
//     {
//       icon: 'fa-solid fa-magnifying-glass',
//       title: 'Mission',
//       description: 'To breathe life into Pakistan’s welfare ecosystem by shining a light on credible organizations, giving them the visibility they deserve, and connecting them with donors, volunteers, and professionals so their impact can reach further and touch more lives.',
//       sort_order: 3
//     },
//   ];

//   // First, check if data already exists
//   const checkQuery = "SELECT COUNT(*) as count FROM vision_mission_items";
  
//   db1.query(checkQuery, (err, results) => {
//     if (err) {
//       console.error("❌ Error checking existing data: ", err);
//       return;
//     }
    
//     if (results[0].count === 0) {
//       // Insert data only if table is empty
//       const insertQuery = "INSERT INTO vision_mission_items (icon, title, description, sort_order) VALUES ?";
//       const values = items.map(item => [item.icon, item.title, item.description, item.sort_order]);
      
//       db1.query(insertQuery, [values], (err, results) => {
//         if (err) {
//           console.error("❌ Error inserting initial data: ", err);
//           return;
//         }
//         console.log(`✅ Inserted ${results.affectedRows} vision mission items`);
//         db1.end();
//       });
//     } else {
//       console.log("✅ Data already exists in vision_mission_items table");
//       db1.end();
//     }
//   });
// }


// createVisionMissionTable()

export default db1;

