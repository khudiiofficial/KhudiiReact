// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import db from "../Database/DB.js";
// import db1 from '../Database/oldDB.js'
// import { uploadToFTP, deleteFromFTP } from "../utils/ftpUpload.js";
// import { DtoArr } from "../Dto/objectDto.js";
// // Utility Functions
// function uniqueImageName(extension = "png") {
//   return `${Date.now()}-${Math.floor(Math.random() * 1e6)}.${extension}`;
// }

// const deleteImageFile = async (imageUrl) => {
//   try {
//     if (!imageUrl) return;
//     await deleteFromFTP(imageUrl);
//     console.log(`Requested deletion of: ${imageUrl}`);
//   } catch (error) {
//     console.error('Error deleting image file from FTP:', error);
//   }
// };




// // Auth Controllers
// export const login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password required" });
//   }

//   const query = "SELECT * FROM users WHERE email = ?";
//   db.query(query, [email], async (err, results) => {
//     if (err) {
//       console.error("❌ DB Error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const user = results[0];
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//       expiresIn: "6d",
//     });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     delete user.password;
//     const auth = { auth: true };
//     return res.status(200).json({ message: "Login successful", user: { ...user, ...auth } });
//   });
// };

// export const logout = (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({ message: "Logged out" });
// };

// // Organization Controllers
// export const getAllOrganizations = (req, res) => {
//   const query = `
//     SELECT 
//       i.id, 
//       i.name,
//       i.deletestatus, 
//       i.description, 
//       i.category, 
//       i.introductory_image_path,
//       GROUP_CONCAT(DISTINCT ii.image_path) AS images,
//       GROUP_CONCAT(DISTINCT iu.urls) AS urls,
//       JSON_OBJECT(
//         'phone', s.phone,
//         'facebook', s.facebook,
//         'twitter', s.twitter,
//         'instagram', s.instagram,
//         'location', s.location,
//         'googlemap', s.googlemap,
//         'mobile', s.Mobile_number
//       ) AS socials,
//       JSON_ARRAYAGG(
//         JSON_OBJECT(
//           'name', ic.name,
//           'svg', ic.svg,
//           'qty', ic.qty
//         )
//       ) AS icons
//     FROM items i
//     LEFT JOIN item_images ii ON i.id = ii.item_id
//     LEFT JOIN item_urls iu ON i.id = iu.item_id
//     LEFT JOIN socials s ON i.id = s.item_id
//     LEFT JOIN icons ic ON i.id = ic.item_id
//     GROUP BY i.id
//   `;

//   db1.query(query, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching organizations:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     const formatted = results.map((row) => ({
//       id: row.id,
//       deletestatus: row.deletestatus,
//       name: row.name,
//       description: row.description,
//       category: row.category,
//       introductory_image_path: row.introductory_image_path,
//       images: row.images ? [...new Set(row.images.split(","))] : [],
//       urls: row.urls ? [...new Set(row.urls.split(","))] : [],
//       socials: row.socials || {},
//       icons: row.icons || [],
//     }));

//     res.status(200).json(DtoArr(formatted));
//   });
// };

// export const createOrganization = async (req, res) => {
//   const {
//     name,
//     description,
//     category,
//     introductory_image_base64,
//     youtube_video_url,
//     images_base64,
//     urls,
//     socials,
//     icons,
//   } = req.body;

//   const conn = db1.promise();

//   try {
//     await conn.beginTransaction();

//     let introImagePath = null;
//     if (introductory_image_base64) {
//       const matches = introductory_image_base64.match(/^data:(.+);base64,(.+)$/);
//       if (matches) {
//         const ext = matches[1].split("/")[1] || "png";
//         const fileName = uniqueImageName(ext);
//         const fileBuffer = Buffer.from(matches[2], "base64");
//         const uploadedUrl = await uploadToFTP(fileName, fileBuffer);
//         introImagePath = uploadedUrl;
//       }
//     }

//     const [result] = await conn.query(
//       `INSERT INTO items (name, description, category, introductory_image_path, youtube_video_url) VALUES (?, ?, ?, ?, ?)`,
//       [name, description, category, introImagePath, youtube_video_url]
//     );

//     const itemId = result.insertId;

//     if (images_base64 && images_base64.length > 0) {
//       for (const imgBase64 of images_base64) {
//         const matches = imgBase64.match(/^data:(.+);base64,(.+)$/);
//         if (matches) {
//           const ext = matches[1].split("/")[1] || "png";
//           const fileName = uniqueImageName(ext);
//           const fileBuffer = Buffer.from(matches[2], "base64");
//           const fileUrl = await uploadToFTP(fileName, fileBuffer);
//           await conn.query("INSERT INTO item_images (item_id, image_path) VALUES (?, ?)", [
//             itemId,
//             fileUrl,
//           ]);
//         }
//       }
//     }

//     if (urls && urls.length > 0) {
//       for (const u of urls) {
//         await conn.query("INSERT INTO item_urls (item_id, urls) VALUES (?, ?)", [
//           itemId,
//           JSON.stringify([u]),
//         ]);
//       }
//     }

//     if (socials) {
//       await conn.query(
//         "INSERT INTO socials (item_id, phone, facebook, twitter, instagram, location, googlemap, Mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//         [
//           itemId,
//           socials.phone || null,
//           socials.facebook || null,
//           socials.twitter || null,
//           socials.instagram || null,
//           socials.location || null,
//           socials.googlemap || "",
//           socials.mobile || null,
//         ]
//       );
//     }

//     if (icons && icons.length > 0) {
//       for (const icon of icons) {
//         await conn.query(
//           "INSERT INTO icons (item_id, name, svg, qty) VALUES (?, ?, ?, ?)",
//           [itemId, icon.name, icon.svg, icon.qty]
//         );
//       }
//     }

//     await conn.commit();
//     res.status(201).json({ message: "✅ Organization created successfully", id: itemId });
//   } catch (error) {
//     await db1.promise().rollback();
//     res.status(500).json({ message: "Failed to create organization", error: error.message });
//   }
// };

// export const getOrganizationById = (req, res) => {
//   const { id } = req.params;

//   const getItemQuery = "SELECT * FROM items WHERE id = ?";
//   db1.query(getItemQuery, [id], (err, itemResults) => {
//     if (err) {
//       console.error("❌ Error fetching organization:", err);
//       return res.status(500).json({ message: "Failed to fetch organization" });
//     }

//     if (itemResults.length === 0) {
//       return res.status(404).json({ message: "Organization not found" });
//     }

//     const organization = itemResults[0];
//     if (organization.deletestatus === 1) {
//       return res.status(404).json({ message: "Organization not found" });
//     }

//     const getImagesQuery = "SELECT image_path FROM item_images WHERE item_id = ?";
//     db1.query(getImagesQuery, [id], (err, imageResults) => {
//       if (err) {
//         console.error("Error fetching images:", err);
//         return res.status(500).json({ message: "Failed to fetch images" });
//       }

//       const getUrlsQuery = "SELECT urls FROM item_urls WHERE item_id = ?";
//       db1.query(getUrlsQuery, [id], (err, urlResults) => {
//         if (err) {
//           console.error("Error fetching URLs:", err);
//           return res.status(500).json({ message: "Failed to fetch URLs" });
//         }

//         let urls1 = [];
//         for (let i = 0; i < urlResults.length; i++) {
//           urls1 = [...urls1, ...urlResults[i].urls];
//         }
//         const urls = urls1;

//         const getSocialsQuery = "SELECT * FROM socials WHERE item_id = ?";
//         db1.query(getSocialsQuery, [id], (err, socialResults) => {
//           if (err) {
//             console.error("Error fetching socials:", err);
//             return res.status(500).json({ message: "Failed to fetch socials" });
//           }

//           const getIconsQuery = "SELECT * FROM icons WHERE item_id = ?";
//           db1.query(getIconsQuery, [id], (err, iconResults) => {
//             if (err) {
//               console.error("Error fetching icons:", err);
//               return res.status(500).json({ message: "Failed to fetch icons" });
//             }

//             const response = {
//               ...organization,
//               images: imageResults.map((img) => img.image_path),
//               urls,
//               socials: socialResults.length > 0 ? {
//                 phone: socialResults[0].phone,
//                 facebook: socialResults[0].facebook,
//                 twitter: socialResults[0].twitter,
//                 instagram: socialResults[0].instagram,
//                 location: socialResults[0].location,
//                 googlemap: socialResults[0].googlemap,
//                 mobile: socialResults[0].Mobile_number,
//               } : {},
//               icons: iconResults.map((icon) => ({
//                 name: icon.name,
//                 svg: icon.svg,
//                 qty: icon.qty,
//               })),
//             };

//             res.json(response);
//           });
//         });
//       });
//     });
//   });
// };

// export const updateOrganization = (req, res) => {
//   const { id } = req.params;
//   const {
//     name,
//     description,
//     category,
//     introductory_image_base64,
//     youtube_video_url,
//     images_base64,
//     urls,
//     socials,
//     icons,
//   } = req.body;

//   db1.beginTransaction(async (err) => {
//     if (err) {
//       console.error("❌ Error starting transaction:", err);
//       return res.status(500).json({ message: "Failed to start transaction" });
//     }

//     try {
//       const [rows] = await db1.promise().query("SELECT * FROM items WHERE id = ?", [id]);

//       if (rows.length === 0) {
//         await db1.promise().rollback();
//         return res.status(404).json({ message: "Organization not found" });
//       }

//       let introImagePath = rows[0].introductory_image_path;

//       if (introductory_image_base64) {
//         const matches = introductory_image_base64.match(/^data:(.+);base64,(.+)$/);
//         if (matches) {
//           const ext = matches[1].split("/")[1] || "png";
//           const fileName = uniqueImageName(ext);
//           const fileBuffer = Buffer.from(matches[2], "base64");
//           const uploadedUrl = await uploadToFTP(fileName, fileBuffer);

//           if (introImagePath) {
//             await deleteImageFile(introImagePath);
//           }

//           introImagePath = uploadedUrl;
//         }
//       }

//       await db1.promise().query(
//         `UPDATE items SET name = ?, description = ?, category = ?, introductory_image_path = ?, youtube_video_url = ? WHERE id = ?`,
//         [name, description, category, introImagePath, youtube_video_url, id]
//       );

//       if (images_base64 && images_base64.length > 0) {
//         for (const imgBase64 of images_base64) {
//           const matches = imgBase64.match(/^data:(.+);base64,(.+)$/);
//           if (matches) {
//             const ext = matches[1].split("/")[1] || "png";
//             const fileName = uniqueImageName(ext);
//             const fileBuffer = Buffer.from(matches[2], "base64");
//             const fileUrl = await uploadToFTP(fileName, fileBuffer);

//             await db1.promise().query("INSERT INTO item_images (item_id, image_path) VALUES (?, ?)", [id, fileUrl]);
//           }
//         }
//       }

//       await db1.promise().query("DELETE FROM item_urls WHERE item_id = ?", [id]);
//       if (urls && urls.length > 0) {
//         for (const u of urls) {
//           if (u.trim()) {
//             await db1.promise().query("INSERT INTO item_urls (item_id, urls) VALUES (?, ?)", [
//               id,
//               JSON.stringify([u]),
//             ]);
//           }
//         }
//       }

//       await db1.promise().query("DELETE FROM socials WHERE item_id = ?", [id]);
//       if (socials) {
//         await db1.promise().query(
//           "INSERT INTO socials (item_id, phone, facebook, twitter, instagram, location, googlemap, Mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//           [
//             id,
//             socials.phone || null,
//             socials.facebook || null,
//             socials.twitter || null,
//             socials.instagram || null,
//             socials.location || null,
//             socials.googlemap || "",
//             socials.mobile || null,
//           ]
//         );
//       }

//       await db1.promise().query("DELETE FROM icons WHERE item_id = ?", [id]);
//       if (icons && icons.length > 0) {
//         for (const icon of icons) {
//           if (icon.name.trim() && icon.svg.trim()) {
//             await db1.promise().query("INSERT INTO icons (item_id, name, svg, qty) VALUES (?, ?, ?, ?)", [
//               id,
//               icon.name,
//               icon.svg,
//               icon.qty,
//             ]);
//           }
//         }
//       }

//       await db1.promise().commit();
//       res.json({ message: "✅ Organization updated successfully", id });
//     } catch (error) {
//       console.error("❌ Transaction error:", error);
//       await db1.promise().rollback();
//       res.status(500).json({ message: "Failed to update organization", error: error.message });
//     }
//   });
// };

// export const deleteOrganizationImage = async (req, res) => {
//   const { id } = req.params;
//   const { imagePath } = req.body;

//   const deleteQuery = "DELETE FROM item_images WHERE item_id = ? AND image_path = ?";
//   db1.query(deleteQuery, [id, imagePath], async (err, result) => {
//     if (err) {
//       console.error("Error deleting image from database:", err);
//       return res.status(500).json({ message: "Failed to delete image" });
//     }
//     await deleteImageFile(imagePath);
//     res.json({ message: "Image deleted successfully" });
//   });
// };

// export const softDeleteOrganization = (req, res) => {
//   const { id } = req.params;

//   const query = "UPDATE items SET deletestatus = 1 WHERE id = ?";
//   db1.query(query, [id], (err, result) => {
//     if (err) {
//       console.error("❌ Error soft deleting organization:", err);
//       return res.status(500).json({ message: "Database error" });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Organization not found" });
//     }

//     res.status(200).json({ message: "✅ Organization soft deleted successfully" });
//   });
// };

// // Blog Controllers
// export const getAllDocuments = (req, res) => {
//   const sql = "SELECT * FROM document";
//   db1.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching documents:", err);
//       return res.status(500).json({ error: "Database query failed" });
//     }
//     res.json(DtoArr(results));
//   });
// };

// export const getBlogById = (req, res) => {
//   const { id } = req.params;

//   const documentQuery = "SELECT * FROM document WHERE id = ?";
//   db1.query(documentQuery, [id], (err, documentResults) => {
//     if (err) {
//       console.error("❌ Error fetching document:", err);
//       return res.status(500).json({ message: "Failed to fetch document" });
//     }

//     if (documentResults.length === 0) {
//       return res.status(404).json({ message: "Document not found" });
//     }

//     const document = documentResults[0];
//     if (document.deletestatus === 1) {
//       return res.status(404).json({ message: "Document not found" });
//     }

//     const sectionsQuery = `SELECT da.* FROM documentarr da WHERE da.document_id = ? ORDER BY da.id`;
//     db1.query(sectionsQuery, [id], (err, sectionsResults) => {
//       if (err) {
//         console.error("❌ Error fetching document sections:", err);
//         return res.status(500).json({ message: "Failed to fetch document sections" });
//       }

//       const sectionsWithBullets = [];
//       let processedSections = 0;

//       if (sectionsResults.length === 0) {
//         return res.json({
//           ...document,
//           sections: [],
//           ngos: null
//         });
//       }

//       sectionsResults.forEach((section, index) => {
//         const bulletsQuery = `SELECT dab.bullet FROM documentarrbullets dab WHERE dab.arr_id = ? ORDER BY dab.id`;
        
//         db1.query(bulletsQuery, [section.id], (err, bulletsResults) => {
//           if (err) {
//             console.error("❌ Error fetching bullets:", err);
//             return res.status(500).json({ message: "Failed to fetch bullets" });
//           }

//           sectionsWithBullets.push({
//             ...section,
//             bullets: bulletsResults.map(b => b.bullet)
//           });

//           processedSections++;

//           if (processedSections === sectionsResults.length) {
//             const ngoQuery = "SELECT * FROM ngos WHERE document_id = ?";
//             db1.query(ngoQuery, [id], (err, ngoResults) => {
//               if (err) {
//                 console.error("❌ Error fetching NGO:", err);
//                 return res.status(500).json({ message: "Failed to fetch NGO data" });
//               }

//               if (ngoResults.length === 0) {
//                 return res.json({
//                   ...document,
//                   sections: sectionsWithBullets,
//                   ngos: { categories: [] }
//                 });
//               }

//               const ngo = ngoResults[0];
//               const ngoCategoriesQuery = `SELECT na.* FROM ngosarr na WHERE na.ngos_id = ? ORDER BY na.id`;
//               db1.query(ngoCategoriesQuery, [ngo.id], (err, categoriesResults) => {
//                 if (err) {
//                   console.error("❌ Error fetching NGO categories:", err);
//                   return res.status(500).json({ message: "Failed to fetch NGO categories" });
//                 }

//                 const categoriesWithValues = [];
//                 let processedCategories = 0;

//                 if (categoriesResults.length === 0) {
//                   return res.json({
//                     ...document,
//                     sections: sectionsWithBullets,
//                     ngos: { ...ngo, categories: [] }
//                   });
//                 }

//                 categoriesResults.forEach((category, index) => {
//                   const ngoValuesQuery = `SELECT naf.value FROM ngosarrof naf WHERE naf.ngos_arr_id = ? ORDER BY naf.id`;
                  
//                   db1.query(ngoValuesQuery, [category.id], (err, valuesResults) => {
//                     if (err) {
//                       console.error("❌ Error fetching NGO values:", err);
//                       return res.status(500).json({ message: "Failed to fetch NGO values" });
//                     }

//                     categoriesWithValues.push({
//                       ...category,
//                       values: valuesResults.map(v => v.value)
//                     });

//                     processedCategories++;

//                     if (processedCategories === categoriesResults.length) {
//                       res.json({
//                         ...document,
//                         sections: sectionsWithBullets,
//                         ngos: {
//                           ...ngo,
//                           categories: categoriesWithValues
//                         }
//                       });
//                     }
//                   });
//                 });
//               });
//             });
//           }
//         });
//       });
//     });
//   });
// };

// export const createBlog = (req, res) => {
//   const {
//     Name,
//     intro,
//     conclusion,
//     image_base64,
//     sections,
//     ngos
//   } = req.body;

//   db1.beginTransaction(async (err) => {
//     if (err) {
//       console.error("❌ Transaction start error:", err);
//       return res.status(500).json({ message: "Failed to start transaction" });
//     }

//     try {
//       let imagePath = null;
//       if (image_base64) {
//         const matches = image_base64.match(/^data:(.+);base64,(.+)$/);
//         if (matches) {
//           const ext = matches[1].split("/")[1] || "png";
//           const fileName = `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
//           const fileBuffer = Buffer.from(matches[2], "base64");
//           imagePath = await uploadToFTP(fileName, fileBuffer);
//         }
//       }

//       const insertDocumentQuery = `INSERT INTO document (Name, intro, conclusion, image_path) VALUES (?, ?, ?, ?)`;
//       const documentParams = [Name, intro, conclusion, imagePath];

//       const documentResult = await new Promise((resolve, reject) => {
//         db1.query(insertDocumentQuery, documentParams, (err, result) => {
//           if (err) reject(new Error(`Document insertion failed: ${err.message}`));
//           else resolve(result);
//         });
//       });

//       const documentId = documentResult.insertId;

//       if (sections && sections.length > 0) {
//         for (const section of sections) {
//           const insertSectionQuery = `INSERT INTO documentarr (document_id, heading, start, bullet_header, end) VALUES (?, ?, ?, ?, ?)`;
//           const sectionParams = [
//             documentId,
//             section.heading || null,
//             section.start || null,
//             section.bullet_header || null,
//             section.end || null
//           ];

//           const sectionResult = await new Promise((resolve, reject) => {
//             db1.query(insertSectionQuery, sectionParams, (err, result) => {
//               if (err) reject(new Error(`Section insertion failed: ${err.message}`));
//               else resolve(result);
//             });
//           });

//           if (section.bullets && section.bullets.length > 0) {
//             for (const bullet of section.bullets) {
//               if (bullet && bullet.trim()) {
//                 const insertBulletQuery = `INSERT INTO documentarrbullets (arr_id, bullet) VALUES (?, ?)`;
//                 await new Promise((resolve, reject) => {
//                   db1.query(insertBulletQuery, [sectionResult.insertId, bullet], (err) => {
//                     if (err) reject(new Error(`Bullet insertion failed: ${err.message}`));
//                     else resolve();
//                   });
//                 });
//               }
//             }
//           }
//         }
//       }

//       if (ngos && (ngos.intro || (ngos.categories && ngos.categories.length > 0))) {
//         const insertNgoQuery = "INSERT INTO ngos (document_id, intro) VALUES (?, ?)";
//         const ngoResult = await new Promise((resolve, reject) => {
//           db1.query(insertNgoQuery, [documentId, ngos.intro || null], (err, result) => {
//             if (err) reject(new Error(`NGO insertion failed: ${err.message}`));
//             else resolve(result);
//           });
//         });

//         const ngoId = ngoResult.insertId;

//         if (ngos.categories && ngos.categories.length > 0) {
//           for (const category of ngos.categories) {
//             if (category.h1 || (category.values && category.values.length > 0)) {
//               const insertCategoryQuery = "INSERT INTO ngosarr (ngos_id, h1) VALUES (?, ?)";
//               const categoryResult = await new Promise((resolve, reject) => {
//                 db1.query(insertCategoryQuery, [ngoId, category.h1 || null], (err, result) => {
//                   if (err) reject(new Error(`NGO category insertion failed: ${err.message}`));
//                   else resolve(result);
//                 });
//               });

//               if (category.values && category.values.length > 0) {
//                 for (const value of category.values) {
//                   if (value && value.trim()) {
//                     const insertValueQuery = "INSERT INTO ngosarrof (ngos_arr_id, value) VALUES (?, ?)";
//                     await new Promise((resolve, reject) => {
//                       db1.query(insertValueQuery, [categoryResult.insertId, value], (err) => {
//                         if (err) reject(new Error(`NGO value insertion failed: ${err.message}`));
//                         else resolve();
//                       });
//                     });
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }

//       await new Promise((resolve, reject) => {
//         db1.commit((err) => {
//           if (err) {
//             db1.rollback(() => {
//               reject(new Error(`Transaction commit failed: ${err.message}`));
//             });
//           } else {
//             resolve();
//           }
//         });
//       });

//       res.status(201).json({ 
//         message: "Blog created successfully",
//         id: documentId
//       });

//     } catch (error) {
//       db1.rollback(() => {
//         console.error("❌ Transaction rolled back:", error.message);
//         res.status(500).json({ 
//           message: "Failed to create blog",
//           error: error.message 
//         });
//       });
//     }
//   });
// };

// export const updateBlog = (req, res) => {
//   const { id } = req.params;
//   const {
//     Name,
//     intro,
//     conclusion,
//     image_base64,
//     sections,
//     ngos
//   } = req.body;

//   db1.beginTransaction(async (err) => {
//     if (err) {
//       console.error("❌ Transaction start error:", err);
//       return res.status(500).json({ message: "Failed to start transaction" });
//     }

//     try {
//       let imagePath = null;
      
//       if (image_base64) {
//         const matches = image_base64.match(/^data:(.+);base64,(.+)$/);
//         if (matches) {
//           const ext = matches[1].split("/")[1] || "png";
//           const fileName = `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
//           const fileBuffer = Buffer.from(matches[2], "base64");
//           const uploadedUrl = await uploadToFTP(fileName, fileBuffer);
//           imagePath = uploadedUrl;
//         }
//       }

//       await new Promise((resolve, reject) => {
//         db1.query('SELECT * FROM document WHERE id=?', [id], (err1, results) => {
//           if (err1) {
//             return reject(err1);
//           }
//           const get = results[0].image_path;
//           (async () => {
//             try {
//               await deleteImageFile(get);
//             } catch (e) {
//               console.error("Error deleting old blog image:", e);
//             } finally {
//               resolve();
//             }
//           })();
//         });
//       });

//       let updateDocumentQuery;
//       let documentParams;

//       if (imagePath) {
//         updateDocumentQuery = `UPDATE document SET Name = ?, intro = ?, conclusion = ?, image_path = ? WHERE id = ?`;
//         documentParams = [Name, intro, conclusion, imagePath, id];
//       } else {
//         updateDocumentQuery = `UPDATE document SET Name = ?, intro = ?, conclusion = ? WHERE id = ?`;
//         documentParams = [Name, intro, conclusion, id];
//       }

//       await new Promise((resolve, reject) => {
//         db1.query(updateDocumentQuery, documentParams, (err, result) => {
//           if (err) {
//             reject(new Error(`Document update failed: ${err.message}`));
//           } else if (result.affectedRows === 0) {
//             reject(new Error("Document not found"));
//           } else {
//             resolve(result);
//           }
//         });
//       });

//       await new Promise((resolve, reject) => {
//         const deleteBulletsQuery = `DELETE dab FROM documentarrbullets dab INNER JOIN documentarr da ON dab.arr_id = da.id WHERE da.document_id = ?`;
//         db1.query(deleteBulletsQuery, [id], (err) => {
//           if (err) reject(new Error(`Bullets deletion failed: ${err.message}`));
//           else resolve();
//         });
//       });

//       await new Promise((resolve, reject) => {
//         const deleteSectionsQuery = "DELETE FROM documentarr WHERE document_id = ?";
//         db1.query(deleteSectionsQuery, [id], (err) => {
//           if (err) reject(new Error(`Sections deletion failed: ${err.message}`));
//           else resolve();
//         });
//       });

//       if (sections && sections.length > 0) {
//         for (const section of sections) {
//           const insertSectionQuery = `INSERT INTO documentarr (document_id, heading, start, bullet_header, end) VALUES (?, ?, ?, ?, ?)`;
//           const sectionParams = [
//             id,
//             section.heading || null,
//             section.start || null,
//             section.bullet_header || null,
//             section.end || null
//           ];

//           const sectionResult = await new Promise((resolve, reject) => {
//             db1.query(insertSectionQuery, sectionParams, (err, result) => {
//               if (err) reject(new Error(`Section insertion failed: ${err.message}`));
//               else resolve(result);
//             });
//           });

//           if (section.bullets && section.bullets.length > 0) {
//             for (const bullet of section.bullets) {
//               if (bullet.trim()) {
//                 const insertBulletQuery = `INSERT INTO documentarrbullets (arr_id, bullet) VALUES (?, ?)`;
//                 await new Promise((resolve, reject) => {
//                   db1.query(insertBulletQuery, [sectionResult.insertId, bullet], (err) => {
//                     if (err) reject(new Error(`Bullet insertion failed: ${err.message}`));
//                     else resolve();
//                   });
//                 });
//               }
//             }
//           }
//         }
//       }

//       const checkNgoQuery = "SELECT id FROM ngos WHERE document_id = ?";
//       const ngoResults = await new Promise((resolve, reject) => {
//         db1.query(checkNgoQuery, [id], (err, results) => {
//           if (err) reject(new Error(`NGO check failed: ${err.message}`));
//           else resolve(results);
//         });
//       });

//       if (ngos) {
//         if (ngoResults.length > 0) {
//           const ngoId = ngoResults[0].id;
          
//           const updateNgoQuery = "UPDATE ngos SET intro = ? WHERE id = ?";
//           await new Promise((resolve, reject) => {
//             db1.query(updateNgoQuery, [ngos.intro || null, ngoId], (err) => {
//               if (err) reject(new Error(`NGO update failed: ${err.message}`));
//               else resolve();
//             });
//           });

//           await new Promise((resolve, reject) => {
//             const deleteNgoValuesQuery = `DELETE naf FROM ngosarrof naf INNER JOIN ngosarr na ON naf.ngos_arr_id = na.id WHERE na.ngos_id = ?`;
//             db1.query(deleteNgoValuesQuery, [ngoId], (err) => {
//               if (err) reject(new Error(`NGO values deletion failed: ${err.message}`));
//               else resolve();
//             });
//           });

//           await new Promise((resolve, reject) => {
//             const deleteNgoCategoriesQuery = "DELETE FROM ngosarr WHERE ngos_id = ?";
//             db1.query(deleteNgoCategoriesQuery, [ngoId], (err) => {
//               if (err) reject(new Error(`NGO categories deletion failed: ${err.message}`));
//               else resolve();
//             });
//           });

//           if (ngos.categories && ngos.categories.length > 0) {
//             for (const category of ngos.categories) {
//               const insertCategoryQuery = "INSERT INTO ngosarr (ngos_id, h1) VALUES (?, ?)";
//               const categoryResult = await new Promise((resolve, reject) => {
//                 db1.query(insertCategoryQuery, [ngoId, category.h1 || null], (err, result) => {
//                   if (err) reject(new Error(`NGO category insertion failed: ${err.message}`));
//                   else resolve(result);
//                 });
//               });

//               if (category.values && category.values.length > 0) {
//                 for (const value of category.values) {
//                   if (value.trim()) {
//                     const insertValueQuery = "INSERT INTO ngosarrof (ngos_arr_id, value) VALUES (?, ?)";
//                     await new Promise((resolve, reject) => {
//                       db1.query(insertValueQuery, [categoryResult.insertId, value], (err) => {
//                         if (err) reject(new Error(`NGO value insertion failed: ${err.message}`));
//                         else resolve();
//                       });
//                     });
//                   }
//                 }
//               }
//             }
//           }

//         } else {
//           const insertNgoQuery = "INSERT INTO ngos (document_id, intro) VALUES (?, ?)";
//           const ngoResult = await new Promise((resolve, reject) => {
//             db1.query(insertNgoQuery, [id, ngos.intro || null], (err, result) => {
//               if (err) reject(new Error(`NGO insertion failed: ${err.message}`));
//               else resolve(result);
//             });
//           });

//           if (ngos.categories && ngos.categories.length > 0) {
//             for (const category of ngos.categories) {
//               const insertCategoryQuery = "INSERT INTO ngosarr (ngos_id, h1) VALUES (?, ?)";
//               const categoryResult = await new Promise((resolve, reject) => {
//                 db1.query(insertCategoryQuery, [ngoResult.insertId, category.h1 || null], (err, result) => {
//                   if (err) reject(new Error(`NGO category insertion failed: ${err.message}`));
//                   else resolve(result);
//                 });
//               });

//               if (category.values && category.values.length > 0) {
//                 for (const value of category.values) {
//                   if (value.trim()) {
//                     const insertValueQuery = "INSERT INTO ngosarrof (ngos_arr_id, value) VALUES (?, ?)";
//                     await new Promise((resolve, reject) => {
//                       db1.query(insertValueQuery, [categoryResult.insertId, value], (err) => {
//                         if (err) reject(new Error(`NGO value insertion failed: ${err.message}`));
//                         else resolve();
//                       });
//                     });
//                   }
//                 }
//               }
//             }
//           }
//         }
//       } else {
//         if (ngoResults.length > 0) {
//           const ngoId = ngoResults[0].id;
          
//           await new Promise((resolve, reject) => {
//             const deleteNgoValuesQuery = `DELETE naf FROM ngosarrof naf INNER JOIN ngosarr na ON naf.ngos_arr_id = na.id WHERE na.ngos_id = ?`;
//             db1.query(deleteNgoValuesQuery, [ngoId], (err) => {
//               if (err) reject(new Error(`NGO values deletion failed: ${err.message}`));
//               else resolve();
//             });
//           });

//           await new Promise((resolve, reject) => {
//             const deleteNgoCategoriesQuery = "DELETE FROM ngosarr WHERE ngos_id = ?";
//             db1.query(deleteNgoCategoriesQuery, [ngoId], (err) => {
//               if (err) reject(new Error(`NGO categories deletion failed: ${err.message}`));
//               else resolve();
//             });
//           });

//           await new Promise((resolve, reject) => {
//             const deleteNgoQuery = "DELETE FROM ngos WHERE id = ?";
//             db1.query(deleteNgoQuery, [ngoId], (err) => {
//               if (err) reject(new Error(`NGO deletion failed: ${err.message}`));
//               else resolve();
//             });
//           });
//         }
//       }

//       await new Promise((resolve, reject) => {
//         db1.commit((err) => {
//           if (err) {
//             db1.rollback(() => {
//               reject(new Error(`Transaction commit failed: ${err.message}`));
//             });
//           } else {
//             resolve();
//           }
//         });
//       });

//       res.status(200).json({ 
//         message: "Blog updated successfully",
//         id: id
//       });

//     } catch (error) {
//       db1.rollback(() => {
//         console.error("❌ Transaction rolled back:", error.message);
//         res.status(500).json({ 
//           message: "Failed to update blog",
//           error: error.message 
//         });
//       });
//     }
//   });
// };

// export const deleteBlog = (req, res) => {
//   const id = req.params.id;
//   const query = 'UPDATE document SET deletestatus=1 WHERE id=?';

//   db1.query(query, [id], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: "could not delete" });
//     }
//     if (results.affectedRows === 0) {
//       return res.status(404).json({ message: "Organization not found" });
//     }
//     db1.query('SELECT * FROM document WHERE id=?', [id], async (err1, results) => {
//       if (err1) {
//         return res.status(500).json({ message: "could not delete" });
//       }
//       const get = results[0].image_path;
//       await deleteImageFile(get);
//       return res.status(200).json({ message: "Blog deleted Successfully" });
//     });
//   });
// };

// // Success Story Controllers
// export const getAllSuccessStories = (req, res) => {
//   const query = "SELECT * FROM successstories WHERE deletestatus = 0 ORDER BY id DESC";
  
//   db1.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching success stories:", err);
//       return res.status(500).json({ error: "Failed to fetch success stories" });
//     }
//     res.status(200).json(DtoArr(results));
//   });
// };

// export const createSuccessStory = (req, res) => {
//   const { title, urdu_title, link, youtube_id, description } = req.body;
  
//   if (!title || !youtube_id) {
//     return res.status(400).json({ error: "Title and YouTube ID are required" });
//   }
  
//   const query = `INSERT INTO successstories (title, urdu_title, link, youtube_id, description, deletestatus) VALUES (?, ?, ?, ?, ?, 0)`;
  
//   db1.query(query, [title, urdu_title || null, link || null, youtube_id, description || null], (err, results) => {
//     if (err) {
//       console.error("Error creating success story:", err);
//       return res.status(500).json({ error: "Failed to create success story" });
//     }
    
//     res.status(201).json({
//       id: results.insertId,
//       message: "Success story created successfully"
//     });
//   });
// };

// export const updateSuccessStory = (req, res) => {
//   const { id } = req.params;
//   const { title, urdu_title, link, youtube_id, description } = req.body;
  
//   if (!title || !youtube_id) {
//     return res.status(400).json({ error: "Title and YouTube ID are required" });
//   }
  
//   const query = `UPDATE successstories SET title = ?, urdu_title = ?, link = ?, youtube_id = ?, description = ? WHERE id = ? AND deletestatus = 0`;
  
//   db1.query(query, [title, urdu_title || null, link || null, youtube_id, description || null, id], (err, results) => {
//     if (err) {
//       console.error("Error updating success story:", err);
//       return res.status(500).json({ error: "Failed to update success story" });
//     }
    
//     if (results.affectedRows === 0) {
//       return res.status(404).json({ error: "Success story not found" });
//     }
    
//     res.json({ message: "Success story updated successfully" });
//   });
// };

// export const deleteSuccessStory = (req, res) => {
//   const { id } = req.params;
//   const query = "UPDATE successstories SET deletestatus = 1 WHERE id = ?";
  
//   db1.query(query, [id], (err, results) => {
//     if (err) {
//       console.error("Error deleting success story:", err);
//       return res.status(500).json({ error: "Failed to delete success story" });
//     }
    
//     if (results.affectedRows === 0) {
//       return res.status(404).json({ error: "Success story not found" });
//     }
    
//     res.json({ message: "Success story deleted successfully" });
//   });
// };

// // Video Controllers
// const saveBase64Image = async (image_base64) => {
//   let imagePath = null;
  
//   if (image_base64) {
//     const matches = image_base64.match(/^data:(.+);base64,(.+)$/);
//     if (matches) {
//       const ext = matches[1].split("/")[1] || "png";
//       const fileName = `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
//       const fileBuffer = Buffer.from(matches[2], "base64");
//       imagePath = await uploadToFTP(fileName, fileBuffer);
//     }
//   }
  
//   return imagePath;
// };

// export const getAllVideos = (req, res) => {
//   const query = "SELECT * FROM videos WHERE deletestatus = 0 ORDER BY id DESC";
  
//   db1.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching videos:", err);
//       return res.status(500).json({ error: "Failed to fetch videos" });
//     }
//     res.json(results);
//   });
// };

// export const createVideo = async (req, res) => {
//   const { title, youtube_id, thumbnail, description } = req.body;
  
//   if (!title || !youtube_id || !thumbnail) {
//     return res.status(400).json({ error: "Title, YouTube ID, and thumbnail are required" });
//   }

//   let imagePath = null;
  
//   try {
//     imagePath = await saveBase64Image(thumbnail);
    
//     if (!imagePath) {
//       return res.status(400).json({ error: "Failed to process thumbnail image" });
//     }
//   } catch (error) {
//     console.error("Error saving image:", error);
//     return res.status(500).json({ error: "Failed to save thumbnail image" });
//   }
  
//   const query = `INSERT INTO videos (title, youtube_id, thumbnail, description, deletestatus) VALUES (?, ?, ?, ?, 0)`;
  
//   db1.query(query, [title, youtube_id, imagePath, description || null], (err, results) => {
//     if (err) {
//       console.error("Error creating video:", err);
//       return res.status(500).json({ error: "Failed to create video" });
//     }
    
//     res.status(201).json({
//       id: results.insertId,
//       message: "Video created successfully",
//       thumbnail: imagePath
//     });
//   });
// };

// export const updateVideo = (req, res) => {
//   const { id } = req.params;
//   const { title, youtube_id, thumbnail, description } = req.body;
  
//   if (!title || !youtube_id) {
//     return res.status(400).json({ error: "Title and YouTube ID are required" });
//   }

//   const getQuery = "SELECT thumbnail FROM videos WHERE id = ? AND deletestatus = 0";
  
//   db1.query(getQuery, [id], async (err, results) => {
//     if (err) {
//       console.error("Error fetching video for update:", err);
//       return res.status(500).json({ error: "Failed to fetch video" });
//     }
    
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Video not found" });
//     }

//     const currentVideo = results[0];
//     let imagePath = currentVideo.thumbnail;

//     if (thumbnail && thumbnail.startsWith('data:image')) {
//       try {
//         if (currentVideo.thumbnail) {
//           await deleteImageFile(currentVideo.thumbnail);
//         }
        
//         imagePath = await saveBase64Image(thumbnail);
        
//         if (!imagePath) {
//           return res.status(400).json({ error: "Failed to process thumbnail image" });
//         }
//       } catch (error) {
//         console.error("Error saving image:", error);
//         return res.status(500).json({ error: "Failed to save thumbnail image" });
//       }
//     }
    
//     const updateQuery = `UPDATE videos SET title = ?, youtube_id = ?, thumbnail = ?, description = ? WHERE id = ? AND deletestatus = 0`;
    
//     db1.query(updateQuery, [title, youtube_id, imagePath, description || null, id], (err, results) => {
//       if (err) {
//         console.error("Error updating video:", err);
//         return res.status(500).json({ error: "Failed to update video" });
//       }
      
//       if (results.affectedRows === 0) {
//         return res.status(404).json({ error: "Video not found" });
//       }
      
//       res.json({ 
//         message: "Video updated successfully",
//         thumbnail: imagePath
//       });
//     });
//   });
// };

// export const deleteVideo = (req, res) => {
//   const { id } = req.params;
  
//   const getQuery = "SELECT thumbnail FROM videos WHERE id = ? AND deletestatus = 0";
  
//   db1.query(getQuery, [id], async (err, results) => {
//     if (err) {
//       console.error("Error fetching video for deletion:", err);
//       return res.status(500).json({ error: "Failed to fetch video" });
//     }
    
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Video not found" });
//     }

//     const video = results[0];
//     if (video.thumbnail) {
//       await deleteImageFile(video.thumbnail);
//     }

//     const deleteQuery = "UPDATE videos SET deletestatus = 1 WHERE id = ?";
    
//     db1.query(deleteQuery, [id], (err, results) => {
//       if (err) {
//         console.error("Error deleting video:", err);
//         return res.status(500).json({ error: "Failed to delete video" });
//       }
      
//       if (results.affectedRows === 0) {
//         return res.status(404).json({ error: "Video not found" });
//       }
      
//       res.json({ message: "Video deleted successfully" });
//     });
//   });
// };




// // Change Password Controller
// export const changePassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   const userId = req.user.id; // From auth middleware

//   if (!currentPassword || !newPassword) {
//     return res.status(400).json({ error: "Current password and new password are required" });
//   }

//   if (newPassword.length < 6) {
//     return res.status(400).json({ error: "New password must be at least 6 characters long" });
//   }

//   try {
//     // Get user current password from database
//     const getUserQuery = "SELECT password FROM users WHERE id = ?";
    
//     db.query(getUserQuery, [userId], async (err, results) => {
//       if (err) {
//         console.error("Error fetching user:", err);
//         return res.status(500).json({ error: "Database error" });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       const user = results[0];

//       // Verify current password
//       const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
//       if (!isCurrentPasswordValid) {
//         return res.status(400).json({ error: "Current password is incorrect" });
//       }

//       // Hash new password
//       const saltRounds = 10;
//       const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

//       // Update password in database
//       const updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";
      
//       db.query(updatePasswordQuery, [hashedNewPassword, userId], (updateErr, updateResults) => {
//         if (updateErr) {
//           console.error("Error updating password:", updateErr);
//           return res.status(500).json({ error: "Failed to update password" });
//         }

//         res.status(200).json({ message: "Password changed successfully" });
//       });
//     });
//   } catch (error) {
//     console.error("Change password error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db1 from '../Database/oldDB.js'
import { uploadToFTP, deleteFromFTP } from "../utils/ftpUpload.js";
import { DtoArr } from "../Dto/objectDto.js";

// Utility Functions
function uniqueImageName(extension = "png") {
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}.${extension}`;
}

const deleteImageFile = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    await deleteFromFTP(imageUrl);
    console.log(`Requested deletion of: ${imageUrl}`);
  } catch (error) {
    console.error('Error deleting image file from FTP:', error);
  }
};

// Auth Controllers
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db1.query(query, [email], async (err, results) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "6d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    delete user.password;
    const auth = { auth: true };
    return res.status(200).json({ message: "Login successful", user: { ...user, ...auth } });
  });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};

// Organization Controllers
export const getAllOrganizations = (req, res) => {
  const query = `
    SELECT 
      i.id, 
      i.name,
      i.deletestatus, 
      i.description, 
      i.category, 
      i.introductory_image_path
      FROM items i
  `;

  db1.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching organizations:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const formatted = results.map((row) => ({
      id: row.id,
      deletestatus: row.deletestatus,
      name: row.name,
      description: row.description,
      category: row.category,
      introductory_image_path: row.introductory_image_path,
      images: row.images ? [...new Set(row.images.split(","))] : [],
      urls: row.urls ? [...new Set(row.urls.split(","))] : [],
      socials: row.socials || {},
      icons: row.icons || [],
    }));

    res.status(200).json(DtoArr(formatted));
  });
};

// export const createOrganization = async (req, res) => {
//   const {
//     name,
//     description,
//     category,
//     introductory_image_base64,
//     youtube_video_url,
//     images_base64,
//     urls,
//     socials,
//     icons,
//   } = req.body;

//   const conn = await db1.promise().getConnection();

//   try {
//     await conn.beginTransaction();

//     let introImagePath = null;
//     if (introductory_image_base64) {
//       const matches = introductory_image_base64.match(/^data:(.+);base64,(.+)$/);
//       if (matches) {
//         const ext = matches[1].split("/")[1] || "png";
//         const fileName = uniqueImageName(ext);
//         const fileBuffer = Buffer.from(matches[2], "base64");
//         const uploadedUrl = await uploadToFTP(fileName, fileBuffer);
//         introImagePath = uploadedUrl;
//       }
//     }

//     const [result] = await conn.query(
//       `INSERT INTO items (name, description, category, introductory_image_path, youtube_video_url) VALUES (?, ?, ?, ?, ?)`,
//       [name, description, category, introImagePath, youtube_video_url]
//     );

//     const itemId = result.insertId;

//     if (images_base64 && images_base64.length > 0) {
//       for (const imgBase64 of images_base64) {
//         const matches = imgBase64.match(/^data:(.+);base64,(.+)$/);
//         if (matches) {
//           const ext = matches[1].split("/")[1] || "png";
//           const fileName = uniqueImageName(ext);
//           const fileBuffer = Buffer.from(matches[2], "base64");
//           const fileUrl = await uploadToFTP(fileName, fileBuffer);
//           await conn.query("INSERT INTO item_images (item_id, image_path) VALUES (?, ?)", [
//             itemId,
//             fileUrl,
//           ]);
//         }
//       }
//     }

//     if (urls && urls.length > 0) {
//       for (const u of urls) {
//         await conn.query("INSERT INTO item_urls (item_id, urls) VALUES (?, ?)", [
//           itemId,
//           JSON.stringify([u]),
//         ]);
//       }
//     }

//     if (socials) {
//       await conn.query(
//         "INSERT INTO socials (item_id, phone, facebook, twitter, instagram, location, googlemap, Mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//         [
//           itemId,
//           socials.phone || null,
//           socials.facebook || null,
//           socials.twitter || null,
//           socials.instagram || null,
//           socials.location || null,
//           socials.googlemap || "",
//           socials.mobile || null,
//         ]
//       );
//     }

//     if (icons && icons.length > 0) {
//       for (const icon of icons) {
//         await conn.query(
//           "INSERT INTO icons (item_id, name, svg, qty) VALUES (?, ?, ?, ?)",
//           [itemId, icon.name, icon.svg, icon.qty]
//         );
//       }
//     }

//     await conn.commit();
//     conn.release();
//     res.status(201).json({ message: "✅ Organization created successfully", id: itemId });
//   } catch (error) {
//     await conn.rollback();
//     conn.release();
//     res.status(500).json({ message: "Failed to create organization", error: error.message });
//   }
// };


export const createOrganization = async (req, res) => {
  const {
    name,
    description,
    category,
    introductory_image_base64,
    youtube_video_url,
    slug,
    meta_title,
    meta_description,
    meta_keywords,
    images_base64,
   
    socials,
    icons,
  } = req.body;

  const conn = await db1.promise().getConnection();

  try {
    await conn.beginTransaction();

    // Validate required fields
    if (!name || !description || !category || !introductory_image_base64 || !slug) {
      await conn.rollback();
      conn.release();
      return res.status(400).json({
        message: "Missing required fields: name, description, category, introductory_image_base64, and Slug are required"
      });
    }

    // Check if slug already exists
    const [existingSlug] = await conn.query(
      `SELECT id FROM items WHERE slug = ?`,
      [slug]
    );

    if (existingSlug.length > 0) {
      await conn.rollback();
      conn.release();
      return res.status(400).json({
        message: "Slug already exists. Please choose a different one."
      });
    }

    // 1. Process introductory image first (if exists)
    const introImagePath = await createProcessIntroImage(introductory_image_base64);

    // 2. Insert main organization record with SEO fields
    const [result] = await conn.query(
      `INSERT INTO items 
       (name, description, category, introductory_image_path, youtube_video_url, slug, meta_title, meta_description, meta_keywords) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        description, 
        category, 
        introImagePath, 
        youtube_video_url,
        slug,
        meta_title || null,
        meta_description || null,
        meta_keywords || null
      ]
    );

    const itemId = result.insertId;

    // 3. Process all related data in parallel
    await Promise.all([
      createProcessAdditionalImages(conn, itemId, images_base64),
      createProcessSocials(conn, itemId, socials),
      createProcessIcons(conn, itemId, icons)
    ]);

    await conn.commit();
    conn.release();
    
    res.status(201).json({ 
      message: "✅ Organization created successfully", 
      id: itemId,
      slug: slug
    });
  } catch (error) {
    console.error("❌ Organization creation error:", error);
    await conn.rollback();
    conn.release();
    
    // Handle duplicate slug error (if unique constraint exists in database)
    if (error.code === 'ER_DUP_ENTRY' || error.message.includes('Duplicate entry')) {
      return res.status(400).json({ 
        message: "Slug already exists. Please choose a different one.",
        error: "DUPLICATE_SLUG"
      });
    }
    
    res.status(500).json({ 
      message: "Failed to create organization", 
      error: error.message 
    });
  }
};
// Helper Functions for Create Organization (Unique names)
async function createProcessIntroImage(introductory_image_base64) {
  if (!introductory_image_base64) return null;

  const matches = introductory_image_base64.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid introductory image format');
  }

  const ext = matches[1].split("/")[1] || "png";
  const fileName = uniqueImageName(ext);
  const fileBuffer = Buffer.from(matches[2], "base64");
  
  return await uploadToFTP(fileName, fileBuffer);
}

async function createProcessAdditionalImages(conn, itemId, images_base64) {
  if (!images_base64 || !Array.isArray(images_base64) || images_base64.length === 0) {
    return;
  }

  // Filter and validate base64 images
  const validImages = images_base64.filter(img => 
    typeof img === 'string' && img.match(/^data:(.+);base64,(.+)$/)
  );

  if (validImages.length === 0) return;

  // Process images in parallel with concurrency control
  const BATCH_SIZE = 3;
  const imageBatches = [];
  
  for (let i = 0; i < validImages.length; i += BATCH_SIZE) {
    imageBatches.push(validImages.slice(i, i + BATCH_SIZE));
  }

  for (const batch of imageBatches) {
    const imageUploadPromises = batch.map(imgBase64 => 
      createUploadSingleImage(imgBase64)
    );

    const uploadedUrls = await Promise.all(imageUploadPromises);
    
    // Batch insert all images from this batch
    if (uploadedUrls.length > 0) {
      const values = uploadedUrls.map(url => [itemId, url]);
      await conn.query(
        "INSERT INTO item_images (item_id, image_path) VALUES ?",
        [values]
      );
    }
  }
}

async function createUploadSingleImage(imageBase64) {
  const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid image format');
  }

  const ext = matches[1].split("/")[1] || "png";
  const fileName = uniqueImageName(ext);
  const fileBuffer = Buffer.from(matches[2], "base64");
  
  return await uploadToFTP(fileName, fileBuffer);
}

async function createProcessUrls(conn, itemId, urls) {
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return;
  }

  const validUrls = urls
    .filter(u => u && typeof u === 'string' && u.trim())
    .map(u => u.trim());

  if (validUrls.length === 0) return;

  // Batch insert all URLs
  const values = validUrls.map(u => [itemId, JSON.stringify([u])]);
  await conn.query(
    "INSERT INTO item_urls (item_id, urls) VALUES ?",
    [values]
  );
}

async function createProcessSocials(conn, itemId, socials) {
  if (!socials || typeof socials !== 'object') {
    return;
  }

  // Check if we have at least one non-empty social value
  const hasValidSocials = Object.values(socials).some(val => 
    val !== null && val !== undefined && val !== ''
  );

  if (hasValidSocials) {
    await conn.query(
      "INSERT INTO socials (item_id, phone, facebook, twitter, instagram, location, googlemap, Mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        itemId,
        socials.phone || null,
        socials.facebook || null,
        socials.twitter || null,
        socials.instagram || null,
        socials.location || null,
        socials.googlemap || "",
        socials.mobile || null,
      ]
    );
  }
}

async function createProcessIcons(conn, itemId, icons) {
  if (!icons || !Array.isArray(icons) || icons.length === 0) {
    return;
  }

  const validIcons = icons.filter(icon => 
    icon && 
    icon.name && typeof icon.name === 'string' && icon.name.trim() &&
    icon.svg && typeof icon.svg === 'string' && icon.svg.trim()
  );

  if (validIcons.length === 0) return;

  // Batch insert all icons
  const values = validIcons.map(icon => [
    itemId, 
    icon.name.trim(), 
    icon.svg.trim(), 
    icon.qty || 0
  ]);

  await conn.query(
    "INSERT INTO icons (item_id, name, svg, qty) VALUES ?",
    [values]
  );
}

export const getOrganizationById = (req, res) => {
  const { id } = req.params;

  const getItemQuery = "SELECT * FROM items WHERE id = ?";
  db1.query(getItemQuery, [id], (err, itemResults) => {
    if (err) {
      console.error("❌ Error fetching organization:", err);
      return res.status(500).json({ message: "Failed to fetch organization" });
    }

    if (itemResults.length === 0) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const organization = itemResults[0];
    if (organization.deletestatus === 1) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const getImagesQuery = "SELECT image_path FROM item_images WHERE item_id = ?";
    db1.query(getImagesQuery, [id], (err, imageResults) => {
      if (err) {
        console.error("Error fetching images:", err);
        return res.status(500).json({ message: "Failed to fetch images" });
      }

      const getUrlsQuery = "SELECT urls FROM item_urls WHERE item_id = ?";
      db1.query(getUrlsQuery, [id], (err, urlResults) => {
        if (err) {
          console.error("Error fetching URLs:", err);
          return res.status(500).json({ message: "Failed to fetch URLs" });
        }

        // let urls1 = [];
        // for (let i = 0; i < urlResults.length; i++) {
        //   urls1 = [...urls1, ...urlResults[i].urls];
        // }
    
        const urls = []
        
        const getSocialsQuery = "SELECT * FROM socials WHERE item_id = ?";
        db1.query(getSocialsQuery, [id], (err, socialResults) => {
          if (err) {
            console.error("Error fetching socials:", err);
            return res.status(500).json({ message: "Failed to fetch socials" });
          }

          const getIconsQuery = "SELECT * FROM icons WHERE item_id = ?";
          db1.query(getIconsQuery, [id], (err, iconResults) => {
            if (err) {
              console.error("Error fetching icons:", err);
              return res.status(500).json({ message: "Failed to fetch icons" });
            }

            const response = {
              ...organization,
              // Include SEO fields in the response
              slug: organization.slug || "",
              meta_title: organization.meta_title || "",
              meta_description: organization.meta_description || "",
              meta_keywords: organization.meta_keywords || "",
              images: imageResults.map((img) => img.image_path),
              urls,
              socials: socialResults.length > 0 ? {
                phone: socialResults[0].phone,
                facebook: socialResults[0].facebook,
                twitter: socialResults[0].twitter,
                instagram: socialResults[0].instagram,
                location: socialResults[0].location,
                googlemap: socialResults[0].googlemap,
                mobile: socialResults[0].Mobile_number,
              } : {},
              icons: iconResults.map((icon) => ({
                name: icon.name,
                svg: icon.svg,
                qty: icon.qty,
              })),
            };

            res.status(200).json(response);
          });
        });
      });
    });
  });
};




// export const updateOrganization = async (req, res) => {
//   const { id } = req.params;
//   const {
//     name,
//     description,
//     category,
//     introductory_image_base64,
//     youtube_video_url,
//     images_base64,
//     urls,
//     socials,
//     icons,
//   } = req.body;

//   const conn = await db1.promise().getConnection();

//   try {
//     await conn.beginTransaction();

//     const [rows] = await conn.query("SELECT * FROM items WHERE id = ?", [id]);

//     if (rows.length === 0) {
//       await conn.rollback();
//       conn.release();
//       return res.status(404).json({ message: "Organization not found" });
//     }

//     let introImagePath = rows[0].introductory_image_path;

//     if (introductory_image_base64) {
//       const matches = introductory_image_base64.match(/^data:(.+);base64,(.+)$/);
//       if (matches) {
//         const ext = matches[1].split("/")[1] || "png";
//         const fileName = uniqueImageName(ext);
//         const fileBuffer = Buffer.from(matches[2], "base64");
//         const uploadedUrl = await uploadToFTP(fileName, fileBuffer);

//         if (introImagePath) {
//           await deleteImageFile(introImagePath);
//         }

//         introImagePath = uploadedUrl;
//       }
//     }

//     await conn.query(
//       `UPDATE items SET name = ?, description = ?, category = ?, introductory_image_path = ?, youtube_video_url = ? WHERE id = ?`,
//       [name, description, category, introImagePath, youtube_video_url, id]
//     );

//     if (images_base64 && images_base64.length > 0) {
//       for (const imgBase64 of images_base64) {
//         const matches = imgBase64.match(/^data:(.+);base64,(.+)$/);
//         if (matches) {
//           const ext = matches[1].split("/")[1] || "png";
//           const fileName = uniqueImageName(ext);
//           const fileBuffer = Buffer.from(matches[2], "base64");
//           const fileUrl = await uploadToFTP(fileName, fileBuffer);

//           await conn.query("INSERT INTO item_images (item_id, image_path) VALUES (?, ?)", [id, fileUrl]);
//         }
//       }
//     }

//     await conn.query("DELETE FROM item_urls WHERE item_id = ?", [id]);
//     if (urls && urls.length > 0) {
//       for (const u of urls) {
//         if (u.trim()) {
//           await conn.query("INSERT INTO item_urls (item_id, urls) VALUES (?, ?)", [
//             id,
//             JSON.stringify([u]),
//           ]);
//         }
//       }
//     }

//     await conn.query("DELETE FROM socials WHERE item_id = ?", [id]);
//     if (socials) {
//       await conn.query(
//         "INSERT INTO socials (item_id, phone, facebook, twitter, instagram, location, googlemap, Mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//         [
//           id,
//           socials.phone || null,
//           socials.facebook || null,
//           socials.twitter || null,
//           socials.instagram || null,
//           socials.location || null,
//           socials.googlemap || "",
//           socials.mobile || null,
//         ]
//       );
//     }

//     await conn.query("DELETE FROM icons WHERE item_id = ?", [id]);
//     if (icons && icons.length > 0) {
//       for (const icon of icons) {
//         if (icon.name.trim() && icon.svg.trim()) {
//           await conn.query("INSERT INTO icons (item_id, name, svg, qty) VALUES (?, ?, ?, ?)", [
//             id,
//             icon.name,
//             icon.svg,
//             icon.qty,
//           ]);
//         }
//       }
//     }

//     await conn.commit();
//     conn.release();
//     res.json({ message: "✅ Organization updated successfully", id });
//   } catch (error) {
//     console.error("❌ Transaction error:", error);
//     await conn.rollback();
//     conn.release();
//     res.status(500).json({ message: "Failed to update organization", error: error.message });
//   }
// };


export const updateOrganization = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    category,
    introductory_image_base64,
    youtube_video_url,
    slug,
    meta_title,
    meta_description,
    meta_keywords,
    images_base64,
    urls,
    socials,
    icons,
  } = req.body;

  const conn = await db1.promise().getConnection();

  try {
    await conn.beginTransaction();

    // 1. Check if organization exists first and get current slug
    const [rows] = await conn.query("SELECT id, introductory_image_path, slug FROM items WHERE id = ?", [id]);
    if (rows.length === 0) {
      conn.release();
      return res.status(404).json({ message: "Organization not found" });
    }

    // 2. Check if slug is being changed and if new slug already exists (excluding current organization)
    if (slug && slug !== rows[0].slug) {
      const [existingSlug] = await conn.query(
        "SELECT id FROM items WHERE slug = ? AND id != ?",
        [slug, id]
      );

      if (existingSlug.length > 0) {
        await conn.rollback();
        conn.release();
        return res.status(400).json({
          message: "slug already exists. Please choose a different one.",
          error: "DUPLICATE_SLUG"
        });
      }
    }

    let introImagePath = rows[0].introductory_image_path;

    // 3. Process introductory image only if provided and valid
    if (introductory_image_base64) {
      introImagePath = await processSingleImage(introductory_image_base64, introImagePath);
    }

    // 4. Update main item with SEO fields in single query
    await conn.query(
      `UPDATE items SET 
        name = ?, 
        description = ?, 
        category = ?, 
        introductory_image_path = ?, 
        youtube_video_url = ?,
        slug = ?,
        meta_title = ?,
        meta_description = ?,
        meta_keywords = ?
       WHERE id = ?`,
      [
        name, 
        description, 
        category, 
        introImagePath, 
        youtube_video_url,
        slug || null,
        meta_title || null,
        meta_description || null,
        meta_keywords || null,
        id
      ]
    );

    // 5. Process all operations in parallel where possible
    await Promise.all([
      processAdditionalImages(conn, id, images_base64),
      processUrls(conn, id, urls),
      processSocials(conn, id, socials),
      processIcons(conn, id, icons)
    ]);

    await conn.commit();
    conn.release();
    
    res.json({ 
      message: "✅ Organization updated successfully", 
      id,
      slug: slug 
    });
  } catch (error) {
    console.error("❌ Transaction error:", error);
    await conn.rollback();
    conn.release();
    
    // Handle duplicate slug error (if unique constraint exists in database)
    if (error.code === 'ER_DUP_ENTRY' || error.message.includes('Duplicate entry')) {
      return res.status(400).json({ 
        message: "Slug already exists. Please choose a different one.",
        error: "DUPLICATE_SLUG"
      });
    }
    
    res.status(500).json({ 
      message: "Failed to update organization", 
      error: error.message 
    });
  }
};


// Helper functions for parallel processing
async function processSingleImage(imageBase64, existingImagePath) {
  const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
  if (!matches) return existingImagePath;

  const ext = matches[1].split("/")[1] || "png";
  const fileName = uniqueImageName(ext);
  const fileBuffer = Buffer.from(matches[2], "base64");
  
  // Delete old image only after successful upload
  const uploadedUrl = await uploadToFTP(fileName, fileBuffer);
  
  if (existingImagePath) {
    try {
      await deleteImageFile(existingImagePath);
    } catch (deleteError) {
      console.warn("Failed to delete old image:", deleteError);
    }
  }
  
  return uploadedUrl;
}

async function processAdditionalImages(conn, itemId, imagesBase64) {
  if (!imagesBase64 || !Array.isArray(imagesBase64) || imagesBase64.length === 0) {
    return;
  }

  // Filter valid base64 images first
  const validImages = imagesBase64.filter(img => 
    typeof img === 'string' && img.match(/^data:(.+);base64,(.+)$/)
  );

  if (validImages.length === 0) return;

  // Process images in parallel with limit to avoid overloading
  const imageUploadPromises = validImages.map(imgBase64 => 
    processSingleImage(imgBase64, null)
  );

  const uploadedUrls = await Promise.all(imageUploadPromises);

  // Batch insert all images in single query
  if (uploadedUrls.length > 0) {
    const values = uploadedUrls.map(url => [itemId, url]);
    await conn.query(
      "INSERT INTO item_images (item_id, image_path) VALUES ?",
      [values]
    );
  }
}

async function processUrls(conn, itemId, urls) {
  await conn.query("DELETE FROM item_urls WHERE item_id = ?", [itemId]);
  
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return;
  }

  const validUrls = urls.filter(u => u && typeof u === 'string' && u.trim());
  if (validUrls.length === 0) return;

  const values = validUrls.map(u => [itemId, JSON.stringify([u.trim()])]);
  await conn.query(
    "INSERT INTO item_urls (item_id, urls) VALUES ?",
    [values]
  );
}

async function processSocials(conn, itemId, socials) {
  await conn.query("DELETE FROM socials WHERE item_id = ?", [itemId]);
  
  if (!socials || typeof socials !== 'object') {
    return;
  }

  // Validate socials has at least one non-null value
  const hasValidSocials = Object.values(socials).some(val => 
    val !== null && val !== undefined && val !== ''
  );

  if (hasValidSocials) {
    await conn.query(
      "INSERT INTO socials (item_id, phone, facebook, twitter, instagram, location, googlemap, Mobile_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        itemId,
        socials.phone || null,
        socials.facebook || null,
        socials.twitter || null,
        socials.instagram || null,
        socials.location || null,
        socials.googlemap || "",
        socials.mobile || null,
      ]
    );
  }
}

async function processIcons(conn, itemId, icons) {
  await conn.query("DELETE FROM icons WHERE item_id = ?", [itemId]);
  
  if (!icons || !Array.isArray(icons) || icons.length === 0) {
    return;
  }

  const validIcons = icons.filter(icon => 
    icon && 
    icon.name && typeof icon.name === 'string' && icon.name.trim() &&
    icon.svg && typeof icon.svg === 'string' && icon.svg.trim()
  );

  if (validIcons.length === 0) return;

  const values = validIcons.map(icon => [
    itemId, 
    icon.name.trim(), 
    icon.svg.trim(), 
    icon.qty || 0
  ]);

  await conn.query(
    "INSERT INTO icons (item_id, name, svg, qty) VALUES ?",
    [values]
  );
}


export const deleteOrganizationImage = async (req, res) => {
  const { id } = req.params;
  const { imagePath } = req.body;

  const deleteQuery = "DELETE FROM item_images WHERE item_id = ? AND image_path = ?";
  db1.query(deleteQuery, [id, imagePath], async (err, result) => {
    if (err) {
      console.error("Error deleting image from database:", err);
      return res.status(500).json({ message: "Failed to delete image" });
    }
    await deleteImageFile(imagePath);
    res.json({ message: "Image deleted successfully" });
  });
};

export const softDeleteOrganization = (req, res) => {
  const { id } = req.params;

  const query = "UPDATE items SET deletestatus = 1 WHERE id = ?";
  db1.query(query, [id], (err, result) => {
    if (err) {
      console.error("❌ Error soft deleting organization:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({ message: "✅ Organization soft deleted successfully" });
  });
};

// Blog Controllers
export const getAllDocuments = (req, res) => {
  const sql = "SELECT * FROM document";
  db1.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching documents:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(DtoArr(results));
  });
};

export const getBlogById = (req, res) => {
  const { id } = req.params;

  const documentQuery = "SELECT * FROM document WHERE id = ?";
  db1.query(documentQuery, [id], (err, documentResults) => {
    if (err) {
      console.error("❌ Error fetching document:", err);
      return res.status(500).json({ message: "Failed to fetch document" });
    }

    if (documentResults.length === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    const document = documentResults[0];
    if (document.deletestatus === 1) {
      return res.status(404).json({ message: "Document not found" });
    }

    const sectionsQuery = `SELECT da.* FROM documentarr da WHERE da.document_id = ? ORDER BY da.id ASC`;
    db1.query(sectionsQuery, [id], (err, sectionsResults) => {
      if (err) {
        console.error("❌ Error fetching document sections:", err);
        return res.status(500).json({ message: "Failed to fetch document sections" });
      }

      const sectionsWithBullets = [];
      let processedSections = 0;

      if (sectionsResults.length === 0) {
        return res.json({
          ...document,
          sections: [],
          ngos: null
        });
      }

      sectionsResults.forEach((section, index) => {
        const bulletsQuery = `SELECT dab.bullet FROM documentarrbullets dab WHERE dab.arr_id = ? ORDER BY dab.id ASC`;
        
        db1.query(bulletsQuery, [section.id], (err, bulletsResults) => {
          if (err) {
            console.error("❌ Error fetching bullets:", err);
            return res.status(500).json({ message: "Failed to fetch bullets" });
          }

          sectionsWithBullets.push({
            ...section,
            bullets: bulletsResults.map(b => b.bullet)
          });

          processedSections++;

          if (processedSections === sectionsResults.length) {
            const ngoQuery = "SELECT * FROM ngos WHERE document_id = ?";
            db1.query(ngoQuery, [id], (err, ngoResults) => {
              if (err) {
                console.error("❌ Error fetching NGO:", err);
                return res.status(500).json({ message: "Failed to fetch NGO data" });
              }

              if (ngoResults.length === 0) {
                return res.json({
                  ...document,
                  sections: sectionsWithBullets,
                  ngos: { categories: [] }
                });
              }

              const ngo = ngoResults[0];
              const ngoCategoriesQuery = `SELECT na.* FROM ngosarr na WHERE na.ngos_id = ? ORDER BY na.id ASC`;
              db1.query(ngoCategoriesQuery, [ngo.id], (err, categoriesResults) => {
                if (err) {
                  console.error("❌ Error fetching NGO categories:", err);
                  return res.status(500).json({ message: "Failed to fetch NGO categories" });
                }

                const categoriesWithValues = [];
                let processedCategories = 0;

                if (categoriesResults.length === 0) {
                  return res.json({
                    ...document,
                    sections: sectionsWithBullets,
                    ngos: { ...ngo, categories: [] }
                  });
                }

                categoriesResults.forEach((category, index) => {
                  const ngoValuesQuery = `SELECT naf.value FROM ngosarrof naf WHERE naf.ngos_arr_id = ? ORDER BY naf.id ASC`;
                  
                  db1.query(ngoValuesQuery, [category.id], (err, valuesResults) => {
                    if (err) {
                      console.error("❌ Error fetching NGO values:", err);
                      return res.status(500).json({ message: "Failed to fetch NGO values" });
                    }

                    categoriesWithValues.push({
                      ...category,
                      values: valuesResults.map(v => v.value)
                    });

                    processedCategories++;

                    if (processedCategories === categoriesResults.length) {
                      res.json({
                        ...document,
                        sections: sectionsWithBullets,
                        ngos: {
                          ...ngo,
                          categories: categoriesWithValues
                        }
                      });
                    }
                  });
                });
              });
            });
          }
        });
      });
    });
  });
};

export const createBlog = async (req, res) => {
  const {
    Name,
    intro,
    conclusion,
    image_base64,
    slug,
    meta_title,
    meta_description,
    meta_keywords,
    sections,
    ngos
  } = req.body;

  const conn = await db1.promise().getConnection();

  try {
    await conn.beginTransaction();

    // Validate required fields
    if (!Name || !intro || !slug) {
      await conn.rollback();
      conn.release();
      return res.status(400).json({
        message: "Missing required fields: Name, intro, and Slug are required"
      });
    }

    // Check if slug already exists
    const [existingSlug] = await conn.query(
      `SELECT id FROM document WHERE slug = ?`,
      [slug]
    );

    if (existingSlug.length > 0) {
      await conn.rollback();
      conn.release();
      return res.status(400).json({
        message: "Slug already exists. Please choose a different one."
      });
    }

    let imagePath = null;
    if (image_base64) {
      const matches = image_base64.match(/^data:(.+);base64,(.+)$/);
      if (matches) {
        const ext = matches[1].split("/")[1] || "png";
        const fileName = `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
        const fileBuffer = Buffer.from(matches[2], "base64");
        imagePath = await uploadToFTP(fileName, fileBuffer);
      }
    }

    // Insert main document with SEO fields
    const [documentResult] = await conn.query(
      `INSERT INTO document 
       (Name, intro, conclusion, image_path, slug, meta_title, meta_description, meta_keywords) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Name, 
        intro, 
        conclusion, 
        imagePath,
        slug,
        meta_title || null,
        meta_description || null,
        meta_keywords || null
      ]
    );

    const documentId = documentResult.insertId;

    // Process sections (documentarr)
    if (sections && sections.length > 0) {
      for (const section of sections) {
        const [sectionResult] = await conn.query(
          `INSERT INTO documentarr (document_id, heading, start, bullet_header, end) VALUES (?, ?, ?, ?, ?)`,
          [
            documentId,
            section.heading || null,
            section.start || null,
            section.bullet_header || null,
            section.end || null
          ]
        );

        // Process bullets for each section
        if (section.bullets && section.bullets.length > 0) {
          for (const bullet of section.bullets) {
            if (bullet && bullet.trim()) {
              await conn.query(
                `INSERT INTO documentarrbullets (arr_id, bullet) VALUES (?, ?)`,
                [sectionResult.insertId, bullet]
              );
            }
          }
        }
      }
    }

    // Process NGO data
    if (ngos && (ngos.intro || (ngos.categories && ngos.categories.length > 0))) {
      const [ngoResult] = await conn.query(
        "INSERT INTO ngos (document_id, intro) VALUES (?, ?)",
        [documentId, ngos.intro || null]
      );

      const ngoId = ngoResult.insertId;

      // Process NGO categories
      if (ngos.categories && ngos.categories.length > 0) {
        for (const category of ngos.categories) {
          if (category.h1 || (category.values && category.values.length > 0)) {
            const [categoryResult] = await conn.query(
              "INSERT INTO ngosarr (ngos_id, h1) VALUES (?, ?)",
              [ngoId, category.h1 || null]
            );

            // Process category values
            if (category.values && category.values.length > 0) {
              for (const value of category.values) {
                if (value && value.trim()) {
                  await conn.query(
                    "INSERT INTO ngosarrof (ngos_arr_id, value) VALUES (?, ?)",
                    [categoryResult.insertId, value]
                  );
                }
              }
            }
          }
        }
      }
    }

    await conn.commit();
    conn.release();
    
    res.status(201).json({ 
      message: "✅ Blog created successfully",
      id: documentId,
      slug: slug
    });

  } catch (error) {
    await conn.rollback();
    conn.release();
    
    // Handle duplicate slug error
    if (error.code === 'ER_DUP_ENTRY' || error.message.includes('Duplicate entry')) {
      return res.status(400).json({ 
        message: "Slug already exists. Please choose a different one.",
        error: "DUPLICATE_SLUG"
      });
    }
    
    console.error("❌ Transaction rolled back:", error.message);
    res.status(500).json({ 
      message: "Failed to create blog",
      error: error.message 
    });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const {
    Name,
    intro,
    conclusion,
    image_base64,
    slug,
    meta_title,
    meta_description,
    meta_keywords,
    sections,
    ngos
  } = req.body;

  const conn = await db1.promise().getConnection();

  try {
    await conn.beginTransaction();

    // Get current document to check for existing image and slug
    const [currentDoc] = await conn.query('SELECT * FROM document WHERE id = ?', [id]);
    
    if (currentDoc.length === 0) {
      await conn.rollback();
      conn.release();
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if slug is being changed and if new slug already exists (excluding current blog)
    if (slug && slug !== currentDoc[0].slug) {
      const [existingSlug] = await conn.query(
        "SELECT id FROM document WHERE slug = ? AND id != ?",
        [slug, id]
      );

      if (existingSlug.length > 0) {
        await conn.rollback();
        conn.release();
        return res.status(400).json({
          message: "Slug already exists. Please choose a different one.",
          error: "DUPLICATE_SLUG"
        });
      }
    }

    let imagePath = currentDoc[0].image_path;
    
    if (image_base64) {
      const matches = image_base64.match(/^data:(.+);base64,(.+)$/);
      if (matches) {
        const ext = matches[1].split("/")[1] || "png";
        const fileName = `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
        const fileBuffer = Buffer.from(matches[2], "base64");
        const uploadedUrl = await uploadToFTP(fileName, fileBuffer);
        
        // Delete old image if exists
        if (imagePath) {
          await deleteImageFile(imagePath);
        }
        
        imagePath = uploadedUrl;
      }
    }

    // Update document with SEO fields
    if (imagePath) {
      await conn.query(
        `UPDATE document SET 
         Name = ?, intro = ?, conclusion = ?, image_path = ?, 
         slug = ?, meta_title = ?, meta_description = ?, meta_keywords = ? 
         WHERE id = ?`,
        [
          Name, 
          intro, 
          conclusion, 
          imagePath,
          slug || null,
          meta_title || null,
          meta_description || null,
          meta_keywords || null,
          id
        ]
      );
    } else {
      await conn.query(
        `UPDATE document SET 
         Name = ?, intro = ?, conclusion = ?, 
         slug = ?, meta_title = ?, meta_description = ?, meta_keywords = ? 
         WHERE id = ?`,
        [
          Name, 
          intro, 
          conclusion,
          slug || null,
          meta_title || null,
          meta_description || null,
          meta_keywords || null,
          id
        ]
      );
    }

    // Delete existing sections and bullets
    await conn.query(`DELETE dab FROM documentarrbullets dab INNER JOIN documentarr da ON dab.arr_id = da.id WHERE da.document_id = ?`, [id]);
    await conn.query("DELETE FROM documentarr WHERE document_id = ?", [id]);

    // Insert new sections and bullets
    if (sections && sections.length > 0) {
      for (const section of sections) {
        const [sectionResult] = await conn.query(
          `INSERT INTO documentarr (document_id, heading, start, bullet_header, end) VALUES (?, ?, ?, ?, ?)`,
          [
            id,
            section.heading || null,
            section.start || null,
            section.bullet_header || null,
            section.end || null
          ]
        );

        if (section.bullets && section.bullets.length > 0) {
          for (const bullet of section.bullets) {
            if (bullet.trim()) {
              await conn.query(
                `INSERT INTO documentarrbullets (arr_id, bullet) VALUES (?, ?)`,
                [sectionResult.insertId, bullet]
              );
            }
          }
        }
      }
    }

    // Handle NGO data
    const [ngoResults] = await conn.query("SELECT id FROM ngos WHERE document_id = ?", [id]);

    if (ngos) {
      if (ngoResults.length > 0) {
        const ngoId = ngoResults[0].id;
        
        await conn.query("UPDATE ngos SET intro = ? WHERE id = ?", [ngos.intro || null, ngoId]);

        // Delete existing NGO categories and values
        await conn.query(`DELETE naf FROM ngosarrof naf INNER JOIN ngosarr na ON naf.ngos_arr_id = na.id WHERE na.ngos_id = ?`, [ngoId]);
        await conn.query("DELETE FROM ngosarr WHERE ngos_id = ?", [ngoId]);

        // Insert new NGO categories and values
        if (ngos.categories && ngos.categories.length > 0) {
          for (const category of ngos.categories) {
            const [categoryResult] = await conn.query(
              "INSERT INTO ngosarr (ngos_id, h1) VALUES (?, ?)",
              [ngoId, category.h1 || null]
            );

            if (category.values && category.values.length > 0) {
              for (const value of category.values) {
                if (value.trim()) {
                  await conn.query(
                    "INSERT INTO ngosarrof (ngos_arr_id, value) VALUES (?, ?)",
                    [categoryResult.insertId, value]
                  );
                }
              }
            }
          }
        }

      } else {
        const [ngoResult] = await conn.query(
          "INSERT INTO ngos (document_id, intro) VALUES (?, ?)",
          [id, ngos.intro || null]
        );

        const ngoId = ngoResult.insertId;

        if (ngos.categories && ngos.categories.length > 0) {
          for (const category of ngos.categories) {
            const [categoryResult] = await conn.query(
              "INSERT INTO ngosarr (ngos_id, h1) VALUES (?, ?)",
              [ngoId, category.h1 || null]
            );

            if (category.values && category.values.length > 0) {
              for (const value of category.values) {
                if (value.trim()) {
                  await conn.query(
                    "INSERT INTO ngosarrof (ngos_arr_id, value) VALUES (?, ?)",
                    [categoryResult.insertId, value]
                  );
                }
              }
            }
          }
        }
      }
    } else {
      // If no NGO data provided, delete existing NGO data
      if (ngoResults.length > 0) {
        const ngoId = ngoResults[0].id;
        
        await conn.query(`DELETE naf FROM ngosarrof naf INNER JOIN ngosarr na ON naf.ngos_arr_id = na.id WHERE na.ngos_id = ?`, [ngoId]);
        await conn.query("DELETE FROM ngosarr WHERE ngos_id = ?", [ngoId]);
        await conn.query("DELETE FROM ngos WHERE id = ?", [ngoId]);
      }
    }

    await conn.commit();
    conn.release();

    res.status(200).json({ 
      message: "✅ Blog updated successfully",
      id: id,
      slug: slug
    });

  } catch (error) {
    await conn.rollback();
    conn.release();
    
    // Handle duplicate slug error
    if (error.code === 'ER_DUP_ENTRY' || error.message.includes('Duplicate entry')) {
      return res.status(400).json({ 
        message: "Slug already exists. Please choose a different one.",
        error: "DUPLICATE_SLUG"
      });
    }
    
    console.error("❌ Transaction rolled back:", error.message);
    res.status(500).json({ 
      message: "Failed to update blog",
      error: error.message 
    });
  }
};
export const deleteBlog = (req, res) => {
  const id = req.params.id;
  const query = 'UPDATE document SET deletestatus=1 WHERE id=?';

  db1.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "could not delete" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Organization not found" });
    }
    db1.query('SELECT * FROM document WHERE id=?', [id], async (err1, results) => {
      if (err1) {
        return res.status(500).json({ message: "could not delete" });
      }
      const get = results[0].image_path;
      await deleteImageFile(get);
      return res.status(200).json({ message: "Blog deleted Successfully" });
    });
  });
};

// Success Story Controllers
export const getAllSuccessStories = (req, res) => {
  const query = "SELECT * FROM successstories WHERE deletestatus = 0 ORDER BY id DESC";
  
  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching success stories:", err);
      return res.status(500).json({ error: "Failed to fetch success stories" });
    }
    res.status(200).json(DtoArr(results));
  });
};

export const createSuccessStory = (req, res) => {
  const { title, urdu_title, link, youtube_id, description } = req.body;
  
  if (!title || !youtube_id) {
    return res.status(400).json({ error: "Title and YouTube ID are required" });
  }
  
  const query = `INSERT INTO successstories (title, urdu_title, link, youtube_id, description, deletestatus) VALUES (?, ?, ?, ?, ?, 0)`;
  
  db1.query(query, [title, urdu_title || null, link || null, youtube_id, description || null], (err, results) => {
    if (err) {
      console.error("Error creating success story:", err);
      return res.status(500).json({ error: "Failed to create success story" });
    }
    
    res.status(201).json({
      id: results.insertId,
      message: "Success story created successfully"
    });
  });
};

export const updateSuccessStory = (req, res) => {
  const { id } = req.params;
  const { title, urdu_title, link, youtube_id, description } = req.body;
  
  if (!title || !youtube_id) {
    return res.status(400).json({ error: "Title and YouTube ID are required" });
  }
  
  const query = `UPDATE successstories SET title = ?, urdu_title = ?, link = ?, youtube_id = ?, description = ? WHERE id = ? AND deletestatus = 0`;
  
  db1.query(query, [title, urdu_title || null, link || null, youtube_id, description || null, id], (err, results) => {
    if (err) {
      console.error("Error updating success story:", err);
      return res.status(500).json({ error: "Failed to update success story" });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Success story not found" });
    }
    
    res.json({ message: "Success story updated successfully" });
  });
};

export const deleteSuccessStory = (req, res) => {
  const { id } = req.params;
  const query = "UPDATE successstories SET deletestatus = 1 WHERE id = ?";
  
  db1.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting success story:", err);
      return res.status(500).json({ error: "Failed to delete success story" });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Success story not found" });
    }
    
    res.json({ message: "Success story deleted successfully" });
  });
};

// Video Controllers
const saveBase64Image = async (image_base64) => {
  let imagePath = null;
  
  if (image_base64) {
    const matches = image_base64.match(/^data:(.+);base64,(.+)$/);
    if (matches) {
      const ext = matches[1].split("/")[1] || "png";
      const fileName = `video_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
      const fileBuffer = Buffer.from(matches[2], "base64");
      imagePath = await uploadToFTP(fileName, fileBuffer);
    }
  }
  
  return imagePath;
};

export const getAllVideos = (req, res) => {
  const query = "SELECT * FROM videos WHERE deletestatus = 0 ORDER BY id DESC";
  
  db1.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching videos:", err);
      return res.status(500).json({ error: "Failed to fetch videos" });
    }
    res.json(results);
  });
};

export const createVideo = async (req, res) => {
  const { title, youtube_id, thumbnail, description } = req.body;
  
  if (!title || !youtube_id || !thumbnail) {
    return res.status(400).json({ error: "Title, YouTube ID, and thumbnail are required" });
  }

  let imagePath = null;
  
  try {
    imagePath = await saveBase64Image(thumbnail);
    
    if (!imagePath) {
      return res.status(400).json({ error: "Failed to process thumbnail image" });
    }
  } catch (error) {
    console.error("Error saving image:", error);
    return res.status(500).json({ error: "Failed to save thumbnail image" });
  }
  
  const query = `INSERT INTO videos (title, youtube_id, thumbnail, description, deletestatus) VALUES (?, ?, ?, ?, 0)`;
  
  db1.query(query, [title, youtube_id, imagePath, description || null], (err, results) => {
    if (err) {
      console.error("Error creating video:", err);
      return res.status(500).json({ error: "Failed to create video" });
    }
    
    res.status(201).json({
      id: results.insertId,
      message: "Video created successfully",
      thumbnail: imagePath
    });
  });
};

export const updateVideo = (req, res) => {
  const { id } = req.params;
  const { title, youtube_id, thumbnail, description } = req.body;
  
  if (!title || !youtube_id) {
    return res.status(400).json({ error: "Title and YouTube ID are required" });
  }

  const getQuery = "SELECT thumbnail FROM videos WHERE id = ? AND deletestatus = 0";
  
  db1.query(getQuery, [id], async (err, results) => {
    if (err) {
      console.error("Error fetching video for update:", err);
      return res.status(500).json({ error: "Failed to fetch video" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Video not found" });
    }

    const currentVideo = results[0];
    let imagePath = currentVideo.thumbnail;

    if (thumbnail && thumbnail.startsWith('data:image')) {
      try {
        if (currentVideo.thumbnail) {
          await deleteImageFile(currentVideo.thumbnail);
        }
        
        imagePath = await saveBase64Image(thumbnail);
        
        if (!imagePath) {
          return res.status(400).json({ error: "Failed to process thumbnail image" });
        }
      } catch (error) {
        console.error("Error saving image:", error);
        return res.status(500).json({ error: "Failed to save thumbnail image" });
      }
    }
    
    const updateQuery = `UPDATE videos SET title = ?, youtube_id = ?, thumbnail = ?, description = ? WHERE id = ? AND deletestatus = 0`;
    
    db1.query(updateQuery, [title, youtube_id, imagePath, description || null, id], (err, results) => {
      if (err) {
        console.error("Error updating video:", err);
        return res.status(500).json({ error: "Failed to update video" });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Video not found" });
      }
      
      res.json({ 
        message: "Video updated successfully",
        thumbnail: imagePath
      });
    });
  });
};

export const deleteVideo = (req, res) => {
  const { id } = req.params;
  
  const getQuery = "SELECT thumbnail FROM videos WHERE id = ? AND deletestatus = 0";
  
  db1.query(getQuery, [id], async (err, results) => {
    if (err) {
      console.error("Error fetching video for deletion:", err);
      return res.status(500).json({ error: "Failed to fetch video" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: "Video not found" });
    }

    const video = results[0];
    if (video.thumbnail) {
      await deleteImageFile(video.thumbnail);
    }

    const deleteQuery = "UPDATE videos SET deletestatus = 1 WHERE id = ?";
    
    db1.query(deleteQuery, [id], (err, results) => {
      if (err) {
        console.error("Error deleting video:", err);
        return res.status(500).json({ error: "Failed to delete video" });
      }
      
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Video not found" });
      }
      
      res.json({ message: "Video deleted successfully" });
    });
  });
};




export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user info from auth middleware
    
    const [users] = await db1.promise().query(
      'SELECT id, email FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user: users[0]
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching profile' 
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, currentPassword, newPassword, name } = req.body;

    // First, get current user data
    const [users] = await db1.promise().query(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const user = users[0];
    let updateFields = [];
    let updateValues = [];

    // Check if email is being updated and if it's unique
    if (email && email !== user.email) {
      const [existingUsers] = await db1.promise().query(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, userId]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }

      updateFields.push('email = ?');
      updateValues.push(email);
    }

    // Update name if provided
    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }

    // Handle password change
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required to set new password'
        });
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }

      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      
      updateFields.push('password = ?');
      updateValues.push(hashedPassword);
    }

    // If there are fields to update
    if (updateFields.length > 0) {
      updateValues.push(userId);
      
      const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
      
      await db1.promise().query(query, updateValues);

      // Get updated user data
      const [updatedUsers] = await db1.promise().query(
        'SELECT id, email created_at FROM users WHERE id = ?',
        [userId]
      );

      res.json({
        success: true,
        message: 'Profile updated successfully',
        user: updatedUsers[0]
      });
    } else {
      res.json({
        success: true,
        message: 'No changes made',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          created_at: user.created_at
        }
      });
    }

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating profile' 
    });
  }
};












