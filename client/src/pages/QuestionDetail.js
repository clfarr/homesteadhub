import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestion, getAnswers, createAnswer } from '../services/api';

function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
    loadQuestion();
    loadAnswers();
  }, [id, navigate]);

  const loadQuestion = async () => {
    try {
      const response = await getQuestion(id);
      setQuestion(response.data);
    } catch (err) {
      console.error('Failed to load question:', err);
    }
  };

  const loadAnswers = async () => {
    try {
      const response = await getAnswers(id);
      setAnswers(response.data);
    } catch (err) {
      console.error('Failed to load answers:', err);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    setError('');

    if (!newAnswer.trim()) {
      setError('Answer cannot be empty');
      return;
    }

    try {
      await createAnswer({
        body: newAnswer,
        user_id: user.id,
        question_id: id,
      });
      setNewAnswer('');
      loadAnswers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post answer');
    }
  };

  if (!question) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="question-detail">
      <header className="detail-header">
        <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
        <h1>HomesteadHub</h1>
      </header>

      <div className="question-section">
        <h2>{question.title}</h2>
        <p className="question-meta">
          Asked by {question.users?.username} on{' '}
          {new Date(question.created_at).toLocaleDateString()}
        </p>
        <p className="question-body">{question.body}</p>
      </div>

      <div className="answers-section">
        <h3>Answers ({answers.length})</h3>
        
        {answers.length === 0 ? (
          <p>No answers yet. Be the first to help!</p>
        ) : (
          <ul className="answers-list">
            {answers.map((answer) => (
              <li key={answer.id} className="answer-card">
                <p>{answer.body}</p>
                <p className="answer-meta">
                  Answered by {answer.users?.username} on{' '}
                  {new Date(answer.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="new-answer-section">
        <h3>Your Answer</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmitAnswer}>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your answer here..."
            rows={5}
          />
          <button type="submit">Post Answer</button>
        </form>
      </div>
    </div>
  );
}

export default QuestionDetail;