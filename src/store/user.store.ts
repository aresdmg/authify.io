import { User } from "@/utils/types";
import { create } from "zustand";

type userState = {
    user: User | null,
    setUser: (user: User) => void,
    clearUser: () => void
}

export const useAuthStore = create<userState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null })
}))