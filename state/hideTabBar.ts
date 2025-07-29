import { create } from "zustand";

type State = {
  hideTabBar: boolean;
  setHideTabBar: (hide: boolean) => void;
};

const initialState: State = {
  hideTabBar: false,
  setHideTabBar: () => {},
};

export const useHideTabBarStore = create<State>((set) => ({
  ...initialState,
  setHideTabBar: (hide) => set({ hideTabBar: hide }),
}));
