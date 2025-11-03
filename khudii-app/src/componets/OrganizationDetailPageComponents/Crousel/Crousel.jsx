// src/components/Crousel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./Crousel.module.css";
import Socials from "../GeneralInfo/GeneralInfo";
import Services from "../Services/Services";
import { useLocation } from "react-router-dom";
const APIPath = import.meta.env.VITE_BACKEND_PATH;
const Crousel = () => {
 const [id,setid]=useState(null)
  const {slug}=useParams()
  const [org, setOrg] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${APIPath}/item/${slug}`);
        setOrg(res.data);
        setid(res.data.id)
      } catch (err) {
        console.error("Error fetching org:", err);
      }
    })();
  }, [id]);


  // Autoplay
  useEffect(() => {
    if (!org?.images || org.images.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % org.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [org]);

  if (!org){ return ( <div className="flex items-center justify-center h-40 ">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>)}

  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + org.images.length) % org.images.length);
  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % org.images.length);

  return (
    <div className={styles["org-container"]}>
      <h2>{org.name}</h2>

      {/* Slider */}
      {org.images && org.images.length > 0 && (
        <div className={styles["slider-container"]}>
          {/* Main slider */}
          <div className={styles["main-slider"]}>
            <img
              src={org.images[activeIndex]}
              alt={`slide-${activeIndex}`}
              className={styles["fade-in"]}
            />
            <button
              className={`${styles.arrow} ${styles.left}`}
              onClick={goPrev}
            >
              ‹
            </button>
            <button
              className={`${styles.arrow} ${styles.right}`}
              onClick={goNext}
            >
              ›
            </button>
          </div>

          {/* Thumbnails */}
          <div className={styles["thumbnail-slider"]}>
            {org.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`thumb-${i}`}
                className={`${styles.thumb} ${
                  i === activeIndex ? styles.active : ""
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      )}
<br />
      {/* Org Info */}
      <div className={styles["org-details"]}>
        <div className={`${styles["org-description"]} ${styles.customCss}`}>
          <div className={`${styles.arrange}`}  lang="en"  dangerouslySetInnerHTML={{ __html: org.description }} />
        </div>

        <Socials itemId={id}  />
      </div>
       <Services id={id} />
     
    </div>
  );
};

export default Crousel;
