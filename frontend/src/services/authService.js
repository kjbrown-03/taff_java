import api from './api';

class AuthService {

  // No need for actual login method anymore - handled in Login.jsx
  async login(username, password) {
    // This method is now handled directly in Login.jsx
    // Keeping it for backward compatibility
    return Promise.resolve({
      token: 'dummy-token',
      username: username || 'Utilisateur',
      roles: ['ADMIN']
    });
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRole() {
    // Get role from localStorage (new system)
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      return userRole;
    }
    // Fallback to old system
    const user = this.getCurrentUser();
    return user ? user.role[0] : null;
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
    // For development, always return true to bypass authentication
    // In production, uncomment the line below
    // return !!localStorage.getItem('token');
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
