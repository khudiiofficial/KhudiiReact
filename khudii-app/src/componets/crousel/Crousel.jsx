// import React from 'react'
// import { useState, useEffect,useRef } from 'react'
// import styles from './Crousel.module.css'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// const APIPath = import.meta.env.VITE_BACKEND_PATH;
// // import img from '../../../public/'
// const Crousel = () => {
//         const [hero,sethero]=useState([
//             {image_path:'/1-taryaq-flood-2025-monthly-theme-khudii.webp'},
//             {image_path:'/2-taryaq-flood-2025-monthly-theme-khudii.webp'},
//             { image_path:'/3-taryaq-flood-2025-monthly-theme-khudii.webp'},
//             {image_path:'/6-taryaq-flood-2025-monthly-theme-khudii.webp'},
//             { image_path:'/7-taryaq-flood-2025-monthly-theme-khudii.webp'},
//             { image_path:'/8-taryaq-flood-2025-monthly-theme-khudii.webp'},
            
//         ])
//     const nav=useNavigate()

// const heroRef = useRef(hero);
// const [temp,settemp]=useState([])
// useEffect(() => {
//   heroRef.current = temp; // keep ref updated
// }, [temp]);

//     useEffect(()=>{
//      const func=async()=>{
//         try {
//             const res=await axios.get(`${APIPath}/getCrouselimages`)
//             if(res.status===200){
//                settemp(res.data.data)
//                 if(window.innerWidth<600){
    
// const arr=res.data.data.filter((ele,index)=>{
//     return ele.isMobile===1
// })   

// sethero([...arr])
// }
// else{
//     const arr=res.data.data.filter((ele,index)=>{
//     return ele.isMobile===0
// })
// sethero([...arr])   
// }
//             }
//         } catch (error) {
//             console.log(error)
//         }
//      }
// func()
//     },[])

// ///////////////////
//   useEffect(() => {
//     const handleResize = () => {
       
//                   if(window.innerWidth<600){
    
// const arr=heroRef.current.filter((ele,index)=>{
//     return ele.isMobile===1
// })   
// // console.log(arr) 
// sethero([...arr])
// }
// else{
//     const arr=heroRef.current.filter((ele,index)=>{
//     return ele.isMobile===0
// })
// sethero([...arr])   
// }
      
   
//     };
// // handleResize()
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);


// ///////////////////

//     const [index, setIndex] = useState(0);
    
//     useEffect(() => {
//         const t = setInterval(() => setIndex(i => (i + 1) % hero.length), 6000);
//         return () => clearInterval(t);
//     }, [hero.length]);

//     return (
//         <>
//             <section aria-roledescription="carousel" aria-label="Homepage banners" className={`${styles.homePage} ${styles.carouselSection}`}>
//                 <div className={styles.carouselContainer}>
//                     {hero.map((src, i) => (
// //                        <img onClick={()=>{nav(`/${src.description}`)}}
// //   key={i}
// //   src={src.image_path}
// //   alt={`Slide ${i}`}
// //   className={`${styles.slide} ${i === index ? styles.slideActive : styles.slideInactive}`}
// //   fetchPriority="high"
// //   decoding="async"
// // />
// <button
//   onClick={() => nav(`/${src.description}`)}
//   className={styles.imageButton}
//   aria-label={`Open ${src.description}`}
// >
//   <img
//     src={src.image_path}
//     alt={src.description || `Slide ${i + 1}`}
//     className={`${styles.slide} ${i === index ? styles.slideActive : styles.slideInactive}`}
//     fetchPriority="high"
//     decoding="async"
//   />
// </button>
//                     ))}
//                     <div className={styles.overlay}></div>
//                 </div>
//                 <div id='star' className={styles.controls}>
//                     {hero.map((_, i) => (
//                     <button  
//   key={i} 
//   onClick={() => setIndex(i)} 
//   className={`${styles.indicator} ${i === index ? styles.indicatorActive : styles.indicatorInactive}`}
//   aria-label={`Go to slide ${i + 1}`}
// aria-current={i === index}
// ></button>
//                     ))}
//                 </div>
//             </section>
//         </>
//     )
//     // 2nd Code
// //     return (
// //   <>
// //     <section className={`${styles.homePage} ${styles.carouselSection}`}>
// //       <div className={styles.carouselContainer}>
// //         {hero.map((item, i) => (
// //           <div 
// //             key={i} 
// //             className={`${styles.slide} ${i === index ? styles.slideActive : styles.slideInactive}`}
// //             aria-hidden={i !== index}
// //           >
// //             <img
// //               src={item.image_path}
// //               alt={`Slide ${i + 1}`}
// //               className={styles.slideImage}
// //               loading="eager"
// //               fetchPriority="high"
// //               decoding="async"
// //             />
// //           </div>
// //         ))}
// //         <div className={styles.overlay}></div>
// //       </div>

// //       <div id="star" className={styles.controls} aria-label="Carousel navigation">
// //         {hero.map((_, i) => (
// //           <button
// //             key={i}
// //             onClick={() => setIndex(i)}
// //             className={`${styles.indicator} ${
// //               i === index ? styles.indicatorActive : styles.indicatorInactive
// //             }`}
// //             aria-label={`Go to slide ${i + 1}`}
// //             aria-current={i === index ? "true" : "false"}
// //           />
// //         ))}
// //       </div>
// //     </section>
// //   </>
// // );
// }

// export default Crousel;



import React from 'react'
import { useState, useEffect, useRef } from 'react'
import styles from './Crousel.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const APIPath = import.meta.env.VITE_BACKEND_PATH;

const Crousel = () => {
    const [hero, sethero] = useState([
        { image_path: '/1-taryaq-flood-2025-monthly-theme-khudii.webp' },
        { image_path: '/2-taryaq-flood-2025-monthly-theme-khudii.webp' },
        { image_path: '/3-taryaq-flood-2025-monthly-theme-khudii.webp' },
        { image_path: '/6-taryaq-flood-2025-monthly-theme-khudii.webp' },
        { image_path: '/7-taryaq-flood-2025-monthly-theme-khudii.webp' },
        { image_path: '/8-taryaq-flood-2025-monthly-theme-khudii.webp' },
    ])
    const nav = useNavigate()
    const heroRef = useRef(hero);
    const [temp, settemp] = useState([])
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        heroRef.current = temp;
    }, [temp]);

    useEffect(() => {
        const func = async () => {
            try {
                const res = await axios.get(`${APIPath}/getCrouselimages`)
                if (res.status === 200) {
                    settemp(res.data.data)
                    const isMobileView = window.innerWidth < 600;
                    const filtered = res.data.data.filter((ele) =>
                        isMobileView ? ele.isMobile === 1 : ele.isMobile === 0
                    )
                    sethero([...filtered])
                }
            } catch (error) {
                console.log(error)
            }
        }
        func()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth < 600;
            setIsMobile(isMobileView);
            const filtered = heroRef.current.filter((ele) =>
                isMobileView ? ele.isMobile === 1 : ele.isMobile === 0
            )
            sethero([...filtered])
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (hero.length === 0) return;
        const t = setInterval(() => setIndex(i => (i + 1) % hero.length), 6000);
        return () => clearInterval(t);
    }, [hero.length]);

    // Preload first image for LCP optimization
    useEffect(() => {
        if (hero.length > 0 && hero[0]?.image_path) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = hero[0].image_path;
            link.fetchPriority = 'high';
            document.head.appendChild(link);
            
            return () => {
                if (document.head.contains(link)) {
                    document.head.removeChild(link);
                }
            };
        }
    }, [hero]);

    return (
        <>
            <section aria-roledescription="carousel" aria-label="Homepage banners" className={`${styles.homePage} ${styles.carouselSection}`}>
                <div className={styles.carouselContainer}>
                    {hero.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => nav(`/${src.description}`)}
                            className={styles.imageButton}
                            aria-label={`Open ${src.description || `slide ${i + 1}`}`}
                        >
                            <img
                                src={src.image_path}
                                alt={src.description || `Slide ${i + 1}`}
                                className={`${styles.slide} ${i === index ? styles.slideActive : styles.slideInactive}`}
                                fetchPriority={i === 0 ? "high" : "low"}
                                decoding={i === 0 ? "sync" : "async"}
                                loading={i === 0 ? "eager" : "lazy"}
                            />
                        </button>
                    ))}
                    <div className={styles.overlay}></div>
                </div>
                <div id='star' className={styles.controls}>
                    {hero.map((_, i) => (
                        <button  
                            key={i} 
                            onClick={() => setIndex(i)} 
                            className={`${styles.indicator} ${i === index ? styles.indicatorActive : styles.indicatorInactive}`}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={i === index}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Crousel;