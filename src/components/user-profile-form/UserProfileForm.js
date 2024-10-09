import React, { useState, useCallback } from 'react';
import './UserProfileForm.scss';

const UserProfileForm = ({ setUserProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePicture: '',
    links: [{ platform: '', url: '' }],
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLinkChange = useCallback((index, event) => {
    const { name, value } = event.target;
    const updatedLinks = formData.links.map((link, i) =>
      i === index ? { ...link, [name]: value } : link
    );
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  }, [formData.links]);

  const addLinkField = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { platform: '', url: '' }],
    }));
  }, []);

  // New remove function for individual links
  const removeLinkField = useCallback((index) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Check required fields
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.profilePicture) newErrors.profilePicture = 'Profile picture URL is required';
    else if (!validateURL(formData.profilePicture)) newErrors.profilePicture = 'Invalid URL';

    formData.links.forEach((link, index) => {
      if (!link.platform || !link.url) {
        newErrors[`links_${index}`] = 'Both platform and URL are required';
      } else if (!validateURL(link.url)) {
        newErrors[`links_${index}`] = 'Invalid URL';
      }
    });

    setErrors(newErrors);

    // Stop submission if errors exist
    if (Object.keys(newErrors).length > 0) return;

    setUserProfile(formData);
  };

  return (
    <form className="user-profile-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className={errors.name ? 'error' : ''}
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'error' : ''}
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="profilePicture">Profile Picture URL:</label>
        <input
          type="text"
          name="profilePicture"
          id="profilePicture"
          value={formData.profilePicture}
          onChange={handleInputChange}
          className={errors.profilePicture ? 'error' : ''}
          required
        />
        {errors.profilePicture && <span className="error-message">{errors.profilePicture}</span>}
        {formData.profilePicture && validateURL(formData.profilePicture) && (
          <div className="profile-picture-preview">
            <img src={formData.profilePicture} alt="Profile Preview" />
          </div>
        )}
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
              className={errors[`links_${index}`] ? 'error' : ''}
              required
            />
            <input
              type="url"
              name="url"
              placeholder="URL (e.g., https://github.com/username)"
              value={link.url}
              onChange={(event) => handleLinkChange(index, event)}
              className={errors[`links_${index}`] ? 'error' : ''}
              required
            />
            {errors[`links_${index}`] && <span className="error-message">{errors[`links_${index}`]}</span>}
            
            {/* Remove button for each link */}
            <button type="button" onClick={() => removeLinkField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addLinkField}>Add Another Link</button>
      </div>

      <button type="submit" className="submit-button">Save Profile</button>
    </form>
  );
};

export default UserProfileForm;
