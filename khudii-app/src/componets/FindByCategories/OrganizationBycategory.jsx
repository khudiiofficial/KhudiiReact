import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './OrganizationBycategory.module.css'
import "./OrganizationBycategory.css";
import { Link } from "react-router-dom";
const APIPath = import.meta.env.VITE_BACKEND_PATH;
import { useNavigate } from "react-router-dom";
const OrganizationBycategory = ({name}) => {
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [err,seterr]=useState(null)
  const nav=useNavigate()
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${APIPath}/itemByCategory/${name}`,{withCredentials:true});
        
        setOrganizations(res.data); // replace with res.data later
      } catch (error) {
        console.log(error);
        seterr(error.message)
      }
      setLoading(false);
    })();
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

if(err){
return (

    <div className={`errorContainer`}>
          <div className={`errorIcon`}>⚠️</div>
          <h2 className={`errorTitle`}>Unable to Load Content</h2>
          <p className={`errorMessage`}>{err}</p>
          <button 
            className={`retryButton`}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
)
}

  return (
    <>
    {organizations.length===0 ?

 <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <h2 className={styles.errorTitle}>NO Organizations Found</h2>
      <p className={styles.errorMessage}>It seems that data is yet to be added in Database</p>
    <Link to={'/'}>  <button 
        className={styles.retryButton}
        // onClick={() => window.location.reload()}
      >
         Back to Home Page
      </button></Link>
    </div>
        :
    <div className="org-container py-14 px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {organizations.map((org) => (
            <div key={org.id} className="org-card">
              <div className="org-img-wrapper">
                <img src={org.introductory_image_path} alt={org.title} className="org-img" />
                <button onClick={()=>{nav(`/organization/${org.slug}`,{state:{id:org.id}})}} className="org-overlay">
                  <span>Explore</span>
                </button>
              </div>
              <div className="org-content">
                <h3 className="org-title">
                  <button onClick={()=>{nav(`/organization/${org.slug}`,{state:{id:org.id}})}}>{org.name}</button>
                </h3>
                <div className="org-excerpt ellipsisMultiline">  <div dangerouslySetInnerHTML={{ __html: org.description }}></div></div>
                <button onClick={()=>{nav(`/organization/${org.slug}`,{state:{id:org.id}})}} className="org-btn">
                  Explore Org
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

// nav(`/organization/${org.Slug}`,{state:{id:org.id}})
}

    </>
  );
};


export default OrganizationBycategory;
