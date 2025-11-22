import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../redux/userslice";

const APIPath = import.meta.env.VITE_BACKEND_PATH;

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const auth = useSelector((state) => state.users.auth);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${APIPath}/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(resetUser());
        navigate("/Login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Error logging out!");
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const mainLinks = [
    { path: "/dashboard/OrganizationPage", label: "Organizations" },
    { path: "/dashboard/BlogPage", label: "Blogs" },
    { path: "/dashboard/createorg", label: "Add Organization" },
    { path: "/dashboard/create-document", label: "Add Blog" },
    { path: "/dashboard/NewsEvents", label: "News & Events" },
    { path: "/dashboard/welcome-secton", label: "Welcome Section" },
    { path: "/dashboard/eventDescription", label: "Event Description" },
     { path: "/dashboard/SuccessStories", label: "Success Stories" },
    { path: "/dashboard/Vedios", label: "Videos" },
    { path: "/dashboard/Inquiries", label: "Organization Inquiries" },
    { path: "/dashboard/Donation", label: "Donations" },
    { path: "/dashboard/Stories", label: "Contributed Stories" },
    { path: "/dashboard/JobApplication", label: "Job Applications" },
    { path: "/dashboard/Voulenteer", label: "Volunteers" },
    { path: "/dashboard/Contacts", label: "Contacts" },
    { path: "/dashboard/Topbar", label: "Top Bar" },
    { path: "/dashboard/Certifications", label: "Certifications" },
    { path: "/dashboard/Testimonials", label: "Testimonials" },
    { path: "/dashboard/sectors", label: "Sectors" },
    { path: "/dashboard/crousel-images", label: "Carousel Images" },
    { path: "/dashboard/vision", label: "Vision" },
    { path: "/dashboard/storiesDescription", label: "Home Page Story Description" },
    { path: "/dashboard/contentAdmin", label: "About Page" },
       { path: "/dashboard/seo", label: "SEO Management" }
  ];

  // const moreLinks = [
  //   { path: "/dashboard/SuccessStories", label: "Success Stories" },
  //   { path: "/dashboard/Vedios", label: "Videos" },
  //   { path: "/dashboard/Inquiries", label: "Organization Inquiries" },
  //   { path: "/dashboard/Donation", label: "Donations" },
  //   { path: "/dashboard/Stories", label: "Contributed Stories" },
  //   { path: "/dashboard/JobApplication", label: "Job Applications" },
  //   { path: "/dashboard/Voulenteer", label: "Volunteers" },
  //   { path: "/dashboard/Contacts", label: "Contacts" },
  //   { path: "/dashboard/Topbar", label: "Top Bar" },
  //   { path: "/dashboard/Certifications", label: "Certifications" },
  //   { path: "/dashboard/Testimonials", label: "Testimonials" },
  //   { path: "/dashboard/sectors", label: "Sectors" },
  //   { path: "/dashboard/crousel-images", label: "Carousel Images" },
  //   { path: "/dashboard/vision", label: "Vision" },
  //   { path: "/dashboard/storiesDescription", label: "Home Page Story Description" },
  // ];

  if (!auth) return null;

  return (
    <div 
      className={`bg-blue-600 text-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col shadow-lg`}
    >
      {/* Header */}
      <div className="p-4 border-b border-blue-500 flex items-center justify-between">
        {!isCollapsed && (
          <div className="text-lg font-bold tracking-wide">
            <Link to={'/dashboard'}>Admin Panel</Link>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-blue-500 transition"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {/* Main Links */}
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-3 py-3 rounded-lg transition font-medium ${
                isActiveLink(link.path)
                  ? "bg-blue-700 text-white shadow-inner"
                  : "hover:bg-blue-500 hover:shadow"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? link.label : ""}
            >
              {isCollapsed ? (
                <span className="text-xs font-bold">{link.label.charAt(0)}</span>
              ) : (
                link.label
              )}
            </Link>
          ))}

      
  
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-blue-500 space-y-2">
        <button
          onClick={() => navigate("/dashboard/Profile")}
          className={`w-full bg-white text-blue-600 px-3 py-2 rounded-lg font-medium hover:bg-gray-100 transition shadow ${
            isCollapsed ? "text-xs" : ""
          }`}
          title={isCollapsed ? "Profile" : ""}
        >
          {isCollapsed ? "👤" : "Change Profile"}
        </button>
        <button
          onClick={handleLogout}
          className={`w-full bg-white text-blue-600 px-3 py-2 rounded-lg font-medium hover:bg-gray-100 transition shadow ${
            isCollapsed ? "text-xs" : ""
          }`}
          title={isCollapsed ? "Logout" : ""}
        >
          {isCollapsed ? "🚪" : "Logout"}
        </button>
      </div>
    </div>
  );
}