import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authService } from '../services/api';

// Define the User type
type User = {
  id: string;
  email: string;
  name?: string;
};

// Define the Authentication Store state and actions
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authService.login(email, password);
          
          // Extract token from response
          const { token } = response;
          
          // Create a user object with available information
          // In a real scenario, you might want to make another API call to get user details
          const user = {
            id: '', // You might want to decode the JWT or fetch from a profile endpoint
            email: email,
          };
          
          set({ 
            token, 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          // Try to fetch the user profile if available
          try {
            const profileResponse = await authService.getUserProfile();
            if (profileResponse.user) {
              set({ user: profileResponse.user });
            }
          } catch (profileError) {
            console.error('Error fetching user profile:', profileError);
            // We still continue with login even if profile fetch fails
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Login failed' 
          });
        }
      },

      signup: async (name: string, email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await authService.signup(name, email, password);
          
          // Extract token from response
          const { token } = response;
          
          // Create a user object
          const user = {
            id: '', // You might want to decode the JWT or fetch from a profile endpoint
            name,
            email,
          };
          
          set({ 
            token, 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          console.error('Signup error:', error);
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Signup failed' 
          });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
          // We still want to clear the state even if API call fails
        } finally {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;