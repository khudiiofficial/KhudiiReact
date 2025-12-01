import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Crousel.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const APIPath = import.meta.env.VITE_BACKEND_PATH;
// import img from '../../../public/'
const Crousel = () => {
        const [hero,sethero]=useState([
            {image_path:'/1-taryaq-flood-2025-monthly-theme-khudii.webp'},
            {image_path:'/2-taryaq-flood-2025-monthly-theme-khudii.webp'},
            { image_path:'/3-taryaq-flood-2025-monthly-theme-khudii.webp'},
            {image_path:'/6-taryaq-flood-2025-monthly-theme-khudii.webp'},
            { image_path:'/7-taryaq-flood-2025-monthly-theme-khudii.webp'},
            { image_path:'/8-taryaq-flood-2025-monthly-theme-khudii.webp'},
            
        ])
    const nav=useNavigate()
    useEffect(()=>{
     const func=async()=>{
        try {
            const res=await axios.get(`${APIPath}/getCrouselimages`)
            if(res.status===200){
                sethero(res.data.data.reverse())
            
            }
        } catch (error) {
            console.log(error)
        }
     }
func()
    },[])
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        const t = setInterval(() => setIndex(i => (i + 1) % hero.length), 6000);
        return () => clearInterval(t);
    }, [hero.length]);

    return (
        <>
            <section className={`${styles.homePage} ${styles.carouselSection}`}>
                <div className={styles.carouselContainer}>
                    {hero.map((src, i) => (
                       <img onClick={()=>{nav(`/organization/${src.description}`)}}
  key={i}
  src={src.image_path}
  alt={`Slide ${i}`}
  className={`${styles.slide} ${i === index ? styles.slideActive : styles.slideInactive}`}
  fetchPriority="high"
  decoding="async"
/>
                    ))}
                    <div className={styles.overlay}></div>
                </div>
                <div id='star' className={styles.controls}>
                    {hero.map((_, i) => (
                        <button  
                            key={i} 
                            onClick={() => setIndex(i)} 
                            className={`${styles.indicator} ${i === index ? styles.indicatorActive : styles.indicatorInactive}`}
                        ></button>
                    ))}
                </div>
            </section>
        </>
    )
    // 2nd Code
//     return (
//   <>
//     <section className={`${styles.homePage} ${styles.carouselSection}`}>
//       <div className={styles.carouselContainer}>
//         {hero.map((item, i) => (
//           <div 
//             key={i} 
//             className={`${styles.slide} ${i === index ? styles.slideActive : styles.slideInactive}`}
//             aria-hidden={i !== index}
//           >
//             <img
//               src={item.image_path}
//               alt={`Slide ${i + 1}`}
//               className={styles.slideImage}
//               loading="eager"
//               fetchPriority="high"
//               decoding="async"
//             />
//           </div>
//         ))}
//         <div className={styles.overlay}></div>
//       </div>

//       <div id="star" className={styles.controls} aria-label="Carousel navigation">
//         {hero.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setIndex(i)}
//             className={`${styles.indicator} ${
//               i === index ? styles.indicatorActive : styles.indicatorInactive
//             }`}
//             aria-label={`Go to slide ${i + 1}`}
//             aria-current={i === index ? "true" : "false"}
//           />
//         ))}
//       </div>
//     </section>
//   </>
// );
}

export default Crousel;
