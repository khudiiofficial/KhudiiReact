import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TestimonialAdmin.css'; // Create this CSS file

const API_URL = import.meta.env.VITE_BACKEND_PATH;

const TestimonialAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [videoBase64, setVideoBase64] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await api.get('/testimonials');
      if (response.data.success) {
        setTestimonials(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      showMessage('Error fetching testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        showMessage('Please select a video file', 'error');
        return;
      }
      
      if (file.size > 50 * 1024 * 1024) {
        showMessage('Video size must be less than 50MB', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setVideoBase64(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    if (!videoBase64) {
      showMessage('Video is required', 'error');
      return;
    }

    try {
      setUploadProgress(0);
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await api.post('/testimonials', { video_base64: videoBase64 });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (response.data.success) {
        showMessage('Testimonial created successfully!');
        resetForm();
        fetchTestimonials();
        
        setTimeout(() => setUploadProgress(0), 1000);
      }
    } catch (error) {
      console.error('Error creating testimonial:', error);
      showMessage('Error creating testimonial', 'error');
      setUploadProgress(0);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!videoBase64) {
      showMessage('Video is required', 'error');
      return;
    }

    try {
      setUploadProgress(0);
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await api.put(`/testimonials/${editingTestimonial.id}`, { 
        video_base64: videoBase64 
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (response.data.success) {
        showMessage('Testimonial updated successfully!');
        resetForm();
        fetchTestimonials();
        
        setTimeout(() => setUploadProgress(0), 1000);
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      showMessage('Error updating testimonial', 'error');
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      const response = await api.delete(`/testimonials/${id}`);
      if (response.data.success) {
        showMessage('Testimonial deleted successfully!');
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      showMessage('Error deleting testimonial', 'error');
    }
  };

  const startEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setVideoBase64(null);
  };

  const cancelEdit = () => {
    setEditingTestimonial(null);
    resetForm();
  };

  const resetForm = () => {
    setVideoBase64(null);
    setEditingTestimonial(null);
    setUploadProgress(0);
  };

  return (
    <div className="testimonial-admin">
      <div className="admin-header">
        <h1 className="admin-title">Testimonial Management</h1>
        <p className="admin-subtitle">Manage video testimonials for your platform</p>
      </div>
      
      {message && (
        <div className={`message ${messageType === 'error' ? 'message-error' : 'message-success'}`}>
          <div className="message-content">
            <span className="message-icon">
              {messageType === 'error' ? '⚠️' : '✅'}
            </span>
            {message}
          </div>
        </div>
      )}

      <div className="form-container">
        <form onSubmit={editingTestimonial ? handleUpdate : handleCreate} className="testimonial-form">
          <div className="form-header">
            <h2>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
            {editingTestimonial && (
              <span className="editing-badge">Editing: #{editingTestimonial.id}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="video-upload" className="file-input-label">
              <div className="file-input-content">
                <div className="file-input-icon">📹</div>
                <div className="file-input-text">
                  <div className="file-input-title">
                    {videoBase64 ? 'Video Selected' : 'Choose Video File'}
                  </div>
                  <div className="file-input-subtitle">
                    MP4, MOV, AVI up to 50MB
                  </div>
                </div>
              </div>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="file-input"
              />
            </label>
            
            {uploadProgress > 0 && (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="progress-text">Uploading... {uploadProgress}%</div>
              </div>
            )}
            
            {videoBase64 && (
              <div className="video-preview-container">
                <div className="preview-header">
                  <span>Video Preview</span>
                  <button 
                    type="button" 
                    onClick={() => setVideoBase64(null)}
                    className="preview-close"
                  >
                    ×
                  </button>
                </div>
                <video controls className="video-preview">
                  <source src={videoBase64} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!videoBase64 || uploadProgress > 0}
            >
              {uploadProgress > 0 ? (
                <>
                  <span className="btn-spinner"></span>
                  {editingTestimonial ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'
              )}
            </button>
            {editingTestimonial && (
              <button 
                type="button" 
                onClick={cancelEdit}
                className="btn btn-secondary"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="testimonials-section">
        <div className="section-header">
          <h2>Existing Testimonials</h2>
          <span className="testimonials-count">
            {testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎬</div>
            <h3>No Testimonials Yet</h3>
            <p>Get started by uploading your first video testimonial above.</p>
          </div>
        ) : (
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="card-header">
                  <span className="testimonial-id">Testimonial #{testimonial.id}</span>
                  <span className="upload-date">
                    {new Date(testimonial.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="video-container">
                  <video controls className="testimonial-video">
                    <source src={testimonial.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="card-actions">
                  <button 
                    onClick={() => startEdit(testimonial)}
                    className="btn btn-outline"
                  >
                    <span className="btn-icon">✏️</span>
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(testimonial.id)}
                    className="btn btn-danger"
                  >
                    <span className="btn-icon">🗑️</span>
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

export default TestimonialAdmin;