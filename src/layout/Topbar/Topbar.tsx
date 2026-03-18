import { useState } from 'react'
import { t, setLanguage, useLanguage } from '../../i18n'
import styles from './Topbar.module.css'

export default function Topbar() {
  const lang = useLanguage()
  const [isFigmaOpen, setIsFigmaOpen] = useState(false)

  const toggleLanguage = () => {
    const newLang = lang === 'fr' ? 'en' : 'fr'
    setLanguage(newLang)
    globalThis.location.reload()
  }

  return (
    <div className="topbar">
      <h2>{t.appName}</h2>
      <div className={styles.actions}>
        <button className={styles.figmaBtn} onClick={() => setIsFigmaOpen(true)}>
          {t.figma}
        </button>
        <button className={styles.langBtn} onClick={toggleLanguage}>
          {lang === 'fr' ? t.switchToEnglish : t.switchToFrench}
        </button>
      </div>

      {isFigmaOpen && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={t.figmaPopupLabel}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={() => setIsFigmaOpen(false)}>
              {t.close}
            </button>
            <iframe
              className={styles.figmaFrame}
              title={t.figmaFrameTitle}
              src="https://embed.figma.com/board/0n3HCXABqWeWLCkfML42TI/Flowboard-Wireframe?node-id=0-1&embed-host=share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}