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
<Route path='/organizations' element={<Organizations/>}/>
<Route path='/organization/:slug' element={<Organization_Detail/>} />
<Route path='/about-khudii' element={<About/>}/>
<Route path='/Blog/:slug' element={<SpecificBlog/>}/>
<Route path='/golden-people' element={<Golden_people/>}/>
<Route path='/contact' element={<ContactUs/>}/>
<Route path='/contribute-your-story' element={<ContributeStory/>}/>
<Route path='/donate-now' element={<Donate/>}/>
<Route path='/success-stories' element={<VideoGallery/>}/>
<Route path='/social-media' element={<SocialMedai/>}/>
<Route path='/videos' element={<Vedios/>}/>
<Route path='/testimonials' element={<Testimonial/>}/>
<Route path='/tribute' element={<Tribute/>}/>
<Route path='/certifications' element={<Certification/>}/>
<Route path='/faqs' element={<FAQSection/>}/>
<Route path='/blogs' element={<Blogss/>}/>
<Route path='/jobs' element={<JobApplicationForm/>}/>
<Route path='/volunteer' element={<VolunteerForm/>}/>
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
