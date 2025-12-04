import { CheckCircle } from "lucide-react";
import PageHeader from "../../componets/PageHeader/PageHeader";
import SEO from "../../componets/Helmet/Helmet";
import axios from "axios";
import { useState,useEffect } from "react";
const APIPath = import.meta.env.VITE_BACKEND_PATH;
export default function Certification({con,url}) {
const [cert,setcert]=useState([])
const [loader,setloader]=useState(false)
useEffect(()=>{
const get=async()=>{
  setloader(true)
  try {
    const res=await axios.get(`${APIPath}/certifications`)
    if(res.status===200){
      setcert(res.data)
    }
  } catch (error) {
    
  }
  setloader(false)
}
get()
},[])


// if(loader){
//   return (

//       <div className="flex items-center justify-center h-90 ">
     
//       {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"> */}
//         <img src="/siteicon.png" alt="" width={200} height={200}/>
//       {/* </div> */}
//     </div>
//   )
// }
  return (
<>
<SEO 
        title={con?.meta_title||"Certifications - Khudii Pakistan | SECP Registered Welfare Organization"}
        description={con?.meta_description||"Khudii is officially certified and licensed by the Securities and Exchange Commission of Pakistan (SECP) under Section 42 of the Companies Act, 2017. View our official certification."}
        keywords={con?.meta_keywords||"khudii certification, SECP registered, pakistan welfare license, section 42 company, khudii legal status, verified charity pakistan, SECP license 2020, registered welfare organization"}
        url={`${url}/certifications`}
        type="website"
      />

 <PageHeader 
                title="Certifications"
                breadcrumbs={[
                  { label: "Home", link: "/" },
                  { label: "Certifications" }
                ]}
              />
    {loader ? <div className="flex items-center justify-center h-90 ">
     
      {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"> */}
        <img src="/siteicon.png" alt="" width={200} height={200}/>
      {/* </div> */}
    </div>:
    <section className="w-[1240px] mx-auto flex justify-center py-10 bg-white">
      <div className="w-full flex flex-col items-center gap-8 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Securities and Exchange Commission of Pakistan
        </h2>

        {/* Icon List */}
        <ul className="space-y-4 text-gray-700 text-base md:text-lg font-medium">
          <li className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span>UNDER SECTION 42 of the Companies Act (XIX), 2017</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <span>License No. 2020</span>
          </li>
        </ul>

        {/* Certificate Image */}
        <div className=" flex flex-wrap gap-20 items-center justify-center rounded-2xl overflow-hidden">
          
          {cert.map((ele,idx)=>{
return(
   <img
   width={300}
   height={425}
            
            src={ele.image_url}
            alt="Khudii Certificate"
            className="object-contain"
          />
)
// w-52 md:w-64 lg:w-72 
          })}
          {/* <img
            src="https://www.khudii.com/wp-content/uploads/2024/12/khudii-certificate300.png.webp"
            alt="Khudii Certificate"
            className="w-52 md:w-64 lg:w-72 object-contain"
          /> */}
        </div>
      </div>
    </section>
}
    </>
  );
}
