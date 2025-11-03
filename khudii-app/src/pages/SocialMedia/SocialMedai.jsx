import React from 'react'
import PageHeader from '../../componets/PageHeader/PageHeader'
import FacebookPage from '../../componets/facebookCom/Facebook'
import LogoCarousel from '../../componets/SocialMediaComponent/SocialMedia'
import SEO from '../../componets/Helmet/Helmet'
const SocialMedai = () => {
  return (
  <> 
        <SEO 
        title="Social Media - Khudii Pakistan | Follow Our Welfare Journey"
        description="Connect with Khudii on social media platforms. Follow our latest updates, success stories, events, and welfare initiatives across Facebook, Instagram, YouTube, and TikTok."
        keywords="khudii social media, follow khudii, welfare organization social media, pakistan charity updates, khudii facebook, khudii instagram, khudii youtube, social welfare news, community updates"
        url="https://new.khudii.com/social-media"
        type="website"
      />

   <PageHeader 
          title="Social Media"
          breadcrumbs={[
            { label: "Home", link: "/" },
            { label: "Social Media" }
          ]}
        />
       <LogoCarousel/>
        <FacebookPage/>
  </>

  )
}

export default SocialMedai