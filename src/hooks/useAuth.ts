// Simple auth hook - can be extended with your own authentication logic
export function useAuth() {
  // For now, returning not authenticated to show the login page
  // You can add your own authentication logic here (localStorage, context, etc.)
  
  return {
    user: null,
    isLoading: false,
    isAuthenticated: false,
  };
}
