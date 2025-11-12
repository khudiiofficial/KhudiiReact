import React from 'react'
import PageHeader from '../../componets/PageHeader/PageHeader'
import SEO from '../../componets/Helmet/Helmet'
const Golden_people = () => {
  return (
    <>

         <SEO 
        title="Golden People - Inspiring Stories | Khudii Community Heroes"
        description="Discover the inspiring stories of Golden People - community heroes and changemakers making a difference across Pakistan. Coming soon on Khudii's platform."
        keywords="golden people, community heroes, inspiring stories, changemakers pakistan, social impact stories, khudii heroes, community leaders"
        url="https://new.khudii.com/golden-people"
        image="/golden-people.png.webp"
      />
       <PageHeader 
            title="Golden_people"
            breadcrumbs={[
              { label: "Home", link: "/" },
              { label: "Golden People" }
            ]}
          />


     <section className=" h-100 max-h-1000 bg-[#6881e4]/60 grid place-items-center px-6 py-0 ">
      <div className="grid md:grid-cols-2 items-center gap-10 text-center md:text-left">
        {/* Left: Heading + Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Coming Soon!!!
          </h2>
          <p className="text-white/90 text-lg max-w-lg mx-auto md:mx-0">
            We&rsquo;re working hard behind the scenes to bring something amazing. 
            Stay tuned!
          </p>
        </div>

        {/* Right: Image */}
        <div className="flex justify-center">
          <img
            src="/golden-people.png.webp"
            alt="Golden People"
            className="w-full max-w-md h-auto drop-shadow-2xl rounded-2xl"
          />
        </div>
      </div>
    </section>
    </>
  )
}

export default Golden_people