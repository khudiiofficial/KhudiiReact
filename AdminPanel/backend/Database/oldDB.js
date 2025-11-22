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




// createSEOTable()

// function createSEOTable() {
//   const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT || 3306,
//     ssl: { rejectUnauthorized: false },



//   });

//   connection.connect((err) => {
//     if (err) {
//       console.error("❌ Connection failed:", err);
//       return;
//     }



//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS website_seo (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         url TEXT NOT NULL,
//         pages JSON NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//       )
//     `;

//     connection.query(createTableQuery, (err) => {
//       if (err) {
//         console.error("❌ Error creating website_seo table:", err);
//         connection.end();
//         return;
//       }
      
//       console.log("✅ Website SEO table created successfully!");
//       insertSampleSEOData(connection);
//     });
//   });
// }

// function insertSampleSEOData(connection) {
//   // Check if data already exists
//   const checkQuery = "SELECT COUNT(*) as count FROM website_seo";
  
//   connection.query(checkQuery, (err, results) => {
//     if (err) {
//       console.error("❌ Error checking existing data:", err);
//       connection.end();
//       return;
//     }

//     if (results[0].count === 0) {
//       const seoData = {
//         url: "https://khudii.com",
//         pages: [
//           {
//             page_url: '/',
//             page_name: 'Home Page',
//             meta_title: 'Khudii - Empowering Communities in Pakistan',
//             meta_description: 'Join Khudii in creating positive change across Pakistan. Support local communities, education, healthcare, and sustainable development initiatives.',
//             meta_keywords: 'khudii, pakistan, community, education, healthcare, development, charity, welfare'
//           },
//           {
//             page_url: '/organizations',
//             page_name: 'Organizations',
//             meta_title: 'Partner Organizations - Khudii',
//             meta_description: 'Discover our trusted partner organizations working together to create sustainable impact across Pakistan.',
//             meta_keywords: 'partner organizations, NGOs, charities, collaborations, pakistan'
//           },
//           {
//             page_url: '/about-khudii',
//             page_name: 'About Khudii',
//             meta_title: 'About Us - Khudii Organization',
//             meta_description: 'Learn about Khudii mission, vision, and our journey in empowering communities across Pakistan since our inception.',
//             meta_keywords: 'about khudii, mission, vision, history, team, values'
//           },
//           {
//             page_url: '/golden-people',
//             page_name: 'Golden People',
//             meta_title: 'Golden People - Khudii Champions',
//             meta_description: 'Meet our Golden People - the champions and change-makers who are making a difference in communities across Pakistan.',
//             meta_keywords: 'golden people, champions, change-makers, volunteers, supporters'
//           },
//           {
//             page_url: '/contact',
//             page_name: 'Contact Us',
//             meta_title: 'Contact Khudii - Get in Touch',
//             meta_description: 'Get in touch with Khudii team. We would love to hear from you about partnerships, volunteering, or any inquiries.',
//             meta_keywords: 'contact khudii, get in touch, email, phone, address, inquiry'
//           },
//           {
//             page_url: '/contribute-your-story',
//             page_name: 'Contribute Your Story',
//             meta_title: 'Share Your Story - Khudii',
//             meta_description: 'Share your inspiring story with Khudii community. Your experiences can motivate others to create positive change.',
//             meta_keywords: 'share story, contribute, experiences, inspiration, community stories'
//           },
//           {
//             page_url: '/donate-now',
//             page_name: 'Donate Now',
//             meta_title: 'Donate to Khudii - Support Our Mission',
//             meta_description: 'Make a donation to support Khudii initiatives in education, healthcare, and community development across Pakistan.',
//             meta_keywords: 'donate, support, charity, donation, help, contribute funds'
//           },
//           {
//             page_url: '/success-stories',
//             page_name: 'Success Stories',
//             meta_title: 'Success Stories - Khudii Impact',
//             meta_description: 'Read inspiring success stories from Khudii initiatives. See how your support is creating real change in communities.',
//             meta_keywords: 'success stories, impact, achievements, results, community success'
//           },
//           {
//             page_url: '/social-media',
//             page_name: 'Social Media',
//             meta_title: 'Social Media - Khudii Online Presence',
//             meta_description: 'Connect with Khudii on social media. Follow our journey and stay updated with our latest initiatives and events.',
//             meta_keywords: 'social media, facebook, twitter, instagram, linkedin, follow'
//           },
//           {
//             page_url: '/videos',
//             page_name: 'Videos',
//             meta_title: 'Videos - Khudii Visual Stories',
//             meta_description: 'Watch inspiring videos from Khudii initiatives. See our work in action and the impact we are creating together.',
//             meta_keywords: 'videos, visual stories, documentaries, impact videos, khudii videos'
//           },
//           {
//             page_url: '/testimonials',
//             page_name: 'Testimonials',
//             meta_title: 'Testimonials - What People Say About Khudii',
//             meta_description: 'Read testimonials from partners, volunteers, and community members about their experiences with Khudii.',
//             meta_keywords: 'testimonials, reviews, feedback, experiences, partner feedback'
//           },
//           {
//             page_url: '/tribute',
//             page_name: 'Tribute',
//             meta_title: 'Tribute - Honoring Our Supporters',
//             meta_description: 'Pay tribute to the incredible supporters and contributors who have made Khudii mission possible.',
//             meta_keywords: 'tribute, honor, supporters, contributors, appreciation'
//           },
//           {
//             page_url: '/certifications',
//             page_name: 'Certifications',
//             meta_title: 'Certifications - Khudii Credentials',
//             meta_description: 'View Khudii certifications, accreditations, and credentials that demonstrate our commitment to transparency and excellence.',
//             meta_keywords: 'certifications, accreditations, credentials, transparency, compliance'
//           },
//           {
//             page_url: '/faqs',
//             page_name: 'FAQs',
//             meta_title: 'Frequently Asked Questions - Khudii',
//             meta_description: 'Find answers to frequently asked questions about Khudii, our programs, partnerships, and how you can get involved.',
//             meta_keywords: 'FAQs, frequently asked questions, help, information, support'
//           },
//           {
//             page_url: '/blogs',
//             page_name: 'Blogs',
//             meta_title: 'Blog - Khudii Insights and Stories',
//             meta_description: 'Read the latest blog posts from Khudii featuring insights, stories, and updates about our community development work.',
//             meta_keywords: 'blog, articles, insights, stories, updates, khudii blog'
//           },
//           {
//             page_url: '/jobs',
//             page_name: 'Jobs',
//             meta_title: 'Careers - Join Khudii Team',
//             meta_description: 'Explore career opportunities and job openings at Khudii. Join our team and help create positive change in Pakistan.',
//             meta_keywords: 'jobs, careers, employment, vacancies, work with khudii'
//           },
//           {
//             page_url: '/volunteer',
//             page_name: 'Volunteer',
//             meta_title: 'Volunteer with Khudii - Make a Difference',
//             meta_description: 'Become a Khudii volunteer and contribute your time and skills to create meaningful impact in communities across Pakistan.',
//             meta_keywords: 'volunteer, volunteer opportunities, help, contribute time, make difference'
//           }
//         ]
//       };

//       const insertQuery = "INSERT INTO website_seo (url, pages) VALUES (?, ?)";
      
//       connection.query(insertQuery, [
//         seoData.url,
//         JSON.stringify(seoData.pages)
//       ], (err, results) => {
//         if (err) {
//           console.error("❌ Error inserting sample SEO data:", err);
//         } else {
//           console.log("✅ Sample SEO data inserted successfully!");
//         }
//         connection.end();
//       });
//     } else {
//       console.log("ℹ️  SEO data already exists");
//       connection.end();
//     }
//   });
// }



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

