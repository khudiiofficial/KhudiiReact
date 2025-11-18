import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../redux/userslice";
const APIPath = import.meta.env.VITE_BACKEND_PATH;

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const auth = useSelector((state) => state.users.auth);
  
  useEffect(() => {
    const handleClick = () => {
      setShow(false);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleMoreClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to document
    setShow(!show);
  };

  const handleLinkClick = () => {
    setShow(false);
  };

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

  return (
    <>
      {auth ? (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
          {/* Left: Brand */}
          <div className="text-lg font-bold tracking-wide">
            <Link to={'/dashboard'}>Admin Panel</Link>
          </div>

          {/* Middle: Navigation Links */}
          <div className="flex gap-6">
            <Link
              to={"/dashboard/OrganizationPage"}
              className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:shadow transition font-medium"
            >
              Organizations
            </Link>
            <Link
              to={"/dashboard/BlogPage"}
              className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:shadow transition font-medium"
            >
              Blogs
            </Link>

            <Link
              to={"/dashboard/createorg"}
              className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:shadow transition font-medium"
            >
              Add organization
            </Link>
            <Link
              to={"/dashboard/create-document"}
              className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:shadow transition font-medium"
            >
              Add Blog
            </Link>

   <Link
              to={"/dashboard/NewsEvents"}
              className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:shadow transition font-medium"
            >
              News & Events
            </Link>
            <div className="relative">
              <div 
                onClick={handleMoreClick} 
                className="flex cursor-pointer items-center justify-center px-3 py-2 rounded-lg hover:bg-blue-500 hover:shadow transition font-medium"
              >
                More
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="ml-2 h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {show && (
                <div 
                  className="absolute top-full right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dropdown
                >
                  <div className="py-2">
                    <Link 
                      to="dashboard/SuccessStories" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Success Stories
                    </Link>
                    <Link 
                      to="/dashboard/Vedios" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Videos
                    </Link>
                    <Link 
                      to="/dashboard/Inquiries" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Organization Inquiries
                    </Link>
                    <Link 
                      to="/dashboard/Donation" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Donations
                    </Link>
                    <Link 
                      to="/dashboard/Stories" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Contributed Stories
                    </Link>
                    <Link 
                      to="/dashboard/JobApplication" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Job Applications
                    </Link>
                    <Link 
                      to="/dashboard/Voulenteer" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Volunteers
                    </Link>
                    <Link 
                      to="/dashboard/Contacts" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Contacts
                    </Link>
                       <Link 
                      to="/dashboard/Topbar" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Top Bar
                    </Link>
                       <Link 
                      to="/dashboard/Certifications" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Certifications
                    </Link>
                       <Link 
                      to="/dashboard/Testimonials" 
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-md"
                    >
                      Testimonials
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
         
          {/* Right: Change Password & Logout Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard/Profile")}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition shadow"
            >
              Change Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition shadow"
            >
              Logout
            </button>
          </div>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}