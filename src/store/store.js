import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Request } from "../api/request";
import { toast } from "react-toastify";
//ddd
const userSlice = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      loader: false,
      setUser: (user) =>
        set((state) => ({
          ...state,
          user,
          isLoggedIn: true,
          token: user.token,
        })),

      editPost: async (postId) => {
        try {
          set(() => ({ loader: true }));
          const response = await Request("get", `/edit/${postId}`, null);
          return response.post;
        } catch (error) {
          return error;
        } finally {
          set(() => ({ loader: false }));
        }
      },
      deletePost: async (id) => {
        try {
          set(() => ({ loader: true }));
          const response = await Request("get", `delete/${id}`, null);
          toast.success("Post deleted successfully!");
          return response.data;
        } catch (error) {
          return error;
        } finally {
          set(() => ({ loader: false }));
        }
      },
      logout: () => {
        set(() => ({ isLoggedIn: false, user: null, token: null }));
        toast.success("See you soon!");
      },
    }),
    {
      name: "myAppStore",
    }
  )
);
export default userSlice;

export const useStore = create((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));

export const useComment = create((set) => ({
  comment: null,
  setComment: (comment) => set({ comment }),
}));
