import { CheckCircle } from "lucide-react";
import PageHeader from "../../componets/PageHeader/PageHeader";
import SEO from "../../componets/Helmet/Helmet";
export default function Certification() {
  return (
<>
<SEO 
        title="Certifications - Khudii Pakistan | SECP Registered Welfare Organization"
        description="Khudii is officially certified and licensed by the Securities and Exchange Commission of Pakistan (SECP) under Section 42 of the Companies Act, 2017. View our official certification."
        keywords="khudii certification, SECP registered, pakistan welfare license, section 42 company, khudii legal status, verified charity pakistan, SECP license 2020, registered welfare organization"
        url="https://new.khudii.com/Certifications"
        type="website"
      />

 <PageHeader 
                title="Certifications"
                breadcrumbs={[
                  { label: "Home", link: "/" },
                  { label: "Certifications" }
                ]}
              />
    <section className="w-full flex justify-center py-10 bg-white">
      <div className="max-w-4xl w-full px-4 flex flex-col items-center gap-8 text-center">
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
        <div className="rounded-2xl shadow-md overflow-hidden">
          <img
            src="https://www.khudii.com/wp-content/uploads/2024/12/khudii-certificate300.png.webp"
            alt="Khudii Certificate"
            className="w-52 md:w-64 lg:w-72 object-contain"
          />
        </div>
      </div>
    </section>

    </>
  );
}
