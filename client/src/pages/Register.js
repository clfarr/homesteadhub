import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    
    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      await register({ username, email, password });
      navigate('/login');
    } catch (err) {
      setErrors({ form: err.response?.data?.error || 'Registration failed' });
    }
  };

  return (
    <div className="auth-container">
      <h1>HomesteadHub</h1>
      <h2>Register</h2>
      
      {errors.form && <div className="error-message">{errors.form}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <span className="field-error">{errors.username}</span>}
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>
        
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
        </div>
        
        <div className="form-group checkbox">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <label>I agree to the Terms and Conditions</label>
          {errors.agreeTerms && <span className="field-error">{errors.agreeTerms}</span>}
        </div>
        
        <button type="submit">Register</button>
      </form>
      
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;