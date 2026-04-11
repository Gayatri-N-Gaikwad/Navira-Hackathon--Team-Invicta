import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Training API endpoints
export const trainingAPI = {
  // Get random message for classification training
  getRandomMessage: () => api.get('/train/message'),
  
  // Check user's answer
  checkAnswer: (message, userChoice) => api.post('/train/answer', { message, userChoice }),
  
  // Start scam chat simulation
  startScamChat: () => api.post('/train/start-chat'),
  
  // Continue chat with scammer AI
  continueChat: (scenario, history, message) => api.post('/train/chat', { scenario, history, message }),
  
  // Analyze user's message
  analyzeMessage: (message) => api.post('/train/analyze', { message }),
};

export default trainingAPI;
