import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const { token, role, userId } = response.data;

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId);

      // Set default axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return {
        token,
        role,
        userId
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    delete axios.defaults.headers.common['Authorization'];
  },

  getCurrentUser() {
    return {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      userId: localStorage.getItem('userId')
    };
  }
}; 