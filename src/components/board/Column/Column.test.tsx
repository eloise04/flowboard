import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Column from './Column'

describe('Column', () => {
  it('renders the column title', () => {
    render(<Column title="Test Column" notes={[]} handleAddNote={vi.fn()} />)
    expect(screen.getByText('Test Column')).toBeInTheDocument()
  })

  it('renders no note cards when notes array is empty', () => {
    render(<Column title="Test Column" notes={[]} handleAddNote={vi.fn()} />)
    const cards = screen.queryAllByText('Note')
    expect(cards).toHaveLength(0)
  })

  it('renders note cards based on notes prop', () => {
    const mockNotes = [
      { id: '1', content: 'First note' },
      { id: '2', content: 'Second note' }
    ]
    render(<Column title="Test Column" notes={mockNotes} handleAddNote={vi.fn()} />)
    expect(screen.getByText('First note')).toBeInTheDocument()
    expect(screen.getByText('Second note')).toBeInTheDocument()
  })

  it('renders the add note button', () => {
    render(<Column title="Test Column" notes={[]} handleAddNote={vi.fn()} />)
    expect(screen.getByText('+ Add note')).toBeInTheDocument()
  })

  it('has the correct CSS class', () => {
    render(<Column title="Test Column" notes={[]} handleAddNote={vi.fn()} />)
    const columnDiv = screen.getByText('Test Column').closest('div')
    expect(columnDiv).toHaveClass('column')
  })
})