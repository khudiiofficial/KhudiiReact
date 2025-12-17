import React, { useState, useEffect } from 'react';
import './Blogs.css';
import { data, Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const APIPath = import.meta.env.VITE_BACKEND_PATH;


const Blog = ({loader1=false}) => {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [err,seterr]=useState(null)
  const [loader,setloader]=useState(false)
  const nav=useNavigate()
const location=useLocation()
  // const blogPosts = [
  
 
  //   {
  //     id: 44,
  //     Name: "Flood Destruction in Swat and Buner",
  //     Intro: "At Khudii, we stand with the communities in Swat and...",
  //     Image: "https://www.khudii.com/wp-content/uploads/2025/08/flood-destruction-in-swat-and-buner-300x300.webp",
     
  //   }
  // ];


   function Loader() {
  return (
    // <div className="flex items-center justify-center h-40 ">
    //   <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    // </div>
    ""
  );
}


  useEffect(()=>{
(async ()=>{
  setloader(true)
  try {
    const res=await axios.get(`${APIPath}/getAllBlogs`,{withCredentials:true})
    setVisiblePosts(res.data)
    
  } catch (error) {
    seterr(error.message)
  }
  setloader(false)
})()
  },[])


  if(loader || loader1){
    return <Loader/>
  }
if(err){
return (

    <div className={`errorContainer`}>
          <div className={`errorIcon`}>⚠️</div>
          <h2 className={`errorTitle`}>Unable to Load Content</h2>
          <p className={`errorMessage`}>{err}</p>
          <button 
            className={`bg-[#e7001e] retryButton`}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
)
}

// console.log(visiblePosts)
  return (
    // <div className="blog-container-full">
    //   <div className="blog-inner-container">
    //     <div className="blog-header">

    //       {location.pathname!=='/blogs' && <h2 className="blog-title">Blogs</h2>}
    //     </div>
        
    //     <div className="blog-grid">
    //       {visiblePosts.map((post, index) => (
    //         <article 
    //           key={post.id} 
    //           className="blog-card"
    //           style={{ animationDelay: `${index * 0.2}s` }}
    //         >
    //           <div className="blog-card-inner">
    //             <div className="blog-image-container">
    //               <img 
    //                 src={post.Image} 
    //                 alt={post.Name}
    //                 className="blog-image"
    //               />
    //               <div className="blog-overlay">
    //                 <div className="blog-overlay-content">
    //                   <i className="fas fa-long-arrow-alt-right"></i>
    //                   <button aria-label="Read more about this blog post" onClick={()=>{nav(`/Blog/${post.slug}`,{state:{id:post.id}})}}  className="blog-read-more-link"></button>
    //                 </div>
    //               </div>
    //             </div>
    //             {/* to={`/Blog/${post.id}`} */}
    //             <div className="blog-content">
    //               <header className="blog-header-content">
    //                 <h3 className="blog-post-title">
    //                   <button aria-label="Read more about this blog post" onClick={()=>{nav(`/Blog/${post.slug}`,{state:{id:post.id}})}} className="blog-post-link">
    //                     {post.Name}
    //                   </button>
    //                 </h3>
    //               </header>
                  
    //               <div className="blog-meta">
    //                 <span className="blog-date">
    //                   <time dateTime={post.date}>{post.date}</time>
    //                 </span>
    //               </div>
                  
    //               <div className="blog-excerpt">
    //                 <p>{post.Intro}</p>
    //                 <button  aria-label="Read more about this blog post" onClick={()=>{nav(`/Blog/${post.slug}`,{state:{id:post.id}})}} className="blog-explore-btn">
    //                   Explore Blog
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </article>
    //       ))}
    //     </div>
        
    //     {/* <div className="blog-load-more">
    //       <button className="load-more-btn">
    //         <span className="btn-loader"></span>
    //         <span className="load-more-text">Load More</span>
    //       </button>
    //     </div> */}
    //   </div>
    // </div>

    // 2nd Code
    <div className="w-full">
  <div className="max-w-[1240px] w-full mx-auto">
    {/* Header */}
    <div className="text-center">
      {location.pathname !== '/blogs' && (
        <h2 className="text-2xl sm:text-3xl font-bold text-[#02236e] p-4 md:p-8 lg:p-10">Blogs</h2>
      )}
    </div>

    {/* Blog Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:px-4 sm:px-6 gap-6 pb-8">
      {visiblePosts.map((post, index) => (
        <article
        onClick={() => nav(`/${post.slug}`, { state: { id: post.id } })}
          key={post.id}
          className="cursor-pointer group bg-white rounded-xl shadow-md transition-all duration-300"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="relative">
            {/* Image */}
            <div className="aspect-video">
              <img
                src={post.Image}
                alt={post.Name}
                className="rounded-2xl w-full transition-transform duration-500"
              />
            </div>

            {/* Overlay (on hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
              <button
                aria-label="Read more about this blog post"
                className="flex items-center justify-center w-12 h-12 bg-white text-[#222222] rounded-full shadow-lg hover:bg-blue-50 transition-colors"
              >
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            <header>
              <h3 className={`blog_title text-lg sm:text-xl font-semibold text-black-700 mb-0 line-clamp-2 lg:h-[55px]`}>
                <button
                  aria-label="Read more about this blog post"
                  className="transition-colors text-left block"
                >
                  {post.Name}
                </button>
              </h3>
            </header>

            <div className="text-sm text-gray-500 mb-3">
              <time dateTime={post.date}>{post.date}</time>
            </div>
            {/* Button */}
            <div class="flex flex-col space-y-4">
  <p class="text-gray-700 line-clamp-3">{post.Intro}</p>
  <button aria-label="Read more about this blog post" class="bg-[#E3001C] cursor-pointer font-medium items-center justify-center px-5 py-2.5 rounded-[25px] mx-auto sm:w-auto text-sm text-white w-50">Explore Blog</button>
</div>
          </div>
        </article>
      ))}
    </div>
  </div>
</div>
  );

};


export default Blog;