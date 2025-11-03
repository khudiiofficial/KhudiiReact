import React, { useState, useEffect } from 'react';
import './Blogs.css';
import { data, Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const APIPath = import.meta.env.VITE_BACKEND_PATH;


const Blog = () => {
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
    <div className="flex items-center justify-center h-40 ">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
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


  if(loader){
    return <Loader/>
  }
if(err){
return (

    <div className={`errorContainer`}>
          <div className={`errorIcon`}>⚠️</div>
          <h2 className={`errorTitle`}>Unable to Load Content</h2>
          <p className={`errorMessage`}>{err}</p>
          <button 
            className={`retryButton`}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
)
}
// console.log(visiblePosts)
  return (
    <div className="blog-container-full">
      <div className="blog-inner-container">
        <div className="blog-header">

          {location.pathname!=='/blogs' && <h2 className="blog-title">Blogs</h2>}
        </div>
        
        <div className="blog-grid">
          {visiblePosts.map((post, index) => (
            <article 
              key={post.id} 
              className="blog-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="blog-card-inner">
                <div className="blog-image-container">
                  <img 
                    src={post.Image} 
                    alt={post.Name}
                    className="blog-image"
                  />
                  <div className="blog-overlay">
                    <div className="blog-overlay-content">
                      <i className="fas fa-long-arrow-alt-right"></i>
                      <button aria-label="Read more about this blog post" onClick={()=>{nav(`/Blog/${post.slug}`,{state:{id:post.id}})}}  className="blog-read-more-link"></button>
                    </div>
                  </div>
                </div>
                {/* to={`/Blog/${post.id}`} */}
                <div className="blog-content">
                  <header className="blog-header-content">
                    <h3 className="blog-post-title">
                      <button aria-label="Read more about this blog post" onClick={()=>{nav(`/Blog/${post.slug}`,{state:{id:post.id}})}} className="blog-post-link">
                        {post.Name}
                      </button>
                    </h3>
                  </header>
                  
                  <div className="blog-meta">
                    <span className="blog-date">
                      <time dateTime={post.date}>{post.date}</time>
                    </span>
                  </div>
                  
                  <div className="blog-excerpt">
                    <p>{post.Intro}</p>
                    <button  aria-label="Read more about this blog post" onClick={()=>{nav(`/Blog/${post.slug}`,{state:{id:post.id}})}} className="blog-explore-btn">
                      Explore Blog
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* <div className="blog-load-more">
          <button className="load-more-btn">
            <span className="btn-loader"></span>
            <span className="load-more-text">Load More</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Blog;