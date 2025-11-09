import express from 'express'
import { createContactInquiry,AddVolunteer, getAllBlogs, getAllorganization, getSmilarItems, getSocials, getSpecificItem,saveContacts, ApplyForJob, ContributeStory, Donation, getsuccessstories, getAllVideos,getAllTopbarContents,getAllCertifications } from '../controller/index.js';
import { getAllIcons } from '../controller/index.js';
import { getSpecificBlog } from '../controller/index.js';
import { itemByCategory } from '../controller/index.js';
const Router=express.Router();

Router.get('/items',getAllorganization)
Router.get('/item/:slug',getSpecificItem)
Router.get('/icons/:id',getAllIcons)
Router.get('/socials/:item_id',getSocials)
// Router.post('/Blog',CreateBlog)
Router.get('/Blog/:slug',getSpecificBlog)
Router.get('/getAllBlogs',getAllBlogs)
Router.get('/getSimilarItem',getSmilarItems)
Router.post('/api/contact',saveContacts)
Router.post('/api/volunteer',AddVolunteer)
Router.post('/api/job-application',ApplyForJob)
Router.post('/api/contribute-story',ContributeStory)
Router.post('/api/donations',Donation)
Router.get('/itemByCategory/:name',itemByCategory)
Router.get('/getsuccessstories',getsuccessstories)
Router.get('/getAllVedios',getAllVideos)
Router.post('/contact-inquiry',createContactInquiry)
Router.get('/api/topbar',getAllTopbarContents)
Router.get('/certifications', getAllCertifications);
// Router.get('/updateimagesarray',update)
// Router.get('/updatedoucmentimages',update1)
// Router.get('/updateitemimages',update2)
export default Router
