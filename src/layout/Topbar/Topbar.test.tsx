import { describe, expect, it, vi, beforeEach } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Topbar from './Topbar'

const reloadMock = vi.fn()

vi.mock('../../i18n', () => ({
  t: {
    appName: 'Flowboard',
    addNote: 'Ajouter une note',
  },
  setLanguage: vi.fn(),
  getCurrentLanguage: vi.fn(() => 'fr'),
}))

beforeEach(() => {
  reloadMock.mockReset()
  Object.defineProperty(globalThis, 'location', {
    configurable: true,
    value: { reload: reloadMock },
  })
})

describe('Topbar', () => {
  it('renders app title and add button', () => {
    render(<Topbar />)

    expect(screen.getByText('Flowboard')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+ Ajouter une note' })).toBeInTheDocument()
  })

  it('reloads page when toggling language', () => {
    render(<Topbar />)

    fireEvent.click(screen.getByRole('button', { name: 'EN' }))

    expect(reloadMock).toHaveBeenCalledTimes(1)
  })
})
