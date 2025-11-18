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




// // createSectorsTable.js

// const createSectorsTable = () => {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS sectors (
//       id INT PRIMARY KEY AUTO_INCREMENT,
//       src VARCHAR(255) NOT NULL,
//       name VARCHAR(100) NOT NULL,
//       slug VARCHAR(100) NOT NULL UNIQUE,
//       description TEXT NOT NULL,
//       deletestatus TINYINT DEFAULT 0,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     )
//   `;

//   db.query(createTableQuery, (err, result) => {
//     if (err) {
//       console.error('❌ Error creating sectors table:', err);
//       return;
//     }
//     console.log('✅ Sectors table created/verified successfully!');
    
//     // Insert sample data after table creation
//     insertSampleData();
//   });
// };

// const insertSampleData = () => {
//   const insertQuery = `
//     INSERT IGNORE INTO sectors (src, name, slug, description) VALUES
//     (?, ?, ?, ?),
//     (?, ?, ?, ?),
//     (?, ?, ?, ?),
//     (?, ?, ?, ?),
//     (?, ?, ?, ?),
//     (?, ?, ?, ?),
//     (?, ?, ?, ?),
//     (?, ?, ?, ?)
//   `;

//   const values = [
//     '/Sectors/health-khudii.png', 'Health', 'health', 'Healing lives with care and compassion — bringing affordable healthcare to those who need it most, so no one is left behind',
//     '/Sectors/autism-khudii.gif', 'Autism', 'autism', 'Honoring each individual difference through empowering autistic individuals to develop, learn, and flourish within communities founded on love, acceptance, and inclusion.',
//     '/Sectors/orphange-khudii1.gif', 'Orphanage', 'orphanage', 'Nurturing orphans with love and care, guiding each heart with hope to share. Empowering through education and light',
//     '/Sectors/health-khudii.png', 'Thalassemia', 'thalassemia', 'Standing with every fighter of Thalassemia—spreading awareness, delivering treatment, and restoring smiles one life at a time.',
//     '/Sectors/visually-impaired-khudii1.gif', 'Visually impaired', 'visually-impaired', 'Opening worlds beyond vision by enabling the visually impaired with technology, learning, and opportunities to view life in hope, independence, and dignity.',
//     '/Sectors/education-khudii.gif', 'Education', 'education', 'Lighting the path to a brighter tomorrow by opening doors of knowledge, skills, and hope for every child and community.',
//     '/Sectors/different-abled-khudii.gif', 'Differently Abled', 'differently-abled', 'Championing ability in every heart—empowering people with disabilities to live with dignity, confidence, and opportunity.',
//     '/Sectors/Water-and-food.gif', 'Water And Food', 'water-and-food', 'Every drop and plate counts—delivering clean water and nourishing food now so families survive with health and dignity.'
//   ];

//   db.query(insertQuery, values, (err, result) => {
//     if (err) {
//       console.error('❌ Error inserting sample data:', err);
//       return;
//     }
//     console.log('✅ Sample data inserted successfully!');
//   });
// };

// createSectorsTable()

export default db;

