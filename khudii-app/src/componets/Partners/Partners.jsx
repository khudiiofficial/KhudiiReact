
import React, { useEffect, useRef, useState } from 'react';
import styles from './partners.module.css';
const APIPath = import.meta.env.VITE_BACKEND_PATH;
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Partners = () => {
  const [animatedIndices, setAnimatedIndices] = useState(new Set());
  const imageRefs = useRef([]);
  const nav=useNavigate()
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
          <div onClick={()=>{nav(`/${ele.slug}`)}}
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            className={`${styles.partner_mob} cursor-pointer flex flex-wrap items-center justify-center transition-transform duration-300 hover:scale-105 overflow-hidden sm:w-[calc(40%-4px)] lg:w-[225px] lg:h-[225px] bg-white rounded-[20px]`}
          >
            {/* Image with fade-in animation on view */}
            <img
              src={ele.partner_image}
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

// import React, { useEffect, useRef, useState } from 'react';
// import styles from './partners.module.css';
// const APIPath = import.meta.env.VITE_BACKEND_PATH;
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Partners = () => {
//   const [animatedIndices, setAnimatedIndices] = useState(new Set());
//   const [imageDimensions, setImageDimensions] = useState({});
//   const imageRefs = useRef([]);
//   const imgElementsRef = useRef([]);
//   const nav = useNavigate();
//   const [arr, setArr] = useState([]);

//   // Function to check if image is square
//   const isSquareImage = (width, height) => {
//     if (!width || !height) return false;
//     const ratio = width / height;
//     // Consider square if ratio is between 0.9 and 1.1 (allow small tolerance)
//     return ratio >= 0.9 && ratio <= 1.1;
//   };

//   // Handle image load to get dimensions
//   const handleImageLoad = (index, e) => {
//     const img = e.target;
//     const { naturalWidth, naturalHeight } = img;
//     console.log(naturalWidth,naturalHeight)
//     setImageDimensions(prev => ({
//       ...prev,
//       [index]: { width: naturalWidth, height: naturalHeight }
//     }));
//   };

//   // Handle image error
//   // const handleImageError = (index) => {
//   //   // Set default dimensions or use fallback
//   //   setImageDimensions(prev => ({
//   //     ...prev,
//   //     [index]: { width: 200, height: 200 } // Default square
//   //   }));
//   // };

//   useEffect(() => {
//     const call = async () => {
//       try {
//         const res = await axios.get(`${APIPath}/items`);
//         if (res.status === 200) {
//           setArr(res.data);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     call();
//   }, []);

//   useEffect(() => {
//     if (arr.length === 0) return;

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const index = imageRefs.current.indexOf(entry.target);
//           if (index !== -1) {
//             setAnimatedIndices(prev => new Set(prev).add(index));
//           }
//         }
//       });
//     }, {
//       threshold: 0.1,
//       rootMargin: '50px'
//     });

//     imageRefs.current.forEach((ref) => ref && observer.observe(ref));

//     return () => observer.disconnect();
//   }, [arr]);

//   return (
//     <div className="w-full flex flex-col bg-[#f0f0f0] items-center">
//       {/* Heading */}
//       <h2 className="text-2xl sm:text-3xl font-bold text-[#02236e] p-4 md:p-8 lg:p-10">
//         Our Partners
//       </h2>

//       {/* Grid of Partners */}
//       <div className="max-w-[1240px] mx-auto px-4 flex flex-wrap justify-center items-center gap-2 sm:gap-2 md:gap-4 pb-8">
//         {arr.map((ele, index) => {
//           const dimensions = imageDimensions[index];
//           const isSquare = dimensions ? isSquareImage(dimensions.width, dimensions.height) : false;
          
//           return (
//             <div
//               onClick={() => { nav(`/${ele.slug}`) }}
//               key={`${ele.id || ele.slug}-${index}`}
//               ref={(el) => (imageRefs.current[index] = el)}
//               className={`${styles.partner_mob} cursor-pointer flex flex-wrap items-center justify-center transition-transform duration-300 hover:scale-105 overflow-hidden sm:w-[calc(40%-4px)] lg:w-[225px] lg:h-[225px] bg-white rounded-[20px]`}
//             >
//               {/* Image with conditional object-fit */}
//               <img
//                 ref={(el) => (imgElementsRef.current[index] = el)}
//                 src={ele.introductory_image_path}
//                 alt={`${ele.name || 'Partner'} logo`}
//                 className={`w-full h-full transition-all duration-300 p-0 ${
//                   animatedIndices.has(index)
//                     ? 'opacity-100 translate-y-0'
//                     : 'opacity-0 translate-y-5'
//                 } ${isSquare ? 'object-cover' : 'object-contain'}`}
//                 style={{
//                   transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
//                 }}
//                 loading="lazy"
//                 onLoad={(e) => handleImageLoad(index, e)}
//                 // onError={() => handleImageError(index)}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Partners;