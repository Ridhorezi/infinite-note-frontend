// useUserGlobalStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { INFINITE_TOKEN_NAME, removeToken } from "@/services/config";
import { IAuthenticatedUser } from "@/types";

interface IUserGlobalStore {
  user: IAuthenticatedUser | null;
  updateUser: (user: IAuthenticatedUser | null) => void;
  logout: () => void;
}

const useUserGlobalStore = create<IUserGlobalStore>()(
  persist(
    (set, get) => ({
      user: null,
      updateUser: (user) => {
        set({ user });
      },
      logout: () => {
        removeToken(INFINITE_TOKEN_NAME);
        set({ user: null });
      },
    }),
    {
      name: "infinite-application-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserGlobalStore;
