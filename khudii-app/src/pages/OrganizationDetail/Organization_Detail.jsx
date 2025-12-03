// src/components/OrganizationDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SEO from "../../componets/Helmet/Helmet";
import "./Organization_Details.css";
import Crousel from "../../componets/OrganizationDetailPageComponents/Crousel/Crousel";
// import Services from "../../componets/OrganizationDetailPageComponents/Services/services";
import Services from "../../componets/OrganizationDetailPageComponents/Services/Services";
// import Socials from "../../componets/OrganizationDetailPageComponents/GeneralInfo/GeneralInfo";
import YouTubeAndGoogle_map from "../../componets/OrganizationDetailPageComponents/YoutubeANDGoogleMap/YouTubeAndGoogle_map";
import Blogs from "../../componets/Blogs/Blogs";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
const APIPath = import.meta.env.VITE_BACKEND_PATH;
const OrganizationDetail = ({url}) => {
  const location=useLocation()
  const {slug}=useParams()
  const [org, setOrg] = useState(null);
  const [error,seterror]=useState(false)
  const [id,setid]=useState(null)
  const [loader,setloader]=useState(false)
// console.log(googlemap)
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${APIPath}/item/${slug}`);
        setOrg(res.data);
        setid(res.data.id)
      
      } catch (err) {
        seterror(true)
        console.error("Error fetching org:", err);
      }
    })();
 
  }, [slug]);

 
if (error) return (
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
  );


  return (
  <>

   <SEO 
  title={org ? `${org.name} - Verified Organization | Khudii` : "Organization - Khudii"}
  description={
    org 
      ? `${org.name} - ${org.description ? org.description.replace(/<[^>]*>/g, '').substring(0, 160) : 'Verified welfare organization partnered with Khudii for community impact in Pakistan.'}`
      : "Verified welfare organization working with Khudii for community support across Pakistan."
  }
  keywords={
    org
      ? `${org.name}, ${org.title || 'welfare organization'}, khudii partner, verified charity pakistan, community support`
      : "welfare organizations, verified charities, partner organizations, community support pakistan"
  }
  image={org?.introductory_image_path || "/Khudii.webp"}
  url={`${url}/organization/${org?.slug || slug}`}
/>
<>
  <Crousel setloader={setloader} key={slug}/>
  </>
  {/* <Socials itemId={id}  /> */}
  {/* <Services id={id}/> */}
  <>
  {id && <YouTubeAndGoogle_map key={slug}  id={id}/>}
  </>
  <>
  <Blogs loader1={loader} key={slug}/>
  </>
  </>
  );
};

export default OrganizationDetail;
