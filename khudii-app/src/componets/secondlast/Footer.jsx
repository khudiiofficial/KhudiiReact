// import React from 'react';
// import './Footer.css';
// import { Link } from 'react-router-dom';
// const APIPath = import.meta.env.VITE_BACKEND_PATH;
// import  { useEffect, useState } from "react";
// import axios from "axios";
// const Footer = () => {
//     const [data,setdata]=useState({})
//     const [arr,setArr]=useState([])
//      const [tel,settel]=useState('')
//      const [footerdata,setFooterData]=useState({})
//      useEffect(()=>{
// const fun=async ()=>{
//   try {
//     const res=await axios.get(`${APIPath}/api/telephone`,{withCredentials:true})
//     if(res.status===200){
//       let ch=''
//     for(let i=0; i<res.data.data.phone_number.length; i++){
//       if(Number.isInteger(parseInt(res.data.data.phone_number[i])) || res.data.data.phone_number[i]==='+' ){
// ch=ch+res.data.data.phone_number[i]
//       }
//     }
//     settel(ch)
//      setdata(res.data.data)
//     }
    
//   } catch (error) {
//     console.log(error)
//   }
// }
// fun()
//   },[])

//     useEffect(()=>{
// const call=async()=>{
//     try {
//         const res=await axios.get(`${APIPath}/getAllSectors`)
//         if(res.status===200){
//             setArr(res.data.data)
            
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }
// call()
//     },[])


//   const fetchFooterData = async () => {
//     try {
     
//       const response = await axios.get(`${APIPath}/api/footer`, {
//         withCredentials: true
//       });
      
//       if (response.data.success) {
//         setFooterData(response.data.data);
        
//       }
//     } catch (error) {
//       console.error('Error fetching footer data:', error);
//     } finally {
      
//     }
//   };
//   useEffect(()=>{
// fetchFooterData();    

//   },[])
  
//   return (
//     <footer className="khudii-footer">
//       {/* Main Footer Section */}
//       <div className="footer-main md:mx-5">
//         <div className="footer-containerr">
          
//           {/* Logo and Description Section */}
//           <div className="footer-section">
//             <div className="footer-logo">
//               <a href="/">
//          {  footerdata.logoimage &&   <img  width="223" height="79" data-src={`${ footerdata.logoimage
// }`} className="attachment-full size-full wp-image-6195 entered litespeed-loaded" alt="khudii logo, dks, secict"  src={`${ footerdata.logoimage
// }`}></img>}
//               </a>
//             </div>
//             <div className="footer-description">
//               <p>{footerdata.footertext}</p>
//             </div>
//             <div className="footer-contact">
//               <ul className="contact-list">
//                 <li className="contact-item">
//                   {/* (+92) 3198 - KHUDII (548344) */}
//                   <a href={`tel:${tel}`} target="_blank" rel="noopener noreferrer">
//                     <span className="contact-icon">
//                       <i className="fas fa-phone"></i>
//                     </span>
//                     <span className="contact-text"> <a href={`tel:${tel}`} target="_blank">{data.phone_number}</a></span>
//                   </a>
//                 </li>
//                 <li className="contact-item">
//                   <a>
//                   <span className="contact-icon">
//                     <i className="fas fa-map-marker-alt"></i>
//                   </span>
//                   <a target='blank' href={`${footerdata.location}`}><span className="contact-text">{footerdata.locationinfo}</span></a>
//                   </a>
//                 </li>
//                 <li className="contact-item">
//                   <a href={`mailto:${footerdata.email}`} target="_blank" rel="noopener noreferrer">
//                     <span className="contact-icon">
//                       <i className="fas fa-envelope"></i>
//                     </span>
//                     <span className="contact-text">{footerdata.email}</span>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

// <div className="flex justify-evenly gap-30 sm:gap-15 md:gap-15 footer_parent">
//           {/* Links Section */}
//           <div className="footer-section">
//             <h4 className="footer-heading">Links</h4>
//             <ul className="footer-links">
//               <li><Link to="/blogs/"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Blogs</Link></li>
//               <li><Link to="/faqs/"><span className="link-icon"><i className="far fa-dot-circle"></i></span>FAQs</Link></li>
//               <li><Link to="/organizations/"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Organizations</Link></li>
//               <li><Link to="/testimonials/"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Testimonials</Link></li>
//               <li><Link to="/contact/"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Contact Us</Link></li>
//             </ul>
//           </div>

//           {/* Categories Section */}
//           <div className="footer-section">
//             <h4 className="footer-heading">Categories</h4>
//             <ul className="footer-links">
            
            
              

// {[...arr.slice(0,8)].map((ele,i)=>{
//   return(
//       <li key={i}><Link to={`/${ele.slug}`}><span className="link-icon"><i className="far fa-dot-circle"></i></span>{ele.name}</Link></li>
//   )
// })}
// {/* 
//               <li><Link to="Categories/Orphanage"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Orphanage</Link></li>
//               <li><Link to="Categories/Thalassemia"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Thalassemia</Link></li>
//               <li><Link to="Categories/Visually impaired"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Visually Impaired</Link></li>
//               <li><Link to="Categories/Health"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Health</Link></li>
//               <li><Link to="Categories/Education"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Education</Link></li>
//               <li><Link to="Categories/Differently Abled"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Differently Abled</Link></li>
//               <li><Link to="Categories/Water And Food"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Water and Food</Link></li> */}
//             </ul>
//           </div>
// </div>
//         </div>
//       </div>

//       {/* Copyright and Social Media Section */}
//       <div className="footer-bottom md:px-5">
//         <div className="footer-container">
          
//           {/* Copyright */}
//           <div className="copyright-section">
//             <p>
//               ©2025 Copyright <Link to="/"><b>Khudii</b></Link>. All Rights Reserved. 
//               Powered By <a href="https://www.dks.com.pk/" target="_blank" rel="noopener noreferrer"><b>DKS</b></a>
//             </p>
//           </div>

//           {/* Social Media Icons */}
//           <div className="social-media-section">
//             <div className="social-icons">
//               <a href="https://www.facebook.com/Khudiioficial/"  aria-label="Visit our Facebook page" target="_blank" rel="noopener noreferrer" className="social-icon">
//                 <i className="fab fa-facebook-f"></i>
//               </a>
//               <a href="https://www.instagram.com/khudiiofficial/"  aria-label="Visit our Instagram page" target="_blank" rel="noopener noreferrer" className="social-icon">
//                 <i className="fab fa-instagram"></i>
//               </a>
//               <a href="https://api.whatsapp.com/send/?phone=%2B923198548344"  aria-label="Visit our whatsapp page" target="_blank" rel="noopener noreferrer" className="social-icon">
//                 <i className="fab fa-whatsapp"></i>
//               </a>
//               <a href="https://www.youtube.com/@khudiiofficial"  aria-label="Visit our youtube page" target="_blank" rel="noopener noreferrer" className="social-icon">
//                 <i className="fab fa-youtube"></i>
//               </a>
//               <a href="https://www.tiktok.com/@khudiiofficial" aria-label="Visit our tiktok page" target="_blank" rel="noopener noreferrer" className="social-icon">
//                 <i className="fab fa-tiktok"></i>
//               </a>
//             </div>
//           </div>

//         </div>
//       </div>


   
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
const APIPath = import.meta.env.VITE_BACKEND_PATH;
import { useEffect, useState } from "react";
import axios from "axios";

const Footer = () => {
    const [data, setdata] = useState({})
    const [arr, setArr] = useState([])
    const [tel, settel] = useState('')
    const [footerdata, setFooterData] = useState({})
    
    useEffect(() => {
        const fun = async () => {
            try {
                const res = await axios.get(`${APIPath}/api/telephone`, { withCredentials: true })
                if (res.status === 200) {
                    let ch = ''
                    for (let i = 0; i < res.data.data.phone_number.length; i++) {
                        if (Number.isInteger(parseInt(res.data.data.phone_number[i])) || res.data.data.phone_number[i] === '+') {
                            ch = ch + res.data.data.phone_number[i]
                        }
                    }
                    settel(ch)
                    setdata(res.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fun()
    }, [])

    useEffect(() => {
        const call = async () => {
            try {
                const res = await axios.get(`${APIPath}/getAllSectors`)
                if (res.status === 200) {
                    setArr(res.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        call()
    }, [])

    const fetchFooterData = async () => {
        try {
            const response = await axios.get(`${APIPath}/api/footer`, {
                withCredentials: true
            });
            if (response.data.success) {
                setFooterData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching footer data:', error);
        }
    };
    
    useEffect(() => {
        fetchFooterData();
    }, [])

    return (
        <footer className="khudii-footer">
            {/* Main Footer Section */}
            <div className="footer-main md:mx-5">
                <div className="footer-containerr">
                    
                    {/* Logo and Description Section */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <a href="/" aria-label="Go to homepage">
                                {footerdata.logoimage && <img 
                                    width="223" 
                                    height="79" 
                                    data-src={`${footerdata.logoimage}`} 
                                    className="attachment-full size-full wp-image-6195 entered litespeed-loaded" 
                                    alt="Khudii logo - Return to homepage" 
                                    src={`${footerdata.logoimage}`}
                                />}
                            </a>
                        </div>
                        <div className="footer-description">
                            <p>{footerdata.footertext}</p>
                        </div>
                        <div className="footer-contact">
                            <ul className="contact-list">
                                {/* Fix 1: Add accessible name for telephone link */}
                                <li className="contact-item">
                                    <a href={`tel:${tel}`} target="_blank" rel="noopener noreferrer" aria-label={`Call us at ${data.phone_number}`}>
                                        <span className="contact-icon" aria-hidden="true">
                                            <i className="fas fa-phone"></i>
                                        </span>
                                        <span className="contact-text">{data.phone_number}</span>
                                    </a>
                                </li>
                                
                                {/* Fix 2: Add accessible name for location link */}
                                <li className="contact-item">
                                    <a href={`${footerdata.location}`} target="_blank" rel="noopener noreferrer" aria-label={`Our location: ${footerdata.locationinfo}`}>
                                        <span className="contact-icon" aria-hidden="true">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </span>
                                        <span className="contact-text">{footerdata.locationinfo}</span>
                                    </a>
                                </li>
                                
                                {/* Fix 3: Add accessible name for email link */}
                                <li className="contact-item">
                                    <a href={`mailto:${footerdata.email}`} target="_blank" rel="noopener noreferrer" aria-label={`Email us at ${footerdata.email}`}>
                                        <span className="contact-icon" aria-hidden="true">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        <span className="contact-text">{footerdata.email}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex justify-evenly gap-30 sm:gap-15 md:gap-15 footer_parent">
                        {/* Links Section */}
                        <div className="footer-section">
                            <h4 className="footer-heading">Links</h4>
                            <ul className="footer-links">
                                <li><Link to="/blogs/"><span className="link-icon" aria-hidden="true"><i className="far fa-dot-circle"></i></span>Blogs</Link></li>
                                <li><Link to="/faqs/"><span className="link-icon" aria-hidden="true"><i className="far fa-dot-circle"></i></span>FAQs</Link></li>
                                <li><Link to="/organizations/"><span className="link-icon" aria-hidden="true"><i className="far fa-dot-circle"></i></span>Organizations</Link></li>
                                <li><Link to="/testimonials/"><span className="link-icon" aria-hidden="true"><i className="far fa-dot-circle"></i></span>Testimonials</Link></li>
                                <li><Link to="/contact/"><span className="link-icon" aria-hidden="true"><i className="far fa-dot-circle"></i></span>Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Categories Section */}
                        <div className="footer-section">
                            <h4 className="footer-heading">Categories</h4>
                            <ul className="footer-links">
                                {[...arr.slice(0, 8)].map((ele, i) => {
                                    return (
                                        <li key={i}>
                                            <Link to={`/${ele.slug}`}>
                                                <span className="link-icon" aria-hidden="true"><i className="far fa-dot-circle"></i></span>
                                                {ele.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright and Social Media Section */}
            <div className="footer-bottom md:px-5">
                <div className="footer-container">
                    
                    {/* Copyright */}
                    <div className="copyright-section">
                        <p>
                            ©2025 Copyright <Link to="/"><b>Khudii</b></Link>. All Rights Reserved. 
                            Powered By <a href="https://www.dks.com.pk/" target="_blank" rel="noopener noreferrer" aria-label="Visit DKS website"><b>DKS</b></a>
                        </p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="social-media-section">
                        <div className="social-icons">
                            <a href="https://www.facebook.com/Khudiioficial/" 
                               aria-label="Visit our Facebook page" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="social-icon">
                                <i className="fab fa-facebook-f" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.instagram.com/khudiiofficial/" 
                               aria-label="Visit our Instagram page" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="social-icon">
                                <i className="fab fa-instagram" aria-hidden="true"></i>
                            </a>
                            <a href="https://api.whatsapp.com/send/?phone=%2B923198548344" 
                               aria-label="Contact us on WhatsApp" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="social-icon">
                                <i className="fab fa-whatsapp" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.youtube.com/@khudiiofficial" 
                               aria-label="Visit our YouTube channel" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="social-icon">
                                <i className="fab fa-youtube" aria-hidden="true"></i>
                            </a>
                            <a href="https://www.tiktok.com/@khudiiofficial" 
                               aria-label="Visit our TikTok page" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="social-icon">
                                <i className="fab fa-tiktok" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;