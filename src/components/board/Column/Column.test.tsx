import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Column from './Column'

describe('Column', () => {
  it('renders the column title', () => {
    render(<Column title="Test Column" notes={[]} handleAddNote={vi.fn()} handleEditNote={vi.fn()} handleDeleteNote={vi.fn()} />)
    expect(screen.getByText('Test Column')).toBeInTheDocument()
  })

  it('renders no notes message when notes array is empty', () => {
    render(<Column title="Test Column" notes={[]} handleAddNote={vi.fn()} handleEditNote={vi.fn()} handleDeleteNote={vi.fn()} />)
    expect(screen.getByText('Aucune note dans cette colonne')).toBeInTheDocument()
  })

  it('renders note cards based on notes prop', () => {
    const mockNotes = [
      { id: '1', content: 'First note' },
      { id: '2', content: 'Second note' }
    ]
    render(<Column title="Test Column" notes={mockNotes} handleAddNote={vi.fn()} handleEditNote={vi.fn()} handleDeleteNote={vi.fn()} />)
    expect(screen.getByDisplayValue('First note')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Second note')).toBeInTheDocument()
  })

  it('renders the add note button', () => {
    render(<Column title="Test Column" notes={[]} handleAddNote={vi.fn()} handleEditNote={vi.fn()} handleDeleteNote={vi.fn()} />)
    const button = screen.getByRole('button', { name: /\+/ })
    expect(button).toBeInTheDocument()
  })

  it('has the correct CSS class', () => {
    render(<Column title="Test Column" notes={[]} handleAddNote={vi.fn()} handleEditNote={vi.fn()} handleDeleteNote={vi.fn()} />)
    const columnDiv = screen.getByText('Test Column').closest('div')
    expect(columnDiv).toHaveClass('column')
  })

  it('calls handleDeleteNote with normalized column id and note id', () => {
    const handleDeleteNote = vi.fn()
    render(
      <Column
        title="Ideas"
        notes={[{ id: 'n1', content: 'A note' }]}
        handleAddNote={vi.fn()}
        handleEditNote={vi.fn()}
        handleDeleteNote={handleDeleteNote}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Supprimer la note' }))

    expect(handleDeleteNote).toHaveBeenCalledWith('ideas', 'n1')
  })
})