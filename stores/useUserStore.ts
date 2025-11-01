// stores/useUserStore.ts
import { UserData } from '@/types/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserStore {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: UserData, token: string) => void;
  register: (user: UserData, token: string) => void;
  setUser: (user: UserData | null) => void;
  logout: () => void;
  updateUser: (user: Partial<UserData>) => void;
  initialize: () => void;
  getToken: () => string | null;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      login: (user, token) => {
   
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
        }
        
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      register: (user, token) => {

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', token);
        }
        
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      setUser: (user) => {
        set((state) => ({
          user,
          isAuthenticated: !!user && !!state.token,
        }));
      },

      logout: () => {
        // Clear token from both localStorage and state
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          localStorage.removeItem('user-storage'); // Clear the entire persisted state
        }
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (updatedUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        }));
      },

      initialize: () => {
        set((state) => {
          // Check if we have both user and token
          const hasAuth = !!(state.user && state.token);
          
          // Also verify token exists in localStorage
          if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('token');
            if (!storedToken && state.token) {
              // Sync: if token exists in state but not in localStorage, save it
              localStorage.setItem('token', state.token);
            } else if (storedToken && !state.token) {
              // Sync: if token exists in localStorage but not in state, update state
              return {
                token: storedToken,
                isLoading: false,
                isAuthenticated: !!state.user && !!storedToken,
              };
            }
          }
          
          return {
            isLoading: false,
            isAuthenticated: hasAuth,
          };
        });
      },

      getToken: () => {
        const state = get();
        // Always check localStorage first as source of truth
        if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('token');
          if (storedToken && storedToken !== state.token) {
            // Sync state with localStorage
            set({ token: storedToken });
            return storedToken;
          }
        }
        return state.token;
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      // Rehydrate and sync on mount
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('token');
          if (storedToken && storedToken !== state.token) {
            state.token = storedToken;
            state.isAuthenticated = !!(state.user && storedToken);
          }
          state.isLoading = false;
        }
      },
    }
  )
);

// Helper hook to get token
export const useAuthToken = () => {
  return useUserStore((state) => state.getToken());
};

// Helper to check if user is authenticated
export const useIsAuthenticated = () => {
  return useUserStore((state) => state.isAuthenticated && !!state.token);
};