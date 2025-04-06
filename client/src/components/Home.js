import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="auth-container">
      <h2>Welcome to SyncWrite ✨</h2>
      <p>Please choose an option to continue:</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;