import React from 'react'
import PageHeader from '../../componets/PageHeader/PageHeader'
import ClientFeedbacks from '../../componets/TestimonialComponents/TestimonialComponent'
import SEO from '../../componets/Helmet/Helmet'
const Testimonial = () => {
  return (
    <>
     <SEO 
        title="Client Testimonials - Khudii Pakistan | Real Stories & Reviews"
        description="Read and watch authentic client testimonials and feedback about Khudii's welfare services. Hear from schools, organizations, and communities we've helped across Pakistan."
        keywords="khudii testimonials, client feedback, welfare organization reviews, pakistan charity testimonials, khudii client stories, donor testimonials, community feedback, social work reviews"
        url="https://new.khudii.com/testimonials"
        type="website"
      />
       <PageHeader 
            title="Testimonial"
            breadcrumbs={[
              { label: "Home", link: "/" },
              { label: "Testimonial" }
            ]}
          />

          <ClientFeedbacks/>
    </>
  )
}

export default Testimonial