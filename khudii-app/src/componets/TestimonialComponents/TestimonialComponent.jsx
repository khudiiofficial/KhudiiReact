import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const ClientFeedbacks = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef([]);

  const feedbacks = [
    {
      id: 1,
      name: "Nabila Nasir",
      position: "Amir Public School",
      thumbnail:
        "/Testimonials/nabila-00.png.webp",
      videoUrl:
        "/Vedios/NABILA-NASIR-AMIR-PIUBLIC-SCHOOL.mp4",
      role: "School Principal",
      avatar: "👩‍🏫",
    },
    {
      id: 2,
      name: "Ahsan Ghauri",
      position: "Kalske Water RO Plant",
      thumbnail:
        "/Testimonials/ahsan-00.png.webp",
      videoUrl:
        "/Vedios/AHSAN-GHAURI-KALSKE-WATER-RO-PLANT.mp4",
      role: "Plant Manager",
      avatar: "👨‍💼",
    },
  ];

  const playVideo = (index) => {
    if (activeVideo === index) {
      // pause if same video clicked
      videoRefs.current[index]?.pause();
      setActiveVideo(null);
    } else {
      // pause previously active video
      if (activeVideo !== null) {
        videoRefs.current[activeVideo]?.pause();
      }
      setActiveVideo(index);
      setTimeout(() => {
        videoRefs.current[index]?.play();
      }, 100);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Client's Feedbacks
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what our valued clients have to say about their experience
            working with Khudii.
          </p>
        </div>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {feedbacks.map((feedback, index) => (
            <div
              key={feedback.id}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Video or Thumbnail */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="w-full h-64 object-cover rounded-t-2xl"
                  controls={activeVideo === index}
                  poster={feedback.thumbnail}
                  preload="metadata"
                  onEnded={() => setActiveVideo(null)}
                >
                  <source src={feedback.videoUrl} type="video/mp4" />
                  <source src={feedback.videoUrl} type="video/webm" />
                  <source src={feedback.videoUrl} type="video/mkv" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay Play Button (only if not active) */}
                {activeVideo !== index && (
                  <div
                    className="absolute inset-0 bg-opacity-30 flex items-center justify-center cursor-pointer"
                    onClick={() => playVideo(index)}
                  >
                    <div className="bg-white bg-opacity-90 rounded-full p-4 transform transition-transform group-hover:scale-110">
                      <svg
                        className="w-12 h-12 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Client Info */}
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                      {feedback.avatar}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {feedback.name}
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      {feedback.position}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {feedback.role}
                    </p>
                  </div>

                  {/* Play/Pause Button */}
                  <button
                    onClick={() => playVideo(index)}
                    className="flex-shrink-0 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full p-2 transition-colors duration-200"
                  >
                    {activeVideo === index ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h3>
            <p className="text-gray-600 mb-6">
              Have you worked with Khudii? We'd love to hear about your
              experience and feature your feedback.
            </p>
            <Link to="/Story">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Share Your Story
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientFeedbacks;
