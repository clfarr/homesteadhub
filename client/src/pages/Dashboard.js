import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, getQuestions } from '../services/api';

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const loadQuestions = async (categoryId) => {
    try {
      const response = await getQuestions(categoryId);
      setQuestions(response.data);
      setSelectedCategory(categoryId);
    } catch (err) {
      console.error('Failed to load questions:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>HomesteadHub</h1>
        <div className="user-info">
          <span>Welcome, {user?.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className={selectedCategory === category.id ? 'active' : ''}
                onClick={() => loadQuestions(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
          <button 
            className="new-question-btn"
            onClick={() => navigate('/question/new')}
          >
            Ask a Question
          </button>
        </aside>

        <main className="main-content">
          {selectedCategory ? (
            <>
              <h2>{getCategoryName(selectedCategory)}</h2>
              {questions.length === 0 ? (
                <p>No questions in this category yet. Be the first to ask!</p>
              ) : (
                <ul className="questions-list">
                  {questions.map((question) => (
                    <li 
                      key={question.id} 
                      className="question-card"
                      onClick={() => navigate(`/question/${question.id}`)}
                    >
                      <h3>{question.title}</h3>
                      <p className="question-meta">
                        Asked by {question.users?.username} on{' '}
                        {new Date(question.created_at).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="select-prompt">Select a category to view its questions</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;