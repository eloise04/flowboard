import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Board from './Board'

describe('Board', () => {
  it('renders three columns with correct titles', () => {
    render(<Board />)
    expect(screen.getByText('Ideas')).toBeInTheDocument()
    expect(screen.getByText('Doing')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders the board container', () => {
    render(<Board />)
    const boardDiv = screen.getByText('Ideas').closest('div')?.parentElement
    expect(boardDiv).toHaveClass('board')
  })

  it('adds and edits a note from board interactions', () => {
    render(<Board />)

    const addButtons = screen.getAllByRole('button', { name: /\+/ })
    fireEvent.click(addButtons[0])

    const createdInput = screen.getByDisplayValue('Nouvelle note')
    fireEvent.change(createdInput, { target: { value: 'Note modifiee' } })

    expect(screen.getByDisplayValue('Note modifiee')).toBeInTheDocument()
  })
})