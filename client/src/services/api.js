import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// Categories
export const getCategories = () => api.get('/categories');

// Questions
export const getQuestions = (categoryId) => {
  if (categoryId) {
    return api.get(`/questions?category_id=${categoryId}`);
  }
  return api.get('/questions');
};
export const getQuestion = (id) => api.get(`/questions/${id}`);
export const createQuestion = (questionData) => api.post('/questions', questionData);

// Answers
export const getAnswers = (questionId) => api.get(`/answers/question/${questionId}`);
export const createAnswer = (answerData) => api.post('/answers', answerData);

export default api;