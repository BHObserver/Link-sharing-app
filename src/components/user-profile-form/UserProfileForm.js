import React, { useState } from 'react';
import ProfileCard from '../profile-card/ProfileCard';
import Input from '../input/Input';
import Button from '../button/Button';
import './UserProfileForm.scss';

const UserProfileForm = () => {
  // State to hold user data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [links, setLinks] = useState([{ platform: 'GitHub', url: '' }]);

  // Handle input change for form fields
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  // Handle link changes
  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index].url = value;
    setLinks(updatedLinks);
  };

  // Add a new link input
  const addNewLink = () => {
    setLinks([...links, { platform: 'New Platform', url: '' }]);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('User Data:', { name, email, imageUrl, links });
    // This is where we would handle the Firebase logic to save user data
  };

  return (
    <div className="user-profile-form">
      <form onSubmit={handleFormSubmit}>
        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => handleInputChange(e, setName)}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => handleInputChange(e, setEmail)}
        />
        <Input
          label="Image URL"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => handleInputChange(e, setImageUrl)}
        />
        {links.map((link, index) => (
          <Input
            key={index}
            label={`Link (${link.platform})`}
            placeholder="Enter link URL"
            value={link.url}
            onChange={(e) => handleLinkChange(index, e.target.value)}
          />
        ))}
        <Button onClick={addNewLink} type="button">Add Link</Button>
        <Button type="submit">Save</Button>
      </form>
      <ProfileCard imageUrl={imageUrl} name={name} email={email} links={links} />
    </div>
  );
};

export default UserProfileForm;
