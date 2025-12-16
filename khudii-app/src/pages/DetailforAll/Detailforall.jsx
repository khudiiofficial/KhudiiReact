import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react'
import { div } from 'framer-motion/client';
const APIPath = import.meta.env.VITE_BACKEND_PATH;
import OrganizationDetail from '../OrganizationDetail/Organization_Detail';
import BlogDetails from '../SpecificBlog/SpecificBlog';
import Categories from '../Categories/Categories';
const Detailforall = ({url}) => {
const [data,setdata]=useState("")
const [loader,setLoading]=useState(false)
const {slug}=useParams()
 const [error,seterror]=useState(false)
useEffect(()=>{
    const call=async()=>{
        setLoading(true)
        try {
            const res=await axios.get(`${APIPath}/detail/${slug}`)
            // console.log(res.data)
            setdata(res.data)
        } catch (error) {
            console.log(error)
             seterror(true)
        }
        setLoading(false)
    }
    call()
},[slug])


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

if(loader){
return(  <div className="flex items-center justify-center h-90 ">
     
      {/* <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"> */}
        <img src="/siteicon.png" alt="" width={200} height={200}/>
      {/* </div> */}
    </div>)
}
  return (
    <>
    
{data.category==='organization' && <OrganizationDetail org={data.data} url={url}/>}
{data.category==='blog' && <BlogDetails blog={data.data} url={url}/>}
{data.category==='sectors' && <Categories cat={data.data} url={url}/>}

</>
  )

}

export default Detailforall
