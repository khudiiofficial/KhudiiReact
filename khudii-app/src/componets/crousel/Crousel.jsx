import React from 'react'
import { useState, useEffect } from 'react'
import styles from './Crousel.module.css'
// import img from '../../../public/'
const Crousel = () => {
    const IMAGES = {
        hero: [
            '/1-taryaq-flood-2025-monthly-theme-khudii.webp',
            '/2-taryaq-flood-2025-monthly-theme-khudii.webp',
            '/3-taryaq-flood-2025-monthly-theme-khudii.webp',
            '/6-taryaq-flood-2025-monthly-theme-khudii.webp',
            '/7-taryaq-flood-2025-monthly-theme-khudii.webp',
            '/8-taryaq-flood-2025-monthly-theme-khudii.webp',
            
        ],
        sectorPlaceholder: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60',
        orgPlaceholder: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=60'
    };
    
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        const t = setInterval(() => setIndex(i => (i + 1) % IMAGES.hero.length), 6000);
        return () => clearInterval(t);
    }, [IMAGES.hero.length]);

    return (
        <>
            <section className={`${styles.homePage} ${styles.carouselSection}`}>
                <div className={styles.carouselContainer}>
                    {IMAGES.hero.map((src, i) => (
                       <img
  key={i}
  src={src}
  alt={`Slide ${i}`}
  className={`${styles.slide} ${i === index ? styles.slideActive : styles.slideInactive}`}
  fetchPriority="high"
  decoding="async"
/>
                    ))}
                    <div className={styles.overlay}></div>
                </div>
                <div id='star' className={styles.controls}>
                    {IMAGES.hero.map((_, i) => (
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
}

export default Crousel;
