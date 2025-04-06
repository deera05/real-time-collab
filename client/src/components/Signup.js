import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form);
      navigate('/');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Your SyncWrite Account</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;