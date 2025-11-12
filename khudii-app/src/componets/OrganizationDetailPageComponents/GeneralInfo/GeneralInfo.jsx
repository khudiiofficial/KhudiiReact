// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./GeneralInfo.module.css";
// const APIPath = import.meta.env.VITE_BACKEND_PATH;
// const Socials = ({ itemId, setgooglemap }) => {
//   const [socials, setSocials] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(`${APIPath}/socials/${itemId}`);
//         setSocials(res.data);
//         // console.log(res.data);
//         // if(setgooglemap) setgooglemap(res.data.googlemap);
//       } catch (err) {
//         console.error("Error fetching socials:", err);
//       }
//     })();
//   }, [itemId]);

//   if (!socials) return '';

//   return (
//     <div className={styles.wrapper}>
//       <ul className={styles.list}>
//         {socials.phone && (
//           <li className={styles.item}>
//             <a href={`tel:${socials.phone}`} target="_blank" rel="noreferrer">
//             <i className="fas fa-mobile-alt"></i>
//               <span>{socials.phone}</span>
//             </a>
//           </li>
//         )}
//  {socials.Mobile_number && (
//           <li className={styles.item}>
//             <a href={`tel:${socials.Mobile_number}`} target="_blank" rel="noreferrer">
//               <i className="fas fa-phone-alt"></i>
//               <span>{socials.phone}</span>
//             </a>
//           </li>
//         )}
//         {socials.email && (
//           <li className={styles.item}>
//             <a href={`mailto:${socials.email}`} target="_blank" rel="noreferrer">
//               <i className="fas fa-envelope"></i>
//               <span>{socials.email}</span>
//             </a>
//           </li>
//         )}

//         {socials.location && (
//           <li className={styles.item}>
//             <a href={socials.location} target="_blank" rel="noreferrer">
//               <i className="fas fa-map-marker-alt"></i>
//               <span>Location</span>
//             </a>
//           </li>
//         )}

//         {socials.website && (
//           <li className={styles.item}>
//             <a href={socials.website} target="_blank" rel="noreferrer">
//               <i className="fas fa-globe"></i>
//               <span>{socials.website}</span>
//             </a>
//           </li>
//         )}

//         {socials.facebook && (
//           <li className={styles.item}>
//             <a href={socials.facebook} target="_blank" rel="noreferrer">
//               <i className="fab fa-facebook-square"></i>
//               <span>@KWF</span>
//             </a>
//           </li>
//         )}

//         {socials.instagram && (
//           <li className={styles.item}>
//             <a href={socials.instagram} target="_blank" rel="noreferrer">
//               <i className="fab fa-instagram"></i>
//               <span>@KWF</span>
//             </a>
//           </li>
//         )}

//         {socials.twitter && (
//           <li className={styles.item}>
//             <a href={socials.twitter} target="_blank" rel="noreferrer">
//               <i className="fab fa-twitter"></i>
//               <span>@KWF</span>
//             </a>
//           </li>
//         )}

//         {socials.linkedin && (
//           <li className={styles.item}>
//             <a href={socials.linkedin} target="_blank" rel="noreferrer">
//               <i className="fab fa-linkedin"></i>
//               <span>@KWF</span>
//             </a>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Socials;


import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./GeneralInfo.module.css";
import ContactModal from "../../Modale/Modale";
import { Pointer } from "lucide-react";
const APIPath = import.meta.env.VITE_BACKEND_PATH;
const Socials = ({ name,itemId, setgooglemap }) => {
  const [socials, setSocials] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 const [isModalOpen, setIsModalOpen] = useState(false);
 
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${APIPath}/socials/${itemId}`);
        setSocials(res.data);
      } catch (err) {
        console.error("Error fetching socials:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [itemId]);

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.loading}>
          <i className="fas fa-spinner fa-spin" style={{marginRight: '0.5rem'}}></i>
          Loading contact information...
        </div>
      </div>
    );
  }

  if (!socials) return '';

  // Format website URL for display
  const formatWebsite = (url) => {
    try {
      return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    } catch {
      return url;
    }
  };

  return (
    <>
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {socials.phone && (
          <li className={styles.item}>
            <a href={`tel:${socials.phone}`} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-mobile-alt"></i>
              <span>{socials.phone}</span>
            </a>
          </li>
        )}
        
        {socials.Mobile_number && (
          <li className={styles.item}>
            <a href={`tel:${socials.Mobile_number}`} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-phone-alt"></i>
              <span>{socials.Mobile_number}</span>
            </a>
          </li>
        )}
        
        {socials.email && (
          <li className={styles.item}>
            <a href={`mailto:${socials.email}`} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-envelope"></i>
              <span>{socials.email}</span>
            </a>
          </li>
        )}

        {socials.location && (
          <li className={styles.item}>
            <a href={socials.location} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-map-marker-alt"></i>
              <span>Get Directions</span>
            </a>
          </li>
        )}

        {socials.website && (
          <li className={styles.item}>
            <a href={socials.website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe"></i>
              <span>{formatWebsite(socials.website)}</span>
            </a>
          </li>
        )}

        {socials.facebook && (
          <li className={styles.item}>
            <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </a>
          </li>
        )}

        {socials.instagram && (
          <li className={styles.item}>
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </a>
          </li>
        )}

        {socials.twitter && (
          <li className={styles.item}>
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
              <span>Twitter</span>
            </a>
          </li>
        )}

        {socials.linkedin && (
          <li className={styles.item}>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
              <span>LinkedIn</span>
            </a>
          </li>
        )}

 
          <li className={`${styles.item}`}>
            <a target="_blank" className="bg-gradient-to-r from-[#E3001C] to-[#FF6B6B] hover:from-[#FF6B6B] hover:to-[#E3001C]" rel="noopener noreferrer">
              <p className="text-white">Call Khudii :</p>
              <span className="text-white">(+92) 3198 - KHUDII (548344)</span>
            </a>
          </li>
   <li  onClick={() => setIsModalOpen(true)} className={`${styles.item} `}>
            <a className="bg-gradient-to-r from-[#022279] to-[#3B82F6] hover:from-[#3B82F6] hover:to-[#022279]" target="_blank" rel="noopener noreferrer">
              {/* <p className="text-red-700"></p> */}
              <span className="text-white"><button >Know More About Organization?</button></span>
            </a>
          </li>

      </ul>
    </div>
    <ContactModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  OrgId={name}
/>
    </>
  );
};

export default Socials;