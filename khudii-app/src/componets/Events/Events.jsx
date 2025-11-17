// import React, { useEffect, useRef, useState } from 'react';
// import styles from './Event.module.css';
// import { Link } from 'react-router-dom';
// const Events = () => {
//   const events = [
//     {
//       title: "AL-MAKKI AL-MADNI DIALYSIS CENTRE AND SURGICAL HOSPITAL || LAHORE",
      
//       url: "https://www.youtube.com/embed/au2wk2zVAbE",
//     },
//     {
//       title: "INAUGURATION OF TRANSGENDER VOCATIONAL CENTER - FOUNTAIN HOUSE",
    
//       url: "https://www.youtube.com/embed/mArnWmwxCmo",
//     },
//     {
//       title: "SIALKOT KIDNEY HOSPITAL - A STATE OF THE ART INSTITUTE",
  
//       url: "https://www.youtube.com/embed/bZFFi92z9jM",
//     },
//       {
//       title: "FAMILY WELFARE SOCIETY - VISITED BY CEO OF CHARITY COMMISSION PUNJAB",
  
//       url: "https://www.youtube.com/embed/EsP8KHer7kQ",
//     },
//       {
//       title: "KHUDII MONTHLY REVIEW - JULY 2025",
  
//       url: "https://www.youtube.com/embed/gQPrOGWv4mc",
//     },
//       {
//       title: "JANNAT AZIZ EYE HOSPITAL - COMPLETE TOUR",
  
//       url: "https://www.youtube.com/embed/KQjzZzh4USY",
//     }
//   ];

//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section ref={sectionRef} className="bg-white py-10 ">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700`}>
//           <h2 className={`text-4xl font-bold text-[#022279] mb-4 ${styles.class1} animate-slide-in-left`}>
//             News & Events
//           </h2>
//           <p className="text-gray-600 mb-8 text-lg animate-slide-in-right">
//             Watch highlights from our partner organizations and community events.
//           </p>
//         </div>

//         <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.map((evt, idx) => (
//             <div
//               key={idx}
//               className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-3 animate-fade-in-up`}
//               style={{ animationDelay: `${idx * 0.2}s` }}
//             >
           
//               <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-t-xl">
//                 <div className="absolute inset-0 bg-gradient-to-br from-[#022279] to-[#E3001C] opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>
//                 <iframe
//                   className="absolute top-0 left-0 w-full h-full group-hover:scale-110 transition-transform duration-700"
//                   src={evt.url}
//                   title={evt.title}
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
               
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#E3001C] transition-colors duration-300 line-clamp-2 leading-tight">
//                   {evt.title}
//                 </h3>
//                 {/* <div className="flex items-center mt-4">
//                   <div className="w-3 h-3 bg-[#E3001C] rounded-full animate-pulse mr-2"></div>
//                   <span className="text-sm text-gray-500 font-medium">{evt.duration}</span>
//                 </div> */}
//               </div>
//             </div>
//           ))}
//         </div>



//       </div>
// {/*       
//       <div className={`max-w-7xl mx-auto px-6 mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
//         <div className="grid grid-cols-12 gap-8 items-center">
      
//           <div className="col-span-12 lg:col-span-7">
//             <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl shadow-lg border-l-4 border-[#E3001C] transform hover:-translate-y-1 transition-transform duration-300">
//               <p className="text-2xl lg:text-3xl font-light text-gray-800 leading-relaxed mb-8">
//                 We empower communities by providing essential services in health, education, disability support, water access, thalassemia care, and food security.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//               <Link to='/Story'>  <button className="bg-gradient-to-r from-[#E3001C] to-[#FF6B6B] text-white px-8 py-4 rounded-full font-semibold hover:from-[#FF6B6B] hover:to-[#E3001C] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
//                   <span>Contribute your story</span>
//                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </button></Link>
//               <Link to={'/DonateUs'}>  <button className="bg-gradient-to-r from-[#022279] to-[#3B82F6] text-white px-8 py-4 rounded-full font-semibold hover:from-[#3B82F6] hover:to-[#022279] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
//                   <span>Donate Now</span>
//                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                 </button></Link>
//               </div>
//             </div>
//           </div>
        
//           <div className="col-span-12 lg:col-span-5">
//             <div className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-r from-[#022279] to-[#E3001C] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500"></div>
//               <img 
//                 src="/ehdi-foundation-4-768x576.jpg.webp" 
//                 alt="Community support" 
//                 className="w-full h-auto rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-700"
//               />
//               <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                 <span className="text-sm font-semibold text-[#022279]">Making a Difference</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}

//       <div className={`max-w-7xl mx-auto px-3 sm:px-4 md:px-6 mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
//   <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center">
//     {/* Text Content - 7 columns */}
//     <div className="col-span-12 lg:col-span-7">
//       <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg border-l-4 border-[#E3001C] transform hover:-translate-y-1 transition-transform duration-300">
//         <p className={`${styles.newclass} text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-800 leading-relaxed mb-6 break-words`}>
//           We empower communities by providing essential services in health, education, disability support, water access, thalassemia care, and food security.
//         </p>
//         <div className="flex items-center justify-center xs:flex-row gap-3 sm:gap-4">
//           <Link to='/Story'>  <button className="bg-gradient-to-r from-[#E3001C] to-[#FF6B6B] text-white px-8 py-4 rounded-full font-semibold hover:from-[#FF6B6B] hover:to-[#E3001C] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
//                   <span>Contribute your story</span>
//                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </button></Link>
//       <Link to={'/DonateUs'}>  <button className="bg-gradient-to-r from-[#022279] to-[#3B82F6] text-white px-8 py-4 rounded-full font-semibold hover:from-[#3B82F6] hover:to-[#022279] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
//                   <span>Donate Now</span>
//                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                 </button></Link>
//         </div>
//       </div>
//     </div>
//     {/* Image Content - 5 columns */}
//     <div className="col-span-12 lg:col-span-5">
//       <div className="relative group">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#022279] to-[#E3001C] opacity-0 group-hover:opacity-10 rounded-xl sm:rounded-2xl transition-opacity duration-500"></div>
//         <img 
//           src="/ehdi-foundation-4-768x576.jpg.webp" 
//           alt="Community support" 
//           className="w-full h-auto rounded-xl sm:rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-700"
//         />
//         <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//           <span className="text-xs sm:text-sm font-semibold text-[#022279]">Making a Difference</span>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//       {/* <div className="mt-16 text-center animate-fade-in-up">
//         <a
//           href="/news-events"
//           className="inline-block bg-gradient-to-r from-[#022279] to-[#3B82F6] text-white font-semibold px-8 py-4 rounded-full hover:from-[#3B82F6] hover:to-[#022279] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
//         >
//           See All Events
//           <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </a>
//       </div> */}

//       {/* Add these styles to your global CSS */}
//       <style jsx='true'>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slide-in-left {
//           animation: slideInLeft 0.8s ease-out forwards;
//         }
        
//         .animate-slide-in-right {
//           animation: slideInRight 0.8s ease-out forwards;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </section>
//   );
// }

// export default Events;

import React, { useEffect, useRef, useState } from 'react';
import styles from './Event.module.css';
import { Link } from 'react-router-dom';

const Events = () => {
  const events = [
    {
      title: "AL-MAKKI AL-MADNI DIALYSIS CENTRE AND SURGICAL HOSPITAL || LAHORE",
      url: "https://www.youtube.com/embed/JjIpbo_t1JQ",
      videoId: "JjIpbo_t1JQ"
    },
    {
      title: "INAUGURATION OF TRANSGENDER VOCATIONAL CENTER - FOUNTAIN HOUSE",
      url: "https://www.youtube.com/embed/mArnWmwxCmo",
      videoId: "mArnWmwxCmo"
    },
    {
      title: "SIALKOT KIDNEY HOSPITAL - A STATE OF THE ART INSTITUTE",
      url: "https://www.youtube.com/embed/bZFFi92z9jM",
      videoId: "bZFFi92z9jM"
    },
    {
      title: "FAMILY WELFARE SOCIETY - VISITED BY CEO OF CHARITY COMMISSION PUNJAB",
      url: "https://www.youtube.com/embed/EsP8KHer7kQ",
      videoId: "EsP8KHer7kQ"
    },
    {
      title: "KHUDII MONTHLY REVIEW - JULY 2025",
      url: "https://www.youtube.com/embed/gQPrOGWv4mc",
      videoId: "gQPrOGWv4mc"
    },
    {
      title: "JANNAT AZIZ EYE HOSPITAL - COMPLETE TOUR",
      url: "https://www.youtube.com/embed/KQjzZzh4USY",
      videoId: "KQjzZzh4USY"
    }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleVideoLoad = (index) => {
    setLoadedVideos(prev => ({
      ...prev,
      [index]: true
    }));
  };

//   return (
//     <section ref={sectionRef} className="bg-white pt-5 pb-5">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700`}>
//           <h2 className={`text-4xl font-bold text-[#022279] mb-2 ${styles.class1}`}>
//             News & Events
//           </h2>
//           <p className="text-gray-600 mb-8 text-lg animate-slide-in-right text-center">
//             Watch highlights from our partner organizations and community events.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.map((evt, idx) => (
//             <div
//               key={idx}
//               className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-3 animate-fade-in-up`}
//               style={{ animationDelay: `${idx * 0.2}s` }}
//             >
//               <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-t-xl">
//                 {!loadedVideos[idx] ? (
//                   // THUMBNAIL VIEW - Click to load video
//                   <div 
//                     className="absolute  top-0 left-0 w-full h-full cursor-pointer bg-gray-100"
//                     onClick={() => handleVideoLoad(idx)}
//                   >
//                     <img 
//                       src={`https://img.youtube.com/vi/${evt.videoId}/maxresdefault.jpg`}
//                       alt={`${evt.title} thumbnail`}
//                       className={`${styles.events_thumbnail} w-full h-full object-cover`}
//                       loading="lazy"
//                     />
//                     <div className="absolute inset-0  flex items-center justify-center transition-opacity hover:bg-opacity-20">
//                       <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors hover:scale-110">
//                         <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M8 5v14l11-7z"/>
//                         </svg>
//                       </div>
//                     </div>
//                     {/* <div className="absolute bottom-3 left-3 text-white text-sm bg-black bg-opacity-70 px-2 py-1 rounded">
//                       Click to play
//                     </div> */}
//                   </div>
//                 ) : (
//                   // VIDEO VIEW - YouTube iframe
//                   <iframe
//                     className="absolute top-0 left-0 w-full h-full"
//                     src={`${evt.url}?autoplay=1`}
//                     title={evt.title}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     loading="lazy"
//                   ></iframe>
//                 )}
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#02236e] transition-colors duration-300 line-clamp-2 leading-tight">
//                   {evt.title}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Rest of your component remains the same */}
//       <div className={`max-w-7xl mx-auto px-3 sm:px-4 md:px-6 mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
//         <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-center">
//           <div className="col-span-12 lg:col-span-8">
//             <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg border-l-4 border-[#E3001C] transform hover:-translate-y-1 transition-transform duration-300">
//               <p className={`${styles.newclass} text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-800 leading-relaxed mb-6 break-words`}>
//                 We empower communities by providing essential services in health, education, disability support, water access, thalassemia care, and food security.
//               </p>
//               <div className="flex items-center justify-center xs:flex-row gap-3 sm:gap-4">
//                 <Link to='/contribute-your-story/'>
//                   <button className="bg-gradient-to-r from-[#E3001C] to-[#FF6B6B] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:from-[#FF6B6B] hover:to-[#E3001C] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
//                     <span className="text-sm sm:text-base">Contribute your story</span>
//                     <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                     </svg>
//                   </button>
//                 </Link>
//                 <Link to={'/donate-now/'}>
//                   <button className="bg-gradient-to-r from-[#022279] to-[#3B82F6] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:from-[#3B82F6] hover:to-[#022279] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
//                     <span className="text-sm sm:text-base">Donate Now</span>
//                     <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                     </svg>
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
          
//           <div className="col-span-12 lg:col-span-4">
//             <div className="relative group">
//               {/* <div className="absolute inset-0 bg-gradient-to-r from-[#022279] to-[#E3001C] opacity-0 group-hover:opacity-10 rounded-xl sm:rounded-2xl transition-opacity duration-500"></div> */}
//               <img 
//                 src="/ehdi-foundation-4-768x576.jpg.webp" 
//                 alt="Community support" 
//                 className={` ${styles.community_img} w-full h-auto rounded-xl sm:rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-700`}
//                 loading="lazy"
            
//               />
//               {/* <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                 <span className="text-xs sm:text-sm font-semibold text-[#022279]">Making a Difference</span>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx='true'>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slide-in-left {
//           animation: slideInLeft 0.8s ease-out forwards;
//         }
        
//         .animate-slide-in-right {
//           animation: slideInRight 0.8s ease-out forwards;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </section>
//   );
// }

// export default Events;

// 2nd code

return (
    <section ref={sectionRef} className="bg-white py-10 sm:py-12 md:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} transition-opacity duration-700`}>
          <h2 className="text-3xl md:text-4xl font-bold text-[#022279] mb-2 text-center mx-auto max-w-3xl">
            News & Events
          </h2>
          <p className="text-gray-600 mb-8 text-lg md:text-xl max-w-4xl mx-auto text-center animate-slide-in-right">
            Watch highlights from our partner organizations and community events.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events.map((evt, idx) => (
            <div
              key={evt.id || idx}
              className={`group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition-all duration-500 hover:-translate-y-2 animate-fade-in-up`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="relative pb-[57%] h-0 overflow-hidden">
                {!loadedVideos[idx] ? (
                  // Thumbnail View
                  <div 
                    className="absolute inset-0 cursor-pointer bg-gray-100 flex items-center justify-center"
                    onClick={() => handleVideoLoad(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleVideoLoad(idx)}
                    aria-label={`Play video: ${evt.title}`}
                  >
                    <img 
                      src={`https://img.youtube.com/vi/${evt.videoId}/hqdefault.jpg`}
                      alt={`${evt.title} thumbnail`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://img.youtube.com/vi/0/hqdefault.jpg'; // fallback
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:bg-opacity-30">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors group-hover:scale-110">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Video View
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`${evt.url}?autoplay=1&rel=0&modestbranding=1`}
                    title={evt.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                )}
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-[#02236e] transition-colors duration-300 line-clamp-2">
                  {evt.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        {/* Nasf e Mutmainna Img */}
        <div className="max-w-[3/4] lg:col-span-1 order-1 lg:order-2 flex justify-center lg:pt-4">
              <img 
                src="\نفس مطمئنہ.png" 
                alt="Community members receiving support from EHDI Foundation" 
                className="w-full max-w-[500px] h-auto duration-500"
                loading="lazy"
              />
            </div>
        {/* CTA Section */}
        <div className={`max-w-[1240px] mx-auto px-4 sm:px-6 mt-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} transition-opacity duration-700`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="max-w-[100%] lg:col-span-1 order-2 lg:order-1">
              <div className="bg-gradient-to-r from-gray-50 to-white p-5 sm:p-6 md:p-4 rounded-xl border-l-4 border-[#E3001C] shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-800 leading-relaxed mb-5 break-words text-justify">
                  We empower communities by providing essential services in health, education, disability support, water access, thalassemia care, and food security.
                </p>
                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center xs:justify-start">
                  <Link to="/contribute-your-story/">
                    <button 
                      className="bg-gradient-to-r from-[#E3001C] to-[#FF6B6B] text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-full font-medium hover:from-[#FF6B6B] hover:to-[#E3001C] transform hover:scale-[1.03] transition-all duration-300 shadow hover:shadow-md whitespace-nowrap"
                      aria-label="Contribute your story"
                    >
                      <span className="text-sm sm:text-base">Contribute your story</span>
                      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 ml-1.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </Link>
                  <Link to="/donate-now/">
                    <button 
                      className="bg-gradient-to-r from-[#022279] to-[#3B82F6] text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-full font-medium hover:from-[#3B82F6] hover:to-[#022279] transform hover:scale-[1.03] transition-all duration-300 shadow hover:shadow-md whitespace-nowrap"
                      aria-label="Donate Now"
                    >
                      <span className="text-sm sm:text-base">Donate Now</span>
                      <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 ml-1.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center">
              <img 
                src="/ehdi-foundation-4-768x576.jpg.webp" 
                alt="Community members receiving support from EHDI Foundation" 
                className="w-full max-w-[450px] h-auto rounded-xl shadow-md transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scoped Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out 0.2s forwards;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Events;