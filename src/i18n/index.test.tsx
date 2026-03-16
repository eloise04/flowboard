import { describe, expect, it } from 'vitest'
import { getCurrentLanguage, setLanguage, t } from './index'

describe('i18n index', () => {
  it('switches and reads current language', () => {
    setLanguage('en')
    expect(getCurrentLanguage()).toBe('en')

    setLanguage('fr')
    expect(getCurrentLanguage()).toBe('fr')
  })

  it('returns property name for missing translation key', () => {
    const missing = (t as Record<string, unknown>).missing_key
    expect(missing).toBe('missing_key')
  })
})
