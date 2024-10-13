import React, { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import StrictModeDroppable from '../StrictModeDropable/StrictModeDropable';
import Select from 'react-select';
import { FaGithub, FaYoutube, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import PreviewPage from '../preview/PreviewPage';

import './LinksPage.scss'; // Ensure SCSS file is correct

// Create an array of options with icons and labels
const platformOptions = [
  { value: 'GitHub', label: <><FaGithub /> GitHub</> },
  { value: 'YouTube', label: <><FaYoutube /> YouTube</> },
  { value: 'LinkedIn', label: <><FaLinkedin /> LinkedIn</> },
  { value: 'Instagram', label: <><FaInstagram /> Instagram</> }, 
  { value: 'Twitter', label: <><FaTwitter /> Twitter</> }
];

const LinksPage = ({ userProfile, links = [], onLinksChange = () => {} }) => {
  const [currentLinks, setCurrentLinks] = useState(links);
  const navigate = useNavigate(); // Initialize navigate

  // Handle platform selection change
  const handlePlatformChange = (index, selectedOption) => {
    const updatedLinks = currentLinks.map((link, i) =>
      i === index ? { ...link, platform: selectedOption ? selectedOption.value : '' } : link
    );
    setCurrentLinks(updatedLinks);
    onLinksChange(updatedLinks);
  };

  // Handle URL input change
  const handleUrlChange = (index, event) => {
    const updatedLinks = currentLinks.map((link, i) =>
      i === index ? { ...link, url: event.target.value } : link
    );
    setCurrentLinks(updatedLinks);
    onLinksChange(updatedLinks);
  };

  const addLinkField = () => {
    const newLinks = [...currentLinks, { platform: '', url: '' }];
    setCurrentLinks(newLinks);
    onLinksChange(newLinks);
  };

  const removeLinkField = (index) => {
    const updatedLinks = currentLinks.filter((_, i) => i !== index);
    setCurrentLinks(updatedLinks);
    onLinksChange(updatedLinks);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedLinks = Array.from(currentLinks);
    const [movedLink] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedLink);
    setCurrentLinks(reorderedLinks);
    onLinksChange(reorderedLinks);
  };

  // Handle save and redirect to /preview
  const handleSave = () => {
    console.log('Links saved:', currentLinks);
    // After saving, navigate to the preview page
    navigate('/preview');
  };

  return (
    <div className="links-page-container">
      <div className="links-editor">
        <h1>Customize your links</h1>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>

        <button type="button" className="add-link-button" onClick={addLinkField}>
          + Add new link
        </button>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <StrictModeDroppable droppableId="links">
            {(provided) => (
              <div className="links-container" {...provided.droppableProps} ref={provided.innerRef}>
                {Array.isArray(currentLinks) &&
                  currentLinks.map((link, index) => (
                    <Draggable key={`link-${index}`} draggableId={`link-${index}`} index={index}>
                      {(provided) => (
                        <div
                          className="link-card"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="link-header">
                            <span>Link #{index + 1}</span>
                            <button
                              type="button"
                              className="remove-button"
                              onClick={() => removeLinkField(index)}
                            >
                              Remove
                            </button>
                          </div>

                          <div className="link-inputs">
                            <label htmlFor={`platform-${index}`}>Platform</label>
                            <Select
                              options={platformOptions}
                              value={platformOptions.find(option => option.value === link.platform)}
                              onChange={(selectedOption) => handlePlatformChange(index, selectedOption)}
                              placeholder="Select Platform"
                              isClearable
                            />

                            <label htmlFor={`url-${index}`}>Link</label>
                            <input
                              type="url"
                              name="url"
                              placeholder="https://example.com"
                              value={link.url}
                              onChange={(event) => handleUrlChange(index, event)}
                              required
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>

        <div className="save-button-container">
          <button type="button" className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>

      <div className="live-preview-section">
        <PreviewPage userProfile={{ ...userProfile, links: currentLinks }} />
      </div>
    </div>
  );
};

export default LinksPage;
