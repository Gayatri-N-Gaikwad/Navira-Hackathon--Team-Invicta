import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/training"
});

export const startChat = () => API.post("/start-chat");

export const sendMessage = (data) => API.post("/chat", data);

export const getQuizMessage = () => API.get("/message");

export const checkAnswer = (data) => API.post("/answer", data);

export const analyzeMessage = (data) => API.post("/analyze", data);