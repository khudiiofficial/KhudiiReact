

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
  
}
}
func()
},[])
  return (
   <>
   <div className={`${styles.class3}`}>
   <div className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3`}>
    <div></div>
    <div  className={`${styles.class1} ${styles.class2}`}>Success Stories</div>
    <div  className={`${styles.class1}`}><Link to={'/success-stories/'}>Explore more stories&nbsp; <span> {`>`}</span></Link></div>
    </div>

    <div className={`${styles.class4}`}>
     {arr.map((ele,index)=>{

    return (
        <img 
          key={index} 
          src={`https://img.youtube.com/vi/${ele.youtube_id}/hqdefault.jpg`} 
          title='khudii 13' 
          alt={`Success story ${index + 1}`}
          loading="lazy"
          width="380"
          height="200"
        />
    )
})}
    </div>

    <div className={`${styles.class5}`}>
      <div className={`${styles.class6} grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2`}>
        <div className={`${styles.class7}`}>
            <p>Floods in Pakistan</p>
            <p>At KHUDII, we are working tirelessly to support communities devastated by the recent floods in Pakistan. Thousands of families have lost their homes, livelihoods, and access to basic necessities. Your donation can help rebuild lives — by providing shelter, food, clean water, and long-term rehabilitation support. Together, we can restore hope and bring relief to those who need it most.</p>
           {width>1024 ?   
            <button className={styles.buttonClass}><Link to={'/donate-now/'}> Donate Now <i className="fa-solid fa-hands-praying"></i></Link></button>
        :<center> <button className={styles.buttonClass}><Link to={'/donate-now/'}> Donate Now <i className="fa-solid fa-hands-praying"></i></Link></button></center>
        }
     
            </div>
        <div></div>
       </div>
    </div>
   
    </div>
</>
  )
}

export default SuccessStories