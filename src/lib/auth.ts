export function login(email: string, password: string): boolean {
    // Dummy authentication
    return email === 'demouser' && password === 'demopass'
  }
  
  export function logout() {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated')
  }
  
  export function isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true'
  }