// import React, { useEffect, useRef, useState } from 'react';
// import styles from './partners.module.css';

// const Partners = () => {
//   const [animatedIndices, setAnimatedIndices] = useState([]);
//   const imageRefs = useRef([]);
//   const [arr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,11, 12, 13, 14, 15,11, 12, 13]);

//   useEffect(() => {
//     const observers = [];

//     imageRefs.current.forEach((ref, index) => {
//       if (!ref) return;

//       const observer = new IntersectionObserver(
//         ([entry]) => {
//           if (entry.isIntersecting && !animatedIndices.includes(index)) {
//             setAnimatedIndices(prev => [...prev, index]);
            
//             // Remove the animation class after it completes
//             setTimeout(() => {
//               if (ref) {
//                 ref.classList.remove(styles.animateHighlight);
//               }
//             }, 1000);
//           }
//         },
//         { threshold: 0.5 }
//       );

//       observer.observe(ref);
//       observers.push(observer);
//     });

//     return () => {
//       observers.forEach((observer, index) => {
//         if (imageRefs.current[index]) {
//           observer.unobserve(imageRefs.current[index]);
//         }
//       });
//     };
//   }, [animatedIndices]);

//   return (
//     <div className={styles.class0}>
//       <div className={styles.class1}>Our Partners</div>
//       <div className={`${styles.wrapper} flex items-center justify-center flex-wrap gap-6 px-20`}>
//         {arr.map((ele, index) => (
//           <div key={index} className={styles.class4}>
//             <img
//               ref={el => imageRefs.current[index] = el}
//               src={`/partner${index+1}.webp`}
//               className={`${styles.class2} ${animatedIndices.includes(index) ? styles.animateHighlight : ''}`}
//               alt="Partner logo"
//             />
//             <div className={styles.class3}></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Partners;


import React, { useEffect, useRef, useState } from 'react';
import styles from './partners.module.css';
const APIPath = import.meta.env.VITE_BACKEND_PATH;
import axios from 'axios'
const Partners = () => {
  const [animatedIndices, setAnimatedIndices] = useState(new Set());
  const imageRefs = useRef([]);
  
  // Reduced array size - remove duplicates to avoid loading same images multiple times
    // const [arr,setarr] = useState([1,2,3,4,5,6,7]);
    const [arr,setarr] = useState([]);
    useEffect(()=>{
const call=async()=>{
  try {
    const res=await axios.get(`${APIPath}/items`)
    if(res.status===200){
      console.log(res.data)
  setarr(res.data)
    }
    
  } catch (error) {
    console.error(error)
  }
}
call()
    },[])

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           const index = imageRefs.current.indexOf(entry.target);
  //           if (index !== -1 && !animatedIndices.has(index)) {
  //             setAnimatedIndices(prev => new Set(prev).add(index));
  //           }
  //         }
  //       });
  //     },
  //     { threshold: 0.3 } // Reduced threshold for better performance
  //   );

  //   imageRefs.current.forEach((ref) => {
  //     if (ref) observer.observe(ref);
  //   });

  //   return () => observer.disconnect();
  // }, [animatedIndices]);

  useEffect(() => {
  if (arr.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = imageRefs.current.indexOf(entry.target);
        if (index !== -1) {
          setAnimatedIndices(prev => new Set(prev).add(index));
        }
      }
    });
  });

  imageRefs.current.forEach((ref) => ref && observer.observe(ref));

  return () => observer.disconnect();
}, [arr]);

  return (
    <div className="w-full flex flex-col bg-[#f0f0f0] items-center py-5 sm:py-3 md:py-8">
      {/* Heading */}
      <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#02236e] text-center mb-8 sm:mb-6">
        Our Partners
      </h2>

      {/* Grid of Partners */}
      <div className="max-w-[1240px] px-4 sm:px-10 md:px-10 lg:px-0 flex flex-wrap justify-center items-center gap-2 sm:gap-2 md:gap-2">
        {arr.map((ele, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            className={`${styles.class2} group relative flex items-center justify-center transition-transform duration-300 hover:scale-105 overflow-hidden  lg:w-57 lg:h-57 bg-white rounded-[25px]`}
          >
            {/* Image with fade-in animation on view */}
            <img
              // src={`/partner${index + 1}.webp`}
              src={ele.introductory_image_path}
              alt={`Partner ${index + 1} logo`}
              className={` ${styles.class3} rounded-[20px]  lg:w-[390.5px] lg:h-[170px]  transition-all duration-300 ${
                animatedIndices.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              }}
              loading="lazy"
            />
            {/* Animated underline on hover
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#02236e] to-[#0066cc] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;

