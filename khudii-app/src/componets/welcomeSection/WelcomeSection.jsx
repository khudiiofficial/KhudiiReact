// import React from 'react'
// import styles from './welcome.module.css'
// const WelcomeSection = () => {
//   return (
//     <>
// <br />

// <div className={`${styles.pad} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6`}>
//   <div className={` ${styles.newclass} min-h-[270px] max-h-[1000px]`}> 
//     <h1 className={`${styles.size}`}>Welcome To Khudii</h1> 

//     Not the kind of dream that we see when asleep though. A dream that doesn’t discriminate between color, caste, creed, nationality, status or any other identity marker. This all-encompassing vision of service to mankind is what Islam also preaches and stands for. It has been stated in the Quran:
// “Indeed, We created you from a male and a female, and made you into peoples and tribes so that you may ˹get to˺ know one another. Surely the most noble of you in the sight of Allah is the most righteous among you. Allah is truly All-Knowing, All-Aware.” (Surah Al-Hujraat :13)

//     </div>



//   <div className={`flex items-center justify-center`}>

//        <iframe
//        className={`${styles.gborder}`}
//         width="560"
//         height="315"
//         src="https://www.youtube.com/embed/hZyp2wOkqBs"
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//   </div>
//   {/* <div className={`flex items-center justify-center`}><img  src="/maxresdefault.jpg" className={`${styles.class2} h-60 `} alt="" /></div> */}
// </div>
// <br /><br />
//     </>
//   )
// }

// export default WelcomeSection

import React, { useState } from 'react'
import styles from './welcome.module.css'

const WelcomeSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handlePlayVideo = () => {
    setVideoLoaded(true);
  };

  return (
    <>
      
      <div className={styles.parent}>
      <div className={`${styles.pad} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6`}>
        <div className={`${styles.newclass} min-h-[270px] max-h-[1000px]`}> 
          <h1 className={`${styles.size}`}>Welcome To Khudii</h1> 
          Not the kind of dream that we see when asleep though. A dream that doesn't discriminate between color, caste, creed, nationality, status or any other identity marker. This all-encompassing vision of service to mankind is what Islam also preaches and stands for. It has been stated in the Quran:
          "Indeed, We created you from a male and a female, and made you into peoples and tribes so that you may ˹get to˺ know one another. Surely the most noble of you in the sight of Allah is the most righteous among you. Allah is truly All-Knowing, All-Aware." (Surah Al-Hujraat :13)
        </div>

        <div className={`flex items-center justify-center`}>
          {!videoLoaded ? (
            <div 
              className={`${styles.gborder} ${styles.videoPlaceholder}`}
              onClick={handlePlayVideo}
            >
              <div className={styles.playButtonContainer}>
               <center>
                <div className={styles.playButton}>
                  <svg width="80" height="80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="red" opacity="0.9"/>
                    <polygon points="40,30 40,70 70,50" fill="white"/>
                  </svg>
                </div>
                </center>
                <div className={styles.playText}>
                  Click to play video
                </div>
              </div>
            </div>
          ) : (
            <iframe
              className={`${styles.gborder}`}
              width="560"
              height="315"
              src="https://www.youtube.com/embed/hZyp2wOkqBs?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          )}
        </div>
      </div>
      </div>
      
    </>
  )
}

export default WelcomeSection