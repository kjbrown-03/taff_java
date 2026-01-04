import api from './api';

class AuthService {

  async login(username, password) {
    const response = await api.post('/auth/login', {
      username,
      password
    });

    if (response.data.token) {
      const user = {
        username: response.data.username,
        role: response.data.roles
      };

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(user));
    }

    return response.data;
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  getRedirectPathByRole() {
    const role = this.getUserRole();

    switch (role) {
      case 'ADMIN':
        return '/dashboard/admin';
      case 'CLIENT':
        return '/dashboard/client';
      case 'EMPLOYEE':
      case 'RECEPTIONIST':
      case 'MANAGER':
        return '/dashboard/employee';
      default:
        return '/';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
