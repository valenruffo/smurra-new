"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { t, type Lang } from "./translations";

type LangContextType = {
  lang: Lang;
  toggleLang: () => void;
  tt: (typeof t)[Lang];
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const toggleLang = useCallback(() => setLang((l) => (l === "es" ? "en" : "es")), []);
  const tt = t[lang] as (typeof t)[Lang];

  return (
    <LangContext value={{ lang, toggleLang, tt }}>
      {children}
    </LangContext>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
