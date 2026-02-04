import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, createQuestion } from '../services/api';

function NewQuestion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
    loadCategories();
  }, [navigate]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !body.trim() || !categoryId) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await createQuestion({
        title,
        body,
        category_id: categoryId,
        user_id: user.id,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create question');
    }
  };

  return (
    <div className="new-question">
      <header className="detail-header">
        <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
        <h1>HomesteadHub</h1>
      </header>

      <div className="form-container">
        <h2>Ask a Question</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category:</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your question?"
              required
            />
          </div>

          <div className="form-group">
            <label>Details:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Provide more details about your question..."
              rows={6}
              required
            />
          </div>

          <button type="submit">Post Question</button>
        </form>
      </div>
    </div>
  );
}

export default NewQuestion;