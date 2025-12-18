import { useState ,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import reactLogo from './assets/react.svg'

import Navbar from './componets/Navbar'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/Home/Home'
import Topbar from './componets/Topbar/Topbar'
import Organizations from './pages/Organizations/Organizations'
import Footer from './componets/secondlast/Footer'
import Organization_Detail from './pages/OrganizationDetail/Organization_Detail'
import About from './pages/About/About'
import BlogDetails from './pages/SpecificBlog/SpecificBlog'
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
import BackToTopButton from './componets/backToTopButton/BackToTopButton.jsx'
import axios from 'axios'
import './cache.js'
import { useGoogleAnalytics } from './Hooks/GoogleAnalytics.jsx'
import Detailforall from './pages/DetailforAll/Detailforall.jsx'
import SuccessStoryDetail from './pages/Success-Stories-detail/SuccessStoryDetail.jsx'
const APIPath = import.meta.env.VITE_BACKEND_PATH;
// import TranslationWidget from './componets/translate/Translate'
function App() {
useGoogleAnalytics()
const location=useLocation()
const [data,setSeoData]=useState([])
const [url,seturl]=useState('')
const findobj= (name)=>{
return data?.find((ele,i)=>{
  
return ele.page_url===name
})
}

// console.log(data)
 const fetchSEOData = async () => {
    // setLoading(true);
    try {
      const response = await axios.get(`${APIPath}/api/seo`);
     
      if (response.data.success) {

       setSeoData(response.data.data.pages)
        // console.log(response.data.data.pages)
     
        seturl(response.data.data.url)
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      
    } finally {
      // setLoading(false);
    }
  };
   useEffect(() => {
    fetchSEOData();
  }, []);
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
  <Topbar/>
   <Navbar/>
<Routes>
<Route path='/' element={<HomePage con={findobj('/')} url={url}/>}/>
<Route path='/organizations' element={<Organizations con={findobj('/organizations')} url={url} />}/>
{/* <Route path='/organization/:slug' element={<Organization_Detail url={url}/>} /> */}
<Route path='/about-khudii' element={<About  con={findobj('/about-khudii')} url={url} />}/>
{/* <Route path='/Blog/:slug' element={<BlogDetails url={url}/>}/> */}
<Route path='/golden-people' element={<Golden_people  con={findobj('/golden-people')} url={url}/>}/>
<Route path='/contact' element={<ContactUs  con={findobj('/contact')} url={url}/>}/>
<Route path='/contribute-your-story' element={<ContributeStory  con={findobj('/contribute-your-story')} url={url}/>}/>
<Route path='/donate-now' element={<Donate  con={findobj('/donate-now')} url={url}/>}/>
<Route path='/success-stories' element={<VideoGallery  con={findobj('/success-stories')} url={url}/>}/>
<Route path='/social-media' element={<SocialMedai  con={findobj('/social-media')} url={url}/>}/>
<Route path='/videos' element={<Vedios  con={findobj('/videos')} url={url}/>}/>
<Route path='/testimonials' element={<Testimonial  con={findobj('/testimonials')} url={url}/>}/>
<Route path='/tribute' element={<Tribute  con={findobj('/tribute')} url={url}/>}/>
<Route path='/certifications' element={<Certification  con={findobj('/certifications')} url={url}/>}/>
<Route path='/faqs' element={<FAQSection  con={findobj('/faqs')} url={url}/>}/>
<Route path='/blogs' element={<Blogss  con={findobj('/blogs')} url={url}/>}/>
<Route path='/jobs' element={<JobApplicationForm  con={findobj('/jobs')} url={url}/>}/>
<Route path='/volunteer' element={<VolunteerForm  con={findobj('/volunteer')} url={url}/>}/>
<Route path='/success-stories/:slug' element={<SuccessStoryDetail url={url}/>}/>
{/* <Route path='Categories/:slug' element={<Categories url={url}/>}/> */}
<Route path='/:slug' element={<Detailforall url={url}/>}/>
</Routes>
<Footer/>
<VapiAssistant/>
<BackToTopButton/>
{/* <TranslationWidget/> */}
</main>
    </>
  )
}

export default App
