import React from "react";
import { Link } from "react-router-dom";
import styles from './Organizations.module.css'
import { useState,useEffect } from "react";
import axios from "axios";
import { html } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
const APIPath = import.meta.env.VITE_BACKEND_PATH;

function OrganizationsSection() {
    const [loading, setLoading] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const nav=useNavigate()
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${APIPath}/items`,{withCredentials:true});
        if(res.data.length>6){ res.data=res.data.slice(0,6)}
        setOrganizations(res.data); // replace with res.data later
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

//   return (
//     <section className={`${styles.class1} bg-brand-light py-6`}>
//       <div>
//         {/* <div className={`${styles.class2}`}>
//         <h2 className={`text-3xl font-semibold text-brand-dark mb-2 ${styles.class3}`}>
//           Our Organizations
//         </h2>
//         <div><Link to='/organiztionsSectors'>Explore organizations</Link> <span>{`>`}</span></div>
//         </div> */}

//           <div className={`${styles.main} flex justify-between `}>
//                 <div className={`${styles.gw}`}></div>
//               <div  className={`${styles.gw} ${styles.class11} ${styles.class12}`}>Organizations</div>
//               <div  className={`${styles.gw} ${styles.btn_org1}`}><Link to={'/organizations/'}>Explore Organizations&nbsp; <span> {`>`}</span></Link></div>
//               </div>
          
//           {/* <div className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3`}>
//             <div></div>
//             <div  className={`${styles.class11} ${styles.class12}`}>Organizations</div>
//             <div  className={`${styles.class11}`}><Link to={'/organizations/'}>Explore Organizations&nbsp; <span> {`>`}</span></Link></div>
//             </div> */}
//             <br />
//         {/* <p className="text-base text-gray-600 mb-8">
//           These are verified & trusted organizations we partner with to drive
//           change in various sectors.
//         </p> */}

//         <div className={`${styles.card_container} mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
//           {organizations.map((org, idx) => (
//             <div
//               key={idx}
//               className={`${styles.org_card_main} group bg-white overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer`}
//             >
//               <div className="relative h-48 w-full overflow-hidden p-2.5">
//                 <img
//                   src={org.introductory_image_path}
//                   alt={org.name}
//                 className={`${styles.img_org} object-cover w-full h-full`}
//                   loading="lazy"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className={`${styles.title_h} text-xl font-semibold text-brand-dark mb-2 group-hover:text-brand-green transition-colors duration-300`}>
//                   {org.name}
//                 </h3>
//                 <div className={`text-gray-700 text-sm mb-4 ${styles.ellipsis}`}>
//                 <div className={`${styles.text}`} dangerouslySetInnerHTML={{__html:org.description}} /> 
//                 </div>
//                 {/* <Link
//                   to={`/organization/${org.id}`}
//                   className="inline-block text-brand-green font-medium border border-brand-green px-4 py-2 rounded hover:bg-brand-green hover:text-blue-950 transition-colors duration-300"
//                 >
//                   Explore →
//                 </Link> */}
//                 <center>
//                  <button className={`${styles.org_btn} inline-block text-brand-green font-medium border border-brand-green px-4 py-2 rounded hover:bg-brand-green hover:text-blue-950 transition-colors duration-300 cursor-pointer`} onClick={()=>{nav(`/organization/${org.slug}`,{state:{id:org.id}})}}>
//                     Explore {org.name.split(" ").slice(0,2).join(" ")}
//                  </button>
//                 </center>
//                 {/*    <a
//                   href={`/organizations/${encodeURIComponent(org.name)}`}   // remember this encode and decode
//                   className="inline-block text-brand-green font-medium border border-brand-green px-4 py-2 rounded hover:bg-brand-green hover:text-blue-950 transition-colors duration-300"
//                 >
//                   Explore →
//                 </a> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default OrganizationsSection;

// 2nd Code

return (
    <section className="bg-[#f8fafc] py-6 sm:pt-3 sm:pb-3 md:pt-3 md:pb-3 lg:pt-5 lg:pb-5">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center mb-8 sm:mb-10">
  {/* Left spacer — same width as right link */}
  <div className={`${styles.org_sec_left} flex-shrink-0 invisible`}>
    <span className="inline-block font-semibold text-[#E3001C]">
      Explore Organizations
    </span>
  </div>

  {/* Centered heading */}
  <div className="flex-1 text-center">
    <h2 className="text-2xl sm:text-3xl font-bold text-[#022279]">
      Organizations
    </h2>
  </div>
  {/* Right-aligned link */}
  <div className={styles.exp_org_btn}>
    <Link
      to="/organizations/"
      className="inline-flex items-center font-semibold transition-colors group"
      aria-label="Explore all organizations"
    >
      Explore Organizations
      <svg
        className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
</div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
          {organizations.length > 0 ? (
            organizations.map((org, idx) => (
              <article
              onClick={() => nav(`/organization/${org.slug}`, { state: { id: org.id } })}
                key={org.id || idx}
                className="cursor-pointer group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                role="article"
                aria-labelledby={`org-title-${org.id || idx}`}
              >
                {/* Image */}
                <div className="p-2 w-full overflow-hidden bg-white rounded-t-xl">
  <img
    src={org.introductory_image_path || '/placeholder-org.webp'}
    alt={org.name || 'Organization logo'}
    className="w-full h-full object-cover duration-500"
    loading="lazy"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '/fallback-org.png';
    }}
  />
</div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3
                    id={`org-title-${org.id || idx}`}
                    className="h-[50px] text-lg sm:text-xl font-semibold text-[#02236e] mb-2 transition-colors"
                  >
                    {org.name}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {org.description
                      ? org.description
                          .replace(/<[^>]*>/g, '') // strip HTML for safety (or use DOMPurify if rich text needed)
                          .substring(0, 120) + (org.description.length > 120 ? '...' : '')
                      : 'Empowering communities through sustainable initiatives.'}
                  </p>

                  <div className="text-center">
                    <button
                      className="cursor-pointer inline-flex items-center justify-center rounded-[25px] w-50 sm:w-auto px-5 py-2.5 text-sm font-medium bg-[#E3001C] text-white transition-all duration-300 focus:outline-none"
                      aria-label={`Explore ${org.name}`}
                    >
                      Explore {org.name.split(' ').slice(0, 2).join(' ')}
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No organizations found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Scoped utility (line clamp) */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default OrganizationsSection;