// import React from 'react';
// import styles from './AboutUs.module.css';

// const AboutUs = () => {
//   const teamMembers = [
//     {
//       id: 1,
//       name: "Atif Zia",
//       position: "Director",
//       image: "/atif-zia-khudii-expert-team.webp",
//       description: "Khudii Welfare Organization\nKnown for his Energetic and Uplifting Motivational Speeches since 15 Years"
//     },
//     {
//       id: 2,
//       name: "Farrukh Obaid",
//       position: "Director",
//       image: "/farrukh-obaid-khudii-expert-team.webp",
//       description: "Khudii Welfare Organization\nC.E.O. Farrukh's Photography & Vlogs (FPVL) | 14+ Years Experience"
//     },
//     {
//       id: 3,
//       name: "Anjum Majeed",
//       position: "Admin Head",
//       image: "/anjum-majeed-khudii-expert-team.webp",
//       description: "Khudii Welfare Organization\nExpert in Translating and Delivering High-Quality Subtitles for Videos"
//     },
//     {
//       id: 4,
//       name: "Muhammad Zubair",
//       position: "Admin Head",
//       image: "/muahmmad-zubair-khudii-expert-team.webp",
//       description: "Khudii Welfare Organization\nEngaged in various Charity Organizations"
//     },
//     {
//       id: 5,
//       name: "Faisal Zafar",
//       position: "I.T Head",
//       image: "/faisal-zafar-khudii-expert-team.webp",
//       description: "Khudii Welfare Organization\nC.E.O Digital Konnecter Systems (DKS)"
//     },
//     {
//       id: 6,
//       name: "Usman Aziz",
//       position: "Social Media Dept.",
//       image: "/usman-aziz-khudii-expert-team.webp",
//       description: "Khudii Welfare Organization\nC.E.O YKOP Solutions (Media Agency)"
//     },
//     {
//       id: 7,
//       name: "Allah Rakha",
//       position: "I.T & Back Office Manager",
//       image: "/allah-rakha-khudii-expert-team.webp",
//       description: "Khudii Welfare Organization\nWith 8+ Years of experience, he oversee Technical Support and I.T System Operations"
//     }
//   ];

//   const bulletPoints = [
//     "Between donors who want to give and welfare organizations that desperately need resources.",
//     "Between volunteers searching for a cause and communities longing for their support.",
//     "Between professionals willing to lend their skills and organizations hungry for guidance."
//   ];

//   const joinUsPoints = [
//     "If you are a donor, Khudii helps your generosity travel safely into trusted hands.",
//     "If you are a volunteer, Khudii helps you find the cause that needs your time and skills.",
//     "If you are a welfare organization, Khudii gives you a voice, a stage, and a community that believes in you."
//   ];

//   return (
//     <div className={styles.aboutUs}>
//       {/* Hero Section */}
//       <section className={styles.hero}>
//         <div className={styles.container}>
//           <h1 className={styles.heroTitle}>Who We Are</h1>
//           <div className={styles.heroContent}>
//             <p className={styles.heroText}>
//               Khudii is not just an organization — <b>it is a dream turned into reality.</b> Born in Lahore in <b>2024</b>, 
//               Khudii is <b>Pakistan's first digital hub for welfare organizations.</b> It was created with one purpose: 
//               to ensure that every act of kindness finds a stage, and every welfare effort finds the support it deserves.
//             </p>
//             <p className={styles.heroText}>
//               Across Pakistan, thousands of welfare groups work tirelessly to bring hope — some provide food, 
//               others run schools, some build wells, and others bring healthcare to those who cannot afford it. 
//               Yet, many of these efforts remain invisible, hidden in the shadows. Donors do not always know where 
//               to give, and volunteers often do not know where to serve. Khudii steps in to <b>connect the dots.</b> 
//               We give these organizations a voice, a platform, and a chance to shine — so their impact can grow, 
//               and so no life in need is left behind.
//             </p>
//           </div>
//         </div>
//       </section>
// <hr style={{height:"10px" ,color:"black" ,backgroundColor:"rgb(0,0,0,0.5)"}} />
//       {/* Video Section */}
//       <section className={styles.videoSection}>
//         <div className={styles.container}>
//           <div className={styles.videoWrapper}>
//             <iframe
//               className={styles.video}
//               src="https://www.youtube.com/embed/Ez4zVQfc7Nk"
//               title="KHUDII || WELFARE ORGANIZATION || Connecting Donors and Recipients with Hope"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       </section>
// <hr style={{height:"10px" ,color:"black" ,backgroundColor:"rgb(0,0,0,0.5)"}} />
//       {/* Dream & Purpose Section */}
//       <section className={styles.dreamSection}>
//         <div className={styles.container}>
//           <h2 className={styles.sectionTitle}>Our Dream & Purpose</h2>
//           <div className={styles.dreamContent}>
//             <p className={styles.dreamText}>
//               At Khudii, we believe that <strong>every welfare organization carries a story</strong> — a story of 
//               sacrifice, struggle, and service. Too often, these stories remain untold. Khudii exists to tell them. 
//               We showcase the courage of those who heal, teach, feed, and uplift. We bring their journeys to the 
//               world so that the world can walk with them.
//             </p>
            
//             <div className={styles.purposeSection}>
//               <h3 className={styles.purposeTitle}>Our purpose is to build <b>bridges of compassion</b>:</h3>
//               <ul className={styles.bulletList}>
//                 {bulletPoints.map((point, index) => (
//                   <li key={index} className={styles.bulletItem}>
//                     <span className={styles.bulletIcon}>•</span>
//                     {point}
//                   </li>
//                 ))}
//               </ul>
//               <p className={styles.purposeConclusion}>
//                 Khudii is the thread that ties all these hearts and hands together. When giving meets need, 
//                 when skill meets service, when compassion meets action — that is where change begins.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
// <hr style={{height:"10px" ,color:"black" ,backgroundColor:"rgb(0,0,0,0.5)"}} />
//       {/* Impact Section */}
//       <section className={styles.impactSection}>
//         <div className={styles.container}>
//           <h2 className={styles.sectionTitle}>Our Impact</h2>
//           <div className={styles.impactContent}>
//             <p className={styles.impactText}>
//               In just a short time, Khudii has already become a <strong>home for more than 75 welfare organizations 
//               across 6 sectors</strong>: health, education, food, water, disability, and thalassemia. Each organization 
//               we promote carries its own light, and together, these lights form a constellation of hope stretching 
//               across Pakistan.
//             </p>
//             <p className={styles.impactText}>
//               Through our work, <strong>thousands of lives have been touched indirectly</strong> — families finding 
//               clean water, patients gaining access to healthcare, children entering classrooms, and communities 
//               rising with dignity.
//             </p>
//             <p className={styles.impactText}>
//               But this is only the beginning. Khudii is a movement that grows stronger every day. As more 
//               organizations join, as more donors connect, and as more volunteers step forward, the ripple of 
//               change widens. What began as one idea in one city is fast becoming a national network of 
//               generosity — and soon, an international one.
//             </p>
//           </div>
//         </div>
//       </section>
// <hr style={{height:"10px" ,color:"black" ,backgroundColor:"rgb(0,0,0,0.5)"}} />
//       {/* CEO Section */}
//       <section className={styles.ceoSection}>
//         <div className={styles.container}>
//           <div className={styles.ceoGrid}>
//             <div className={styles.ceoContent}>
//               <h2 className={styles.ceoName}>Amir Saeed Bhatti</h2>
//               <h4 className={styles.ceoTitle}>(C.E.O & Founder)</h4>
//               <div className={styles.ceoText}>
//                 <p>
//                   <b>Allah (Subhanahu Wa Ta'ala)</b> opened my heart to his love by enabling me to love his creation 
//                   and then blessed me even more by equipping me with tools to serve those who are around me. 
//                   This is what I consider the purpose of my life and this is the very core of my identity. 
//                   This empathy and self-realization were the very things that enabled me to become one of the 
//                   core founders and members of <b>Taryaq</b> Welfare Organization founded in <b>1992</b>.
//                 </p>
//                 <p>
//                   This beautiful journey of service and gratitude has brought us to yet another milestone which 
//                   we have titled as <b>"KHUDII"</b>. This project thus is not a novelty but is an offshoot of that 
//                   very empathy and passion to serve mankind which my <b>Allah (Subhanahu Wa Ta'ala)</b> has blessed 
//                   me with. The vision is the same, yet the only difference lies in the way the project has been 
//                   structured.
//                 </p>
//                 <p>
//                   A new responsibility awaits me. A new vision has taken hold of me. And I ardently believe that 
//                   this journey is going to be so beautiful and gratifying that the journey itself will end up 
//                   being the destination.
//                 </p>
//               </div>
//             </div>
//             <div className={styles.ceoImage}>
//               <img
//                 src="/amir-saeed-bhatti-khudii-expert-team.webp"
//                 alt="Amir Saeed Bhatti, CEO & Founder of Khudii Welfare Organization"
//                 className={styles.image}
//               />
//             </div>
//           </div>
//         </div>
//       </section>
// <hr style={{height:"10px" ,color:"black" ,backgroundColor:"rgb(0,0,0,0.5)"}} />
//       {/* Team Intro Section */}
//       <section className={styles.teamIntroSection}>
//         <div className={styles.container}>
//           <h2 className={styles.sectionTitle}>The People Behind Khudii</h2>
//           <div className={styles.teamIntroContent}>
//             <p className={styles.teamIntroText}>
//               Khudii is carried forward by a <strong>team of dreamers and doers</strong>. We are people who believe 
//               that kindness multiplies when it is shared, and that real change comes when connections are made.
//             </p>
//             <p className={styles.teamIntroText}>
//               Our team is united by one simple belief: that no act of good should go unseen, and no effort of 
//               service should go unsupported. Each of us brings passion, skills, and vision — but more than 
//               anything, we bring <strong>commitment to the cause of humanity</strong>.
//             </p>
//             <p className={styles.teamIntroText}>
//               Behind the screens, strategies, and stories are people who wake up every day with one goal: to 
//               build a hub where generosity finds its way, where volunteers discover their purpose, and where 
//               welfare organizations find strength to stand tall.
//             </p>
//           </div>
//         </div>
//       </section>
// <hr style={{height:"10px" ,color:"black" ,backgroundColor:"rgb(0,0,0,0.5)"}} />
//       {/* Expert Team Section */}
//       <section className={styles.teamSection}>
//         <div className={styles.container}>
//           <h2 className={styles.sectionTitle}>EXPERT TEAM</h2>
//           <div className={styles.teamGrid}>
//             {teamMembers.map((member) => (
//               <div key={member.id} className={styles.teamCard}>
//                 <div className={styles.teamImage}>
//                   <img
//                     src={member.image}
//                     alt={`${member.name}, ${member.position} at Khudii Welfare Organization`}
//                     className={styles.memberImage}
//                   />
//                 </div>
//                 <div className={styles.teamContent}>
//                   <h3 className={styles.memberName}>{member.name}</h3>
//                   <h4 className={styles.memberPosition}>{member.position}</h4>
//                   <p className={styles.memberDescription}>
//                     {member.description.split('\n').map((line, index) => (
//                       <span key={index}>
//                         {line}
//                         <br />
//                       </span>
//                     ))}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
// <hr style={{height:"10px" ,color:"black" ,backgroundColor:"rgb(0,0,0,0.5)"}} />
//       {/* Join Us Section */}
//       <section className={styles.joinSection}>
//         <div className={styles.container}>
//           <div className={styles.joinGrid}>
//             <div className={styles.joinContent}>
//               <h2 className={styles.joinTitle}>Join Us</h2>
//               <div className={styles.joinList}>
//                 <p className={styles.joinIntro}>
//                   Khudii is not just a platform — it is a <b>movement of connection, compassion, and change.</b> 
//                   And you are a part of it.
//                 </p>
//                 <ul className={styles.joinBulletList}>
//                   {joinUsPoints.map((point, index) => (
//                     <li key={index} className={styles.joinBulletItem}>
//                       <span className={styles.joinBulletIcon}>•</span>
//                       {point}
//                     </li>
//                   ))}
//                 </ul>
//                 <div className={styles.joinConclusion}>
//                   <p>
//                     Together, we can build a Pakistan where no act of kindness is lost, no community is forgotten, 
//                     and no life is left behind.
//                   </p>
//                   <p className={styles.joinFinal}>
//                     <b>Khudii — where compassion meets connection, and connection creates change.</b>
//                   </p>
//                 </div>
//               </div>
//             </div>
       
//             <div className={styles.joinVideo}>
//               <div className={styles.videoPlaceholder}>
//                 {/* <div 
//                   className={styles.videoThumbnail}
//                   style={{
//                     backgroundImage: `url(https://www.khudii.com/wp-content/uploads/2025/07/about-video-overlay.webp)`
//                   }}
//                 >
//                   <button className={styles.playButton}>
//                     <svg viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M8 5v14l11-7z"/>
//                     </svg>
//                   </button>
//                 </div> */}
//                <iframe
//   className={styles.videoThumbnail}
//   src="https://www.youtube.com/embed/Ez4zVQfc7Nk"
//   title="KHUDII || WELFARE ORGANIZATION || Connecting Donors and Recipients with Hope"
//   frameBorder="0"
//   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   allowFullScreen
// ></iframe>

//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutUs;

import React, { useEffect, useState } from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Atif Zia',
      position: 'Director',
      image: '/atif-zia-khudii-expert-team.webp',
      desc: 'Khudii Welfare Organization\nKnown for his Energetic and Uplifting Motivational Speeches since 15 Years',
    },
    {
      id: 2,
      name: 'Farrukh Obaid',
      position: 'Director',
      image: '/farrukh-obaid-khudii-expert-team.webp',
      desc: 'Khudii Welfare Organization\nC.E.O. Farrukh\'s Photography & Vlogs (FPVL) | 14+ Years Experience',
    },
    {
      id: 3,
      name: 'Anjum Majeed',
      position: 'Admin Head',
      image: '/anjum-majeed-khudii-expert-team.webp',
      desc: 'Khudii Welfare Organization\nExpert in Translating and Delivering High-Quality Subtitles for Videos',
    },
    {
      id: 4,
      name: 'Muhammad Zubair',
      position: 'Admin Head',
      image: '/muahmmad-zubair-khudii-expert-team.webp',
      desc: 'Khudii Welfare Organization\nEngaged in various Charity Organizations',
    },
    {
      id: 5,
      name: 'Faisal Zafar',
      position: 'I.T Head',
      image: '/faisal-zafar-khudii-expert-team.webp',
      desc: 'Khudii Welfare Organization\nC.E.O Digital Konnecter Systems (DKS)',
    },
    {
      id: 6,
      name: 'Usman Aziz',
      position: 'Social Media Dept.',
      image: '/usman-aziz-khudii-expert-team.webp',
      desc: 'Khudii Welfare Organization\nC.E.O YKOP Solutions (Media Agency)',
    },
    {
      id: 7,
      name: 'Allah Rakha',
      position: 'I.T & Back Office Manager',
      image: '/allah-rakha-khudii-expert-team.webp',
      desc: 'Khudii Welfare Organization\nWith 8+ Years of experience, he oversee Technical Support and I.T System Operations',
    },
  ];

  const bulletPoints = [
    'Between donors who want to give and welfare organizations that desperately need resources.',
    'Between volunteers searching for a cause and communities longing for their support.',
    'Between professionals willing to lend their skills and organizations hungry for guidance.',
  ];

  const joinUsPoints = [
    'If you are a donor, Khudii helps your generosity travel safely into trusted hands.',
    'If you are a volunteer, Khudii helps you find the cause that needs your time and skills.',
    'If you are a welfare organization, Khudii gives you a voice, a stage, and a community that believes in you.',
  ];

  // Optional: Use state to trigger initial render animation (if needed for hydration)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply fade-in class after mount (optional — pure CSS version below also works without this)
  const sectionClass = `${styles.section} ${mounted ? styles.fadeIn : ''}`;

  return (
    <div className={styles.aboutUs}>
      {/* HERO */}
      <section className={`${styles.hero} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h2 className={styles.heroTitle}>WHO WE ARE</h2>
              <p className={styles.paragraph_who}>
                Khudii is not just an organization — <strong>it is a dream turned into reality.</strong> Born in Lahore in <strong>2024</strong>, Khudii is <strong>Pakistan&apos;s first digital hub for welfare organizations.</strong> It was created with one purpose: to ensure that every act of kindness finds a stage, and every welfare effort finds the support it deserves.
              </p>
              <p className={styles.paragraph_who}>
                Across Pakistan, thousands of welfare groups work tirelessly to bring hope — some provide food, others run schools, some build wells, and others bring healthcare to those who cannot afford it. Yet, many of these efforts remain invisible, hidden in the shadows. Donors do not always know where to give, and volunteers often do not know where to serve. Khudii steps in to <strong>connect the dots.</strong> We give these organizations a voice, a platform, and a chance to shine — so their impact can grow, and so no life in need is left behind.
              </p>
            </div>
            <div className={styles.heroVideoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/Ez4zVQfc7Nk"
                title="KHUDII || WELFARE ORGANIZATION"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* DREAM & PURPOSE */}
      <section className={`${styles.dream} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Dream & Purpose</h2>
          <p className={styles.paragraph}>
            At Khudii, we believe that <strong>every welfare organization carries a story</strong> — a story of sacrifice, struggle, and service. Too often, these stories remain untold. Khudii exists to tell them. We showcase the courage of those who heal, teach, feed, and uplift. We bring their journeys to the world so that the world can walk with them.
          </p>
          <div className={styles.purposeBox}>
            <h3 className={styles.purposeTitle}>Our purpose is to build <strong>bridges of compassion</strong>:</h3>
            <ul className={styles.bulletList}>
              {bulletPoints.map((point, i) => (
                <li key={i} className={styles.bulletItem}>
                  <span className={styles.bullet}>•</span> {point}
                </li>
              ))}
            </ul>
            <p className={styles.purposeConclusion}>
              Khudii is the thread that ties all these hearts and hands together. When giving meets need, when skill meets service, when compassion meets action — that is where change begins.
            </p>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* IMPACT */}
      <section className={`${styles.impact} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Impact</h2>
          <p className={styles.paragraph}>
            In just a short time, Khudii has already become a <strong>home for more than 75 welfare organizations across 6 sectors</strong>: health, education, food, water, disability, and thalassemia. Each organization we promote carries its own light, and together, these lights form a constellation of hope stretching across Pakistan.
          </p>
          <p className={styles.paragraph}>
            Through our work, <strong>thousands of lives have been touched indirectly</strong> — families finding clean water, patients gaining access to healthcare, children entering classrooms, and communities rising with dignity.
          </p>
          <p className={styles.paragraph}>
            But this is only the beginning. Khudii is a movement that grows stronger every day. As more organizations join, as more donors connect, and as more volunteers step forward, the ripple of change widens. What began as one idea in one city is fast becoming a national network of generosity — and soon, an international one.
          </p>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* CEO */}
      <section className={`${styles.ceo} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <div className={styles.ceoGrid}>
            <div className={styles.ceoText}>
              <h2 className={styles.ceoName}>Amir Saeed Bhatti</h2>
              <p className={styles.ceoTitle}>(C.E.O & Founder)</p>
              <p className={styles.paragraph}>
                <strong>Allah (Subhanahu Wa Ta'ala)</strong> opened my heart to his love by enabling me to love his creation and then blessed me even more by equipping me with tools to serve those who are around me. This is what I consider the purpose of my life and this is the very core of my identity. This empathy and self-realization were the very things that enabled me to become one of the core founders and members of <strong>Taryaq</strong> Welfare Organization founded in <strong>1992</strong>.
              </p>
              <p className={styles.paragraph}>
                This beautiful journey of service and gratitude has brought us to yet another milestone which we have titled as <strong>"KHUDII"</strong>. This project thus is not a novelty but is an offshoot of that very empathy and passion to serve mankind which my <strong>Allah (Subhanahu Wa Ta'ala)</strong> has blessed me with. The vision is the same, yet the only difference lies in the way the project has been structured.
              </p>
              <p className={styles.paragraph}>
                A new responsibility awaits me. A new vision has taken hold of me. And I ardently believe that this journey is going to be so beautiful and gratifying that the journey itself will end up being the destination.
              </p>
            </div>
            <div className={styles.ceoImage}>
              <img src="/amir-saeed-bhatti-khudii-expert-team.webp" alt="Amir Saeed Bhatti" />
            </div>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* TEAM INTRO */}
      <section className={`${styles.teamIntro} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>The People Behind Khudii</h2>
          <p className={styles.paragraph}>
            Khudii is carried forward by a <strong>team of dreamers and doers</strong>. We are people who believe that kindness multiplies when it is shared, and that real change comes when connections are made.
          </p>
          <p className={styles.paragraph}>
            Our team is united by one simple belief: that no act of good should go unseen, and no effort of service should go unsupported. Each of us brings passion, skills, and vision — but more than anything, we bring <strong>commitment to the cause of humanity</strong>.
          </p>
          <p className={styles.paragraph}>
            Behind the screens, strategies, and stories are people who wake up every day with one goal: to build a hub where generosity finds its way, where volunteers discover their purpose, and where welfare organizations find strength to stand tall.
          </p>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* EXPERT TEAM */}
      <section className={`${styles.team} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Expert Team</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.teamCard}>
                <img src={member.image} alt={member.name} className={styles.teamImg} />
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamPos}>{member.position}</p>
                  <p className={styles.teamDesc}>
                    {member.desc.split('\n').map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* JOIN US */}
      <section className={`${styles.joinSection} ${styles.fadeIn}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Join Us</h2>
          <div className={styles.joinGrid}>
            <div className={styles.joinText}>
              <p className={styles.joinIntro}>
                Khudii is not just a platform — it is a <strong>movement of connection, compassion, and change.</strong> And you are a part of it.
              </p>
              <ul className={styles.joinList}>
                {joinUsPoints.map((point, i) => (
                  <li key={i} className={styles.joinItem}>
                    <span className={styles.bullet}>•</span> {point}
                  </li>
                ))}
              </ul>
              <p className={styles.joinConclusion}>
                Together, we can build a Pakistan where no act of kindness is lost, no community is forgotten, and no life is left behind.
              </p>
              <p className={styles.tagline}>
                <strong>Khudii — where compassion meets connection, and connection creates change.</strong>
              </p>
            </div>
            {/* <div className={styles.joinVideoWrapper}>
             <div>   
              <button
                      className="inline-flex items-center justify-center rounded-[25px] w-50 sm:w-auto px-5 py-2.5 text-sm font-medium bg-[#E3001C] text-white transition-all duration-300 focus:outline-none"
                      aria-label={`Explore Volunteer`}
                    >
                      Join Us as Volunteer 
                    </button>
                    </div>
                    <br />
                <div>
    <iframe
                src="https://www.youtube.com/embed/Ez4zVQfc7Nk"
                title="Join Khudii"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
              ></iframe>
                </div>
          
                 
            </div> */}
             <div className={styles.joinContentWrapper}>
    {/* Video Wrapper (now safe from overlap) */}
  <div className={styles.joinVideoWrapper}>
    <iframe
      src="https://www.youtube.com/embed/Ez4zVQfc7Nk"
      title="Join Khudii"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={styles.video}
    ></iframe>
  </div>
{/* Centered Button */}
  <div className={styles.joinButtonContainer}>
    <button
      className="inline-flex items-center justify-center rounded-[25px] w-full sm:w-auto px-6 py-3 text-sm font-medium bg-[#E3001C] text-white transition-all duration-300 hover:bg-[#c10017] focus:outline-none shadow-md hover:shadow-lg"
      aria-label="Join Us as Volunteer"
    >
      Join Us as Volunteer
    </button>
  </div>
</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;