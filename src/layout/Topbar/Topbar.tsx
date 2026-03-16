import { t, setLanguage, getCurrentLanguage } from '../../i18n'

export default function Topbar() {
  const toggleLanguage = () => {
    const newLang = getCurrentLanguage() === 'fr' ? 'en' : 'fr'
    setLanguage(newLang)
    // Force re-render
    globalThis.location.reload()
  }

  return (
    <div className="topbar">
      <h2>{t.appName}</h2>
      <div>
        <button onClick={toggleLanguage}>
          {getCurrentLanguage() === 'fr' ? 'EN' : 'FR'}
        </button>
        <button>+ {t.addNote}</button>
      </div>
    </div>
  )
}