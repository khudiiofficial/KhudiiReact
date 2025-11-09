import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_PATH;

const CertificationAdmin = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [loader,setloader]=useState(false)
 const [cap,setcap]=useState('')
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    display_order: 0,
    image_base64: null 
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Axios instance with credentials
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Show message helper
  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  // Fetch all certifications
  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const response = await api.get('/certifications');
      if (response.data.success) {
        setCertifications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
      showMessage('Error fetching certifications', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input change and convert to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showMessage('Please select an image file', 'error');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('File size must be less than 5MB', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image_base64: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Create new certification
  const handleCreate = async (e) => {
    e.preventDefault();
    
 if(cap){
      console.log('bot detected')
      setcap('')
      return
    }
    if (!formData.title || !formData.image_base64) {
      showMessage('Title and image are required', 'error');
      return;
    }
setloader(true)
    try {
      const response = await api.post('/certifications', formData);
      if (response.data.success) {
        showMessage('Certification created successfully!');
        resetForm();
        fetchCertifications();
      }
    } catch (error) {
      console.error('Error creating certification:', error);
      showMessage('Error creating certification', 'error');
    }
setloader(false)
  };

  // Update certification
  const handleUpdate = async (e) => {
    
 if(cap){
      console.log('bot detected')
      setcap('')
      return
    }
    e.preventDefault();
  
    if (!formData.title) {
      showMessage('Title is required', 'error');
      return;
    }
  setloader(true)
    try {
      const response = await api.put(`/certifications/${editingCert.id}`, formData);
      if (response.data.success) {
        showMessage('Certification updated successfully!');
        resetForm();
        fetchCertifications();
      }
    } catch (error) {
      console.error('Error updating certification:', error);
      showMessage('Error updating certification', 'error');
    }
    setloader(false)
  };

  // Delete certification
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) {
      return;
    }

    try {
      const response = await api.delete(`/certifications/${id}`);
      if (response.data.success) {
        showMessage('Certification deleted successfully!');
        fetchCertifications();
      }
    } catch (error) {
      console.error('Error deleting certification:', error);
      showMessage('Error deleting certification', 'error');
    }
  };

  // Start editing
  const startEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      description: cert.description || '',
      display_order: cert.display_order || 0,
      image_base64: null // Don't preload image for editing
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingCert(null);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      display_order: 0,
      image_base64: null
    });
    setEditingCert(null);
  };

  // Styles
  const styles = {
    admin: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    message: {
      padding: '10px',
      margin: '10px 0',
      borderRadius: '4px',
      textAlign: 'center',
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb',
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
    },
    form: {
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px',
      border: '1px solid #dee2e6',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#495057',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '14px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '14px',
      resize: 'vertical',
      minHeight: '80px',
      fontFamily: 'Arial, sans-serif',
    },
    fileInput: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      fontSize: '14px',
      background: 'white',
    },
    formActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
    },
    btn: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.2s',
    },
    btnPrimary: {
      backgroundColor: '#007bff',
      color: 'white',
    },
    btnSecondary: {
      backgroundColor: '#6c757d',
      color: 'white',
    },
    btnEdit: {
      backgroundColor: '#28a745',
      color: 'white',
    },
    btnDelete: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
    contentList: {
      marginTop: '30px',
    },
    contentGrid: {
      display: 'grid',
      gap: '20px',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    },
    contentCard: {
      background: 'white',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    certImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '4px',
      marginBottom: '15px',
    },
    certTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    },
    certDescription: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '15px',
      lineHeight: '1.4',
    },
    certMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
      paddingTop: '15px',
      borderTop: '1px solid #e9ecef',
    },
    metaText: {
      color: '#6c757d',
      fontSize: '12px',
    },
    contentActions: {
      display: 'flex',
      gap: '10px',
    },
    loading: {
      textAlign: 'center',
      padding: '20px',
      fontSize: '16px',
      color: '#6c757d',
    },
    emptyState: {
      textAlign: 'center',
      padding: '40px',
      color: '#6c757d',
      fontSize: '16px',
    },
    fileName: {
      marginTop: '5px',
      fontSize: '12px',
      color: '#6c757d',
    },
    imagePreview: {
      maxWidth: '200px',
      maxHeight: '150px',
      marginTop: '10px',
      borderRadius: '4px',
      border: '1px solid #dee2e6',
    }
  };

  return (
    <div style={styles.admin}>
      <h1>Certification Management</h1>
      
      {message && (
        <div style={{
          ...styles.message,
          ...(messageType === 'error' ? styles.error : styles.success)
        }}>
          {message}
        </div>
      )}

      {/* Add/Edit Form */}
      <form 
        onSubmit={editingCert ? handleUpdate : handleCreate} 
        style={styles.form}
      >
            <input type="hidden" onChange={(e)=>{setcap(e.target.value)}} />


        <h2>{editingCert ? 'Edit Certification' : 'Add New Certification'}</h2>
        
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Title: *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter certification title"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter certification description"
            rows="3"
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="display_order" style={styles.label}>
            Display Order:
          </label>
          <input
            type="number"
            id="display_order"
            name="display_order"
            value={formData.display_order}
            onChange={handleInputChange}
            placeholder="Display order"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="image" style={styles.label}>
            {editingCert ? 'New Image (optional):' : 'Image: *'}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            style={styles.fileInput}
          />
          {formData.image_base64 && (
            <div>
              <img 
                src={formData.image_base64} 
                alt="Preview" 
                style={styles.imagePreview}
              />
            </div>
          )}
        </div>

        <div style={styles.formActions}>
          <button 
            type="submit" 
            style={{ ...styles.btn, ...styles.btnPrimary }}
            disabled={loader}
          >
            {/* {editingCert ? 'Update' : 'Create'} */}
            {loader && editingCert? 'Updating...':loader && !editingCert ? "Creating...":!loader && editingCert?'Update':"create"}
          </button>
          {editingCert && (
            <button 
              type="button" 
              onClick={cancelEdit}
              style={{ ...styles.btn, ...styles.btnSecondary }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Certifications List */}
      <div style={styles.contentList}>
        <h2>Existing Certifications</h2>
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : certifications.length === 0 ? (
          <div style={styles.emptyState}>
            No certifications found. Create your first certification!
          </div>
        ) : (
          <div style={styles.contentGrid}>
            {certifications.map((cert) => (
              <div key={cert.id} style={styles.contentCard}>
                <img 
                  src={cert.image_url} 
                  alt={cert.title}
                  style={styles.certImage}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
                <div style={styles.certTitle}>{cert.title}</div>
                {cert.description && (
                  <div style={styles.certDescription}>{cert.description}</div>
                )}
                <div style={styles.certMeta}>
                  <small style={styles.metaText}>
                    Order: {cert.display_order}
                  </small>
                  <small style={styles.metaText}>
                    Created: {new Date(cert.created_at).toLocaleDateString()}
                  </small>
                </div>
                <div style={styles.contentActions}>
                  <button
                    onClick={() => startEdit(cert)}
                    style={{ ...styles.btn, ...styles.btnEdit, flex: 1 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    style={{ ...styles.btn, ...styles.btnDelete, flex: 1 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationAdmin;