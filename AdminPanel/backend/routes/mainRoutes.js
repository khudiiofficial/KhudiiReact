import express from "express";
import { auth } from "../middleware/auth.js";
import {
  // Auth
  login,
  logout,
  getProfile,
  updateProfile,
  // Organizations
  getAllOrganizations,
  createOrganization,
  getOrganizationById,
  updateOrganization,
  deleteOrganizationImage,
  softDeleteOrganization,
  
  // Blogs
  getAllDocuments,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  
  // Success Stories
  getAllSuccessStories,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
  
  // Videos
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo,


  //enquiries
  getInquiries,
  getOwner,
  updateOwner,
  deleteInquiry,
  getInquiryById,
  //donations
  getDonations,
  getDonationById,
  deleteDonation,
  updateDonationStatus,

  //stoires
  getStories,
  getStoryById,
  deleteStory,

  // job apply
  getJobApplications,
  getJobApplicationById,
  deleteJobApplication,

  //voulenteer
  getVolunteers,
  getVolunteerById,
  deleteVolunteer,

  //contact
  getContactMessages,
  getContactMessageById,
  deleteContactMessage,
  authlogin,

  //top bar
  getAllTopbarContents,
  getTopbarContentById,
  createTopbarContent,
  updateTopbarContent,
  deleteTopbarContent,

//certifications
getAllCertifications,
getCertificationById,
createCertification,
updateCertification,
deleteCertification,

// testimonials
getAllTestimonials,
getTestimonialById,
createTestimonial,
updateTestimonial,
deleteTestimonial,

//evevnts
getAllEvents,
getEventById,
createEvent,
updateEvent,
deleteEvent,

//sectors
getAllSectors,
getSectorById,
createSector,
updateSector,
deleteSector,
restoreSector,
permanentDeleteSector,

// //crousel images
// getAllCarouselImages,
// getCarouselImageById,
// createCarouselImage,
// updateCarouselImage,
// deleteCarouselImage,




//welcome
getWelcomeSection,
updateWelcomeSection,

//vision
getAllVisionMissionItems,
getVisionMissionItemById,
createVisionMissionItem,
updateVisionMissionItem,
deleteVisionMissionItem,
updateSortOrder,

//stories description
getStoriesData,
updateStoriesData,

//event description
getEventData,
updateEventData,

//telephone
getTelephoneData,
updateTelephoneData,

//about page

getAllContent,
updateSection,
createExpertTeam,
updateExpertTeam,
deleteExpertTeam,
createNewSection,
updateNewSection,
deleteNewSection,

//seo
getSEOData,
updateSEOData,
//footer
getFooterContent,
updateFooterContent,
deleteFooterImage,
// faqs
getActiveFAQs,
getAllFAQs,
getFAQById,
createFAQ,
updateFAQ,
deleteFAQ,
toggleFAQStatus,
updateDisplayOrder,
//bank
getBankData,
updateBankData,
removeBankLogo,

//carousel images
getAllCarouselImages,
getDesktopImages,
getMobileImages,
getCarouselImageById,
createCarouselImage,
updateCarouselImage,
deleteCarouselImage,

//org registartion
deleteSubmission,
getSubmissionById,
getAllSubmissions
} from "../controllers/mainController.js";

const router = express.Router();

// Auth Routes
router.post("/auth/login", login);
router.post('/authlogin',authlogin);
router.post("/auth/logout",auth, logout);
// router.put("/auth/change-password", auth, changePassword);
router.get('/api/profile',auth, getProfile);
router.put('/api/profile',auth, updateProfile);
// Organization Routes
router.get("/organizations",auth, getAllOrganizations);
router.post("/api/organizations",auth, createOrganization);
router.get("/api/organizations/:id",auth, getOrganizationById);
router.put("/api/organizations/:id",auth, updateOrganization);
router.delete("/api/organizations/:id/images",auth, deleteOrganizationImage);
router.post("/api/delete/:id",auth, softDeleteOrganization);

// Blog Routes
router.get("/api/documents",auth, getAllDocuments);
router.get("/api/blogs/:id",auth, getBlogById);
router.post("/api/blogs",auth, createBlog);
router.put("/api/blogs/:id",auth, updateBlog);
router.delete("/api/documents/:id",auth, deleteBlog);

// Success Story Routes
router.get("/api/success-stories",auth, getAllSuccessStories);
router.post("/api/success-stories",auth, createSuccessStory);
router.put("/api/success-stories/:id",auth, updateSuccessStory);
router.delete("/api/success-stories/:id",auth, deleteSuccessStory);

// Video Routes
router.get("/api/videos",auth, getAllVideos);
router.post("/api/videos",auth, createVideo);
router.put("/api/videos/:id",auth, updateVideo);
router.delete("/api/videos/:id",auth, deleteVideo);




// enquiries

router.get("/admin/inquiries",auth, getInquiries);
router.get("/admin/inquiries/:id",auth, getInquiryById);
router.get("/admin/owner",auth, getOwner);
router.put("/admin/owner",auth, updateOwner);
router.delete("/admin/inquiries/:id",auth, deleteInquiry);



// donations

router.get("/admin/donations",auth, getDonations);
router.get("/admin/donations/:id",auth, getDonationById);
router.delete("/admin/donations/:id",auth, deleteDonation);
router.patch("/admin/donations/:id/status",auth, updateDonationStatus);

// stories
router.get("/admin/stories",auth, getStories);
router.get("/admin/stories/:id",auth, getStoryById);
router.delete("/admin/stories/:id",auth, deleteStory);


//Job application
router.get("/admin/job-applications",auth, getJobApplications);
router.get("/admin/job-applications/:id",auth, getJobApplicationById);
router.delete("/admin/job-applications/:id",auth, deleteJobApplication);

// vloulenteers
router.get("/admin/volunteers",auth, getVolunteers);
router.get("/admin/volunteers/:id",auth, getVolunteerById);
router.delete("/admin/volunteers/:id",auth, deleteVolunteer);

//contacts

router.get("/admin/contact-messages",auth, getContactMessages);
router.get("/admin/contact-messages/:id",auth, getContactMessageById);
router.delete("/admin/contact-messages/:id",auth, deleteContactMessage);


//top bar content
router.get('/api/topbar',auth, getAllTopbarContents);
router.get('/api/topbar/:id',auth, getTopbarContentById);
router.post('/api/topbar',auth, createTopbarContent);
router.put('/api/topbar/:id',auth, updateTopbarContent);
router.delete('/api/topbar/:id',auth, deleteTopbarContent);

//certifications
router.get('/certifications', getAllCertifications);
router.get('/certifications/:id', getCertificationById);
router.post('/certifications', createCertification); // No multer needed for base64
router.put('/certifications/:id', updateCertification); // No multer needed for base64
router.delete('/certifications/:id', deleteCertification);


//testimonails
router.get('/testimonials',auth, getAllTestimonials);
router.get('/testimonials/:id',auth, getTestimonialById);
router.post('/testimonials',auth, createTestimonial);
router.put('/testimonials/:id',auth, updateTestimonial);
router.delete('/testimonials/:id',auth, deleteTestimonial);

//events

router.get('/events',auth, getAllEvents);
router.get('/events/:id',auth, getEventById);
router.post('/events',auth, createEvent);
router.put('/events/:id',auth, updateEvent);
router.delete('/events/:id',auth, deleteEvent);

// sectors

router.get('/sectors/admin',auth, getAllSectors);
router.get('/sectors/admin/:id',auth, getSectorById);
router.post('/sectors/admin',auth, createSector);
router.put('/sectors/admin/:id',auth, updateSector);
router.delete('/sectors/admin/:id',auth, deleteSector);
router.patch('/sectors/admin/restore/:id',auth, restoreSector);
router.delete('/sectors/admin/permanent/:id',auth, permanentDeleteSector);


// crousel-images
// router.get("/api/carousel",auth, getAllCarouselImages);
// router.get("/api/carousel/:id",auth, getCarouselImageById);
// router.post("/api/carousel",auth, createCarouselImage);
// router.put("/api/carousel/:id",auth, updateCarouselImage);
// router.delete("/api/carousel/:id",auth, deleteCarouselImage);

// Get all images (both mobile and desktop)
router.get('/api/carousel', getAllCarouselImages);

// Optional separate endpoints
router.get('/api/carousel/desktop', getDesktopImages);
router.get('/api/carousel/mobile', getMobileImages);

// Get single image by ID
router.get('/api/carousel/:id', getCarouselImageById);

// Create new image
router.post('/api/carousel', createCarouselImage);

// Update image
router.put('/api/carousel/:id', updateCarouselImage);

// Delete image
router.delete('/api/carousel/:id', deleteCarouselImage);


//welcome
router.get("/api/welcome",auth, getWelcomeSection);
router.put("/api/welcome",auth, updateWelcomeSection);

//vision
router.get("/api/vision-mission",auth, getAllVisionMissionItems);
router.get("/api/vision-mission/:id",auth, getVisionMissionItemById);
router.post("/api/vision-mission",auth, createVisionMissionItem);
router.put("/api/vision-mission/:id",auth, updateVisionMissionItem);
router.delete("/api/vision-mission/:id",auth, deleteVisionMissionItem);
router.patch("/api/vision-mission/sort",auth, updateSortOrder);


//stories descrition
router.get("/api/stories",auth, getStoriesData);
router.put("/api/stories",auth, updateStoriesData);


//event description
router.get("/api/events",auth, getEventData);
router.put("/api/events",auth, updateEventData);

// telephone
router.get("/api/telephone", auth,getTelephoneData);
router.put("/api/telephone",auth, updateTelephoneData);



//about page

// Get all content
router.get("/api/content", auth,getAllContent);

// UPDATE operations for single-instance sections (Read & Update only)
router.put("/api/content/section/:section",auth, updateSection);

// CRUD operations for Expert Team
router.post("/api/content/expert-team",auth, createExpertTeam);
router.put("/api/content/expert-team/:id",auth, updateExpertTeam);
router.delete("/api/content/expert-team/:id", deleteExpertTeam);

// CRUD operations for New Section
router.post("/api/content/new-section",auth, createNewSection);
router.put("/api/content/new-section/:id",auth, updateNewSection);
router.delete("/api/content/new-section/:id",auth, deleteNewSection);

// seo 
router.get("/api/seo",auth, getSEOData);
router.put("/api/seo",auth, updateSEOData);


//footer

router.get("/api/footer",auth, getFooterContent);
router.put("/api/footer",auth, updateFooterContent);
router.delete("/api/footer/image/:imageType",auth, deleteFooterImage); // Optional: DELETE /api/footer/image/logo or 


//faqs
// Public routes
router.get('/api/faqs/public',auth, getActiveFAQs); // Get active FAQs for public

// Admin routes (protect these with authentication middleware if needed)
router.get('/api/faqs',auth, getAllFAQs); // Get all FAQs (admin)
router.get('/api/faqs/:id',auth, getFAQById); // Get single FAQ
router.post('/api/faqs',auth, createFAQ); // Create new FAQ
router.put('/api/faqs/:id',auth, updateFAQ); // Update FAQ
router.delete('/api/faqs/:id',auth, deleteFAQ); // Delete FAQ
router.put('/api/faqs/:id/toggle',auth, toggleFAQStatus); // Toggle FAQ status
router.put('/api/faqs/display-order/update',auth, updateDisplayOrder); // Bulk update display order


// bank
// Bank data routes
router.get('/api/bank',auth, getBankData); // Get bank data (returns imagepath URL)
router.put('/api/bank',auth, updateBankData); // Update bank details with base64 image
router.delete('api/bank/logo',auth, removeBankLogo); // Remove logo

// organization registration request
router.get('/api/admin/submissions', getAllSubmissions);

// Get single submission
router.get('/api/admin/submissions/:id', getSubmissionById);

// Delete submission
router.delete('/api/admin/submissions/:id', deleteSubmission);



export default router;
