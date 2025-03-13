import { create } from "zustand";

export interface DarkMode {
    isDark: boolean
    toggle: () => void
}
export const useDarkModeStore = create<DarkMode>((set) => {
    const preferedMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (preferedMode) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    return {
        isDark: preferedMode,
        toggle: () => set((state) => {
            const newTheme = !state.isDark;
            if (newTheme) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return {isDark: newTheme};
        }),
    };
});