import { atom } from "recoil";

export const DarkMode = atom<boolean>({
  key: "DarkMode",
  default: false,
});
