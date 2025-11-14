import React, { useState, useEffect } from 'react'
import styles from './Topbar.module.css'
import { Link } from 'react-router-dom'
import SplitText from '../Paragraph/Title'
import { pre } from 'framer-motion/client'
import axios from 'axios'
const APIPath = import.meta.env.VITE_BACKEND_PATH;
const Topbar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [texts,settexts]=useState([])
const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
const [idx,setidx]=useState(0)


  useEffect(()=>{
const fun=async ()=>{
  try {
    const res=await axios.get(`${APIPath}/api/topbar`,{withCredentials:true})
    if(res.status===200){
      let arr=res.data.map((ele,i)=>{
        return ele.text
      })
     
     settexts(arr)
    }
    
  } catch (error) {
    
  }
}
fun()
  },[])
  useEffect(()=>{
    if(texts.length===0){return}
const fun=setInterval(()=>{
  
if (idx===texts.length-1){
  setidx(0)
}
else{
  setidx((pre)=>pre+1)
}

},7000)

return ()=>clearInterval(fun)
  },[idx,texts.length])
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 600)
    }
    
    // Check initially
    checkScreenSize()
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div className={`${styles.topbar} ${styles.color}`}>
      <p className={styles.contact}>
        <a href="tel:+923198548344" target="_blank">📞 (+92) 3198 - KHUDII (548344)</a>
      </p>

      {/* <p className={styles.mid}>
        Pakistan's 1st E-Community of Human Purpose!
      </p> */}
      { texts.length!==0?
<SplitText
key={idx}
  text={`${texts[idx]}`}
  className={styles.mid}
  delay={20}
  duration={0.5}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}/>
  :
  <p className={styles.mid}>
        Pakistan's 1st E-Community of Human Purpose!
      </p> 
 
}
      <p className={styles.buttonWrapper}>
        <Link to="/contribute-your-story/">
          <button className={styles.last}>Contribute Your Story</button>
        </Link>
        {isMobile && (
          <Link to="/donate-now/">
            <button className={styles.last}>Donate Now</button>
          </Link>
        )}
      </p>
    </div>
  )
}

export default Topbar