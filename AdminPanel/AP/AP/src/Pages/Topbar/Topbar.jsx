import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_PATH;

const TopbarAdmin = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({ text: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [cap,setcap]=useState('')



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

  // Fetch all contents
  const fetchContents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/topbar');
      if (response.data.success) {
        setContents(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching contents:', error);
      showMessage('Error fetching contents', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Create new content
  const handleCreate = async (e) => {
    e.preventDefault();
     if(cap){
      console.log('bot detected')
      setcap('')
      return
    }



    if (!formData.text.trim()) {
      showMessage('Text content is required', 'error');
      return;
    }

    try {
      const response = await api.post('/api/topbar', formData);
      if (response.data.success) {
        showMessage('Content created successfully!');
        setFormData({ text: '' });
        fetchContents();
      }
    } catch (error) {
      console.error('Error creating content:', error);
      showMessage('Error creating content', 'error');
    }
  };

  // Update content
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      showMessage('Text content is required', 'error');
      return;
    }

    try {
      const response = await api.put(`/api/topbar/${editingContent.id}`, formData);
      if (response.data.success) {
        showMessage('Content updated successfully!');
        setEditingContent(null);
        setFormData({ text: '' });
        fetchContents();
      }
    } catch (error) {
      console.error('Error updating content:', error);
      showMessage('Error updating content', 'error');
    }
  };

  // Delete content
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }

    try {
      const response = await api.delete(`/api/topbar/${id}`);
      if (response.data.success) {
        showMessage('Content deleted successfully!');
        fetchContents();
      }
    } catch (error) {
      console.error('Error deleting content:', error);
      showMessage('Error deleting content', 'error');
    }
  };

  // Start editing
  const startEdit = (content) => {
    setEditingContent(content);
    setFormData({ text: content.text });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingContent(null);
    setFormData({ text: '' });
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
    formActions: {
      display: 'flex',
      gap: '10px',
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
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    },
    contentCard: {
      background: 'white',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    contentText: {
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#333',
      marginBottom: '15px',
    },
    contentMeta: {
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
  };

  // Hover effects
  const btnHover = {
    btnPrimaryHover: { backgroundColor: '#0056b3' },
    btnSecondaryHover: { backgroundColor: '#545b62' },
    btnEditHover: { backgroundColor: '#1e7e34' },
    btnDeleteHover: { backgroundColor: '#c82333' },
  };

  return (
    <div style={styles.admin}>
      <h1>Topbar Content Management</h1>
      
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
        onSubmit={editingContent ? handleUpdate : handleCreate} 
        style={styles.form}
      >
        
    <input type="hidden" onChange={(e)=>{setcap(e.target.value)}} />


        <h2>{editingContent ? 'Edit Content' : 'Add New Content'}</h2>
        <div style={styles.formGroup}>
          <label htmlFor="text" style={styles.label}>
            Content Text:
          </label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="Enter topbar content text..."
            rows="3"
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.formActions}>
          <button 
            type="submit" 
            style={{ ...styles.btn, ...styles.btnPrimary }}
            onMouseOver={(e) => e.target.style.backgroundColor = btnHover.btnPrimaryHover.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = styles.btnPrimary.backgroundColor}
          >
            {editingContent ? 'Update' : 'Create'}
          </button>
          {editingContent && (
            <button 
              type="button" 
              onClick={cancelEdit}
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onMouseOver={(e) => e.target.style.backgroundColor = btnHover.btnSecondaryHover.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = styles.btnSecondary.backgroundColor}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Content List */}
      <div style={styles.contentList}>
        <h2>Existing Contents</h2>
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : contents.length === 0 ? (
          <div style={styles.emptyState}>
            No content found. Create your first topbar content!
          </div>
        ) : (
          <div style={styles.contentGrid}>
            {contents.map((content) => (
              <div key={content.id} style={styles.contentCard}>
                <div style={styles.contentText}>{content.text}</div>
                <div style={styles.contentMeta}>
                  <small style={styles.metaText}>
                    Created: {new Date(content.created_at).toLocaleDateString()}
                  </small>
                  <small style={styles.metaText}>
                    Updated: {new Date(content.updated_at).toLocaleDateString()}
                  </small>
                </div>
                <div style={styles.contentActions}>
                  <button
                    onClick={() => startEdit(content)}
                    style={{ ...styles.btn, ...styles.btnEdit, flex: 1 }}
                    onMouseOver={(e) => e.target.style.backgroundColor = btnHover.btnEditHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.btnEdit.backgroundColor}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(content.id)}
                    style={{ ...styles.btn, ...styles.btnDelete, flex: 1 }}
                    onMouseOver={(e) => e.target.style.backgroundColor = btnHover.btnDeleteHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.btnDelete.backgroundColor}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Responsive styles for mobile */}
      <style>
        {`
          @media (max-width: 768px) {
            .content-grid {
              grid-template-columns: 1fr !important;
            }
            
            .content-meta {
              flex-direction: column;
              gap: 5px;
            }
            
            .form-actions {
              flex-direction: column;
            }
            
            button {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TopbarAdmin;