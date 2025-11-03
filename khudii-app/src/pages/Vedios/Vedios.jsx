import React from 'react'
import PageHeader from '../../componets/PageHeader/PageHeader'
import VideoGallery from '../../componets/vediosComponent/VediosComponent'
import SEO from '../../componets/Helmet/Helmet'
const Vedios = () => {
  return (
    <>
         <SEO 
        title="Videos - Khudii Pakistan | Welfare Initiatives & Success Stories"
        description="Watch Khudii's latest videos showcasing welfare projects, community initiatives, and success stories across Pakistan. Explore our humanitarian work through engaging video content."
        keywords="khudii videos, welfare organization videos, pakistan charity videos, humanitarian projects, community work videos, khudii youtube, social welfare videos, pakistan social work"
        url="https://new.khudii.com/vediosPage"
        type="website"
      />
      
     <PageHeader 
            title="Vedios"
            breadcrumbs={[
              { label: "Home", link: "/" },
              { label: "Vedios" }
            ]}
          />

          <VideoGallery/>
    </>
  )
}

export default Vedios