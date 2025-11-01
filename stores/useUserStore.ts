import { create } from "zustand";
import { UserData } from "@/types/auth";

interface UserState {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: UserData, token: string) => void;
  updateUser: (updates: Partial<UserData>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user, token) => {
    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
