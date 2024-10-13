import React, { useState } from 'react';
import './UserProfileForm.scss'; // Ensure SCSS file is linked correctly
import PreviewPage from '../preview/PreviewPage'; // Import PreviewPage component

const UserProfileForm = ({ userProfile = {}, onProfileChange = () => {} }) => {
  const [formData, setFormData] = useState({
    firstName: userProfile.firstName || '',
    lastName: userProfile.lastName || '',
    email: userProfile.email || '',
    profilePicture: userProfile.profilePicture || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    onProfileChange({ ...formData, [name]: value }); // Call the parent handler
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      onProfileChange({ ...formData, profilePicture: reader.result }); // Update profile picture
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add any form validation or submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className='container'>
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

          <div className="save-button-container">
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
          
          <div className="save-notification">
            Your changes have been successfully saved!
          </div>
        </form>
      </div>
      
      {/* Live Preview Section */}
      <div className="live-preview-section">
        <PreviewPage userProfile={formData} />
      </div>
    </div>
  );
};

export default UserProfileForm;
