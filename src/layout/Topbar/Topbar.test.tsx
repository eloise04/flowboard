import { describe, expect, it, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Topbar from './Topbar'

const { mockSetLanguage } = vi.hoisted(() => ({ mockSetLanguage: vi.fn() }))

vi.mock('../../i18n', () => ({
  t: {
    appName: 'Flowboard',
    addNote: 'Ajouter une note',
    figma: 'Figma',
    figmaPopupLabel: 'Popup Figma',
    figmaFrameTitle: 'Tableau Figma',
    close: 'Fermer',
    switchToEnglish: 'EN',
    switchToFrench: 'FR',
  },
  setLanguage: mockSetLanguage,
  getCurrentLanguage: vi.fn(() => 'fr'),
  useLanguage: vi.fn(() => 'fr'),
}))

beforeEach(() => {
  mockSetLanguage.mockReset()
})

describe('Topbar', () => {
  it('renders app title and language toggle button', () => {
    render(<Topbar />)

    expect(screen.getByText('Flowboard')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Figma' })).toBeInTheDocument()
  })

  it('calls setLanguage when toggling language', () => {
    render(<Topbar />)

    fireEvent.click(screen.getByRole('button', { name: 'EN' }))

    expect(mockSetLanguage).toHaveBeenCalledWith('en')
  })

  it('opens and closes the Figma popup', () => {
    render(<Topbar />)

    expect(screen.queryByTitle('Tableau Figma')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Figma' }))
    expect(screen.getByTitle('Tableau Figma')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Fermer' }))
    expect(screen.queryByTitle('Tableau Figma')).not.toBeInTheDocument()
  })
})
