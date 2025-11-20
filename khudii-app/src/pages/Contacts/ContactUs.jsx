import React from 'react'
import PageHeader from '../../componets/PageHeader/PageHeader'
import ContactSection from '../../componets/conatctPage/ContactSection'
import SEO from '../../componets/Helmet/Helmet'
const ContactUs = () => {
  return (
    <>

          <SEO 
        title="Contact Us - Khudii Pakistan | Get in Touch"
        description="Reach out to Khudii - Pakistan's digital welfare platform. Contact our team for donations, volunteering, partnerships, or any inquiries. We're here to help."
        keywords="contact khudii, pakistan welfare contact, charity support, donor inquiry, volunteer opportunities, partnership, khudii helpline, welfare organization contact"
        url="https://khudii.com/contact"
        type="website"
      />
     <PageHeader 
                title="Contact"
                breadcrumbs={[
                  { label: "Home", link: "/" },
                  { label: "Contact" }
                ]}
              />

    <ContactSection/>
    </>
  )
}

export default ContactUs