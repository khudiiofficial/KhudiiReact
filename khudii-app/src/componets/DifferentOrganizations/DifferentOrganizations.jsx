import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DifferentOrganizations.css";
import { useNavigate } from "react-router-dom";
const APIPath = import.meta.env.VITE_BACKEND_PATH;
const DifferentOrganizations = () => {
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [error,setError]=useState(null)
  const nav=useNavigate()
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${APIPath}/items`,{withCredentials:true});
      
        setOrganizations(res.data); // replace with res.data later
     
      } catch (error) {
        console.log(error);
        setError(error.message)
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader"></div>
      </div>
    );
  }

if(error){
  return(
     <div className={`errorContainer`}>
          <div className={`errorIcon`}>⚠️</div>
          <h2 className={`errorTitle`}>Unable to Load Content</h2>
          <p className={`errorMessage`}>{error}</p>
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
                <p className="org-excerpt ellipsisMultiline">  <div dangerouslySetInnerHTML={{ __html: org.description }}></div></p>
                <button onClick={()=>{nav(`/organization/${org.slug}`,{state:{id:org.id}})}} className="org-btn">
                  Explore Org
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default DifferentOrganizations;
