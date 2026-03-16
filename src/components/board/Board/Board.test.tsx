import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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
})