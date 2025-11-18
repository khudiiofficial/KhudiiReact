import db from "../Database/db.js"
import { DtoArr } from "../Dto/Dto.js";
const getAllorganization = (req,res) => {
  const sql = `
    SELECT i.id, i.name, i.deletestatus, i.description, i.youtube_video_url, i.introductory_image_path,
           i.slug, i.meta_title, i.meta_description, i.meta_keywords,
           GROUP_CONCAT(DISTINCT img.image_path) AS images
    FROM items i
    LEFT JOIN item_images img ON i.id = img.item_id WHERE i.deletestatus = 0
    GROUP BY i.id ORDER BY i.id DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    // Convert images string → array
    let items = rows.map((row) => ({
      ...row,
      images: row.images ? row.images.split(",") : [],
      urls: [],
      // Include SEO fields
      slug: row.slug || "",
      meta_title: row.meta_title || "",
      meta_description: row.meta_description || "",
      meta_keywords: row.meta_keywords || "",
    }));

  res.status(200).json(items)
  });
};

export { getAllorganization };


const getSpecificItem = (req, res) => {
  const { slug } = req.params;
let id;
  const sql = `
    SELECT i.id, i.name, i.description, i.deletestatus, i.category, i.youtube_video_url, i.introductory_image_path,
           i.slug, i.meta_title, i.meta_description, i.meta_keywords,
           GROUP_CONCAT(DISTINCT img.image_path) AS images
    FROM items i
    LEFT JOIN item_images img ON i.id = img.item_id
    WHERE i.slug = ?
    GROUP BY i.id;
  `;

  db.query(sql, [slug], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    id=rows[0].id
    if (rows[0].deletestatus === 1) {
      return res.status(404).json({ message: "Item not found" });
    }

    let item = {
      ...rows[0],
      images: rows[0].images ? rows[0].images.split(",") : [],
      urls: [],
      // Include SEO fields
      slug: rows[0].slug || "",
      meta_title: rows[0].meta_title || "",
      meta_description: rows[0].meta_description || "",
      meta_keywords: rows[0].meta_keywords || "",
    };

    // Fetch URLs for this item
    db.query(
      "SELECT CAST(urls AS CHAR) AS urls FROM item_urls WHERE item_id = ?",
      [id],
      (err, urlRows) => {
        if (err) return res.status(500).json({ error: err.message });

        if (urlRows.length > 0) {
          try {
            item.urls = JSON.parse(urlRows[0].urls);
          } catch (e) {
            item.urls = urlRows[0].urls.split(",").map((u) => u.trim());
          }
        }

        res.status(200).json(item);
      }
    );
  });
}
export { getSpecificItem }
const getAllIcons=(req,res)=>{
const {id}=req.params
db.query('SELECT * FROM icons where item_id=?',[id],(err,rows)=>{
  if(err){
    return res.status(500).json({error:err.message})
  }
if(rows.length===0){
  return res.status(400).json({err:"no icon found"})
}

  res.status(200).json(rows)

})
}

export {getAllIcons}


export const getSocials=(req,res)=>{
  const { item_id } = req.params;
  db.query(
    "SELECT * FROM socials WHERE item_id = ?",
    [item_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results[0]); // return single row
    }
  );
}



// create blog
// Helper for unique image name
import fs from "fs";
import path from "path";

const storagePath = path.join(process.cwd(), "storage");
// if (!fs.existsSync(storagePath)) {
//   fs.mkdirSync(storagePath);
// }
function uniqueImageName(extension = "png") {
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}.${extension}`;
}

// // ---------- INSERT ----------
// export const CreateBlog=(req, res) => {
//   const { Intro, Conclusion, ImageBase64, Arr, NGOs ,Name} = req.body;

//   db.beginTransaction((err) => {
//     if (err) return res.status(500).json({ error: err.message });

//     // Handle image
//     let imageUrl = null;
//     if (ImageBase64) {
//       try {
//         const matches = ImageBase64.match(/^data:image\/(\w+);base64,/);
//         const ext = matches ? matches[1] : "png";
//         const base64Data = ImageBase64.replace(/^data:image\/\w+;base64,/, "");
//         const fileName = uniqueImageName(ext);
//         fs.writeFileSync(path.join(storagePath, fileName), base64Data, "base64");
//         imageUrl = `http://localhost:5000/storage/${fileName}`;
//       } catch (e) {
//         return db.rollback(() =>
//           res.status(500).json({ error: "Image saving failed", details: e.message })
//         );
//       }
//     }

//     // Insert Document
//     db.query(
//       "INSERT INTO Document (intro, conclusion, image_path,Name) VALUES (?, ?, ?, ?)",
//       [Intro, Conclusion, imageUrl,Name],
//       (err, result) => {
//         if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

//         const documentId = result.insertId;

//         // Insert Arr
//         if (Arr && Arr.length > 0) {
//           Arr.forEach((section) => {
//             db.query(
//               "INSERT INTO DocumentArr (document_id, heading, start, bullet_header, end) VALUES (?, ?, ?, ?, ?)",
//               [documentId, section.Heading, section.Start, section.Bullet_Header, section.End],
//               (err, arrRes) => {
//                 if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

//                 const arrId = arrRes.insertId;
//                 if (section.Bullets && section.Bullets.length > 0) {
//                   section.Bullets.forEach((b) => {
//                     db.query(
//                       "INSERT INTO DocumentArrBullets (arr_id, bullet) VALUES (?, ?)",
//                       [arrId, b]
//                     );
//                   });
//                 }
//               }
//             );
//           });
//         }

//         // Insert NGOs
//         db.query(
//           "INSERT INTO NGOs (document_id, intro) VALUES (?, ?)",
//           [documentId, NGOs.INTRO],
//           (err, ngoRes) => {
//             if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

//             const ngosId = ngoRes.insertId;

//             if (NGOs.Arr && NGOs.Arr.length > 0) {
//               NGOs.Arr.forEach((n) => {
//                 db.query(
//                   "INSERT INTO NGOsArr (ngos_id, h1) VALUES (?, ?)",
//                   [ngosId, n.h1],
//                   (err, ngosArrRes) => {
//                     if (err)
//                       return db.rollback(() => res.status(500).json({ error: err.message }));

//                     const ngosArrId = ngosArrRes.insertId;
//                     if (n.OF && n.OF.length > 0) {
//                       n.OF.forEach((val) => {
//                         db.query("INSERT INTO NGOsArrOF (ngos_arr_id, value) VALUES (?, ?)", [
//                           ngosArrId,
//                           val,
//                         ]);
//                       });
//                     }
//                   }
//                 );
//               });
//             }

//             db.commit((err) => {
//               if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
//               res.json({ message: "Blog inserted successfully", documentId });
//             });
//           }
//         );
//       }
//     );
//   });
// };
// finished creating a blog

// reading a specific blog
// export const getSpecificBlog = (req, res) => {
//   const { id } = req.params;

//   db.query("SELECT * FROM document WHERE id = ?", [id], (err, docRows) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (docRows.length === 0) return res.status(404).json({ message: "Not found" });
//     if (docRows[0].deletestatus === 1) { return res.status(404).json({ message: "Not Found" }) }
    
//     const document = {
//       Intro: docRows[0].intro,
//       Name: docRows[0].Name,
//       Conclusion: docRows[0].conclusion,
//       Image: docRows[0].image_path,
//       // Include SEO fields
//       slug: docRows[0].slug || "",
//       meta_title: docRows[0].meta_title || "",
//       meta_description: docRows[0].meta_description || "",
//       meta_keywords: docRows[0].meta_keywords || "",
//       Arr: [],
//       NGOs: { INTRO: "", Arr: [] },
//     };

//     db.query("SELECT * FROM documentarr WHERE document_id = ?", [id], (err, arrRows) => {
//       if (err) return res.status(500).json({ error: err.message });
// console.log(arrRows)
//       let arrCount = arrRows.length;
//       if (arrCount === 0) return fetchNGOs(document);

//       arrRows.forEach((arr) => {
//         db.query("SELECT bullet FROM documentarrbullets WHERE arr_id = ?", [arr.id], (err, bRows) => {
//           if (err) return res.status(500).json({ error: err.message });

//           document.Arr.push({
//             Heading: arr.heading,
//             Start: arr.start,
//             Bullet_Header: arr.bullet_header,
//             Bullets: bRows.map((b) => b.bullet),
//             End: arr.end,
//           });

//           arrCount--;
//           if (arrCount === 0) fetchNGOs(document);
//         });
//       });
//     });

//     function fetchNGOs(document) {
//       db.query("SELECT * FROM ngos WHERE document_id = ?", [id], (err, ngoRows) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (ngoRows.length === 0) return res.status(200).json(document);

//         document.NGOs.INTRO = ngoRows[0].intro;

//         db.query("SELECT * FROM ngosarr WHERE ngos_id = ?", [ngoRows[0].id], (err, ngosArrRows) => {
//           if (err) return res.status(500).json({ error: err.message });

//           let ngosArrCount = ngosArrRows.length;
//           if (ngosArrCount === 0) return res.status(200).json(document);

//           ngosArrRows.forEach((n) => {
//             db.query("SELECT value FROM ngosarrof WHERE ngos_arr_id = ?", [n.id], (err, ofRows) => {
//               if (err) return res.status(500).json({ error: err.message });

//               document.NGOs.Arr.push({
//                 h1: n.h1,
//                 OF: ofRows.map((o) => o.value),
//               });

//               ngosArrCount--;
//               if (ngosArrCount === 0) res.status(200).json(document);
//             });
//           });
//         });
//       });
//     }
//   });
// };

// reading a specific blog finished


export const getSpecificBlog = async (req, res) => {
  const { slug } = req.params;
  let id;
  try {
    // 1️⃣ Fetch the main document
    const [docRows] = await db.promise().query("SELECT * FROM document WHERE slug = ?", [slug]);
    id=docRows[0].id
    if (docRows.length === 0) return res.status(404).json({ message: "Not found" });
    if (docRows[0].deletestatus === 1) return res.status(404).json({ message: "Not Found" });

    const doc = docRows[0];

    const document = {
      Intro: doc.intro,
      Name: doc.Name,
      Conclusion: doc.conclusion,
      Image: doc.image_path,
      slug: doc.slug || "",
      meta_title: doc.meta_title || "",
      meta_description: doc.meta_description || "",
      meta_keywords: doc.meta_keywords || "",
      Arr: [],
      NGOs: { INTRO: "", Arr: [] },
    };

    // 2️⃣ Fetch document sections (ordered by id)
    const [arrRows] = await db.promise().query(
      "SELECT * FROM documentarr WHERE document_id = ? ORDER BY id ASC",
      [id]
    );

    for (const arr of arrRows) {
      const [bRows] = await db.promise().query(
        "SELECT bullet FROM documentarrbullets WHERE arr_id = ? ORDER BY id ASC",
        [arr.id]
      );

      document.Arr.push({
        Heading: arr.heading,
        Start: arr.start,
        Bullet_Header: arr.bullet_header,
        Bullets: bRows.map((b) => b.bullet),
        End: arr.end,
      });
    }

    // 3️⃣ Fetch NGOs (ordered by id)
    const [ngoRows] = await db.promise().query(
      "SELECT * FROM ngos WHERE document_id = ? ORDER BY id ASC",
      [id]
    );

    if (ngoRows.length > 0) {
      const ngo = ngoRows[0];
      document.NGOs.INTRO = ngo.intro;

      const [ngosArrRows] = await db.promise().query(
        "SELECT * FROM ngosarr WHERE ngos_id = ? ORDER BY id ASC",
        [ngo.id]
      );

      for (const n of ngosArrRows) {
        const [ofRows] = await db.promise().query(
          "SELECT value FROM ngosarrof WHERE ngos_arr_id = ? ORDER BY id ASC",
          [n.id]
        );

        document.NGOs.Arr.push({
          h1: n.h1,
          OF: ofRows.map((o) => o.value),
        });
      }
    }

    // ✅ Return the structured document
    res.status(200).json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};




//getAllBlogs

// Add this to your server.js (assumes `db` connection exists)
export const getAllBlogs = (req, res) => {
  db.query("SELECT * FROM document", (err, docs) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!docs || docs.length === 0) return res.json([]);

    const results = [];
    let processedDocs = 0;
    let hasErrored = false;

    function handleError(err) {
      if (!hasErrored) {
        hasErrored = true;
        return res.status(500).json({ error: err.message || err });
      }
    }

    docs.forEach((doc) => {
      // Build the object to return
      const fullDoc = {
        id: doc.id,
        Name: doc.Name,
        deletestatus: doc.deletestatus,
        Intro: doc.intro,
        Conclusion: doc.conclusion,
        Image: doc.image_path,
        // Include SEO fields
        slug: doc.slug || "",
        meta_title: doc.meta_title || "",
        meta_description: doc.meta_description || "",
        meta_keywords: doc.meta_keywords || "",
        Arr: [],
        NGOs: { INTRO: "", Arr: [] },
      };

      let arrDone = false;
      let ngosDone = false;

      function checkDocDoneAndPush() {
        if (arrDone && ngosDone) {
          results.push(fullDoc);
          processedDocs++;
          if (processedDocs === docs.length) {
            return res.status(200).json(DtoArr(results));
          }
        }
      }

      // ---------- Fetch Arr and Bullets ----------
      db.query(
        "SELECT * FROM documentarr WHERE document_id = ?",
        [doc.id],
        (err, arrRows) => {
          if (err) return handleError(err);

          if (!arrRows || arrRows.length === 0) {
            arrDone = true;
            checkDocDoneAndPush();
          } else {
            let remainingArr = arrRows.length;

            arrRows.forEach((arr) => {
              db.query(
                "SELECT bullet FROM documentarrbullets WHERE arr_id = ?",
                [arr.id],
                (err, bulletRows) => {
                  if (err) return handleError(err);

                  fullDoc.Arr.push({
                    Heading: arr.heading,
                    Start: arr.start,
                    Bullet_Header: arr.bullet_header,
                    Bullets: (bulletRows || []).map((b) => b.bullet),
                    End: arr.end,
                  });

                  remainingArr--;
                  if (remainingArr === 0) {
                    arrDone = true;
                    checkDocDoneAndPush();
                  }
                }
              );
            });
          }
        }
      );

      // ---------- Fetch NGOs -> NGOsArr -> NGOsArrOF ----------
      db.query(
        "SELECT * FROM ngos WHERE document_id = ?",
        [doc.id],
        (err, ngoRows) => {
          if (err) return handleError(err);

          if (!ngoRows || ngoRows.length === 0) {
            ngosDone = true;
            checkDocDoneAndPush();
          } else {
            // Use first NGOs row as the root for this document (matches previous code)
            fullDoc.NGOs.INTRO = ngoRows[0].intro || "";

            db.query(
              "SELECT * FROM ngosarr WHERE ngos_id = ?",
              [ngoRows[0].id],
              (err, ngosArrRows) => {
                if (err) return handleError(err);

                if (!ngosArrRows || ngosArrRows.length === 0) {
                  ngosDone = true;
                  checkDocDoneAndPush();
                } else {
                  let remainingNGOArr = ngosArrRows.length;

                  ngosArrRows.forEach((n) => {
                    db.query(
                      "SELECT value FROM ngosarrof WHERE ngos_arr_id = ?",
                      [n.id],
                      (err, ofRows) => {
                        if (err) return handleError(err);

                        fullDoc.NGOs.Arr.push({
                          h1: n.h1,
                          OF: (ofRows || []).map((o) => o.value),
                        });

                        remainingNGOArr--;
                        if (remainingNGOArr === 0) {
                          ngosDone = true;
                          checkDocDoneAndPush();
                        }
                      }
                    );
                  });
                }
              }
            );
          }
        }
      );
    });
  });
};


export const getSmilarItems=(req,res)=>{

    const search = req.query.search || "";
  const sql = "SELECT * FROM items WHERE name LIKE ?";
  db.query(sql, [`%${search}%`], (err, results) => {
    if (err) {
      console.error("❌ Error fetching organizations:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(DtoArr(results));
  });
}

import { sendContactEmail } from "../utils/emailService.js";
export const saveContacts=(req,res)=>{

  const {
    name,
    subject,
    phone,
    countryCode,
    CountryName,
    country,
    email,
    message,
  } = req.body;
const obj={
   name,
    subject,
    phone,
    countryCode,
    CountryName,
    country,
    email,
    message,
}

  if (!name || !subject || !phone || !email || !message) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const sql = `
    INSERT INTO contact_messages
    (name, subject, phone, countryCode, countryName, country, email, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    subject,
    phone,
    countryCode,
    CountryName,
    country,
    email,
    message,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting contact message:", err);
      return res.status(500).json({ error: "Database error" });
    }
    sendContactEmail(obj)

    return res.status(200).json({ message: "Contact saved successfully" });
  });


}


import { sendVolunteerEmail } from "../utils/emailService.js";
export const AddVolunteer=(req,res)=>{


  const { name, email, phone, countryCode, CountryName, country, contactTime, message } = req.body;
const obj={
  name, email, phone, countryCode, CountryName, country, contactTime, message
}
  if (!name || !email || !phone || !contactTime) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  const sql = `
    INSERT INTO volunteers (name, email, phone, countryCode, CountryName, country, contactTime, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, countryCode, CountryName, country, contactTime, message], (err, result) => {
    if (err) {
      console.error("❌ Error inserting volunteer:", err);
      return res.status(500).json({ error: "Database error" });
    }
    sendVolunteerEmail(obj)
    res.status(200).json({ message: "Volunteer application saved successfully!" });
  });



}

import { sendJobApplicationEmail } from "../utils/emailService.js";
export const ApplyForJob=(req,res)=>{

  const {
    name,
    phone,
    email,
    countryCode,
    CountryName,
    country,
    experience,
    qualification,
    interestedPost,
    message,
  } = req.body;
const obj={
   name,
    phone,
    email,
    countryCode,
    CountryName,
    country,
    experience,
    qualification,
    interestedPost,
    message
}
  if (!name || !email || !experience) {
    return res.status(400).json({ error: "Name, email, and experience are required." });
  }

  const sql = `
    INSERT INTO job_applications
    (name, phone, email, countryCode, CountryName, country, experience, qualification, interestedPost, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, phone, email, countryCode, CountryName, country, experience, qualification, interestedPost, message],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting job application:", err);
        return res.status(500).json({ error: "Database error" });
      }
sendJobApplicationEmail(obj)
      res.status(200).json({ message: "Job application submitted successfully!" });
    }
  );


}

import { sendStoryEmail } from "../utils/emailService.js";
export const ContributeStory=(req,res)=>{


  const {
    entityType,
    name,
    email,
    phone,
    countryCode,
    CountryName,
    country,
    company,
    story,
  } = req.body;
const obj={
    entityType,
    name,
    email,
    phone,
    countryCode,
    CountryName,
    country,
    company,
    story
}
  if (!entityType || !name || !email || !phone || !story) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  const sql = `
    INSERT INTO contribute_stories
    (entityType, name, email, phone, countryCode, CountryName, country, company, story)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [entityType, name, email, phone, countryCode, CountryName, country, company, story],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting story:", err);
        return res.status(500).json({ error: "Database error" });
      }
      sendStoryEmail(obj)
      res.status(200).json({ message: "Story submitted successfully!" });
    }
  );



}

import { sendDonationEmail } from "../utils/emailService.js";
export const Donation=(req,res)=>{

  const {
    firstName,
    lastName,
    email,
    phone,
    countryCode,
    CountryName,
    country,
    donationAmount,
    donationType,
    address1,
    city,
    state,
    message,
  } = req.body;
const obj={
      firstName,
    lastName,
    email,
    phone,
    countryCode,
    CountryName,
    country,
    donationAmount,
    donationType,
    address1,
    city,
    state,
    message
}
  if (!firstName || !lastName || !phone || !donationAmount || !donationType || !address1 || !city || !state) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  const sql = `
    INSERT INTO donations 
    (firstName, lastName, email, phone, countryCode, CountryName, country, donationAmount, donationType, address1, city, state, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [firstName, lastName, email, phone, countryCode, CountryName, country, donationAmount, donationType, address1, city, state, message],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting donation:", err);
        return res.status(500).json({ error: "Database error" });
      }
sendDonationEmail(obj)
      res.status(200).json({ message: "Donation submitted successfully!" });
    }
  );

}


export const itemByCategory = (req, res) => {
  const { name } = req.params;
  
  // Use JSON_CONTAINS to search within the JSON array
  db.query('SELECT * FROM items WHERE JSON_CONTAINS(category, ?)', [JSON.stringify(name)], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      res.status(500).json({ error: "Database Error" });
      return;
    }
    res.status(200).json(DtoArr(result));
  });
};



export const getsuccessstories=(req,res)=>{
db.query('SELECT * FROM successstories WHERE deletestatus = 0 ORDER BY id DESC',(err,results)=>{
if(err){
  return res.status(500).json({message:"could not get"})
}
if(results.length===0){
  return res.status(400).json({message:"Not found"})
}

res.status(200).json(results)

})
}


export const getAllVideos=(req,res)=>{

db.query('SELECT * FROM videos',(err,results)=>{
  if(err){
    req.status(500).json({message:"could not get"})
  }
  if(results.length===0){
    req.status(400).json({message:"No records found"})
  }
  res.status(200).json(DtoArr(results))
})
}

import { sendContactInquiryEmail } from "../utils/emailService.js";


export const createContactInquiry = async (req, res) => {
  const {
    name,
    email,
    phone,
    message,
    OrgId,
    countryCode = "92",
    CountryName = "Pakistan",
    country = "PK"
  } = req.body;

  // Validation
  if (!name || !email || !phone) {
    return res.status(400).json({
      error: "Name, email, and phone are required"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid email address"
    });
  }

  // Get owner email
  const getOwnerQuery = `SELECT * FROM owners`;
  
  db.query(getOwnerQuery, async (ownerError, ownerResults) => {
    if (ownerError || ownerResults.length === 0) {
      console.error("Error fetching owner:", ownerError);
      // Still save the inquiry even if owner not found
      return saveInquiryWithoutEmail();
    }
    const senderemail=ownerResults[0].sender_email
    const appPassword=ownerResults[0].sender_app_password
    const ownerEmail = ownerResults[0].email;
    saveInquiryWithEmail(ownerEmail);

    function saveInquiryWithEmail(ownerEmail) {
      const insertQuery = `
        INSERT INTO contact_inquiries 
        (name, email, phone, message, org_id, country_code, country_name, country) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        message ? message.trim() : null,
        OrgId || null,
        countryCode,
        CountryName,
        country
      ];

      db.query(insertQuery, values, async (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({
            error: "Failed to save inquiry"
          });
        }

        const inquiryId = results.insertId;
        
        // Prepare data for email
        const inquiryData = {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          message: message ? message.trim() : null,
          org_id: OrgId || null,
          country_code: countryCode,
          country_name: CountryName,
          country: country
        };

        try {
          // Send email to owner
          await sendContactInquiryEmail(senderemail,appPassword,inquiryData, ownerEmail);
          console.log(`✅ New contact inquiry submitted - ID: ${inquiryId}`);
        } catch (emailError) {
          console.error("Email sending failed but inquiry saved:", emailError);
        }

        res.status(201).json({
          message: "Thank you for your inquiry! We'll get back to you soon.",
          inquiryId: inquiryId,
          success: true
        });
      });
    }

    function saveInquiryWithoutEmail() {
      const insertQuery = `
        INSERT INTO contact_inquiries 
        (name, email, phone, message, org_id, country_code, country_name, country) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        message ? message.trim() : null,
        OrgId || null,
        countryCode,
        CountryName,
        country
      ];

      db.query(insertQuery, values, (error, results) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({
            error: "Failed to save inquiry"
          });
        }

        console.log(`✅ New contact inquiry submitted (no email) - ID: ${results.insertId}`);
        
        res.status(201).json({
          message: "Thank you for your inquiry! We'll get back to you soon.",
          inquiryId: results.insertId,
          success: true
        });
      });
    }
  });
};


export const getAllTopbarContents = (req, res) => {
  const query = 'SELECT * FROM topbarcontent ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching topbar contents:', err);
      return res.status(500).json({
        success: false,
        message: 'Error fetching topbar contents',
        error: err.message
      });
    }
    
    res.status(200).json(results);
  });
};



export const getAllCertifications = async (req, res) => {
  try {
    const query = 'SELECT * FROM certifications ORDER BY display_order ASC, created_at DESC';
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching certifications:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching certifications',
          error: err.message
        });
      }
      
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Error in getAllCertifications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all testimonials
export const getAllTestimonials = (req, res) => {
  const query = 'SELECT * FROM testimonials ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching testimonials:', err);
      return res.status(500).json({
        success: false,
        message: 'Error fetching testimonials',
        error: err.message
      });
    }
    
    res.status(200).json({
      success: true,
      data: results
    });
  });
};


// Get all events
export const getAllEvents = (req, res) => {
  const query = 'SELECT * FROM events ORDER BY created_at DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Error fetching events' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: results
    });
  });
};