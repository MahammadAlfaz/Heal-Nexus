import axios from 'axios';

const API_URL = 'http://localhost:8082/api';

export const signUpUser = async (userData: any) => {
  const formData = new FormData();

  // Append all fields from userData to formData
  for (const key in userData) {
    if (userData[key] !== null && userData[key] !== undefined) {
      // Handle nested objects like notificationPreferences
      if (typeof userData[key] === 'object' && !(userData[key] instanceof File)) {
        // Spring Boot expects nested properties with dot notation for @RequestParam
        // This part is not strictly needed for signup but is good practice.
        // The current backend doesn't use notificationPreferences on signup.
      } else {
        formData.append(key, userData[key]);
      }
    }
  }

  try {
    const response = await axios.post(`${API_URL}/auth/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || `Request failed with status code ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('Signup failed: No response from server. Please check your network connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message);
    }
  }
};

// You can move other API functions here as well
export const loginUser = async (email: string, password: string, userType: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password, userType });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || `Login failed with status ${error.response.status}`);
    }
    throw new Error(error.message || 'An unknown error occurred during login.');
  }
};

export const fetchAppointments = async (id: string, userType: 'patient' | 'doctor') => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${API_URL}/appointments/${userType}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const fetchDoctorPatients = async (doctorId: string) => {
    // This endpoint doesn't exist, but if it did, it would look like this:
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${API_URL}/doctors/${doctorId}/patients`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};