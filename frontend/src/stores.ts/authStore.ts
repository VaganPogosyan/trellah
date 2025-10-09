import { create } from "zustand";
import { isAuthSessionValid } from "../utils/auth";

type AuthState = {
  isAuthed: boolean;
  login: () => void;
  logout: () => void;
  sync: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthed: false,
  login: () =>
    set((state) =>
      state.isAuthed ? state : { ...state, isAuthed: true },
    ),
  logout: () =>
    set((state) =>
      state.isAuthed ? { ...state, isAuthed: false } : state,
    ),
  sync: () =>
    set((state) => {
      const next = isAuthSessionValid();
      return state.isAuthed === next ? state : { ...state, isAuthed: next };
    }),
}));
