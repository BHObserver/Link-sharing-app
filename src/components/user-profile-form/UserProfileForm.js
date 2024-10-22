import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './UserProfileForm.scss';
import PreviewPage from '../preview/PreviewPage';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const UserProfileForm = ({ userProfile = {}, onProfileChange = () => {} }) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  // Debounced function to avoid excessive local storage updates
  const debouncedProfileChange = useCallback(debounce(onProfileChange, 300), []);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('userProfile');
    if (savedData) {
      formik.setValues(JSON.parse(savedData));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: userProfile.firstName || '',
      lastName: userProfile.lastName || '',
      email: userProfile.email || '',
      profilePicture: userProfile.profilePicture || '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'First name must be 15 characters or less')
        .required('First name is required'),
      lastName: Yup.string()
        .max(20, 'Last name must be 20 characters or less')
        .required('Last name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: (values) => {
      console.log('Form data submitted:', values);

      // Save form data to localStorage
      localStorage.setItem('userProfile', JSON.stringify(values));

      // Show notification
      setIsSaved(true);

      // Notify parent component about changes
      debouncedProfileChange(values);

      // Navigate to the links page after 1 second
      setTimeout(() => {
        navigate('/links');
      }, 1000);
    },
    enableReinitialize: true, // Reinitialize form values if userProfile changes
  });

  // Update localStorage and trigger live changes immediately when typing
  const handleInputChange = (e) => {
    formik.handleChange(e);
    const updatedValues = {
      ...formik.values,
      [e.target.name]: e.target.value,
    };

    localStorage.setItem('userProfile', JSON.stringify(updatedValues));
    debouncedProfileChange(updatedValues); // Trigger debounced profile change
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue('profilePicture', reader.result);
      const updatedValues = { ...formik.values, profilePicture: reader.result };
      localStorage.setItem('userProfile', JSON.stringify(updatedValues));
      debouncedProfileChange(updatedValues);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <div className="user-profile-form-container">
        <div>
          <h1>Profile Details</h1>
          <p>Add your details to create a personal touch to your profile.</p>
        </div>
        <form className="user-profile-form" onSubmit={formik.handleSubmit}>
          {/* Profile Picture Section */}
          <div className="form-group profile-picture-section">
            <div className="profile-picture-container">
              <span className="prof-label">Profile Picture</span>
              <div className="prof-label-input">
                <label htmlFor="profilePicture" className="profile-picture-label">
                  {formik.values.profilePicture ? (
                    <img src={formik.values.profilePicture} alt="Profile Preview" className="profile-picture" />
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
                {formik.errors.profilePicture && formik.touched.profilePicture && (
                  <div className="error-message">{formik.errors.profilePicture}</div>
                )}
                <p className="image-requirements">
                  Image must be below 1024x1024px. Use PNG, JPG, or BMP format.
                </p>
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="form-inputs">
            <div className="form-group">
              <label htmlFor="firstName">First name*</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formik.values.firstName}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className={formik.touched.firstName && formik.errors.firstName ? 'error' : ''}
                required
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error-message">* {formik.errors.firstName}</div>
            ) : null}

            <div className="form-group">
              <label htmlFor="lastName">Last name*</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formik.values.lastName}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className={formik.touched.lastName && formik.errors.lastName ? 'error' : ''}
                required
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error-message">* {formik.errors.lastName}</div>
            ) : null}

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                className={formik.touched.email && formik.errors.email ? 'error' : ''}
                required
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p className="error-message">* {formik.errors.email}</p>
            ) : null}
          </div>

          <div className="save-button-container">
            <button type="submit" className="save-button">
              Save
            </button>
          </div>

          {/* Show the notification if form is saved */}
          <div className={`save-notification ${isSaved ? 'visible' : ''}`}>
            Your changes have been successfully saved!
          </div>
        </form>
      </div>

      {/* Live Preview Section */}
      <div className="live-preview-section">
        <PreviewPage userProfile={formik.values} />
      </div>
    </div>
  );
};

export default UserProfileForm;
