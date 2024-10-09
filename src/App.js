import React from 'react';
import './App.scss';
import Header from './components/header/Header';
import UserProfileForm from './components/user-profile-form/UserProfileForm';

function App() {
  return (
    <div className="App">
      <Header />
      <UserProfileForm />
    </div>
  );
}

export default App;
