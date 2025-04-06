// client/src/components/Landing.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="logo-container">
        <h1 className="logo">Sync<span>Write</span></h1>
        <p className="tagline">Collaborate. Create. Conquer.</p>
        <div className="button-group">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
