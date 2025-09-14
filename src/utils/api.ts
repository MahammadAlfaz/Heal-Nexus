const API_BASE_URL = 'http://localhost:8081/api';

export async function fetchHospitals(): Promise<any> {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/hospitals`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch hospitals');
  return response.json();
}

export async function createHospital(hospital: any): Promise<any> {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/hospitals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(hospital),
  });
  if (!response.ok) throw new Error('Failed to create hospital');
  return response.json();
}

export async function updateHospital(id: string, hospital: any): Promise<any> {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(hospital),
  });
  if (!response.ok) throw new Error('Failed to update hospital');
  return response.json();
}

export async function deleteHospital(id: string): Promise<boolean> {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/hospitals/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete hospital');
  return true;
}

export async function fetchAppointments(patientId: string, userType: string): Promise<any> {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/appointments?patientId=${patientId}&userType=${userType}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch appointments');
  return response.json();
}

export async function fetchPatientReports(patientId: string): Promise<any> {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/reports/patient/${patientId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch patient reports');
  return response.json();
}

export async function fetchProfile(patientId: string): Promise<any> {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/auth/profile/${patientId}`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
}

export async function updateProfile(patientId: string, profileData: any): Promise<any> {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/auth/profile/${patientId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
}

export async function loginUser(email: string, password: string, userType: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, userType }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}

export async function signUpUser(userData: any): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Signup failed');
  return response.json();
}

export async function queryAI(query: string, language: string): Promise<any> {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/ai/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ message: query, language: language }),
  });
  if (!response.ok) throw new Error('AI query failed');
  return response.json();
}

export async function fetchDoctorPatients(doctorId: string): Promise<any> {
  const authToken = localStorage.getItem('authToken');
  const response = await fetch(`${API_BASE_URL}/doctor/${doctorId}/patients`, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch doctor patients');
  return response.json();
}

export async function scanMedicineImage(imageFile: File): Promise<any> {
  const authToken = localStorage.getItem('authToken');
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch(`${API_BASE_URL}/scan/medicine`, {
    method: 'POST',
    headers: {
      // 'Content-Type' is set automatically by the browser for FormData
      'Authorization': `Bearer ${authToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to scan medicine. The server could not be reached.' }));
    throw new Error(errorData.error || errorData.message || 'Failed to scan medicine');
  }
  return response.json();
}
