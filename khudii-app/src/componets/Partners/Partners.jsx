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
      // console.log(res.data)
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
    <div className="w-full flex flex-col bg-[#f0f0f0] items-center">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#02236e] p-4 md:p-8 lg:p-10">
        Our Partners
      </h2>

      {/* Grid of Partners */}
      {/* 2nd code */}
      <div>
      <div className="max-w-[1240px] mx-auto px-4 flex flex-wrap justify-center items-center gap-2 sm:gap-2 md:gap-4 pb-8">
        {arr.map((ele, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            className={`${styles.partner_mob} flex flex-wrap items-center justify-center transition-transform duration-300 hover:scale-105 overflow-hidden sm:w-[calc(40%-4px)] lg:w-[225px] lg:h-[225px] bg-white rounded-[20px]`}
          >
            {/* Image with fade-in animation on view */}
            <img
              src={ele.introductory_image_path}
              alt={`Partner ${index + 1} logo`}
              className={`w-full h-full object-contain transition-all duration-300 p-0 ${
                animatedIndices.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Partners;

