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

const Partners = () => {
  const [animatedIndices, setAnimatedIndices] = useState(new Set());
  const imageRefs = useRef([]);
  
  // Reduced array size - remove duplicates to avoid loading same images multiple times
    const [arr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,11, 12, 13, 14, 15,11, 12, 13]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target);
            if (index !== -1 && !animatedIndices.has(index)) {
              setAnimatedIndices(prev => new Set(prev).add(index));
            }
          }
        });
      },
      { threshold: 0.3 } // Reduced threshold for better performance
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [animatedIndices]);

  return (
    <div className={styles.class0}>
      <div className={styles.class1}>Our Partners</div>
      <div className={`${styles.wrapper} flex items-center justify-center flex-wrap gap-4 sm:gap-6 px-4 sm:px-20`}>
        {arr.map((ele, index) => (
          <div key={index} className={styles.class4}>
            <img
              ref={el => imageRefs.current[index] = el}
              src={`/partner${index+1}.webp`} // Use ele instead of index+1 to avoid duplicates
              className={`${styles.class2} ${animatedIndices.has(index) ? styles.animateHighlight : ''}`}
              alt={`Partner ${index+1} logo`}
              loading="lazy"
              width="225"
              height="225"
            />
            <div className={styles.class3}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
