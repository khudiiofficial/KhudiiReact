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



// createTables()

// function createTables() {
//   const connection = mysql.createConnection({
//  host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   ssl: { rejectUnauthorized: false }, // required for Hostinger
//   });

//   connection.connect((err) => {
//     if (err) {
//       console.error("❌ Connection failed:", err);
//       return;
//     }

//     connection.beginTransaction((err) => {
//       if (err) {
//         console.error("❌ Transaction start failed:", err);
//         return;
//       }

//       const tables = [
//         `CREATE TABLE IF NOT EXISTS who_we_are (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           heading TEXT,
//           paragraph1 TEXT,
//           paragraph2 TEXT,
//           youtube_video_id TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )`,

//         `CREATE TABLE IF NOT EXISTS dream_and_purpose (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           heading TEXT,
//           paragraph TEXT,
//           bullets_header TEXT,
//           bullets JSON,
//           conclusion TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )`,

//         `CREATE TABLE IF NOT EXISTS impact (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           heading TEXT,
//           paragraph1 TEXT,
//           paragraph2 TEXT,
//           paragraph3 TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )`,

//         `CREATE TABLE IF NOT EXISTS ceo (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           name TEXT,
//           title TEXT,
//           paragraph1 TEXT,
//           paragraph2 TEXT,
//           paragraph3 TEXT,
//           image_path TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )`,

//         `CREATE TABLE IF NOT EXISTS people_behind (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           heading TEXT,
//           paragraph1 TEXT,
//           paragraph2 TEXT,
//           paragraph3 TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )`,

//         `CREATE TABLE IF NOT EXISTS expert_team (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           image_path TEXT,
//           image_alt TEXT,
//           name TEXT,
//           position TEXT,
//           description TEXT,
//           sort_order INT DEFAULT 0,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )`,

//         `CREATE TABLE IF NOT EXISTS join_us (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           heading TEXT,
//           paragraph TEXT,
//           bullets JSON,
//           paragraph2 TEXT,
//           paragraph3 TEXT,
//           youtube_video_id TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )`,

//         `CREATE TABLE IF NOT EXISTS new_section (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           heading TEXT,
//           paragraphs JSON,
//           bullets_header TEXT,
//           bullets JSON,
//           image_path TEXT,
//           youtube_video_id TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )`
//       ];

//       const executeQueries = (index) => {
//         if (index >= tables.length) {
//           connection.commit((err) => {
//             if (err) {
//               console.error("❌ Commit failed:", err);
//               connection.rollback(() => {
//                 connection.end();
//               });
//               return;
//             }
//             console.log("✅ All tables created successfully!");
//             connection.end();
//             // Insert sample data after tables are created
//             insertSampleData();
//           });
//           return;
//         }

//         connection.query(tables[index], (err) => {
//           if (err) {
//             console.error(`❌ Error creating table ${index + 1}:`, err);
//             connection.rollback(() => {
//               connection.end();
//             });
//             return;
//           }
//           executeQueries(index + 1);
//         });
//       };

//       executeQueries(0);
//     });
//   });
// }

// // Separate function for inserting sample data
// function insertSampleData() {
//   const connection = mysql.createConnection({
//  host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   ssl: { rejectUnauthorized: false }, // required for Hostinger
//   });

//   connection.connect((err) => {
//     if (err) {
//       console.error("❌ Connection failed for sample data:", err);
//       return;
//     }

//     connection.beginTransaction((err) => {
//       if (err) {
//         console.error("❌ Transaction start failed:", err);
//         return;
//       }

//       const sampleData = {
//         who_we_are: {
//           heading: "Who We Are",
//           paragraph1: "We are a passionate team dedicated to creating positive change in communities across Pakistan. Our organization was founded on the principles of compassion, integrity, and sustainable impact.",
//           paragraph2: "With years of experience in social welfare and community development, we have built a network of trusted partners and volunteers who share our vision for a better tomorrow.",
//           youtube_video_id: "dQw4w9WgXcQ"
//         },
//         dream_and_purpose: {
//           heading: "Our Dream & Purpose",
//           paragraph: "We dream of a Pakistan where every individual has access to opportunities, education, and basic necessities. Our purpose is to bridge the gap between resources and those in need.",
//           bullets_header: "Our Core Objectives",
//           bullets: JSON.stringify([
//             "Empower local communities through education and skill development",
//             "Provide immediate relief during emergencies and natural disasters",
//             "Build sustainable solutions for long-term community development",
//             "Foster partnerships between donors, volunteers, and organizations"
//           ]),
//           conclusion: "Together, we can turn this dream into reality and create lasting positive change."
//         },
//         impact: {
//           heading: "Our Impact",
//           paragraph1: "Over the past years, we have successfully impacted thousands of lives across Pakistan through various initiatives and programs.",
//           paragraph2: "Our educational programs have helped over 5,000 children access quality education, while our healthcare initiatives have provided medical assistance to more than 10,000 families.",
//           paragraph3: "Through our community development projects, we have empowered local entrepreneurs and created sustainable income opportunities in rural areas."
//         },
//         ceo: {
//           name: "Sarah Ahmed",
//           title: "Chief Executive Officer",
//           paragraph1: "With over 15 years of experience in social work and community development, Sarah leads our organization with passion and dedication.",
//           paragraph2: "Her vision for creating sustainable change has been the driving force behind our most successful initiatives and partnerships.",
//           paragraph3: "Sarah believes that true impact comes from empowering local communities and building lasting relationships based on trust and mutual respect.",
//           image_path: null
//         },
//         people_behind: {
//           heading: "The People Behind Our Mission",
//           paragraph1: "Our organization is powered by a diverse team of professionals, volunteers, and partners who share a common goal: making a difference.",
//           paragraph2: "From field workers who interact directly with communities to our administrative staff ensuring smooth operations, every team member plays a crucial role.",
//           paragraph3: "We are grateful for the dedication and commitment of everyone who contributes to our mission, whether through time, resources, or expertise."
//         },
//         join_us: {
//           heading: "Join Our Movement",
//           paragraph: "Become part of our growing community of changemakers and help us create lasting impact across Pakistan.",
//           bullets: JSON.stringify([
//             "Volunteer your time and skills",
//             "Donate to support our initiatives",
//             "Partner with us for corporate social responsibility",
//             "Spread awareness about our mission"
//           ]),
//           paragraph2: "Every contribution, no matter how small, makes a significant difference in someone's life.",
//           paragraph3: "Join us today and be part of the change you wish to see in the world.",
//           youtube_video_id: "dQw4w9WgXcQ"
//         }
//       };

//       const queries = [
//         ["INSERT IGNORE INTO who_we_are (heading, paragraph1, paragraph2, youtube_video_id) VALUES (?, ?, ?, ?)", 
//          [sampleData.who_we_are.heading, sampleData.who_we_are.paragraph1, sampleData.who_we_are.paragraph2, sampleData.who_we_are.youtube_video_id]],
        
//         ["INSERT IGNORE INTO dream_and_purpose (heading, paragraph, bullets_header, bullets, conclusion) VALUES (?, ?, ?, ?, ?)", 
//          [sampleData.dream_and_purpose.heading, sampleData.dream_and_purpose.paragraph, sampleData.dream_and_purpose.bullets_header, sampleData.dream_and_purpose.bullets, sampleData.dream_and_purpose.conclusion]],
        
//         ["INSERT IGNORE INTO impact (heading, paragraph1, paragraph2, paragraph3) VALUES (?, ?, ?, ?)", 
//          [sampleData.impact.heading, sampleData.impact.paragraph1, sampleData.impact.paragraph2, sampleData.impact.paragraph3]],
        
//         ["INSERT IGNORE INTO ceo (name, title, paragraph1, paragraph2, paragraph3, image_path) VALUES (?, ?, ?, ?, ?, ?)", 
//          [sampleData.ceo.name, sampleData.ceo.title, sampleData.ceo.paragraph1, sampleData.ceo.paragraph2, sampleData.ceo.paragraph3, sampleData.ceo.image_path]],
        
//         ["INSERT IGNORE INTO people_behind (heading, paragraph1, paragraph2, paragraph3) VALUES (?, ?, ?, ?)", 
//          [sampleData.people_behind.heading, sampleData.people_behind.paragraph1, sampleData.people_behind.paragraph2, sampleData.people_behind.paragraph3]],
        
//         ["INSERT IGNORE INTO join_us (heading, paragraph, bullets, paragraph2, paragraph3, youtube_video_id) VALUES (?, ?, ?, ?, ?, ?)", 
//          [sampleData.join_us.heading, sampleData.join_us.paragraph, sampleData.join_us.bullets, sampleData.join_us.paragraph2, sampleData.join_us.paragraph3, sampleData.join_us.youtube_video_id]]
//       ];

//       const executeInserts = (index) => {
//         if (index >= queries.length) {
//           connection.commit((err) => {
//             if (err) {
//               console.error("❌ Commit failed for sample data:", err);
//               connection.rollback(() => {
//                 connection.end();
//               });
//               return;
//             }
//             console.log("✅ Sample data inserted successfully for single-instance tables!");
//             connection.end();
//           });
//           return;
//         }

//         connection.query(queries[index][0], queries[index][1], (err, results) => {
//           if (err) {
//             console.error(`❌ Error inserting sample data for table ${index + 1}:`, err);
//             connection.rollback(() => {
//               connection.end();
//             });
//             return;
//           }
          
//           if (results.affectedRows > 0) {
//             console.log(`✅ Sample data inserted for ${Object.keys(sampleData)[index]}`);
//           } else {
//             console.log(`ℹ️  Data already exists for ${Object.keys(sampleData)[index]}`);
//           }
          
//           executeInserts(index + 1);
//         });
//       };

//       executeInserts(0);
//     });
//   });
// }



export default db1;

