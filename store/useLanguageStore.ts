import { create } from 'zustand';

interface LanguageState {
    language: 'en' | 'ar';
    setLanguage: (lang: 'en' | 'ar') => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: 'en', // default
    setLanguage: (lang) => set({ language: lang }),
}));
