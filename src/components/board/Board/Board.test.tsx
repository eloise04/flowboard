import { beforeEach, describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Board from './Board'
import { setLanguage, t } from '../../../i18n'

describe('Board', () => {
  beforeEach(() => {
    setLanguage('fr')
  })

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

    const createdInput = screen.getByDisplayValue(t.notePlaceholder)
    fireEvent.change(createdInput, { target: { value: 'Note modifiee' } })

    expect(screen.getByDisplayValue('Note modifiee')).toBeInTheDocument()
  })

  it('adds then deletes a note from board interactions', () => {
    render(<Board />)

    const addButtons = screen.getAllByRole('button', { name: /\+/ })
    fireEvent.click(addButtons[0])

    expect(screen.getByDisplayValue(t.notePlaceholder)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: t.deleteNote }))

    expect(screen.queryByDisplayValue(t.notePlaceholder)).not.toBeInTheDocument()
  })
})