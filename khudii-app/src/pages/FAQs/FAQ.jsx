
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Styles from './FAQ.module.css'
import PageHeader from "../../componets/PageHeader/PageHeader";
import SEO from "../../componets/Helmet/Helmet";
// FAQ Data
const faqs = [
  {
    question: "What is Khudii Welfare Organization?",
    answer:
      "Khudii Welfare Organization is Pakistan's first e-community of human purpose, operating as a non-governmental organization (NGO) dedicated to serving humanity without discrimination based on color, caste, creed, nationality, or status. Rooted in Islamic principles from Surah Al-Hujurat:13, Khudii focuses on empowering communities through essential services in healthcare, education, disability support, water access, thalassemia care, food security, and orphanage support.",
  },
  {
    question: "What is the mission of Khudii Welfare Organization?",
    answer:
      "The mission of Khudii is to empower underserved communities in Pakistan by providing access to vital services such as affordable healthcare, education, and support for disabilities, ensuring dignity, opportunity, and a fulfilling life for all, without any form of discrimination.",
  },
  {
    question: "What services does Khudii provide?",
    answer:
      "Khudii offers a wide range of services including affordable healthcare through hospitals and telemedicine, education programs for children, support for differently-abled individuals, thalassemia awareness and treatment, clean water access initiatives, food security solutions to combat hunger, orphanage care, and community services via hubs like Masjid Rehmat-al-Lil-Aalameen.",
  },
  {
    question: "How can I donate to Khudii Welfare Organization?",
    answer:
      "You can donate to Khudii through their official website or by contacting them via social media channels like Facebook, Instagram, WhatsApp, YouTube, or TikTok. Donations help fund projects in healthcare, education, and community empowerment, making a direct impact on lives in Pakistan.",
  },
  {
    question: "What is the vision of Khudii NGO in Pakistan?",
    answer:
      "Khudii's vision is to create a world where dignity and opportunity are boundless, establishing 25,000 model communities across Pakistan by connecting people and ensuring access to essentials like health, education, and water, all while promoting non-discriminatory service aligned with Islamic values.",
  },
  {
    question: "Does Khudii provide healthcare services in Pakistan?",
    answer:
      "Yes, Khudii provides comprehensive healthcare services, including affordable treatments at Ghurki Trust Teaching Hospital, telemedicine via EZShifa (with plans for 500 clinics), free dialysis at Al-Makki Al-Madni Dialysis Centre, and free cancer treatment at Cancer Care Hospital and Research Centre, plus services at Indus Hospital in a paperless, cashless environment.",
  },
  {
    question: "What education programs does Khudii offer?",
    answer:
      "Khudii's education programs focus on opening doors to knowledge and skills for children and communities in Pakistan, emphasizing inclusive learning opportunities to empower underserved populations and foster long-term development.",
  },
  {
    question: "How does Khudii support people with disabilities?",
    answer:
      "Khudii empowers differently-abled individuals with dignity and confidence through targeted support programs, including resources, training, and community integration initiatives to help them lead fulfilling lives.",
  },
  {
    question: "Does Khudii run orphanages in Pakistan?",
    answer:
      "Yes, Khudii supports orphanages by providing nurturing environments, education, and care for orphans, helping them build brighter futures through comprehensive welfare programs.",
  },
  {
    question: "What is EZShifa by Khudii?",
    answer:
      "EZShifa is Khudii's telemedicine initiative offering affordable remote healthcare consultations, with ambitious plans to establish 500 clinics across Pakistan to make medical services accessible to remote and underserved areas.",
  },
  {
    question: "How can I contact Khudii Welfare Organization?",
    answer:
      "You can contact Khudii via their social media: Facebook, Instagram, WhatsApp (+923198548344), YouTube, or TikTok. For more details, visit their website.",
  },
  {
    question: "Are there volunteer opportunities at Khudii NGO?",
    answer:
      "Yes, Khudii welcomes volunteers to contribute to their initiatives in healthcare, education, disaster relief, and community support. Interested individuals can reach out via social media or the website to learn about opportunities.",
  },
  {
    question: "How does Khudii help in flood-affected areas in Pakistan?",
    answer:
      "Khudii provides disaster relief in flood-hit regions like Swat, Buner, and Punjab, offering support through food distribution, medical aid, and rebuilding efforts to help communities recover and rebuild.",
  },
  {
    question: "What makes Khudii different from other NGOs in Pakistan?",
    answer:
      "Khudii stands out as Pakistan's first e-community of human purpose, with a non-discriminatory approach rooted in Islamic values, ambitious goals like 25,000 model communities, and integrated services in health, education, and welfare for holistic empowerment.",
  },
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 px-10">
      <button
        className="w-full flex justify-between items-center py-4 text-left text-lg font-medium text-gray-800 hover:text-indigo-600 transition"
        onClick={onClick}
      >
        {faq.question}
        <ChevronDown
          className={`${Styles.dropdown} text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600 text-base leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
  <SEO 
        title="FAQ - Khudii Pakistan | Frequently Asked Questions"
        description="Find answers to common questions about Khudii Welfare Organization - Pakistan's leading digital welfare platform. Learn about our services, donations, volunteer opportunities, and community impact."
        keywords="khudii faq, welfare organization questions, pakistan charity faq, khudii services, donation queries, volunteer opportunities, healthcare services, education programs, NGO Pakistan"
        url="https://new.khudii.com/faqs"
        type="FAQPage"
      />
    <PageHeader 
                   title="FAQS"
                   breadcrumbs={[
                     { label: "Home", link: "/" },
                     { label: "FAQS" }
                   ]}
                 />

    <section className="w-full flex justify-center py-16 bg-gray-50">
      <div className="max-w-4xl w-full px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="bg-white rounded-2xl shadow-md divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
