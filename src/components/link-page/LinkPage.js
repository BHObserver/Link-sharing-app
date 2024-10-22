import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import StrictModeDroppable from '../StrictModeDropable/StrictModeDropable';
import Select from 'react-select';
import { FaGithub, FaYoutube, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PreviewPage from '../preview/PreviewPage';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './LinksPage.scss';

// Platform options with icons
const platformOptions = [
  { value: 'GitHub', label: <><FaGithub /> GitHub</> },
  { value: 'YouTube', label: <><FaYoutube /> YouTube</> },
  { value: 'LinkedIn', label: <><FaLinkedin /> LinkedIn</> },
  { value: 'Instagram', label: <><FaInstagram /> Instagram</> },
  { value: 'Twitter', label: <><FaTwitter /> Twitter</> }
];

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  links: Yup.array().of(
    Yup.object().shape({
      platform: Yup.string().required('Platform is required'),
      url: Yup.string().url('Invalid URL').required('URL is required')
    })
  )
});

const LinksPage = ({ userProfile, links = [], onLinksChange = () => {} }) => {
  const [currentLinks, setCurrentLinks] = useState(links);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentLinks(links);
  }, [links]);

  useEffect(() => {
    const savedLinks = localStorage.getItem('userLinks');
    if (savedLinks) {
      setCurrentLinks(JSON.parse(savedLinks));
    }
  }, []);

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

  const handleSave = (values) => {
    console.log('Links saved:', values.links);
    localStorage.setItem('userLinks', JSON.stringify(values.links));
  };

  return (
    <Formik
      initialValues={{ links: currentLinks }}
      validationSchema={validationSchema}
      onSubmit={handleSave}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className="links-page-container">
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
                    {values.links.map((link, index) => (
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
                                onChange={(selectedOption) => {
                                  setFieldValue(`links[${index}].platform`, selectedOption ? selectedOption.value : '');
                                }}
                                placeholder="Select Platform"
                                isClearable
                              />
                              <ErrorMessage name={`links[${index}].platform`} component="div" className="error-message" />

                              <label htmlFor={`url-${index}`}>Link</label>
                              <Field
                                type="url"
                                name={`links[${index}].url`}
                                placeholder="https://example.com"
                                className="url-input"
                                value={values.links[index].url || ''}
                                onChange={(e) => setFieldValue(`links[${index}].url`, e.target.value)}
                              />
                              <ErrorMessage name={`links[${index}].url`} component="div" className="error-message" />
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
              <button type="submit" className="save-button">
                Save
              </button>
            </div>
          </div>

          <div className="live-preview-section">
            <PreviewPage userProfile={{ ...userProfile, links: values.links }} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LinksPage;
