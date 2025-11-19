import React from 'react'
import PageHeader from '../../componets/PageHeader/PageHeader'
import DifferentOrganizations from '../../componets/DifferentOrganizations/DifferentOrganizations'
import SEO from '../../componets/Helmet/Helmet'
const Organizations = () => {
  return (
    <>
    <SEO 
        title="Verified Welfare Organizations in Pakistan | Khudii Partner Network"
        description="Browse Khudii's network of verified welfare organizations across Pakistan. Find credible charities working in health, education, orphan care, disability support, and community development."
        keywords="welfare organizations pakistan, verified charities, partner organizations, health NGOs, education charities, orphanages pakistan, disability support, community development, donor verification, khudii partners"
        url="https://new.khudii.com/organizations"
      />
         <PageHeader 
        title="Organizations"
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Organizations" }
        ]}
      />

      <DifferentOrganizations/>
      </>
  )
}

export default Organizations