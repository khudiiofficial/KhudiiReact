import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminInquiries.css';

const API_URL = import.meta.env.VITE_BACKEND_PATH;

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [owner, setOwner] = useState({
    name: '',
    email: '',
    sender_email: '',
    smtp_host: '',
    smtp_port: 587,
    smtp_secure: 0,
    smtp_username: '',
    smtp_password: '',
    smtp_password_set: 0
  });
  const [loading, setLoading] = useState(true);
  
 const [cap,setcap]=useState('')
  const [editingOwner, setEditingOwner] = useState(false);
  const [ownerForm, setOwnerForm] = useState({
    name: '',
    email: '',
    sender_email: '',
    smtp_host: '',
    smtp_port: 587,
    smtp_secure: 0,
    smtp_username: '',
    smtp_password: '',
    smtp_password_set: 0
  });
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchInquiries();
    fetchOwner();
  }, [pagination.page, search]);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/inquiries`, {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: search
        },
        withCredentials: true
      });
      setInquiries(response.data.inquiries);
      setPagination(prev => ({
        ...prev,
        ...response.data.pagination
      }));
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      alert('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiryDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/admin/inquiries/${id}`, {
        withCredentials: true
      });
      setSelectedInquiry(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching inquiry details:', error);
      alert('Failed to load inquiry details');
    }
  };

  const fetchOwner = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/owner`, {
        withCredentials: true
      });
      setOwner(response.data);

      setOwnerForm({
        ...response.data,

        // Never receive or display stored password.
        // Empty means "keep current password".
        smtp_password: ''
      });
    } catch (error) {
      console.error('Error fetching owner:', error);
      alert('Failed to load owner information');
    }
  };

  const updateOwner = async (e) => {
    e.preventDefault();
     if(cap){
      console.log('bot detected')
      setcap('')
      return
    }

    try {
      await axios.put(`${API_URL}/admin/owner`, ownerForm, {
        withCredentials: true
      });
      await fetchOwner();

setEditingOwner(false);
      alert('Owner Iformation Updated Successfully!');
    } catch (error) {
      console.error('Error updating owner:', error);
      alert(error.response?.data?.error || 'Failed to Ppdate Owner Information');
    }
  };

  const deleteInquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      await axios.delete(`${API_URL}/admin/inquiries/${id}`, {
        withCredentials: true
      });
      setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
      alert('Inquiry deleted successfully!');
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('Failed to delete inquiry');
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Contact Inquiries Management</h1>
        <p>Manage all contact form submissions</p>
      </div>

      {/* Owner Information Section */}
      <div className="owner-section">
        <div className="section-header">
          <h2>Owner Information</h2>
          <button 
            className="btn-edit"
            onClick={() => setEditingOwner(!editingOwner)}
          >
            {editingOwner ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {editingOwner ? (
          <form onSubmit={updateOwner} className="owner-form">
                <input type="hidden" onChange={(e)=>{setcap(e.target.value)}} />
            <div className="form-group">
              <label>Owner Name:</label>
              <input
                type="text"
                value={ownerForm.name}
                onChange={(e) => setOwnerForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Notification Email (receive emails):</label>
              <input
                type="email"
                value={ownerForm.email}
                onChange={(e) => setOwnerForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label>Sender Email (send emails from):</label>
              <input
                type="email"
                value={ownerForm.sender_email}
                onChange={(e) => setOwnerForm(prev => ({ ...prev, sender_email: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
  <label>SMTP Host:</label>

  <input
    type="text"
    value={ownerForm.smtp_host || ''}
    onChange={(e) =>
      setOwnerForm(prev => ({
        ...prev,
        smtp_host: e.target.value
      }))
    }
    required
    placeholder="mail.example.com"
  />
</div>
<div className="form-group">
  <label>SMTP Port:</label>

  <input
    type="number"
    value={ownerForm.smtp_port || 587}
    onChange={(e) =>
      setOwnerForm(prev => ({
        ...prev,
        smtp_port: e.target.value
      }))
    }
    required
    placeholder="587"
  />
</div>
<div className="form-group">
  <label>SMTP Security:</label>

  <select
    value={String(ownerForm.smtp_secure ?? 0)}
    onChange={(e) =>
      setOwnerForm(prev => ({
        ...prev,
        smtp_secure: Number(e.target.value)
      }))
    }
    required
  >
    <option value="0">
      STARTTLS / TLS (usually port 587)
    </option>

    <option value="1">
      SSL/TLS (usually port 465)
    </option>
  </select>
</div>
<div className="form-group">
  <label>SMTP Username:</label>

  <input
    type="text"
    value={ownerForm.smtp_username || ''}
    onChange={(e) =>
      setOwnerForm(prev => ({
        ...prev,
        smtp_username: e.target.value
      }))
    }
    required
    placeholder="no-reply@example.com"
    autoComplete="off"
  />
</div>
<div className="form-group">
  <label>SMTP Password:</label>

  <input
    type="password"
    value={ownerForm.smtp_password || ''}
    onChange={(e) =>
      setOwnerForm(prev => ({
        ...prev,
        smtp_password: e.target.value
      }))
    }
    placeholder={
      owner.smtp_password_set
        ? "Leave blank to keep current password"
        : "Enter SMTP password"
    }
    autoComplete="new-password"
  />

  {owner.smtp_password_set ? (
    <small>
      SMTP password is already configured.
      Leave this blank to keep it unchanged.
    </small>
  ) : (
    <small>
      No SMTP password is currently configured.
    </small>
  )}
</div>
            <div className="form-actions">
              <button type="submit" className="btn-save">Save Changes</button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => {
                  setEditingOwner(false);
                  setOwnerForm(owner);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="owner-info">
            <p>
  <strong>Name:</strong> {owner.name}
</p>

<p>
  <strong>Notification Email:</strong>{' '}
  {owner.email}
</p>

<p>
  <strong>Sender Email:</strong>{' '}
  {owner.sender_email}
</p>

<p>
  <strong>SMTP Host:</strong>{' '}
  {owner.smtp_host || 'Not set'}
</p>

<p>
  <strong>SMTP Port:</strong>{' '}
  {owner.smtp_port || 'Not set'}
</p>

<p>
  <strong>SMTP Security:</strong>{' '}
  {Number(owner.smtp_secure) === 1
    ? 'SSL/TLS'
    : 'STARTTLS/TLS'}
</p>

<p>
  <strong>SMTP Username:</strong>{' '}
  {owner.smtp_username || 'Not set'}
</p>

<p>
  <strong>SMTP Password:</strong>{' '}
  {owner.smtp_password_set
    ? '••••••••'
    : 'Not set'}
</p>

<p>
  <small>
    Emails will be sent through{' '}
    {owner.smtp_host || 'the configured SMTP server'}{' '}
    from {owner.sender_email} to {owner.email}
  </small>
</p>
          </div>
        )}
      </div>

      {/* Inquiries Section */}
      <div className="inquiries-section">
        <div className="section-header">
          <h2>Contact Inquiries ({pagination.total})</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Name, Email, Phone, or Organizations..."
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {inquiries.length === 0 ? (
          <div className="no-data">No Inquiries Found</div>
        ) : (
          <>
            <div className="inquiries-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Organization</th>
                    <th>Message</th>
                    <th>Country</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td>{inquiry.name}</td>
                      <td>
                        <a href={`mailto:${inquiry.email}`}>
                          {inquiry.email}
                        </a>
                      </td>
                      <td>
                        <a href={`tel:${inquiry.phone}`}>
                          +{inquiry.country_code} {inquiry.phone}
                        </a>
                      </td>
                      <td>{inquiry.org_id || 'General'}</td>
                      <td className="message-cell">
                        {inquiry.message ? (
                          <div title={inquiry.message}>
                            {inquiry.message.length > 50 
                              ? `${inquiry.message.substring(0, 50)}...` 
                              : inquiry.message
                            }
                          </div>
                        ) : (
                          <em>No message</em>
                        )}
                      </td>
                      <td>{inquiry.country_name}</td>
                      <td>{formatDate(inquiry.created_at)}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-view"
                            onClick={() => fetchInquiryDetails(inquiry.id)}
                          >
                            View
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => deleteInquiry(inquiry.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="pagination">
                <button
                  disabled={pagination.page === 1}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                >
                  Previous
                </button>
                
                <span>
                  Page {pagination.page} of {pagination.pages}
                </span>
                
                <button
                  disabled={pagination.page === pagination.pages}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Inquiry Details Modal */}
      {showModal && selectedInquiry && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Inquiry Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="details-grid">
                <div className="detail-group">
                  <label>Name:</label>
                  <span>{selectedInquiry.name}</span>
                </div>
                
                <div className="detail-group">
                  <label>Email:</label>
                  <span>
                    <a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a>
                  </span>
                </div>
                
                <div className="detail-group">
                  <label>Phone:</label>
                  <span>
                    <a href={`tel:${selectedInquiry.phone}`}>
                      +{selectedInquiry.country_code} {selectedInquiry.phone}
                    </a>
                  </span>
                </div>
                
                <div className="detail-group">
                  <label>Country:</label>
                  <span>{selectedInquiry.country_name} ({selectedInquiry.country})</span>
                </div>
                
                {selectedInquiry.org_id && (
                  <div className="detail-group">
                    <label>Organization:</label>
                    <span>{selectedInquiry.org_id}</span>
                  </div>
                )}
                
                <div className="detail-group full-width">
                  <label>Message:</label>
                  <div className="message-content">
                    {selectedInquiry.message || 'No message provided'}
                  </div>
                </div>
                
                <div className="detail-group">
                  <label>Submitted:</label>
                  <span>{formatDate(selectedInquiry.created_at)}</span>
                </div>
                
                {selectedInquiry.updated_at && (
                  <div className="detail-group">
                    <label>Last Updated:</label>
                    <span>{formatDate(selectedInquiry.updated_at)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-close" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;