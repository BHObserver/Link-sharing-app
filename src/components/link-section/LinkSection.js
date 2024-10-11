import React, { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import StrictModeDroppable from '../StrictModeDropable/StrictModeDropable';
import './LinksPage.scss'; // Ensure SCSS file is correct



const platformOptions = [`${<></>}GitHub`, 'YouTube', 'Twitter', 'LinkedIn', 'Instagram'];

const LinksPage = () => {
  const [links, setLinks] = useState([{ platform: '', url: '' }]);
  const navigate = useNavigate();

  // Function to handle link input changes
  const handleLinkChange = (index, event) => {
    const { name, value } = event.target;
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, [name]: value } : link
    );
    setLinks(updatedLinks);
  };

  // Add new link field
  const addLinkField = () => {
    setLinks([...links, { platform: '', url: '' }]);
  };

  // Remove a link
  const removeLinkField = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  // Handle reordering after drag
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(links);
    const [movedLink] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedLink);

    setLinks(reorderedLinks);
  };

  return (
    <div className="links-page">
      <h1>Customize your links</h1>
      <p>Add/edit/remove links below and then share all your profiles with the world!</p>

      <button type="button" className="add-link-button" onClick={addLinkField}>
        + Add new link
      </button>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* Replaced Droppable with StrictModeDroppable */}
        <StrictModeDroppable droppableId="links">
          {(provided) => (
            <div
              className="links-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {links.map((link, index) => (
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
          <div className='save-button-container'>
            <button type="button" className="save-button" onClick={() => navigate('/')}>
              Save
            </button>
          </div>
    </div>
  );
};

export default LinksPage;
