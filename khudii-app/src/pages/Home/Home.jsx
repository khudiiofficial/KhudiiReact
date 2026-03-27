// import React from 'react'
// import Topbar from '../../componets/Topbar/Topbar'
// import Crousel from '../../componets/crousel/Crousel'
// import Cards from '../../componets/Cards/Cards'
// import WelcomeSection from '../../componets/welcomeSection/WelcomeSection'
// import Vision from '../../componets/VisionSection/Vision'
// import SuccessStories from '../../componets/SuccessStories/SuccessStories'
// import OrganizationsSection from '../../componets/organizations/Organizations'
// import Events from '../../componets/Events/Events'
// import Partners from '../../componets/Partners/Partners'
// import Blogs from '../../componets/Blogs/Blogs'
// import FacebookPage from '../../componets/facebookCom/Facebook'
// import SEO from '../../componets/Helmet/Helmet'

// const HomePage = ({con,url}) => {

//   return (

//     <>
//       <SEO 
//         title={con?.meta_titile ||"Khudii - Pakistan's Largest Digital Welfare Platform | Community Support"}
//         description={con?.meta_description || "Khudii is Pakistan's premier digital welfare platform connecting donors, volunteers, and organizations across health, education, autism support, orphan care, and community development programs. Join us in creating lasting change."}
//         keywords={con?.meta_keywords||"khudii pakistan, digital welfare platform, charity donors, volunteer opportunities, health programs pakistan, education support, autism care, orphanage support, visually impaired assistance, community development, social welfare, pakistan charity organizations"}
//         url={ url||"https://khudii.com"}
//         image="/Khudii.webp"
//       />
//     <Crousel/>
//     <Cards/>
//     <WelcomeSection/>
//     <Vision/>
//     <SuccessStories/>
//     <OrganizationsSection/>
//     <Events/>
//     <Partners/>
//     <Blogs/>
//     <FacebookPage/>
   

//     </>



//   )
// }

// export default HomePage
import React, { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import SEO from "../../componets/Helmet/Helmet";
import LazySection from "../../componets/LazySection";

const APIPath = import.meta.env.VITE_BACKEND_PATH;

// 🔥 Lazy imports (code splitting)
const Crousel = lazy(() => import("../../componets/crousel/Crousel"));
const Cards = lazy(() => import("../../componets/Cards/Cards"));
const WelcomeSection = lazy(() => import("../../componets/welcomeSection/WelcomeSection"));
const Vision = lazy(() => import("../../componets/VisionSection/Vision"));
const SuccessStories = lazy(() => import("../../componets/SuccessStories/SuccessStories"));
const OrganizationsSection = lazy(() => import("../../componets/organizations/Organizations"));
const Events = lazy(() => import("../../componets/Events/Events"));
const Partners = lazy(() => import("../../componets/Partners/Partners"));
const Blogs = lazy(() => import("../../componets/Blogs/Blogs"));
const FacebookPage = lazy(() => import("../../componets/facebookCom/Facebook"));

const HomePage = ({ con, url }) => {
  const [data, setData] = useState({
    cards: [],
    vision: [],
    stories: [],
    orgs: [],
    blogs: []
  });

  const [loading, setLoading] = useState(true);

  // ✅ CENTRALIZED API CALLS
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          cardsRes,
          visionRes,
          storiesRes,
          orgsRes,
          blogsRes
        ] = await Promise.all([
          axios.get(`${APIPath}/getAllSectors`),
          axios.get(`${APIPath}/api/vision-mission`),
          axios.get(`${APIPath}/getsuccessstories`),
          axios.get(`${APIPath}/items`),
          axios.get(`${APIPath}/getAllBlogs`)
        ]);

        setData({
          cards: cardsRes.data.data || [],
          vision: visionRes.data.data || [],
          stories: storiesRes.data || [],
          orgs: orgsRes.data || [],
          blogs: blogsRes.data || []
        });

      } catch (err) {
        console.log("Error fetching homepage data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
    <div 
  className="flex items-center justify-center min-h-[360px]"
  role="status"
  aria-label="Loading"
  aria-live="polite"
>
  <img 
    src="/siteicon.png" 
    alt="Loading spinner" 
    width="200" 
    height="200"
    fetchpriority="high"
    decoding="sync"
    style={{
      width: '200px',
      height: '200px',
      maxWidth: '100%',
      height: 'auto'
    }}
  />

</div>
    );
  }

  return (
    <>
      <SEO
        title={con?.meta_titile || "Khudii - Pakistan's Largest Digital Welfare Platform"}
        description={con?.meta_description}
        keywords={con?.meta_keywords}
        url={url || "https://khudii.com"}
        image="/Khudii.webp"
      />

      {/* 🔥 ABOVE THE FOLD (LOAD IMMEDIATELY) */}
      <Suspense fallback={<div className="h-[300px]" />}>
        <Crousel />
      </Suspense>

      <Suspense fallback={<div className="h-[200px]" />}>
        <Cards data={data.cards} />
      </Suspense>

      {/* 🔽 BELOW THE FOLD (LOAD ON SCROLL) */}
      <LazySection>
        <WelcomeSection />
      </LazySection>

      <LazySection>
        <Vision data={data.vision} />
      </LazySection>

      <LazySection>
        <SuccessStories data={data.stories} />
      </LazySection>

      <LazySection>
        <OrganizationsSection data={data.orgs} />
      </LazySection>

      <LazySection>
        <Events />
      </LazySection>

      <LazySection>
        <Partners />
      </LazySection>

      <LazySection>
        <Blogs data={data.blogs} />
      </LazySection>

      <LazySection>
        <FacebookPage />
      </LazySection>
    </>
  );
};

export default HomePage;