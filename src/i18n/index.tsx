import fr from "./fr"
import en from "./en"

export type Language = 'fr' | 'en'

let currentLanguage: Language = 'fr'
let currentTranslations = fr

export const t = new Proxy(currentTranslations, {
  get(target, prop) {
    return target[prop as keyof typeof target] || prop
  }
})

export function setLanguage(language: Language) {
  currentLanguage = language
  currentTranslations = language === 'fr' ? fr : en
}

export function getCurrentLanguage(): Language {
  return currentLanguage
}