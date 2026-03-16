import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Card from './NoteCard'
import { t } from '../../../i18n'

describe('NoteCard', () => {
  it('renders provided content as input value', () => {
    render(<Card content="Texte existant" />)

    expect(screen.getByDisplayValue('Texte existant')).toBeInTheDocument()
  })

  it('uses placeholder text when content is undefined', () => {
    render(<Card />)

    expect(screen.getByDisplayValue(t.notePlaceholder)).toBeInTheDocument()
  })

  it('calls handleEditNote on input change', () => {
    const handleEditNote = vi.fn()
    render(<Card content="Initial" handleEditNote={handleEditNote} />)

    const input = screen.getByDisplayValue('Initial')
    fireEvent.change(input, { target: { value: 'Mise a jour' } })

    expect(handleEditNote).toHaveBeenCalledWith('Mise a jour')
  })

  it('does not render delete button when handleDeleteNote is not provided', () => {
    render(<Card content="Initial" />)

    expect(screen.queryByRole('button', { name: t.deleteNote })).not.toBeInTheDocument()
  })

  it('renders delete button and calls handleDeleteNote on click', () => {
    const handleDeleteNote = vi.fn()
    render(<Card content="Initial" handleDeleteNote={handleDeleteNote} />)

    fireEvent.click(screen.getByRole('button', { name: t.deleteNote }))

    expect(handleDeleteNote).toHaveBeenCalledTimes(1)
  })
})
