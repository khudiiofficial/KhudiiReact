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
  deleteVideo
} from "../controllers/mainController.js";

const router = express.Router();

// Auth Routes
router.post("/auth/login", login);
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

export default router;
