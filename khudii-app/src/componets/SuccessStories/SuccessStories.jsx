

import React from 'react'
import styles from './Success.module.css'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
const APIPath = import.meta.env.VITE_BACKEND_PATH;
import axios from 'axios';
const SuccessStories = () => {
const [arr,setarr]=useState([
])
const [width,setWidth]=useState(null)

useEffect(()=>{
const adjustwidth=()=>{
const getwidth=window.innerWidth;
setWidth(getwidth)
}
adjustwidth();
window.addEventListener('resize',adjustwidth)
return ()=> window.removeEventListener('resize',adjustwidth)
},[])
useEffect(()=>{
const func=async()=>{
try {
  const res=await axios.get(`${APIPath}/getsuccessstories`)
  if(res.status===200 && res.data.length>6){
    res.data=res.data.slice(0,6)
    setarr(res.data)
  }
} catch (error) {
  console.log(error)
}
}
func()
},[])
  return (
   <>
   <div className={`${styles.class3}`}>
   {/* <div className={`${styles.main} flex justify-between`}>
      <div className={`${styles.gw}`}></div>
    <div  className={`${styles.gw} ${styles.class1} ${styles.class2}`}>Success Stories</div>
    <div  className={`${styles.gw} ${styles.btn_story} ${styles.class1}`}><Link to={'/success-stories/'}>Explore More Stories&nbsp; <span> {`>`}</span></Link></div>
    </div> */}
    {/* 2nd Code */}
    <div className="max-w-[1240px] w-full mx-auto pt-6 sm:px-6 relative">
  <div className="flex items-center justify-between py-4">
    {/* Left: empty (or tiny spacer) */}
    <div className={`${styles.ssh_left} flex-shrink-0 invisible`}>
      <span className="inline-block font-semibold">
      Explore Organizations
    </span>
    </div>
    {/* Absolutely centered heading — always in visual center */}
  <div className="flex-1 text-center">
  <h2 
    className={`${styles.ssh_center} w-full text-2xl sm:text-3xl font-bold text-[#02236e] text-center block`}>
    Success Stories
  </h2>
  </div>
    {/* Right: link — visible from md (768px) */}
    <div className={`${styles.ssh_right} hidden`}>
      <Link 
        to="/success-stories/" 
        className="inline-flex items-center font-medium transition-colors group"
      >
        Explore More Stories&nbsp;
        <svg
        className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      </Link>
    </div>
  </div>
</div>



    {/* <div className={`${styles.class4}`}>
     {arr.map((ele,index)=>{

    return (

       <Link to={"/success-stories"}>
      <img 
      className={styles.img}
          key={index} 
          src={`https://img.youtube.com/vi/${ele.youtube_id}/maxresdefault.jpg`} 
          title='khudii 13' 
          alt={`Success story ${index + 1}`}
          loading="lazy"
          width="380"
          height="200"
        />
        </Link> 
    )
})}
    </div> */}
    {/* 2nd code */}
    <div className="max-w-[1240px] w-full mx-auto pt-6 pb-6 px-4 sm:px-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {arr.map((ele, index) => (
      <Link 
        key={index} 
        to="/success-stories" 
        className="block group"
      >
        <div className="relative pb-[55.63%]"> {/* 380:200 = 19:10 ≈ 52.63% padding-bottom */}
          <img
            src={`https://img.youtube.com/vi/${ele.youtube_id}/maxresdefault.jpg`}
            alt={`Success story ${index + 1}`}
            title="Success Story"
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            width="380"
            height="200"
          />
        </div>
      </Link>
    ))}
  </div>
</div>

    <div className={`${styles.class5}`}>
      <div className={`${styles.class6} flex lg:items-center lg:justify-center`}>
      <div className={styles.sample}>
        <div className={`${styles.newparent} flex flex-cols-1 sm:flex-cols-1 md:flex-cols-1 lg:flex-cols-2`}>
        {/* <div className={`${styles.class7}`}>
            <p>Floods in Pakistan</p>
            <p>At KHUDII, we are working tirelessly to support communities devastated by the recent floods in Pakistan. Thousands of families have lost their homes, livelihoods, and access to basic necessities. Your donation can help rebuild lives — by providing shelter, food, clean water, and long-term rehabilitation support. Together, we can restore hope and bring relief to those who need it most.</p>
           {width>1024 ?   
            <button className={styles.buttonClass}><Link to={'/donate-now/'}> Donate Now <i className="fa-solid fa-hands-praying"></i></Link></button>
        :<center> <button className={styles.buttonClass}><Link to={'/donate-now/'}> Donate Now <i className="fa-solid fa-hands-praying"></i></Link></button></center>
        }
        </div> */}
        {/* 2nd Code */}
        <div className="w-full px-[5%] items-center justify-center lg:px-0"> {/* Mobile: 90% width via 5% side padding */}
  <div className="max-w-[1240px] mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">
      {/* Content Column */}
      <div className="py-6 lg:py-8 flex-wrap">
        <h3 className={`${styles.title_flood} text-white lg:text-[32px] md:text-2xl font-bold mb-4 text-left lg:text-left flex-wrap text-wrap`}>
        Floods in Pakistan
        </h3>
        <p className={`${styles.desp_flood} text-white lg:text-[25px] leading-relaxed mb-6 text-left lg:text-left`}>
        At KHUDII, we are working tirelessly to support communities devastated by the recent floods in Pakistan. Thousands of families have lost their homes, livelihoods, and access to basic necessities. Your donation can help rebuild lives — by providing shelter, food, clean water, and long-term rehabilitation support. Together, we can restore hope and bring relief to those who need it most.
        </p>

        {/* Button: right-aligned on mobile/tablet, left-aligned on desktop */}
        <div className="text-right lg:text-left">
          <button className="bg-[#E3001C] rounded-[25px] text-white font-semibold py-3 px-6 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
            <Link to="/donate-now/" className="flex items-center gap-2">
              Donate Now
              <i className="fa-solid fa-hands-praying"></i>
            </Link>
          </button>
        </div>
      </div>

      {/* Blank Column — only on desktop (lg+) */}
      <div className="hidden lg:block"></div>
    </div>
  </div>
</div>
        {/* <div className={styles.class8}></div> */}
        </div>

</div>
       </div>
    </div>
   
    </div>
</>
  )
}

export default SuccessStories