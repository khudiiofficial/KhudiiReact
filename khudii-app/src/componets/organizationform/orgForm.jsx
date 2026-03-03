import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './OrganizationForm.css';
const APIPath = import.meta.env.VITE_BACKEND_PATH;
const OrganizationForm = () => {
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [supportingDocs, setSupportingDocs] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  // Add to form state (with other useState declarations)
const [userEmail, setUserEmail] = useState('');
const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    // Section 1: Basic Information
    organizationName: '',
    contactPersonName: '',
    contactPersonMobile: '',
    landlineUan: '',
    websiteUrl: '',
    emailAddress: '',
    
    // Section 2: Social Media Links
    facebookLink: '',
    instagramLink: '',
    youtubeLink: '',
    linkedinLink: '',
    twitterLink: '',
    
    // Section 3: Organization Profile
    yearEstablished: '',
    
    // Section 4: Key Performance Indicators
    totalBeneficiariesServed: '',
    totalProjectsCompleted: '',
    activeProjects: ''
  });

  // Form errors
  const [errors, setErrors] = useState({});

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 5000);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('Logo file size must be less than 10MB', 'error');
        return;
      }

      if (!file.type.startsWith('image/')) {
        showToast('Please upload an image file', 'error');
        return;
      }

      setLogoFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle supporting documents upload
  const handleSupportingDocsUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        showToast(`${file.name} is larger than 10MB`, 'error');
        continue;
      }

      if (supportingDocs.length + validFiles.length >= 10) {
        showToast('Maximum 10 files allowed', 'error');
        break;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSupportingDocs(prev => [...prev, {
            file: file,
            base64: reader.result,
            name: file.name,
            type: file.type
          }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Remove supporting document
  const removeDocument = (index) => {
    setSupportingDocs(prev => prev.filter((_, i) => i !== index));
  };

  // Remove logo
  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Section 1: Basic Information
    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }
    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = 'Contact person name is required';
    }
    if (!formData.contactPersonMobile.trim()) {
      newErrors.contactPersonMobile = 'Mobile number is required';
    } else if (!/^[0-9+\-\s]+$/.test(formData.contactPersonMobile)) {
      newErrors.contactPersonMobile = 'Invalid mobile number format';
    }

    // Section 3: Organization Profile
    if (!formData.yearEstablished) {
      newErrors.yearEstablished = 'Year established is required';
    } else if (!/^(19|20)\d{2}$/.test(formData.yearEstablished)) {
      newErrors.yearEstablished = 'Please enter a valid year (1900-2099)';
    }

    // Email validation if provided
    if (formData.emailAddress && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }
    
    setLoading(true);

    try {
      const submissionData = { ...formData };

      if (logoPreview) {
        submissionData.organizationLogo = logoPreview;
      }

      if (supportingDocs.length > 0) {
        submissionData.supportingDocuments = supportingDocs.map(doc => doc.base64);
      }

      const response = await axios.post(
        `${APIPath}/api/organization/submit`,
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        showToast('Form submitted successfully!', 'success');
        
        // Reset form
        setLogoFile(null);
        setLogoPreview(null);
        setSupportingDocs([]);
        setFormData({
          organizationName: '',
          contactPersonName: '',
          contactPersonMobile: '',
          landlineUan: '',
          websiteUrl: '',
          emailAddress: '',
          facebookLink: '',
          instagramLink: '',
          youtubeLink: '',
          linkedinLink: '',
          twitterLink: '',
          yearEstablished: '',
          totalBeneficiariesServed: '',
          totalProjectsCompleted: '',
          activeProjects: ''
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Submission error:', error);
      showToast(
        error.response?.data?.message || 'Failed to submit form',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Clear form
  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to clear the form?')) {
      setLogoFile(null);
      setLogoPreview(null);
      setSupportingDocs([]);
      setFormData({
        organizationName: '',
        contactPersonName: '',
        contactPersonMobile: '',
        landlineUan: '',
        websiteUrl: '',
        emailAddress: '',
        facebookLink: '',
        instagramLink: '',
        youtubeLink: '',
        linkedinLink: '',
        twitterLink: '',
        yearEstablished: '',
        totalBeneficiariesServed: '',
        totalProjectsCompleted: '',
        activeProjects: ''
      });
      setErrors({});
    }
  };

// Add after your useState declarations

useEffect(() => {
  // Check if user is logged in with Google
  const checkGoogleAccount = () => {
    // Method 1: If using Google Sign-In with data attribute
    const userEmailFromMeta = document.querySelector('meta[name="user-email"]')?.content;
    if (userEmailFromMeta) {
      setUserEmail(userEmailFromMeta);
      setIsAuthenticated(true);
      alert('method 1 worked')
      return;
    }

    // Method 2: If using Google Identity Services (GSI)
    if (window.google?.accounts?.id) {
      // Google Identity Services doesn't have a direct getUser method
      // The user info is typically stored in the ID token
      console.log("Google Identity Services available");
      
      // You need to decode the JWT token to get email
      // This assumes you have the token stored somewhere
      const token = localStorage.getItem('google_token');
      if (token) {
        try {
          // Simple JWT decode (just for email, not verification)
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const payload = JSON.parse(window.atob(base64));
          if (payload.email) {
            setUserEmail(payload.email);
            setIsAuthenticated(true);
               alert('method 2 worked')
          }
        } catch (e) {
          console.error("Error decoding token:", e);
        }
      }
    }

    // Method 3: If using OAuth2 implicit flow
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    if (accessToken) {
      // Fetch user info from Google
      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.email) {
          setUserEmail(data.email);
          setIsAuthenticated(true);
             alert('method 3 worked')
        }
      })
      .catch(err => console.error("Error fetching user info:", err));
    }

    // Method 4: If using Google's one-tap sign-in
    if (window.google?.accounts?.oauth2) {
      // You need to have initialized the token client
      console.log("Google OAuth2 available");
      // The token client would have a callback with user info
         alert('method 4 available')
    }
  };
  
  checkGoogleAccount();
}, []);


  return (
    <div className="form-container">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="form-card">
        <h1 className="form-title">Organization Registration Form</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Section 1: Basic Information */}
          <div className="form-section">
            <h3 className="section-title">
            SECTION 1 — BASIC INFORMATION
            </h3>
            
            <div className="form-group">
              <label htmlFor="organizationName">Organization Name *</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                className={errors.organizationName ? 'error' : ''}
                placeholder="Enter organization name"
              />
              {errors.organizationName && (
                <span className="error-message">{errors.organizationName}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactPersonName">Contact Person Name *</label>
                <input
                  type="text"
                  id="contactPersonName"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  className={errors.contactPersonName ? 'error' : ''}
                  placeholder="Enter contact person name"
                />
                {errors.contactPersonName && (
                  <span className="error-message">{errors.contactPersonName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contactPersonMobile">Contact Person Mobile *</label>
                <input
                  type="text"
                  id="contactPersonMobile"
                  name="contactPersonMobile"
                  value={formData.contactPersonMobile}
                  onChange={handleInputChange}
                  className={errors.contactPersonMobile ? 'error' : ''}
                  placeholder="enter mobile number"
                />
                {errors.contactPersonMobile && (
                  <span className="error-message">{errors.contactPersonMobile}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="landlineUan">Landline / UAN</label>
                <input
                  type="text"
                  id="landlineUan"
                  name="landlineUan"
                  value={formData.landlineUan}
                  onChange={handleInputChange}
                  placeholder="042-XXXXXXXX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="websiteUrl">Website URL</label>
                <input
                  type="url"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className={errors.emailAddress ? 'error' : ''}
                placeholder="info@example.com"
              />
              {errors.emailAddress && (
                <span className="error-message">{errors.emailAddress}</span>
              )}
            </div>
          </div>

          {/* Section 2: Social Media Links */}
          <div className="form-section">
            <h3 className="section-title">
               SECTION 2 — SOCIAL MEDIA LINKS
            </h3>
            <p className="section-subtitle">Add your organization's social media profiles (optional)</p>

            <div className="form-group">
              <label htmlFor="facebookLink">Facebook Page Link</label>
              <input
                type="url"
                id="facebookLink"
                name="facebookLink"
                value={formData.facebookLink}
                onChange={handleInputChange}
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div className="form-group">
              <label htmlFor="instagramLink">Instagram Link</label>
              <input
                type="url"
                id="instagramLink"
                name="instagramLink"
                value={formData.instagramLink}
                onChange={handleInputChange}
                placeholder="https://instagram.com/yourpage"
              />
            </div>

            <div className="form-group">
              <label htmlFor="youtubeLink">YouTube Channel Link</label>
              <input
                type="url"
                id="youtubeLink"
                name="youtubeLink"
                value={formData.youtubeLink}
                onChange={handleInputChange}
                placeholder="https://youtube.com/@yourchannel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="linkedinLink">LinkedIn Profile/Page Link</label>
              <input
                type="url"
                id="linkedinLink"
                name="linkedinLink"
                value={formData.linkedinLink}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>

            <div className="form-group">
              <label htmlFor="twitterLink">Twitter / X Link</label>
              <input
                type="url"
                id="twitterLink"
                name="twitterLink"
                value={formData.twitterLink}
                onChange={handleInputChange}
                placeholder="https://twitter.com/yourhandle"
              />
            </div>
          </div>

          {/* Section 3: Organization Profile */}
          <div className="form-section">
            <h3 className="section-title">
           SECTION 3 — ORGANIZATION PROFILE
            </h3>

            <div className="form-group">
              <label htmlFor="yearEstablished">Year Established *</label>
              <input
                type="text"
                id="yearEstablished"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleInputChange}
                className={errors.yearEstablished ? 'error' : ''}
                placeholder="YYYY"
                maxLength="4"
              />
              {errors.yearEstablished && (
                <span className="error-message">{errors.yearEstablished}</span>
              )}
            </div>
          </div>

          {/* Section 4: Key Performance Indicators */}
          <div className="form-section">
            <h3 className="section-title">
            SECTION 4 — KEY PERFORMANCE INDICATORS
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="totalBeneficiariesServed">Total Beneficiaries Served</label>
                <input
                  type="number"
                  id="totalBeneficiariesServed"
                  name="totalBeneficiariesServed"
                  value={formData.totalBeneficiariesServed}
                  onChange={handleInputChange}
                  placeholder="e.g., 1000"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="totalProjectsCompleted">Total Projects Completed</label>
                <input
                  type="number"
                  id="totalProjectsCompleted"
                  name="totalProjectsCompleted"
                  value={formData.totalProjectsCompleted}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="activeProjects">Active Projects</label>
                <input
                  type="number"
                  id="activeProjects"
                  name="activeProjects"
                  value={formData.activeProjects}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Uploads */}
          <div className="form-section">
            <h3 className="section-title">
              <span className="icon">📎</span> SECTION 5 — UPLOADS
            </h3>

            {/* Organization Logo Upload */}
            <div className="upload-section">
              <label className="upload-label">Upload Organization Logo (PNG/JPG)</label>
              <div className="upload-area">
                {logoPreview ? (
                  <div className="preview-container">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="logo-preview"
                    />
                    <button 
                      type="button"
                      className="remove-btn"
                      onClick={removeLogo}
                    >
                      ✕ Remove Logo
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="logo-upload"
                      type="file"
                      onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo-upload" className="upload-btn">
                       Choose Logo
                    </label>
                    <p className="upload-hint">Max size: 10MB. Supported: PNG, JPG</p>
                  </div>
                )}
              </div>
            </div>

            {/* Supporting Documents Upload */}
            <div className="upload-section">
              <label className="upload-label">Upload Supporting Documents (PDF, Images, Reports)</label>
              <div className="upload-area">
                <input
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  id="docs-upload"
                  multiple
                  type="file"
                  onChange={handleSupportingDocsUpload}
                />
                <label htmlFor="docs-upload" className="upload-btn">
                   Choose Files
                </label>
                <p className="upload-hint">
                  Max 10 files, 10MB each. Supported: PDF, DOC, DOCX, JPG, PNG
                </p>
              </div>

              {/* Document List */}
              {supportingDocs.length > 0 && (
                <div className="document-list">
                  <h4>Uploaded Documents ({supportingDocs.length}/10)</h4>
                  {supportingDocs.map((doc, index) => (
                    <div key={index} className="document-item">
                      <span className="doc-name" title={doc.name}>
                        {doc.name}
                      </span>
                      <button
                        type="button"
                        className="remove-doc-btn"
                        onClick={() => removeDocument(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleClearForm}
              className="clear-btn"
            >
              Clear Form
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? 'Submitting...' : 'Submit Form'}
            </button>
          </div>
        </form>

        {/* <div className="form-footer">
          <p>
            <strong>Note:</strong> The name and email associated with your Google Account will be recorded when you submit this form.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default OrganizationForm;