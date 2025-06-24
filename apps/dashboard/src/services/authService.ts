interface LoginCredentials {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

// Mock API - in real project, backend endpoints will be used
export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user validation
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      return {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin'
      };
    }
    
    throw new Error('Invalid username or password');
  },

  async checkSession(): Promise<User | null> {
    // Simulated session check
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = localStorage.getItem('auth_token');
    if (token) {
      return {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin'
      };
    }
    
    return null;
  },

  async logout(): Promise<void> {
    // Simulated logout
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem('auth_token');
  }
}; 