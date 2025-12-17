import React from 'react';
// import styles from './Success.module.css'
import { useEffect,useState } from 'react';
import SEO from '../../componets/Helmet/Helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Styles from './SuccessStory.module.css'
const APIPath = import.meta.env.VITE_BACKEND_PATH;
import { useParams } from 'react-router-dom';
const SuccessStoryDetail = () => {
  const nav=useNavigate()
  let {slug}=useParams();
  const [videoData,setvideodata]=useState([])
  const [Error,setError]=useState(null)
  const [loader,setloader]=useState(false)
 function Loader() {
  return (
    // <div className="flex items-center justify-center h-40 ">
    //   <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    // </div>
     <div className="flex items-center justify-center h-90 ">
     
      {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"> */}
        <img src="/siteicon.png" alt="" width={200} height={200}/>
      {/* </div> */}
    </div>
  );
}


useEffect(()=>{
const get=async ()=>{
  setloader(true)
  try {
     const res= await axios.get(`${APIPath}/success-story/${slug}`,{withCredentials:true})
     if(res.status===200){
      setvideodata(res.data)
     }
     else{
      throw new Error("could not get")
     }
  } catch (error) {
    setError(error.message)
  }
 setloader(false)
}
get();

},[])
  

//   useEffect(() => {
//     if (!selectedVideo) {
//       setSelectedVideo(videoData[0]);
//     }
//   }, [selectedVideo,videoData]);

//   // Calculate number of slides/groups based on items to show
//   const totalSlides = Math.ceil(videoData.length / slidesToShow);

//   // Update slides to show based on screen size
 

 

if(loader){
  return <Loader/>
}
      if (Error) return (
      <div className={`errorContainer`}>
      <div className={`errorIcon`}>⚠️</div>
      <h2 className={`errorTitle`}>Unable to Load Content</h2>
      <p className={`errorMessage`}>{Error}</p>
      <button 
        className={`retryButton`}
        onClick={() =>nav("/")}
      >
        Back to Home
      </button>
    </div>
    );

  return (
   <>
      {/* <SEO 
        title={con?.meta_title||"Videos - Khudii Pakistan | Welfare Initiatives & Success Stories"}
        description={con?.meta_description||"Watch Khudii's latest videos showcasing welfare projects, community initiatives, and success stories across Pakistan. Explore our humanitarian work through engaging video content."}
        keywords={con?.meta_keywords||"khudii videos, welfare organization videos, pakistan charity videos, humanitarian projects, community work videos, khudii youtube, social welfare videos, pakistan social work"}
        url={`${url}/videos`}
        type="website"
      /> */}
   <section className={Styles.section}>
     <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#222222] mb-4">
            Khudii Success Stories
          </h1>
          <p className="text-xl text-[#222222] max-w-3xl mx-auto">
            Inspiring stories of hope, compassion, and community impact. 
            Discover how Khudii and its partners are making a difference across Pakistan.
          </p>
        </div>
      <div className="video-gallery-container">
        {/* Main Featured Video */}
    
          <div className="featured-video-section">
            <div className="featured-video-container">
              <div className="video-wrapper">
                <iframe
                  className="featured-video"
                  src={`https://www.youtube.com/embed/${videoData.youtube_id}?rel=0&modestbranding=1&autoplay=1`}
                  title={videoData.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="video-info !bg-gray-200 ">
                <h2 className="video-title">{videoData.title}</h2>
                <p className="video-description">{videoData.description}</p>
              </div>
            </div>
          </div>
    
      </div>
    </section>
    </>
  );
};


export default SuccessStoryDetail