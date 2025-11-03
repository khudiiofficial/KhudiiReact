import { useState ,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './componets/Navbar'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/Home/Home'
import Topbar from './componets/Topbar/Topbar'
import Organizations from './pages/Organizations/Organizations'
import Footer from './componets/secondlast/Footer'
import Organization_Detail from './pages/OrganizationDetail/Organization_Detail'
import About from './pages/About/About'
import SpecificBlog from './pages/SpecificBlog/SpecificBlog'
import  VapiAssistant  from './componets/VAPI.AI/Vapi'
import Golden_people from './pages/GoldenPeople/Golden_people'
import ContactUs from './pages/Contacts/ContactUs'
import ContributeStory from './pages/ContributeStory/Contribute'
import Donate from './pages/DonateNow/Donate'
import VideoGallery from './componets/SuccessStoriesPageComponent/Success'
import SocialMedai from './pages/SocialMedia/SocialMedai'
import Vedios from './pages/Vedios/Vedios'
import Testimonial from './pages/testimonial/Testimonial'
import Tribute from './pages/Tribute/Tribute'
import Certification from './pages/certifications/Certifications'
import FAQSection from './pages/FAQs/FAQ'
import Blogss from './pages/Blogs/Blogs'
import JobApplicationForm from './pages/Jobs/Jobs'
import VolunteerForm from './pages/Volunteer/Volunteer'
import Categories from './pages/Categories/Categories'
// import TranslationWidget from './componets/translate/Translate'
function App() {
const location=useLocation()
useEffect(()=>{
 window.scrollTo({
      top: 0
      // behavior: "smooth",
    });
    // console.log('scroll')
},[location.pathname])

  return (
    <>

<main id="main-content">
  <Topbar />
   <Navbar/>
<Routes>
<Route path='/' element={<HomePage/>}/>
<Route path='/organiztionsSectors' element={<Organizations/>}/>
<Route path='/organization/:slug' element={<Organization_Detail/>} />
<Route path='/About' element={<About/>}/>
<Route path='/Blog/:slug' element={<SpecificBlog/>}/>
<Route path='/specialPeople' element={<Golden_people/>}/>
<Route path='/Contact' element={<ContactUs/>}/>
<Route path='/Story' element={<ContributeStory/>}/>
<Route path='/DonateUS' element={<Donate/>}/>
<Route path='/SuccessStories' element={<VideoGallery/>}/>
<Route path='/Socials' element={<SocialMedai/>}/>
<Route path='/vediosPage' element={<Vedios/>}/>
<Route path='/testimonialPage' element={<Testimonial/>}/>
<Route path='/Tribute' element={<Tribute/>}/>
<Route path='/Certifications' element={<Certification/>}/>
<Route path='/faqs' element={<FAQSection/>}/>
<Route path='/blogs' element={<Blogss/>}/>
<Route path='/JobApplication' element={<JobApplicationForm/>}/>
<Route path='/VolunteerForm' element={<VolunteerForm/>}/>
<Route path='Categories/:name' element={<Categories/>}/>
</Routes>
<Footer/>
<VapiAssistant/>
{/* <TranslationWidget/> */}
</main>
    </>
  )
}

export default App
