import axios from "axios";
import { create } from "zustand";

export interface UserDetails {
  UserID: number;
  Name: string;
  Email: string;
  Role: string;
  setUserID: (newID: number) => void;
  setName: (newName: string) => void;
  setEmail: (newEmail: string) => void;
  setRole: (newRole: string) => void;
  setValues: () => void;
}
interface User {
  UserID: number;
  Name: string;
  Email: string;
  Role: string;
}
export const useUserStore = create<UserDetails>()((set, get) => ({
  UserID: 0,
  Name: "",
  Email: "",
  Role: "",
  setUserID: (newID: number) => set(() => ({ UserID: newID })),
  setName: (newName: string) => set(() => ({ Name: newName })),
  setEmail: (newEmail: string) => set(() => ({ Email: newEmail })),
  setRole: (newRole: string) => set(() => ({ Role: newRole })),
  setValues: async () => {
    const role: string = get().Role.toLowerCase();
    if (role !== "") {
      const response = await axios.get(`/api/${role}/me`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const data: User = response.data;
        set({
          UserID: data.UserID,
          Name: data.Name,
          Email: data.Email,
          Role: data.Role,
        });
      }
    }
  },
}));
