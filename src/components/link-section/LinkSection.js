import React, { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import StrictModeDroppable from '../StrictModeDropable/StrictModeDropable';
import PreviewPage from '../preview/PreviewPage'; // Import PreviewPage for live preview
import './LinksPage.scss'; // Ensure SCSS file is correct

const platformOptions = ['GitHub', 'YouTube', 'Twitter', 'LinkedIn', 'Instagram'];

const LinksPage = ({ userProfile, links = [], onLinksChange = () => {} }) => {
  const [currentLinks, setCurrentLinks] = useState(links);

  const handleLinkChange = (index, event) => {
    const { name, value } = event.target;
    const updatedLinks = currentLinks.map((link, i) =>
      i === index ? { ...link, [name]: value } : link
    );
    setCurrentLinks(updatedLinks);
    onLinksChange(updatedLinks); // Call the parent handler
  };

  const addLinkField = () => {
    const newLinks = [...currentLinks, { platform: '', url: '' }];
    setCurrentLinks(newLinks);
    onLinksChange(newLinks); // Update parent
  };

  const removeLinkField = (index) => {
    const updatedLinks = currentLinks.filter((_, i) => i !== index);
    setCurrentLinks(updatedLinks);
    onLinksChange(updatedLinks); // Update parent
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedLinks = Array.from(currentLinks);
    const [movedLink] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedLink);
    setCurrentLinks(reorderedLinks);
    onLinksChange(reorderedLinks); // Update parent on drag end
  };

  return (
    <div className="links-page-container">
      {/* Links Editing Section */}
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
                {Array.isArray(currentLinks) && currentLinks.map((link, index) => (
                  <Draggable key={`link-${index}`} draggableId={`link-${index}`} index={index}>
                    {(provided) => (
                      <div
                        className="link-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="link-header">
                          <span>= Link #{index + 1}</span>
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
                          <select
                            name="platform"
                            value={link.platform}
                            onChange={(event) => handleLinkChange(index, event)}
                            required
                          >
                            <option value="">Select Platform</option>
                            {platformOptions.map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>

                          <label htmlFor={`url-${index}`}>Link</label>
                          <input
                            type="url"
                            name="url"
                            placeholder="https://example.com"
                            value={link.url}
                            onChange={(event) => handleLinkChange(index, event)}
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
          <button type="button" className="save-button" onClick={() => console.log('Links saved:', currentLinks)}>
            Save
          </button>
        </div>
      </div>

      {/* Live Preview Section */}
      <div className="live-preview-section">
        <h2>Live Profile & Links Preview</h2>
        {/* Merge links into userProfile and pass to PreviewPage */}
        <PreviewPage userProfile={{ ...userProfile, links: currentLinks }} />
      </div>
    </div>
  );
};

export default LinksPage;
