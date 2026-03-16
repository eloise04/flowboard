import fr from "./fr"
import en from "./en"
import { useState, useEffect } from "react"

export type Language = 'fr' | 'en'
type Translations = typeof fr
const translationsByLanguage: Record<Language, Translations> = { fr, en }
let currentLanguage: Language = globalThis.localStorage.getItem('language') === 'en' ? 'en' : 'fr'
const listeners = new Set<(language: Language) => void>()

export const t: Translations = new Proxy({} as Translations, {
  get(_target, prop) {
    return translationsByLanguage[currentLanguage][prop as keyof Translations] ?? String(prop)
  }
})

export function setLanguage(language: Language) {
  currentLanguage = language
  globalThis.localStorage.setItem('language', language)
  listeners.forEach((listener) => listener(language))
}

export function getCurrentLanguage(): Language {
  return currentLanguage
}

export function useLanguage(): Language {
  const [lang, setLang] = useState<Language>(currentLanguage)

  useEffect(() => {
    const listener = (language: Language) => setLang(language)
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }, [])

  return lang
}