import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Card from './NoteCard'
import { t } from '../../../i18n'

describe('NoteCard', () => {
  it('renders provided content as input value', () => {
    render(<Card noteId="n1" columnId="ideas" content="Texte existant" />)

    expect(screen.getByDisplayValue('Texte existant')).toBeInTheDocument()
  })

  it('uses placeholder text when content is undefined', () => {
    render(<Card noteId="n1" columnId="ideas" />)

    expect(screen.getByDisplayValue(t.notePlaceholder)).toBeInTheDocument()
  })

  it('calls handleEditNote on input change', () => {
    const handleEditNote = vi.fn()
    render(<Card noteId="n1" columnId="ideas" content="Initial" handleEditNote={handleEditNote} />)

    const input = screen.getByDisplayValue('Initial')
    fireEvent.doubleClick(input)
    fireEvent.change(input, { target: { value: 'Mise a jour' } })

    expect(handleEditNote).toHaveBeenCalledWith('Mise a jour')
  })

  it('sets the input back to readonly when it loses focus', () => {
    render(<Card noteId="n1" columnId="ideas" content="Initial" />)

    const input = screen.getByDisplayValue('Initial')

    expect(input).toHaveAttribute('readonly')

    fireEvent.doubleClick(input)
    expect(input).not.toHaveAttribute('readonly')

    fireEvent.blur(input)
    expect(input).toHaveAttribute('readonly')
  })

  it('does not render delete button when handleDeleteNote is not provided', () => {
    render(<Card noteId="n1" columnId="ideas" content="Initial" />)

    expect(screen.queryByRole('button', { name: t.deleteNote })).not.toBeInTheDocument()
  })

  it('renders delete button and calls handleDeleteNote on click', () => {
    const handleDeleteNote = vi.fn()
    render(<Card noteId="n1" columnId="ideas" content="Initial" handleDeleteNote={handleDeleteNote} />)

    fireEvent.click(screen.getByRole('button', { name: t.deleteNote }))

    expect(handleDeleteNote).toHaveBeenCalledTimes(1)
  })

  it('adds drag payload with note and column ids', () => {
    render(<Card noteId="n1" columnId="ideas" content="Initial" />)

    const input = screen.getByDisplayValue('Initial')
    const setData = vi.fn()

    fireEvent.dragStart(input, {
      dataTransfer: {
        setData,
        effectAllowed: 'uninitialized',
      },
    })

    expect(setData).toHaveBeenCalledWith('text/plain', JSON.stringify({ noteId: 'n1', fromColumnId: 'ideas' }))
  })
})
