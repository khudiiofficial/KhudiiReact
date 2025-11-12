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
        res.data=res.data.slice(0,6)
        setOrganizations(res.data); // replace with res.data later
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <section className={`${styles.class1} bg-brand-light py-16`}>
      <div className="max-w-7xl mx-auto ">
        {/* <div className={`${styles.class2}`}>
        <h2 className={`text-3xl font-semibold text-brand-dark mb-2 ${styles.class3}`}>
          Our Organizations
        </h2>
        <div><Link to='/organiztionsSectors'>Explore organizations</Link> <span>{`>`}</span></div>
        </div> */}

          <div className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3`}>
            <div></div>
            <div  className={`${styles.class11} ${styles.class12}`}>  Our Organizations</div>
            <div  className={`${styles.class11}`}><Link to={'/organizations/'}>Explore organizations&nbsp; <span> {`>`}</span></Link></div>
            </div>
            <br />
        {/* <p className="text-base text-gray-600 mb-8">
          These are verified & trusted organizations we partner with to drive
          change in various sectors.
        </p> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizations.map((org, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={org.introductory_image_path}
                  alt={org.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                   width="400"
                   height="192"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-brand-dark mb-2 group-hover:text-brand-green transition-colors duration-300">
                  {org.name}
                </h3>
                <div className={`text-gray-700 text-sm mb-4 ${styles.ellipsis}`}>
                <div className={`${styles.text}`} dangerouslySetInnerHTML={{__html:org.description}} /> 
                </div>
                {/* <Link
                  to={`/organization/${org.id}`}
                  className="inline-block text-brand-green font-medium border border-brand-green px-4 py-2 rounded hover:bg-brand-green hover:text-blue-950 transition-colors duration-300"
                >
                  Explore →
                </Link> */}
                 <button  className="inline-block text-brand-green font-medium border border-brand-green px-4 py-2 rounded hover:bg-brand-green hover:text-blue-950 transition-colors duration-300 cursor-pointer" onClick={()=>{nav(`/organization/${org.slug}`,{state:{id:org.id}})}}>
                    Explore →
                 </button>
                {/*    <a
                  href={`/organizations/${encodeURIComponent(org.name)}`}   // remember this encode and decode
                  className="inline-block text-brand-green font-medium border border-brand-green px-4 py-2 rounded hover:bg-brand-green hover:text-blue-950 transition-colors duration-300"
                >
                  Explore →
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrganizationsSection;
