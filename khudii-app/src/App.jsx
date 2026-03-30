import { useState, useEffect, Suspense, lazy } from 'react'
import { useLocation } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import Navbar from './componets/Navbar'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/Home'
import Topbar from './componets/Topbar/Topbar'
import Footer from './componets/secondlast/Footer'
const VapiAssistant = lazy(() => import('./componets/VAPI.AI/Vapi'));
const BackToTopButton = lazy(() => import('./componets/backToTopButton/BackToTopButton.jsx'));
const SocialShare = lazy(() => import('./componets/SocialShare/SocialShare.jsx'));
import axios from 'axios'
import './cache.js'
import { useGoogleAnalytics } from './Hooks/GoogleAnalytics.jsx'

// Lazy loaded routes to improve performance and code-split the massive bundle
const Organizations = lazy(() => import('./pages/Organizations/Organizations'));
const Organization_Detail = lazy(() => import('./pages/OrganizationDetail/Organization_Detail'));
const About = lazy(() => import('./pages/About/About'));
const BlogDetails = lazy(() => import('./pages/SpecificBlog/SpecificBlog'));
const Golden_people = lazy(() => import('./pages/GoldenPeople/Golden_people'));
const ContactUs = lazy(() => import('./pages/Contacts/ContactUs'));
const ContributeStory = lazy(() => import('./pages/ContributeStory/Contribute'));
const Donate = lazy(() => import('./pages/DonateNow/Donate'));
const VideoGallery = lazy(() => import('./componets/SuccessStoriesPageComponent/Success'));
const SocialMedai = lazy(() => import('./pages/SocialMedia/SocialMedai'));
const Vedios = lazy(() => import('./pages/Vedios/Vedios'));
const Testimonial = lazy(() => import('./pages/testimonial/Testimonial'));
const Tribute = lazy(() => import('./pages/Tribute/Tribute'));
const Certification = lazy(() => import('./pages/certifications/Certifications'));
const FAQSection = lazy(() => import('./pages/FAQs/FAQ'));
const Blogss = lazy(() => import('./pages/Blogs/Blogs'));
const JobApplicationForm = lazy(() => import('./pages/Jobs/Jobs'));
const VolunteerForm = lazy(() => import('./pages/Volunteer/Volunteer'));
const Categories = lazy(() => import('./pages/Categories/Categories'));
const Detailforall = lazy(() => import('./pages/DetailforAll/Detailforall.jsx'));
const SuccessStoryDetail = lazy(() => import('./pages/Success-Stories-detail/SuccessStoryDetail.jsx'));
const Error = lazy(() => import("./pages/Error/Error.jsx"));
const OrganizationForm = lazy(() => import('./componets/organizationform/orgForm.jsx'));
const AuthCallback = lazy(() => import('./pages/AuthCalBack/AuthCallBack.jsx'));

const APIPath = import.meta.env.VITE_BACKEND_PATH;
// import TranslationWidget from './componets/translate/Translate'
function App() {
  useGoogleAnalytics()
  // Interaction-Based Deferred Loading for Heavy Widgets
  const [isInteracted, setIsInteracted] = useState(false);
  useEffect(() => {
    const handleInteraction = () => {
      setIsInteracted(true);
      ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'].forEach(event =>
        window.removeEventListener(event, handleInteraction)
      );
    };

    ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'].forEach(event =>
      window.addEventListener(event, handleInteraction, { passive: true, once: true })
    );

    const timeout = setTimeout(() => setIsInteracted(true), 15000);

    return () => {
      ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'].forEach(event =>
        window.removeEventListener(event, handleInteraction)
      );
      clearTimeout(timeout);
    };
  }, []);

  const location = useLocation()
  const [data, setSeoData] = useState([])
  const [url, seturl] = useState('')
  const findobj = (name) => {
    return data?.find((ele, i) => {

      return ele.page_url === name
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
  useEffect(() => {
    window.scrollTo({
      top: 0
      // behavior: "smooth",
    });
    // console.log('scroll')
  }, [location.pathname])

  return (
    <>

      <main id="main-content">
        <Topbar />
        <Navbar />
        {/* Render a simple fallback spinner while lazy components are downloading */}
        <Suspense fallback={
          <div className="flex w-full h-80 items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#e7001e] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path='/' element={<HomePage con={findobj('/')} url={url} />} />
            <Route path='/organizations' element={<Organizations con={findobj('/organizations')} url={url} />} />
            {/* <Route path='/organization/:slug' element={<Organization_Detail url={url}/>} /> */}
            <Route path='/about-khudii' element={<About con={findobj('/about-khudii')} url={url} />} />
            {/* <Route path='/Blog/:slug' element={<BlogDetails url={url}/>}/> */}
            <Route path='/golden-people' element={<Golden_people con={findobj('/golden-people')} url={url} />} />
            <Route path='/contact' element={<ContactUs con={findobj('/contact')} url={url} />} />
            <Route path='/contribute-your-story' element={<ContributeStory con={findobj('/contribute-your-story')} url={url} />} />
            <Route path='/donate-now' element={<Donate con={findobj('/donate-now')} url={url} />} />
            <Route path='/success-stories' element={<VideoGallery con={findobj('/success-stories')} url={url} />} />
            <Route path='/social-media' element={<SocialMedai con={findobj('/social-media')} url={url} />} />
            <Route path='/videos' element={<Vedios con={findobj('/videos')} url={url} />} />
            <Route path='/testimonials' element={<Testimonial con={findobj('/testimonials')} url={url} />} />
            <Route path='/tribute' element={<Tribute con={findobj('/tribute')} url={url} />} />
            <Route path='/certifications' element={<Certification con={findobj('/certifications')} url={url} />} />
            <Route path='/faqs' element={<FAQSection con={findobj('/faqs')} url={url} />} />
            <Route path='/blogs' element={<Blogss con={findobj('/blogs')} url={url} />} />
            <Route path='/jobs' element={<JobApplicationForm con={findobj('/jobs')} url={url} />} />
            <Route path='/volunteer' element={<VolunteerForm con={findobj('/volunteer')} url={url} />} />
            <Route path='/success-stories/:slug' element={<SuccessStoryDetail url={url} />} />
            {/* <Route path='Categories/:slug' element={<Categories url={url}/>}/> */}
            <Route path="/organization/registration" element={<OrganizationForm/>}/>
            {/* <Route path="/auth-callback" element={<AuthCallback/>}/> */}
            <Route path='/:slug' element={<Detailforall url={url} />} />
            <Route path='/*' element={<Error url={url}/>}/>
          </Routes>
        </Suspense>
        <Footer />
        {isInteracted && (
          <Suspense fallback={null}>
            <VapiAssistant />
            <BackToTopButton />
            <SocialShare />
          </Suspense>
        )}
        {/* <TranslationWidget/> */}
      </main>
    </>
  )
}

export default App
