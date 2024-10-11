import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfileForm from './components/user-profile-form/UserProfileForm';
import LinksPage from './components/link-section/LinkSection';
import Header from './components/header/Header'; // Import the Header component

const App = () => {
  return (
    <Router>
      <Header />  {/* Add the Header so it appears on all pages */}
      <div>
        <Routes>
          {/* Define a route for the profile form */}
          <Route path="/" element={<UserProfileForm />} />

          {/* Define a route for the links section */}
          <Route path="/links" element={<LinksPage />} />

          {/* If you have a preview page, add it here */}
          {/* <Route path="/preview" element={<PreviewPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
