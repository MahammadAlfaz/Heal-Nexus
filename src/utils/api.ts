import axios from 'axios';

const API_BASE_URL = '/api';

// Add JWT token to requests if available
axios.interceptors.request.use(
  (config) => {
    // Skip adding token for auth endpoints
    if (config.url?.includes('/auth/login') || config.url?.includes('/auth/signup')) {
      return config;
    }
    
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const approveDoctor = async (email: string) => {
  const response = await axios.post(`${API_BASE_URL}/doctors/approve/${email}`);
  return response.data;
};

export const rejectDoctor = async (email: string) => {
  const response = await axios.post(`${API_BASE_URL}/doctors/reject/${email}`);
  return response.data;
};

export const updateProfile = async (id: string, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/patient/profile/${id}`, data);
  return response.data;
};

export const fetchPatientReports = async (patientId: string) => {
  const response = await axios.get(`${API_BASE_URL}/reports/patient/${patientId}`);
  return response.data;
};

export const fetchAppointments = async (userId: string, userType: string) => {
  const response = await axios.get(`${API_BASE_URL}/appointments/${userType}/${userId}`);
  return response.data;
};

export const fetchDoctorReports = async (doctorId: string) => {
  const response = await axios.get(`${API_BASE_URL}/reports/doctor/${doctorId}`);
  return response.data;
};

export const fetchProfile = async (userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/auth/profile/${userId}`);
  return response.data;
};

export const fetchHospitals = async () => {
  const response = await axios.get(`${API_BASE_URL}/hospitals`);
  return response.data;
};

export const createHospital = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/hospitals`, data);
  return response.data;
};

export const updateHospital = async (id: string, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/hospitals/${id}`, data);
  return response.data;
};

export const deleteHospital = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/hospitals/${id}`);
  return response.data;
};

export const fetchDoctors = async () => {
  const response = await axios.get(`${API_BASE_URL}/doctors`);
  return response.data;
};

export const createAppointment = async (appointmentData: any) => {
  const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData);
  return response.data;
};

export const fetchDoctorAppointmentsByDate = async (doctorId: string, date: string) => {
  const response = await axios.get(`${API_BASE_URL}/appointments/doctor/${doctorId}/date/${date}`);
  return response.data;
};

export const uploadMedicalReport = async (file: File, reportType: string, reportDate: string, description: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('reportType', reportType);
  formData.append('reportDate', reportDate);
  formData.append('description', description);

  const response = await axios.post(`${API_BASE_URL}/reports/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const scanMedicineImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/scan/medicine`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const queryAI = async (query: string, language: string) => {
  const response = await axios.post(`${API_BASE_URL}/ai/query`, {
    message: query,
    language,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string, userType: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
    userType,
  });
  const data = response.data;
  if (data.token) {
    localStorage.setItem('authToken', data.token);
  }
  return data;
};

export const signUpUser = async (userData: any) => {
  // Always use FormData for multipart upload
  const formData = new FormData();

  // Append all fields to FormData
  Object.keys(userData).forEach(key => {
    if (key === 'profileImage' && userData[key] instanceof File) {
      formData.append('profileImage', userData[key]);
    } else if (key === 'notificationPreferences') {
      // Handle nested object
      formData.append(key, JSON.stringify(userData[key]));
    } else {
      formData.append(key, userData[key] || '');
    }
  });

  const response = await axios.post(`${API_BASE_URL}/auth/signup`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
