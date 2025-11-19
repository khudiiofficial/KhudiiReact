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

//crousel images
getAllCarouselImages,
getCarouselImageById,
createCarouselImage,
updateCarouselImage,
deleteCarouselImage
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


router.get("/api/carousel",auth, getAllCarouselImages);


router.get("/api/carousel/:id",auth, getCarouselImageById);


router.post("/api/carousel",auth, createCarouselImage);


router.put("/api/carousel/:id",auth, updateCarouselImage);


router.delete("/api/carousel/:id",auth, deleteCarouselImage);

export default router;
