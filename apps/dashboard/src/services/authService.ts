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

// Mock API - gerçek projede backend endpoint'leri kullanılacak
export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    // Simüle edilmiş API çağrısı
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock kullanıcı doğrulama
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      return {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin'
      };
    }
    
    throw new Error('Geçersiz kullanıcı adı veya şifre');
  },

  async checkSession(): Promise<User | null> {
    // Simüle edilmiş session kontrolü
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
    // Simüle edilmiş logout
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem('auth_token');
  }
}; 