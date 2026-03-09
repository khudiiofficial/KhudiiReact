import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Protected from './components/Protetcted/Protected'
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'
import OrganizationsPage from './Pages/organizations/Organizations'
import DocumentCards from './Pages/blogs/DocumentCards'
import EditBlogPage from './Pages/EditBlogPage/EditBlogPage'
import DashboardIndex from './Pages/DashboardIndex/DashboardIndex'
import CreateOrganizationPage from './Pages/createOrganization/CreateOrganization'
import EditOrganizationPage from './Pages/EditOrganizationPage/EditOrganizationPage'
import CreateBlogPage from './Pages/createBlogs/CreateBlog'
import SuccessStories from './Pages/SuccessStories/SuccessStories'
import VideoForm from './Pages/Vedios/Vedios'
// import ChangePassword from './Pages/PasswordChange/PasswordChange'
import Profile from './Pages/Profile/Profile'
import AdminInquiries from './Pages/AdminInquiries/AdminInquiries'
import AdminDonations from './Pages/Donation/Donation'
import AdminStories from './Pages/Stories/Stories'
import AdminJobs from './Pages/Job/Job'
import AdminVolunteers from './Pages/Voulenteer/Voulenteer'
import AdminContacts from './Pages/Contacts/Contacts'
import TopbarAdmin from './Pages/Topbar/Topbar'
import CertificationAdmin from './Pages/Certifications/Certifications'
import TestimonialAdmin from './Pages/Testimonials/Testimonials'
import EventsAdminPanel from './Pages/newsEvents/NewsEvents'
import CarouselAdmin from './Pages/Crousel-images/CrouselImgaes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetUser } from './redux/userslice'
const APIPath = import.meta.env.VITE_BACKEND_PATH;
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import SectorsList from './Pages/sectors/Secrors'
import WelcomeAdmin from './Pages/welcome/welcome'
import VisionMissionAdmin from './Pages/vision/Vision'
import StoriesAdmin from './Pages/SuccessStoriesDescription/SuccessStoriesDescription'
import EventAdmin from './Pages/Event_description/Event_description'
import ContentAdmin from './Pages/About/About'
import SEOAdmin from './Pages/SEO/Seo'
import FooterAdmin from './Pages/footer/Footer'
import FAQManager from './Pages/faqs/Faqs'
import BankDataManager from './Pages/contactbank/Bank'
import { useSelector } from 'react-redux'
import OrgRegistration from './Pages/OrgRegistration/OrgRegistration'
function App() {
const location=useLocation()  
const dispatch=useDispatch()
const auth=useSelector((state)=>state.users.auth)
// dispatch(resetUser());
 useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.post(`${APIPath}/authlogin`, {}, { withCredentials: true });
        if (res.status === 200) {
          console.log("logged in");
        }
      } catch (err) {
          // console.log(location.pathname)
        if (err.response && err.response.status === 401 && location.pathname!=='/Login') {
          alert("Your session has timed out. Please login again.");
          dispatch(resetUser());
        } else {
        
          console.error("Auth check error:", err);
        }
      }
    }, 20000); // every 20 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [dispatch,location.pathname]);



 useEffect(() => {
    const call=async()=>{
   try {
        const res = await axios.post(`${APIPath}/authlogin`, {}, { withCredentials: true });
        if (res.status === 200) {
          console.log("logged in");
        }
      } catch (err) {
          // console.log(location.pathname)
        if (err.response && err.response.status === 401 && auth && location.pathname!=='/Login') {
          alert("Your session has timed out. Please login again.");
          dispatch(resetUser());
        } else {
        
          console.error("Auth check error:", err);
        }
      }
    }
   
call()
    
  }, [dispatch,location.pathname]);


  return (
    <>

{/* <Navbar/> */}
<Routes>
<Route path='/' element={<Protected><></></Protected>}/>
          
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>}>
          <Route path="OrganizationPage" element={<OrganizationsPage />} />
          <Route path="BlogPage" element={<DocumentCards />} />
          <Route path='createorg' element={<CreateOrganizationPage/>}/>
          <Route path='edit-organization/:id' element={<EditOrganizationPage/>}/>
          <Route path='edit-Blog/:id' element={<EditBlogPage/>}/>
          <Route path='create-document' element={<CreateBlogPage/>}/>
          <Route path='successstories' element={<SuccessStories/>}/>
          <Route path='Vedios' element={<VideoForm/>}/>
          <Route path='Profile' element={<Profile/>}/>
          <Route path='Inquiries' element={<AdminInquiries/>}/>
          <Route path='Donation' element={<AdminDonations/>}/>
          <Route path='Stories' element={<AdminStories/>}/>
          <Route path='JobApplication' element={<AdminJobs/>}/>
          <Route path='Voulenteer' element={<AdminVolunteers/>}/>
          <Route path='Contacts' element={<AdminContacts/>}/>
          <Route path='Topbar' element={<TopbarAdmin/>}/>
          <Route path='Certifications' element={<CertificationAdmin/>}/>
          <Route path="Testimonials" element={<TestimonialAdmin/>}/>
          <Route path='NewsEvents' element={<EventsAdminPanel/>}/>
          <Route path='sectors' element={<SectorsList/>}/>
          <Route path='crousel-images' element={<CarouselAdmin/>}/>
          <Route path='welcome-secton' element={<WelcomeAdmin/>}/>
          <Route path='vision' element={<VisionMissionAdmin/>}/>
          <Route path='storiesDescription' element={<StoriesAdmin/>}/>
          <Route path='eventDescription' element={<EventAdmin/>}/>
          <Route path='contentAdmin' element={<ContentAdmin/>}/>
          <Route path='seo' element={<SEOAdmin/>}/>
          <Route path='faqs' element={<FAQManager/>}/>
          <Route path='footer' element={<FooterAdmin/>}/>
          <Route path='bank' element={<BankDataManager/>}/>
          <Route path='OrgRegistration' element={<OrgRegistration/>}/>
          {/* <Route path="change-password" element={<ChangePassword />} /> */}
          <Route index element={<DashboardIndex/>} />
          
          </Route>

<Route path='/Login' element={<Protected><Login/></Protected>}/>
</Routes>

    </>
  )
}

export default App
