import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      setUser: (user) =>
        set((state) => ({
          ...state,
          user,
          isLoggedIn: true,
          token: user.token,
        })),
      logout: () => set(() => ({ isLoggedIn: false, user: null, token: null })),
    }),
    {
      name: "myAppStore",
    }
  )
);

export const useStore = create((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));

export const useComment = create((set) => ({
  comment: null,
  setComment: (comment) => set({ comment }),
}));;

export default useAuthStore
