import React, { useState } from 'react';
import './UserProfileForm.scss';

const UserProfileForm = ({ setUserProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePicture: '',
    links: [{ platform: '', url: '' }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLinkChange = (index, event) => {
    const { name, value } = event.target;
    const updatedLinks = formData.links.map((link, i) =>
      i === index ? { ...link, [name]: value } : link
    );
    setFormData({ ...formData, links: updatedLinks });
  };

  const addLinkField = () => {
    setFormData({ ...formData, links: [...formData.links, { platform: '', url: '' }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.profilePicture) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
  
    setUserProfile(formData);
  };
  

  return (
    <form className="user-profile-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Profile Picture URL:</label>
        <input
          type="text"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleInputChange}
        />
      </div>

      <div className="links-section">
        <label>Links:</label>
        {formData.links.map((link, index) => (
          <div key={index} className="link-inputs">
            <input
              type="text"
              name="platform"
              placeholder="Platform (e.g., GitHub)"
              value={link.platform}
              onChange={(event) => handleLinkChange(index, event)}
              required
            />
            <input
              type="url"
              name="url"
              placeholder="URL (e.g., https://github.com/username)"
              value={link.url}
              onChange={(event) => handleLinkChange(index, event)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addLinkField}>Add Another Link</button>
      </div>

      <button type="submit" className="submit-button">Save Profile</button>
    </form>
  );
};

export default UserProfileForm;
