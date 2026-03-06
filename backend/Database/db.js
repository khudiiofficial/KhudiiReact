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











// // Function to create tables
// const createTables = () => {
//   console.log("🔄 Creating organization tables...");

//   // Create organization_submissions table
//   const createSubmissionTableQuery = `
//     CREATE TABLE IF NOT EXISTS organization_submissions (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       organization_name VARCHAR(255) NOT NULL,
//       contact_person_name VARCHAR(255) NOT NULL,
//       contact_person_mobile VARCHAR(50) NOT NULL,
//       landline_uan VARCHAR(50),
//       website_url TEXT,
//       email_address VARCHAR(255),
//       facebook_link TEXT,
//       instagram_link TEXT,
//       youtube_link TEXT,
//       linkedin_link TEXT,
//       twitter_link TEXT,
//       year_established YEAR NOT NULL,
//       total_beneficiaries_served INT,
//       total_projects_completed INT,
//       active_projects INT,
//       organization_logo_path TEXT,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//       INDEX idx_created (created_at),
//       INDEX idx_org_name (organization_name)
//     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
//   `;

//   // Create supporting_documents table
//   const createDocumentsTableQuery = `
//     CREATE TABLE IF NOT EXISTS supporting_documents (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       submission_id INT NOT NULL,
//       file_path TEXT NOT NULL,
//       file_name VARCHAR(255),
//       file_type VARCHAR(100),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (submission_id) REFERENCES organization_submissions(id) ON DELETE CASCADE,
//       INDEX idx_submission (submission_id)
//     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
//   `;

//   // Execute queries sequentially
//   db.query(createSubmissionTableQuery, (err, result) => {
//     if (err) {
//       console.error("❌ Error creating organization_submissions table:", err);
//       return;
//     }
//     console.log("✅ organization_submissions table created successfully");

//     // Create supporting_documents table
//     db.query(createDocumentsTableQuery, (err, result) => {
//       if (err) {
//         console.error("❌ Error creating supporting_documents table:", err);
//         return;
//       }
//       console.log("✅ supporting_documents table created successfully");
      
//       // Check if tables are empty and insert sample data if needed (optional)
//       checkAndInsertSampleData();
      
//       console.log("🎉 All tables created successfully!");
      
//       // Close the connection
//       db.end((err) => {
//         if (err) {
//           console.error("❌ Error closing connection:", err);
//           return;
//         }
//         console.log("✅ Database connection closed");
//       });
//     });
//   });
// };

// // Optional: Function to check if tables are empty and insert sample data
// const checkAndInsertSampleData = () => {
//   const checkQuery = "SELECT COUNT(*) as count FROM organization_submissions";
  
//   db.query(checkQuery, (err, results) => {
//     if (err) {
//       console.error("❌ Error checking table data:", err);
//       return;
//     }
    
//     if (results[0].count === 0) {
//       console.log("📝 Inserting sample data...");
      
//       const insertSampleQuery = `
//         INSERT INTO organization_submissions (
//           organization_name, contact_person_name, contact_person_mobile,
//           landline_uan, website_url, email_address,
//           year_established
//         ) VALUES (
//           'Sample Organization', 'John Doe', '03367312957',
//           '042-7578932', 'https://example.com', 'info@example.com',
//           '2020'
//         )
//       `;
      
//       db.query(insertSampleQuery, (err, result) => {
//         if (err) {
//           console.error("❌ Error inserting sample data:", err);
//           return;
//         }
//         console.log("✅ Sample data inserted successfully");
//       });
//     }
//   });
// };




// checkAndInsertSampleData()







const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 5, // REDUCE THIS - 10 might be too high for shared hosting
  maxIdle: 5, // Maximum number of idle connections
  idleTimeout: 60000, // 60 seconds - close idle connections after 1 min
  queueLimit: 50, // Reasonable queue limit
  enableKeepAlive: true, // Keep connections alive
  keepAliveInitialDelay: 10000, // 10 seconds
  
  // Connection settings
  connectTimeout: 10000, // 10 second timeout
  ssl: { rejectUnauthorized: false },
  
  // IMPORTANT: Add these to manage connections better
  acquireTimeout: 10000, // Wait 10 seconds max for a connection
  multipleStatements: false, // Disable multiple statements for security
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




// // Add your column addition code here
// db.query("SHOW COLUMNS FROM organization_submissions", (err, results) => {
//   if (err) {
//     console.error("❌ Error checking columns:", err);
//     return;
//   }
  
//   const existingColumns = results.map(col => col.Field);
  
//   if (!existingColumns.includes('user_google_email')) {
//     const addEmailQuery = `ALTER TABLE organization_submissions ADD COLUMN user_google_email VARCHAR(255) AFTER organization_logo_path`;
//     db.query(addEmailQuery, (err) => {
//       if (err) {
//         console.error("❌ Error adding user_google_email:", err);
//       } else {
//         console.log("✅ user_google_email column added");
//       }
//     });
//   } else {
//     console.log("✅ user_google_email already exists");
//   }
  
//   if (!existingColumns.includes('user_google_name')) {
//     const addNameQuery = `ALTER TABLE organization_submissions ADD COLUMN user_google_name VARCHAR(255) AFTER user_google_email`;
//     db.query(addNameQuery, (err) => {
//       if (err) {
//         console.error("❌ Error adding user_google_name:", err);
//       } else {
//         console.log("✅ user_google_name column added");
//       }
//     });
//   } else {
//     console.log("✅ user_google_name already exists");
//   }
// });



export default db;

