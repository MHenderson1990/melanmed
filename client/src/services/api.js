const API_URL = 'http://localhost:5001/api';

// get token from localStorage
const getToken = () => localStorage.getItem('token');

// DOCTORS
export const getAllDoctors = async () => {
  const response = await fetch(`${API_URL}/doctors`);
  return response.json();
};

export const getDoctorById = async (id) => {
  const response = await fetch(`${API_URL}/doctors/${id}`);
  return response.json();
};

// AUTH
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// APPOINTMENTS
export const bookAppointment = async (appointmentData) => {
  const response = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(appointmentData)
  });
  return response.json();
};

export const getMyAppointments = async () => {
  const response = await fetch(`${API_URL}/appointments/mine`, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return response.json();
};

export const cancelAppointment = async (id) => {
  const response = await fetch(`${API_URL}/appointments/${id}/cancel`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return response.json();
};

// REVIEWS
export const getDoctorReviews = async (doctorId) => {
  const response = await fetch(`${API_URL}/reviews/${doctorId}`);
  return response.json();
};

export const createReview = async (reviewData) => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(reviewData)
  });
  return response.json();
};

// AI CHAT
export const chatWithAI = async (message, doctors) => {
  const response = await fetch(`${API_URL}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, doctors })
  });
  return response.json();
};