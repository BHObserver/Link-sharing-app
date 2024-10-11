import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './UserProfileForm.scss';  // Make sure the SCSS file is linked correctly

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any form validation or submission logic here
  };

  return (
    <div className='user-profile-form-container'>
        <div>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile.</p>
      </div>
    <form className="user-profile-form" onSubmit={handleSubmit}>
        <div className="form-group profile-picture-section">
          <div className='profile-picture-container'>
          <span className='prof-label'>Profile Picture</span>
            <div className='prof-label-input'>
                <label htmlFor="profilePicture" className="profile-picture-label">
                  {formData.profilePicture ? (
                    <img src={formData.profilePicture} alt="Profile Preview" className="profile-picture" />
                  ) : (
                    <div className="profile-picture-placeholder">Change Image</div>
                  )}
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  hidden
                />
                <p className="image-requirements">
                  Image must be below 1024x1024px. Use PNG, JPG, or BMP format.
                </p>
              </div>
            </div>
          </div>

      <div className='form-inputs'>
        <div className="form-group">
          <label htmlFor="firstName">First name*</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last name*</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>    
      </div>
        <div className="save-notification">
          Your changes have been successfully saved!
        </div>
    </form>
      <div className='save-button-container'>
        <button type="submit" className="save-button">
          Save
        </button>
      </div>

  </div>

    
  );
};

export default UserProfileForm;
