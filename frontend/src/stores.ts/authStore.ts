import { create } from "zustand";

const authStore = create((set) => ({
  isAuthed: false,
  login: () => {},
  logout: () => {},
}));
