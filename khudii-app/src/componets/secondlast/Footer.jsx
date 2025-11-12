import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="khudii-footer">
      {/* Main Footer Section */}
      <div className="footer-main">
        <div className="footer-container">
          
          {/* Logo and Description Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <a href="/">
              <img  width="223" height="79" data-src="/main-logo.webp" className="attachment-full size-full wp-image-6195 entered litespeed-loaded" alt="khudii logo, dks, secict"  src="/main-logo.webp"></img>
              </a>
            </div>
            <div className="footer-description">
              <p>It is a dream that encompasses entire humanity within its scope. A dream that doesn't discriminate between color, caste, creed, nationality, status or any other identity marker.</p>
            </div>
            <div className="footer-contact">
              <ul className="contact-list">
                <li className="contact-item">
                  <a href="tel:+923198548344" target="_blank" rel="noopener noreferrer">
                    <span className="contact-icon">
                      <i className="fas fa-phone"></i>
                    </span>
                    <span className="contact-text">(+92) 3198 - KHUDII (548344)</span>
                  </a>
                </li>
                <li className="contact-item">
                  <a>
                  <span className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <a target='blank' href="https://maps.app.goo.gl/epgAPPSkHw5ai2hp9"><span className="contact-text">Lahore, Pakistan</span></a>
                  </a>
                </li>
                <li className="contact-item">
                  <a href="mailto:info@khudii.com" target="_blank" rel="noopener noreferrer">
                    <span className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="contact-text">info@khudii.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

<div className='flex justify-center gap-30 footer_parent'>
          {/* Links Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Links</h4>
            <ul className="footer-links">
              <li><Link to="/blogs/"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Blogs</Link></li>
              <li><Link to="/faqs/"><span className="link-icon"><i className="far fa-dot-circle"></i></span>FAQs</Link></li>
              <li><Link to="/organizations/"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Organizations</Link></li>
              <li><Link to="/testimonials/"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Testimonials</Link></li>
              <li><Link to="/contact/"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link to="Categories/Autism"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Autism</Link></li>
              <li><Link to="Categories/Orphanage"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Orphanage</Link></li>
              <li><Link to="Categories/Thalassemia"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Thalassemia</Link></li>
              <li><Link to="Categories/Visually impaired"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Visually Impaired</Link></li>
              <li><Link to="Categories/Health"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Health</Link></li>
              <li><Link to="Categories/Education"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Education</Link></li>
              <li><Link to="Categories/Differently Abled"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Differently Abled</Link></li>
              <li><Link to="Categories/Water And Food"><span className="link-icon"><i className="far fa-dot-circle"></i></span>Water and Food</Link></li>
            </ul>
          </div>
</div>
        </div>
      </div>

      {/* Copyright and Social Media Section */}
      <div className="footer-bottom">
        <div className="footer-container">
          
          {/* Copyright */}
          <div className="copyright-section">
            <p>
              ©2025 Copyright <Link to="/"><b>Khudii</b></Link>. All Rights Reserved. 
              Powered By <a href="https://www.dks.com.pk/" target="_blank" rel="noopener noreferrer"><b>DKS</b></a>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="social-media-section">
            <div className="social-icons">
              <a href="https://www.facebook.com/Khudiioficial/"  aria-label="Visit our Facebook page" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/khudiiofficial/"  aria-label="Visit our Instagram page" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=%2B923198548344"  aria-label="Visit our whatsapp page" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.youtube.com/@khudiiofficial"  aria-label="Visit our youtube page" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://www.tiktok.com/@khudiiofficial" aria-label="Visit our tiktok page" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>

        </div>
      </div>


   
    </footer>
  );
};

export default Footer;