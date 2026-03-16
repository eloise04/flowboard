import { t, setLanguage, useLanguage } from '../../i18n'

export default function Topbar() {
  const lang = useLanguage()

  const toggleLanguage = () => {
    const newLang = lang === 'fr' ? 'en' : 'fr'
    setLanguage(newLang)
    globalThis.location.reload()
  }

  return (
    <div className="topbar">
      <h2>{t.appName}</h2>
      <div>
        <button onClick={toggleLanguage}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
        <button>+ {t.addNote}</button>
      </div>
    </div>
  )
}